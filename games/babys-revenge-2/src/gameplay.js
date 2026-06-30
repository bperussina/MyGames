import { random } from '@mygames/shared';
import { drawText } from '@mygames/shared';
import { playSoundMaker, playHitKid, playPlayerHit } from './audio.js';
import {
  createWorld3D,
  resetPlayer,
  updateWorldMovement,
  renderWorld3D,
  buildSpriteList,
  getDoorPositions,
  worldDistance,
  updateWildDucks,
  findClickTarget,
  collectDuck,
} from './world3d.js';
import {
  createInventory,
  canThrowToy,
  useToy,
  refillFromToyBox,
  getClickedInventorySlot,
  selectToyBox,
  renderInventory,
} from './inventory.js';
import {
  createShopState,
  renderShop,
  renderShopButton,
  isShopButtonClicked,
  handleShopClick,
  getToyDamage,
  getThrowSpeed,
  getHitsToDefeat,
  getMaxHealth,
  BASE_MAX_HEALTH,
} from './shop.js';

const DAY_DURATION = 180;
const NIGHT_DURATION = 180;
const MAX_NIGHTS = 20;
const DAY_BANNER_TIME = 5;

export function createGameState() {
  return {
    phase: 'DAY',
    night: 1,
    phaseTimer: DAY_DURATION,
    phaseElapsed: 0,
    health: BASE_MAX_HEALTH,
    soundCooldown: 0,
    kids: [],
    thrownToys: [],
    incomingToys: [],
    soundPower: 0,
    won: false,
    lost: false,
    soundMakerCharges: 100,
    world: createWorld3D(),
    inventory: createInventory(),
    shop: createShopState(),
    liveDucks: 0,
    hitSoundCooldown: 0,
    meleeHitTimer: 0,
    pendingClick: null,
  };
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function difficulty(night) {
  return {
    kidCount: Math.min(2 + Math.floor(night / 2), 6),
    kidSpeed: 1.8 + night * 0.22,
    throwInterval: Math.max(0.45, 1.6 - night * 0.055),
    annoyToRetreat: 70 + night * 4,
    soundDrain: 1.4 + night * 0.08,
    annoyPerSound: 5 + night * 0.15,
    meleeRange: 1.1,
    throwRange: 10,
  };
}

function spawnKids(night) {
  const doors = getDoorPositions();
  const diff = difficulty(night);
  const kids = [];

  for (let i = 0; i < diff.kidCount; i += 1) {
    const door = doors[i % doors.length];
    kids.push({
      x: door.x,
      y: door.y,
      doorId: door.id,
      homeX: door.x,
      homeY: door.y,
      mood: 'angry',
      retreating: false,
      defeated: false,
      hits: 0,
      hitFlash: 0,
      annoyance: 0,
      throwCooldown: random(0, 1.5),
    });
  }
  return kids;
}

function startNight(state) {
  state.phase = 'NIGHT';
  state.phaseTimer = NIGHT_DURATION;
  state.phaseElapsed = 0;
  state.kids = spawnKids(state.night);
  state.thrownToys = [];
  state.incomingToys = [];
}

function startDay(state) {
  state.phase = 'DAY';
  state.phaseTimer = DAY_DURATION;
  state.phaseElapsed = 0;
  state.kids = [];
  state.thrownToys = [];
  state.incomingToys = [];
  state.health = getMaxHealth(state.shop);
  resetPlayer(state.world);
}

function addLiveDuck(state) {
  state.liveDucks += 1;
}

export function handleGameClick(state, clickX, clickY, width, height) {
  if (state.shop.open) {
    return handleShopClick(state, clickX, clickY, width, height);
  }

  if (isShopButtonClicked(clickX, clickY, width, height)) {
    state.shop.open = true;
    return state;
  }

  const target = findClickTarget(state.world, state, width, height, clickX, clickY);

  if (target?.type === 'duck') {
    if (collectDuck(target.sprite)) {
      addLiveDuck(state);
    }
    return state;
  }

  if (target?.type === 'kid' && !target.sprite.defeated && canThrowToy(state.inventory)) {
    useToy(state.inventory);
    const kid = target.sprite;
    state.thrownToys.push({
      x: state.world.player.x,
      y: state.world.player.y,
      tx: kid.x,
      ty: kid.y,
      kidId: kid.doorId,
      t: 0,
      type: Math.floor(random(0, 4)),
      damage: getToyDamage(state.shop),
    });
  }

  return state;
}

export function handleInventoryClick(state, clickX, clickY, width, height) {
  const slotIndex = getClickedInventorySlot(clickX, clickY, width, height);
  if (slotIndex === null) return state;

  const slot = state.inventory.slots[slotIndex];
  if (slot?.type === 'toybox') {
    selectToyBox(state.inventory);
  }
  return state;
}

export function updateGameplay(state, delta, input, width, height, admin) {
  if (state.won || state.lost) {
    if (input.isPressed('r', ' ')) {
      return createGameState();
    }
    return state;
  }

  const godMode = admin?.godMode;
  const speedMul = admin?.speedMultiplier ?? 1;
  const diff = difficulty(state.night);

  state.phaseElapsed += delta;
  updateWildDucks(state.world, delta);

  if (input.isPressed('b')) {
    state.shop.open = !state.shop.open;
  }

  updateWorldMovement(
    state.world,
    delta,
    input,
    state.phase === 'DAY' ? 5 : 4.2
  );

  state.world.wildDucks.forEach((duck) => {
    if (duck.collected) return;
    const d = worldDistance(state.world.player.x, state.world.player.y, duck.x, duck.y);
    if (d < 1.4 && collectDuck(duck)) {
      addLiveDuck(state);
    }
  });

  if (state.phase === 'DAY') {
    state.phaseTimer -= delta * speedMul;

    if (input.isPressed('e', 'enter')) {
      refillFromToyBox(state.inventory);
    }

    if (state.phaseTimer <= 0) {
      startNight(state);
    }
    return state;
  }

  state.phaseTimer -= delta * speedMul;
  state.soundCooldown = Math.max(0, state.soundCooldown - delta);

  const pressingX = input.isDown('x');
  if (pressingX && state.soundCooldown <= 0 && state.soundMakerCharges > 0) {
    state.soundCooldown = 0.07;
    state.soundPower = Math.min(1, state.soundPower + 0.06);
    state.soundMakerCharges -= diff.soundDrain;
    playSoundMaker(state.soundPower);

    state.kids.forEach((kid) => {
      if (kid.defeated) return;
      const dist = worldDistance(state.world.player.x, state.world.player.y, kid.x, kid.y);
      if (dist < 10) {
        kid.annoyance += diff.annoyPerSound;
        if (kid.annoyance >= diff.annoyToRetreat) {
          kid.retreating = true;
          kid.mood = 'scared';
        }
      }
    });
  } else if (!pressingX) {
    state.soundPower = Math.max(0, state.soundPower - delta * 0.6);
  }

  state.kids.forEach((kid) => {
    if (kid.defeated || kid.retreating) return;
    kid.hitFlash = Math.max(0, kid.hitFlash - delta);

    const dx = state.world.player.x - kid.x;
    const dy = state.world.player.y - kid.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 0.2) {
      kid.x += (dx / dist) * diff.kidSpeed * delta;
      kid.y += (dy / dist) * diff.kidSpeed * delta;
    }

    if (!godMode && dist < diff.meleeRange) {
      state.health -= delta * 0.8;
      state.meleeHitTimer -= delta;
      if (state.meleeHitTimer <= 0) {
        playPlayerHit();
        state.meleeHitTimer = 0.5;
      }
      if (state.health <= 0) state.lost = true;
    }

    kid.throwCooldown -= delta;
    if (kid.throwCooldown <= 0 && dist < diff.throwRange && dist > 1.5) {
      kid.throwCooldown = diff.throwInterval + random(0, 0.5);
      state.incomingToys.push({
        startX: width / 2 + (dx / dist) * 200,
        startY: height / 2 - 80,
        x: width / 2 + (dx / dist) * 200,
        y: height / 2 - 80,
        tx: width / 2,
        ty: height / 2,
        t: 0,
        type: Math.floor(random(0, 4)),
      });
    }
  });

  state.thrownToys = state.thrownToys.filter((toy) => {
    toy.t += delta * 3.5 * getThrowSpeed(state.shop);
    toy.x = state.world.player.x + (toy.tx - state.world.player.x) * toy.t;
    toy.y = state.world.player.y + (toy.ty - state.world.player.y) * toy.t;

    if (toy.t >= 1) {
      const kid = state.kids.find((k) => k.doorId === toy.kidId && !k.defeated);
      if (kid) {
        kid.hits += toy.damage ?? getToyDamage(state.shop);
        kid.hitFlash = 0.4;
        playHitKid();
        if (kid.hits >= getHitsToDefeat(state.shop)) {
          kid.defeated = true;
          kid.retreating = true;
          kid.mood = 'scared';
          addLiveDuck(state);
        }
      }
      return false;
    }
    return true;
  });

  state.incomingToys = state.incomingToys.filter((toy) => {
    toy.t += delta * (1.8 + state.night * 0.04);
    toy.x = toy.startX + (toy.tx - toy.startX) * toy.t;
    toy.y = toy.startY + (toy.ty - toy.startY) * toy.t;
    if (toy.t >= 1 && !godMode) {
      state.health -= 1;
      playPlayerHit();
      if (state.health <= 0) state.lost = true;
      return false;
    }
    return toy.t < 1;
  });

  const activeKids = state.kids.filter((k) => !k.defeated && !k.retreating);
  if (state.kids.length > 0 && activeKids.length === 0 && state.phaseTimer > 5) {
    state.phaseTimer = Math.min(state.phaseTimer, 3);
  }

  if (state.phaseTimer <= 0) {
    if (state.night >= MAX_NIGHTS) {
      state.won = true;
    } else {
      state.night += 1;
      startDay(state);
    }
  }

  return state;
}

