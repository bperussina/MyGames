import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5176,
    host: true,
    strictPort: true,
    open: true,
    // Avoid surprise mid-game reloads when the dev connection drops.
    hmr: false,
  },
  preview: {
    port: 5176,
    host: true,
    strictPort: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
