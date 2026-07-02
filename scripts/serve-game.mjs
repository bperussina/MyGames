#!/usr/bin/env node
/**
 * Shared build + LAN preview server for family play.
 */
import { spawn } from 'node:child_process';
import { printFamilyPlayBanner } from './network.mjs';
import { requireGameConfig } from './game-registry.mjs';
import { startCloudflareTunnel } from './tunnel.mjs';

export function run(cmd, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true, ...options });
    child.on('exit', (code) => resolve(code ?? 0));
  });
}

export async function buildAndServe(game, { family = false } = {}) {
  const config = requireGameConfig(game);
  const { title, port, playPath } = config;

  console.log(family ? `\nBuilding ${title} for family play...` : `\nBuilding ${title}...`);
  const buildCode = await run('npm', ['run', 'build', '-w', `@mygames/${game}`]);
  if (buildCode !== 0) process.exit(buildCode);

  const previewArgs = [
    'run', 'preview', '-w', `@mygames/${game}`, '--',
    '--host', '0.0.0.0',
    '--port', String(port),
    '--strictPort',
  ];

  const preview = spawn('npm', previewArgs, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FAMILY_PLAY: family ? '1' : '0' },
  });

  let tunnelUrl = null;
  if (family) {
    await new Promise((r) => { setTimeout(r, 2500); });
    console.log('\nStarting public link for iPad/phone...');
    const tunnel = await startCloudflareTunnel(port);
    tunnelUrl = tunnel?.url ? `${tunnel.url}${playPath}` : null;
  } else {
    printFamilyPlayBanner(config, null);
  }

  if (family) {
    printFamilyPlayBanner(config, tunnelUrl);
  }

  return new Promise((resolve) => {
    preview.on('exit', (code) => resolve(code ?? 0));
  });
}
