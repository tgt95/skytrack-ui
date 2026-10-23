import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

/**
 * CSS-only library build: compiles `src/styles.css` into the single
 * `dist-lib/styles.css` file that consumers import once
 * (`import "skytrack-ui/styles.css"`).
 *
 * Kept separate from `vite.lib.config.ts` so the JavaScript entries stay free of
 * any CSS import — the package ships no JS-side style side effects, only the one
 * explicit CSS entry point.
 */

export default defineConfig({
  // Relative asset URLs: the package is consumed from arbitrary base paths
  // (a sub-path deployment, a file:// harness, a bundler with a custom base).
  base: './',
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist-lib',
    emptyOutDir: false,
    sourcemap: false,
    // A plain (non-lib) build with the stylesheet as the only input: Vite's lib
    // mode rejects a CSS-only entry. The generated JS chunk is discarded by
    // `scripts/build-lib.mjs`; only `styles.css` and its font assets are kept.
    rollupOptions: {
      input: { styles: 'src/styles.css' },
      output: {
        entryFileNames: 'styles.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        // The stylesheet keeps a stable, unhashed public path; font files are
        // content-hashed under `assets/`, and the `url()` references in
        // styles.css are rewritten to those emitted paths.
        assetFileNames: (asset) =>
          asset.names?.some((name) => name.endsWith('.css')) ? 'styles.css' : 'assets/[name]-[hash][extname]'
      }
    }
  }
})
