#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { copyToClipboard } from './network.mjs';
import { PRIMARY_SHARE_LINK, PAGES_SETTINGS } from './play-urls.mjs';

const filePath = join(process.cwd(), 'FAMILY-LINK.txt');
const msg = `Play Baby's Revenge 2:
${PRIMARY_SHARE_LINK}

If "not found" on iPad, run once on your computer:
npm run turn-on-link

Then open: ${PAGES_SETTINGS}
Branch: main   Folder: /docs   → Save`;

writeFileSync(filePath, `${msg}\n`);
copyToClipboard(msg);

console.log(`
════════════════════════════════════════════════════════
  BABY'S REVENGE 2 — YOUR LINK
════════════════════════════════════════════════════════

${PRIMARY_SHARE_LINK}

If iPad says "not found", turn the link on once:

  npm run turn-on-link

Or open: ${PAGES_SETTINGS}
  Branch: main   Folder: /docs   → Save

For iPad RIGHT NOW (while computer is on):
  npm run family -- babys-revenge-2
  (text the trycloudflare.com link it prints)

════════════════════════════════════════════════════════
`);
