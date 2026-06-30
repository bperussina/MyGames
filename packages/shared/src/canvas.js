/**
 * Create a full-window canvas and 2D drawing context.
 */
export function createCanvas(parent = document.body) {
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  parent.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  return { canvas, ctx, resize };
}

/**
 * Fill the canvas with a solid color.
 */
export function clearCanvas(ctx, color = '#1a1a2e') {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
