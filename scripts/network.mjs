#!/usr/bin/env node
import os from 'node:os';

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

export function getPlayUrls(port, game = '') {
  const path = game ? '/' : '/';
  const localhost = `http://localhost:${port}${path}`;
  const lan = getLanAddresses().map((ip) => `http://${ip}:${port}${path}`);
  return { localhost, lan, primary: lan[0] ?? localhost };
}

export function printFamilyPlayBanner(port, gameTitle = 'the game') {
  const { localhost, lan, primary } = getPlayUrls(port);

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  FAMILY PLAY — ${gameTitle}`);
  console.log(`${'═'.repeat(56)}`);
  console.log(`\n  On this computer:\n    ${localhost}\n`);

  if (lan.length > 0) {
    console.log('  Text this link to family on the SAME Wi-Fi:\n');
    for (const url of lan) {
      const star = url === primary ? ' ★' : '';
      console.log(`    ${url}${star}`);
    }
    console.log(`\n  Main share link:\n    ${primary}`);
  } else {
    console.log('  Wi-Fi IP not detected yet.');
    console.log('  Connect to Wi-Fi, then run this command again.');
    console.log(`  For now, use on this computer only: ${localhost}`);
  }

  console.log('\n  • Keep this terminal open while everyone plays');
  console.log('  • Phones, tablets, and laptops on the same Wi-Fi can tap the link');
  console.log('  • The game opens straight away — no extra setup\n');
  console.log(`${'═'.repeat(56)}\n`);
}
