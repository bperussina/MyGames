#!/usr/bin/env node
import { stopDocsServer } from './local-process.mjs';

const ok = await stopDocsServer();
process.exit(ok ? 0 : 1);
