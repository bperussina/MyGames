import { BUTTON_IDS } from './gamepad.js';

const STORAGE_KEY = 'ccwd-button-labels';

export function loadBindings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function saveBindings(bindings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bindings));
  } catch {
    /* storage blocked */
  }
}

let overlay = null;
let onDone = null;

export function createControllerMap(onDoneCallback) {
  onDone = onDoneCallback;
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'controller-map';
  overlay.innerHTML = `
    <div class="cm-header">
      <h1>Xbox controller — write what each button does</h1>
      <p>Leave a line blank and that button won't do anything.</p>
    </div>
    <div class="cm-body">
      <div class="cm-pad-wrap">
        <svg class="cm-svg" viewBox="0 0 520 320" aria-hidden="true">
          <ellipse cx="260" cy="160" rx="230" ry="130" fill="#2d2d2d" stroke="#111" stroke-width="4"/>
          <rect x="70" y="95" width="95" height="130" rx="45" fill="#1a1a1a" stroke="#444" stroke-width="3"/>
          <rect x="355" y="95" width="95" height="130" rx="45" fill="#1a1a1a" stroke="#444" stroke-width="3"/>
          <circle cx="115" cy="160" r="32" fill="#111" stroke="#555" stroke-width="2"/>
          <circle cx="405" cy="160" r="32" fill="#111" stroke="#555" stroke-width="2"/>
          <circle cx="330" cy="115" r="16" fill="#107c10"/>
          <circle cx="360" cy="145" r="16" fill="#d13438"/>
          <circle cx="300" cy="145" r="16" fill="#0078d4"/>
          <circle cx="330" cy="175" r="16" fill="#ffba00"/>
          <rect x="175" y="55" width="50" height="28" rx="8" fill="#333" stroke="#666"/>
          <rect x="295" y="55" width="50" height="28" rx="8" fill="#333" stroke="#666"/>
          <circle cx="260" cy="200" r="18" fill="#333" stroke="#888"/>
          <text x="260" y="205" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Xbox</text>
        </svg>
      </div>
      <div class="cm-fields" id="cm-fields"></div>
    </div>
    <button type="button" class="cm-done" id="cm-done">Done — back to green world</button>
  `;

  document.body.appendChild(overlay);

  const fields = overlay.querySelector('#cm-fields');
  const bindings = loadBindings();

  for (const btn of BUTTON_IDS) {
    const row = document.createElement('div');
    row.className = 'cm-row';
    row.innerHTML = `
      <span class="cm-line"></span>
      <label class="cm-label">${btn.label}</label>
      <input type="text" class="cm-input" data-id="${btn.id}" placeholder="(blank = does nothing)" value="${escapeAttr(bindings[btn.id] ?? '')}" />
    `;
    fields.appendChild(row);
  }

  overlay.querySelector('#cm-done').addEventListener('click', () => {
    const next = {};
    overlay.querySelectorAll('.cm-input').forEach((el) => {
      next[el.dataset.id] = el.value;
    });
    saveBindings(next);
    hideControllerMap();
    onDone?.();
  });

  return overlay;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function showControllerMap() {
  createControllerMap(onDone);
  overlay.style.display = 'flex';
}

export function hideControllerMap() {
  if (overlay) overlay.style.display = 'none';
}

export function isControllerMapVisible() {
  return overlay?.style.display === 'flex';
}

export function getBindingsFromForm() {
  if (!overlay) return loadBindings();
  const next = {};
  overlay.querySelectorAll('.cm-input').forEach((el) => {
    next[el.dataset.id] = el.value;
  });
  return next;
}
