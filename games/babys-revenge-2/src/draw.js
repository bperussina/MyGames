import { drawText, drawCircle, drawRect } from '@mygames/shared';

export function drawNursery(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#fce7f3');
  gradient.addColorStop(1, '#e0f2fe');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#d4a574';
  ctx.fillRect(0, height * 0.75, width, height * 0.25);

  ctx.fillStyle = '#fbcfe8';
  ctx.fillRect(width * 0.1, height * 0.15, width * 0.8, height * 0.6);
  ctx.strokeStyle = '#f9a8d4';
  ctx.lineWidth = 4;
  ctx.strokeRect(width * 0.1, height * 0.15, width * 0.8, height * 0.6);
}

export function drawBaby(ctx, x, y, size, bounce = 0) {
  const by = y + bounce;
  drawCircle(ctx, x, by - size * 0.3, size * 0.35, '#fcd34d');
  drawCircle(ctx, x, by, size * 0.45, '#fde68a');
  drawCircle(ctx, x - size * 0.2, by - size * 0.35, size * 0.06, '#1e293b');
  drawCircle(ctx, x + size * 0.2, by - size * 0.35, size * 0.06, '#1e293b');
  ctx.beginPath();
  ctx.arc(x, by - size * 0.2, size * 0.12, 0, Math.PI);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.stroke();

  drawRect(ctx, x - size * 0.5, by + size * 0.2, size, size * 0.35, '#bfdbfe');
}

export function drawDuck(ctx, x, y, size, waddle = 0) {
  drawCircle(ctx, x + waddle, y, size * 0.5, '#facc15');
  drawCircle(ctx, x + size * 0.3 + waddle, y - size * 0.2, size * 0.35, '#facc15');
  drawCircle(ctx, x + size * 0.5 + waddle, y - size * 0.15, size * 0.12, '#f97316');
  drawCircle(ctx, x + size * 0.35 + waddle, y - size * 0.25, size * 0.05, '#1e293b');
}

export function drawBigKid(ctx, x, y, size, mood = 'angry', retreating = false) {
  const color = mood === 'scared' ? '#94a3b8' : '#6366f1';
  const lean = retreating ? (x < ctx.canvas.width / 2 ? -15 : 15) : 0;

  drawCircle(ctx, x + lean, y - size * 0.55, size * 0.22, color);
  drawRect(ctx, x - size * 0.15 + lean, y - size * 0.35, size * 0.3, size * 0.55, color);
  drawRect(ctx, x - size * 0.35 + lean, y - size * 0.25, size * 0.15, size * 0.45, color);
  drawRect(ctx, x + size * 0.2 + lean, y - size * 0.25, size * 0.15, size * 0.45, color);

  if (mood === 'angry') {
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.1 + lean, y - size * 0.58);
    ctx.lineTo(x - size * 0.02 + lean, y - size * 0.52);
    ctx.moveTo(x + size * 0.1 + lean, y - size * 0.58);
    ctx.lineTo(x + size * 0.02 + lean, y - size * 0.52);
    ctx.stroke();
  } else {
    drawText(ctx, '!!', x + lean, y - size * 0.55, { size: 16, color: '#ef4444' });
  }
}

export function drawToy(ctx, x, y, size, type = 0) {
  const colors = ['#ef4444', '#22c55e', '#3b82f6', '#a855f7'];
  const color = colors[type % colors.length];
  if (type % 2 === 0) {
    drawRect(ctx, x - size / 2, y - size / 2, size, size, color);
  } else {
    drawCircle(ctx, x, y, size / 2, color);
  }
}

export function drawToyBox(ctx, x, y, w, h, glowing) {
  ctx.fillStyle = glowing ? '#fbbf24' : '#b45309';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(x + 5, y + 5, w - 10, h - 10);
  drawText(ctx, 'TOYS', x + w / 2, y + h / 2, { size: 18, color: '#fef3c7' });
  if (glowing) {
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 4, y - 4, w + 8, h + 8);
  }
}

export function drawSoundWaves(ctx, x, y, power) {
  for (let i = 1; i <= 3; i += 1) {
    const radius = 30 * i + power * 20 + Math.sin(Date.now() / 100 + i) * 5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.4 - i * 0.1})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

export function drawSpeechBubble(ctx, x, y, text, maxWidth = 280) {
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;

  const padding = 12;
  ctx.font = '18px sans-serif';
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);

  const lineHeight = 22;
  const bubbleH = lines.length * lineHeight + padding * 2;
  const bubbleW = maxWidth + padding * 2;

  ctx.beginPath();
  ctx.roundRect(x - bubbleW / 2, y - bubbleH, bubbleW, bubbleH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x, y + 15);
  ctx.lineTo(x + 10, y);
  ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';
  lines.forEach((ln, i) => {
    ctx.fillText(ln, x, y - bubbleH + padding + 16 + i * lineHeight);
  });
}

export function drawCrib(ctx, cx, cy, w, h) {
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 5;
  ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
  for (let i = 0; i < 5; i += 1) {
    const bx = cx - w / 2 + (w / 4) * i;
    ctx.beginPath();
    ctx.moveTo(bx, cy - h / 2);
    ctx.lineTo(bx, cy + h / 2);
    ctx.stroke();
  }
}

export function drawSoundMakerIcon(ctx, x, y) {
  drawRect(ctx, x - 20, y - 30, 40, 50, '#f472b6');
  drawCircle(ctx, x, y - 35, 12, '#ec4899');
  drawText(ctx, 'X', x, y + 5, { size: 14, color: '#fff' });
}
