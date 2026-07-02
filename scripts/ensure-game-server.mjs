#!/usr/bin/env node
import http from 'node:http';
import { spawn } from 'node:child_process';
import { requireGameConfig } from './game-registry.mjs';
import { run } from './serve-game.mjs';

function probe(port, path) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(port, path, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    if (await probe(port, path)) return true;
    await new Promise((r) => { setTimeout(r, 500); });
  }
  return false;
}

export async function ensureGameServer(gameId) {
  const config = requireGameConfig(gameId);
  const { port, playPath } = config;

  if (await probe(port, playPath)) return config;

  console.log(`\nStarting ${config.title} on port ${port}...`);
  const buildCode = await run('npm', ['run', 'build', '-w', `@mygames/${gameId}`]);
  if (buildCode !== 0) process.exit(buildCode);

  spawn(
    'npm',
    ['run', 'preview', '-w', `@mygames/${gameId}`, '--', '--host', '0.0.0.0', '--port', String(port), '--strictPort'],
    { detached: true, stdio: 'ignore', shell: true },
  ).unref();

  if (!(await waitForServer(port, playPath))) {
    console.error(`Could not start ${config.title} on port ${port}.`);
    process.exit(1);
  }

  return config;
}
