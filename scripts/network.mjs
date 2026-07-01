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

export function writeFamilyLinkFile(onlineUrl, localUrl = '') {
  const filePath = join(process.cwd(), 'FAMILY-LINK.txt');
  const body = `TEXT THIS LINK TO YOUR FAMILY:

${onlineUrl}

Tap it in Messages — the game opens right away.
Works on any phone, tablet, or computer (Wi-Fi or cell data).

---
Optional same-Wi-Fi link (only works at your house with the game running):
${localUrl || '(run npm run family to generate)'}
`;
  writeFileSync(filePath, body, 'utf8');
  return filePath;
}

export function printFamilyPlayBanner(port, gameTitle = 'the game') {
  const { localhost, lan, primary } = getPlayUrls(port);
  const shareText = buildShareMessage(primary);
  const onlineLink = 'https://bperussina.github.io/MyGames/play.html';

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  FAMILY PLAY — ${gameTitle}`);
  console.log(`${'═'.repeat(56)}`);

  console.log('\n  EASIEST — text this link (works on any Wi-Fi or phone data):\n');
  console.log(`  ${onlineLink}`);

  console.log(`\n  On this computer:\n    ${localhost}\n`);

  if (lan.length > 0) {
    console.log('  Same Wi-Fi only — optional local link:\n');
    console.log(`  ${primary}`);
  } else {
    console.log('  (Local Wi-Fi IP not detected — use the online link above.)');
  }

  const linkFile = writeFamilyLinkFile(onlineLink, primary);
  const copied = copyToClipboard(
    `Play Baby's Revenge 2:\n${onlineLink}`,
  );

  console.log(`\n  Links saved to: ${linkFile}`);
  if (copied) {
    console.log('  Online link copied to clipboard — paste into Messages and send.');
  }

  console.log('\n  Keep this terminal open only if using the local Wi-Fi link.');
  console.log('  The online link works without keeping anything open.\n');
  console.log(`${'═'.repeat(56)}\n`);
}
