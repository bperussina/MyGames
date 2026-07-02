#!/usr/bin/env node
/**
 * Turn on a game's public play link (one time, ~30 seconds).
 */
import { resolveGame } from './games.mjs';
import { requireGameConfig, PAGES_SETTINGS, printPlayableGamesHelp } from './game-registry.mjs';

const game = process.argv[2];
if (!game) printPlayableGamesHelp('turn-on-link');

resolveGame(game);
const config = requireGameConfig(game);

console.log(`
════════════════════════════════════════════════════════
  TURN ON YOUR ${config.title.toUpperCase()} LINK (one time only)
════════════════════════════════════════════════════════

After this, this link works on iPad, phone, and laptop:

  ${config.ghPagesPlay}

STEPS:
  1. Open: ${PAGES_SETTINGS}
  2. Under "Build and deployment" → Source: Deploy from a branch
  3. Branch: main    Folder: /docs
  4. Click Save
  5. Wait 2 minutes, then open the play link above.

Each game has its own folder under /docs (e.g. docs/${config.id}/).

════════════════════════════════════════════════════════
`);