function drawScreenToys(ctx, toys) {
  toys.forEach((toy) => {
    const colors = ['#ef4444', '#22c55e', '#3b82f6', '#a855f7'];
    ctx.fillStyle = colors[toy.type % colors.length];
    ctx.beginPath();
    ctx.arc(toy.x, toy.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function drawSoundOverlay(ctx, width, height, power) {
  if (power <= 0) return;
  for (let i = 1; i <= 4; i += 1) {
    const r = 40 * i + power * 60;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(250,204,21,${0.35 - i * 0.07})`;
    ctx.lineWidth = 4;
    ctx.stroke();
  }
}

export function renderGameplay(state, ctx, width, height) {
  if (state.shop.open) {
    const sprites = buildSpriteList(state.world, state, width, height);
    renderWorld3D(ctx, width, height, state.world, state, sprites);
    renderInventory(ctx, width, height, state.inventory, state.liveDucks);
    renderShop(ctx, width, height, state.shop, state.inventory, state.liveDucks);
    return;
  }

  const sprites = buildSpriteList(state.world, state, width, height);
  renderWorld3D(ctx, width, height, state.world, state, sprites);

  drawScreenToys(ctx, state.incomingToys);
  drawSoundOverlay(ctx, width, height, state.soundPower);
  renderInventory(ctx, width, height, state.inventory, state.liveDucks);
  renderShopButton(ctx, width, height, state.liveDucks);

  const phaseLabel = state.phase === 'DAY' ? '☀️ DAY' : '🌙 NIGHT';
  const phaseColor = state.phase === 'DAY' ? '#fbbf24' : '#a78bfa';
  const maxHealth = getMaxHealth(state.shop);

  ctx.fillStyle = 'rgba(15,23,42,0.55)';
  ctx.fillRect(0, 56, 220, 72);
  drawText(ctx, `${phaseLabel} ${state.night}/${MAX_NIGHTS}`, 12, 68, {
    align: 'left', baseline: 'top', size: 24, color: phaseColor,
  });
  drawText(ctx, formatTime(Math.max(0, state.phaseTimer)), 12, 96, {
    align: 'left', baseline: 'top', size: 20, color: '#f8fafc',
  });

  for (let i = 0; i < maxHealth; i += 1) {
    drawText(ctx, i < Math.ceil(state.health) ? '❤️' : '🖤', width - 28 - i * 32, 12, { size: 22 });
  }

  ctx.fillStyle = 'rgba(15,23,42,0.55)';
  ctx.fillRect(width - 210, height - 130, 198, 58);
  drawText(ctx, '↑↓←→ move | drag look', width - 106, height - 118, { size: 12, color: '#cbd5e1' });
  drawText(ctx, 'Select Toy Box · click kids', width - 106, height - 102, { size: 12, color: '#fbbf24' });
  drawText(ctx, 'Lakes — collect ducks 🦆', width - 106, height - 86, { size: 12, color: '#38bdf8' });
  drawText(ctx, '🛒 SHOP — spend alive ducks', width - 106, height - 70, { size: 12, color: '#c4b5fd' });

  if (state.phase === 'DAY' && state.phaseElapsed < DAY_BANNER_TIME) {
    const alpha = state.phaseElapsed > DAY_BANNER_TIME - 1
      ? DAY_BANNER_TIME - state.phaseElapsed
      : Math.min(1, state.phaseElapsed / 0.5);
    ctx.fillStyle = `rgba(0,0,0,${0.45 * alpha})`;
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, '☀️ Daytime — rest up, baby! ☀️', width / 2, height * 0.32, {
      size: 36, color: `rgba(251,191,36,${alpha})`,
    });
    drawText(ctx, 'Explore the green hills!', width / 2, height * 0.4, {
      size: 20, color: `rgba(255,255,255,${alpha * 0.9})`,
    });
    drawText(ctx, 'Find lakes — collect live ducks 🦆', width / 2, height * 0.47, {
      size: 16, color: `rgba(203,213,225,${alpha * 0.85})`,
    });
    drawText(ctx, 'Collect ducks · open SHOP at the top!', width / 2, height * 0.54, {
      size: 14, color: `rgba(250,204,21,${alpha * 0.8})`,
    });
  }

  if (state.phase === 'NIGHT' && state.phaseElapsed < 4) {
    const alpha = Math.min(1, (4 - state.phaseElapsed) / 2);
    ctx.fillStyle = `rgba(30,0,60,${0.5 * alpha})`;
    ctx.fillRect(0, height * 0.25, width, 80);
    drawText(ctx, '🌙 Select Toy Box · click big kids!', width / 2, height * 0.3, {
      size: 30, color: `rgba(248,113,113,${alpha})`,
    });
  }

  if (state.won) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, 'YOU WIN!', width / 2, height / 2 - 30, { size: 52, color: '#facc15' });
    drawText(ctx, `${state.liveDucks} live ducks collected!`, width / 2, height / 2 + 20, { size: 22, color: '#fff' });
    drawText(ctx, 'Press R to play again', width / 2, height / 2 + 60, { size: 18, color: '#94a3b8' });
  }

  if (state.lost) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, 'GAME OVER', width / 2, height / 2 - 30, { size: 48, color: '#ef4444' });
    drawText(ctx, `Live ducks saved: ${state.liveDucks} 🦆`, width / 2, height / 2 + 15, { size: 22, color: '#fff' });
    drawText(ctx, 'Press R to try again', width / 2, height / 2 + 55, { size: 18, color: '#94a3b8' });
  }
}

export { MAX_NIGHTS, DAY_DURATION, NIGHT_DURATION };
