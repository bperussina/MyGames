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

export function isPlayClicked(x, y, width, height) {
  const btn = getPlayButtonBounds(width, height);
  return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h;
}

export function updateMenu(input, width, height, pointerClick) {
  if (pointerClick && isPlayClicked(pointerClick.x, pointerClick.y, width, height)) {
    return true;
  }
  if (input.isPressed('enter', ' ', 'p')) {
    return true;
  }
  return false;
}

export function renderMenu(ctx, width, height, hover = false) {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#22c55e');
  grad.addColorStop(0.5, '#16a34a');
  grad.addColorStop(1, '#15803d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  drawText(ctx, "Baby's Revenge 2", width / 2, height * 0.32, {
    size: 52,
    color: '#ffffff',
  });

  drawText(ctx, 'The big kids are back…', width / 2, height * 0.4, {
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

  drawText(ctx, 'Click Play or press Enter', width / 2, height * 0.72, {
    size: 18,
    color: '#dcfce7',
  });
}
