#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { listGames, resolveGame } from './games.mjs';
import { getGameConfig } from './game-registry.mjs';

const args = process.argv.slice(2);
const buildAll = args.includes('--all');
const publish = args.includes('--publish');
const game = buildAll ? null : resolveGame(args.find((a) => !a.startsWith('--')));

const games = buildAll ? listGames() : [game];

if (games.length === 0) {
  console.error('No games found in games/. Run: npm run new-game <name>');
  process.exit(1);
}

function publishToDocs(name) {
  const src = join(process.cwd(), 'games', name, 'dist');
  const dest = join(process.cwd(), 'docs', name);
  if (!existsSync(src)) {
    console.warn(`  Skipping publish for ${name}: no dist/ folder`);
    return;
  }
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`  Published to docs/${name}/ (GitHub Pages: /${name}/play.html)`);
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
    continue;
  }

  if (publish && getGameConfig(name)) {
    publishToDocs(name);
  }
}

process.exit(failed ? 1 : 0);
