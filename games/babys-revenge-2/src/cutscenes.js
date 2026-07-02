import { drawText } from '@mygames/shared';
import { drawNursery, drawBaby, drawDuck } from './draw.js';
import { playQuack } from './audio.js';

const DUCK_COUNT = 3;

export function createCutsceneState() {
  return {
    id: 'CUTSCENE_DUCKS',
    timer: 0,
    lineIndex: 0,
    quackTimer: 0,
    done: false,
  };
}

export function updateCutscene(state, delta, input, width, height) {
  state.timer += delta;
  state.quackTimer += delta;

  if (state.id === 'CUTSCENE_DUCKS') {
    if (state.quackTimer > 0.6) {
      playQuack();
      state.quackTimer = 0;
    }
    if (state.timer > 6 || input.isPressed('enter', ' ', 'x')) {
      return { ...state, id: 'CUTSCENE_KIDS', timer: 0, lineIndex: 0 };
    }
  }

  if (state.id === 'CUTSCENE_KIDS') {
    const lineDuration = 2.5;
    if (state.timer > (state.lineIndex + 1) * lineDuration) {
      state.lineIndex += 1;
    }
    const lines = [
      'Oh no… they heard us!',
      'We need to go!',
      '…',
      'We should get REVENGE!',
      'Let\'s get more toys!',
    ];
    if (state.lineIndex >= lines.length - 1 && state.timer > (lines.length) * lineDuration) {
      return { ...state, done: true };
    }
    if (input.isPressed('enter', ' ') && state.timer > 1) {
      if (state.lineIndex < lines.length - 1) {
        state.lineIndex += 1;
        state.timer = (state.lineIndex) * lineDuration;
      } else {
        return { ...state, done: true };
      }
    }
  }

  return state;
}

export function renderCutscene(state, ctx, width, height) {
  drawNursery(ctx, width, height);

  if (state.id === 'CUTSCENE_DUCKS') {
    const bounce = Math.sin(state.timer * 4) * 12;
    const titleBounce = Math.sin(state.timer * 2) * 4;

    drawText(ctx, "Baby's Revenge 2", width / 2, height * 0.12 + titleBounce, {
      size: 42,
      color: '#7c3aed',
    });
    drawText(ctx, '🎵 Dance time! 🎵', width / 2, height * 0.2, { size: 22, color: '#db2777' });

    drawBaby(ctx, width / 2, height * 0.5, 80, bounce);

    for (let i = 0; i < DUCK_COUNT; i += 1) {
      const dx = width / 2 + (i - 1) * 100;
      const duckBounce = Math.sin(state.timer * 5 + i * 1.5) * 10;
      const waddle = Math.sin(state.timer * 8 + i) * 6;
      drawDuck(ctx, dx, height * 0.62 + duckBounce, 40, waddle);
    }

    drawText(ctx, 'Press Space to continue', width / 2, height * 0.9, {
      size: 18,
      color: '#64748b',
    });
  }

  if (state.id === 'CUTSCENE_KIDS') {
    const lines = [
      { speaker: 'Kid 1', text: 'Oh no… they heard us!' },
      { speaker: 'Kid 2', text: 'We need to go!' },
      { speaker: 'Kid 1', text: '…' },
      { speaker: 'Kid 2', text: 'We should get REVENGE!' },
      { speaker: 'Kid 1', text: "Let's get more toys to throw!" },
    ];

    drawText(ctx, 'The Big Kids', width / 2, height * 0.1, { size: 32, color: '#4f46e5' });

    const kid1x = width * 0.3;
    const kid2x = width * 0.7;
    const ky = height * 0.45;

    ctx.fillStyle = '#6366f1';
    drawKidSilhouette(ctx, kid1x, ky, 60);
    drawKidSilhouette(ctx, kid2x, ky, 65);

    const current = lines[Math.min(state.lineIndex, lines.length - 1)];
    const bx = state.lineIndex % 2 === 0 ? kid1x : kid2x;

    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    const bubbleY = ky - 100;
    const text = current.text;
    ctx.font = '20px sans-serif';
    const tw = Math.min(ctx.measureText(text).width + 40, 320);
    ctx.beginPath();
    ctx.roundRect(bx - tw / 2, bubbleY - 50, tw, 60, 10);
    ctx.fill();
    ctx.stroke();
    drawText(ctx, text, bx, bubbleY - 22, { size: 20, color: '#1e293b' });

    if (state.lineIndex >= lines.length - 1) {
      drawText(ctx, 'They\'re coming back…', width / 2, height * 0.75, {
        size: 28,
        color: '#dc2626',
      });
    }

    drawText(ctx, 'Press Space to continue', width / 2, height * 0.9, {
      size: 18,
      color: '#64748b',
    });
  }
}

function drawKidSilhouette(ctx, x, y, size) {
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(x, y - size * 0.55, size * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x - size * 0.15, y - size * 0.35, size * 0.3, size * 0.55);
  ctx.fillRect(x - size * 0.35, y - size * 0.25, size * 0.15, size * 0.45);
  ctx.fillRect(x + size * 0.2, y - size * 0.25, size * 0.15, size * 0.45);
}
