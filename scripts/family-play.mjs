#!/usr/bin/env node
import { resolveGame } from './games.mjs';
import { buildAndServe } from './serve-game.mjs';
import { printPlayableGamesHelp } from './game-registry.mjs';

const game = process.argv[2];
if (!game) printPlayableGamesHelp('family');

resolveGame(game);
const exitCode = await buildAndServe(game, { family: true });
process.exit(exitCode);
