#!/usr/bin/env node
/**
 * Post-build verification of `dist-lib/`.
 *
 * Every check prints `PASS`/`FAIL` lines and the script exits non-zero if any
 * check fails, so `npm run build:lib` cannot produce a tarball that is quietly
 * broken. Run standalone with `npm run verify:lib`.
 *
 * Checks:
 *   1. every declared subpath has a JS entry and a `.d.ts`
 *   2. no unresolved `@/` alias survives in any emitted `.js` / `.d.ts`
 *   3. package.json `exports` targets exist on disk, `files` is restrictive,
 *      `private` is still true and no registry publish config is present
 *   4. `styles.css` exists and every `url()` it references resolves inside dist-lib
 *   5. every Tailwind utility used by a shipped component is present in
 *      `styles.css` (i.e. consumers need no Tailwind scan of their own)
 *   6. Node can import the root entry and every subpath, and the runtime export
 *      names match `src/lib/entries.json`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'dist-lib')
const uiDir = path.join(root, 'src/components/ui')

let failures = 0
const ok = (msg) => console.log(`  PASS  ${msg}`)
const bad = (msg) => {
  failures += 1
  console.log(`  FAIL  ${msg}`)
}
const check = (condition, okMsg, failMsg) => (condition ? ok(okMsg) : bad(failMsg))

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const map = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/entries.json'), 'utf8'))
const subpathIds = Object.keys(map.subpaths).map((s) => s.replace(/^\.\//, ''))

console.log('\n[verify] 1. entry points')
check(fs.existsSync(path.join(outDir, 'index.js')), 'root JS entry dist-lib/index.js', 'missing dist-lib/index.js')
check(
  fs.existsSync(path.join(outDir, 'lib/index.d.ts')),
  'root declarations dist-lib/lib/index.d.ts',
  'missing dist-lib/lib/index.d.ts'
)
const missingJs = subpathIds.filter((id) => !fs.existsSync(path.join(outDir, `${id}.js`)))
const missingDts = subpathIds.filter((id) => !fs.existsSync(path.join(outDir, `components/ui/${id}.d.ts`)))
check(
  missingJs.length === 0,
  `${subpathIds.length} component JS entries present`,
  `missing JS entries: ${missingJs.join(', ')}`
)
check(
  missingDts.length === 0,
  `${subpathIds.length} component declaration entries present`,
  `missing .d.ts entries: ${missingDts.join(', ')}`
)

console.log('\n[verify] 2. no unresolved @/ aliases')
const emitted = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(js|d\.ts)$/.test(entry.name)) emitted.push(full)
  }
})(outDir)
const aliased = emitted.filter((f) => fs.readFileSync(f, 'utf8').includes('"@/'))
check(
  aliased.length === 0,
  `no @/ specifier in ${emitted.length} emitted JS/declaration files`,
  `@/ alias left in: ${aliased.map((f) => path.relative(root, f)).join(', ')}`
)

console.log('\n[verify] 3. package metadata')
const target = (value) => (typeof value === 'string' ? value : (value?.import ?? value?.default))
const exportTargets = Object.entries(pkg.exports ?? {}).map(([key, value]) => [
  key,
  target(value),
  target(typeof value === 'object' && !Array.isArray(value) ? (value.types ?? value) : value)
])
const brokenExports = exportTargets.filter(([, js, dts]) => {
  const jsMissing = !fs.existsSync(path.join(root, js.replace(/^\.\//, '')))
  const dtsMissing = dts && !fs.existsSync(path.join(root, dts.replace(/^\.\//, '')))
  return jsMissing || dtsMissing
})
check(
  Object.keys(pkg.exports ?? {}).length === subpathIds.length + 3,
  `exports map has ${Object.keys(pkg.exports ?? {}).length} entries (root, ${subpathIds.length} subpaths, styles.css, package.json)`,
  `unexpected exports entry count: ${Object.keys(pkg.exports ?? {}).length}`
)
check(
  brokenExports.length === 0,
  'every exports target resolves to a file on disk',
  `exports targets missing on disk: ${brokenExports.map(([k]) => k).join(', ')}`
)
check(pkg.private === true, 'private: true (publication guard for the local phase)', 'private is not true')
check(
  pkg.publishConfig === undefined,
  'no publishConfig (no registry destination configured)',
  `publishConfig present: ${JSON.stringify(pkg.publishConfig)}`
)
check(
  Array.isArray(pkg.files) && pkg.files.includes('dist-lib'),
  `files whitelist: ${JSON.stringify(pkg.files)}`,
  `files whitelist missing dist-lib: ${JSON.stringify(pkg.files)}`
)
check(
  pkg.peerDependencies?.react && pkg.peerDependencies?.['react-dom'],
  `react and react-dom are peer dependencies (${pkg.peerDependencies?.react} / ${pkg.peerDependencies?.['react-dom']})`,
  'react / react-dom are not peer dependencies'
)
check(
  pkg.sideEffects?.includes('**/styles.css') || pkg.sideEffects === true,
  `sideEffects preserves CSS: ${JSON.stringify(pkg.sideEffects)}`,
  `sideEffects would drop CSS: ${JSON.stringify(pkg.sideEffects)}`
)

