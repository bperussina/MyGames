import { createCanvas, clearCanvas, Input, loop } from '@mygames/shared';
import { initAudio } from './audio.js';
import { createCutsceneState, updateCutscene, renderCutscene } from './cutscenes.js';
import { createGameState, updateGameplay, renderGameplay } from './gameplay.js';
import { createAdminState, updateAdmin, renderAdmin, handleAdminClick } from './admin.js';
import { updateMenu, renderMenu, isPlayClicked } from './menu.js';

const { canvas, ctx } = createCanvas();
const input = new Input(window);

canvas.setAttribute('tabindex', '0');
canvas.addEventListener('click', () => canvas.focus());

let mode = 'MENU';
let cutscene = createCutsceneState();
let game = createGameState();
let admin = createAdminState();
let menuHover = false;
let pendingPlayClick = null;

const mouseLook = {
  active: false,
  lastX: 0,
  sensitivity: 0.004,
  lookDelta: 0,
};

canvas.style.cursor = 'default';

canvas.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;

  if (mode === 'MENU') {
    if (isPlayClicked(event.clientX, event.clientY, canvas.width, canvas.height)) {
      pendingPlayClick = { x: event.clientX, y: event.clientY };
      initAudio();
    }
    return;
  }

  if (admin.open) {
    handleAdminClick(admin, game, (updater) => {
      game = typeof updater === 'function' ? updater(game) : updater;
    }, event.clientX, event.clientY, canvas.width, canvas.height);
    return;
  }

  if (mode === 'GAME' && !game.won && !game.lost) {
    mouseLook.active = true;
    mouseLook.lastX = event.clientX;
    canvas.style.cursor = 'grabbing';
    initAudio();
  }
});

canvas.addEventListener('mouseup', (event) => {
  if (event.button === 0) {
    mouseLook.active = false;
    canvas.style.cursor = mode === 'MENU' ? (menuHover ? 'pointer' : 'default') : 'default';
  }
});

canvas.addEventListener('mouseleave', () => {
  mouseLook.active = false;
  menuHover = false;
  canvas.style.cursor = 'default';
});

canvas.addEventListener('mousemove', (event) => {
  if (mode === 'MENU') {
    menuHover = isPlayClicked(event.clientX, event.clientY, canvas.width, canvas.height);
    canvas.style.cursor = menuHover ? 'pointer' : 'default';
    return;
  }

  if (!mouseLook.active || mode !== 'GAME') return;
  const dx = event.clientX - mouseLook.lastX;
  mouseLook.lastX = event.clientX;
  mouseLook.lookDelta += dx * mouseLook.sensitivity;
});

function startGame() {
  mode = 'CUTSCENE';
  cutscene = createCutsceneState();
  game = createGameState();
  pendingPlayClick = null;
}

function applyMouseLook() {
  if (mouseLook.lookDelta !== 0 && game.world) {
    game.world.player.angle += mouseLook.lookDelta;
    mouseLook.lookDelta = 0;
  }
}

function update(delta) {
  if (mode === 'MENU') {
    if (updateMenu(input, canvas.width, canvas.height, pendingPlayClick)) {
      startGame();
    }
    pendingPlayClick = null;
    return;
  }

  if (input.isPressed('x') || input.isPressed(' ') || input.isPressed('arrowup')) {
    initAudio();
  }

  admin = updateAdmin(admin, input, game, (s) => { game = s; });

  if (mode === 'CUTSCENE') {
    cutscene = updateCutscene(cutscene, delta, input, canvas.width, canvas.height);
    if (cutscene.done) {
      mode = 'GAME';
      game = createGameState();
    }
    return;
  }

  applyMouseLook();
  game = updateGameplay(game, delta, input, canvas.width, canvas.height, admin);
}

function render() {
  if (mode === 'MENU') {
    renderMenu(ctx, canvas.width, canvas.height, menuHover);
    return;
  }

  clearCanvas(ctx, '#fce7f3');

  if (mode === 'CUTSCENE') {
    renderCutscene(cutscene, ctx, canvas.width, canvas.height);
  } else {
    renderGameplay(game, ctx, canvas.width, canvas.height);
    renderAdmin(admin, ctx, canvas.width, canvas.height, game);
  }
}

function tick(delta) {
  update(delta);
  render();
}

loop(tick);
