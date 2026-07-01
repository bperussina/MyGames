#!/usr/bin/env node
import { resolveGame } from './games.mjs';
import { buildAndServe } from './serve-game.mjs';

const game = resolveGame(process.argv[2] ?? 'babys-revenge-2');
const exitCode = await buildAndServe(game, { family: true });
process.exit(exitCode);
