import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' => works on GitHub Pages under /new-portfolio/ and on any host
export default defineConfig({
  base: '/new-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'docs',
    chunkSizeWarningLimit: 800
  },
});
