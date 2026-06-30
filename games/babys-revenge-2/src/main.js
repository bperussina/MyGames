import { createCanvas, clearCanvas, Input, loop } from '@mygames/shared';
import { drawText } from '@mygames/shared';
import { updateMenu, renderMenu, isPlayClicked } from './menu.js';

const { canvas, ctx } = createCanvas();
const input = new Input(window);

canvas.setAttribute('tabindex', '0');
canvas.addEventListener('click', () => canvas.focus());

let mode = 'MENU';
let menuHover = false;
let pendingPlayClick = null;
let loading = false;

let cutscene = null;
let game = null;
let admin = null;
let gameplay = null;
let cutsceneMod = null;
let adminMod = null;
let audioMod = null;
let inventoryMod = null;

const mouseLook = {
  active: false,
  lastX: 0,
  lastY: 0,
  moved: false,
  sensitivity: 0.004,
  lookDelta: 0,
};

const DRAG_THRESHOLD = 6;

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
}

async function startCutscenes() {
  await ensureCutscenes();
  cutscene = cutsceneMod.createCutsceneState();
  mode = 'CUTSCENE';
  pendingPlayClick = null;
}

async function enterGame() {
  loading = true;
  await ensureGameplay();
  game = gameplay.createGameState();
  mode = 'GAME';
  loading = false;
}

canvas.style.cursor = 'default';

canvas.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;

  if (mode === 'MENU') {
    const pt = canvasPoint(event);
    if (isPlayClicked(pt.x, pt.y, canvas.width, canvas.height)) {
      pendingPlayClick = { x: pt.x, y: pt.y };
      ensureAudio();
      startCutscenes();
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
  if (mode === 'MENU') {
    const pt = canvasPoint(event);
    menuHover = isPlayClicked(pt.x, pt.y, canvas.width, canvas.height);
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
  if (mode === 'MENU') {
    if (!loading && updateMenu(input, canvas.width, canvas.height, pendingPlayClick)) {
      ensureAudio();
      startCutscenes();
    }
    if (!loading) pendingPlayClick = null;
    return;
  }

  if (mode === 'CUTSCENE') {
    if (!cutsceneMod || !cutscene) return;

    if (input.isPressed('x') || input.isPressed('arrowup')) {
      ensureAudio();
    }

    cutscene = cutsceneMod.updateCutscene(cutscene, delta, input, canvas.width, canvas.height);
    if (cutscene.done) {
      enterGame();
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
}

function render() {
  if (mode === 'MENU') {
    renderMenu(ctx, canvas.width, canvas.height, menuHover);
    if (loading) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx, 'Loading...', canvas.width / 2, canvas.height / 2, { size: 28, color: '#fff' });
    }
    return;
  }

  clearCanvas(ctx, '#22c55e');

  if (mode === 'CUTSCENE' && cutsceneMod && cutscene) {
    cutsceneMod.renderCutscene(cutscene, ctx, canvas.width, canvas.height);
    if (loading) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx, 'Loading...', canvas.width / 2, canvas.height / 2, { size: 28, color: '#fff' });
    }
    return;
  }

  if (!gameplay || !game) return;

  gameplay.renderGameplay(game, ctx, canvas.width, canvas.height);
  adminMod.renderAdmin(admin, ctx, canvas.width, canvas.height, game);
}

function tick(delta) {
  update(delta);
  render();
}

loop(tick);

// Preload cutscenes on the menu, then gameplay so it's ready after dialogue.
ensureCutscenes().then(() => ensureGameplay());
