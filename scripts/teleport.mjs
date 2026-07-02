#!/usr/bin/env node
/**
 * Teleport into a game in a new browser tab (Baby's Revenge 2 stays separate).
 */
import { ensureGameServer } from './ensure-game-server.mjs';
import { openInBrowser } from './open-browser.mjs';
import { requireGameConfig } from './game-registry.mjs';

const game = process.argv[2] ?? 'car-crashing-with-dashing';
const config = requireGameConfig(game);

console.log(`\n  Teleporting to ${config.title}...`);
const ready = await ensureGameServer(game);
const url = `http://localhost:${ready.port}${ready.playPath}?teleport=1`;

openInBrowser(url);

console.log(`
════════════════════════════════════════════════════════
  TELEPORT → ${config.title}
════════════════════════════════════════════════════════

  New tab: ${url}

  Baby's Revenge 2 is untouched (port 5176).
  This game runs on its own port (${ready.port}).

════════════════════════════════════════════════════════
`);
