/**
 * Generates the theme CSS from the SkyTrack brand token JSON.
 *
 * Source : src/theme/skytrack-brand-tokens-v4.json
 * Output : src/theme/tokens.css      (raw values, light + dark)
 *          src/theme/theme-map.css   (Tailwind v4 `@theme inline` wiring)
 *
 * Run: npm run generate:tokens
 *
 * Rules encoded here:
 * - Colors are written as oklch, converted from the JSON hex values.
 * - The JSON semantic layer only defines dark values. Light values are derived
 *   from the same ramps; every derived value is marked `derived` in a comment.
 * - `input.border.light` is fully transparent in the JSON. The library needs a
 *   visible field boundary, so `--input` is a derived 12% black while the raw
 *   JSON value is still emitted as `--sem-input-border-light`.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'src/theme/skytrack-brand-tokens-v4.json')
const tokensOut = path.join(root, 'src/theme/tokens.css')
const themeOut = path.join(root, 'src/theme/theme-map.css')

const json = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const brand = json.brand.skytrack
const color = brand.color

/* ------------------------------------------------------------------ colors */

const HEX = /^#([0-9a-fA-F]{3,8})$/

function hexToOklch(hex) {
  let h = hex.replace('#', '')
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  let alpha = 1
  if (h.length === 8) {
    alpha = parseInt(h.slice(6, 8), 16) / 255
    h = h.slice(0, 6)
  }
  const srgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const linear = srgb.map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  const [r, g, b] = linear
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const C = Math.hypot(a, bb)
  let H = (Math.atan2(bb, a) * 180) / Math.PI
  if (H < 0) H += 360
  if (C < 0.0005) H = 0
  const fmt = (n, d = 2) => Number(n.toFixed(d))
  const base = `oklch(${fmt(L * 100, 1)}% ${fmt(C, 3)} ${fmt(H)})`
  return alpha < 1 ? base.replace(')', ` / ${fmt(alpha, 3)})`) : base
}

function resolveColor(value, seen = new Set()) {
  if (typeof value !== 'string') throw new Error(`Not a color value: ${JSON.stringify(value)}`)
  if (HEX.test(value)) return value
  if (!value.startsWith('color.')) throw new Error(`Unknown color reference: ${value}`)
  if (seen.has(value)) throw new Error(`Circular color reference: ${[...seen, value].join(' -> ')}`)
  seen.add(value)
  const parts = value.split('.').slice(1)
  let node = color
  for (const part of parts) {
    node = node?.[part]
    if (node == null) throw new Error(`Missing color token: ${value}`)
  }
  return resolveColor(node, seen)
}

const hex = (value) => resolveColor(value)
const oklch = (value) => hexToOklch(resolveColor(value))

/* Value kinds used in the mapping tables below. */
const R = (rampPath) => ({ kind: 'ramp', path: rampPath })
const S = (semanticPath) => ({ kind: 'semantic', path: semanticPath })
const L = (value) => ({ kind: 'literal', value })
const A = (value, alpha) => ({ kind: 'alpha', value, alpha })

const varName = (prefix, dotted) => `--${prefix ? `${prefix}-` : ''}${dotted.replace(/\./g, '-')}`

function render(spec) {
  if (spec.kind === 'ramp') return `var(${varName('', spec.path)})`
  if (spec.kind === 'semantic') return `var(${varName('sem', spec.path)})`
  if (spec.kind === 'literal') return hexToOklch(spec.value)
  if (spec.kind === 'alpha') {
    const o = hexToOklch(spec.value).replace(/\s*\/.*$/, '')
    return `${o.replace(')', ` / ${Number(spec.alpha.toFixed(3))})`)}`
  }
  throw new Error(`Unknown spec: ${JSON.stringify(spec)}`)
}

/* -------------------------------------------------------------- ramp output */

const RAMPS = ['brand', 'brand-alt', 'teal', 'amber', 'red', 'blue', 'gray']
const ALIAS_RAMPS = ['neutral', 'success', 'warning', 'critical', 'info', 'link']

function rampLines() {
  const lines = []
  for (const ramp of RAMPS) {
    for (const [step, value] of Object.entries(color[ramp])) {
      lines.push(`  --${ramp}-${step}: ${oklch(value)};`)
    }
  }
  for (const ramp of ALIAS_RAMPS) {
    for (const [step, value] of Object.entries(color[ramp])) {
      lines.push(`  --${ramp}-${step}: var(${varName('', value.replace(/^color\./, ''))});`)
    }
  }
  for (const [key, value] of Object.entries(color.black)) lines.push(`  --black-${key}: ${oklch(value)};`)
  for (const [key, value] of Object.entries(color.white)) lines.push(`  --white-${key}: ${oklch(value)};`)
  return lines
}

