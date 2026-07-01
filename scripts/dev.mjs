#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { resolveGame } from './games.mjs';

const game = resolveGame(process.argv[2]);

console.log('\n  Dev mode — for testing on THIS computer only.');
console.log('  Do not text dev links to family (they may show main.js errors).');
console.log('  For family play use: npm run family -- babys-revenge-2\n');

const child = spawn('npm', ['run', 'dev', '-w', `@mygames/${game}`], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
