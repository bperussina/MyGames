#!/usr/bin/env node
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { listPlayableGames } from './game-registry.mjs';
import { run } from './serve-game.mjs';
import { DOCS_PORT, createDocsServer, getDocsUrl } from './serve-docs.mjs';
import { openInBrowser } from './open-browser.mjs';

const TMUX = ['tmux', '-f', '/exec-daemon/tmux.portal.conf'];

function probe(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/`, (res) => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => { req.destroy(); resolve(false); });
  });
}

async function waitFor(port, attempts = 30) {
  for (let i = 0; i < attempts; i += 1) {
    if (await probe(port)) return true;
    await new Promise((r) => { setTimeout(r, 300); });
  }
  return false;
}

function tmux(...args) {
  return spawnSync(TMUX[0], [...TMUX.slice(1), ...args], { encoding: 'utf8' });
}

async function buildAllPlayable() {
  console.log('\n  Building all games for reload-friendly play...\n');
  for (const gameId of listPlayableGames()) {
    const code = await run('node', ['scripts/build.mjs', gameId, '--publish'], {
      env: { ...process.env, GH_PAGES: '1' },
    });
    if (code !== 0) process.exit(code);
  }
}

async function ensureDocsServer() {
  if (await probe(DOCS_PORT)) return;

  const session = 'docs-server';
  if (tmux('has-session', '-t', `=${session}`).status !== 0) {
    tmux('new-session', '-d', '-s', session, '-c', process.cwd(), '--', process.env.SHELL || 'bash', '-l');
  }
  tmux('send-keys', '-t', `${session}:0.0`, 'C-c', 'node scripts/serve-docs.mjs', 'C-m');

  if (!(await waitFor(DOCS_PORT))) {
    console.error(`Could not start docs server on port ${DOCS_PORT}.`);
    process.exit(1);
  }
}

export async function restoreGames() {
  await buildAllPlayable();
  await ensureDocsServer();
  return getDocsUrl('/');
}

if (process.argv[1]?.endsWith('restore-tabs.mjs')) {
  const hubUrl = await restoreGames();
  openInBrowser(hubUrl);

  console.log(`
════════════════════════════════════════════════════════
  READY — bookmark this, reload anytime
════════════════════════════════════════════════════════

  ${hubUrl}

  Baby's Revenge 2:
  ${getDocsUrl('/babys-revenge-2/play.html')}

  car crashing with dashing:
  ${getDocsUrl('/car-crashing-with-dashing/index.html')}

  ERR_CONNECTION_REFUSED means this one server stopped.
  Run: npm run restore

════════════════════════════════════════════════════════
`);
}