/* ----------------------------------------------------- semantic dark (JSON) */

function flattenColorNode(node, prefix, out) {
  for (const [key, value] of Object.entries(node)) {
    const dotted = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') out.push([dotted, value])
    else flattenColorNode(value, dotted, out)
  }
  return out
}

const darkSemantic = new Map()
for (const group of ['surface', 'text', 'icon', 'border', 'accent']) {
  for (const [dotted, value] of flattenColorNode(color.semantic[group], group, [])) {
    darkSemantic.set(dotted, oklch(value))
  }
}
for (const [dotted, value] of flattenColorNode(color.component.button, 'component.button', [])) {
  darkSemantic.set(dotted, oklch(value))
}

/* -------------------------------------------------- semantic light (derived) */

const lightSemanticSpecs = {
  'surface.base': L('#FFFFFF'),
  'surface.primary': R('brand-alt.50'),
  'surface.secondary': R('brand-alt.100'),
  'surface.tertiary': R('brand-alt.150'),
  'surface.cont': R('brand-alt.200'),
  'surface.cont-secondary': R('brand-alt.200'),
  'surface.alpha': A('#000000', 0.04),
  'surface.alpha-bold': A('#000000', 0.06),
  'surface.alpha-bolder': A('#000000', 0.1),
  'surface.brand': R('brand.500'),
  'surface.critical': R('red.50'),
  'surface.critical-alt': R('red.500'),
  'surface.warning': R('amber.50'),
  'surface.success': R('teal.50'),
  'surface.success-alt': R('teal.500'),
  'surface.info-alt': R('blue.500'),
  'surface.disabled': R('brand-alt.100'),
  'surface.primary-sta': L('#FFFFFF'),

  'text.primary': R('brand-alt.950'),
  'text.secondary': R('brand-alt.600'),
  'text.tertiary': R('brand-alt.500'),
  'text.disabled': R('brand-alt.300'),
  'text.brand': R('brand.600'),
  'text.success': R('teal.700'),
  'text.critical': R('red.600'),
  'text.warning': R('amber.700'),
  'text.primary-ist': L('#FFFFFF'),
  'text.primary-sta': R('brand-alt.950'),

  'icon.primary': R('brand-alt.950'),
  'icon.secondary': R('brand-alt.600'),
  'icon.tertiary': R('brand-alt.500'),
  'icon.disabled': R('brand-alt.300'),
  'icon.brand': R('brand.600'),
  'icon.brand-hover': R('brand.700'),
  'icon.success': R('teal.600'),
  'icon.warning': R('amber.600'),
  'icon.primary-ist': L('#FFFFFF'),

  'border.base': A('#000000', 0.1),
  'border.subtle': A('#000000', 0.06),
  'border.bold': A('#000000', 0.15),
  'border.bolder': A('#000000', 0.25),
  'border.brand-hover': R('brand.600'),
  'border.outer-cont-secondary': R('brand-alt.200'),

  'accent.brand.bolder': R('brand.700'),

  'component.button.primary.fill': R('brand.500'),
  'component.button.primary.text': L('#FFFFFF'),
  'component.button.primary.icon': L('#FFFFFF'),
  'component.button.secondary.fill': R('brand-alt.100'),
  'component.button.secondary.text': R('brand-alt.950'),
  'component.button.ghost-secondary.icon': R('brand-alt.950'),
  'component.button.outline-secondary.border': A('#000000', 0.15),
  'component.button.white.fill': L('#FFFFFF'),
  'component.button.critical.fill': R('red.500')
}

function semanticLines(values, mode) {
  const lines = []
  for (const [key, value] of values) {
    const path = key.replace(/^component\.button\./, 'component.button.')
    lines.push(`  --sem-${path.replace(/\./g, '-')}: ${value};`)
  }
  return lines
}

/* -------------------------------------------------------------- UI aliases */

