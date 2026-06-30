import { drawText, drawRect } from '@mygames/shared';

export const SLOT_COUNT = 5;

export function createInventory() {
  return {
    slots: [
      { type: 'toybox', id: 'toybox', label: 'Toy Box' },
      null,
      null,
      null,
      null,
    ],
    selectedSlot: 0,
    toyStackSize: 20,
  };
}

export function getToyCount(inventory) {
  return inventory.slots.reduce((sum, slot) => {
    if (slot?.type === 'toys') return sum + slot.count;
    return sum;
  }, 0);
}

export function canThrowToy(inventory) {
  return inventory.slots.some((slot) => slot?.type === 'toys' && slot.count > 0);
}

export function useToy(inventory) {
  const preferred = inventory.slots[inventory.selectedSlot];
  if (preferred?.type === 'toys' && preferred.count > 0) {
    preferred.count -= 1;
    return true;
  }

  for (const slot of inventory.slots) {
    if (slot?.type === 'toys' && slot.count > 0) {
      slot.count -= 1;
      return true;
    }
  }
  return false;
}

export function addToySlot(inventory, count) {
  const emptyIndex = inventory.slots.findIndex((slot, i) => i > 0 && slot === null);
  if (emptyIndex === -1) return false;

  inventory.slots[emptyIndex] = {
    type: 'toys',
    id: `toys-${emptyIndex}`,
    count,
    maxCount: count,
    label: 'Toys',
  };
  return true;
}

export function refillFromToyBox(inventory) {
  const hasToyBox = inventory.slots.some((slot) => slot?.type === 'toybox');
  if (!hasToyBox) return false;

  let refilled = false;
  inventory.slots.forEach((slot) => {
    if (slot?.type === 'toys' && slot.count < slot.maxCount) {
      slot.count = slot.maxCount;
      refilled = true;
    }
  });
  return refilled;
}

export function getInventorySlotBounds(width, height) {
  const slotSize = 52;
  const gap = 6;
  const totalW = SLOT_COUNT * slotSize + (SLOT_COUNT - 1) * gap;
  const startX = width / 2 - totalW / 2;
  const y = height - slotSize - 16;

  const slots = [];
  for (let i = 0; i < SLOT_COUNT; i += 1) {
    slots.push({
      index: i,
      x: startX + i * (slotSize + gap),
      y,
      w: slotSize,
      h: slotSize,
    });
  }

  return { slots, slotSize, startX, y, totalW };
}

export function getClickedInventorySlot(clickX, clickY, width, height) {
  const { slots } = getInventorySlotBounds(width, height);
  for (const slot of slots) {
    if (
      clickX >= slot.x && clickX <= slot.x + slot.w &&
      clickY >= slot.y && clickY <= slot.y + slot.h
    ) {
      return slot.index;
    }
  }
  return null;
}

function drawSlotContents(ctx, slot, bounds, selected) {
  const { x, y, w, h } = bounds;
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (!slot) {
    drawRect(ctx, x, y, w, h, '#1e293b');
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    drawText(ctx, '—', cx, cy, { size: 18, color: '#475569' });
    return;
  }

  if (slot.type === 'toybox') {
    drawRect(ctx, x, y, w, h, selected ? '#fbbf24' : '#78350f');
    drawText(ctx, '📦', cx, cy - 6, { size: 20 });
    drawText(ctx, 'Box', cx, cy + 16, { size: 9, color: '#fde68a' });
    return;
  }

  if (slot.type === 'toys') {
    drawRect(ctx, x, y, w, h, selected ? '#38bdf8' : '#475569');
    drawText(ctx, '🧸', cx, cy - 8, { size: 18 });
    drawText(ctx, `${slot.count}`, cx, cy + 14, { size: 14, color: '#fff' });
  }
}

export function renderInventory(ctx, width, height, inventory, liveDucks) {
  const layout = getInventorySlotBounds(width, height);
  const panelPad = 12;

  ctx.fillStyle = 'rgba(15,23,42,0.75)';
  ctx.fillRect(
    layout.startX - panelPad,
    layout.y - 28,
    layout.totalW + panelPad * 2,
    layout.slotSize + 40,
  );

  drawText(ctx, 'INVENTORY', width / 2, layout.y - 12, { size: 14, color: '#94a3b8' });

  layout.slots.forEach((bounds) => {
    const slot = inventory.slots[bounds.index];
    drawSlotContents(ctx, slot, bounds, inventory.selectedSlot === bounds.index);
  });

  drawText(ctx, `🦆 ${liveDucks}`, layout.startX, layout.y - 26, {
    align: 'left', baseline: 'top', size: 14, color: '#facc15',
  });
}
