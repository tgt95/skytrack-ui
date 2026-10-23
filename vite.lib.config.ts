import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * ESM library build (JavaScript only).
 *
 * Entry names are the package's public subpaths: `index` for the root barrel and
 * one flat entry per component (`button`, `tooltip`, ...), generated from
 * `src/lib/entries.json`. Type declarations are emitted separately by
 * `tsc -p tsconfig.lib.json`; `scripts/build-lib.mjs` runs both and then rewrites
 * `@/` aliases in the emitted `.d.ts` files.
 *
 * Nothing is minified and no sourcemap is emitted: the output is meant to be read
 * when debugging a consumer app, and shipping sourcemaps would embed component
 * source (`sourcesContent`) in the tarball.
 */

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')) as {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}
const exportMap = JSON.parse(fs.readFileSync('src/lib/entries.json', 'utf8')) as {
  subpaths: Record<string, unknown>
}

/** React, the JSX runtimes and every runtime dependency stay external so a
 * consumer never ends up with a second copy of React or of a shared dependency. */
const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  'react/jsx-runtime',
  'react/jsx-dev-runtime'
]

const entry: Record<string, string> = { index: 'src/lib/index.ts' }
for (const subpath of Object.keys(exportMap.subpaths).sort()) {
  const name = subpath.replace(/^\.\//, '')
  entry[name] = `src/components/ui/${name}.tsx`
}

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  build: {
    outDir: 'dist-lib',
    emptyOutDir: false,
    minify: false,
    sourcemap: false,
    target: 'es2022',
    lib: {
      entry,
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: (id) => external.includes(id) || [...external].some((dep) => id.startsWith(`${dep}/`)),
      output: {
        // Subpath entry files stay flat and predictable; anything shared between
        // two components lands in a single chunk.
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})
