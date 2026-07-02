#!/usr/bin/env node
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { logOk, logFail, logStep } from './logger.mjs';

/** One port for every game — reload works if this is running. */
export const DOCS_PORT = 4173;

const ROOT = join(process.cwd(), 'docs');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function sendFile(res, file) {
  const type = MIME[extname(file)] ?? 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(readFileSync(file));
}

export function createDocsServer() {
  return http.createServer((req, res) => {
    const raw = req.url?.split('?')[0] ?? '/';
    const path = raw === '/' ? '/index.html' : raw;
    const file = join(ROOT, path);

    if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) {
      logFail('404', { path: raw, file });
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    sendFile(res, file);
  });
}

export function getDocsUrl(path = '/') {
  return `http://localhost:${DOCS_PORT}${path}`;
}

if (process.argv[1]?.endsWith('serve-docs.mjs')) {
  logStep('serve-docs', 'starting', { port: DOCS_PORT, root: ROOT });
  const server = createDocsServer();
  server.on('error', (err) => {
    logFail('serve-docs error', { error: err.message, port: DOCS_PORT });
    process.exit(1);
  });
  server.listen(DOCS_PORT, '0.0.0.0', () => {
    logOk('serve-docs listening', { port: DOCS_PORT, url: getDocsUrl('/') });
    console.log(`\n  Games hub: ${getDocsUrl('/')}`);
    console.log(`  Baby's Revenge 2: ${getDocsUrl('/babys-revenge-2/play.html')}`);
    console.log(`  car crashing with dashing: ${getDocsUrl('/car-crashing-with-dashing/index.html')}`);
    console.log(`  Log: launch.log\n`);
  });
}
