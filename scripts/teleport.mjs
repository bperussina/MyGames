#!/usr/bin/env node
/**
 * Teleport into a game in a new browser tab (Baby's Revenge 2 stays separate).
 */
import { startAllGames } from './start-all-games.mjs';
import { openInBrowser } from './open-browser.mjs';
import { requireGameConfig } from './game-registry.mjs';

const game = process.argv[2] ?? 'car-crashing-with-dashing';
const config = requireGameConfig(game);

console.log(`\n  Making sure all games are running...`);
await startAllGames({ build: false });

const playUrl = game === 'car-crashing-with-dashing'
  ? `http://localhost:${config.port}/index.html?teleport=1`
  : `http://localhost:${config.port}${config.playPath}`;

openInBrowser(playUrl);

console.log(`
════════════════════════════════════════════════════════
  TELEPORT → ${config.title}
════════════════════════════════════════════════════════

  New tab: ${playUrl}

  Games hub (get all tabs back): http://localhost:5188/

════════════════════════════════════════════════════════
`);
