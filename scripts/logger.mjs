#!/usr/bin/env node
import { appendFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LOG_FILE = join(process.cwd(), 'launch.log');

function stamp() {
  return new Date().toISOString();
}

export function log(level, message, data) {
  const extra = data !== undefined ? ` ${JSON.stringify(data)}` : '';
  const line = `[${stamp()}] [${level}] ${message}${extra}`;
  console.log(line);
  try {
    appendFileSync(LOG_FILE, `${line}\n`);
  } catch {
    /* ignore */
  }
}

export function logStep(step, message, data) {
  log('STEP', `${step}: ${message}`, data);
}

export function logOk(message, data) {
  log('OK', message, data);
}

export function logFail(message, data) {
  log('FAIL', message, data);
}

export function logWarn(message, data) {
  log('WARN', message, data);
}

export function resetLog() {
  writeFileSync(LOG_FILE, `=== launch log started ${stamp()} ===\n`);
}

export { LOG_FILE };
