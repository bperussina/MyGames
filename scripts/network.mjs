#!/usr/bin/env node
import os from 'node:os';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  PRIMARY_SHARE_LINK,
  GH_PAGES_PLAY,
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
      if (net.family === 'IPv4' && !net.internal) {
        addrs.push(net.address);
      }
    }
  }

  return [...new Set(addrs)].sort((a, b) => privateIpScore(a) - privateIpScore(b));
}

export function getPlayUrls(port) {
  const localhost = `http://localhost:${port}${SHARE_PATH}`;
  const lan = getLanAddresses().map((ip) => `http://${ip}:${port}${SHARE_PATH}`);
  return { localhost, lan, primary: lan[0] ?? localhost, sharePath: SHARE_PATH };
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

export function writeFamilyLinkFile(onlineUrl, localUrl = '') {
  const filePath = join(process.cwd(), 'FAMILY-LINK.txt');
  const body = `TEXT THIS TO YOUR FAMILY — Baby's Revenge 2
============================================

Play Baby's Revenge 2:
${onlineUrl}

Tap the link in Messages. It should say "Baby's Revenge 2".

---
Optional same-Wi-Fi link (only at your house with game running):
${localUrl || '(run npm run family to generate)'}
`;
  writeFileSync(filePath, body, 'utf8');
  return filePath;
}

export function printFamilyPlayBanner(port, gameTitle = GAME_NAME) {
  const { localhost, lan, primary } = getPlayUrls(port);
  const shareText = buildShareMessage(PRIMARY_SHARE_LINK);

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  FAMILY PLAY — ${gameTitle}`);
  console.log(`${'═'.repeat(56)}`);

  console.log('\n  TEXT THIS LINK (works on iPad, phone, laptop):\n');
  console.log(`  ${PRIMARY_SHARE_LINK}`);

  console.log(`\n  On this computer:\n    ${localhost}\n`);

  if (lan.length > 0) {
    console.log('  Same Wi-Fi only (optional):\n');
    console.log(`  ${primary}`);
  }

  const linkFile = writeFamilyLinkFile(PRIMARY_SHARE_LINK, primary);
  const copied = copyToClipboard(shareText);

  console.log(`\n  Link saved to: ${linkFile}`);
  if (copied) console.log('  Copied to clipboard — paste into Messages.');

  console.log(`\n  GitHub link (needs one-time setup): ${GH_PAGES_PLAY}`);
  console.log(`  Setup: ${PAGES_SETTINGS}\n`);
  console.log(`${'═'.repeat(56)}\n`);
}
