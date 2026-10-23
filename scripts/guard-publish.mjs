#!/usr/bin/env node
/**
 * Release guard — runs from `prepack`, so it covers both `npm pack` and any future
 * `npm publish` in this directory.
 *
 * It does NOT publish anything and never reads registry credentials or `.npmrc`.
 * Its only job is to make the current phase's intent enforceable:
 *
 *   - `private: true` must stay set. npm refuses to publish a private package, so
 *     this is the guard that keeps `skytrack-ui` local / internal-only until the
 *     owner decides the exact registry scope and identity.
 *   - no `publishConfig` (and therefore no registry or access level) may be
 *     configured. Registry + access level is an owner decision that is still open.
 *   - the library must actually be built and verified before a tarball is produced.
 *
 * To publish later, the owner must first choose the destination (e.g. a private or
 * restricted npm scope, or a GitHub Packages registry). For a *restricted* npm
 * scoped package npm additionally requires `"private": true` to be removed and the
 * package to be published with `--access restricted` under the org's paid plan —
 * both are deliberately NOT done here.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

const problems = []

if (pkg.private !== true) {
  problems.push(
    'package.json: "private" is not true. Removing it is an owner decision — it is what ' +
      'blocks registry publication. Do not remove it to publish; choose a destination first.'
  )
}
if (pkg.publishConfig !== undefined) {
  problems.push(
    `package.json: "publishConfig" is set (${JSON.stringify(pkg.publishConfig)}). No registry ` +
      'destination or access level is decided yet, so publishConfig must stay absent.'
  )
}
if (pkg.name !== 'skytrack-ui') {
  problems.push(`package.json: unexpected package name "${pkg.name}".`)
}
if (!fs.existsSync(path.join(root, 'dist-lib/index.js'))) {
  problems.push('dist-lib/index.js is missing — run `npm run build:lib` before packing.')
}

if (problems.length > 0) {
  console.error('[guard] REFUSING to pack:')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('[guard] private package, no publishConfig — packing for local/private use only.')
execFileSync(process.execPath, [path.join(root, 'scripts/verify-lib.mjs')], {
  stdio: 'inherit'
})
