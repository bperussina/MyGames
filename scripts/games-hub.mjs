#!/usr/bin/env node
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { openInBrowser } from './open-browser.mjs';

const PORT = 5188;
const ROOT = join(process.cwd(), 'launcher');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

const server = http.createServer((req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const file = join(ROOT, path);
  if (!existsSync(file)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const type = MIME[extname(file)] ?? 'text/plain';
  res.writeHead(200, { 'Content-Type': type });
  res.end(readFileSync(file));
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`\n  Games hub: ${url}`);
  console.log('  Pick a game — each opens in a new tab.\n');
  openInBrowser(url);
});
