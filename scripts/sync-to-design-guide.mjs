#!/usr/bin/env node
import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const sourceDir = path.resolve(import.meta.dirname, '..')
const targetDir = path.resolve(sourceDir, '../skytrack-design-guide')

if (!fs.existsSync(targetDir)) {
  console.error(`Error: Target directory not found at ${targetDir}`)
  process.exit(1)
}

// 1. Root files that belong to the shared package setup
const rootFiles = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.lib.json',
  'vite.config.ts',
  'vite.lib.config.ts',
  'vite.lib.css.config.ts',
  'vitest.config.ts',
  'index.html',
  '.prettierrc',
  '.gitignore',
  'README.md',
  'AGENTS.md'
]

// 2. Specific matching folders to sync
// Guarantees only identical named folders are synced, and target-only folders/files are NEVER deleted.
const matchingFolders = [
  { folder: 'src', exclude: [] },
  { folder: 'public', exclude: [] },
  { folder: 'types', exclude: [] },
  { folder: '.storybook', exclude: [] },
  { folder: '.vscode', exclude: [] },
  { folder: 'draft', exclude: [] },
  { folder: 'docs', exclude: ['PRESENTATIONS.md'] },
  { folder: 'scripts', exclude: ['export-design.mjs', 'sync-to-design-guide.mjs'] },
  { folder: 'skills/skytrack-ui', exclude: [] },
  { folder: 'skills/archive', exclude: [] }
]

console.log('--- Selective Dual-Repository Sync ---')
console.log(`Source: ${sourceDir}`)
console.log(`Target: ${targetDir}\n`)

try {
  // Sync matching root files
  console.log('[1/3] Syncing root configuration files...')
  for (const file of rootFiles) {
    const srcFile = path.join(sourceDir, file)
    const tgtFile = path.join(targetDir, file)
    if (fs.existsSync(srcFile)) {
      execSync(`rsync -u "${srcFile}" "${tgtFile}"`)
    }
  }

  // Sync matching folders
  console.log('[2/3] Syncing matching folders...')
  for (const { folder, exclude } of matchingFolders) {
    const srcPath = path.join(sourceDir, folder)
    const tgtPath = path.join(targetDir, folder)

    if (!fs.existsSync(srcPath)) continue

    fs.mkdirSync(tgtPath, { recursive: true })

    const excludeArgs = exclude.map((e) => `--exclude="${e}"`).join(' ')
    const cmd = `rsync -av --delete ${excludeArgs} "${srcPath}/" "${tgtPath}/"`
    execSync(cmd, { stdio: 'inherit' })
  }

  // Sync optional skills if they exist in source (non-destructive update only)
  console.log('[3/3] Checking skill files...')
  const skillsToCheck = ['skytrack-visuals']
  for (const skill of skillsToCheck) {
    const srcSkill = path.join(sourceDir, 'skills', skill)
    const tgtSkill = path.join(targetDir, 'skills', skill)
    if (fs.existsSync(srcSkill)) {
      fs.mkdirSync(tgtSkill, { recursive: true })
      execSync(`rsync -av "${srcSkill}/" "${tgtSkill}/"`, { stdio: 'inherit' })
    }
  }

  // Sync skills/README.md
  const srcSkillsReadme = path.join(sourceDir, 'skills/README.md')
  const tgtSkillsReadme = path.join(targetDir, 'skills/README.md')
  if (fs.existsSync(srcSkillsReadme)) {
    execSync(`rsync -u "${srcSkillsReadme}" "${tgtSkillsReadme}"`)
  }

  console.log('\n[SUCCESS] Sync complete! All target-specific folders and files are preserved.')
  console.log(
    'Next step: Switch to tab "skytrack-design-guide" in Fork to review, commit as tuantrinhatskytrack, and push.'
  )
} catch (err) {
  console.error('[ERROR] Sync failed:', err.message)
  process.exit(1)
}
