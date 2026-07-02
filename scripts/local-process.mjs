#!/usr/bin/env node
/**
 * Local process manager — start, stop, restart, status.
 * All on your machine. No cloud.
 */
import { spawn, execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { DOCS_PORT, getDocsUrl } from './serve-docs.mjs';
import { probePort, waitForPort } from './probe.mjs';
import { logOk, logWarn, logFail, logStep, resetLog, LOG_FILE } from './logger.mjs';

const PID_DIR = join(process.cwd(), '.local');
const DOCS_PID = join(PID_DIR, 'docs-server.pid');

function ensurePidDir() {
  if (!existsSync(PID_DIR)) mkdirSync(PID_DIR, { recursive: true });
}

function readPid(file = DOCS_PID) {
  if (!existsSync(file)) return null;
  const pid = Number.parseInt(readFileSync(file, 'utf8').trim(), 10);
  return Number.isFinite(pid) ? pid : null;
}

function clearPid(file = DOCS_PID) {
  try { unlinkSync(file); } catch { /* ignore */ }
}

function isRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function killPid(pid, signal = 'SIGTERM') {
  if (!pid || !isRunning(pid)) return false;
  try {
    process.kill(pid, signal);
    return true;
  } catch {
    return false;
  }
}

function findPidsOnPort(port) {
  try {
    if (process.platform === 'win32') {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      return out.split('\n')
        .filter((l) => l.includes('LISTENING'))
        .map((l) => Number.parseInt(l.trim().split(/\s+/).pop(), 10))
        .filter((n) => Number.isFinite(n));
    }
    const out = execSync(`lsof -ti :${port} -sTCP:LISTEN 2>/dev/null || lsof -ti :${port} 2>/dev/null`, {
      encoding: 'utf8',
    });
    return out.trim().split('\n')
      .map((s) => Number.parseInt(s, 10))
      .filter((n) => Number.isFinite(n));
  } catch {
    return [];
  }
}

function killPort(port) {
  const pids = findPidsOnPort(port);
  for (const pid of pids) {
    killPid(pid, 'SIGTERM');
  }
  if (pids.length === 0 && process.platform !== 'win32') {
    try {
      execSync(`fuser -k ${port}/tcp 2>/dev/null`, { stdio: 'ignore' });
    } catch { /* ignore */ }
  }
}

export async function getServerStatus() {
  const pid = readPid();
  const portProbe = await probePort(DOCS_PORT, '/');
  const portPids = findPidsOnPort(DOCS_PORT);
  const activePid = portPids[0] ?? (isRunning(pid) ? pid : null);
  return {
    port: DOCS_PORT,
    pid: activePid,
    pidFile: pid,
    pidAlive: isRunning(activePid),
    portOpen: portProbe.ok,
    running: portProbe.ok,
    hub: getDocsUrl('/'),
    br2: getDocsUrl('/babys-revenge-2/play.html'),
    car: getDocsUrl('/car-crashing-with-dashing/index.html'),
  };
}

export async function stopDocsServer() {
  logStep('stop', 'stopping local docs server');
  const pid = readPid();
  let stopped = false;

  if (killPid(pid)) {
    logOk('sent SIGTERM to docs server', { pid });
    stopped = true;
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    if (!(await probePort(DOCS_PORT, '/')).ok) break;

    const portPids = findPidsOnPort(DOCS_PORT);
    logWarn('port still in use', { port: DOCS_PORT, pids: portPids, attempt });
    for (const p of portPids) {
      killPid(p, attempt < 3 ? 'SIGTERM' : 'SIGKILL');
      stopped = true;
    }
    if (portPids.length === 0) killPort(DOCS_PORT);
    await new Promise((r) => { setTimeout(r, 350); });
  }

  clearPid();

  const stillUp = (await probePort(DOCS_PORT, '/')).ok;
  if (stillUp) {
    logFail('could not stop docs server', { port: DOCS_PORT, pids: findPidsOnPort(DOCS_PORT) });
    return false;
  }

  logOk('docs server stopped', { wasRunning: stopped });
  return true;
}

export async function startDocsServer() {
  ensurePidDir();

  const portPids = findPidsOnPort(DOCS_PORT);
  if (portPids.length > 0 && (await probePort(DOCS_PORT, '/')).ok) {
    writeFileSync(DOCS_PID, String(portPids[0]));
    logOk('docs server already running', { port: DOCS_PORT, pid: portPids[0] });
    return { pid: portPids[0], port: DOCS_PORT, alreadyRunning: true };
  }

  const stalePid = readPid();
  if (stalePid) {
    logWarn('removing stale pid file', { pid: stalePid });
    clearPid();
  }

  logStep('start', 'starting local docs server', { port: DOCS_PORT });
  const child = spawn(process.execPath, ['scripts/serve-docs.mjs'], {
    cwd: process.cwd(),
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  writeFileSync(DOCS_PID, String(child.pid));

  const up = await waitForPort(DOCS_PORT, '/');
  if (!up) {
    logFail('docs server failed to start', { pid: child.pid, port: DOCS_PORT });
    clearPid();
    return null;
  }

  logOk('docs server started', { pid: child.pid, port: DOCS_PORT });
  return { pid: child.pid, port: DOCS_PORT, alreadyRunning: false };
}

export async function restartDocsServer() {
  logStep('restart', 'restarting local docs server');
  await stopDocsServer();
  return startDocsServer();
}

export function startCommandBackground(name, command, args = []) {
  ensurePidDir();
  const pidFile = join(PID_DIR, `${name}.pid`);
  const existing = readPid(pidFile);
  if (isRunning(existing)) {
    logOk(`${name} already running`, { pid: existing });
    return existing;
  }

  const child = spawn(command, args, {
    cwd: process.cwd(),
    detached: true,
    stdio: 'ignore',
    shell: true,
  });
  child.unref();
  writeFileSync(pidFile, String(child.pid));
  logOk(`${name} started`, { pid: child.pid });
  return child.pid;
}

function printStatus(status) {
  const state = status.running ? 'RUNNING' : 'STOPPED';
  console.log(`
════════════════════════════════════════════════════════
  LOCAL SERVER: ${state}
════════════════════════════════════════════════════════

  Port:    ${status.port}
  PID:     ${status.pid ?? '(none)'}
  Port OK: ${status.portOpen ? 'yes' : 'no'}

  Hub:  ${status.hub}
  BR2:  ${status.br2}
  Car:  ${status.car}

  Log:  ${LOG_FILE}

  npm start    — build + start
  npm restart  — stop + start (fast)
  npm stop     — stop server

════════════════════════════════════════════════════════
`);
}

async function main() {
  const action = process.argv[2] ?? 'status';
  resetLog();
  logStep('manage', action);

  if (action === 'status') {
    printStatus(await getServerStatus());
    return;
  }

  if (action === 'stop') {
    const ok = await stopDocsServer();
    console.log(ok ? '\n  Server stopped.\n' : '\n  Stop failed — see launch.log\n');
    process.exit(ok ? 0 : 1);
  }

  if (action === 'start-server') {
    const result = await startDocsServer();
    if (!result) process.exit(1);
    printStatus(await getServerStatus());
    return;
  }

  if (action === 'restart-server') {
    const result = await restartDocsServer();
    if (!result) process.exit(1);
    printStatus(await getServerStatus());
    return;
  }

  console.error(`Unknown action: ${action}`);
  process.exit(1);
}

if (process.argv[1]?.endsWith('local-process.mjs')) {
  main().catch((err) => {
    logFail('manage crash', { error: err.message });
    console.error(err);
    process.exit(1);
  });
}
