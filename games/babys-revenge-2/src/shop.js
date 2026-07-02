import { drawText, drawRect } from '@mygames/shared';
import { applyToyBoxUpgrade } from './inventory.js';

export const BASE_MAX_HEALTH = 3;
export const BASE_HITS_TO_DEFEAT = 3;

export const SHOP_UPGRADES = [
  {
    id: 'health',
    name: 'Upgrade Health',
    desc: '+1 max heart (and heal 1)',
    icon: '❤️',
    baseCost: 3,
    maxLevel: 3,
    costPerLevel: 2,
  },
  {
    id: 'damage',
    name: 'Upgrade Damage',
    desc: 'Toys need fewer hits to defeat kids',
    icon: '💥',
    baseCost: 2,
    maxLevel: 2,
    costPerLevel: 3,
  },
  {
    id: 'toys',
    name: 'Upgrade Toy Box',
    desc: 'All toys in your box hit much harder',
    icon: '📦',
    baseCost: 2,
    maxLevel: 4,
    costPerLevel: 2,
  },
];

export function createShopState() {
  return {
    open: false,
    levels: {
      health: 0,
      damage: 0,
      toys: 0,
    },
  };
}

export function getUpgradeCost(upgrade, currentLevel) {
  return upgrade.baseCost + currentLevel * upgrade.costPerLevel;
}

export function canBuyUpgrade(shop, upgradeId, liveDucks) {
  const upgrade = SHOP_UPGRADES.find((u) => u.id === upgradeId);
  if (!upgrade) return false;
  const level = shop.levels[upgradeId] ?? 0;
  if (level >= upgrade.maxLevel) return false;
  return liveDucks >= getUpgradeCost(upgrade, level);
}

export function buyUpgrade(shop, inventory, upgradeId, state) {
  const upgrade = SHOP_UPGRADES.find((u) => u.id === upgradeId);
  if (!upgrade || !canBuyUpgrade(shop, upgradeId, state.liveDucks)) return false;

  const level = shop.levels[upgradeId];
  const cost = getUpgradeCost(upgrade, level);
  state.liveDucks -= cost;
  shop.levels[upgradeId] = level + 1;

  if (upgradeId === 'health') {
    state.health = Math.min(getMaxHealth(shop), state.health + 1);
  } else if (upgradeId === 'toys') {
    applyToyBoxUpgrade(inventory, shop.levels.toys);
  }

  return true;
}

export function getMaxHealth(shop) {
  return BASE_MAX_HEALTH + (shop?.levels?.health ?? 0);
}

export function getHitsToDefeat(shop) {
  return Math.max(1, BASE_HITS_TO_DEFEAT - (shop?.levels?.damage ?? 0));
}

export function getToyDamage(shop) {
  const toyLevel = shop?.levels?.toys ?? 0;
  return 1 + toyLevel * 2;
}

export function getThrowSpeed(shop) {
  return 1 + (shop?.levels?.toys ?? 0) * 0.25 + (shop?.levels?.damage ?? 0) * 0.15;
}

export function getShopButtonBounds(width, height) {
  const w = 120;
  const h = 40;
  return { x: width / 2 - w / 2, y: 10, w, h };
}

export function isShopButtonClicked(x, y, width, height) {
  const b = getShopButtonBounds(width, height);
  return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
}

export function getShopPanelBounds(width, height) {
  const w = 360;
  const h = 300;
  return { x: width / 2 - w / 2, y: height / 2 - h / 2, w, h };
}

export function handleShopClick(state, clickX, clickY, width, height) {
  if (!state.shop.open) return state;

  const panel = getShopPanelBounds(width, height);
  const closeBtn = { x: panel.x + panel.w - 36, y: panel.y + 8, w: 28, h: 28 };
  if (
    clickX >= closeBtn.x && clickX <= closeBtn.x + closeBtn.w &&
    clickY >= closeBtn.y && clickY <= closeBtn.y + closeBtn.h
  ) {
    state.shop.open = false;
    return state;
  }

  let rowY = panel.y + 56;
  SHOP_UPGRADES.forEach((upgrade) => {
    const btn = { x: panel.x + 16, y: rowY, w: panel.w - 32, h: 56 };
    if (
      clickX >= btn.x && clickX <= btn.x + btn.w &&
      clickY >= btn.y && clickY <= btn.y + btn.h
    ) {
      buyUpgrade(state.shop, state.inventory, upgrade.id, state);
    }
    rowY += 64;
  });

  return state;
}

export function renderShopButton(ctx, width, height, liveDucks) {
  const b = getShopButtonBounds(width, height);
  drawRect(ctx, b.x, b.y, b.w, b.h, liveDucks > 0 ? '#7c3aed' : '#475569');
  drawText(ctx, `🛒 SHOP · ${liveDucks} 🦆`, b.x + b.w / 2, b.y + b.h / 2, { size: 15, color: '#fff' });
}

export function renderShop(ctx, width, height, shop, inventory, liveDucks) {
  if (!shop.open) return;

  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, width, height);

  const panel = getShopPanelBounds(width, height);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(panel.x, panel.y, panel.w, panel.h);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.strokeRect(panel.x, panel.y, panel.w, panel.h);

  drawText(ctx, '🛒 DUCK SHOP', panel.x + panel.w / 2, panel.y + 28, { size: 24, color: '#facc15' });
  drawText(ctx, `Spend your alive ducks · ${liveDucks} 🦆`, panel.x + panel.w / 2, panel.y + 48, {
    size: 14, color: '#94a3b8',
  });
  drawText(ctx, '✕', panel.x + panel.w - 22, panel.y + 24, { size: 20, color: '#ef4444' });

  let rowY = panel.y + 68;
  SHOP_UPGRADES.forEach((upgrade) => {
    const level = shop.levels[upgrade.id] ?? 0;
    const maxed = level >= upgrade.maxLevel;
    const canBuy = canBuyUpgrade(shop, upgrade.id, liveDucks);
    const cost = maxed ? 'MAX' : `${getUpgradeCost(upgrade, level)} 🦆`;

    drawRect(ctx, panel.x + 16, rowY, panel.w - 32, 56, maxed ? '#334155' : canBuy ? '#7c3aed' : '#475569');
    drawText(ctx, `${upgrade.icon} ${upgrade.name}  Lv${level}/${upgrade.maxLevel}`, panel.x + 28, rowY + 18, {
      align: 'left', size: 15, color: '#f8fafc',
    });
    drawText(ctx, upgrade.desc, panel.x + 28, rowY + 38, { align: 'left', size: 11, color: '#94a3b8' });
    drawText(ctx, cost, panel.x + panel.w - 28, rowY + 28, {
      align: 'right', size: 14, color: maxed ? '#64748b' : '#facc15',
    });
    rowY += 64;
  });
}
