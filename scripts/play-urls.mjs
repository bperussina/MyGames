#!/usr/bin/env node
/**
 * Public play URLs for Baby's Revenge 2.
 * GitHub Pages is primary; jsDelivr mirror works without any setup.
 */
export const GAME_NAME = "Baby's Revenge 2";
export const GH_PAGES_PATH = '/MyGames/';
export const GH_PAGES_PLAY = 'https://bperussina.github.io/MyGames/play.html';
export const GH_PAGES_GAME = 'https://bperussina.github.io/MyGames/index.html';
export const CDN_PLAY = 'https://cdn.jsdelivr.net/gh/bperussina/MyGames@gh-pages/play.html';
export const CDN_GAME = 'https://cdn.jsdelivr.net/gh/bperussina/MyGames@gh-pages/index.html';
export const PAGES_SETTINGS = 'https://github.com/bperussina/MyGames/settings/pages';

/** Best link to text family — CDN mirror works right now. */
export const PRIMARY_SHARE_LINK = CDN_PLAY;

export function buildShareMessage(url = PRIMARY_SHARE_LINK) {
  return `Play Baby's Revenge 2:\n${url}`;
}
