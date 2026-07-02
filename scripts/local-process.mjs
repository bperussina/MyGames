#!/usr/bin/env node
/**
 * Start/stop background processes locally — no tmux, no cloud.
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { logOk, logWarn, logFail, logStep } from './logger.mjs';

const PID_DIR = join(process.cwd(), '.local');
const DOCS_PID = join(PID_DIR, 'docs-server.pid');

function ensurePidDir() {
  if (!existsSync(PID_DIR)) mkdirSync(PID_DIR, { recursive: true });
}

function readPid(file) {
  if (!existsSync(file)) return null;
  const pid = Number.parseInt(readFileSync(file, 'utf8').trim(), 10);
  return Number.isFinite(pid) ? pid : null;
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

function killPid(pid) {
  if (!pid || !isRunning(pid)) return false;
  try {
    process.kill(pid, 'SIGTERM');
    return true;
  } catch {
    return false;
  }
}

export function stopDocsServer() {
  const pid = readPid(DOCS_PID);
  if (killPid(pid)) {
    logOk('stopped docs server', { pid });
    try { unlinkSync(DOCS_PID); } catch { /* ignore */ }
    return true;
  }
  return false;
}

export function startDocsServerBackground() {
  ensurePidDir();
  const existing = readPid(DOCS_PID);
  if (isRunning(existing)) {
    logOk('docs server already running locally', { pid: existing });
    return existing;
  }

  logStep('process', 'starting local docs server (background)');
  const child = spawn(process.execPath, ['scripts/serve-docs.mjs'], {
    cwd: process.cwd(),
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  writeFileSync(DOCS_PID, String(child.pid));
  logOk('docs server started locally', { pid: child.pid, pidFile: DOCS_PID });
  return child.pid;
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
  logOk(`${name} started locally`, { pid: child.pid });
  return child.pid;
}

if (process.argv[1]?.endsWith('local-process.mjs')) {
  const action = process.argv[2];
  if (action === 'stop') {
    stopDocsServer();
  } else if (action === 'start') {
    startDocsServerBackground();
  }
}
