#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const uiDir = path.join(root, 'src/components/ui')
const specsPath = path.join(root, 'src/showcase/specs/component-specs.ts')

// 1. Collect all component files in src/components/ui/
const componentFiles = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith('.tsx') && !f.includes('.test.'))
  .map((f) => f.replace('.tsx', ''))
  .sort()

// 2. Read the spec module and extract the SPECS array
const specsContent = fs.readFileSync(specsPath, 'utf8')
const specsStart = specsContent.indexOf('export const SPECS: ComponentSpec[] = [')
if (specsStart === -1) {
  console.error('FAIL: Could not locate SPECS array in src/showcase/specs/component-specs.ts')
  process.exit(1)
}

const specsSlice = specsContent.slice(specsStart)
const specIds = [...specsSlice.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1])

const missingComponents = componentFiles.filter((id) => !specIds.includes(id))

const failures = []

if (missingComponents.length > 0) {
  failures.push(
    `component-specs.ts is missing ${missingComponents.length} component(s):\n  - ${missingComponents.join('\n  - ')}`
  )
}

// 3. Check for specific known size axes that must be present
const checkAxisIncludes = (compId, axisName, expectedValues) => {
  const compRegex = new RegExp(`id:\\s*['"]${compId}['"][\\s\\S]*?(?:states:|sizes:|note:)`, 'g')
  const match = compRegex.exec(specsContent)
  if (!match) return
  const block = match[0]
  for (const val of expectedValues) {
    if (!block.includes(`'${val}'`) && !block.includes(`"${val}"`)) {
      failures.push(`${compId}: axis "${axisName}" is missing expected value "${val}" in component-specs.ts`)
    }
  }
}

// Ensure control sizes (xs, sm, default, lg) are present where supported
checkAxisIncludes('input', 'size', ['xs', 'sm', 'default', 'lg'])
checkAxisIncludes('avatar', 'size', ['xs', 'sm', 'default', 'lg'])
checkAxisIncludes('combobox', 'size (input group)', ['xs', 'sm', 'default', 'lg'])
checkAxisIncludes('select', 'size (trigger)', ['xs', 'sm', 'default', 'lg'])
checkAxisIncludes('autocomplete', 'input size', ['xs', 'sm', 'default', 'lg'])
checkAxisIncludes('number-field', 'size', ['xs', 'sm', 'default', 'lg'])

// Shared button/toggle axes are derived from the component cva config at runtime.
// Guard the derivation instead of matching literal values that no longer exist.
for (const derived of [
  'Object.keys(buttonVariantConfig.variants.variant)',
  'Object.keys(buttonVariantConfig.variants.size)',
  'Object.keys(toggleVariantConfig.variants.variant)',
  'Object.keys(toggleVariantConfig.variants.size)'
]) {
  if (!specsContent.includes(derived)) {
    failures.push(`component-specs.ts must derive shared axes with ${derived}`)
  }
}

if (failures.length > 0) {
  console.error(`FAIL  Component API sync check failed (${failures.length} issue(s)):`)
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(
    `PASS  all ${componentFiles.length} UI components and their variant axes are registered in component-specs.ts`
  )
}
