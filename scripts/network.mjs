#!/usr/bin/env node
import os from 'node:os';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const SHARE_PATH = '/play.html';

function privateIpScore(ip) {
  if (ip.startsWith('192.168.')) return 0;
  if (ip.startsWith('10.')) return 1;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return 2;
  return 3;
}

/** IPv4 addresses other devices on the same Wi-Fi can use to reach this machine. */
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

export function buildShareMessage(url) {
  return `Play Baby's Revenge 2 (same Wi-Fi only):\n${url}`;
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

export function writeFamilyLinkFile(url) {
  const filePath = join(process.cwd(), 'FAMILY-LINK.txt');
  const body = `${buildShareMessage(url)}\n\nCopy the link above and text it to family.\nDo not copy anything from the build log.\n`;
  writeFileSync(filePath, body, 'utf8');
  return filePath;
}

export function printFamilyPlayBanner(port, gameTitle = 'the game') {
  const { localhost, lan, primary } = getPlayUrls(port);
  const shareText = buildShareMessage(primary);

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  FAMILY PLAY — ${gameTitle}`);
  console.log(`${'═'.repeat(56)}`);
  console.log(`\n  On this computer:\n    ${localhost}\n`);

  if (lan.length > 0) {
    console.log('  TEXT THIS TO YOUR FAMILY (copy only the line below):\n');
    console.log(`  ${primary}`);
    console.log('\n  Or copy the whole message:\n');
    console.log('  ─────────────────────────────────────');
    for (const line of shareText.split('\n')) {
      console.log(`  ${line}`);
    }
    console.log('  ─────────────────────────────────────');
  } else {
    console.log('  Wi-Fi IP not detected yet.');
    console.log('  Connect to Wi-Fi, then run this command again.');
    console.log(`  For now, use on this computer only: ${localhost}`);
  }

  const linkFile = writeFamilyLinkFile(primary);
  const copied = copyToClipboard(shareText);

  console.log(`\n  Link saved to: ${linkFile}`);
  if (copied) {
    console.log('  Copied to clipboard — paste into Messages and send.');
  } else {
    console.log('  Open FAMILY-LINK.txt and copy the link from there.');
  }

  console.log('\n  Do NOT copy lines from the build log (no @ symbols).');
  console.log('  Keep this terminal open while everyone plays.\n');
  console.log(`${'═'.repeat(56)}\n`);
}
