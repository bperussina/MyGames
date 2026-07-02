#!/usr/bin/env node
import { stopDocsServer } from './local-process.mjs';
import { logStep } from './logger.mjs';

logStep('stop', 'stopping local game server');
stopDocsServer();
console.log('\n  Local game server stopped.\n');
