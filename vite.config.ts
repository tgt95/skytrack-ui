import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `BASE_PATH` lets the same config serve the GitHub Pages project site,
 * which is mounted at /<repo>/ instead of /. Local dev stays on "/".
 */
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      'skytrack-ui/styles.css': path.resolve(import.meta.dirname, 'src/index.css')
    }
  },
  build: { outDir: process.env.BUILD_OUT_DIR || 'dist' }
})
