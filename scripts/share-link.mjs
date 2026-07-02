#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { copyToClipboard } from './network.mjs';
import { resolveGame } from './games.mjs';
import { requireGameConfig, buildShareMessage, PAGES_SETTINGS, printPlayableGamesHelp } from './game-registry.mjs';

const game = process.argv[2];
if (!game) printPlayableGamesHelp('share-link');

resolveGame(game);
const config = requireGameConfig(game);

const filePath = join(process.cwd(), config.familyLinkFile);
const msg = `${buildShareMessage(config)}

If "not found" on iPad, run once on your computer:
npm run turn-on-link -- ${config.id}

Then open: ${PAGES_SETTINGS}
Branch: main   Folder: /docs   → Save`;

writeFileSync(filePath, `${msg}\n`);
copyToClipboard(msg);

console.log(`
════════════════════════════════════════════════════════
  ${config.title.toUpperCase()} — YOUR LINK
════════════════════════════════════════════════════════

${config.ghPagesPlay}

If iPad says "not found", turn the link on once:

  npm run turn-on-link -- ${config.id}

Or open: ${PAGES_SETTINGS}
  Branch: main   Folder: /docs   → Save

For iPad RIGHT NOW (while computer is on):
  npm run family -- ${config.id}
  (text the trycloudflare.com link it prints)

════════════════════════════════════════════════════════
`);
