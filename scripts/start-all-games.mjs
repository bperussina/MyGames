#!/usr/bin/env node
import { startCommandBackground } from './local-process.mjs';
import { probePort, waitForPort } from './probe.mjs';
import { logStep, logOk, logFail } from './logger.mjs';

export const HUB_PORT = 5188;

export async function ensureGameServer(gameId, { build = true } = {}) {
  const config = getGameConfig(gameId);
  if (!config) return null;

  if ((await probePort(config.port, config.playPath)).ok) {
    return { ...config, status: 'running' };
  }

  if (build) {
    logStep('build', config.title);
    const code = await run('npm', ['run', 'build', '-w', `@mygames/${gameId}`]);
    if (code !== 0) process.exit(code);
  }

  logStep('start', `${config.title} on port ${config.port}`);
  startCommandBackground(
    `play-${gameId}`,
    'node',
    ['scripts/play-one.mjs', gameId],
  );

  if (!(await waitForPort(config.port, config.playPath))) {
    logFail('game server failed', { game: gameId, port: config.port });
    return { ...config, status: 'failed' };
  }

  return { ...config, status: 'started' };
}

export async function ensureGamesHub() {
  if ((await probePort(HUB_PORT, '/')).ok) {
    return { port: HUB_PORT, status: 'running' };
  }

  logStep('start', `games hub on port ${HUB_PORT}`);
  startCommandBackground('games-hub', 'node', ['scripts/games-hub.mjs']);

  if (!(await waitForPort(HUB_PORT, '/'))) {
    return { port: HUB_PORT, status: 'failed' };
  }

  return { port: HUB_PORT, status: 'started' };
}

export async function startAllGames({ build = true } = {}) {
  logStep('start-all', 'local background processes');
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
  console.log('  ALL GAMES (local processes)');
  console.log('════════════════════════════════════════════════════════\n');
  for (const g of games) {
    const mark = g.status === 'failed' ? '✗' : '✓';
    console.log(`  ${mark} ${g.title} → http://localhost:${g.port}${g.playPath}`);
  }
  if (hub.status !== 'failed') {
    console.log(`\n  Hub → http://localhost:${HUB_PORT}/`);
    console.log('  Stop all: npm stop\n');
  }
  const failed = games.some((g) => g.status === 'failed') || hub.status === 'failed';
  process.exit(failed ? 1 : 0);
}
