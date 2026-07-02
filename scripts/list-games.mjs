#!/usr/bin/env node
import { listGames } from './games.mjs';
import { getGameConfig } from './game-registry.mjs';

const games = listGames();

if (games.length === 0) {
  console.log('No games yet. Create one with: npm run new-game <name>');
  process.exit(0);
}

console.log('Games in this repo:\n');
for (const game of games) {
  const cfg = getGameConfig(game);
  if (cfg) {
    console.log(`  ${game}  (port ${cfg.port})`);
  } else {
    console.log(`  ${game}`);
  }
}

console.log('\nRun a game:  npm run dev -- <game-name>');
console.log('Play a game: npm run play -- <game-name>');
console.log('Build a game: npm run build -- <game-name>');
