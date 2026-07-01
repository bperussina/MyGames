import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    open: false,
  },
  preview: {
    host: '0.0.0.0',
    strictPort: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
