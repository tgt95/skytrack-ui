#!/usr/bin/env node
/**
 * Builds the static GitHub Pages site into `site/`:
 *
 *   site/                      Storybook (component explorer, docs, a11y panel)
 *   site/showcase/             Showcase app (`vite build`)
 *   site/.nojekyll             keep paths such as `_assets` served by Pages
 *
 * The project site lives at /<repo>/ on GitHub Pages, so every asset URL needs
 * that prefix. Storybook already emits relative URLs; the showcase needs
 * `BASE_PATH`. Override with BASE_PATH=/ for a root-domain deploy.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'site')
const base = process.env.BASE_PATH || '/skytrack-ui/'
const bin = (name) => path.join(root, 'node_modules/.bin', name)

function step(label, fn) {
  process.stdout.write(`\n[build:site] ${label}\n`)
  fn()
}

step(`clean ${path.relative(root, outDir)}`, () => {
  fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })
})

step('storybook build -> site/', () => {
  execFileSync(bin('storybook'), ['build', '--quiet', '--output-dir', outDir], {
    cwd: root,
    stdio: 'inherit'
  })
})

step(`showcase build -> site/showcase/ (base ${base}showcase/)`, () => {
  execFileSync(bin('vite'), ['build'], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      BASE_PATH: `${base.replace(/\/?$/, '/')}showcase/`,
      BUILD_OUT_DIR: path.join(outDir, 'showcase')
    }
  })
})

step('write .nojekyll', () => {
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '')
})

process.stdout.write(`\n[build:site] done -> ${path.relative(root, outDir)}/\n`)
