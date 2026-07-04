/** Owner-only car skins — paint overrides applied when spawning a car. */

export const SKIN_CATALOG = [
  { id: 'neon_lime', name: 'Neon Lime', color: 0x84cc16, accent: 0x14532d, cost: 350 },
  { id: 'hot_pink', name: 'Hot Pink', color: 0xec4899, accent: 0x831843, cost: 350 },
  { id: 'gold_rush', name: 'Gold Rush', color: 0xfacc15, accent: 0x854d0e, cost: 500 },
  { id: 'ice_blue', name: 'Ice Blue', color: 0x38bdf8, accent: 0x0c4a6e, cost: 400 },
  { id: 'lava_orange', name: 'Lava Orange', color: 0xea580c, accent: 0x431407, cost: 450 },
  { id: 'galaxy_purple', name: 'Galaxy Purple', color: 0x7c3aed, accent: 0x2e1065, cost: 550 },
  { id: 'stealth_black', name: 'Stealth Black', color: 0x1e293b, accent: 0x020617, cost: 600 },
  { id: 'candy_red', name: 'Candy Red', color: 0xef4444, accent: 0x7f1d1d, cost: 400 },
  { id: 'mint_cream', name: 'Mint Cream', color: 0x99f6e4, accent: 0x134e4a, cost: 350 },
  { id: 'sunset_gradient', name: 'Sunset Burst', color: 0xf97316, accent: 0xdb2777, cost: 750 },
];

export function getSkin(id) {
  return SKIN_CATALOG.find((s) => s.id === id) ?? null;
}

export function applySkinToSpec(spec, skinId) {
  const skin = getSkin(skinId);
  if (!skin) return spec;
  return { ...spec, color: skin.color, skinId: skin.id, skinAccent: skin.accent };
}