const lightAliases = {
  background: S('surface.base'),
  foreground: S('text.primary'),
  card: S('surface.base'),
  'card-foreground': S('text.primary'),
  popover: S('surface.base'),
  'popover-foreground': S('text.primary'),
  primary: R('brand.500'),
  'primary-foreground': S('component.button.primary.text'),
  secondary: S('surface.secondary'),
  'secondary-foreground': S('text.primary'),
  muted: S('surface.primary'),
  'muted-foreground': S('text.tertiary'),
  accent: S('surface.tertiary'),
  'accent-foreground': S('text.primary'),
  destructive: R('red.700'),
  'destructive-foreground': L('#FFFFFF'),
  'input-fill': S('input.fill.light'),
  border: A('#000000', 0.1),
  input: A('#000000', 0.12),
  ring: R('brand.500'),
  overlay: L('#000000'),
  'chart-1': R('brand.500'),
  'chart-2': R('blue.500'),
  'chart-3': R('teal.500'),
  'chart-4': R('amber.500'),
  'chart-5': R('brand.300'),
  success: R('teal.700'),
  'success-foreground': L('#FFFFFF'),
  warning: R('amber.700'),
  'warning-foreground': L('#FFFFFF'),
  info: R('blue.600'),
  'info-foreground': L('#FFFFFF'),
  favorite: R('amber.500'),
  sidebar: S('surface.primary'),
  'sidebar-foreground': S('text.primary'),
  'sidebar-primary': R('brand.500'),
  'sidebar-primary-foreground': S('component.button.primary.text'),
  'sidebar-accent': S('surface.tertiary'),
  'sidebar-accent-foreground': S('text.primary'),
  'sidebar-border': A('#000000', 0.08),
  'sidebar-ring': R('brand.500')
}

const darkAliases = {
  background: S('surface.base'),
  foreground: S('text.primary'),
  card: S('surface.primary'),
  'card-foreground': S('text.primary'),
  popover: S('surface.secondary'),
  'popover-foreground': S('text.primary'),
  primary: R('brand.500'),
  'primary-foreground': S('component.button.primary.text'),
  secondary: S('component.button.secondary.fill'),
  'secondary-foreground': S('text.primary'),
  muted: S('surface.tertiary'),
  'muted-foreground': S('text.secondary'),
  accent: S('surface.cont'),
  'accent-foreground': S('text.primary'),
  destructive: S('text.critical'),
  'destructive-foreground': L('#FFFFFF'),
  'input-fill': S('input.fill.dark'),
  border: S('border.base'),
  input: S('component.button.outline-secondary.border'),
  ring: R('brand.400'),
  overlay: S('surface.base'),
  'chart-1': R('brand.400'),
  'chart-2': R('blue.400'),
  'chart-3': R('teal.400'),
  'chart-4': R('amber.400'),
  'chart-5': R('brand.250'),
  success: S('text.success'),
  'success-foreground': R('brand-alt.950'),
  warning: S('text.warning'),
  'warning-foreground': R('brand-alt.950'),
  info: S('surface.info-alt'),
  'info-foreground': R('brand-alt.950'),
  favorite: R('amber.400'),
  sidebar: S('surface.primary'),
  'sidebar-foreground': S('text.primary'),
  'sidebar-primary': R('brand.500'),
  'sidebar-primary-foreground': S('component.button.primary.text'),
  'sidebar-accent': S('surface.cont'),
  'sidebar-accent-foreground': S('text.primary'),
  'sidebar-border': S('border.base'),
  'sidebar-ring': R('brand.400')
}

/* ------------------------------------------------- typography, unit, effect */

function typographyLines() {
  const lines = []
  for (const [name, family] of Object.entries(brand.font.family)) {
    lines.push(`  --font-family-${name}: '${family}';`)
  }
  for (const [group, weights] of Object.entries(brand.font.weight)) {
    for (const [name, value] of Object.entries(weights)) lines.push(`  --font-weight-${group}-${name}: ${value};`)
  }
  for (const [group, sizes] of Object.entries(brand.font.size)) {
    for (const [name, value] of Object.entries(sizes)) lines.push(`  --fs-${group}-${name}: ${value};`)
  }
  for (const [group, sizes] of Object.entries(brand.font['line-height'])) {
    for (const [name, value] of Object.entries(sizes)) lines.push(`  --lh-${group}-${name}: ${value};`)
  }
  for (const [group, value] of Object.entries(brand.font['letter-spacing'])) {
    const em = value.endsWith('%') ? `${Number(value.slice(0, -1)) / 100}em` : value
    lines.push(`  --ls-${group}: ${em};`)
  }
  for (const [group, sizes] of Object.entries(brand.font['paragraph-spacing'])) {
    for (const [name, value] of Object.entries(sizes)) lines.push(`  --paragraph-spacing-${group}-${name}: ${value};`)
  }
  for (const [group, sizes] of Object.entries(brand.font['list-spacing'])) {
    for (const [name, value] of Object.entries(sizes)) lines.push(`  --list-spacing-${group}-${name}: ${value};`)
  }
  return lines
}

