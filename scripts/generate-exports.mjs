#!/usr/bin/env node
/**
 * Generates the library's public API surface from `src/components/ui/*.tsx`.
 *
 * Outputs, all deterministic (no timestamps, sorted keys):
 *   - `src/lib/index.ts`  — root barrel with explicit named exports
 *   - `src/lib/entries.json` — machine-readable export map used by the build
 *
 * Collision policy: a name exported by more than one component is NOT re-exported
 * bare from the root (an ambiguous root export is a breaking API). It is exposed
 * under an explicit, stable alias instead — `createHandle` from `tooltip` becomes
 * `createTooltipHandle`. Per-component subpaths keep the original name because
 * they are unambiguous there. An unlisted collision is a hard error, so a newly
 * added component can never silently shadow a root export.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const uiDir = path.join(root, 'src/components/ui')
const libDir = path.join(root, 'src/lib')

/** Explicit aliases for names exported by more than one component. */
const COLLISION_ALIASES = {
  'alert-dialog:createHandle': 'createAlertDialogHandle',
  'dialog:createHandle': 'createDialogHandle',
  'drawer:createHandle': 'createDrawerHandle',
  'popover:createHandle': 'createPopoverHandle',
  'preview-card:createHandle': 'createPreviewCardHandle',
  'tooltip:createHandle': 'createTooltipHandle'
}

/** PascalCase prefix used when a component file name is not already a prefix. */
const ALIAS_PREFIX_OVERRIDES = {
  'alert-dialog': 'AlertDialog',
  'checkbox-group': 'CheckboxGroup',
  'context-menu': 'ContextMenu',
  'navigation-menu': 'NavigationMenu',
  'number-field': 'NumberField',
  'otp-field': 'OTPField',
  'preview-card': 'PreviewCard',
  'scroll-area': 'ScrollArea',
  'toggle-group': 'ToggleGroup'
}

function stripComments(source) {
  let out = ''
  let i = 0
  const n = source.length
  while (i < n) {
    const two = source.slice(i, i + 2)
    if (two === '//') {
      while (i < n && source[i] !== '\n') i += 1
    } else if (two === '/*') {
      i += 2
      while (i < n && source.slice(i, i + 2) !== '*/') i += 1
      i += 2
    } else {
      out += source[i]
      i += 1
    }
  }
  return out
}

/**
 * Extracts the exported names of one module, split into values and types.
 * Handles the export forms used in `src/components/ui`: named export blocks
 * (optionally `type`-only), `export const|function|class|type|interface`.
 */
function extractExports(file) {
  const source = stripComments(fs.readFileSync(path.join(uiDir, file), 'utf8'))
  const values = new Set()
  const types = new Set()

  const namedBlock = /export\s+(type\s+)?\{([^}]*)\}/g
  for (const match of source.matchAll(namedBlock)) {
    const blockIsType = Boolean(match[1])
    for (const raw of match[2].split(',')) {
      const entry = raw.trim().replace(/\s+/g, ' ')
      if (!entry) continue
      const parts = entry.split(' as ')
      const exported = (parts[1] ?? parts[0]).trim()
      const isType = blockIsType || parts[0].trim().startsWith('type ')
      if (isType) types.add(exported)
      else values.add(exported)
    }
  }

  const decl = /export\s+(?:declare\s+)?(const|function|class|async function|type|interface|enum)\s+([A-Za-z_$][\w$]*)/g
  for (const match of source.matchAll(decl)) {
    if (match[1] === 'type' || match[1] === 'interface') types.add(match[2])
    else values.add(match[2])
  }

  return { values: [...values].sort(), types: [...types].sort() }
}

const files = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith('.tsx'))
  .sort()

/** @type {Record<string, {values: string[], types: string[]}>} */
const modules = {}
for (const file of files) modules[file.replace(/\.tsx$/, '')] = extractExports(file)

// ---- collision detection -------------------------------------------------
const owners = new Map()
for (const [id, mod] of Object.entries(modules)) {
  for (const name of [...mod.values, ...mod.types]) {
    if (!owners.has(name)) owners.set(name, [])
    owners.get(name).push(id)
  }
}

const collisions = []
for (const [name, ids] of [...owners].sort()) {
  if (ids.length > 1) collisions.push({ name, modules: ids })
}

