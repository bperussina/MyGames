#!/usr/bin/env node
/**
 * ONE command to launch all games locally.
 *   npm start
 *   npm run launch
 *
 * Logs everything to launch.log
 */
import { execSync, spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listPlayableGames, getGameConfig } from './game-registry.mjs';
import { run } from './serve-game.mjs';
import { DOCS_PORT, getDocsUrl } from './serve-docs.mjs';
import { waitForPort, probePort, probeUrl } from './probe.mjs';
import {
  resetLog, logStep, logOk, logFail, logWarn, LOG_FILE,
} from './logger.mjs';
import { openInBrowser } from './open-browser.mjs';

const TMUX = ['tmux', '-f', '/exec-daemon/tmux.portal.conf'];
const statusOnly = process.argv.includes('--status');

function tmux(...args) {
  return spawnSync(TMUX[0], [...TMUX.slice(1), ...args], { encoding: 'utf8' });
}

function gitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

async function auditPorts() {
  logStep('audit', 'checking ports');
  const checks = [
    { port: DOCS_PORT, path: '/', name: 'docs-hub' },
    { port: 5176, path: '/play.html', name: 'babys-revenge-2' },
    { port: 5177, path: '/index.html', name: 'car-game' },
    { port: 5188, path: '/', name: 'old-games-hub' },
  ];
  const results = {};
  for (const c of checks) {
    results[c.name] = await probePort(c.port, c.path);
  }
  return results;
}

async function buildAll() {
  logStep('build', 'building all playable games to docs/');
  for (const gameId of listPlayableGames()) {
    logStep('build', `building ${gameId}`);
    const code = await run('node', ['scripts/build.mjs', gameId, '--publish'], {
      env: { ...process.env, GH_PAGES: '1' },
    });
    if (code !== 0) {
      logFail('build failed', { gameId, code });
      process.exit(1);
    }
    logOk('build done', { gameId });
  }
}

async function ensureDocsServer() {
  const probe = await probePort(DOCS_PORT, '/');
  if (probe.ok) {
    logOk('docs server already running', { port: DOCS_PORT });
    return true;
  }

  logStep('server', `starting docs server on port ${DOCS_PORT}`);
  const session = 'docs-server';
  if (tmux('has-session', '-t', `=${session}`).status !== 0) {
    tmux('new-session', '-d', '-s', session, '-c', process.cwd(), '--', process.env.SHELL || 'bash', '-l');
    logOk('tmux session created', { session });
  } else {
    logWarn('tmux session exists, sending restart', { session });
  }
  tmux('send-keys', '-t', `${session}:0.0`, 'C-c', 'node scripts/serve-docs.mjs', 'C-m');

  const up = await waitForPort(DOCS_PORT, '/');
  if (!up) {
    logFail('docs server did not start', { port: DOCS_PORT });
    return false;
  }
  logOk('docs server running', { port: DOCS_PORT });
  return true;
}

async function verifyGameUrls() {
  logStep('verify', 'checking game URLs');
  const urls = [
    { name: 'hub', url: getDocsUrl('/') },
    { name: 'br2', url: getDocsUrl('/babys-revenge-2/play.html') },
    { name: 'car', url: getDocsUrl('/car-crashing-with-dashing/index.html') },
    { name: 'br2-assets', url: getDocsUrl('/babys-revenge-2/index.html') },
    { name: 'car-assets', url: getDocsUrl('/car-crashing-with-dashing/index.html') },
  ];
  const results = {};
  for (const u of urls) {
    results[u.name] = await probeUrl(u.url, u.name);
  }
  return results;
}

function writePlayHere(urls) {
  const path = join(process.cwd(), 'PLAY-HERE.txt');
  const body = `LAUNCH OK — ${new Date().toISOString()}
Branch: ${gitBranch()}
Log: ${LOG_FILE}

OPEN THIS (bookmark it):
${urls.hub}

Baby's Revenge 2:
${urls.br2}

car crashing with dashing:
${urls.car}

If a tab fails: npm start
`;
  writeFileSync(path, body);
  logOk('wrote PLAY-HERE.txt', { path });
  return path;
}

async function launch() {
  resetLog();
  logStep('launch', 'starting', {
    cwd: process.cwd(),
    branch: gitBranch(),
    node: process.version,
    args: process.argv.slice(2),
  });

  await auditPorts();

  if (statusOnly) {
    logStep('status', 'audit only — not starting servers');
    process.exit(0);
  }

  await buildAll();

  const serverOk = await ensureDocsServer();
  if (!serverOk) {
    logFail('launch aborted — server failed');
    console.error(`\n  Launch failed. See ${LOG_FILE}\n`);
    process.exit(1);
  }

  const urls = {
    hub: getDocsUrl('/'),
    br2: getDocsUrl('/babys-revenge-2/play.html'),
    car: getDocsUrl('/car-crashing-with-dashing/index.html'),
  };

  const verified = await verifyGameUrls();
  const allOk = verified.hub?.ok && verified.br2?.ok && verified.car?.ok;
  if (!allOk) {
    logFail('some URLs failed verification', verified);
  } else {
    logOk('all URLs verified');
  }

  const playFile = writePlayHere(urls);
  openInBrowser(urls.hub);

  console.log(`
════════════════════════════════════════════════════════
  LAUNCHED — local games ready
════════════════════════════════════════════════════════

  Hub:  ${urls.hub}
  BR2:  ${urls.br2}
  Car:  ${urls.car}

  Log:  ${LOG_FILE}
  File: ${playFile}

  Reload any tab — it works while this server runs.
  Run again anytime: npm start

════════════════════════════════════════════════════════
`);

  if (!allOk) process.exit(1);
}

launch().catch((err) => {
  logFail('launch crash', { error: err.message, stack: err.stack });
  console.error(err);
  process.exit(1);
});
