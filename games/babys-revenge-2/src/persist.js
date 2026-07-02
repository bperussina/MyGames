import { GAME_VERSION } from './version.js';

const SAVE_KEY = 'br2_save';
const SESSION_KEY = 'br2_session';
const VERSION_KEY = 'br2_last_version';

function readSavePayload() {
  try {
    return localStorage.getItem(SAVE_KEY) || sessionStorage.getItem(SESSION_KEY);
  } catch {
    try {
      return sessionStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  }
}

function writeSavePayload(payload) {
  try {
    localStorage.setItem(SAVE_KEY, payload);
  } catch {
    /* storage blocked */
  }
  try {
    sessionStorage.setItem(SESSION_KEY, payload);
  } catch {
    /* quota or private mode */
  }
}

function clearSavePayload() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function markVersionPlayed() {
  try {
    localStorage.setItem(VERSION_KEY, GAME_VERSION);
  } catch {
    /* storage blocked */
  }
}

export function hasNewGameUpdate() {
  try {
    const last = localStorage.getItem(VERSION_KEY);
    return Boolean(last && last !== GAME_VERSION);
  } catch {
    return false;
  }
}

export function clearUpdateFlag() {
  markVersionPlayed();
}

export function saveSessionGame(game) {
  if (!game) return;
  writeSavePayload(JSON.stringify({
    version: GAME_VERSION,
    savedAt: Date.now(),
    game,
  }));
}

export function loadSessionGame() {
  try {
    const raw = readSavePayload();
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== GAME_VERSION) {
      clearSavePayload();
      return null;
    }
    return data.game ?? null;
  } catch {
    clearSavePayload();
    return null;
  }
}

export function clearSessionGame() {
  clearSavePayload();
}

export function hasSessionSave() {
  return loadSessionGame() !== null;
}
