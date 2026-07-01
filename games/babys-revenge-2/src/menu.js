import { drawText } from '@mygames/shared';

export function getPlayButtonBounds(width, height) {
  const bw = 220;
  const bh = 64;
  return {
    x: width / 2 - bw / 2,
    y: height / 2 + 20,
    w: bw,
    h: bh,
  };
}

export function getContinueButtonBounds(width, height) {
  const bw = 220;
  const bh = 54;
  return {
    x: width / 2 - bw / 2,
    y: height / 2 + 100,
    w: bw,
    h: bh,
  };
}

export function getUpdateButtonBounds(width, height) {
  const bw = 280;
  const bh = 64;
  return {
    x: width / 2 - bw / 2,
    y: height / 2 + 30,
    w: bw,
    h: bh,
  };
}

export function isPlayClicked(x, y, width, height) {
  const btn = getPlayButtonBounds(width, height);
  return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h;
}

export function isContinueClicked(x, y, width, height) {
  const btn = getContinueButtonBounds(width, height);
  return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h;
}

export function isUpdateClicked(x, y, width, height) {
  const btn = getUpdateButtonBounds(width, height);
  return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h;
}

export function updateMenu(input, width, height, pointerClick, options = {}) {
  const { canContinue = false } = options;

  if (pointerClick) {
    if (isPlayClicked(pointerClick.x, pointerClick.y, width, height)) return 'play';
    if (canContinue && isContinueClicked(pointerClick.x, pointerClick.y, width, height)) return 'continue';
  }
  if (input.isPressed('enter', ' ', 'p')) return 'play';
  if (canContinue && input.isPressed('c')) return 'continue';
  return null;
}

export function renderMenu(ctx, width, height, hover = false, options = {}) {
  const { canContinue = false } = options;
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#22c55e');
  grad.addColorStop(0.5, '#16a34a');
  grad.addColorStop(1, '#15803d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  drawText(ctx, "Baby's Revenge 2", width / 2, height * 0.28, {
    size: 52,
    color: '#ffffff',
  });

  drawText(ctx, 'The big kids are back…', width / 2, height * 0.36, {
    size: 22,
    color: '#dcfce7',
  });

  const btn = getPlayButtonBounds(width, height);
  const btnColor = hover ? '#fef08a' : '#ffffff';
  const textColor = hover ? '#166534' : '#15803d';

  ctx.fillStyle = btnColor;
  ctx.beginPath();
  ctx.roundRect(btn.x, btn.y, btn.w, btn.h, 14);
  ctx.fill();
  ctx.strokeStyle = '#14532d';
  ctx.lineWidth = 4;
  ctx.stroke();

  drawText(ctx, 'PLAY', width / 2, btn.y + btn.h / 2, {
    size: 36,
    color: textColor,
  });

  if (canContinue) {
    const cbtn = getContinueButtonBounds(width, height);
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath();
    ctx.roundRect(cbtn.x, cbtn.y, cbtn.w, cbtn.h, 12);
    ctx.fill();
    drawText(ctx, 'CONTINUE', width / 2, cbtn.y + cbtn.h / 2, {
      size: 24,
      color: '#fff',
    });
    drawText(ctx, 'Resume where you left off (C)', width / 2, height * 0.78, {
      size: 16,
      color: '#dcfce7',
    });
  } else {
    drawText(ctx, 'Click Play or press Enter', width / 2, height * 0.72, {
      size: 18,
      color: '#dcfce7',
    });
  }
}

export function renderUpdateScreen(ctx, width, height, hover = false) {
  ctx.fillStyle = 'rgba(15,23,42,0.92)';
  ctx.fillRect(0, 0, width, height);

  drawText(ctx, '🎮 New Game Ready!', width / 2, height * 0.3, {
    size: 44,
    color: '#facc15',
  });
  drawText(ctx, 'An updated version of Baby\'s Revenge 2 is here.', width / 2, height * 0.4, {
    size: 20,
    color: '#e2e8f0',
  });
  drawText(ctx, 'Your old session was saved — tap below for the fresh game.', width / 2, height * 0.47, {
    size: 16,
    color: '#94a3b8',
  });

  const btn = getUpdateButtonBounds(width, height);
  ctx.fillStyle = hover ? '#fde047' : '#facc15';
  ctx.beginPath();
  ctx.roundRect(btn.x, btn.y, btn.w, btn.h, 14);
  ctx.fill();
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 3;
  ctx.stroke();

  drawText(ctx, 'PLAY UPDATED GAME', width / 2, btn.y + btn.h / 2, {
    size: 22,
    color: '#422006',
  });
}

export function renderOfflineBanner(ctx, width, height) {
  ctx.fillStyle = 'rgba(127,29,29,0.9)';
  ctx.fillRect(0, 0, width, 44);
  drawText(ctx, '⚠ Connection lost — your game is saved. Reconnecting…', width / 2, 22, {
    size: 16,
    color: '#fecaca',
  });
}

export function renderLoadError(ctx, width, height, message) {
  ctx.fillStyle = 'rgba(15,23,42,0.95)';
  ctx.fillRect(0, 0, width, height);
  drawText(ctx, 'Could not load the game', width / 2, height * 0.4, {
    size: 32,
    color: '#f87171',
  });
  drawText(ctx, message || 'Check your connection and refresh.', width / 2, height * 0.48, {
    size: 16,
    color: '#94a3b8',
  });
  drawText(ctx, 'Press R to retry', width / 2, height * 0.58, {
    size: 18,
    color: '#facc15',
  });
}
