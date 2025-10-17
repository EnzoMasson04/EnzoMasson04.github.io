import { defineConfig } from 'vite';
export default defineConfig({
  cacheDir: '.vite',
  optimizeDeps: { force: true },
  server: { port: 5173, open: true }
});