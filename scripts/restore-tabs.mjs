#!/usr/bin/env node
/**
 * Start every game server + open the games hub so you get working tabs back.
 * Does NOT close or kill existing servers or browser tabs.
 */
import { startAllGames, HUB_PORT } from './start-all-games.mjs';
import { openInBrowser } from './open-browser.mjs';
import { getGameConfig } from './game-registry.mjs';

await startAllGames();

const hubUrl = `http://localhost:${HUB_PORT}/`;
const br2 = getGameConfig('babys-revenge-2');
const car = getGameConfig('car-crashing-with-dashing');

openInBrowser(hubUrl);

console.log(`
════════════════════════════════════════════════════════
  TABS RESTORED — these links should all work now
════════════════════════════════════════════════════════

  Games hub (bookmark this):
  ${hubUrl}

  Baby's Revenge 2:
  http://localhost:${br2?.port}${br2?.playPath}

  car crashing with dashing:
  http://localhost:${car?.port}/index.html

  These games run on YOUR computer — no internet server needed.
  Keep this project running (npm run restore) while you play.

════════════════════════════════════════════════════════
`);
