/** Hold left mouse button and drag on the game canvas to look around. */
const look = { yaw: 0, pitch: 0.12 };
let dragging = false;
let lastX = 0;
let lastY = 0;

const SENS = 0.004;
const PITCH_MIN = -0.35;
const PITCH_MAX = 0.55;

export function getMouseLookOffset() {
  return look;
}

export function resetMouseLook() {
  look.yaw = 0;
  look.pitch = 0.12;
}

export function initMouseLook(canvas) {
  if (!canvas) return;

  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (e.target !== canvas) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    look.yaw -= dx * SENS;
    look.pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, look.pitch - dy * SENS));
  });

  window.addEventListener('mouseup', (e) => {
    if (e.button === 0) dragging = false;
  });

  window.addEventListener('blur', () => {
    dragging = false;
  });
}
