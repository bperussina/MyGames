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
import { refreshControlsHud, setControlsHudVisible } from './controlsHud.js';
import { refreshDamageHud, setDamageHudVisible } from './damageHud.js';
import { createTouchControls } from './touchControls.js';
import { createScene3d } from './scene3d.js';
import { createPlayer, updatePlayer, syncPlayerMesh, addPlayerToScene } from './player.js';
import { createGarage, showGarage, hideGarage, isGarageVisible, setGarageBoxVisible, getCarSpec } from './garage.js';
import {
  addVehicleToScene,
  removeVehicleFromScene,
  enterDriverSeat,
  exitDriverSeat,
  detachPlayerToScene,
  updateVehicle,
  spawnAtPlayer,
  syncVehicleMesh,
  applyVehicleEffects,
  applyCrashBounce,
  regenerateVehicle,
} from './vehicle.js';
import {
  shouldDent,
  handleCrash,
  updateCrashDebris,
  isVehicleDestroyed,
} from './crashFX.js';
import { createLobby, showLobby, hideLobby, isLobbyVisible } from './lobby.js';
import { createRemotePlayers } from './remotePlayers.js';
import { buildShareLink } from './multiplayer.js';
import {
  createDrawPaper,
  showDrawPaper,
  hideDrawPaper,
  isDrawPaperVisible,
  shouldShowDrawPaperOnLoad,
} from './drawPaper.js';
import { initMouseLook } from './mouseLook.js';
import { maybeShowUpdateSplash, markPendingUpdateReload } from './updateSplash.js';
import { createDashSystem } from './dashPickups.js';
import { createLoadout } from './loadout.js';
import { applySkinToSpec } from './skins.js';
import { createShredTargets, PLAYER_SHRED_COINS, TARGET_DESTROY_COINS } from './shredTargets.js';
import { attachWeaponsToVehicle, getWeaponShredBonus, removeWeaponFromVehicle, spinCarWeapon } from './carWeapons.js';
import { getWeapon } from './weapons.js';
import { updateVehicleCollisionBounds } from './carCollision.js';
import { initWeaponInput, updateWeaponCombat } from './weaponCombat.js';
import { createKillShop } from './killShop.js';
import { createAdminShop } from './adminShop.js';

const BUILD_KEY = 'ccwd-build';

