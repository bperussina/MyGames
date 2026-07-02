import {
  createCanvas,
  clearCanvas,
  drawText,
  loop,
} from '@mygames/shared';

const GAME_TITLE = 'car crashing with dashing';
const teleportParam = new URLSearchParams(window.location.search).has('teleport');

const { ctx } = createCanvas();
const { canvas } = ctx;

let warp = teleportParam ? 1.8 : 0;
let titleAlpha = 0;
let roadReveal = 0;

function drawRoad(width, height, reveal) {
  if (reveal <= 0) return;

  const cx = width / 2;
  const topY = height * 0.42;
  const bottomY = height;
  const topW = width * 0.08 * reveal;
  const bottomW = width * 0.92;

  ctx.save();
  ctx.globalAlpha = Math.min(1, reveal);

  const roadGrad = ctx.createLinearGradient(0, topY, 0, bottomY);
  roadGrad.addColorStop(0, '#334155');
  roadGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = roadGrad;
  ctx.beginPath();
  ctx.moveTo(cx - topW, topY);
  ctx.lineTo(cx + topW, topY);
  ctx.lineTo(cx + bottomW / 2, bottomY);
  ctx.lineTo(cx - bottomW / 2, bottomY);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(250,204,21,0.85)';
  ctx.lineWidth = 3;
  ctx.setLineDash([18, 16]);
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  ctx.lineTo(cx, bottomY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(15,23,42,0.35)';
  ctx.fillRect(0, height * 0.72, width, height * 0.28);
  ctx.restore();
}

function render(delta) {
  const { width, height } = canvas;

  if (warp > 0) {
    warp = Math.max(0, warp - delta);
    const flash = warp > 0.35 ? 1 - (1.8 - warp) / 1.45 : 0;
    clearCanvas(ctx, flash > 0.2 ? '#e0f2fe' : '#22c55e');
    if (flash > 0.05) {
      ctx.fillStyle = `rgba(255,255,255,${flash * 0.75})`;
      ctx.fillRect(0, 0, width, height);
    }
    drawText(ctx, 'TELEPORTING...', width / 2, height * 0.38, {
      color: '#0f172a',
      size: 36,
    });
    return;
  }

  titleAlpha = Math.min(1, titleAlpha + delta * 1.2);
  roadReveal = Math.min(1, roadReveal + delta * 0.55);

  clearCanvas(ctx, '#22c55e');
  drawRoad(width, height, roadReveal);

  ctx.globalAlpha = titleAlpha;
  drawText(ctx, GAME_TITLE, width / 2, height * 0.22, {
    color: '#14532d',
    size: 44,
  });
  drawText(ctx, 'The best game ever — realism incoming.', width / 2, height * 0.3, {
    color: '#166534',
    size: 18,
  });
  ctx.globalAlpha = 1;
}

loop(render);
