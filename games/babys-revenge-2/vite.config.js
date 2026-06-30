import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5176,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