function unitLines() {
  const lines = []
  const walk = (node, prefix) => {
    for (const [key, value] of Object.entries(node)) {
      const dotted = `${prefix}-${key}`
      if (typeof value === 'string') lines.push(`  --unit-${dotted}: ${value};`)
      else walk(value, dotted)
    }
  }
  walk(brand.unit, '')
  return lines.map((line) => line.replace('--unit--', '--unit-'))
}

function effectLines() {
  const lines = []
  const spec = /^(.*?)\s+(color\.[\w.-]+),\s*([\d.]+)$/
  for (const name of ['focus', 'focus-success', 'focus-critical']) {
    for (const mode of ['light', 'dark']) {
      const raw = brand.effect[name][mode]
      const match = raw.match(spec)
      if (!match) throw new Error(`Cannot parse effect ${name}.${mode}: ${raw}`)
      const [, geometry, ref, alpha] = match
      const base = hexToOklch(resolveColor(ref)).replace(/\s*\/.*$/, '')
      lines.push(`  --effect-${name}-${mode}: ${geometry} ${base.replace(')', ` / ${alpha})`)};`)
    }
  }
  for (const [level, parts] of Object.entries(brand.effect.shadow)) {
    const rendered = parts.map((part) => part.replace(/color\.[\w.-]+/g, (ref) => hexToOklch(resolveColor(ref))))
    lines.push(`  --effect-shadow-${level}: ${rendered.join(', ')};`)
  }
  return lines
}

/* --------------------------------------------------------------- emit CSS */

const banner = `/* GENERATED FILE - do not edit by hand.
 * Source: src/theme/skytrack-brand-tokens-v4.json
 * Regenerate: npm run generate:tokens
 */`

const tokens = [
  banner,
  '',
  ':root {',
  '  /* ---------- color ramps (JSON hex, converted to oklch) ---------- */',
  ...rampLines(),
  '',
  '  /* ---------- input fill / border, per mode (JSON) ---------- */',
  `  --sem-input-fill-light: ${oklch(color.input.fill.light)};`,
  `  --sem-input-fill-dark: ${oklch(color.input.fill.dark)};`,
  `  --sem-input-border-light: ${oklch(color.input.border.light)};`,
  `  --sem-input-border-dark: ${oklch(color.input.border.dark)};`,
  '',
  '  /* ---------- semantic, light (derived; JSON defines dark only) ---------- */',
  ...semanticLines(
    Object.entries(lightSemanticSpecs).map(([key, spec]) => [key, render(spec)]),
    'light'
  ),
  '',
  '  /* ---------- UI aliases, light ---------- */',
  ...Object.entries(lightAliases).map(([key, spec]) => `  --${key}: ${render(spec)};`),
  '',
  '  /* ---------- typography ---------- */',
  ...typographyLines(),
  '',
  '  /* ---------- unit ---------- */',
  ...unitLines(),
  '',
  '  /* ---------- effect ---------- */',
  ...effectLines(),
  '}',
  '',
  '.dark {',
  '  /* ---------- semantic, dark (JSON values) ---------- */',
  ...semanticLines(darkSemantic, 'dark'),
  '',
  '  /* ---------- UI aliases, dark ---------- */',
  ...Object.entries(darkAliases).map(([key, spec]) => `  --${key}: ${render(spec)};`),
  '}',
  ''
].join('\n')

const textScale = {
  'heading-xxl': 'heading.xxl',
  'heading-xl': 'heading.xl',
  'heading-l': 'heading.l',
  'heading-m': 'heading.m',
  'heading-s': 'heading.s',
  'subheading-m': 'subheading.m',
  'body-l': 'body.l',
  'body-m': 'body.m',
  'body-s': 'body.s',
  'caption-l': 'caption.l',
  'caption-m': 'caption.m',
  'caption-s': 'caption.s',
  'hint-l': 'hint.l',
  'hint-m': 'hint.m'
}

