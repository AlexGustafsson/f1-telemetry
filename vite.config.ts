import { resolve } from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    target: ['es2021', 'chrome97', 'safari13'],
    minify: false,
    sourcemap: true,
    outDir: '../internal/web/static',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/frontend'),
    },
  },
})
