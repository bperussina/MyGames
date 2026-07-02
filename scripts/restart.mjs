#!/usr/bin/env node
/**
 * Restart local game server (stop → start).
 *   npm restart          — fast restart, skip rebuild
 *   npm run restart:build — rebuild games then restart
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { stopDocsServer, startDocsServer } from './local-process.mjs';
import { getDocsUrl } from './serve-docs.mjs';
import { probeUrl } from './probe.mjs';
import { resetLog, logStep, logOk, logFail, LOG_FILE } from './logger.mjs';
import { openInBrowser } from './open-browser.mjs';
import { listPlayableGames } from './game-registry.mjs';
import { run } from './serve-game.mjs';

const rebuild = process.argv.includes('--build');

async function buildAll() {
  for (const gameId of listPlayableGames()) {
    logStep('build', gameId);
    const code = await run('node', ['scripts/build.mjs', gameId, '--publish'], {
      env: { ...process.env, GH_PAGES: '1' },
    });
    if (code !== 0) process.exit(code);
  }
}

async function main() {
  resetLog();
  logStep('restart', rebuild ? 'rebuild + restart' : 'fast restart');

  if (rebuild || !existsSync(join(process.cwd(), 'docs', 'babys-revenge-2', 'index.html'))) {
    await buildAll();
  }

  await stopDocsServer();
  const started = await startDocsServer();
  if (!started) {
    logFail('restart failed');
    console.error(`\n  Restart failed. See ${LOG_FILE}\n`);
    process.exit(1);
  }

  const urls = {
    hub: getDocsUrl('/'),
    br2: getDocsUrl('/babys-revenge-2/play.html'),
    car: getDocsUrl('/car-crashing-with-dashing/index.html'),
  };

  const checks = await Promise.all([
    probeUrl(urls.hub, 'hub'),
    probeUrl(urls.br2, 'br2'),
    probeUrl(urls.car, 'car'),
  ]);

  if (!checks.every((c) => c.ok)) {
    logFail('restart verification failed', checks);
    process.exit(1);
  }

  logOk('restart complete', { pid: started.pid });
  openInBrowser(urls.hub);

  console.log(`
════════════════════════════════════════════════════════
  RESTARTED — local server is back up
════════════════════════════════════════════════════════

  Hub:  ${urls.hub}
  BR2:  ${urls.br2}
  Car:  ${urls.car}

  PID:  ${started.pid}
  Log:  ${LOG_FILE}

════════════════════════════════════════════════════════
`);
}

main().catch((err) => {
  logFail('restart crash', { error: err.message });
  console.error(err);
  process.exit(1);
});
