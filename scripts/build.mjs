#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { listGames, resolveGame } from './games.mjs';

const args = process.argv.slice(2);
const buildAll = args.includes('--all');
const game = buildAll ? null : resolveGame(args[0]);

const games = buildAll ? listGames() : [game];

if (games.length === 0) {
  console.error('No games found in games/. Run: npm run new-game <name>');
  process.exit(1);
}

let failed = false;

for (const name of games) {
  console.log(`\nBuilding @mygames/${name}...`);
  const result = await new Promise((resolve) => {
    const child = spawn('npm', ['run', 'build', '-w', `@mygames/${name}`], {
      stdio: 'inherit',
      shell: true,
    });
    child.on('exit', (code) => resolve(code ?? 0));
  });

  if (result !== 0) {
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