const unlisted = collisions.filter((c) => !c.modules.every((id) => COLLISION_ALIASES[`${id}:${c.name}`]))
if (unlisted.length > 0) {
  console.error(
    'Unmapped export collision(s); add an explicit alias to COLLISION_ALIASES:',
    JSON.stringify(unlisted, null, 2)
  )
  process.exit(1)
}

const aliasFor = (id, name) => COLLISION_ALIASES[`${id}:${name}`] ?? name
const pascal = (id) =>
  ALIAS_PREFIX_OVERRIDES[id] ??
  id
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')

// ---- root barrel ---------------------------------------------------------
const importBlocks = []
const rootValueLines = []
const rootTypeLines = []
const aliasNotes = []

/** `name` when unaliased, `name as alias` when this module's name collides. */
const specifier = (id, name) => {
  const alias = aliasFor(id, name)
  return alias === name ? name : `${name} as ${alias}`
}

for (const id of Object.keys(modules).sort()) {
  const mod = modules[id]
  const specifiers = [...mod.values, ...mod.types.map((n) => `type ${n}`)].map((n) =>
    specifier(id, n.replace(/^type /, ''))
  )
  if (specifiers.length === 0) continue
  importBlocks.push(`import {\n${specifiers.map((s) => `  ${s},`).join('\n')}\n} from "@/components/ui/${id}";`)
  for (const name of mod.values) {
    rootValueLines.push(`  ${aliasFor(id, name)},`)
    if (name !== aliasFor(id, name)) aliasNotes.push(`  ${id}: ${name} -> ${aliasFor(id, name)}`)
  }
  for (const name of mod.types) {
    rootTypeLines.push(`  ${aliasFor(id, name)},`)
    if (name !== aliasFor(id, name)) {
      aliasNotes.push(`  ${id}: type ${name} -> ${aliasFor(id, name)}`)
    }
  }
}

const header = `/**
 * Root entry for the \`skytrack-ui\` package.
 *
 * GENERATED by \`scripts/generate-exports.mjs\` — do not edit by hand. Run
 * \`npm run generate:exports\` after adding, renaming or removing a component.
 *
 * Every export is listed explicitly: there is no \`export *\` here, so the root
 * API is unambiguous and a new component cannot silently shadow a name.
 * Per-component subpaths (\`skytrack-ui/tooltip\`, \`skytrack-ui/button\`, ...)
 * export each component's own names unchanged.
 */

import { cn } from "@/lib/utils";
`

const banner = aliasNotes.length
  ? `\n/* Aliased because the same name is exported by more than one component:\n${[...new Set(aliasNotes)]
      .sort()
      .join('\n')}\n   Use the per-component subpath for the unaliased name. */\n`
  : ''

const barrel =
  header +
  banner +
  `\n${importBlocks.join('\n')}\n\nexport { cn };\n\nexport {\n${rootValueLines.join('\n')}\n};\n\nexport type {\n${rootTypeLines.join('\n')}\n};\n`

fs.mkdirSync(libDir, { recursive: true })
fs.writeFileSync(path.join(libDir, 'index.ts'), barrel)

// ---- machine-readable map ----------------------------------------------
const map = {
  $comment: 'GENERATED by scripts/generate-exports.mjs. Entry id -> public export names.',
  root: {
    values: rootValueLines.map((l) => l.trim().replace(/,$/, '')),
    types: rootTypeLines.map((l) => l.trim().replace(/,$/, ''))
  },
  aliases: Object.fromEntries(Object.entries(COLLISION_ALIASES).sort(([a], [b]) => a.localeCompare(b))),
  subpaths: Object.fromEntries(
    Object.keys(modules)
      .sort()
      .map((id) => [`./${id}`, { values: modules[id].values, types: modules[id].types, prefix: pascal(id) }])
  )
}
fs.writeFileSync(path.join(libDir, 'entries.json'), `${JSON.stringify(map, null, 2)}\n`)

const totalSub = Object.values(map.subpaths).reduce((n, m) => n + m.values.length + m.types.length, 0)
console.log(
  `generate-exports: ${modules && Object.keys(modules).length} components, ` +
    `${map.root.values.length} root values, ${map.root.types.length} root types, ` +
    `${totalSub} subpath exports, ${collisions.length} collisions aliased`
)
if (collisions.length) {
  console.log('collisions:', collisions.map((c) => c.name).join(', '))
}
