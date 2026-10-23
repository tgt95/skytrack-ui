/**
 * WCAG contrast audit for the generated SkyTrack theme.
 *
 * Reads src/theme/tokens.css, resolves the `var()` chains for the light (`:root`)
 * and dark (`.dark`) token sets, converts oklch to sRGB, and reports the contrast
 * ratio for the text/background pairs the components actually use.
 *
 * Run: npm run audit:contrast
 * Add `--strict` to exit non-zero when a pair fails WCAG AA.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = fs.readFileSync(path.join(root, 'src/theme/tokens.css'), 'utf8')
const strict = process.argv.includes('--strict')

function block(start) {
  const from = css.indexOf(start)
  if (from < 0) return {}
  const open = css.indexOf('{', from)
  const close = css.indexOf('\n}', open)
  const tokens = {}
  for (const match of css.slice(open, close).matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    tokens[match[1]] = match[2].trim()
  }
  return tokens
}

const lightTokens = block(':root {')
const darkTokens = { ...lightTokens, ...block('.dark {') }

function resolve(value, tokens, seen = new Set()) {
  const trimmed = value.trim()
  const varMatch = trimmed.match(/^var\(--([\w-]+)\)$/)
  if (!varMatch) return trimmed
  const key = varMatch[1]
  if (seen.has(key)) throw new Error(`Circular token: ${key}`)
  const next = tokens[key]
  if (next == null) throw new Error(`Unknown token: ${key}`)
  seen.add(key)
  return resolve(next, tokens, seen)
}

function oklchToLinear(value) {
  const hex = value.match(/^#([0-9a-fA-F]{6})$/)
  if (hex) {
    const channels = [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16) / 255)
    const linear = channels.map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
    return { linear, alpha: 1 }
  }
  const match = value.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/)
  if (!match) throw new Error(`Not an oklch color: ${value}`)
  const L = Number(match[1]) / 100
  const C = Number(match[2])
  const H = (Number(match[3]) * Math.PI) / 180
  const alpha = match[4] == null ? 1 : Number(match[4])
  const a = C * Math.cos(H)
  const b = C * Math.sin(H)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ].map((channel) => Math.min(1, Math.max(0, channel)))
  return { linear, alpha }
}

const luminance = (linear) => 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]

const over = (fg, bg) => fg.linear.map((channel, index) => channel * fg.alpha + bg.linear[index] * (1 - fg.alpha))

function contrast(fgToken, bgToken, tokens) {
  const fgValue = fgToken.startsWith('#') ? fgToken : tokens[fgToken]
  const bgValue = bgToken.startsWith('#') ? bgToken : tokens[bgToken]
  const fgColor = oklchToLinear(resolve(fgValue, tokens))
  const bgColor = oklchToLinear(resolve(bgValue, tokens))
  const bgLinear = bgColor.alpha < 1 ? (over(bgColor, { linear: [1, 1, 1] }).linear ?? bgColor.linear) : bgColor.linear
  const fgLinear = fgColor.alpha < 1 ? over(fgColor, { linear: bgLinear }) : fgColor.linear
  const [hi, lo] = [luminance(fgLinear), luminance(bgLinear)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const pairs = [
  ['foreground', 'background'],
  ['foreground', 'card'],
  ['foreground', 'muted'],
  ['foreground', 'accent'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'card'],
  ['muted-foreground', 'muted'],
  ['primary-foreground', 'primary'],
  ['primary', 'background'],
  ['destructive', 'background'],
  ['success', 'background'],
  ['warning', 'background'],
  ['info', 'background'],
  ['sidebar-foreground', 'sidebar'],
  ['sidebar-primary-foreground', 'sidebar-primary'],
  ['sem-text-primary', 'sem-surface-primary'],
  ['sem-text-secondary', 'sem-surface-primary'],
  ['sem-text-tertiary', 'sem-surface-primary']
]

/* Combos the components actually render, not every token pair. */
const onFill = [
  ['primary-foreground', 'primary'], // Button primary, badge processing
  ['destructive-foreground', 'destructive'], // Button destructive, badge error
  ['success-foreground', 'success'], // Badge success
  ['warning-foreground', 'warning'] // Badge warning
]

let failures = 0
for (const [mode, tokens] of [
  ['light', lightTokens],
  ['dark', darkTokens]
]) {
  console.log(`\n${mode.toUpperCase()} (AA normal text = 4.5, large text / UI = 3.0)`)
  const rows = pairs.map(([fg, bg]) => [fg, bg, contrast(fg, bg, tokens), 4.5])
  for (const [fg, bg] of onFill) {
    const ratio = contrast(fg, bg, tokens)
    rows.push([fg, bg, ratio, 4.5])
  }
  for (const [fg, bg, ratio, min] of rows) {
    const status = ratio >= min ? 'PASS' : 'FAIL'
    if (status === 'FAIL') failures += 1
    console.log(`  ${status}  ${ratio.toFixed(2).padStart(5)}  ${fg} on ${bg}`)
  }
}

console.log(`\n${failures} pair(s) below AA.`)
if (strict && failures > 0) process.exitCode = 1
