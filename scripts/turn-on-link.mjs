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

STEPS (pick one):

  A) GitHub Actions (recommended):
     1. Open: ${PAGES_SETTINGS}
     2. Build and deployment → Source: **GitHub Actions**
     3. Wait for "Deploy all games to GitHub Pages" to finish

  B) Branch deploy:
     1. Open: ${PAGES_SETTINGS}
     2. Source: Deploy from a branch
     3. Branch: **gh-pages**   Folder: **/ (root)**
        (or Branch: **main**   Folder: **/docs**)
     4. Click Save — wait ~2 minutes

  Or run: npm run deploy-pages

Then open: ${config.ghPagesPlay}

════════════════════════════════════════════════════════
`);
