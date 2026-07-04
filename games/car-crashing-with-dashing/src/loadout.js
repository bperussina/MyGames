import { getWeapon } from './weapons.js';
import { getSkin } from './skins.js';

const STORAGE_PREFIX = 'ccwd-loadout-';

function defaultState() {
  return {
    coins: 0,
    ownedWeapons: [],
    ownedSkins: [],
    equippedWeapon: null,
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

  function load() {
    storageKey = `${STORAGE_PREFIX}${getPlayerId?.() ?? 'local'}`;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) state = { ...defaultState(), ...JSON.parse(raw) };
    } catch {
      state = defaultState();
    }
  }

  function reloadForPlayer() {
    load();
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

    state.ownedWeapons = state.ownedWeapons.filter((wid) => {
      const w = getWeapon(wid);
      return w?.type !== weapon.type;
    });

    if (state.equippedWeapon) {
      const equipped = getWeapon(state.equippedWeapon);
      if (equipped?.type === weapon.type) state.equippedWeapon = null;
    }

    if (!spendCoins(weapon.cost)) return { ok: false, reason: 'insufficient' };
    state.ownedWeapons.push(id);
    state.equippedWeapon = id;
    save();
    return { ok: true, weapon };
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
    if (id && !ownsWeapon(id)) return false;
    state.equippedWeapon = id;
    save();
    return true;
  }

  function equipSkin(id) {
    if (id && !ownsSkin(id)) return false;
    state.equippedSkin = id;
    save();
    return true;
  }

  function getEquippedWeapon() {
    return state.equippedWeapon ? getWeapon(state.equippedWeapon) : null;
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

  load();

  return {
    reloadForPlayer,
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
    getEquippedWeapon,
    getEquippedSkinId,
    getOwnedWeapons,
    getOwnedSkins,
    ownsWeaponType,
    getOwnedWeaponOfType,
  };
}
