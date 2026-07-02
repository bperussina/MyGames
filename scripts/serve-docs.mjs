#!/usr/bin/env node
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

/** One port for every game — reload always works if this is running. */
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
  const server = createDocsServer();
  server.listen(DOCS_PORT, '0.0.0.0', () => {
    console.log(`\n  All games: ${getDocsUrl('/')}`);
    console.log(`  Baby's Revenge 2: ${getDocsUrl('/babys-revenge-2/play.html')}`);
    console.log(`  car crashing with dashing: ${getDocsUrl('/car-crashing-with-dashing/index.html')}`);
    console.log('\n  Keep this running — reload any tab and it still works.\n');
  });
}
