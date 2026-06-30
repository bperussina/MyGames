import { drawText, drawRect } from '@mygames/shared';

export const SLOT_COUNT = 5;

export function createInventory() {
  return {
    slots: [
      {
        type: 'toybox',
        id: 'toybox',
        label: 'Toy Box',
        toys: 40,
        maxToys: 40,
        powerLevel: 0,
      },
      null,
      null,
      null,
      null,
    ],
    selectedSlot: 0,
  };
}

export function getToyBox(inventory) {
  return inventory.slots.find((slot) => slot?.type === 'toybox') ?? null;
}

export function isToyBoxSelected(inventory) {
  const slot = inventory.slots[inventory.selectedSlot];
  return slot?.type === 'toybox';
}

export function selectToyBox(inventory) {
  const index = inventory.slots.findIndex((slot) => slot?.type === 'toybox');
  if (index >= 0) inventory.selectedSlot = index;
}

export function canThrowToy(inventory) {
  const box = getToyBox(inventory);
  return isToyBoxSelected(inventory) && box && box.toys > 0;
}

export function useToy(inventory) {
  const box = getToyBox(inventory);
  if (!box || box.toys <= 0) return false;
  box.toys -= 1;
  return true;
}

export function applyToyBoxUpgrade(inventory, toysLevel) {
  const box = getToyBox(inventory);
  if (!box) return;
  box.powerLevel = toysLevel;
  box.maxToys = 40 + toysLevel * 15;
  box.toys = box.maxToys;
}

export function refillFromToyBox(inventory) {
  const box = getToyBox(inventory);
  if (!box || box.toys >= box.maxToys) return false;
  box.toys = box.maxToys;
  return true;
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
    drawText(ctx, '📦', cx, cy - 10, { size: 20 });
    drawText(ctx, `${slot.toys}`, cx, cy + 10, { size: 12, color: '#fff' });
    if (selected) {
      drawText(ctx, 'READY', cx, cy + 22, { size: 8, color: '#fef08a' });
    } else {
      drawText(ctx, 'Box', cx, cy + 22, { size: 8, color: '#fde68a' });
    }
    if (slot.powerLevel > 0) {
      drawText(ctx, `💥${slot.powerLevel}`, x + w - 4, y + 6, {
        align: 'right', baseline: 'top', size: 9, color: '#fca5a5',
      });
    }
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

  if (isToyBoxSelected(inventory)) {
    drawText(ctx, 'Click a big kid to throw!', width / 2, layout.y + layout.slotSize + 28, {
      size: 11, color: '#fbbf24',
    });
  }

  drawText(ctx, `🦆 ${liveDucks}`, layout.startX, layout.y - 26, {
    align: 'left', baseline: 'top', size: 14, color: '#facc15',
  });
}
