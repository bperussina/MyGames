#!/usr/bin/env node
/**
 * Shared build + LAN preview server for family play.
 */
import { spawn } from 'node:child_process';
import { printFamilyPlayBanner } from './network.mjs';

const DEFAULT_PORT = 5176;
const GAME_TITLES = {
  'babys-revenge-2': "Baby's Revenge 2",
};

export function run(cmd, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true, ...options });
    child.on('exit', (code) => resolve(code ?? 0));
  });
}

export async function buildAndServe(game, { family = false, port = DEFAULT_PORT } = {}) {
  const title = GAME_TITLES[game] ?? game;

  if (family) {
    console.log(`\nBuilding ${title} for family play...`);
  } else {
    console.log(`\nBuilding ${title}...`);
  }
  const buildCode = await run('npm', ['run', 'build', '-w', `@mygames/${game}`]);
  if (buildCode !== 0) process.exit(buildCode);

  printFamilyPlayBanner(port, title);

  const previewArgs = [
    'run', 'preview', '-w', `@mygames/${game}`, '--',
    '--host', '0.0.0.0',
    '--port', String(port),
    '--strictPort',
  ];

  return new Promise((resolve) => {
    const preview = spawn('npm', previewArgs, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FAMILY_PLAY: family ? '1' : '0' },
    });
    preview.on('exit', (code) => resolve(code ?? 0));
  });
}
