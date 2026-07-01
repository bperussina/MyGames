import { createCanvas, clearCanvas, Input, loop } from '@mygames/shared';
import { drawText } from '@mygames/shared';
import {
  updateMenu,
  renderMenu,
  isPlayClicked,
  isContinueClicked,
  isUpdateClicked,
  renderUpdateScreen,
  renderOfflineBanner,
  renderLoadError,
} from './menu.js';
import { GAME_VERSION } from './version.js';
import {
  hasNewGameUpdate,
  clearUpdateFlag,
  clearSessionGame,
  saveSessionGame,
  loadSessionGame,
  hasSessionSave,
  markVersionPlayed,
} from './persist.js';

const { canvas, ctx } = createCanvas();
const input = new Input(window);

canvas.setAttribute('tabindex', '0');
canvas.addEventListener('click', () => canvas.focus());

let mode = 'MENU';
let menuHover = false;
let updateHover = false;
let pendingPlayClick = null;
let pendingMenuAction = null;
let loading = false;
let loadError = null;
let offline = !navigator.onLine;
let showUpdateScreen = hasNewGameUpdate();
let resumeAfterLoad = false;

let cutscene = null;
let game = null;
let admin = null;
let gameplay = null;
let cutsceneMod = null;
let adminMod = null;
let audioMod = null;
let inventoryMod = null;

let autosaveTimer = 0;

const mouseLook = {
  active: false,
  lastX: 0,
  lastY: 0,
  moved: false,
  sensitivity: 0.004,
  lookDelta: 0,
};

const DRAG_THRESHOLD = 6;
const AUTOSAVE_INTERVAL = 12;

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

async function ensureAudio() {
  if (!audioMod) {
    audioMod = await import('./audio.js');
  }
  audioMod.initAudio();
}

async function ensureCutscenes() {
  if (cutsceneMod) return;
  loading = true;
  try {
    const [cs] = await Promise.all([import('./cutscenes.js'), ensureAudio()]);
    cutsceneMod = cs;
    loadError = null;
  } catch (err) {
    loadError = err?.message || 'Failed to load cutscenes';
    throw err;
  } finally {
    loading = false;
  }
}

async function ensureGameplay() {
  if (gameplay) return;

  const [gp, am, inv] = await Promise.all([
    import('./gameplay.js'),
    import('./admin.js'),
    import('./inventory.js'),
  ]);
  gameplay = gp;
  adminMod = am;
  inventoryMod = inv;
  admin = adminMod.createAdminState();
  loadError = null;
}

async function startCutscenes() {
  await ensureCutscenes();
  cutscene = cutsceneMod.createCutsceneState();
  mode = 'CUTSCENE';
  pendingPlayClick = null;
  pendingMenuAction = null;
  markVersionPlayed();
}

async function enterGame(fromContinue = false) {
  loading = true;
  loadError = null;
  try {
    await ensureGameplay();
    if (fromContinue) {
      const saved = loadSessionGame();
      game = saved ?? gameplay.createGameState();
    } else {
      clearSessionGame();
      game = gameplay.createGameState();
    }
    mode = 'GAME';
    resumeAfterLoad = false;
    markVersionPlayed();
  } catch (err) {
    loadError = err?.message || 'Failed to load game';
    mode = 'ERROR';
  } finally {
    loading = false;
  }
}

function acceptGameUpdate() {
  clearSessionGame();
  clearUpdateFlag();
  showUpdateScreen = false;
  mode = 'MENU';
  pendingPlayClick = null;
  pendingMenuAction = null;
}

canvas.style.cursor = 'default';

window.addEventListener('offline', () => {
  offline = true;
  if (mode === 'GAME' && game) saveSessionGame(game);
});

window.addEventListener('online', () => {
  offline = false;
});

window.addEventListener('beforeunload', () => {
  if (mode === 'GAME' && game) saveSessionGame(game);
});

window.addEventListener('error', (event) => {
  if (mode === 'GAME' && game) saveSessionGame(game);
  console.error(event.error ?? event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  if (mode === 'GAME' && game) saveSessionGame(game);
  console.error(event.reason);
});

canvas.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;

  if (showUpdateScreen) {
    const pt = canvasPoint(event);
    if (isUpdateClicked(pt.x, pt.y, canvas.width, canvas.height)) {
      acceptGameUpdate();
      ensureAudio();
    }
    return;
  }

  if (mode === 'MENU') {
    const pt = canvasPoint(event);
    if (isPlayClicked(pt.x, pt.y, canvas.width, canvas.height)) {
      pendingMenuAction = 'play';
      ensureAudio();
      startCutscenes();
    } else if (hasSessionSave() && isContinueClicked(pt.x, pt.y, canvas.width, canvas.height)) {
      pendingMenuAction = 'continue';
      resumeAfterLoad = true;
      ensureAudio();
      enterGame(true);
    }
    return;
  }

  if (admin?.open) {
    const pt = canvasPoint(event);
    adminMod.handleAdminClick(admin, game, (updater) => {
      game = typeof updater === 'function' ? updater(game) : updater;
    }, pt.x, pt.y, canvas.width, canvas.height);
    return;
  }

  if (mode === 'GAME' && game && !game.won && !game.lost) {
    mouseLook.active = true;
    mouseLook.lastX = event.clientX;
    mouseLook.lastY = event.clientY;
    mouseLook.moved = false;
    ensureAudio();
  }
});

