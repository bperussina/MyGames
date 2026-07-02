import { BUTTON_IDS } from './gamepad.js';
import { loadBindings } from './controllerMap.js';

/** Shown on button chips when the map line is blank — keeps new players from guessing. */
const DEFAULT_BINDINGS = {
  x: 'Gas',
  b: 'Brake',
  lb: 'Turn left',
  lt: 'Turn left',
  rb: 'Turn right',
  menu: 'Change controls',
};

const CHIP_CLASS = {
  a: 'chip-a',
  b: 'chip-b',
  x: 'chip-x',
  y: 'chip-y',
  lb: 'chip-bump',
  rb: 'chip-bump',
  lt: 'chip-trigger',
  rt: 'chip-trigger',
  view: 'chip-misc',
  menu: 'chip-misc',
  ls: 'chip-misc',
  rs: 'chip-misc',
  dpadUp: 'chip-dpad',
  dpadDown: 'chip-dpad',
  dpadLeft: 'chip-dpad',
  dpadRight: 'chip-dpad',
  xbox: 'chip-misc',
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function bindingText(bindings, id) {
  const saved = (bindings[id] ?? '').trim();
  if (saved) return saved;
  return (DEFAULT_BINDINGS[id] ?? '').trim();
}

function renderPcKey(key, word) {
  return `<span class="pc-key" title="${escapeHtml(word)}"><span class="pc-key-letter">${escapeHtml(key)}</span><span class="pc-key-word">${escapeHtml(word)}</span></span>`;
}

function renderPadChip(btn, word) {
  const chipClass = CHIP_CLASS[btn.id] ?? 'chip-misc';
  return `<span class="pad-chip ${chipClass}" title="${escapeHtml(btn.label)} button — ${escapeHtml(word)}"><span class="pad-chip-mark">${escapeHtml(btn.label)}</span><span class="pad-chip-word">${escapeHtml(word)}</span></span>`;
}

/** Tiny bottom-right help — your map labels printed on each button chip. */
export function refreshControlsHud(root, { driving = false } = {}) {
  if (!root) return;
  const body = root.querySelector('#controls-body');
  if (!body) return;

  const bindings = loadBindings();

  const pcKeys = driving
    ? [
        { key: 'W', word: 'Gas' },
        { key: '↑', word: 'Gas' },
        { key: 'S', word: 'Brake' },
        { key: '↓', word: 'Brake' },
        { key: 'A', word: 'Left' },
        { key: '←', word: 'Left' },
        { key: 'D', word: 'Right' },
        { key: '→', word: 'Right' },
        { key: 'E', word: 'Exit car' },
      ]
    : [
        { key: 'W', word: 'Forward' },
        { key: '↑', word: 'Forward' },
        { key: 'A', word: 'Left' },
        { key: '←', word: 'Left' },
        { key: 'S', word: 'Back' },
        { key: '↓', word: 'Back' },
        { key: 'D', word: 'Right' },
        { key: '→', word: 'Right' },
      ];

  const padChips = [`<span class="pad-chip chip-stick" title="Left stick — move"><span class="pad-chip-mark">Stick</span><span class="pad-chip-word">Move</span></span>`];

  for (const btn of BUTTON_IDS) {
    const word = bindingText(bindings, btn.id);
    if (!word) continue;
    padChips.push(renderPadChip(btn, word));
  }

  body.innerHTML = `
    <p class="controls-mini-hint">${driving ? 'Driving' : 'Walking'} — iPad: use arrows bottom-left · Garage on left</p>
    <div class="controls-mini-block">
      <span class="controls-mini-label">Keyboard</span>
      <div class="pc-keys">${pcKeys.map(({ key, word }) => renderPcKey(key, word)).join('')}</div>
    </div>
    <div class="controls-mini-block">
      <span class="controls-mini-label">Xbox</span>
      <div class="pad-chips">${padChips.join('')}</div>
    </div>
  `;
}

export function setControlsHudVisible(root, visible, options = {}) {
  if (!root) return;
  if (!visible) {
    root.hidden = true;
    return;
  }

  const driving = options.driving ? '1' : '0';
  const needsRefresh = root.hidden || root.dataset.driving !== driving;
  if (needsRefresh) {
    refreshControlsHud(root, options);
    root.dataset.driving = driving;
  }
  root.hidden = false;
}
