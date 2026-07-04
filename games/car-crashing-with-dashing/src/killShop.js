import { getBasicWeapons } from './weapons.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function createKillShop(loadout, { onEquip, onClose, getCoinsText, onPurchaseFail }) {
  let overlay = null;
  let visible = false;

  overlay = document.createElement('div');
  overlay.id = 'kill-shop';
  overlay.className = 'shop-overlay';
  overlay.innerHTML = `
    <div class="shop-panel">
      <header class="shop-header">
        <h1>Kill Shop</h1>
        <p>One weapon per type (mini gun, saw, or chainsaw). Hold click to shoot targets with a mini gun.</p>
        <p class="shop-coins" id="kill-shop-coins">Coins: 0</p>
      </header>
      <div class="shop-tabs">
        <button type="button" class="shop-tab active" data-tab="buy">Buy</button>
        <button type="button" class="shop-tab" data-tab="equip">Equip</button>
      </div>
      <div class="shop-grid" id="kill-shop-grid"></div>
      <button type="button" class="shop-close" id="kill-shop-close">Close</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const grid = overlay.querySelector('#kill-shop-grid');
  const coinsEl = overlay.querySelector('#kill-shop-coins');
  let activeTab = 'buy';

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = '';
    coinsEl.textContent = getCoinsText?.() ?? `Coins: ${loadout.getCoins()}`;

    const weapons = getBasicWeapons();
    const list = activeTab === 'buy'
      ? weapons
      : weapons.filter((w) => loadout.ownsWeapon(w.id));

    if (activeTab === 'equip' && list.length === 0) {
      grid.innerHTML = '<p class="shop-empty">Buy a weapon first!</p>';
      return;
    }

    for (const weapon of list) {
      const owned = loadout.ownsWeapon(weapon.id);
      const equipped = loadout.isWeaponEquipped(weapon.id);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shop-item';
      if (equipped) btn.classList.add('equipped');
      const ownedType = loadout.getOwnedWeaponOfType?.(weapon.type);
      btn.innerHTML = `
        <span class="shop-item-swatch" style="background:#${weapon.color.toString(16).padStart(6, '0')}"></span>
        <span class="shop-item-name">${escapeHtml(weapon.name)}</span>
        <span class="shop-item-meta">${activeTab === 'buy'
    ? `${weapon.cost} coins${ownedType && ownedType.id !== weapon.id ? ' · replaces' : ''}`
    : equipped ? 'Equipped' : 'Owned'}</span>
      `;
      btn.addEventListener('click', () => {
        if (activeTab === 'buy') {
          if (owned) {
            loadout.equipWeapon(weapon.id);
            onEquip?.(weapon.id);
            renderGrid();
            return;
          }
          const result = loadout.buyWeapon(weapon.id);
          if (result.ok) {
            onEquip?.(result.weapon?.id ?? weapon.id);
          } else if (result.reason === 'insufficient') {
            onPurchaseFail?.('insufficient');
          }
        } else {
          loadout.equipWeapon(weapon.id);
          onEquip?.(weapon.id);
        }
        renderGrid();
      });
      grid.appendChild(btn);
    }
  }

  overlay.querySelectorAll('.shop-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      overlay.querySelectorAll('.shop-tab').forEach((t) => t.classList.toggle('active', t === tab));
      renderGrid();
    });
  });

  overlay.querySelector('#kill-shop-close').addEventListener('click', () => hideKillShop());

  function showKillShop() {
    visible = true;
    overlay.style.display = 'flex';
    renderGrid();
  }

  function hideKillShop() {
    visible = false;
    overlay.style.display = 'none';
    onClose?.();
  }

  function isKillShopVisible() {
    return visible;
  }

  function refreshKillShop() {
    if (visible) renderGrid();
  }

  return { showKillShop, hideKillShop, isKillShopVisible, refreshKillShop };
}
