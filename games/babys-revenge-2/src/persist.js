import { GAME_VERSION } from './version.js';

const SESSION_KEY = 'br2_session';
const VERSION_KEY = 'br2_last_version';

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
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      version: GAME_VERSION,
      savedAt: Date.now(),
      game,
    }));
  } catch {
    /* quota or private mode */
  }
}

export function loadSessionGame() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== GAME_VERSION) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return data.game ?? null;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSessionGame() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function hasSessionSave() {
  return loadSessionGame() !== null;
}
