#!/usr/bin/env node
/**
 * Public play URLs for Baby's Revenge 2.
 */
export const GAME_NAME = "Baby's Revenge 2";
export const GH_PAGES_PLAY = 'https://bperussina.github.io/MyGames/play.html';
export const GH_PAGES_GAME = 'https://bperussina.github.io/MyGames/index.html';
export const PAGES_SETTINGS = 'https://github.com/bperussina/MyGames/settings/pages';

/** Permanent link — works on iPad after one-time Pages setup (see turn-on-link). */
export const PRIMARY_SHARE_LINK = GH_PAGES_PLAY;

export function buildShareMessage(url = PRIMARY_SHARE_LINK) {
  return `Play Baby's Revenge 2:\n${url}`;
}
