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
  getNearestToyBox,
} from './world3d.js';

const DAY_DURATION = 180;
const NIGHT_DURATION = 180;
const MAX_NIGHTS = 20;
const MAX_HEALTH = 3;
const DAY_BANNER_TIME = 5;

export function createGameState() {
  return {
    phase: 'DAY',
    night: 1,
    phaseTimer: DAY_DURATION,
    phaseElapsed: 0,
    health: MAX_HEALTH,
    soundCooldown: 0,
    kids: [],
    toys: [],
    toyBoxVisible: false,
    toyBoxWorld: null,
    toyBoxTimer: 0,
    kidsRetreated: false,
    retreatTimer: 0,
    throwTimer: 0,
    soundPower: 0,
    won: false,
    lost: false,
    soundMakerCharges: 100,
    world: createWorld3D(),
    dayBannerDone: false,
    nearToyBox: false,
    hitSoundCooldown: 0,
    kidHitCooldowns: {},
    lastHealth: MAX_HEALTH,
    meleeHitTimer: 0,
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
    throwRange: 8,
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
      annoyance: 0,
      holdingToy: false,
      holdTimer: 0,
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
  state.toys = [];
  state.kidsRetreated = false;
  state.toyBoxVisible = false;
  state.toyBoxWorld = null;
  state.soundMakerCharges = Math.max(60, 100 - state.night * 2);
}

function startDay(state) {
  state.phase = 'DAY';
  state.phaseTimer = DAY_DURATION;
  state.phaseElapsed = 0;
  state.kids = [];
  state.toys = [];
  state.kidsRetreated = false;
  state.toyBoxVisible = false;
  state.health = MAX_HEALTH;
  state.dayBannerDone = false;
  resetPlayer(state.world);
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

  updateWorldMovement(
    state.world,
    delta,
    input,
    state.phase === 'DAY' ? 4.2 : 3.6
  );

  if (state.phase === 'DAY') {
    state.phaseTimer -= delta * speedMul;

    const { dist } = getNearestToyBox(state.world);
    state.nearToyBox = dist < 1.8;

    if (state.nearToyBox && input.isPressed('e', 'enter')) {
      state.soundMakerCharges = 100;
    }

    if (state.phaseTimer <= 0) {
      startNight(state);
    }
    return state;
  }

  // ── NIGHT (3D — big kids attack) ──
  state.phaseTimer -= delta * speedMul;
  state.soundCooldown = Math.max(0, state.soundCooldown - delta);
  state.hitSoundCooldown = Math.max(0, state.hitSoundCooldown - delta);
  Object.keys(state.kidHitCooldowns).forEach((key) => {
    state.kidHitCooldowns[key] -= delta;
    if (state.kidHitCooldowns[key] <= 0) {
      delete state.kidHitCooldowns[key];
    }
  });

  const pressingX = input.isDown('x');
  if (pressingX && state.soundCooldown <= 0 && state.soundMakerCharges > 0) {
    state.soundCooldown = 0.07;
    state.soundPower = Math.min(1, state.soundPower + 0.06);
    state.soundMakerCharges -= diff.soundDrain;
    playSoundMaker(state.soundPower);

    state.kids.forEach((kid, kidIndex) => {
      const dist = worldDistance(state.world.player.x, state.world.player.y, kid.x, kid.y);
      if (dist < 10) {
        const prevAnnoy = kid.annoyance;
        kid.annoyance += diff.annoyPerSound * (1 + (10 - dist) / 10);

        const kidKey = `${kid.doorId}-${kidIndex}`;
        if (dist < 7 && !state.kidHitCooldowns[kidKey] && kid.annoyance > prevAnnoy) {
          playHitKid();
          state.kidHitCooldowns[kidKey] = 0.28;
        }
      }
      if (kid.annoyance >= diff.annoyToRetreat) {
        kid.retreating = true;
        kid.mood = 'scared';
      }
    });
  } else if (!pressingX) {
    state.soundPower = Math.max(0, state.soundPower - delta * 0.6);
  }

  const activeKids = state.kids.filter((k) => !k.retreating);
  const allRetreating = state.kids.length > 0 && activeKids.length === 0;

  if (allRetreating && !state.kidsRetreated) {
    state.kidsRetreated = true;
    state.toyBoxVisible = true;
    state.toyBoxTimer = 10;
    state.toyBoxWorld = {
      x: state.world.player.x + Math.cos(state.world.player.angle) * 1.5,
      y: state.world.player.y + Math.sin(state.world.player.angle) * 1.5,
    };
  }

  if (state.kidsRetreated) {
    state.retreatTimer += delta;
    state.kids.forEach((kid) => {
      const dx = kid.homeX - kid.x;
      const dy = kid.homeY - kid.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.15) {
        kid.x += (dx / dist) * diff.kidSpeed * 1.5 * delta;
        kid.y += (dy / dist) * diff.kidSpeed * 1.5 * delta;
      }
    });

    if (state.toyBoxTimer > 0) {
      state.toyBoxTimer -= delta;
    }

    if (input.isPressed('e', 'enter') && state.toyBoxVisible) {
      const dist = worldDistance(
        state.world.player.x,
        state.world.player.y,
        state.toyBoxWorld.x,
        state.toyBoxWorld.y
      );
      if (dist < 2.5) {
        state.soundMakerCharges = 100;
        state.toyBoxVisible = false;
        state.kidsRetreated = false;
        state.retreatTimer = 0;
        state.kids = spawnKids(state.night);
      }
    }

    if (state.retreatTimer > 7 && !state.toyBoxVisible) {
      state.kidsRetreated = false;
      state.retreatTimer = 0;
      state.kids = spawnKids(state.night);
    }
  }

  if (!state.kidsRetreated) {
    state.kids.forEach((kid) => {
      if (kid.retreating) return;

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
        if (state.health <= 0) {
          state.lost = true;
        }
      }

      kid.throwCooldown -= delta;
      if (kid.throwCooldown <= 0 && dist < diff.throwRange && dist > 1.5) {
        kid.throwCooldown = diff.throwInterval + random(0, 0.5);
        kid.holdingToy = true;
        kid.holdTimer = 0.35;
        state.toys.push({
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

      if (kid.holdTimer > 0) {
        kid.holdTimer -= delta;
        if (kid.holdTimer <= 0) {
          kid.holdingToy = false;
        }
      }
    });
  }

  state.toys = state.toys.filter((toy) => {
    toy.t += delta * (1.8 + state.night * 0.04);
    toy.x = toy.startX + (toy.tx - toy.startX) * toy.t;
    toy.y = toy.startY + (toy.ty - toy.startY) * toy.t;

    if (toy.t >= 1 && !godMode) {
      state.health -= 1;
      playPlayerHit();
      if (state.health <= 0) {
        state.lost = true;
      }
      return false;
    }
    return toy.t < 1;
  });

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

function drawFlyingToys(ctx, toys) {
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
  const sprites = buildSpriteList(state.world, state, width, height);
  renderWorld3D(ctx, width, height, state.world, state, sprites);

  if (state.phase === 'NIGHT') {
    drawFlyingToys(ctx, state.toys);
    drawSoundOverlay(ctx, width, height, state.soundPower);
  }

  const phaseLabel = state.phase === 'DAY' ? '☀️ DAY' : '🌙 NIGHT';
  const phaseColor = state.phase === 'DAY' ? '#fbbf24' : '#a78bfa';

  ctx.fillStyle = 'rgba(15,23,42,0.55)';
  ctx.fillRect(0, 0, 220, 72);
  drawText(ctx, `${phaseLabel} ${state.night}/${MAX_NIGHTS}`, 12, 12, {
    align: 'left',
    baseline: 'top',
    size: 24,
    color: phaseColor,
  });
  drawText(ctx, formatTime(Math.max(0, state.phaseTimer)), 12, 40, {
    align: 'left',
    baseline: 'top',
    size: 20,
    color: '#f8fafc',
  });

  for (let i = 0; i < MAX_HEALTH; i += 1) {
    drawText(ctx, i < Math.ceil(state.health) ? '❤️' : '🖤', width - 28 - i * 32, 12, {
      size: 22,
    });
  }

  ctx.fillStyle = 'rgba(15,23,42,0.55)';
  ctx.fillRect(12, height - 58, 140, 46);
  drawText(ctx, 'Sound maker', 20, height - 50, { align: 'left', size: 13, color: '#94a3b8' });
  ctx.fillStyle = '#334155';
  ctx.fillRect(20, height - 32, 120, 10);
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(20, height - 32, 120 * (state.soundMakerCharges / 100), 10);
  drawText(ctx, 'Hold X', 20, height - 14, { align: 'left', size: 12, color: '#f9a8d4' });

  ctx.fillStyle = 'rgba(15,23,42,0.55)';
  ctx.fillRect(width - 200, height - 82, 188, 70);
  drawText(ctx, '↑↓←→ — move', width - 106, height - 70, { size: 12, color: '#cbd5e1' });
  drawText(ctx, 'Hold click — look around', width - 106, height - 54, { size: 12, color: '#cbd5e1' });
  drawText(ctx, 'X — loud sound maker', width - 106, height - 38, { size: 12, color: '#cbd5e1' });
  drawText(ctx, 'E — use toy box', width - 106, height - 22, { size: 12, color: '#cbd5e1' });

  if (state.phase === 'DAY' && state.phaseElapsed < DAY_BANNER_TIME) {
    const alpha = state.phaseElapsed > DAY_BANNER_TIME - 1
      ? DAY_BANNER_TIME - state.phaseElapsed
      : Math.min(1, state.phaseElapsed / 0.5);
    ctx.fillStyle = `rgba(0,0,0,${0.45 * alpha})`;
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, '☀️ Daytime — rest up, baby! ☀️', width / 2, height * 0.38, {
      size: 36,
      color: `rgba(251,191,36,${alpha})`,
    });
    drawText(ctx, 'Explore the nursery in 3D', width / 2, height * 0.46, {
      size: 20,
      color: `rgba(255,255,255,${alpha * 0.9})`,
    });
    drawText(ctx, 'Walk to a TOY box and press E to recharge', width / 2, height * 0.53, {
      size: 16,
      color: `rgba(203,213,225,${alpha * 0.85})`,
    });
  }

  if (state.phase === 'DAY' && state.nearToyBox) {
    drawText(ctx, 'Press E — recharge sound maker', width / 2, height * 0.72, {
      size: 18,
      color: '#fbbf24',
    });
  }

  if (state.phase === 'NIGHT' && state.phaseElapsed < 4) {
    const alpha = Math.min(1, (4 - state.phaseElapsed) / 2);
    ctx.fillStyle = `rgba(30,0,60,${0.5 * alpha})`;
    ctx.fillRect(0, height * 0.3, width, 80);
    drawText(ctx, '🌙 The big kids are coming!!!', width / 2, height * 0.35, {
      size: 30,
      color: `rgba(248,113,113,${alpha})`,
    });
  }

  if (state.toyBoxVisible) {
    drawText(ctx, 'Kids ran off! Find the TOY box — press E', width / 2, height * 0.78, {
      size: 18,
      color: '#fbbf24',
    });
  }

  if (state.won) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, 'YOU WIN!', width / 2, height / 2 - 30, { size: 52, color: '#facc15' });
    drawText(ctx, '20 nights of baby revenge!', width / 2, height / 2 + 20, { size: 22, color: '#fff' });
    drawText(ctx, 'Press R to play again', width / 2, height / 2 + 60, { size: 18, color: '#94a3b8' });
  }

  if (state.lost) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, 'GAME OVER', width / 2, height / 2 - 30, { size: 48, color: '#ef4444' });
    drawText(ctx, 'The big kids got you!', width / 2, height / 2 + 15, { size: 22, color: '#fff' });
    drawText(ctx, `Night ${state.night}`, width / 2, height / 2 + 45, { size: 18, color: '#94a3b8' });
    drawText(ctx, 'Press R to try again', width / 2, height / 2 + 75, { size: 18, color: '#94a3b8' });
  }
}

export { MAX_NIGHTS, DAY_DURATION, NIGHT_DURATION };
