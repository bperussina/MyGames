import { defineConfig } from 'vite';

const ghPages = process.env.GH_PAGES === '1';

export default defineConfig({
  base: ghPages ? './' : '/',
  root: '.',
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
