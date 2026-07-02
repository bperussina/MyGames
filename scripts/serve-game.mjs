#!/usr/bin/env node
/**
 * Shared build + LAN preview server for family play.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { printFamilyPlayBanner } from './network.mjs';
import { requireGameConfig } from './game-registry.mjs';

export function run(cmd, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true, ...options });
    child.on('exit', (code) => resolve(code ?? 0));
  });
}

function findCloudflared() {
  if (process.env.CLOUDFLARED_PATH && existsSync(process.env.CLOUDFLARED_PATH)) {
    return process.env.CLOUDFLARED_PATH;
  }
  for (const bin of ['cloudflared', '/tmp/cloudflared']) {
    if (existsSync(bin)) return bin;
  }
  return null;
}

export function startCloudflareTunnel(port) {
  const bin = findCloudflared();
  if (!bin) return Promise.resolve(null);

  return new Promise((resolve) => {
    const proc = spawn(bin, ['tunnel', '--url', `http://127.0.0.1:${port}`], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let url = null;
    const onData = (chunk) => {
      const match = chunk.toString().match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
      if (match && !url) {
        url = match[0];
        resolve({ url, proc });
      }
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('exit', () => {
      if (!url) resolve(null);
    });

    setTimeout(() => {
      if (!url) {
        proc.kill();
        resolve(null);
      }
    }, 45000);
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
