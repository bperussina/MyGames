import { defineConfig } from 'vite';

const ghPages = process.env.GH_PAGES === '1';

export default defineConfig({
  base: ghPages ? '/MyGames/' : '/',
  root: '.',
  server: {
    port: 5176,
    host: '0.0.0.0',
    strictPort: true,
    open: false,
    hmr: false,
  },
  preview: {
    port: 5176,
    host: '0.0.0.0',
    strictPort: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
