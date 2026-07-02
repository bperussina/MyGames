#!/usr/bin/env node
import { openInBrowser } from './open-browser.mjs';
import { getDocsUrl } from './serve-docs.mjs';
import { logStep } from './logger.mjs';

const carUrl = `${getDocsUrl('/car-crashing-with-dashing/index.html')}?teleport=1`;

logStep('teleport', 'opening car game', { url: carUrl });
openInBrowser(carUrl);

console.log(`
  car crashing with dashing: ${carUrl}
  All games hub: ${getDocsUrl('/')}
  Run npm start if connection refused.
`);
