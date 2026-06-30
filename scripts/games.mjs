#!/usr/bin/env node
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const gamesDir = join(process.cwd(), 'games');

export function listGames({ includeTemplate = false } = {}) {
  if (!existsSync(gamesDir)) {
    return [];
  }

  return readdirSync(gamesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => includeTemplate || !name.startsWith('_'))
    .sort();
}

export function resolveGame(name) {
  const games = listGames({ includeTemplate: true });

  if (!name) {
    console.error('Usage: npm run dev -- <game-name>');
    console.error('');
    console.error('Available games:');
    for (const game of listGames()) {
      console.error(`  - ${game}`);
    }
    process.exit(1);
  }

  if (!games.includes(name)) {
    console.error(`Unknown game: "${name}"`);
    console.error('');
    console.error('Available games:');
    for (const game of listGames()) {
      console.error(`  - ${game}`);
    }
    process.exit(1);
  }

  return name;
}
