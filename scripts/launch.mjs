#!/usr/bin/env node
/**
 * ONE command to launch all games locally on YOUR machine.
 *   npm install
 *   npm start
 *
 * No cloud, no tmux, no tunnels. Logs → launch.log
 */
import { execSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { listPlayableGames } from './game-registry.mjs';
import { run } from './serve-game.mjs';
import { DOCS_PORT, getDocsUrl } from './serve-docs.mjs';
import { waitForPort, probePort, probeUrl } from './probe.mjs';
import {
  resetLog, logStep, logOk, logFail, LOG_FILE,
} from './logger.mjs';
import { openInBrowser } from './open-browser.mjs';
import { startDocsServerBackground } from './local-process.mjs';

const statusOnly = process.argv.includes('--status');
const skipBuild = process.argv.includes('--skip-build');

function gitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function docsLookBuilt() {
  return existsSync(join(process.cwd(), 'docs', 'babys-revenge-2', 'index.html'))
    && existsSync(join(process.cwd(), 'docs', 'car-crashing-with-dashing', 'index.html'));
}

async function auditPorts() {
  logStep('audit', 'checking local ports');
  const checks = [
    { port: DOCS_PORT, path: '/', name: 'docs-hub' },
  ];
  const results = {};
  for (const c of checks) {
    results[c.name] = await probePort(c.port, c.path);
  }
  return results;
}

async function buildAll() {
  logStep('build', 'building games locally into docs/');
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
    logOk('docs server already up on this machine', { port: DOCS_PORT });
    return true;
  }

  startDocsServerBackground();
  const up = await waitForPort(DOCS_PORT, '/');
  if (!up) {
    logFail('docs server did not start locally', { port: DOCS_PORT });
    return false;
  }
  logOk('docs server running locally', { port: DOCS_PORT });
  return true;
}

async function verifyGameUrls() {
  logStep('verify', 'checking local game URLs');
  const urls = [
    { name: 'hub', url: getDocsUrl('/') },
    { name: 'br2', url: getDocsUrl('/babys-revenge-2/play.html') },
    { name: 'car', url: getDocsUrl('/car-crashing-with-dashing/index.html') },
  ];
  const results = {};
  for (const u of urls) {
    results[u.name] = await probeUrl(u.url, u.name);
  }
  return results;
}

function writePlayHere(urls) {
  const path = join(process.cwd(), 'PLAY-HERE.txt');
  const body = `LOCAL GAMES — ${new Date().toISOString()}
Branch: ${gitBranch()}
Log: ${LOG_FILE}

All code runs on YOUR computer. Nothing uses the cloud.

OPEN THIS:
${urls.hub}

Baby's Revenge 2:
${urls.br2}

car crashing with dashing:
${urls.car}

Start: npm start
Stop:  npm stop
`;
  writeFileSync(path, body);
  logOk('wrote PLAY-HERE.txt', { path });
  return path;
}

async function launch() {
  resetLog();
  logStep('launch', 'local launch', {
    cwd: process.cwd(),
    branch: gitBranch(),
    node: process.version,
    local: true,
  });

  await auditPorts();

  if (statusOnly) {
    logStep('status', 'port audit only');
    process.exit(0);
  }

  if (skipBuild && docsLookBuilt()) {
    logOk('skip build', { reason: 'docs/ already has built games' });
  } else {
    await buildAll();
  }

  const serverOk = await ensureDocsServer();
  if (!serverOk) {
    logFail('launch failed — see launch.log');
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
    logFail('URL check failed', verified);
  } else {
    logOk('all local URLs OK');
  }

  const playFile = writePlayHere(urls);
  openInBrowser(urls.hub);

  console.log(`
════════════════════════════════════════════════════════
  LOCAL GAMES READY (all on your machine)
════════════════════════════════════════════════════════

  Hub:  ${urls.hub}
  BR2:  ${urls.br2}
  Car:  ${urls.car}

  Log:  ${LOG_FILE}
  Stop: npm stop

  Everything is local. Reload works while server runs.

════════════════════════════════════════════════════════
`);

  if (!allOk) process.exit(1);
}

launch().catch((err) => {
  logFail('launch crash', { error: err.message, stack: err.stack });
  console.error(err);
  process.exit(1);
});
