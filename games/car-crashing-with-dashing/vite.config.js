import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const ghPages = process.env.GH_PAGES === '1';

function buildVersion() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return String(Date.now());
  }
}

function gameVersionPlugin() {
  let version = buildVersion();
  return {
    name: 'game-version',
    buildStart() {
      version = buildVersion();
    },
    transformIndexHtml(html) {
      const cacheMeta = `
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />`;
      return html.replace('<head>', `<head>${cacheMeta}`);
    },
    closeBundle() {
      if (!ghPages) return;
      writeFileSync('dist/version.json', JSON.stringify({ v: version, built: Date.now() }), 'utf8');
    },
  };
}

export default defineConfig({
  base: ghPages ? './' : '/',
  root: '.',
  plugins: [gameVersionPlugin()],
  server: {
    port: 5177,
    host: '0.0.0.0',
    strictPort: true,
    open: false,
  },
  preview: {
    port: 5177,
    host: '0.0.0.0',
    strictPort: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
