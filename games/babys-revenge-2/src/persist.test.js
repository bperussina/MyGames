import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  saveSessionGame,
  loadSessionGame,
  clearSessionGame,
  hasSessionSave,
} from './persist.js';
import { GAME_VERSION } from './version.js';

function createStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => { data.set(key, String(value)); },
    removeItem: (key) => { data.delete(key); },
    clear: () => { data.clear(); },
  };
}

describe('persist', () => {
  let localStorage;
  let sessionStorage;

  beforeEach(() => {
    localStorage = createStorage();
    sessionStorage = createStorage();
    globalThis.localStorage = localStorage;
    globalThis.sessionStorage = sessionStorage;
    clearSessionGame();
  });

  afterEach(() => {
    delete globalThis.localStorage;
    delete globalThis.sessionStorage;
  });

  it('saves and loads game state from localStorage', () => {
    const game = { night: 3, phase: 'DAY', health: 80 };
    saveSessionGame(game);

    expect(hasSessionSave()).toBe(true);
    expect(loadSessionGame()).toEqual(game);
  });

  it('migrates legacy sessionStorage saves into localStorage', () => {
    sessionStorage.setItem('br2_session', JSON.stringify({
      version: GAME_VERSION,
      savedAt: Date.now(),
      game: { night: 2 },
    }));

    expect(loadSessionGame()).toEqual({ night: 2 });
  });

  it('clears saves from a different game version', () => {
    localStorage.setItem('br2_save', JSON.stringify({
      version: '0.0.1',
      savedAt: Date.now(),
      game: { night: 1 },
    }));

    expect(loadSessionGame()).toBeNull();
    expect(hasSessionSave()).toBe(false);
  });
});
