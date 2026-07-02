#!/usr/bin/env node
/**
 * Turn on the Baby's Revenge 2 play link (one time, ~30 seconds).
 */
import { GH_PAGES_PLAY, PAGES_SETTINGS } from './play-urls.mjs';

console.log(`
════════════════════════════════════════════════════════
  TURN ON YOUR BABY'S REVENGE 2 LINK (one time only)
════════════════════════════════════════════════════════

After this, this link works on iPad, phone, and laptop:

  ${GH_PAGES_PLAY}

STEPS:
  1. Open: ${PAGES_SETTINGS}
  2. Under "Build and deployment" → Source: Deploy from a branch
  3. Branch: main    Folder: /docs
  4. Click Save
  5. Wait 2 minutes, then open the play link above.

The game is already uploaded. You are just turning the link on.

════════════════════════════════════════════════════════
`);
