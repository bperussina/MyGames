import { defineConfig } from 'vite';

export default defineConfig({
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
