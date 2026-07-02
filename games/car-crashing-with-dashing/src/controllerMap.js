import { BUTTON_IDS } from './gamepad.js';

const STORAGE_KEY = 'ccwd-button-labels';
const CONTROLLER_IMG = './xbox-controller.jpg';

/** Hotspot on the real controller photo (0–1 coords). */
const HOTSPOTS = {
  lb: { x: 0.18, y: 0.15 },
  rb: { x: 0.78, y: 0.12 },
  lt: { x: 0.12, y: 0.08 },
  rt: { x: 0.85, y: 0.05 },
  view: { x: 0.39, y: 0.33 },
  menu: { x: 0.51, y: 0.29 },
  ls: { x: 0.25, y: 0.37 },
  rs: { x: 0.60, y: 0.45 },
  dpadUp: { x: 0.40, y: 0.48 },
  dpadDown: { x: 0.40, y: 0.56 },
  dpadLeft: { x: 0.36, y: 0.52 },
  dpadRight: { x: 0.44, y: 0.52 },
  x: { x: 0.61, y: 0.25 },
  y: { x: 0.68, y: 0.17 },
  a: { x: 0.68, y: 0.32 },
  b: { x: 0.75, y: 0.23 },
  xbox: { x: 0.42, y: 0.20 },
};

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

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function drawLeaderLines() {
  const svg = overlay.querySelector('.cm-lines');
  const img = overlay.querySelector('.cm-photo');
  const rows = overlay.querySelectorAll('.cm-row');
  if (!svg || !img || !rows.length) return;

  const scene = overlay.querySelector('.cm-scene');
  const sceneRect = scene.getBoundingClientRect();
  const imgRect = img.getBoundingClientRect();

  const lines = [];
  rows.forEach((row) => {
    const id = row.dataset.id;
    const spot = HOTSPOTS[id];
    if (!spot) return;

    const rowRect = row.querySelector('.cm-input').getBoundingClientRect();
    const x1 = imgRect.left - sceneRect.left + imgRect.width * spot.x;
    const y1 = imgRect.top - sceneRect.top + imgRect.height * spot.y;
    const x2 = rowRect.left - sceneRect.left;
    const y2 = rowRect.top - sceneRect.top + rowRect.height / 2;

    lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`);
    lines.push(`<circle cx="${x1}" cy="${y1}" r="5" class="cm-dot" />`);
  });

  svg.setAttribute('width', sceneRect.width);
  svg.setAttribute('height', sceneRect.height);
  svg.innerHTML = lines.join('');
}

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
    <div class="cm-scene">
      <div class="cm-photo-wrap">
        <img class="cm-photo" src="${CONTROLLER_IMG}" alt="Xbox wireless controller" width="2073" height="1882" />
      </div>
      <div class="cm-fields" id="cm-fields"></div>
      <svg class="cm-lines" aria-hidden="true"></svg>
    </div>
    <p class="cm-credit">Controller photo: Evan Amos — Xbox Wireless Controller (public domain, Wikimedia Commons)</p>
    <button type="button" class="cm-done" id="cm-done">Done — back to green world</button>
  `;

  document.body.appendChild(overlay);

  const fields = overlay.querySelector('#cm-fields');
  const bindings = loadBindings();

  for (const btn of BUTTON_IDS) {
    const row = document.createElement('div');
    row.className = 'cm-row';
    row.dataset.id = btn.id;
    row.innerHTML = `
      <label class="cm-label">${btn.label}</label>
      <input type="text" class="cm-input" data-id="${btn.id}" placeholder="blank = does nothing" value="${escapeAttr(bindings[btn.id] ?? '')}" />
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

  const img = overlay.querySelector('.cm-photo');
  img.addEventListener('load', () => drawLeaderLines());
  window.addEventListener('resize', () => {
    if (isControllerMapVisible()) drawLeaderLines();
  });

  return overlay;
}

export function showControllerMap() {
  createControllerMap(onDone);
  overlay.style.display = 'flex';
  requestAnimationFrame(() => drawLeaderLines());
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
