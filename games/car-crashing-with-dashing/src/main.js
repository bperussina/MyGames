import {
  createCanvas,
  clearCanvas,
  drawText,
  drawCircle,
  Input,
  loop,
} from '@mygames/shared';
import {
  getGamepad,
  readMovement,
  readPressedActions,
} from './gamepad.js';
import {
  createControllerMap,
  showControllerMap,
  isControllerMapVisible,
  loadBindings,
} from './controllerMap.js';

const GAME_TITLE = 'car crashing with dashing';
const COMING_SOON_TIME = 5;
const teleportParam = new URLSearchParams(window.location.search).has('teleport');

const { canvas, ctx } = createCanvas();
const input = new Input(canvas);

/** title | comingSoon | world */
let mode = 'title';
let warp = teleportParam ? 1.8 : 0;
let titleAlpha = 0;
let roadReveal = 0;
let playPulse = 0;
let hoverPlay = false;
let clickLatch = false;
let comingSoonTimer = 0;
let showedControllerMap = false;

const player = { x: 0, y: 0 };
let prevPadButtons = {};
let toastTimer = 0;
let toastText = '';

const toastEl = document.getElementById('action-toast');
const mapHintEl = document.getElementById('map-hint');

createControllerMap(() => {
  mode = 'world';
});

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

function drawGreenWorld(width, height) {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#4ade80');
  grad.addColorStop(0.5, '#22c55e');
  grad.addColorStop(1, '#15803d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(20,83,45,0.15)';
  ctx.lineWidth = 2;
  const grid = 48;
  for (let x = 0; x < width; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function showToast(text) {
  toastText = text;
  toastTimer = 2;
  if (toastEl) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
  }
}

function updateWorldMovement(delta, width, height) {
  const pad = getGamepad();
  let { mx, my } = readMovement(pad);

  if (input.isPressed('w', 'arrowup')) my -= 1;
  if (input.isPressed('s', 'arrowdown')) my += 1;
  if (input.isPressed('a', 'arrowleft')) mx -= 1;
  if (input.isPressed('d', 'arrowright')) mx += 1;

  const len = Math.hypot(mx, my);
  if (len > 1) {
    mx /= len;
    my /= len;
  }

  const speed = 220;
  player.x = Math.max(24, Math.min(width - 24, player.x + mx * speed * delta));
  player.y = Math.max(24, Math.min(height - 24, player.y + my * speed * delta));

  if (pad && mode === 'world' && !isControllerMapVisible()) {
    const { fired, prevPressed } = readPressedActions(pad, loadBindings(), prevPadButtons);
    prevPadButtons = prevPressed;
    for (const f of fired) showToast(f.action);

    if (pad.buttons[9]?.pressed && !prevPadButtons._menuLatch) {
      prevPadButtons._menuLatch = true;
      showControllerMap();
      mapHintEl.hidden = true;
    }
  }
  if (!pad?.buttons[9]?.pressed) prevPadButtons._menuLatch = false;
}

function updateTitleInput(btn) {
  const pt = canvasPoint(input.pointer.x, input.pointer.y);
  hoverPlay = pointInButton(pt.x, pt.y, btn);
  canvas.style.cursor = hoverPlay ? 'pointer' : 'default';

  if (input.pointer.down && hoverPlay && !clickLatch) {
    mode = 'comingSoon';
    comingSoonTimer = COMING_SOON_TIME;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    clickLatch = true;
  }
  if (!input.pointer.down) clickLatch = false;
}

function render(delta) {
  const { width, height } = canvas;

  if (isControllerMapVisible()) {
    mapHintEl.hidden = true;
    return;
  }

  if (toastTimer > 0) {
    toastTimer = Math.max(0, toastTimer - delta);
    if (toastTimer === 0 && toastEl) toastEl.classList.remove('show');
  }

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

  if (mode === 'title') {
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

    if (roadReveal > 0.5) {
      updateTitleInput(btn);
      drawPlayButton(btn, playPulse, hoverPlay, input.pointer.down && hoverPlay);
    }
    mapHintEl.hidden = true;
    return;
  }

  if (mode === 'comingSoon' || mode === 'world') {
    if (player.x === 0 && player.y === 0) {
      player.x = width / 2;
      player.y = height / 2;
    }

    updateWorldMovement(delta, width, height);

    if (mode === 'comingSoon') {
      comingSoonTimer -= delta;
      if (comingSoonTimer <= 0) {
        mode = 'world';
        if (!showedControllerMap) {
          showedControllerMap = true;
          showControllerMap();
        }
      }
    }

    drawGreenWorld(width, height);
    drawCircle(ctx, player.x, player.y, 18, '#1e3a8a');
    drawCircle(ctx, player.x, player.y, 12, '#3b82f6');

    if (mode === 'comingSoon') {
      drawText(ctx, 'driving coming soon', width / 2, height * 0.12, {
        color: '#14532d',
        size: 36,
      });
    }

    if (mode === 'world') {
      mapHintEl.hidden = false;
      if (input.isPressed('m')) showControllerMap();
      drawText(ctx, 'Left stick / WASD to move · M = controller map', width / 2, height - 28, {
        color: '#14532d',
        size: 14,
      });
    }
  }
}

window.addEventListener('gamepadconnected', () => {});
loop(render);
