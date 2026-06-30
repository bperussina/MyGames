/**
 * Run a function every animation frame.
 * Returns a stop function.
 */
export function loop(update) {
  let frameId = 0;
  let lastTime = performance.now();

  function tick(now) {
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    update(delta);
    frameId = requestAnimationFrame(tick);
  }

  frameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frameId);
}
