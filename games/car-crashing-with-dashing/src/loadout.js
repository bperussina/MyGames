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
    if (!weapon || ownsWeapon(id)) return { ok: false, reason: 'already_owned' };
    if (!spendCoins(weapon.cost)) return { ok: false, reason: 'insufficient' };
    state.ownedWeapons.push(id);
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
  };
}
