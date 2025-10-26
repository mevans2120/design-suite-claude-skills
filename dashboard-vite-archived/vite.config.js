import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  server: {
    port: 3000,
    fs: {
      // Allow serving files from one level up (the project root)
      allow: ['..']
    }
  }
});
