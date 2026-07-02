#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { resolveGame } from './games.mjs';
import { listPlayableGames, getGameConfig } from './game-registry.mjs';

const game = resolveGame(process.argv[2]);

console.log('\n  Dev mode — for testing on THIS computer only.');
console.log('  Do not text dev links to family (they may show main.js errors).');
console.log('  For family play, pick a game:\n');
for (const id of listPlayableGames()) {
  const cfg = getGameConfig(id);
  console.log(`    npm run family -- ${id}   (port ${cfg.port})`);
}
console.log('');

const child = spawn('npm', ['run', 'dev', '-w', `@mygames/${game}`], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
