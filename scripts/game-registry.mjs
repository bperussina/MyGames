#!/usr/bin/env node
import { listGames } from './games.mjs';

const GH_PAGES_ROOT = 'https://bperussina.github.io/MyGames';
const PAGES_SETTINGS = 'https://github.com/bperussina/MyGames/settings/pages';

/** Per-game ports and titles — keeps each game independent. */
const GAME_REGISTRY = {
  'babys-revenge-2': {
    title: "Baby's Revenge 2",
    port: 5176,
  },
  'car-crashing-with-dashing': {
    title: 'car crashing with dashing',
    port: 5177,
  },
};

export { PAGES_SETTINGS, GH_PAGES_ROOT };

export function getGameConfig(gameId) {
  const entry = GAME_REGISTRY[gameId];
  if (!entry) return null;

  return {
    id: gameId,
    title: entry.title,
    port: entry.port,
    playPath: '/play.html',
    ghPagesPlay: `${GH_PAGES_ROOT}/${gameId}/play.html`,
    familyLinkFile: `FAMILY-LINK-${gameId}.txt`,
  };
}

export function requireGameConfig(gameId) {
  const config = getGameConfig(gameId);
  if (!config) {
    console.error(`Game "${gameId}" is not set up for play/family mode yet.`);
    console.error('Add it to scripts/game-registry.mjs with its own port.');
    process.exit(1);
  }
  return config;
}

export function listPlayableGames() {
  return listGames().filter((id) => getGameConfig(id));
}

export function printPlayableGamesHelp(command) {
  console.error(`Usage: npm run ${command} -- <game-name>`);
  console.error('');
  console.error('Playable games (each has its own port and link):');
  for (const id of listPlayableGames()) {
    const { title, port, ghPagesPlay } = getGameConfig(id);
    console.error(`  - ${id}`);
    console.error(`      ${title}`);
    console.error(`      port ${port}  |  ${ghPagesPlay}`);
  }
  process.exit(1);
}

export function buildShareMessage(config, url = config.ghPagesPlay) {
  return `Play ${config.title}:\n${url}`;
}
