#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listGames } from './games.mjs';

const name = process.argv[2];

if (!name) {
  console.error('Usage: npm run new-game -- <game-name>');
  console.error('Example: npm run new-game -- space-race');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('Game names must be lowercase letters, numbers, and hyphens.');
  console.error('They must start with a letter. Example: space-race');
  process.exit(1);
}

if (name.startsWith('_')) {
  console.error('Game names cannot start with an underscore.');
  process.exit(1);
}

const gamesDir = join(process.cwd(), 'games');
const targetDir = join(gamesDir, name);
const templateDir = join(gamesDir, '_template');

if (existsSync(targetDir)) {
  console.error(`A game named "${name}" already exists.`);
  process.exit(1);
}

cpSync(templateDir, targetDir, { recursive: true });

const packageJsonPath = join(targetDir, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
packageJson.name = `@mygames/${name}`;
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

const readmePath = join(targetDir, 'README.md');
let readme = readFileSync(readmePath, 'utf8');
readme = readme.replaceAll('__GAME_NAME__', name);
writeFileSync(readmePath, readme);

const indexHtmlPath = join(targetDir, 'index.html');
let indexHtml = readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replaceAll('__GAME_NAME__', name);
writeFileSync(indexHtmlPath, indexHtml);

mkdirSync(join(process.cwd(), 'docs', 'games'), { recursive: true });
const docPath = join(process.cwd(), 'docs', 'games', `${name}.md`);
writeFileSync(
  docPath,
  `# ${name}\n\nA game in the mygames monorepo.\n\n## Run\n\n\`\`\`bash\nnpm run dev -- ${name}\n\`\`\`\n\n## Build\n\n\`\`\`bash\nnpm run build -- ${name}\n\`\`\`\n`
);

console.log(`Created game: games/${name}`);
console.log(`Added doc:    docs/games/${name}.md`);
console.log('');
console.log(`Start playing: npm run dev -- ${name}`);
