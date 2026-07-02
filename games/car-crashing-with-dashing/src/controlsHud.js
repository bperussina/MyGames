import { BUTTON_IDS } from './gamepad.js';
import { loadBindings } from './controllerMap.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function renderRows(rows) {
  return rows
    .map(
      ({ key, action, wide }) =>
        `<li><span class="control-key${wide ? ' wide' : ''}">${escapeHtml(key)}</span><span class="control-action">${escapeHtml(action)}</span></li>`,
    )
    .join('');
}

/** Rebuild HUD from saved controller-map labels (ccwd-button-labels). */
export function refreshControlsHud(root) {
  if (!root) return;
  const body = root.querySelector('#controls-body');
  if (!body) return;

  const bindings = loadBindings();

  const keyboardRows = [
    { key: 'W', action: 'Forward' },
    { key: 'A', action: 'Left' },
    { key: 'S', action: 'Back' },
    { key: 'D', action: 'Right' },
  ];

  const xboxRows = [{ key: 'Left stick', action: 'Move', wide: true }];
  for (const btn of BUTTON_IDS) {
    const action = (bindings[btn.id] ?? '').trim();
    xboxRows.push({
      key: btn.label,
      action: action || '—',
      wide: btn.label.length > 3,
    });
  }

  body.innerHTML = `
    <div class="controls-section">
      <p class="controls-heading">Computer</p>
      <ul class="controls-list">${renderRows(keyboardRows)}</ul>
    </div>
    <div class="controls-section">
      <p class="controls-heading">Xbox</p>
      <ul class="controls-list">${renderRows(xboxRows)}</ul>
    </div>
  `;
}

export function setControlsHudVisible(root, visible) {
  if (!root) return;
  if (visible) {
    if (root.hidden) refreshControlsHud(root);
    root.hidden = false;
  } else {
    root.hidden = true;
  }
}
