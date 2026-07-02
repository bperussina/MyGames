#!/usr/bin/env node
import http from 'node:http';
import { logOk, logFail } from './logger.mjs';

export async function probeUrl(url, label = url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      const ok = res.statusCode >= 200 && res.statusCode < 500;
      if (ok) logOk(`probe ${label}`, { status: res.statusCode, url });
      else logFail(`probe ${label}`, { status: res.statusCode, url });
      resolve({ ok, status: res.statusCode, url });
    });
    req.on('error', (err) => {
      logFail(`probe ${label}`, { url, error: err.message });
      resolve({ ok: false, status: 0, url, error: err.message });
    });
    req.setTimeout(3000, () => {
      req.destroy();
      logFail(`probe ${label}`, { url, error: 'timeout' });
      resolve({ ok: false, status: 0, url, error: 'timeout' });
    });
  });
}

export async function probePort(port, path = '/') {
  return probeUrl(`http://127.0.0.1:${port}${path}`, `port ${port}${path}`);
}

export async function waitForPort(port, path = '/', attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    const result = await probePort(port, path);
    if (result.ok) return true;
    await new Promise((r) => { setTimeout(r, 400); });
  }
  return false;
}
