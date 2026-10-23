#!/usr/bin/env node
/**
 * Builds the publishable library into `dist-lib/`.
 *
 * Steps, in order (each step fails the build loudly):
 *   1. wipe `dist-lib`
 *   2. regenerate `src/lib/index.ts` + `src/lib/entries.json` from the components
 *   3. Vite ESM build        -> `dist-lib/index.js` + `dist-lib/<component>.js`
 *   4. Vite CSS build        -> `dist-lib/styles.css` + `dist-lib/assets/*` (fonts)
 *   5. `tsc` declarations    -> `dist-lib` (.d.ts tree)
 *   6. rewrite `@/` aliases in the emitted `.d.ts` to relative paths
 *   7. verify the result     -> `scripts/verify-lib.mjs`
 *
 * The showcase build (`npm run build` -> `dist/`) is a separate Vite config and is
 * untouched by this script.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'dist-lib')
const bin = (name) => path.join(root, 'node_modules/.bin', name)

const steps = []
function step(label, fn) {
  process.stdout.write(`\n[build:lib] ${label}\n`)
  fn()
  steps.push(label)
}

step('clean dist-lib', () => {
  fs.rmSync(outDir, { recursive: true, force: true })
})

step('generate export map', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/generate-exports.mjs')], {
    stdio: 'inherit'
  })
})

step('bundle javascript (vite.lib.config.ts)', () => {
  execFileSync(bin('vite'), ['build', '--config', 'vite.lib.config.ts'], {
    cwd: root,
    stdio: 'inherit'
  })
})

step('compile stylesheet (vite.lib.css.config.ts)', () => {
  execFileSync(bin('vite'), ['build', '--config', 'vite.lib.css.config.ts'], {
    cwd: root,
    stdio: 'inherit'
  })
})

step('emit declarations (tsconfig.lib.json)', () => {
  execFileSync(bin('tsc'), ['-p', 'tsconfig.lib.json'], { cwd: root, stdio: 'inherit' })
})

/**
 * `tsc` does not rewrite `paths` aliases, so the six components that import
 * `buttonVariants` would ship a `.d.ts` still pointing at `@/components/ui/button`,
 * which no consumer can resolve. The emitted tree mirrors `src/`, so the fix is a
 * purely mechanical relative-path rewrite (`@/lib/utils` -> `../../lib/utils.js`).
 * `.js` is appended so the specifier also resolves under `moduleResolution: node16`.
 */
step('copy typesheet declaration', () => {
  fs.copyFileSync(path.join(root, 'types/styles.css.d.ts'), path.join(outDir, 'styles.css.d.ts'))
})

step('rewrite @/ aliases in declarations', () => {
  /** @type {string[]} */
  const rewritten = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.d.ts')) rewrite(full)
    }
  }
  const rewrite = (file) => {
    const before = fs.readFileSync(file, 'utf8')
    if (!before.includes('"@/')) return
    const after = before.replace(/(["'])@\/([^"']+)\1/g, (_match, quote, target) => {
      const targetFile = path.join(outDir, `${target}.d.ts`)
      if (!fs.existsSync(targetFile)) {
        throw new Error(
          `${path.relative(root, file)}: alias "@/${target}" has no emitted declaration ` +
            `(${path.relative(root, targetFile)} missing) — cannot build a resolvable .d.ts`
        )
      }
      let rel = path.relative(path.dirname(file), targetFile).replace(/\.d\.ts$/, '.js')
      if (!rel.startsWith('.')) rel = `./${rel}`
      return `${quote}${rel}${quote}`
    })
    fs.writeFileSync(file, after)
    rewritten.push(path.relative(root, file))
  }
  walk(outDir)
  console.log(`  rewrote ${rewritten.length} declaration file(s):`)
  for (const file of rewritten) console.log(`    ${file}`)
})

step('verify dist-lib', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/verify-lib.mjs')], {
    stdio: 'inherit'
  })
})

console.log(`\n[build:lib] done — ${steps.length} steps, output in dist-lib/`)
