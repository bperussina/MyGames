import { drawText, drawRect } from '@mygames/shared';

export function createInventory() {
  return {
    hasToyBox: true,
    toys: 20,
    maxToys: 30,
    selected: 'toybox',
  };
}

export function canThrowToy(inventory) {
  return inventory.toys > 0;
}

export function useToy(inventory) {
  if (inventory.toys <= 0) return false;
  inventory.toys -= 1;
  return true;
}

export function refillFromToyBox(inventory) {
  if (!inventory.hasToyBox) return false;
  inventory.toys = inventory.maxToys;
  return true;
}

export function getInventorySlotBounds(width, height) {
  const slotSize = 56;
  const gap = 8;
  const totalW = slotSize * 2 + gap;
  const startX = width / 2 - totalW / 2;
  const y = height - slotSize - 16;
  return {
    toyBox: { x: startX, y, w: slotSize, h: slotSize },
    toys: { x: startX + slotSize + gap, y, w: slotSize, h: slotSize },
    slotSize,
  };
}

export function getClickedInventorySlot(clickX, clickY, width, height) {
  const slots = getInventorySlotBounds(width, height);
  if (
    clickX >= slots.toyBox.x && clickX <= slots.toyBox.x + slots.toyBox.w &&
    clickY >= slots.toyBox.y && clickY <= slots.toyBox.y + slots.toyBox.h
  ) {
    return 'toybox';
  }
  return null;
}

export function renderInventory(ctx, width, height, inventory, liveDucks) {
  const slots = getInventorySlotBounds(width, height);

  ctx.fillStyle = 'rgba(15,23,42,0.75)';
  ctx.fillRect(slots.toyBox.x - 12, slots.toyBox.y - 28, slots.toys.x + slots.toys.w - slots.toyBox.x + 24, slots.toyBox.h + 40);

  drawText(ctx, 'INVENTORY', width / 2, slots.toyBox.y - 12, { size: 14, color: '#94a3b8' });

  const tb = slots.toyBox;
  drawRect(ctx, tb.x, tb.y, tb.w, tb.h, inventory.selected === 'toybox' ? '#fbbf24' : '#78350f');
  drawText(ctx, '📦', tb.x + tb.w / 2, tb.y + tb.h / 2 - 6, { size: 22 });
  drawText(ctx, 'Toy Box', tb.x + tb.w / 2, tb.y + tb.h + 14, { size: 11, color: '#fde68a' });

  const ts = slots.toys;
  drawRect(ctx, ts.x, ts.y, ts.w, ts.h, '#475569');
  drawText(ctx, '🧸', ts.x + ts.w / 2, ts.y + ts.h / 2 - 8, { size: 20 });
  drawText(ctx, `${inventory.toys}`, ts.x + ts.w / 2, ts.y + ts.h / 2 + 14, { size: 16, color: '#fff' });
  drawText(ctx, 'Toys', ts.x + ts.w / 2, ts.y + ts.h + 14, { size: 11, color: '#cbd5e1' });

  ctx.fillStyle = 'rgba(15,23,42,0.75)';
  ctx.fillRect(12, 80, 150, 36);
  drawText(ctx, `🦆 Live Ducks: ${liveDucks}`, 20, 88, { align: 'left', baseline: 'top', size: 18, color: '#facc15' });
  drawText(ctx, 'Click kids to throw!', 20, 108, { align: 'left', size: 12, color: '#94a3b8' });
}