function watchForGameUpdates() {
  if (!import.meta.env.PROD) return;
  const host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return;

  const check = async () => {
    try {
      const res = await fetch(`./version.json?_=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      const { v } = await res.json();
      if (!v) return;
      const prev = localStorage.getItem(BUILD_KEY);
      if (prev && prev !== v) {
        markPendingUpdateReload();
        localStorage.setItem(BUILD_KEY, v);
        location.reload();
        return;
      }
      if (!prev) localStorage.setItem(BUILD_KEY, v);
    } catch {
      /* offline or version.json missing */
    }
  };

  check();
  setInterval(check, 3 * 60 * 1000);
}

maybeShowUpdateSplash().then(() => {
  watchForGameUpdates();
});

const GAME_TITLE = 'car crashing with dashing';
const COMING_SOON_TIME = 5;
const MOVE_SPEED = 7;
const NET_SEND_INTERVAL = 0.05;
const SPAWN_X = 0;
const SPAWN_Z = 0;
const RESPAWN_DELAY = 5;
const teleportParam = new URLSearchParams(window.location.search).has('teleport');

const { canvas: titleCanvas, ctx } = createCanvas();
titleCanvas.id = 'title-canvas';
titleCanvas.style.position = 'fixed';
titleCanvas.style.inset = '0';
titleCanvas.style.zIndex = '1';

const input = new Input(document.body);
const touch = createTouchControls();
touch.onExit(() => exitCar());
const world = createScene3d();
const player = createPlayer(0, 0);
addPlayerToScene(world.scene, player);
const remotePlayers = createRemotePlayers(world.scene);

/** drawPaper | title | comingSoon | world */
let mode = shouldShowDrawPaperOnLoad() ? 'drawPaper' : 'title';
let warp = teleportParam ? 1.8 : 0;
let titleAlpha = 0;
let roadReveal = 0;
let playPulse = 0;
let hoverPlay = false;
let hoverMulti = false;
let clickLatch = false;
let comingSoonTimer = 0;

let mpRoom = null;
let isHost = false;
let netSendTimer = 0;
let playerCount = 1;

let menuLatch = false;
let mapKeyLatch = false;
let exitLatch = false;

let activeVehicle = null;
let driving = false;
let lastCarSpec = null;
let collisionCooldown = 0;
let danceTime = 0;
let cameraShake = 0;
let crashDebris = [];
let respawnTimer = 0;

let mouseLookReady = false;

let prevPadButtons = {};
let toastTimer = 0;

const toastEl = document.getElementById('action-toast');
const controlsHudEl = document.getElementById('controls-hud');
const damageHudEl = document.getElementById('damage-hud');
const roomBannerEl = document.getElementById('room-banner');
const superDashBtnEl = document.getElementById('super-dash-btn');
const dashScoreHudEl = document.getElementById('dash-score-hud');
const deathOverlayEl = document.getElementById('death-overlay');
const deathTimerEl = document.getElementById('death-timer');
const nonDyingBtnEl = document.getElementById('non-dying-btn');
const regenerateBtnEl = document.getElementById('regenerate-btn');
const coinHudEl = document.getElementById('coin-hud');
const killShopBtnEl = document.getElementById('kill-shop-btn');
const adminShopBtnEl = document.getElementById('admin-shop-btn');

let nonDyingMode = false;

function getPlayerId() {
  return mpRoom?.id ?? 'local';
}

const loadout = createLoadout(getPlayerId);
const shredTargets = createShredTargets(world.scene);

function coinsText() {
  return `Coins: ${loadout.getCoins()}`;
}

function awardCoins(amount, message) {
  if (!amount || amount <= 0 || !isGameOwner()) return;
  loadout.addCoins(amount);
  refreshCoinHud();
  refreshKillShop();
  refreshAdminShop();
  if (message) showToast(message);
}

shredTargets.setOnDestroyed((target) => {
  const bonus = getWeaponShredBonus(activeVehicle);
  const coins = Math.round((target.coinValue ?? TARGET_DESTROY_COINS) * bonus);
  handleWeaponHitCoins(coins, 'target');
});

let weaponFireState = { firing: false };

function handleWeaponHitCoins(coins, kind) {
  if (!coins || coins <= 0) return;
  const msg = kind === 'shred'
    ? `+${coins} coins — shredded!`
    : kind === 'target'
      ? `+${coins} coins — target destroyed!`
      : `+${coins} coins — hit!`;
  awardCoins(coins, msg);
}

function handlePlayerShredCoins() {
  const coins = Math.round(PLAYER_SHRED_COINS * getWeaponShredBonus(activeVehicle));
  awardCoins(coins, `+${coins} coins — player shredded!`);
}

const killShop = createKillShop(loadout, {
  getCoinsText: coinsText,
  onEquip: (weaponId) => {
    refreshVehicleWeapons();
    toastForWeapon(weaponId);
  },
  onClose: () => refreshShopButtons(),
  onPurchaseFail: () => showToast('Not enough coins!'),
});

const adminShop = createAdminShop(loadout, {
  getCoinsText: coinsText,
  onEquipWeapon: (weaponId) => {
    refreshVehicleWeapons();
    toastForWeapon(weaponId);
  },
  onEquipSkin: () => {
    showToast('Skin equipped — spawn a car from the garage to apply it!');
  },
  onGrantCoins: (amount) => {
    loadout.addCoins(amount);
    refreshCoinHud();
    refreshAdminShop();
    showToast(`+${amount} test coins granted`);
  },
  onClose: () => refreshShopButtons(),
  onPurchaseFail: () => showToast('Not enough coins!'),
});

const {
  showKillShop,
  hideKillShop,
  isKillShopVisible,
  refreshKillShop,
} = killShop;

const {
  showAdminShop,
  hideAdminShop,
  isAdminShopVisible,
  refreshAdminShop,
} = adminShop;

/** Room host in multiplayer, or solo play when there is no room. */
function isGameOwner() {
  return isHost || !mpRoom;
}

createControllerMap(() => refreshControlsHud(controlsHudEl, { driving }));
createGarage(spawnCarFromGarage);

createDrawPaper(
  () => goToTitleScreen(),
  () => goToTitleScreen(true),
);

function goToTitleScreen(openMultiplayer = false) {
  mode = 'title';
  titleCanvas.style.display = 'block';
  hideDrawPaper();
  if (openMultiplayer) showLobby();
}

if (mode === 'drawPaper') {
  titleCanvas.style.display = 'none';
  showDrawPaper();
}

createLobby(({ room, isHost: host }) => {
  mpRoom = room;
  isHost = host;
  loadout.resetForPlayer();
  resetRoundState();
  setupMultiplayer(room);
  mode = 'world';
  enterGameplay();
  startDashSession(hashSeed(room.code ?? 'solo'));
  updateRoomBanner();
  shredTargets.reset();
  showToast("You're in the game!");
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
      if (isHost) dashSystem.syncState();
    }
    if (msg.t === 'leave' && msg.id) {
      remotePlayers.remove(msg.id);
      playerCount = Math.max(1, playerCount - 1);
      updateRoomBanner();
    }
    if (msg.t === 'dashState' || msg.t === 'dashCollect') {
      dashSystem.handleMessage(msg);
      refreshSuperDashUi();
    }
    if (msg.t === 'dashScoreReset') {
      dashSystem.handleMessage(msg);
      refreshSuperDashUi();
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

const DEFAULT_CAR_ID = 'cybertruck';

function getDefaultCarSpec() {
  if (lastCarSpec?.id) {
    const spec = getCarSpec(lastCarSpec.id);
    if (spec) return spec;
  }
  return getCarSpec(DEFAULT_CAR_ID);
}

function buildSpawnSpec(spec) {
  const skinId = isGameOwner() ? loadout.getEquippedSkinId() : null;
  return skinId ? applySkinToSpec(spec, skinId) : spec;
}

function getVehicleWeaponIds() {
  return loadout.getEquippedWeaponIds();
}

function refreshVehicleWeapons() {
  if (!activeVehicle) return;
  attachWeaponsToVehicle(activeVehicle, getVehicleWeaponIds());
}

function toastForWeapon(weaponId) {
  const w = getWeapon(weaponId);
  if (!w) return;
  if (w.type === 'mini_gun') showToast('Mini gun equipped — all weapons stay mounted!');
  else if (w.type === 'saw_blade') showToast('Saw blade equipped — ram targets head-on!');
  else if (w.type === 'chainsaw') showToast('Chainsaws equipped — sideswipe to shred!');
  else showToast('Weapon equipped on your car!');
}

function canFireMinigun() {
  const weapon = loadout.getEquippedWeaponForType('mini_gun');
  return Boolean(weapon && loadout.ownsWeapon(weapon.id));
}

function spawnCarFromGarage(spec) {
  if (!spec) return;
  lastCarSpec = spec;
  hideGarage();

  if (activeVehicle) {
    detachPlayerToScene(player, world.scene);
    removeVehicleFromScene(world.scene, activeVehicle);
    activeVehicle = null;
    driving = false;
  }

  activeVehicle = spawnAtPlayer(player, buildSpawnSpec(spec), world.clampPosition, world.envTex);
  addVehicleToScene(world.scene, activeVehicle);
  attachWeaponsToVehicle(activeVehicle, getVehicleWeaponIds());
  updateVehicleCollisionBounds(activeVehicle);
  driving = true;
  touch.setDriving(true);
  enterDriverSeat(player, activeVehicle);
  syncVehicleMesh(activeVehicle);
  world.updateDrivingCamera(activeVehicle.x, activeVehicle.z, activeVehicle.rotY);
  refreshControlsHud(controlsHudEl, { driving: true });
  setDamageHudVisible(damageHudEl, true);
  refreshDamageHud(damageHudEl, activeVehicle);
  refreshRegenerateUi();
  refreshShopButtons();
  setControlsHudVisible(controlsHudEl, true, { driving: true });
}

function handleCarCollision(impactSpeed) {
  if (!activeVehicle || collisionCooldown > 0) return;

  handleCrash(activeVehicle, world.scene, impactSpeed, crashDebris);
  refreshDamageHud(damageHudEl, activeVehicle);

  if (isVehicleDestroyed(activeVehicle) && !nonDyingMode) {
    killPlayer();
    return;
  }

  if (shouldDent(impactSpeed)) {
    applyCrashBounce(activeVehicle, impactSpeed);
    const huge = Math.abs(impactSpeed) >= 38;
    cameraShake = huge ? 0.5 : 0.22;
    collisionCooldown = huge ? 0.55 : 0.4;
  } else if (Math.abs(impactSpeed) > 5) {
    activeVehicle.speed *= 0.55;
    collisionCooldown = 0.12;
  }
}

function killPlayer() {
  if (player.dead) return;
  player.dead = true;
  respawnTimer = RESPAWN_DELAY;

  if (driving && activeVehicle) {
    const vx = activeVehicle.x;
    const vz = activeVehicle.z;
    const rot = activeVehicle.rotY;
    exitDriverSeat(player, activeVehicle);
    player.x = vx;
    player.z = vz;
    player.facing = rot;
    activeVehicle.speed = 0;
    driving = false;
    touch.setDriving(false);
    dashSystem.setSuperDash(false);
    activeVehicle.superDashOn = false;
    removeWeaponFromVehicle(activeVehicle);
  }

  loadout.destroyAllWeapons();
  refreshKillShop();
  refreshAdminShop();

  dashSystem.resetPlayerScore();
  refreshSuperDashUi();

  player.mesh.rotation.x = -Math.PI / 2;
  syncPlayerMesh(player);

  setControlsHudVisible(controlsHudEl, false);
  setDamageHudVisible(damageHudEl, false);
  setGarageBoxVisible(false);
  refreshSuperDashUi();
  if (deathOverlayEl) deathOverlayEl.hidden = false;
  if (deathTimerEl) deathTimerEl.textContent = `Respawning in ${RESPAWN_DELAY}...`;
  showToast('Your car was destroyed — all weapons lost!');
}

function respawnPlayer() {
  player.dead = false;
  respawnTimer = 0;

  if (activeVehicle) {
    removeVehicleFromScene(world.scene, activeVehicle);
    activeVehicle = null;
  }

  for (const d of crashDebris) {
    d.mesh.parent?.remove(d.mesh);
  }
  crashDebris.length = 0;

  player.x = SPAWN_X;
  player.z = SPAWN_Z;
  player.facing = 0;
  player.mesh.rotation.set(0, 0, 0);
  player.mesh.visible = true;
  player.inVehicle = null;
  syncPlayerMesh(player);

  driving = false;
  touch.setDriving(false);
  if (deathOverlayEl) deathOverlayEl.hidden = true;
  setGarageBoxVisible(true);
  hideGarage();
  setControlsHudVisible(controlsHudEl, true, { driving: false });
  const spec = getDefaultCarSpec();
  if (spec) {
    spawnCarFromGarage(spec);
    showToast('Respawned — back in your car!');
  } else {
    showGarage();
    showToast('Respawned at spawn!');
  }
}

function updateDeathState(delta) {
  respawnTimer = Math.max(0, respawnTimer - delta);
  if (deathTimerEl) {
    deathTimerEl.textContent = respawnTimer > 0
      ? `Respawning in ${Math.ceil(respawnTimer)}...`
      : 'Respawning...';
  }
  updateCrashDebris(crashDebris, delta);
  world.updateWorld(player.x, player.z);
  world.updateCamera(player.x, player.z, player.facing);
  if (respawnTimer <= 0) respawnPlayer();
}

function exitCar() {
  if (!activeVehicle || !driving) return;
  exitDriverSeat(player, activeVehicle);
  driving = false;
  touch.setDriving(false);
  syncPlayerMesh(player);
  world.updateCamera(player.x, player.z, player.facing);
  refreshControlsHud(controlsHudEl, { driving: false });
  setDamageHudVisible(damageHudEl, false);
  showToast('Exited vehicle');
}

function readKeyboardDrive() {
  return readKeyboardDriving(input);
}

function mergeDrive(padDrive, keyDrive) {
  return {
    throttle: Math.max(padDrive.throttle ?? 0, keyDrive.throttle ?? 0),
    brake: Math.max(padDrive.brake ?? 0, keyDrive.brake ?? 0),
    reverse: Math.max(padDrive.reverse ?? 0, keyDrive.reverse ?? 0),
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
  }
  if (!pad?.buttons[9]?.pressed) menuLatch = false;
}

function roadWidthAtY(geo, y) {
  const t = Math.max(0, Math.min(1, (y - geo.topY) / (geo.bottomY - geo.topY)));
  return geo.topW * 2 + (geo.bottomW - geo.topW * 2) * t;
}

function getPlayButtonBounds(width, height, geo) {
  const centerY = height * 0.56;
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

function getMultiplayerButtonBounds(playBtn) {
  const gap = 14;
  const h = playBtn.h * 0.72;
  const w = playBtn.w * 0.92;
  const cy = playBtn.cy + playBtn.h / 2 + gap + h / 2;
  return {
    x: playBtn.cx - w / 2,
    y: cy - h / 2,
    w,
    h,
    cx: playBtn.cx,
    cy,
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

function drawGameTitle(width, height, alpha) {
  const y = height * 0.22;
  const size = 44;
  const part1 = 'car crashing with ';
  const part2 = 'dashing';
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `800 ${size}px system-ui, sans-serif`;
  ctx.textBaseline = 'middle';
  const fullW = ctx.measureText(part1 + part2).width;
  let x = width / 2 - fullW / 2;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#14532d';
  ctx.fillText(part1, x, y);
  x += ctx.measureText(part1).width;
  ctx.fillText(part2, x, y);
  const dashingW = ctx.measureText(part2).width;
  const underlineY = y + size * 0.38;
  ctx.strokeStyle = '#14532d';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, underlineY);
  ctx.lineTo(x + dashingW, underlineY);
  ctx.stroke();
  ctx.restore();
}

function drawTitleButton(btn, label, colors, pulse, hover, pressed) {
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
  grad.addColorStop(0, pressed ? colors.pressedTop : colors.top);
  grad.addColorStop(1, pressed ? colors.pressedBottom : colors.bottom);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = colors.stroke;
  ctx.lineWidth = 5;
  ctx.stroke();

  drawText(ctx, label, btn.cx, btn.cy, {
    size: Math.floor(h * 0.38),
    color: colors.text,
  });
  ctx.restore();
}

function resetRoundState() {
  nonDyingMode = false;

  if (activeVehicle) {
    detachPlayerToScene(player, world.scene);
    removeVehicleFromScene(world.scene, activeVehicle);
    activeVehicle = null;
  }

  driving = false;
  lastCarSpec = null;
  touch.setDriving(false);

  player.dead = false;
  respawnTimer = 0;
  player.x = SPAWN_X;
  player.z = SPAWN_Z;
  player.facing = 0;
  player.mesh.rotation.set(0, 0, 0);
  player.mesh.visible = true;
  player.inVehicle = null;
  syncPlayerMesh(player);

  for (const d of crashDebris) {
    d.mesh.parent?.remove(d.mesh);
  }
  crashDebris.length = 0;

  collisionCooldown = 0;
  cameraShake = 0;
  dashSystem.setSuperDash(false);
  dashSystem.resetPlayerScore();

  if (deathOverlayEl) deathOverlayEl.hidden = true;
  setDamageHudVisible(damageHudEl, false);
  hideGarage();
  hideKillShop();
  hideAdminShop();
}

function startSoloPlay() {
  mode = 'comingSoon';
  comingSoonTimer = COMING_SOON_TIME;
  mpRoom = null;
  isHost = false;
  loadout.resetForPlayer();
  resetRoundState();
  enterGameplay();
  startDashSession(hashSeed(String(Date.now())));
  shredTargets.reset();
}

function updateTitleInput(playBtn, multiBtn) {
  const pt = canvasPoint(input.pointer.x, input.pointer.y);
  hoverPlay = pointInButton(pt.x, pt.y, playBtn);
  hoverMulti = pointInButton(pt.x, pt.y, multiBtn);
  titleCanvas.style.cursor = hoverPlay || hoverMulti ? 'pointer' : 'default';

  if (input.pointer.down && !clickLatch) {
    if (hoverPlay) {
      startSoloPlay();
      clickLatch = true;
    } else if (hoverMulti) {
      showLobby();
      clickLatch = true;
    }
  }
  if (!input.pointer.down) clickLatch = false;
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

function showToast(text) {
  toastTimer = 2;
  if (toastEl) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
  }
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
}

const dashSystem = createDashSystem(world.scene, {
  getPlayerId: () => mpRoom?.id ?? 'local',
  isHost: () => !mpRoom || isHost,
  send: (msg) => {
    if (!mpRoom) return;
    if (isHost && msg.t === 'dashState') mpRoom.send(msg);
    else if (msg.t === 'dashCollect') mpRoom.sendToHost(msg);
    else if (msg.t === 'dashScoreReset') mpRoom.sendToHost(msg);
    else mpRoom.send(msg);
  },
});
dashSystem.setToast(showToast);

function startDashSession(seed) {
  dashSystem.reset(seed);
  if (dashSystem.isSessionActive()) {
    showToast('Blue Dashing circles spawned — collect them!');
  }
}

function regenerateCar() {
  if (!isGameOwner() || !activeVehicle || !lastCarSpec || player.dead) return;

  for (let i = crashDebris.length - 1; i >= 0; i--) {
    if (crashDebris[i].isPart) {
      crashDebris[i].mesh.parent?.remove(crashDebris[i].mesh);
      crashDebris.splice(i, 1);
    }
  }

  detachPlayerToScene(player, world.scene);

  regenerateVehicle(activeVehicle, world.scene, buildSpawnSpec(lastCarSpec), world.envTex);
  attachWeaponsToVehicle(activeVehicle, getVehicleWeaponIds());
  enterDriverSeat(player, activeVehicle);
  refreshDamageHud(damageHudEl, activeVehicle);
  showToast('Car regenerated — good as new!');
}

function refreshRegenerateUi() {
  if (!regenerateBtnEl) return;
  const show = isGameOwner() && driving && activeVehicle && !player.dead
    && (mode === 'world' || mode === 'comingSoon');
  regenerateBtnEl.hidden = !show;
}

if (regenerateBtnEl) {
  regenerateBtnEl.addEventListener('click', () => regenerateCar());
}

function refreshNonDyingUi() {
  if (!nonDyingBtnEl) return;
  if (!isGameOwner()) nonDyingMode = false;
  const show = isGameOwner() && (mode === 'world' || mode === 'comingSoon') && !player.dead;
  nonDyingBtnEl.hidden = !show;
  nonDyingBtnEl.classList.toggle('active', nonDyingMode);
  nonDyingBtnEl.textContent = nonDyingMode ? 'NON-DYING' : 'DYING ON';
}

if (nonDyingBtnEl) {
  nonDyingBtnEl.addEventListener('click', () => {
    if (!isGameOwner()) return;
    nonDyingMode = !nonDyingMode;
    refreshNonDyingUi();
    showToast(nonDyingMode
      ? 'Non-dying ON — drive with no parts!'
      : 'Dying ON — destroyed car kills you');
  });
}

function refreshCoinHud() {
  if (!coinHudEl) return;
  const show = isGameOwner() && (mode === 'world' || mode === 'comingSoon') && !player.dead;
  coinHudEl.hidden = !show;
  if (show) coinHudEl.textContent = coinsText();
}

function refreshShopButtons() {
  const inWorld = (mode === 'world' || mode === 'comingSoon') && !player.dead;
  const shopOpen = isKillShopVisible() || isAdminShopVisible();
  if (killShopBtnEl) {
    killShopBtnEl.hidden = true;
  }
  if (adminShopBtnEl) {
    adminShopBtnEl.hidden = !inWorld || !isGameOwner() || shopOpen;
  }
}

if (killShopBtnEl) {
  killShopBtnEl.addEventListener('click', () => {
    if (isGameOwner()) return;
    showKillShop();
    refreshShopButtons();
  });
}

if (adminShopBtnEl) {
  adminShopBtnEl.addEventListener('click', () => {
    if (!isGameOwner()) return;
    showAdminShop();
    refreshShopButtons();
  });
}

function refreshSuperDashUi() {
  const leader = dashSystem.isLocalLeader() && driving && dashSystem.isSessionActive();
  if (superDashBtnEl) {
    superDashBtnEl.hidden = !leader;
    superDashBtnEl.classList.toggle('active', dashSystem.isSuperDashOn());
    superDashBtnEl.textContent = dashSystem.isSuperDashOn() ? 'NORMAL SPEED' : 'SUPER DASH';
  }
  if (dashScoreHudEl) {
    if (mode === 'world' && dashSystem.isSessionActive()) {
      const scores = dashSystem.getScores();
      const mine = scores[mpRoom?.id ?? 'local'] ?? 0;
      const leaders = dashSystem.getLeaderIds();
      const top = leaders.length ? Math.max(...leaders.map((id) => scores[id] ?? 0)) : 0;
      dashScoreHudEl.hidden = false;
      dashScoreHudEl.textContent = `Dashing: ${mine}${leader ? ' ★ LEADING' : ''} · Best: ${top}`;
    } else {
      dashScoreHudEl.hidden = true;
    }
  }
  if (!leader) {
    dashSystem.setSuperDash(false);
    if (activeVehicle) activeVehicle.superDashOn = false;
  } else if (activeVehicle) {
    activeVehicle.superDashOn = dashSystem.isSuperDashOn();
    activeVehicle.superMaxSpeed = dashSystem.SUPER_MAX_SPEED;
    activeVehicle.superAccelMult = dashSystem.SUPER_ACCEL_MULT;
  }
}

if (superDashBtnEl) {
  superDashBtnEl.addEventListener('click', () => {
    if (!dashSystem.isLocalLeader() || !driving || !activeVehicle) return;
    const on = dashSystem.toggleSuperDash();
    activeVehicle.superDashOn = on;
    activeVehicle.superMaxSpeed = dashSystem.SUPER_MAX_SPEED;
    activeVehicle.superAccelMult = dashSystem.SUPER_ACCEL_MULT;
    showToast(on ? 'Super dash ON!' : 'Normal speed');
    refreshSuperDashUi();
  });
}

function enterGameplay() {
  titleCanvas.style.display = 'none';
  world.show();
  if (!mouseLookReady) {
    initMouseLook(world.renderer.domElement);
    initWeaponInput(world.renderer.domElement);
    mouseLookReady = true;
  }
  setGarageBoxVisible(true);
  hideGarage();
  touch.setVisible(true);
  if (!driving && !player.dead) {
    const spec = getDefaultCarSpec();
    if (spec) {
      spawnCarFromGarage(spec);
    } else {
      showGarage();
    }
  } else {
    touch.setDriving(driving);
    setControlsHudVisible(controlsHudEl, true, { driving });
  }
  refreshNonDyingUi();
  refreshRegenerateUi();
  refreshCoinHud();
  refreshShopButtons();
}

function updateWorldMovement(delta) {
  if (player.dead) {
    updateDeathState(delta);
    return;
  }

  const pad = getGamepad();
  let { mx, mz } = readMovement(pad);
  const keys = readKeyboardMove(input);
  const touchMove = touch.readMove();
  mx += keys.mx + touchMove.mx;
  mz += keys.mz + touchMove.mz;

  const len = Math.hypot(mx, mz);
  if (len > 1) {
    mx /= len;
    mz /= len;
  }

  if (collisionCooldown > 0) collisionCooldown = Math.max(0, collisionCooldown - delta);
  if (cameraShake > 0) cameraShake = Math.max(0, cameraShake - delta * 2.8);
  danceTime += delta;

  if (driving && activeVehicle) {
    const padDrive = readDriving(pad);
    const keyDrive = readKeyboardDrive();
    const touchDrive = touch.readDrive();
    const drive = mergeDrive(mergeDrive(padDrive, keyDrive), touchDrive);
    const { impactSpeed, wallHit } = updateVehicle(activeVehicle, drive, delta, world.clampPosition);

    const hit = world.city.checkCarCollision(
      activeVehicle.x,
      activeVehicle.z,
      activeVehicle.rotY,
      activeVehicle.collisionHw ?? 1.15,
      activeVehicle.collisionHd ?? 2.25,
    );
    const targetHit = shredTargets.checkCarCollision(
      activeVehicle.x,
      activeVehicle.z,
      activeVehicle.rotY,
      activeVehicle.collisionHw ?? 1.15,
      activeVehicle.collisionHd ?? 2.25,
    );
    if (hit || wallHit || targetHit) {
      const preSpeed = impactSpeed;
      if (targetHit) {
        shredTargets.applyCarImpact(targetHit, preSpeed);
      }
      handleCarCollision(preSpeed);
      if (targetHit) {
        activeVehicle.x = activeVehicle.prevX;
        activeVehicle.z = activeVehicle.prevZ;
        if (Math.abs(preSpeed) > 5) applyCrashBounce(activeVehicle, preSpeed);
        else activeVehicle.speed *= 0.45;
      } else if (!shouldDent(preSpeed)) {
        activeVehicle.x = activeVehicle.prevX;
        activeVehicle.z = activeVehicle.prevZ;
      }
      syncVehicleMesh(activeVehicle);
    }

    applyVehicleEffects(activeVehicle, danceTime, delta);
    updateCrashDebris(crashDebris, delta);
    shredTargets.update(delta);
    weaponFireState = updateWeaponCombat(delta, {
      vehicle: activeVehicle,
      camera: world.camera,
      renderer: world.renderer,
      scene: world.scene,
      shredTargets,
      remotePlayers,
      onTargetHit: handleWeaponHitCoins,
      onPlayerShred: handlePlayerShredCoins,
      canFireMinigun,
    });
    spinCarWeapon(activeVehicle, delta, weaponFireState.firing);
    remotePlayers.tickCooldowns(delta);
    refreshDamageHud(damageHudEl, activeVehicle);
    if (isVehicleDestroyed(activeVehicle) && !nonDyingMode) {
      killPlayer();
      return;
    }
    world.updateWorld(activeVehicle.x, activeVehicle.z);
    world.updateDrivingCamera(activeVehicle.x, activeVehicle.z, activeVehicle.rotY, cameraShake);
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
  world.updateWorld(player.x, player.z);
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
  }
  if (!input.isPressed('m')) mapKeyLatch = false;
}

function render(delta) {
  const { width, height } = titleCanvas;

  if (isControllerMapVisible() || isGarageVisible() || isLobbyVisible() || isDrawPaperVisible()
    || isKillShopVisible() || isAdminShopVisible()) {
    setControlsHudVisible(controlsHudEl, false);
    if (isControllerMapVisible() || isDrawPaperVisible()) return;
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
    touch.setVisible(false);
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

  if (mode === 'drawPaper') {
    titleCanvas.style.display = 'none';
    world.hide();
    setGarageBoxVisible(false);
    touch.setVisible(false);
    return;
  }

  if (mode === 'title') {
    titleCanvas.style.display = 'block';
    world.hide();
    setGarageBoxVisible(false);
    touch.setVisible(false);
    setControlsHudVisible(controlsHudEl, false);
    if (roomBannerEl) roomBannerEl.hidden = true;

    titleAlpha = Math.min(1, titleAlpha + delta * 1.2);
    roadReveal = Math.min(1, roadReveal + delta * 0.55);
    playPulse += delta * 4;

    clearCanvas(ctx, '#22c55e');
    const geo = drawRoad(width, height, roadReveal);
    const playBtn = getPlayButtonBounds(width, height, geo);
    const multiBtn = getMultiplayerButtonBounds(playBtn);

    ctx.globalAlpha = titleAlpha;
    drawGameTitle(width, height, titleAlpha);
    drawText(ctx, 'The best game ever — realism incoming.', width / 2, height * 0.3, {
      color: '#166534',
      size: 18,
    });
    ctx.globalAlpha = 1;

    if (!isLobbyVisible()) {
      updateTitleInput(playBtn, multiBtn);
      const btnFade = Math.min(1, 0.35 + roadReveal * 0.65) * titleAlpha;
      ctx.globalAlpha = btnFade;
      drawTitleButton(
        playBtn,
        'PLAY',
        {
          top: '#fde047',
          bottom: '#facc15',
          pressedTop: '#facc15',
          pressedBottom: '#eab308',
          stroke: '#854d0e',
          text: '#422006',
        },
        playPulse,
        hoverPlay,
        input.pointer.down && hoverPlay,
      );
      drawTitleButton(
        multiBtn,
        'MULTIPLAYER',
        {
          top: '#4ade80',
          bottom: '#22c55e',
          pressedTop: '#22c55e',
          pressedBottom: '#16a34a',
          stroke: '#14532d',
          text: '#14532d',
        },
        playPulse + 0.5,
        hoverMulti,
        input.pointer.down && hoverMulti,
      );
      ctx.globalAlpha = 1;
    }
    return;
  }

  if (mode === 'comingSoon' || mode === 'world') {
    world.renderer.domElement.style.boxShadow = '';
    dashSystem.update(delta, driving ? activeVehicle : null);
    updateCrashDebris(crashDebris, delta);
    refreshSuperDashUi();
    refreshNonDyingUi();
    refreshRegenerateUi();
    refreshCoinHud();
    refreshShopButtons();

    if (!isGarageVisible() && !isKillShopVisible() && !isAdminShopVisible()) {
      updateWorldMovement(delta);
    }

    if (mode === 'comingSoon') {
      comingSoonTimer -= delta;
      if (comingSoonTimer <= 0) mode = 'world';
      setControlsHudVisible(controlsHudEl, true, { driving });
      setGarageBoxVisible(true);
      touch.setVisible(false);
    } else {
      setGarageBoxVisible(true);
      setControlsHudVisible(controlsHudEl, true, { driving });
    }

    world.render();
  }
}

window.addEventListener('gamepadconnected', () => {});
loop(render);
