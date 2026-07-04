import { widthLabel } from './carCollision.js';

function barColor(pct) {
  if (pct > 66) return '#22c55e';
  if (pct > 33) return '#eab308';
  return '#ef4444';
}

function row(label, pct) {
  const c = barColor(pct);
  return `<div class="dmg-row"><span class="dmg-label">${label}</span>
    <div class="dmg-track"><div class="dmg-fill" style="width:${pct}%;background:${c}"></div></div>
    <span class="dmg-pct">${Math.round(pct)}%</span></div>`;
}

export function refreshDamageHud(el, vehicle) {
  if (!el || !vehicle?.partHealth) return;
  const h = vehicle.partHealth;
  const wheels = Math.round((h.wheel_fl + h.wheel_fr + h.wheel_rl + h.wheel_rr) / 4);
  const width = vehicle.collisionWidth ?? 1.88;
  el.innerHTML = `
    <p class="dmg-title">Vehicle damage</p>
    <p class="dmg-width">${width.toFixed(2)}m wide · ${widthLabel(width, vehicle)}</p>
    ${row('Engine', h.engine)}
    ${row('Body', h.body)}
    ${row('Hood', h.hood)}
    ${row('Glass', h.windshield)}
    ${row('Wheels', wheels)}
  `;
}

export function setDamageHudVisible(el, visible) {
  if (!el) return;
  if (visible) el.removeAttribute('hidden');
  else el.setAttribute('hidden', '');
}
