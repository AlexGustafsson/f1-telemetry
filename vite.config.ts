import { resolve } from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'web',
  envPrefix: ['VITE_', 'TAURI_'],
  server: {
    port: 3000,
    strictPort: true,
  },
  clearScreen: false, // prevent vite from obscuring rust errors
  build: {
    target: ['es2021', 'chrome97', 'safari13'], // Tauri supports es2021
    minify: !process.env.TAURI_DEBUG, // don't minify for debug builds
    sourcemap: true,
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/web'),
    },
  },
})