const defaultScale = {
  xs: 'caption-s',
  sm: 'caption-l',
  base: 'body-m',
  lg: 'body-l',
  xl: 'subheading-m',
  '2xl': 'heading-m',
  '3xl': 'heading-l',
  '4xl': 'heading-xl',
  '5xl': 'heading-xxl'
}

const themeMap = [
  banner,
  '',
  '@theme inline {',
  '  /* ---------- fonts ---------- */',
  '  --font-heading: var(--font-family-heading);',
  '  --font-sans: var(--font-family-body);',
  '  --font-mono: var(--font-family-monospace);',
  '',
  '  /* ---------- color: brand + brand-alt + neutral ---------- */',
  ...[...Array(15)].flatMap((_, index) => {
    const steps = [
      '50',
      '100',
      '150',
      '200',
      '250',
      '300',
      '400',
      '500',
      '600',
      '700',
      '750',
      '800',
      '850',
      '900',
      '950'
    ]
    const step = steps[index]
    return [
      `  --color-brand-${step}: var(--brand-${step});`,
      `  --color-brand-alt-${step}: var(--brand-alt-${step});`,
      `  --color-neutral-${step}: var(--neutral-${step});`
    ]
  }),
  '',
  '  /* ---------- color: status ramps ---------- */',
  ...['success', 'warning', 'critical', 'info', 'link'].flatMap((ramp) =>
    ['50', '100', '150', '200', '250', '300', '400', '500', '600', '700', '750', '800', '850', '900', '950'].map(
      (step) => `  --color-${ramp}-${step}: var(--${ramp}-${step});`
    )
  ),
  '',
  '  /* ---------- color: JSON semantic groups ---------- */',
  ...['surface', 'text', 'icon', 'border'].flatMap((group) =>
    Object.keys(lightSemanticSpecs)
      .filter((key) => key.startsWith(`${group}.`))
      .map((key) => {
        const name = key.split('.').slice(1).join('-')
        const prefix = group === 'text' ? 'ink' : group === 'border' ? 'stroke' : group
        return `  --color-${prefix}-${name}: var(--sem-${group}-${name});`
      })
  ),
  '  --color-accent-brand-bolder: var(--sem-accent-brand-bolder);',
  '',
  '  /* ---------- color: shadcn aliases ---------- */',
  ...Object.keys(lightAliases).map((key) => `  --color-${key}: var(--${key});`),
  '',
  '  /* ---------- typography scale ---------- */',
  ...Object.entries(textScale).flatMap(([token, path]) => [
    `  --text-${token}: var(--fs-${path.replace('.', '-')});`,
    `  --text-${token}--line-height: var(--lh-${path.replace('.', '-')});`
  ]),
  '',
  '  /* ---------- Tailwind text aliases, remapped to the brand scale ---------- */',
  ...Object.entries(defaultScale).flatMap(([token, target]) => [
    `  --text-${token}: var(--text-${target});`,
    `  --text-${token}--line-height: var(--text-${target}--line-height);`
  ]),
  '',
  '  /* ---------- tracking ---------- */',
  '  --tracking-heading: var(--ls-heading);',
  '  --tracking-subheading: var(--ls-subheading);',
  '',
  '  /* ---------- radius (JSON 8px, remaining steps derived) ---------- */',
  '  --radius: var(--unit-input-border-radius-m);',
  '  --radius-xs: 3px;',
  '  --radius-sm: 4px;',
  '  --radius-md: 8px;',
  '  --radius-lg: 8px;',
  '  --radius-xl: 12px;',
  '',
  '  /* ---------- shadows (JSON effect.shadow 100-400) ---------- */',
  '  --shadow-xs: var(--effect-shadow-100);',
  '  --shadow-sm: var(--effect-shadow-200);',
  '  --shadow-md: var(--effect-shadow-300);',
  '  --shadow-lg: var(--effect-shadow-400);',
  '  --shadow-xl: var(--effect-shadow-400);',
  '  --shadow-2xl: var(--effect-shadow-400);',
  '}',
  ''
].join('\n')

fs.writeFileSync(tokensOut, tokens)
fs.writeFileSync(themeOut, themeMap)
console.log(`[tokens] wrote ${path.relative(root, tokensOut)} (${tokens.split('\n').length} lines)`)
console.log(`[tokens] wrote ${path.relative(root, themeOut)} (${themeMap.split('\n').length} lines)`)
