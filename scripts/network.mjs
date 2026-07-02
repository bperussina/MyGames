#!/usr/bin/env node
import os from 'node:os';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  PRIMARY_SHARE_LINK,
  PAGES_SETTINGS,
  buildShareMessage,
  GAME_NAME,
} from './play-urls.mjs';

const SHARE_PATH = '/play.html';

function privateIpScore(ip) {
  if (ip.startsWith('192.168.')) return 0;
  if (ip.startsWith('10.')) return 1;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return 2;
  return 3;
}

export function getLanAddresses() {
  const nets = os.networkInterfaces();
  const addrs = [];
  for (const iface of Object.values(nets)) {
    for (const net of iface ?? []) {
      if (net.family === 'IPv4' && !net.internal) addrs.push(net.address);
    }
  }
  return [...new Set(addrs)].sort((a, b) => privateIpScore(a) - privateIpScore(b));
}

export function getPlayUrls(port) {
  const localhost = `http://localhost:${port}${SHARE_PATH}`;
  const lan = getLanAddresses().map((ip) => `http://${ip}:${port}${SHARE_PATH}`);
  return { localhost, lan, primary: lan[0] ?? localhost };
}

export function copyToClipboard(text) {
  try {
    if (process.platform === 'darwin') {
      spawnSync('pbcopy', { input: text });
      return true;
    }
    if (process.platform === 'win32') {
      spawnSync('clip', { input: text, shell: true });
      return true;
    }
    spawnSync('xclip', ['-selection', 'clipboard'], { input: text });
    return true;
  } catch {
    return false;
  }
}

export function writeFamilyLinkFile(permanentUrl, tunnelUrl, localUrl = '') {
  const filePath = join(process.cwd(), 'FAMILY-LINK.txt');
  const body = `BABY'S REVENGE 2 — LINKS TO TEXT YOUR FAMILY
============================================

BEST RIGHT NOW (works on iPad — keep computer on):
${tunnelUrl || '(run: npm run family -- babys-revenge-2)'}

PERMANENT LINK (after one-time setup — npm run turn-on-link):
${permanentUrl}

Same Wi-Fi only (optional):
${localUrl || '(from npm run family)'}
`;
  writeFileSync(filePath, body, 'utf8');
  return filePath;
}

export function printFamilyPlayBanner(port, gameTitle = GAME_NAME, tunnelUrl = null) {
  const { localhost, lan, primary } = getPlayUrls(port);

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  ${gameTitle.toUpperCase()} — FAMILY PLAY`);
  console.log(`${'═'.repeat(56)}`);

  if (tunnelUrl) {
    console.log('\n  TEXT THIS NOW (works on iPad — real game, not code):\n');
    console.log(`  ${tunnelUrl}`);
    console.log('\n  Keep this window open while everyone plays.');
  } else {
    console.log('\n  For iPad link, run: npm run family -- babys-revenge-2');
    console.log('  For permanent link, run once: npm run turn-on-link');
  }

  console.log(`\n  Permanent link (after one-time setup):\n  ${PRIMARY_SHARE_LINK}`);
  console.log(`  Turn on once: ${PAGES_SETTINGS}`);
  console.log('    → Branch: main   Folder: /docs   → Save');

  console.log(`\n  On this computer: ${localhost}`);
  if (lan.length > 0) console.log(`  Same Wi-Fi: ${primary}`);

  const shareText = buildShareMessage(tunnelUrl || PRIMARY_SHARE_LINK);
  const linkFile = writeFamilyLinkFile(PRIMARY_SHARE_LINK, tunnelUrl, primary);
  const copied = copyToClipboard(shareText);

  console.log(`\n  Saved to: ${linkFile}`);
  if (copied && tunnelUrl) console.log('  iPad link copied to clipboard!');
  console.log(`${'═'.repeat(56)}\n`);
}