canvas.addEventListener('mouseup', (event) => {
  if (event.button !== 0) return;

  if (mode === 'GAME' && game && !game.won && !game.lost && !admin?.open) {
    if (!mouseLook.moved) {
      const pt = canvasPoint(event);
      if (game.shop?.open) {
        game = gameplay.handleGameClick(game, pt.x, pt.y, canvas.width, canvas.height);
      } else if (inventoryMod) {
        const slot = inventoryMod.getClickedInventorySlot(pt.x, pt.y, canvas.width, canvas.height);
        if (slot !== null) {
          game = gameplay.handleInventoryClick(game, pt.x, pt.y, canvas.width, canvas.height);
        } else {
          game = gameplay.handleGameClick(game, pt.x, pt.y, canvas.width, canvas.height);
        }
      }
      saveSessionGame(game);
    }
  }

  mouseLook.active = false;
  canvas.style.cursor = mode === 'MENU' ? (menuHover ? 'pointer' : 'default') : 'default';
});

canvas.addEventListener('mouseleave', () => {
  mouseLook.active = false;
  menuHover = false;
  canvas.style.cursor = 'default';
});

canvas.addEventListener('mousemove', (event) => {
  if (showUpdateScreen) {
    const pt = canvasPoint(event);
    updateHover = isUpdateClicked(pt.x, pt.y, canvas.width, canvas.height);
    canvas.style.cursor = updateHover ? 'pointer' : 'default';
    return;
  }

  if (mode === 'MENU') {
    const pt = canvasPoint(event);
    menuHover = isPlayClicked(pt.x, pt.y, canvas.width, canvas.height)
      || (hasSessionSave() && isContinueClicked(pt.x, pt.y, canvas.width, canvas.height));
    canvas.style.cursor = menuHover ? 'pointer' : 'default';
    return;
  }

  if (!mouseLook.active || mode !== 'GAME') return;

  const dx = event.clientX - mouseLook.lastX;
  const dy = event.clientY - mouseLook.lastY;
  if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
    mouseLook.moved = true;
    canvas.style.cursor = 'grabbing';
  }

  mouseLook.lastX = event.clientX;
  mouseLook.lastY = event.clientY;
  mouseLook.lookDelta += dx * mouseLook.sensitivity;
});

function applyMouseLook() {
  if (mouseLook.lookDelta !== 0 && game?.world) {
    game.world.player.angle += mouseLook.lookDelta;
    mouseLook.lookDelta = 0;
  }
}

function update(delta) {
  if (mode === 'ERROR') {
    if (input.isPressed('r')) {
      loadError = null;
      mode = 'MENU';
      ensureCutscenes().then(() => ensureGameplay()).catch(() => {});
    }
    return;
  }

  if (showUpdateScreen) return;

  if (mode === 'MENU') {
    if (!loading) {
      const action = updateMenu(input, canvas.width, canvas.height, pendingPlayClick, {
        canContinue: hasSessionSave(),
      });
      if (action === 'play') {
        ensureAudio();
        startCutscenes();
      } else if (action === 'continue') {
        resumeAfterLoad = true;
        ensureAudio();
        enterGame(true);
      }
    }
    pendingPlayClick = null;
    pendingMenuAction = null;
    return;
  }

  if (mode === 'CUTSCENE') {
    if (!cutsceneMod || !cutscene) return;

    if (input.isPressed('x') || input.isPressed('arrowup')) {
      ensureAudio();
    }

    cutscene = cutsceneMod.updateCutscene(cutscene, delta, input, canvas.width, canvas.height);
    if (cutscene.done) {
      if (resumeAfterLoad) {
        enterGame(true);
      } else {
        enterGame(false);
      }
    }
    return;
  }

  if (!gameplay || !game) return;

  if (input.isPressed('x') || input.isPressed('arrowup')) {
    ensureAudio();
  }

  admin = adminMod.updateAdmin(admin, input, game, (s) => { game = s; });

  applyMouseLook();
  game = gameplay.updateGameplay(game, delta, input, canvas.width, canvas.height, admin);

  autosaveTimer += delta;
  if (autosaveTimer >= AUTOSAVE_INTERVAL) {
    autosaveTimer = 0;
    saveSessionGame(game);
  }
}

function render() {
  if (showUpdateScreen) {
    renderUpdateScreen(ctx, canvas.width, canvas.height, updateHover);
    return;
  }

  if (mode === 'ERROR') {
    clearCanvas(ctx, '#0f172a');
    renderLoadError(ctx, canvas.width, canvas.height, loadError);
    return;
  }

  if (mode === 'MENU') {
    renderMenu(ctx, canvas.width, canvas.height, menuHover, {
      canContinue: hasSessionSave(),
    });
    if (loading) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx, 'Loading...', canvas.width / 2, canvas.height / 2, { size: 28, color: '#fff' });
    }
    return;
  }

  if (mode === 'CUTSCENE' && cutsceneMod && cutscene) {
    clearCanvas(ctx, '#22c55e');
    cutsceneMod.renderCutscene(cutscene, ctx, canvas.width, canvas.height);
    if (loading) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx, 'Loading...', canvas.width / 2, canvas.height / 2, { size: 28, color: '#fff' });
    }
    return;
  }

  if (!gameplay || !game) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameplay.renderGameplay(game, ctx, canvas.width, canvas.height);
  adminMod.renderAdmin(admin, ctx, canvas.width, canvas.height, game);

  if (offline) {
    renderOfflineBanner(ctx, canvas.width, canvas.height);
  }

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(canvas.width - 88, 4, 84, 18);
  drawText(ctx, `v${GAME_VERSION}`, canvas.width - 46, 13, { size: 10, color: '#94a3b8' });
}

function tick(delta) {
  update(delta);
  render();
}

loop(tick);

ensureCutscenes().then(() => ensureGameplay()).catch(() => {});
