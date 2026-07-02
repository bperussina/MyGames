import {
  createCanvas,
  clearCanvas,
  drawText,
  Input,
  loop,
} from '@mygames/shared';
import {
  getGamepad,
  readMovement,
  readDriving,
  readPressedActions,
} from './gamepad.js';
import {
  createControllerMap,
  showControllerMap,
  isControllerMapVisible,
  loadBindings,
} from './controllerMap.js';
import { createScene3d } from './scene3d.js';
import { createPlayer, updatePlayer, syncPlayerMesh, addPlayerToScene } from './player.js';
import { createGarage, isGarageVisible, setGarageBoxVisible } from './garage.js';
import {
  addVehicleToScene,
  removeVehicleFromScene,
  enterDriverSeat,
  exitDriverSeat,
  updateVehicle,
  spawnInFrontOfPlayer,
} from './vehicle.js';

const GAME_TITLE = 'car crashing with dashing';
const COMING_SOON_TIME = 5;
const MOVE_SPEED = 7;
const teleportParam = new URLSearchParams(window.location.search).has('teleport');

const { canvas: titleCanvas, ctx } = createCanvas();
titleCanvas.id = 'title-canvas';
titleCanvas.style.position = 'fixed';
titleCanvas.style.inset = '0';
titleCanvas.style.zIndex = '2';

const input = new Input(titleCanvas);
const world = createScene3d();
const player = createPlayer(0, 0);
addPlayerToScene(world.scene, player);

/** title | comingSoon | world */
let mode = 'title';
let warp = teleportParam ? 1.8 : 0;
let titleAlpha = 0;
let roadReveal = 0;
let playPulse = 0;
let hoverPlay = false;
let clickLatch = false;
let comingSoonTimer = 0;
let menuLatch = false;
let mapKeyLatch = false;
let exitLatch = false;

let activeVehicle = null;
let driving = false;

let prevPadButtons = {};
let toastTimer = 0;

const toastEl = document.getElementById('action-toast');
const mapHintEl = document.getElementById('map-hint');
const hudEl = document.getElementById('hud');

createControllerMap();
createGarage(spawnCarFromGarage);

function spawnCarFromGarage(spec) {
  if (activeVehicle) {
    removeVehicleFromScene(world.scene, activeVehicle);
    activeVehicle = null;
    driving = false;
    player.inVehicle = null;
    player.mesh.visible = true;
  }

  activeVehicle = spawnInFrontOfPlayer(player, spec, world.clampPosition);
  addVehicleToScene(world.scene, activeVehicle);
  driving = true;
  enterDriverSeat(player, activeVehicle);
  showToast(`Driving ${spec.name}`);
}

function exitCar() {
  if (!activeVehicle || !driving) return;
  exitDriverSeat(player, activeVehicle);
  driving = false;
  syncPlayerMesh(player);
  world.updateCamera(player.x, player.z, player.facing);
  showToast('Exited vehicle');
}

function readKeyboardMove() {
  let mx = 0;
  let mz = 0;
  if (input.isPressed('w', 'arrowup')) mz += 1;
  if (input.isPressed('s', 'arrowdown')) mz -= 1;
  if (input.isPressed('a', 'arrowleft')) mx -= 1;
  if (input.isPressed('d', 'arrowright')) mx += 1;
  return { mx, mz };
}

function readKeyboardDrive() {
  let throttle = 0;
  let brake = 0;
  let steer = 0;
  if (input.isPressed('w', 'arrowup')) throttle = 1;
  if (input.isPressed('s', 'arrowdown')) brake = 1;
  if (input.isPressed('a', 'arrowleft')) steer = -1;
  if (input.isPressed('d', 'arrowright')) steer = 1;
  return { throttle, brake, steer };
}

function mergeDrive(padDrive, keyDrive) {
  return {
    throttle: Math.max(padDrive.throttle, keyDrive.throttle),
    brake: Math.max(padDrive.brake, keyDrive.brake),
    steer: Math.abs(padDrive.steer) > Math.abs(keyDrive.steer) ? padDrive.steer : keyDrive.steer,
  };
}

function handlePadActions(pad) {
  if (!pad || mode !== 'world' || isControllerMapVisible() || isGarageVisible()) return;

  const { fired, prevPressed } = readPressedActions(
    pad,
    driving ? loadBindings() : loadBindings(),
    prevPadButtons,
  );
  prevPadButtons = prevPressed;
  for (const f of fired) showToast(f.action);

  if (pad.buttons[9]?.pressed && !menuLatch) {
    menuLatch = true;
    showControllerMap();
    if (mapHintEl) mapHintEl.hidden = true;
  }
  if (!pad?.buttons[9]?.pressed) menuLatch = false;

  if (driving && pad.buttons[1]?.pressed && !exitLatch) {
    exitLatch = true;
    exitCar();
  }
  if (!pad?.buttons[1]?.pressed) exitLatch = false;
}

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
  const rect = titleCanvas.getBoundingClientRect();
  const scaleX = titleCanvas.width / rect.width;
  const scaleY = titleCanvas.height / rect.height;
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

