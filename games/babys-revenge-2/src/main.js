import { createCanvas, clearCanvas, Input, loop } from '@mygames/shared';
import { initAudio } from './audio.js';
import { createCutsceneState, updateCutscene, renderCutscene } from './cutscenes.js';
import { createGameState, updateGameplay, renderGameplay } from './gameplay.js';
import { createAdminState, updateAdmin, renderAdmin, handleAdminClick } from './admin.js';

const { canvas, ctx } = createCanvas();
const input = new Input();

let mode = 'CUTSCENE';
let cutscene = createCutsceneState();
let game = createGameState();
let admin = createAdminState();

canvas.addEventListener('pointerdown', (event) => {
  if (admin.open) {
    handleAdminClick(admin, game, (updater) => {
      game = typeof updater === 'function' ? updater(game) : updater;
    }, event.clientX, event.clientY, canvas.width, canvas.height);
  }
});

function update(delta) {
  if (input.isPressed('x') || input.isPressed(' ')) {
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

  game = updateGameplay(game, delta, input, canvas.width, canvas.height, admin);
}

function render() {
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
