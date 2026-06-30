import { drawText, drawRect } from '@mygames/shared';

export const TOY_UPGRADES = [
  {
    id: 'capacity',
    name: 'Bigger Toy Box',
    desc: '+10 max toys',
    icon: '📦',
    baseCost: 2,
    maxLevel: 4,
    costPerLevel: 2,
  },
  {
    id: 'power',
    name: 'Super Toys',
    desc: 'Toys hit harder (1 less hit needed)',
    icon: '💥',
    baseCost: 3,
    maxLevel: 2,
    costPerLevel: 3,
  },
  {
    id: 'speed',
    name: 'Fast Throw',
    desc: 'Toys fly faster',
    icon: '⚡',
    baseCost: 2,
    maxLevel: 3,
    costPerLevel: 2,
  },
  {
    id: 'refill',
    name: 'Mega Refill',
    desc: 'Toy box refills more',
    icon: '🧸',
    baseCost: 2,
    maxLevel: 3,
    costPerLevel: 2,
  },
];

export function createShopState() {
  return {
    open: false,
    levels: {
      capacity: 0,
      power: 0,
      speed: 0,
      refill: 0,
    },
  };
}

export function getUpgradeCost(upgrade, currentLevel) {
  return upgrade.baseCost + currentLevel * upgrade.costPerLevel;
}

export function canBuyUpgrade(shop, upgradeId, liveDucks) {
  const upgrade = TOY_UPGRADES.find((u) => u.id === upgradeId);
  if (!upgrade) return false;
  const level = shop.levels[upgradeId] ?? 0;
  if (level >= upgrade.maxLevel) return false;
  return liveDucks >= getUpgradeCost(upgrade, level);
}

export function buyUpgrade(shop, inventory, upgradeId, state) {
  const upgrade = TOY_UPGRADES.find((u) => u.id === upgradeId);
  if (!upgrade || !canBuyUpgrade(shop, upgradeId, state.liveDucks)) return false;

  const level = shop.levels[upgradeId];
  const cost = getUpgradeCost(upgrade, level);
  state.liveDucks -= cost;
  shop.levels[upgradeId] = level + 1;
  applyUpgradeEffects(shop, inventory);
  return true;
}

export function applyUpgradeEffects(shop, inventory) {
  inventory.maxToys = 30 + shop.levels.capacity * 10;
  inventory.toyPower = 1 + shop.levels.power;
  inventory.throwSpeed = 1 + shop.levels.speed * 0.35;
  inventory.refillBonus = shop.levels.refill * 5;
}

export function getHitsToDefeat(inventory, shop) {
  return Math.max(1, 3 - (shop?.levels?.power ?? 0));
}

export function getShopButtonBounds(width, height) {
  return { x: 12, y: 120, w: 100, h: 36 };
}

export function isShopButtonClicked(x, y, width, height) {
  const b = getShopButtonBounds(width, height);
  return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
}

export function getShopPanelBounds(width, height) {
  const w = 340;
  const h = 320;
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
  TOY_UPGRADES.forEach((upgrade) => {
    const btn = { x: panel.x + 16, y: rowY, w: panel.w - 32, h: 52 };
    if (
      clickX >= btn.x && clickX <= btn.x + btn.w &&
      clickY >= btn.y && clickY <= btn.y + btn.h
    ) {
      buyUpgrade(state.shop, state.inventory, upgrade.id, state);
    }
    rowY += 60;
  });

  return state;
}

export function renderShopButton(ctx, width, height, liveDucks) {
  const b = getShopButtonBounds(width, height);
  drawRect(ctx, b.x, b.y, b.w, b.h, liveDucks > 0 ? '#7c3aed' : '#475569');
  drawText(ctx, '🛒 SHOP', b.x + b.w / 2, b.y + b.h / 2, { size: 16, color: '#fff' });
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
  drawText(ctx, `🦆 ${liveDucks} live ducks`, panel.x + panel.w / 2, panel.y + 48, { size: 16, color: '#94a3b8' });
  drawText(ctx, '✕', panel.x + panel.w - 22, panel.y + 24, { size: 20, color: '#ef4444' });

  let rowY = panel.y + 68;
  TOY_UPGRADES.forEach((upgrade) => {
    const level = shop.levels[upgrade.id] ?? 0;
    const maxed = level >= upgrade.maxLevel;
    const cost = maxed ? 'MAX' : `${getUpgradeCost(upgrade, level)} 🦆`;

    drawRect(ctx, panel.x + 16, rowY, panel.w - 32, 52, maxed ? '#334155' : '#475569');
    drawText(ctx, `${upgrade.icon} ${upgrade.name}  Lv${level}/${upgrade.maxLevel}`, panel.x + 28, rowY + 18, {
      align: 'left', size: 15, color: '#f8fafc',
    });
    drawText(ctx, upgrade.desc, panel.x + 28, rowY + 36, { align: 'left', size: 11, color: '#94a3b8' });
    drawText(ctx, cost, panel.x + panel.w - 28, rowY + 26, { align: 'right', size: 14, color: maxed ? '#64748b' : '#facc15' });
    rowY += 60;
  });
}
