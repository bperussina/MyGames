import { SKIN_CATALOG } from './skins.js';
import { getAdminWeapons } from './weapons.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function createAdminShop(loadout, { onEquipWeapon, onEquipSkin, onClose, getCoinsText, onPurchaseFail }) {
  let overlay = null;
  let visible = false;

  overlay = document.createElement('div');
  overlay.id = 'admin-shop';
  overlay.className = 'shop-overlay';
  overlay.innerHTML = `
    <div class="shop-panel admin-shop-panel">
      <header class="shop-header">
        <h1>Admin Shop</h1>
        <p>Owner only — car skins and expanded weapons.</p>
        <p class="shop-coins" id="admin-shop-coins">Coins: 0</p>
      </header>
      <div class="shop-tabs">
        <button type="button" class="shop-tab active" data-tab="skins">Skins</button>
        <button type="button" class="shop-tab" data-tab="weapons">Weapons</button>
        <button type="button" class="shop-tab" data-tab="equip">Equip</button>
      </div>
      <div class="shop-grid" id="admin-shop-grid"></div>
      <button type="button" class="shop-close" id="admin-shop-close">Close</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const grid = overlay.querySelector('#admin-shop-grid');
  const coinsEl = overlay.querySelector('#admin-shop-coins');
  let activeTab = 'skins';

  function renderSkins(buyMode) {
    const list = buyMode
      ? SKIN_CATALOG
      : SKIN_CATALOG.filter((s) => loadout.ownsSkin(s.id));

    if (!buyMode && list.length === 0) {
      grid.innerHTML = '<p class="shop-empty">Buy a skin in the Skins tab!</p>';
      return;
    }

    for (const skin of list) {
      const owned = loadout.ownsSkin(skin.id);
      const equipped = loadout.getEquippedSkinId() === skin.id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shop-item';
      if (equipped) btn.classList.add('equipped');
      btn.innerHTML = `
        <span class="shop-item-swatch" style="background:#${skin.color.toString(16).padStart(6, '0')}"></span>
        <span class="shop-item-name">${escapeHtml(skin.name)}</span>
        <span class="shop-item-meta">${buyMode ? `${skin.cost} coins` : equipped ? 'Equipped' : 'Owned'}</span>
      `;
      btn.addEventListener('click', () => {
        if (buyMode) {
          if (owned) {
            loadout.equipSkin(skin.id);
            onEquipSkin?.(skin.id);
          } else {
            const result = loadout.buySkin(skin.id);
            if (result.ok) {
              loadout.equipSkin(skin.id);
              onEquipSkin?.(skin.id);
            } else if (result.reason === 'insufficient') {
              onPurchaseFail?.('insufficient');
            }
          }
        } else {
          loadout.equipSkin(skin.id);
          onEquipSkin?.(skin.id);
        }
        renderGrid();
      });
      grid.appendChild(btn);
    }
  }

  function renderWeapons(buyMode) {
    const weapons = getAdminWeapons();
    const list = buyMode
      ? weapons
      : weapons.filter((w) => loadout.ownsWeapon(w.id));

    if (!buyMode && list.length === 0) {
      grid.innerHTML = '<p class="shop-empty">Buy weapons in the Weapons tab!</p>';
      return;
    }

    for (const weapon of list) {
      const owned = loadout.ownsWeapon(weapon.id);
      const equipped = loadout.getEquippedWeapon()?.id === weapon.id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shop-item';
      if (equipped) btn.classList.add('equipped');
      if (weapon.tier === 'premium') btn.classList.add('premium');
      btn.innerHTML = `
        <span class="shop-item-swatch" style="background:#${weapon.color.toString(16).padStart(6, '0')}"></span>
        <span class="shop-item-name">${escapeHtml(weapon.name)}</span>
        <span class="shop-item-meta">${buyMode ? `${weapon.cost} coins` : equipped ? 'Equipped' : 'Owned'}${weapon.tier === 'premium' ? ' ★' : ''}</span>
      `;
      btn.addEventListener('click', () => {
        if (buyMode) {
          if (owned) {
            loadout.equipWeapon(weapon.id);
            onEquipWeapon?.(weapon.id);
          } else {
            const result = loadout.buyWeapon(weapon.id);
            if (result.ok) {
              onEquipWeapon?.(result.weapon?.id ?? weapon.id);
            } else if (result.reason === 'insufficient') {
              onPurchaseFail?.('insufficient');
            }
          }
        } else {
          loadout.equipWeapon(weapon.id);
          onEquipWeapon?.(weapon.id);
        }
        renderGrid();
      });
      grid.appendChild(btn);
    }
  }

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = '';
    coinsEl.textContent = getCoinsText?.() ?? `Coins: ${loadout.getCoins()}`;

    if (activeTab === 'skins') renderSkins(true);
    else if (activeTab === 'weapons') renderWeapons(true);
    else if (activeTab === 'equip') {
      const ownedSkins = SKIN_CATALOG.filter((s) => loadout.ownsSkin(s.id));
      const ownedWeapons = getAdminWeapons().filter((w) => loadout.ownsWeapon(w.id));
      if (ownedSkins.length === 0 && ownedWeapons.length === 0) {
        grid.innerHTML = '<p class="shop-empty">Buy skins or weapons first!</p>';
        return;
      }
      if (ownedSkins.length) renderSkins(false);
      if (ownedWeapons.length) renderWeapons(false);
    }
  }

  overlay.querySelectorAll('.shop-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      overlay.querySelectorAll('.shop-tab').forEach((t) => t.classList.toggle('active', t === tab));
      renderGrid();
    });
  });

  overlay.querySelector('#admin-shop-close').addEventListener('click', () => hideAdminShop());

  function showAdminShop() {
    visible = true;
    overlay.style.display = 'flex';
    renderGrid();
  }

  function hideAdminShop() {
    visible = false;
    overlay.style.display = 'none';
    onClose?.();
  }

  function isAdminShopVisible() {
    return visible;
  }

  function refreshAdminShop() {
    if (visible) renderGrid();
  }

  return { showAdminShop, hideAdminShop, isAdminShopVisible, refreshAdminShop };
}
