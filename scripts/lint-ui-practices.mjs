#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'src')
const failures = []

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}

function collectSources(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectSources(fullPath)
    return /\.[jt]sx?$/.test(entry.name) ? [fullPath] : []
  })
}

const stripCommentsAndStrings = (source) =>
  source
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1 ')
    .replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, ' ')

for (const file of collectSources(src)) {
  const source = fs.readFileSync(file, 'utf8')
  const relative = path.relative(root, file)
  const code = stripCommentsAndStrings(source)

  if (relative.startsWith('src/components/ui/') && /(?:\bas\s+any\b|(?:[:,<=]\s*)any\b)/.test(code)) {
    failures.push(`${relative}: remove explicit any types from component APIs`)
  }
  if (
    relative !== 'src/lib/index.ts' &&
    /import\s*\{[^}]*\bfocusRing\b[^}]*\}\s*from\s*['"]@\/components\/ui\/button['"]/s.test(source)
  ) {
    failures.push(`${relative}: import focusRing from @/lib/focus-ring, not Button`)
  }
  if (/from\s*['"]@\/components\/ui\/control-sizes['"]/.test(source)) {
    failures.push(`${relative}: import control sizes from @/lib/control-sizes`)
  }
  if (/className\s*=\s*\{\s*`[^`]*\$\{[^}]*&&[^}]*\}[^`]*`/s.test(source)) {
    failures.push(`${relative}: use cn() for conditional classes; template interpolation can emit "false"`)
  }
  if (/<a\b[^>]*\baria-hidden\s*=\s*(['"])true\1[^>]*>/is.test(source)) {
    failures.push(`${relative}: do not hide a link from the accessibility tree`)
  }
}

for (const component of ['popover', 'preview-card', 'navigation-menu', 'toast']) {
  const relative = `src/components/ui/${component}.tsx`
  const source = read(relative)
  if (!source.includes("from '@/lib/popup-arrow'") || /viewBox=['"]0 0 20 10['"]/.test(source)) {
    failures.push(`${relative}: reuse the shared popup arrow glyph`)
  }
}

// Every UI component ships one knowledge guide. Keep the two sets in lockstep so
// a new component cannot land without the documentation agents read.
const uiDir = path.join(src, 'components', 'ui')
const guideDir = path.join(root, 'skills', 'skytrack-ui', 'references', 'knowledge', 'components')
const componentIds = fs
  .readdirSync(uiDir)
  .filter((file) => file.endsWith('.tsx') && !file.includes('.test.'))
  .map((file) => file.replace(/\.tsx$/, ''))
  .sort()
const guideIds = fs
  .readdirSync(guideDir)
  .filter((file) => file.endsWith('.md') && file !== '_template.md')
  .map((file) => file.replace(/\.md$/, ''))
  .sort()

for (const id of componentIds.filter((id) => !guideIds.includes(id))) {
  failures.push(
    `skills/skytrack-ui/references/knowledge/components/${id}.md: missing guide for src/components/ui/${id}.tsx`
  )
}
for (const id of guideIds.filter((id) => !componentIds.includes(id))) {
  failures.push(
    `skills/skytrack-ui/references/knowledge/components/${id}.md: guide has no matching src/components/ui/${id}.tsx`
  )
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL  ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log('PASS  audited accessibility, shared-helper, type-safety, and class-name rules')
}
