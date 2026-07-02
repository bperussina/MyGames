#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { existsSync, chmodSync } from 'node:fs';

export function findCloudflared() {
  if (process.env.CLOUDFLARED_PATH && existsSync(process.env.CLOUDFLARED_PATH)) {
    return process.env.CLOUDFLARED_PATH;
  }
  for (const bin of ['cloudflared', '/tmp/cloudflared']) {
    if (existsSync(bin)) return bin;
  }
  return null;
}

export async function ensureCloudflared() {
  const existing = findCloudflared();
  if (existing) return existing;

  const dest = '/tmp/cloudflared';
  console.log('  Downloading cloudflared for public play link...');
  const code = await new Promise((resolve) => {
    const proc = spawn(
      'curl',
      ['-fsSL', 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64', '-o', dest],
      { stdio: 'inherit' },
    );
    proc.on('exit', (c) => resolve(c ?? 1));
  });

  if (code !== 0 || !existsSync(dest)) return null;
  chmodSync(dest, 0o755);
  return dest;
}

export function startCloudflareTunnel(port) {
  return ensureCloudflared().then((bin) => {
    if (!bin) return null;

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
      }, 60000);
    });
  });
}
