#!/usr/bin/env node
/**
 * Architecture guardrails for the skytrack-ui package.
 *
 * Enforces the rules the package actually relies on:
 *   1. File-size budgets never grow beyond the recorded baseline.
 *   2. No import cycles between files in src/components/ui.
 *   3. UI components and src/lib never import the showcase or demos.
 *   4. No deep imports under @/components/ui/<name>/...
 *
 * Run `node scripts/architecture-guardrails.cjs --self-test` to prove the
 * checks catch the three negative fixtures.
 */
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const baselinePath = path.join(root, 'agents', 'file-size-baseline.json')

function listSourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listSourceFiles(full)
    return /\.(ts|tsx|css)$/.test(entry.name) ? [full] : []
  })
}

function toRelative(file) {
  return path.relative(root, file).split(path.sep).join('/')
}

function parseImports(source) {
  const imports = new Set()
  const patterns = [/from\s+['"]([^'"]+)['"]/g, /import\s+['"]([^'"]+)['"]/g, /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g]
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) imports.add(match[1])
  }
  return [...imports]
}

function resolveFromFile(file, specifier) {
  if (specifier.startsWith('@/')) return `src/${specifier.slice(2)}`
  if (!specifier.startsWith('.')) return null
  return path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
}

function uiId(file) {
  const match = /^src\/components\/ui\/([^/]+?)(?:\.tsx)?$/.exec(file)
  return match ? match[1] : null
}

function hasCycle(edges) {
  const state = new Map()
  const stack = []
  let found = null

  function visit(id) {
    if (found) return
    if (state.get(id) === 'visiting') {
      const start = stack.indexOf(id)
      found = [...stack.slice(start), id]
      return
    }
    if (state.get(id) === 'done') return
    state.set(id, 'visiting')
    stack.push(id)
    for (const next of edges.get(id) ?? []) visit(next)
    stack.pop()
    state.set(id, 'done')
  }

  for (const id of edges.keys()) visit(id)
  return found
}

function analyze({ files, baseline }) {
  const failures = []
  const exclusions = new Set(baseline.exclude ?? [])
  const edges = new Map()

  for (const file of files) {
    const relative = file.path
    if (exclusions.has(relative) || relative.endsWith('.test.tsx')) continue

    const lines = file.content.split(/\r?\n/).length
    const budget = baseline.thresholds[relative] ?? baseline.defaultMaxLines
    if (lines > budget) {
      failures.push(`${relative}: ${lines} lines exceeds the ${budget}-line budget`)
    }

    const id = uiId(relative)
    if (id) {
      const targets = new Set()
      for (const specifier of parseImports(file.content)) {
        const resolved = resolveFromFile(relative, specifier)
        const target = resolved ? uiId(resolved) : null
        if (target) targets.add(target)
      }
      edges.set(id, targets)
    }
  }

  const cycle = hasCycle(edges)
  if (cycle) failures.push(`import cycle between UI components: ${cycle.join(' -> ')}`)

  for (const file of files) {
    const relative = file.path
    const isUi = relative.startsWith('src/components/ui/')
    const isLib = relative.startsWith('src/lib/')
    if (!isUi && !isLib) continue

    for (const specifier of parseImports(file.content)) {
      const resolved = resolveFromFile(relative, specifier)
      if (resolved && /^src\/(showcase|demos)(\/|$)/.test(resolved)) {
        failures.push(`${relative}: must not import ${resolved}`)
      }
      if (/^@\/components\/ui\/[^'"]+\//.test(specifier)) {
        failures.push(`${relative}: deep import ${specifier}; use the public component module`)
      }
    }
  }

  return failures
}

function loadRepository() {
  const files = listSourceFiles(path.join(root, 'src')).map((file) => ({
    path: toRelative(file),
    content: fs.readFileSync(file, 'utf8')
  }))
  return { files, baseline: JSON.parse(fs.readFileSync(baselinePath, 'utf8')) }
}

function fixture(path, content) {
  return { path, content }
}

function runSelfTest() {
  const baseline = { defaultMaxLines: 500, thresholds: {}, exclude: [] }
  const cases = [
    {
      name: 'import cycle',
      files: [
        fixture('src/components/ui/a.tsx', "import { B } from '@/components/ui/b'"),
        fixture('src/components/ui/b.tsx', "import { A } from '@/components/ui/a'")
      ],
      expected: /import cycle/
    },
    {
      name: 'wrong layer',
      files: [fixture('src/components/ui/a.tsx', "import { x } from '@/showcase/demo'")],
      expected: /must not import src\/showcase/
    },
    {
      name: 'deep import',
      files: [fixture('src/components/ui/a.tsx', "import { x } from '@/components/ui/button/parts'")],
      expected: /deep import/
    }
  ]

  let failed = 0
  for (const testCase of cases) {
    const failures = analyze({ files: testCase.files, baseline })
    if (!failures.some((failure) => testCase.expected.test(failure))) {
      failed += 1
      console.error(`FAIL  self-test ${testCase.name} was not caught`)
    } else {
      console.log(`PASS  self-test ${testCase.name}`)
    }
  }
  if (failed) process.exitCode = 1
}

if (process.argv.includes('--self-test')) {
  runSelfTest()
} else {
  const failures = analyze(loadRepository())
  if (failures.length) {
    console.error(failures.map((failure) => `FAIL  ${failure}`).join('\n'))
    process.exitCode = 1
  } else {
    console.log('PASS  file-size budgets, import cycles, layer boundaries and deep imports')
  }
}