console.log('\n[verify] 4. stylesheet assets')
const cssPath = path.join(outDir, 'styles.css')
if (!fs.existsSync(cssPath)) {
  bad('missing dist-lib/styles.css')
} else {
  ok('dist-lib/styles.css present')
  const css = fs.readFileSync(cssPath, 'utf8')
  const urls = [...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]))].filter(
    (u) => !u.startsWith('data:') && !u.startsWith('#')
  )
  const missing = urls.filter((u) => !fs.existsSync(path.join(outDir, u.replace(/^\.\//, ''))))
  check(
    missing.length === 0,
    `all ${urls.length} url() references in styles.css resolve inside dist-lib`,
    `unresolved CSS urls: ${missing.slice(0, 5).join(', ')}`
  )
  check(
    /IBM Plex Sans/.test(css) && /Host Grotesk/.test(css) && /Geist Mono/.test(css),
    'styles.css declares IBM Plex Sans, Host Grotesk and Geist Mono',
    'styles.css is missing one of the brand font families'
  )
  check(
    /--primary:/.test(css) && /\.dark/.test(css),
    'styles.css carries the theme tokens and the class-based dark variant',
    'styles.css is missing theme tokens or the .dark variant'
  )
  check(
    /--info:/.test(css) && /--favorite:/.test(css) && /\.text-info\{/.test(css) && /\.text-favorite\{/.test(css),
    'styles.css exposes info/favorite tokens and text utilities',
    'styles.css is missing info/favorite tokens or text utilities'
  )
}

console.log('\n[verify] 5. utility coverage in styles.css')
/** Escapes a Tailwind class the way the emitted CSS escapes its selector. */
const escapeClass = (cls) => cls.replace(/[^a-zA-Z0-9-_]/g, (c) => `\\${c}`)
/**
 * Candidate class names are taken only from *class positions* — `className={...}`
 * values and `cva(...)` arguments — so documentation URLs and prose in the files
 * cannot masquerade as class names. Object keys (`"icon-sm":`) are skipped by
 * looking at what follows the closing quote.
 */
const candidates = new Set()
const classPosition = (source) => {
  const spans = []
  const push = (from, to) => {
    if (to > from) spans.push(source.slice(from, to))
  }
  const balanced = (start, open, close) => {
    let depth = 0
    for (let i = start; i < source.length; i += 1) {
      if (source[i] === open) depth += 1
      else if (source[i] === close) {
        depth -= 1
        if (depth === 0) return i
      }
    }
    return source.length
  }
  for (const attr of source.matchAll(/className=(?=")/g)) {
    push(attr.index, attr.index + `className=`.length)
  }
  for (const attr of source.matchAll(/className=\{/g)) {
    const open = attr.index + `className=`.length
    push(open, balanced(open, '{', '}') + 1)
  }
  for (const call of source.matchAll(/\bcva\(/g)) {
    const open = call.index + 3
    push(open, balanced(open, '(', ')') + 1)
  }
  return spans
}
for (const file of fs.readdirSync(uiDir).sort()) {
  if (!file.endsWith('.tsx')) continue
  const source = fs.readFileSync(path.join(uiDir, file), 'utf8')
  // Strip comments so commented-out code (e.g. `// buttonVariants({ … size ?? "icon-sm" })`)
  // can never harvest phantom class tokens. Runs before class-position scanning.
  const code = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')
  for (const span of classPosition(code)) {
    for (const literal of span.matchAll(/"([^"\n]*)"|'([^'\n]*)'/g)) {
      const text = literal[1] ?? literal[2] ?? ''
      const after = span.slice(literal.index + literal[0].length)
      if (/^\s*:/.test(after)) continue // object key, e.g. `"icon-sm": "size-8"`
      if (/[-:]/.test(text) && !/[<>{}()="']/.test(text)) {
        for (const token of text.split(/\s+/)) {
          if (token && token.length <= 120 && /^[-[:a-z@[]/.test(token)) candidates.add(token)
        }
      }
    }
  }
}
if (!fs.existsSync(cssPath)) {
  bad('cannot check utility coverage: styles.css missing')
} else {
  const css = fs.readFileSync(cssPath, 'utf8')
  const missing = [...candidates].filter((c) => !css.includes(escapeClass(c))).sort()
  const showcaseAssets = path.join(root, 'dist/assets')
  const showcaseCss = fs.existsSync(showcaseAssets)
    ? fs
        .readdirSync(showcaseAssets)
        .filter((f) => /^index-.*\.css$/.test(f))
        .map((f) => fs.readFileSync(path.join(showcaseAssets, f), 'utf8'))
        .join('\n')
    : ''
  // A class missing from the packaged CSS but present in the showcase CSS would be
  // a packaging/scan-scope defect (consumers could not reproduce it). A class
  // missing from both is a pre-existing source-side class Tailwind v4 never
  // generates — out of scope here (component sources are read-only), reported only.
  const scanGap = missing.filter((c) => showcaseCss.includes(escapeClass(c)))
  const unsupported = missing.filter((c) => !showcaseCss.includes(escapeClass(c)))
  check(
    scanGap.length === 0,
    `all ${candidates.size - missing.length}/${candidates.size} Tailwind classes used by the shipped ` +
      `components are compiled into styles.css (consumers need no Tailwind scan)`,
    `classes present in the showcase CSS but missing from the packaged CSS: ${scanGap.join(' ')}`
  )
  check(
    unsupported.length === 0,
    `all Tailwind classes used by the shipped components resolve to generated CSS`,
    `${unsupported.length} class(es) are absent from the packaged CSS *and* from the ` +
      `showcase CSS, i.e. Tailwind v4 never generates them: ${unsupported.join(' ')}`
  )
}

console.log('\n[verify] 6. runtime exports (node import, no rendering)')
const expected = async (entry, spec) => {
  const mod = await import(pathToFileURL(path.join(outDir, entry)).href)
  const got = new Set(Object.keys(mod))
  // Type-only exports do not exist at runtime; they are covered by the consumer
  // `tsc --strict` run in `scripts/test-consumer.mjs`.
  const want = new Set(spec)
  const missing = [...want].filter((n) => !got.has(n))
  const extra = [...got].filter((n) => !want.has(n) && n !== 'default')
  return { missing, extra }
}
try {
  const res = await expected('index.js', [...map.root.values, 'cn'])
  check(
    res.missing.length === 0 && res.extra.length === 0,
    `root entry exports exactly the ${map.root.values.length} documented value names`,
    `root entry mismatch — missing: ${res.missing.slice(0, 8).join(', ')} extra: ${res.extra.slice(0, 8).join(', ')}`
  )
} catch (error) {
  bad(`root entry could not be imported by node: ${error.message}`)
}
let subpathProblems = []
for (const id of subpathIds) {
  const spec = map.subpaths[`./${id}`]
  try {
    const res = await expected(`${id}.js`, spec.values)
    if (res.missing.length || res.extra.length) {
      subpathProblems.push(`${id} (missing: ${res.missing.join(',')} extra: ${res.extra.join(',')})`)
    }
  } catch (error) {
    subpathProblems.push(`${id} (import failed: ${error.message})`)
  }
}
check(
  subpathProblems.length === 0,
  `all ${subpathIds.length} subpath entries import cleanly and export exactly their own value names`,
  `subpath export problems: ${subpathProblems.slice(0, 5).join(' | ')}`
)

console.log(failures === 0 ? `\n[verify] PASS — all checks green\n` : `\n[verify] FAIL — ${failures} check(s) failed\n`)
process.exit(failures === 0 ? 0 : 1)
