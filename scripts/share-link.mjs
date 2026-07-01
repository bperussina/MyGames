#!/usr/bin/env node
/**
 * Print the public play link and one-time GitHub Pages setup steps.
 */
const ONLINE = 'https://bperussina.github.io/MyGames/play.html';
const SETTINGS = 'https://github.com/bperussina/MyGames/settings/pages';

console.log(`
════════════════════════════════════════════════════════
  YOUR FAMILY PLAY LINK — copy and text this:
════════════════════════════════════════════════════════

  ${ONLINE}

════════════════════════════════════════════════════════

If the link says "not found" (one-time fix):

  1. Open: ${SETTINGS}
  2. Source: Deploy from a branch
  3. Branch: gh-pages   Folder: / (root)
  4. Click Save, wait 2 minutes, try the link again.

The game files are already uploaded to GitHub.
`);
