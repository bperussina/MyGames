import { getWeapon, WEAPON_TYPES } from './weapons.js';
import { getSkin } from './skins.js';

const STORAGE_PREFIX = 'ccwd-loadout-';
const WEAPON_SLOTS = Object.keys(WEAPON_TYPES);

function defaultEquippedWeapons() {
  return { mini_gun: null, saw_blade: null, chainsaw: null };
}

function defaultState() {
  return {
    coins: 0,
    ownedWeapons: [],
    ownedSkins: [],
    equippedWeapons: defaultEquippedWeapons(),
    equippedSkin: null,
  };
}

export function createLoadout(getPlayerId) {
  let state = defaultState();
  let storageKey = `${STORAGE_PREFIX}local`;

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* storage blocked */
    }
  }

  function normalizeEquippedWeapons() {
    const slots = defaultEquippedWeapons();
    const raw = state.equippedWeapons;
    if (raw && typeof raw === 'object') {
      for (const type of WEAPON_SLOTS) {
        const id = raw[type];
        if (id && ownsWeapon(id) && getWeapon(id)?.type === type) slots[type] = id;
      }
    } else if (state.equippedWeapon && ownsWeapon(state.equippedWeapon)) {
      const legacy = getWeapon(state.equippedWeapon);
      if (legacy) slots[legacy.type] = state.equippedWeapon;
    }
    state.equippedWeapons = slots;
    delete state.equippedWeapon;
  }

  function load() {
    storageKey = `${STORAGE_PREFIX}${getPlayerId?.() ?? 'local'}`;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) state = { ...defaultState(), ...JSON.parse(raw) };
    } catch {
      state = defaultState();
    }
    state.ownedWeapons = state.ownedWeapons.filter((id) => getWeapon(id));
    state.ownedSkins = state.ownedSkins.filter((id) => getSkin(id));
    normalizeEquippedWeapons();
    if (state.equippedSkin && !ownsSkin(state.equippedSkin)) {
      state.equippedSkin = null;
    }
  }

  function reloadForPlayer() {
    load();
  }

  function resetSession() {
    state = defaultState();
    save();
  }

  function resetForPlayer() {
    load();
    resetSession();
  }

  function getCoins() {
    return state.coins;
  }

  function addCoins(amount) {
    if (!amount || amount <= 0) return 0;
    state.coins += amount;
    save();
    return state.coins;
  }

  function canAfford(cost) {
    return state.coins >= cost;
  }

  function spendCoins(cost) {
    if (!canAfford(cost)) return false;
    state.coins -= cost;
    save();
    return true;
  }

  function ownsWeapon(id) {
    return state.ownedWeapons.includes(id);
  }

  function ownsSkin(id) {
    return state.ownedSkins.includes(id);
  }

  function buyWeapon(id) {
    const weapon = getWeapon(id);
    if (!weapon) return { ok: false, reason: 'invalid' };
    if (ownsWeapon(id)) {
      equipWeapon(id);
      return { ok: true, weapon, alreadyOwned: true };
    }

    const prevEquipped = state.equippedWeapons[weapon.type];
    state.ownedWeapons = state.ownedWeapons.filter((wid) => {
      const w = getWeapon(wid);
      return w?.type !== weapon.type;
    });

    if (!spendCoins(weapon.cost)) return { ok: false, reason: 'insufficient' };
    state.ownedWeapons.push(id);
    state.equippedWeapons[weapon.type] = id;
    save();
    return { ok: true, weapon, replacedId: prevEquipped };
  }

  function buySkin(id) {
    const skin = getSkin(id);
    if (!skin || ownsSkin(id)) return { ok: false, reason: 'already_owned' };
    if (!spendCoins(skin.cost)) return { ok: false, reason: 'insufficient' };
    state.ownedSkins.push(id);
    save();
    return { ok: true, skin };
  }

  function equipWeapon(id) {
    if (!id || !ownsWeapon(id)) return false;
    const weapon = getWeapon(id);
    if (!weapon) return false;
    state.equippedWeapons[weapon.type] = id;
    save();
    return true;
  }

  function equipSkin(id) {
    if (id && !ownsSkin(id)) return false;
    state.equippedSkin = id;
    save();
    return true;
  }

  function isWeaponEquipped(id) {
    const weapon = getWeapon(id);
    if (!weapon) return false;
    return state.equippedWeapons[weapon.type] === id;
  }

  function getEquippedWeaponIds() {
    return WEAPON_SLOTS
      .map((type) => state.equippedWeapons[type])
      .filter((id) => id && ownsWeapon(id));
  }

  function getEquippedWeapons() {
    return getEquippedWeaponIds().map((id) => getWeapon(id)).filter(Boolean);
  }

  function getEquippedWeaponForType(type) {
    const id = state.equippedWeapons?.[type];
    if (!id || !ownsWeapon(id)) return null;
    const weapon = getWeapon(id);
    return weapon?.type === type ? weapon : null;
  }

  /** @deprecated first equipped weapon */
  function getEquippedWeapon() {
    return getEquippedWeapons()[0] ?? null;
  }

  function getEquippedSkinId() {
    return state.equippedSkin;
  }

  function getOwnedWeapons() {
    return [...state.ownedWeapons];
  }

  function getOwnedSkins() {
    return [...state.ownedSkins];
  }

  function ownsWeaponType(type) {
    return state.ownedWeapons.some((wid) => getWeapon(wid)?.type === type);
  }

  function getOwnedWeaponOfType(type) {
    const wid = state.ownedWeapons.find((id) => getWeapon(id)?.type === type);
    return wid ? getWeapon(wid) : null;
  }

  /** Death — lose every weapon you owned and had equipped. */
  function destroyAllWeapons() {
    state.ownedWeapons = [];
    state.equippedWeapons = defaultEquippedWeapons();
    save();
  }

  load();

  return {
    reloadForPlayer,
    resetSession,
    resetForPlayer,
    getCoins,
    addCoins,
    canAfford,
    spendCoins,
    ownsWeapon,
    ownsSkin,
    buyWeapon,
    buySkin,
    equipWeapon,
    equipSkin,
    isWeaponEquipped,
    getEquippedWeaponIds,
    getEquippedWeapons,
    getEquippedWeaponForType,
    getEquippedWeapon,
    getEquippedSkinId,
    getOwnedWeapons,
    getOwnedSkins,
    ownsWeaponType,
    getOwnedWeaponOfType,
    destroyAllWeapons,
  };
}
