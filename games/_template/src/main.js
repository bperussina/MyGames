import {
  createCanvas,
  clearCanvas,
  drawText,
  loop,
} from '@mygames/shared';

const { ctx } = createCanvas();

function update() {
  clearCanvas(ctx, '#16213e');
  drawText(ctx, '__GAME_NAME__', ctx.canvas.width / 2, ctx.canvas.height / 2, {
    color: '#e94560',
    size: 48,
  });
  drawText(ctx, 'Edit src/main.js to start building!', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50, {
    color: '#a2d2ff',
    size: 20,
  });
}

loop(update);
