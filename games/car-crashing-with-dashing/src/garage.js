import { CAR_CATALOG } from './cars.js';

let overlay = null;
let onSpawn = null;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function createGarage(onSpawnCallback) {
  onSpawn = onSpawnCallback;

  const box = document.createElement('button');
  box.type = 'button';
  box.id = 'garage-box';
  box.className = 'garage-box';
  box.title = 'Open car garage';
  box.innerHTML = `
    <img src="./cybertruck.svg" alt="Tesla Cybertruck" width="120" height="72" />
    <span class="garage-label">GARAGE</span>
  `;
  box.addEventListener('click', () => showGarage());
  document.body.appendChild(box);

  overlay = document.createElement('div');
  overlay.id = 'car-garage';
  overlay.innerHTML = `
    <div class="garage-panel">
      <header class="garage-header">
        <h1>Every car in the world</h1>
        <p>Click a car to spawn it — you jump into the driver seat.</p>
        <input type="search" class="garage-search" id="garage-search" placeholder="Search cars..." />
      </header>
      <div class="garage-grid" id="garage-grid"></div>
      <button type="button" class="garage-close" id="garage-close">Close</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const grid = overlay.querySelector('#garage-grid');
  for (const car of CAR_CATALOG) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'garage-car';
    btn.dataset.id = car.id;
    btn.dataset.search = `${car.name} ${car.maker} ${car.year}`.toLowerCase();
    btn.innerHTML = `
      <span class="garage-car-year">${car.year}</span>
      <span class="garage-car-name">${escapeHtml(car.name)}</span>
      <span class="garage-car-maker">${escapeHtml(car.maker)}</span>
    `;
    btn.addEventListener('click', () => {
      const spec = CAR_CATALOG.find((c) => c.id === car.id);
      if (spec) {
        hideGarage();
        onSpawn?.(spec);
      }
    });
    grid.appendChild(btn);
  }

  overlay.querySelector('#garage-close').addEventListener('click', hideGarage);
  overlay.querySelector('#garage-search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    grid.querySelectorAll('.garage-car').forEach((el) => {
      el.hidden = q.length > 0 && !el.dataset.search.includes(q);
    });
  });

  return { box, overlay };
}

export function showGarage() {
  if (overlay) {
    overlay.style.display = 'flex';
    overlay.querySelector('#garage-search').value = '';
    overlay.querySelectorAll('.garage-car').forEach((el) => {
      el.hidden = false;
    });
  }
}

export function hideGarage() {
  if (overlay) overlay.style.display = 'none';
}

export function isGarageVisible() {
  return overlay?.style.display === 'flex';
}

export function setGarageBoxVisible(visible) {
  const box = document.getElementById('garage-box');
  if (box) box.hidden = !visible;
}

export function getCarSpec(id) {
  return CAR_CATALOG.find((c) => c.id === id);
}
