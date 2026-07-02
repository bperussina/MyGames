#!/usr/bin/env node
import { resolveGame } from './games.mjs';
import { buildAndServe } from './serve-game.mjs';
import { printPlayableGamesHelp } from './game-registry.mjs';

const game = process.argv[2];
if (!game) printPlayableGamesHelp('play');

resolveGame(game);
const family = process.argv.includes('--family');
const exitCode = await buildAndServe(game, { family });
process.exit(exitCode);