function showToast(text) {
  toastTimer = 2;
  if (toastEl) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
  }
}

function enterGameplay() {
  titleCanvas.style.display = 'none';
  world.show();
  if (hudEl) hudEl.hidden = false;
}

function updateWorldMovement(delta) {
  const pad = getGamepad();
  let { mx, mz } = readMovement(pad);
  const keys = readKeyboardMove();
  mx += keys.mx;
  mz += keys.mz;

  const len = Math.hypot(mx, mz);
  if (len > 1) {
    mx /= len;
    mz /= len;
  }

  if (driving && activeVehicle) {
    const padDrive = readDriving(pad);
    const keyDrive = readKeyboardDrive();
    const drive = mergeDrive(padDrive, keyDrive);
    updateVehicle(activeVehicle, drive, delta, world.clampPosition);
    world.updateDrivingCamera(activeVehicle.x, activeVehicle.z, activeVehicle.rotY);
    handlePadActions(pad);

    if (input.isPressed('e') && !exitLatch) {
      exitLatch = true;
      exitCar();
    }
    if (!input.isPressed('e')) exitLatch = false;
    return;
  }

  updatePlayer(player, mx, mz, delta);

  const nextX = player.x + mx * MOVE_SPEED * delta;
  const nextZ = player.z + mz * MOVE_SPEED * delta;
  const clamped = world.clampPosition(nextX, nextZ);
  player.x = clamped.x;
  player.z = clamped.z;

  syncPlayerMesh(player);
  world.updateCamera(player.x, player.z, player.facing);

  if (mode === 'world') {
    handlePadActions(pad);

    if (input.isPressed('m') && !mapKeyLatch) {
      mapKeyLatch = true;
      showControllerMap();
      if (mapHintEl) mapHintEl.hidden = true;
    }
    if (!input.isPressed('m')) mapKeyLatch = false;
  }
}

function updateTitleInput(btn) {
  const pt = canvasPoint(input.pointer.x, input.pointer.y);
  hoverPlay = pointInButton(pt.x, pt.y, btn);
  titleCanvas.style.cursor = hoverPlay ? 'pointer' : 'default';

  if (input.pointer.down && hoverPlay && !clickLatch) {
    mode = 'comingSoon';
    comingSoonTimer = COMING_SOON_TIME;
    player.x = 0;
    player.z = 0;
    syncPlayerMesh(player);
    enterGameplay();
    clickLatch = true;
  }
  if (!input.pointer.down) clickLatch = false;
}

function setHud(text) {
  if (!hudEl) return;
  hudEl.textContent = text;
  hudEl.hidden = false;
}

function render(delta) {
  const { width, height } = titleCanvas;

  if (isControllerMapVisible() || isGarageVisible()) {
    if (mapHintEl) mapHintEl.hidden = true;
    if (!isGarageVisible()) return;
  }

  if (toastTimer > 0) {
    toastTimer = Math.max(0, toastTimer - delta);
    if (toastTimer === 0 && toastEl) toastEl.classList.remove('show');
  }

  if (warp > 0) {
    warp = Math.max(0, warp - delta);
    const flash = warp > 0.35 ? 1 - (1.8 - warp) / 1.45 : 0;
    titleCanvas.style.display = 'block';
    world.hide();
    setGarageBoxVisible(false);
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
    titleCanvas.style.display = 'block';
    world.hide();
    setGarageBoxVisible(false);
    if (hudEl) hudEl.hidden = true;
    if (mapHintEl) mapHintEl.hidden = true;

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
    return;
  }

  if (mode === 'comingSoon' || mode === 'world') {
    if (!isGarageVisible()) {
      updateWorldMovement(delta);
    }

    if (mode === 'comingSoon') {
      comingSoonTimer -= delta;
      if (comingSoonTimer <= 0) mode = 'world';
      setHud('driving coming soon');
      setGarageBoxVisible(false);
    } else {
      setGarageBoxVisible(true);
      if (driving) {
        setHud('Xbox controller to drive · B/E exit · M = controller map');
      } else {
        setHud('Arrows/WASD move · Garage (left) · M = controller map');
      }
      if (mapHintEl) mapHintEl.hidden = false;
    }

    world.render();
  }
}

window.addEventListener('gamepadconnected', () => {});
loop(render);
