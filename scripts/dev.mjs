#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { resolveGame } from './games.mjs';

const game = resolveGame(process.argv[2]);

const child = spawn('npm', ['run', 'dev', '-w', `@mygames/${game}`], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
