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
  readKeyboardMove,
  readKeyboardDriving,
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
import { createLobby } from './lobby.js';
import { createRemotePlayers } from './remotePlayers.js';
import { buildShareLink } from './multiplayer.js';

const GAME_TITLE = 'car crashing with dashing';
const MOVE_SPEED = 7;
const NET_SEND_INTERVAL = 0.05;
const teleportParam = new URLSearchParams(window.location.search).has('teleport');

const { canvas: titleCanvas, ctx } = createCanvas();
titleCanvas.id = 'title-canvas';
titleCanvas.style.position = 'fixed';
titleCanvas.style.inset = '0';
titleCanvas.style.zIndex = '1';

const input = new Input(document.body);
const world = createScene3d();
const player = createPlayer(0, 0);
addPlayerToScene(world.scene, player);
const remotePlayers = createRemotePlayers(world.scene);

/** title | world */
let mode = 'title';
let warp = teleportParam ? 1.8 : 0;
let titleAlpha = 0;
let roadReveal = 0;

let mpRoom = null;
let isHost = false;
let netSendTimer = 0;
let playerCount = 1;

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
const roomBannerEl = document.getElementById('room-banner');

createControllerMap();
createGarage(spawnCarFromGarage);

createLobby(({ room, isHost: host }) => {
  mpRoom = room;
  isHost = host;
  player.x = 0;
  player.z = 0;
  syncPlayerMesh(player);
  setupMultiplayer(room);
  mode = 'world';
  enterGameplay();
  updateRoomBanner();
  showToast(host ? 'You are the host — share your link!' : `Joined room ${room.code}`);
});

function setupMultiplayer(room) {
  room.onMessage = (msg, fromId) => {
    if (msg.t === 'pose' && msg.id && msg.id !== room.id) {
      if (room.role === 'host') room.relay(fromId, msg);
      remotePlayers.applyPose(msg.id, msg);
    }
    if (msg.t === 'join' && msg.id) {
      remotePlayers.applyPose(msg.id, { x: 0, z: 4, facing: 0, walkPhase: 0, isMoving: false });
      playerCount += 1;
      updateRoomBanner();
      showToast('Someone joined!');
    }
    if (msg.t === 'leave' && msg.id) {
      remotePlayers.remove(msg.id);
      playerCount = Math.max(1, playerCount - 1);
      updateRoomBanner();
    }
  };

  room.onPeerCount = (n) => {
    playerCount = n;
    updateRoomBanner();
  };
}

function updateRoomBanner() {
  if (!roomBannerEl || !mpRoom?.code) return;
  if (isHost) {
    const link = buildShareLink(mpRoom.code);
    roomBannerEl.innerHTML = `Room <strong>${mpRoom.code}</strong> · ${playerCount} player(s) · <a href="${link}" target="_blank" rel="noopener">Share link</a>`;
    roomBannerEl.hidden = false;
  } else {
    roomBannerEl.textContent = `Room ${mpRoom.code} · ${playerCount} player(s)`;
    roomBannerEl.hidden = false;
  }
}

function sendPose() {
  if (!mpRoom?.id) return;
  mpRoom.send({
    t: 'pose',
    id: mpRoom.id,
    x: player.x,
    z: player.z,
    facing: player.facing,
    walkPhase: player.walkPhase,
    isMoving: player.isMoving,
  });
}

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

function readKeyboardDrive() {
  return readKeyboardDriving(input);
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

  const { fired, prevPressed } = readPressedActions(pad, loadBindings(), prevPadButtons);
  prevPadButtons = prevPressed;
  for (const f of fired) showToast(f.action);

  if (pad.buttons[9]?.pressed && !menuLatch) {
    menuLatch = true;
    showControllerMap();
    if (mapHintEl) mapHintEl.hidden = true;
  }
  if (!pad?.buttons[9]?.pressed) menuLatch = false;
}

function roadGeometry(width, height, reveal = 1) {
  const cx = width / 2;
  const topY = height * 0.42;
  const bottomY = height;
  const topW = width * 0.08 * reveal;
  const bottomW = width * 0.92;
  return { cx, topY, bottomY, topW, bottomW };
}

function drawRoad(width, height, reveal) {
  if (reveal <= 0) return;

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
  setGarageBoxVisible(true);
}

function updateWorldMovement(delta) {
  const pad = getGamepad();
  let { mx, mz } = readMovement(pad);
  const keys = readKeyboardMove(input);
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
  remotePlayers.lerpAll(delta);

  netSendTimer += delta;
  if (netSendTimer >= NET_SEND_INTERVAL) {
    netSendTimer = 0;
    sendPose();
  }

  handlePadActions(pad);

  if (input.isPressed('m') && !mapKeyLatch) {
    mapKeyLatch = true;
    showControllerMap();
    if (mapHintEl) mapHintEl.hidden = true;
  }
  if (!input.isPressed('m')) mapKeyLatch = false;
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
    if (isControllerMapVisible()) return;
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
    if (roomBannerEl) roomBannerEl.hidden = true;

    titleAlpha = Math.min(1, titleAlpha + delta * 1.2);
    roadReveal = Math.min(1, roadReveal + delta * 0.55);

    clearCanvas(ctx, '#22c55e');
    drawRoad(width, height, roadReveal);

    ctx.globalAlpha = titleAlpha;
    drawText(ctx, GAME_TITLE, width / 2, height * 0.14, {
      color: '#14532d',
      size: 40,
    });
    ctx.globalAlpha = 1;
    return;
  }

  if (mode === 'world') {
    if (!isGarageVisible()) {
      updateWorldMovement(delta);
    }

    if (driving) {
      setHud('WASD to drive · Xbox: hold X gas, B brake, LB/LT/RB turn · E exit · M = map');
    } else {
      setHud('WASD to move · Xbox: stick/D-pad · M = controller map · Garage (left)');
    }
    if (mapHintEl) mapHintEl.hidden = false;

    world.render();
  }
}

window.addEventListener('gamepadconnected', () => {});
loop(render);
