#!/usr/bin/env node
/**
 * Publishes the static site to the `gh-pages` branch, which GitHub Pages serves
 * at https://<owner>.github.io/<repo>/.
 *
 *   1. `build:site`            -> site/
 *   2. copy site/ into a temp git repo
 *   3. commit and force-push   -> origin/gh-pages
 *
 * The branch holds build output only; `main` keeps the source. A CI variant of
 * this deploy lives in the README (needs a token with the `workflow` scope).
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = path.join(root, 'site')
const npm = (args, options = {}) => execFileSync('npm', args, { cwd: root, stdio: 'inherit', ...options })
const git = (args, cwd, options = {}) => execFileSync('git', args, { cwd, stdio: 'inherit', ...options })

npm(['run', 'build:site'])

const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).trim()
const branch = process.env.PAGES_BRANCH || 'gh-pages'
const publishDir = fs.mkdtempSync(path.join(os.tmpdir(), 'skytrack-ui-pages-'))

process.stdout.write(`\n[deploy:pages] publish ${path.relative(root, siteDir)}/ -> ${remote} ${branch}\n`)

fs.cpSync(siteDir, publishDir, { recursive: true })

git(['init', '-q'], publishDir)
git(['add', '-A', '-f'], publishDir)
git(
  [
    '-c',
    'user.name=skytrack-ui deploy',
    '-c',
    'user.email=deploy@localhost',
    'commit',
    '-q',
    '-m',
    `Deploy static site from ${new Date().toISOString()}`
  ],
  publishDir
)
git(['push', '--force', remote, `HEAD:refs/heads/${branch}`], publishDir)

fs.rmSync(publishDir, { recursive: true, force: true })

process.stdout.write(`\n[deploy:pages] done\n`)
