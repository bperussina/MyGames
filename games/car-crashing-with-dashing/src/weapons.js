/** Weapon tiers shared by kill shop (basic) and admin shop (basic + premium). */

export const MATERIALS = {
  wood: { label: 'Wood', color: 0x8b6914, costMult: 1 },
  metal: { label: 'Metal', color: 0x94a3b8, costMult: 3 },
  obsidian: { label: 'Obsidian', color: 0x1e1b4b, costMult: 8 },
  diamond: { label: 'Diamond', color: 0x67e8f9, costMult: 16, adminOnly: true },
  plasma: { label: 'Plasma', color: 0xa855f7, costMult: 24, adminOnly: true },
  inferno: { label: 'Inferno', color: 0xf97316, costMult: 40, adminOnly: true },
};

export const WEAPON_TYPES = {
  mini_gun: { label: 'Mini Gun', baseCost: 50, shredBonus: 1 },
  saw_blade: { label: 'Saw Blade', baseCost: 65, shredBonus: 1.15 },
  chainsaw: { label: 'Chainsaw', baseCost: 80, shredBonus: 1.3 },
};

const BASIC_MATS = ['wood', 'metal', 'obsidian'];
const PREMIUM_MATS = ['diamond', 'plasma', 'inferno'];

function buildWeapon(typeKey, matKey) {
  const type = WEAPON_TYPES[typeKey];
  const mat = MATERIALS[matKey];
  const id = `${typeKey}_${matKey}`;
  return {
    id,
    type: typeKey,
    material: matKey,
    name: `${mat.label} ${type.label}`,
    cost: Math.round(type.baseCost * mat.costMult),
    color: mat.color,
    shredBonus: type.shredBonus * (mat.costMult >= 16 ? 1.5 : mat.costMult >= 8 ? 1.25 : 1),
    adminOnly: Boolean(mat.adminOnly),
    tier: mat.adminOnly ? 'premium' : 'basic',
  };
}

const ALL_WEAPONS = [];
for (const typeKey of Object.keys(WEAPON_TYPES)) {
  for (const matKey of [...BASIC_MATS, ...PREMIUM_MATS]) {
    ALL_WEAPONS.push(buildWeapon(typeKey, matKey));
  }
}

export const WEAPON_CATALOG = ALL_WEAPONS;

export function getWeapon(id) {
  return WEAPON_CATALOG.find((w) => w.id === id) ?? null;
}

export function getBasicWeapons() {
  return WEAPON_CATALOG.filter((w) => w.tier === 'basic');
}

export function getAdminWeapons() {
  return WEAPON_CATALOG;
}
