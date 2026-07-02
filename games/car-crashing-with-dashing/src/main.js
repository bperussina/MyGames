import {
  createCanvas,
  clearCanvas,
  drawText,
  Input,
  loop,
} from '@mygames/shared';

const GAME_TITLE = 'car crashing with dashing';
const teleportParam = new URLSearchParams(window.location.search).has('teleport');

const { canvas, ctx } = createCanvas();
const input = new Input(canvas);

let warp = teleportParam ? 1.8 : 0;
let titleAlpha = 0;
let roadReveal = 0;
let started = false;
let playPulse = 0;
let hoverPlay = false;
let clickLatch = false;

function roadGeometry(width, height, reveal = 1) {
  const cx = width / 2;
  const topY = height * 0.42;
  const bottomY = height;
  const topW = width * 0.08 * reveal;
  const bottomW = width * 0.92;
  return { cx, topY, bottomY, topW, bottomW };
}

function roadWidthAtY(geo, y) {
  const t = Math.max(0, Math.min(1, (y - geo.topY) / (geo.bottomY - geo.topY)));
  return geo.topW * 2 + (geo.bottomW - geo.topW * 2) * t;
}

function drawRoad(width, height, reveal) {
  if (reveal <= 0) return roadGeometry(width, height, reveal);

  const geo = roadGeometry(width, height, reveal);
  const { cx, topY, bottomY, topW, bottomW } = geo;

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

  return geo;
}

function getPlayButtonBounds(width, height, geo) {
  const centerY = height * 0.62;
  const roadW = roadWidthAtY(geo, centerY);
  const btnW = Math.min(roadW * 0.82, width * 0.78, 420);
  const btnH = btnW * 0.34;
  return {
    x: geo.cx - btnW / 2,
    y: centerY - btnH / 2,
    w: btnW,
    h: btnH,
    cx: geo.cx,
    cy: centerY,
  };
}

function canvasPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}

function pointInButton(x, y, btn) {
  return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h;
}

function drawPlayButton(btn, pulse, hover, pressed) {
  const scale = 1 + Math.sin(pulse) * 0.04 + (hover ? 0.05 : 0) + (pressed ? -0.03 : 0);
  const w = btn.w * scale;
  const h = btn.h * scale;
  const x = btn.cx - w / 2;
  const y = btn.cy - h / 2;
  const r = h * 0.28;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.45)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;

  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, pressed ? '#facc15' : '#fde047');
  grad.addColorStop(1, pressed ? '#eab308' : '#facc15');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 5;
  ctx.stroke();

  drawText(ctx, 'PLAY', btn.cx, btn.cy, {
    size: Math.floor(h * 0.42),
    color: '#422006',
  });
  ctx.restore();
}

function updateInput(btn) {
  const pt = canvasPoint(input.pointer.x, input.pointer.y);
  hoverPlay = !started && pointInButton(pt.x, pt.y, btn);
  canvas.style.cursor = hoverPlay ? 'pointer' : 'default';

  if (!started && input.pointer.down && hoverPlay && !clickLatch) {
    started = true;
    clickLatch = true;
  }
  if (!input.pointer.down) clickLatch = false;
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
  playPulse += delta * 4;

  clearCanvas(ctx, '#22c55e');
  const geo = drawRoad(width, height, roadReveal);
  const btn = getPlayButtonBounds(width, height, geo);

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

  if (!started && roadReveal > 0.5) {
    updateInput(btn);
    drawPlayButton(btn, playPulse, hoverPlay, input.pointer.down && hoverPlay);
  } else if (started) {
    drawText(ctx, 'GO!', width / 2, height * 0.62, {
      color: '#fde047',
      size: 72,
    });
    drawText(ctx, 'Driving coming soon…', width / 2, height * 0.72, {
      color: '#dcfce7',
      size: 22,
    });
  }
}

loop(render);
