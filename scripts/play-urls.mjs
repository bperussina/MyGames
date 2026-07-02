#!/usr/bin/env node
/**
 * Public play URLs — per game, not shared with Baby's Revenge 2.
 */
import { getGameConfig, GH_PAGES_ROOT, PAGES_SETTINGS } from './game-registry.mjs';

export { PAGES_SETTINGS, GH_PAGES_ROOT };

export function getPlayUrlsForGame(gameId) {
  const config = getGameConfig(gameId);
  if (!config) return null;
  return {
    gameName: config.title,
    ghPagesPlay: config.ghPagesPlay,
    ghPagesGame: `${GH_PAGES_ROOT}/${gameId}/index.html`,
    primaryShareLink: config.ghPagesPlay,
  };
}

/** @deprecated Use getPlayUrlsForGame(gameId) */
export const GAME_NAME = "Baby's Revenge 2";
export const GH_PAGES_PLAY = `${GH_PAGES_ROOT}/babys-revenge-2/play.html`;
export const GH_PAGES_GAME = `${GH_PAGES_ROOT}/babys-revenge-2/index.html`;
export const PRIMARY_SHARE_LINK = GH_PAGES_PLAY;

export function buildShareMessage(url = PRIMARY_SHARE_LINK, gameName = GAME_NAME) {
  return `Play ${gameName}:\n${url}`;
}
