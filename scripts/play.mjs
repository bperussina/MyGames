#!/usr/bin/env node
/**
 * Build + serve the production game — stable, no hot-reload disconnects.
 */
import { spawn } from 'node:child_process';
import { resolveGame } from './games.mjs';

const game = resolveGame(process.argv[2] ?? 'babys-revenge-2');

function run(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => resolve(code ?? 0));
  });
}

console.log(`\nBuilding @mygames/${game}...`);
const buildCode = await run('npm', ['run', 'build', '-w', `@mygames/${game}`]);
if (buildCode !== 0) process.exit(buildCode);

console.log(`\nServing stable build — open http://localhost:5176\n`);
const preview = spawn('npm', ['run', 'preview', '-w', `@mygames/${game}`], {
  stdio: 'inherit',
  shell: true,
});
preview.on('exit', (code) => process.exit(code ?? 0));
