#!/usr/bin/env node
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { listPlayableGames, getGameConfig } from './game-registry.mjs';
import { run } from './serve-game.mjs';

const TMUX = ['tmux', '-f', '/exec-daemon/tmux.portal.conf'];
export const HUB_PORT = 5188;

function probe(port, path = '/') {
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

async function waitForServer(port, path, attempts = 50) {
  for (let i = 0; i < attempts; i += 1) {
    if (await probe(port, path)) return true;
    await new Promise((r) => { setTimeout(r, 500); });
  }
  return false;
}

function tmux(...args) {
  return spawnSync(TMUX[0], [...TMUX.slice(1), ...args], { encoding: 'utf8' });
}

function hasTmuxSession(name) {
  return tmux('has-session', '-t', `=${name}`).status === 0;
}

function startTmuxSession(name, command) {
  if (!hasTmuxSession(name)) {
    tmux('new-session', '-d', '-s', name, '-c', process.cwd(), '--', process.env.SHELL || 'bash', '-l');
  }
  tmux('send-keys', '-t', `${name}:0.0`, 'C-c', command, 'C-m');
}

export async function ensureGameServer(gameId, { build = true } = {}) {
  const config = getGameConfig(gameId);
  if (!config) return null;

  if (await probe(config.port, config.playPath)) {
    return { ...config, status: 'running' };
  }

  if (build) {
    console.log(`  Building ${config.title}...`);
    const code = await run('npm', ['run', 'build', '-w', `@mygames/${gameId}`]);
    if (code !== 0) process.exit(code);
  }

  const session = `play-${gameId}`;
  console.log(`  Starting ${config.title} on port ${config.port}...`);
  startTmuxSession(session, `npm run play -- ${gameId}`);

  if (!(await waitForServer(config.port, config.playPath))) {
    console.error(`  Could not start ${config.title} on port ${config.port}.`);
    return { ...config, status: 'failed' };
  }

  return { ...config, status: 'started' };
}

export async function ensureGamesHub() {
  if (await probe(HUB_PORT, '/')) {
    return { port: HUB_PORT, status: 'running' };
  }

  const session = 'games-hub';
  console.log(`  Starting games hub on port ${HUB_PORT}...`);
  startTmuxSession(session, 'npm run games');

  if (!(await waitForServer(HUB_PORT, '/'))) {
    return { port: HUB_PORT, status: 'failed' };
  }

  return { port: HUB_PORT, status: 'started' };
}

export async function startAllGames({ build = true } = {}) {
  console.log('\n  Checking games (will not stop anything already running)...\n');

  const results = [];
  for (const gameId of listPlayableGames()) {
    results.push(await ensureGameServer(gameId, { build }));
  }

  const hub = await ensureGamesHub();

  return { games: results.filter(Boolean), hub };
}

if (process.argv[1]?.endsWith('start-all-games.mjs')) {
  const { games, hub } = await startAllGames();
  console.log('\n════════════════════════════════════════════════════════');
  console.log('  ALL GAMES READY — open these in separate tabs');
  console.log('════════════════════════════════════════════════════════\n');
  console.log(`  Games hub:  http://localhost:${HUB_PORT}/\n`);
  for (const g of games) {
    const mark = g.status === 'failed' ? '✗' : '✓';
    console.log(`  ${mark} ${g.title}`);
    console.log(`     http://localhost:${g.port}${g.playPath}\n`);
  }
  if (hub.status !== 'failed') {
    console.log('  Tip: bookmark the games hub to get your tabs back anytime.');
    console.log('        Run: npm run restore\n');
  }
  const failed = games.some((g) => g.status === 'failed') || hub.status === 'failed';
  process.exit(failed ? 1 : 0);
}
