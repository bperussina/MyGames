import {
  createCanvas,
  clearCanvas,
  drawText,
  loop,
} from '@mygames/shared';

const { ctx } = createCanvas();

function render() {
  clearCanvas(ctx, '#22c55e');
  drawText(ctx, 'car crashing with dashing', ctx.canvas.width / 2, ctx.canvas.height / 2, {
    color: '#14532d',
    size: 44,
  });
}

loop(render);
