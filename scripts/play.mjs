#!/usr/bin/env node
/**
 * Play games locally.
 *   npm start          → launch everything (recommended)
 *   npm run play:br2   → Baby's Revenge 2 only (port 5176)
 *   npm run play:car   → car game only (port 5177)
 */
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const game = args[0];

if (game) {
  await import('./play-one.mjs');
} else {
  await import('./launch.mjs');
}
