import { random } from '@mygames/shared';
import {
  drawNursery,
  drawBaby,
  drawBigKid,
  drawToy,
  drawToyBox,
  drawSoundWaves,
  drawCrib,
  drawSoundMakerIcon,
} from './draw.js';
import { drawText } from '@mygames/shared';
import { playAnnoyingSound } from './audio.js';

const DAY_DURATION = 180;
const NIGHT_DURATION = 180;
const MAX_NIGHTS = 20;
const MAX_HEALTH = 3;

export function createGameState() {
  return {
    phase: 'DAY',
    night: 1,
    phaseTimer: DAY_DURATION,
    health: MAX_HEALTH,
    annoyance: 0,
    soundCooldown: 0,
    kids: [],
    toys: [],
    toyBoxVisible: false,
    toyBoxTimer: 0,
    kidsRetreated: false,
    retreatTimer: 0,
    throwTimer: 0,
    soundPower: 0,
    won: false,
    lost: false,
    soundMakerCharges: 100,
  };
}

function spawnKids(night, width, height) {
  const count = Math.min(2 + Math.floor(night / 5), 4);
  const kids = [];
  for (let i = 0; i < count; i += 1) {
    const left = i % 2 === 0;
    kids.push({
      x: left ? width * 0.12 : width * 0.88,
      y: height * 0.55,
      side: left ? 'left' : 'right',
      mood: 'angry',
      retreating: false,
      annoyance: 0,
      size: 55 + night * 0.5,
    });
  }
  return kids;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function updateGameplay(state, delta, input, width, height, admin) {
  if (state.won || state.lost) {
    if (input.isPressed('r', ' ')) {
      return createGameState();
    }
    return state;
  }

  const godMode = admin?.godMode;

  if (state.phase === 'DAY') {
    state.phaseTimer -= delta * (admin?.speedMultiplier ?? 1);
    if (state.phaseTimer <= 0) {
      state.phase = 'NIGHT';
      state.phaseTimer = NIGHT_DURATION;
      state.kids = spawnKids(state.night, width, height);
      state.toys = [];
      state.kidsRetreated = false;
      state.toyBoxVisible = false;
      state.annoyance = 0;
      state.health = MAX_HEALTH;
    }
    return state;
  }

  // NIGHT phase
  state.phaseTimer -= delta * (admin?.speedMultiplier ?? 1);
  state.soundCooldown = Math.max(0, state.soundCooldown - delta);

  const pressingX = input.isDown('x');
  if (pressingX && state.soundCooldown <= 0 && state.soundMakerCharges > 0) {
    state.soundCooldown = 0.08;
    state.soundPower = Math.min(1, state.soundPower + 0.05);
    state.soundMakerCharges -= 1;
    playAnnoyingSound(state.soundPower);

    state.kids.forEach((kid) => {
      kid.annoyance += 8 + state.night * 0.3;
      if (kid.annoyance > 50) {
        kid.retreating = true;
        kid.mood = 'scared';
      }
    });
  } else if (!pressingX) {
    state.soundPower = Math.max(0, state.soundPower - delta * 0.5);
  }

  const activeKids = state.kids.filter((k) => !k.retreating);
  const allRetreating = state.kids.length > 0 && activeKids.length === 0;

  if (allRetreating && !state.kidsRetreated) {
    state.kidsRetreated = true;
    state.toyBoxVisible = true;
    state.toyBoxTimer = 8;
  }

  if (state.kidsRetreated) {
    state.retreatTimer += delta;
    state.kids.forEach((kid) => {
      const dir = kid.side === 'left' ? -1 : 1;
      kid.x += dir * 40 * delta;
    });

    if (state.toyBoxTimer > 0) {
      state.toyBoxTimer -= delta;
    }

    if (input.pointer.down && state.toyBoxVisible) {
      const bx = width / 2 - 50;
      const by = height * 0.65;
      const { x, y } = input.pointer;
      if (x >= bx && x <= bx + 100 && y >= by && y <= by + 70) {
        state.soundMakerCharges = 100;
        state.toyBoxVisible = false;
        state.kidsRetreated = false;
        state.retreatTimer = 0;
        state.kids = spawnKids(state.night + 1, width, height);
        state.kids.forEach((k) => {
          k.annoyance = 0;
          k.retreating = false;
          k.mood = 'angry';
        });
      }
    }

    if (state.retreatTimer > 6 && !state.toyBoxVisible) {
      state.kidsRetreated = false;
      state.retreatTimer = 0;
      state.kids = spawnKids(state.night, width, height);
    }
  }

  if (!state.kidsRetreated) {
    state.throwTimer += delta;
    const throwInterval = Math.max(0.8, 2.2 - state.night * 0.08);
    if (state.throwTimer >= throwInterval) {
      state.throwTimer = 0;
      const throwers = state.kids.filter((k) => !k.retreating);
      if (throwers.length > 0) {
        const kid = throwers[Math.floor(random(0, throwers.length))];
        state.toys.push({
          x: kid.x,
          y: kid.y - 30,
          vx: (width / 2 - kid.x) * (0.8 + state.night * 0.02),
          vy: -100 - random(0, 80),
          size: 18 + random(0, 10),
          type: Math.floor(random(0, 4)),
          rotation: 0,
        });
      }
    }
  }

  const babyX = width / 2;
  const babyY = height * 0.58;
  const hitRadius = 45;

  state.toys = state.toys.filter((toy) => {
    toy.x += toy.vx * delta;
    toy.y += toy.vy * delta;
    toy.vy += 320 * delta;
    toy.rotation += delta * 6;

    const dist = Math.hypot(toy.x - babyX, toy.y - babyY);
    if (dist < hitRadius && !godMode) {
      state.health -= 1;
      if (state.health <= 0) {
        state.lost = true;
      }
      return false;
    }

    return toy.y < height + 50 && toy.x > -50 && toy.x < width + 50;
  });

  if (state.phaseTimer <= 0) {
    if (state.night >= MAX_NIGHTS) {
      state.won = true;
    } else {
      state.night += 1;
      state.phase = 'DAY';
      state.phaseTimer = DAY_DURATION;
      state.kids = [];
      state.toys = [];
      state.kidsRetreated = false;
      state.toyBoxVisible = false;
    }
  }

  return state;
}

export function renderGameplay(state, ctx, width, height) {
  drawNursery(ctx, width, height);

  const babyX = width / 2;
  const babyY = height * 0.58;

  drawCrib(ctx, babyX, babyY + 20, 140, 90);
  drawBaby(ctx, babyX, babyY, 70, Math.sin(Date.now() / 300) * 3);

  if (state.phase === 'NIGHT' && state.soundPower > 0) {
    drawSoundWaves(ctx, babyX, babyY - 20, state.soundPower);
  }

  state.kids.forEach((kid) => {
    drawBigKid(ctx, kid.x, kid.y, kid.size, kid.mood, kid.retreating);
  });

  state.toys.forEach((toy) => {
    ctx.save();
    ctx.translate(toy.x, toy.y);
    ctx.rotate(toy.rotation);
    drawToy(ctx, 0, 0, toy.size, toy.type);
    ctx.restore();
  });

  if (state.toyBoxVisible) {
    drawToyBox(ctx, width / 2 - 50, height * 0.65, 100, 70, true);
    drawText(ctx, 'Click toy box!', width / 2, height * 0.65 + 95, {
      size: 16,
      color: '#b45309',
    });
  }

  drawSoundMakerIcon(ctx, width - 60, height - 60);
  drawText(ctx, 'Hold X', width - 60, height - 15, { size: 14, color: '#64748b' });

  const phaseLabel = state.phase === 'DAY' ? '☀️ DAY' : '🌙 NIGHT';
  const phaseColor = state.phase === 'DAY' ? '#f59e0b' : '#6366f1';

  drawText(ctx, `${phaseLabel} ${state.night} / ${MAX_NIGHTS}`, 16, 16, {
    align: 'left',
    baseline: 'top',
    size: 26,
    color: phaseColor,
  });

  drawText(ctx, formatTime(Math.max(0, state.phaseTimer)), 16, 48, {
    align: 'left',
    baseline: 'top',
    size: 22,
    color: '#1e293b',
  });

  for (let i = 0; i < MAX_HEALTH; i += 1) {
    const heartX = width - 30 - i * 35;
    drawText(ctx, i < state.health ? '❤️' : '🖤', heartX, 20, { size: 24 });
  }

  const chargeW = 120;
  drawText(ctx, 'Sound', 16, height - 50, { align: 'left', size: 14, color: '#64748b' });
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(16, height - 35, chargeW, 12);
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(16, height - 35, chargeW * (state.soundMakerCharges / 100), 12);

  if (state.phase === 'DAY') {
    drawText(ctx, 'Get ready… the big kids are plotting!', width / 2, height * 0.35, {
      size: 24,
      color: '#7c3aed',
    });
    drawText(ctx, '☀️ Daytime — rest up, baby! ☀️', width / 2, height * 0.42, {
      size: 18,
      color: '#64748b',
    });
  }

  if (state.won) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, 'YOU WIN!', width / 2, height / 2 - 30, { size: 52, color: '#facc15' });
    drawText(ctx, '20 nights of baby revenge!', width / 2, height / 2 + 20, {
      size: 22,
      color: '#fff',
    });
    drawText(ctx, 'Press R to play again', width / 2, height / 2 + 60, {
      size: 18,
      color: '#94a3b8',
    });
  }

  if (state.lost) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, width, height);
    drawText(ctx, 'GAME OVER', width / 2, height / 2 - 30, { size: 48, color: '#ef4444' });
    drawText(ctx, 'Too many toys hit you!', width / 2, height / 2 + 15, {
      size: 22,
      color: '#fff',
    });
    drawText(ctx, `You reached Night ${state.night}`, width / 2, height / 2 + 45, {
      size: 18,
      color: '#94a3b8',
    });
    drawText(ctx, 'Press R to try again', width / 2, height / 2 + 75, {
      size: 18,
      color: '#94a3b8',
    });
  }
}

export { MAX_NIGHTS, DAY_DURATION, NIGHT_DURATION };
