#!/usr/bin/env node
/**
 * Deploy docs/ to gh-pages branch (fallback when GitHub Actions Pages isn't enabled).
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { requireGameConfig } from './game-registry.mjs';

const game = process.argv[2] || 'car-crashing-with-dashing';
requireGameConfig(game);

console.log('\nBuilding games for public play link...\n');
for (const id of ['babys-revenge-2', 'car-crashing-with-dashing']) {
  const code = spawnSync('npm', ['run', 'build', '--', id, '--publish'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, GH_PAGES: '1' },
  });
  if (code.status !== 0) process.exit(code.status ?? 1);
}

const docs = join(process.cwd(), 'docs');
if (!existsSync(join(docs, 'car-crashing-with-dashing', 'index.html'))) {
  console.error('docs/ build missing — run npm run build -- car-crashing-with-dashing --publish');
  process.exit(1);
}

console.log('\nPublishing docs/ to gh-pages branch...\n');
const deploy = spawnSync('npx', ['--yes', 'gh-pages@6', '-d', 'docs'], {
  stdio: 'inherit',
});
process.exit(deploy.status ?? 0);
