#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { copyToClipboard, getLanAddresses } from './network.mjs';
import {
  PRIMARY_SHARE_LINK,
  GH_PAGES_PLAY,
  PAGES_SETTINGS,
  buildShareMessage,
  GAME_NAME,
} from './play-urls.mjs';

const shareText = buildShareMessage(PRIMARY_SHARE_LINK);
const filePath = join(process.cwd(), 'FAMILY-LINK.txt');

writeFileSync(
  filePath,
  `TEXT THIS TO YOUR FAMILY — Baby's Revenge 2
============================================

${shareText}

Tap the link in Messages. It should say "Baby's Revenge 2".

Also works on iPad, phone, and laptop.

---
Optional GitHub link (after Pages is turned on once):
${GH_PAGES_PLAY}
Turn on at: ${PAGES_SETTINGS}
Branch: gh-pages  Folder: / (root)
`,
  'utf8',
);

const copied = copyToClipboard(shareText);

console.log(`
════════════════════════════════════════════════════════
  TEXT THIS TO YOUR FAMILY — ${GAME_NAME}
════════════════════════════════════════════════════════

${PRIMARY_SHARE_LINK}

════════════════════════════════════════════════════════

Copy the link above ONLY (starts with https://).
It should show "Baby's Revenge 2" when they tap it.

Saved to: ${filePath}
${copied ? 'Copied to clipboard — paste into Messages now.' : 'Open FAMILY-LINK.txt and copy the link.'}

If the GitHub link (${GH_PAGES_PLAY}) says "not found",
turn on Pages once at:
${PAGES_SETTINGS}
`);

const lan = getLanAddresses();
if (lan[0]) {
  console.log(`Same-Wi-Fi link (optional): http://${lan[0]}:5176/play.html`);
  console.log('(Run npm run family first — keep terminal open)\n');
}
