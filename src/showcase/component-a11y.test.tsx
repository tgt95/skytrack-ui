import fs from 'node:fs'
import path from 'node:path'
import { render } from '@testing-library/react'
import axe from 'axe-core'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { demoVariants, installBrowserStubs, SPECS } from './test-support/demo-harness'

/**
 * Accessibility coverage for every shipped component, run with axe-core in jsdom.
 *
 * What this catches: machine-detectable problems in markup and ARIA — a control
 * with no accessible name, `aria-labelledby` pointing at a node that does not
 * exist, an invalid role or state, a form field with no label.
 *
 * What this cannot catch (documented, not silently skipped): anything that needs
 * layout or a real browser. jsdom has no box model, so `color-contrast` reports
 * "incomplete" for every node and is disabled here instead of producing false
 * passes. Keyboard focus order, focus trapping, screen-reader output and
 * responsive behaviour stay in the manual browser pass documented in README.
 *
 * Regressions are blocked through `a11y-baseline.json`: findings that exist today
 * are recorded per component and rule, and this test fails when a component gains
 * a violation it did not have, or when an existing rule spreads to more nodes.
 *
 * Rebaseline with `npm run a11y:baseline`. That command refuses to add findings
 * unless `A11Y_ACCEPT_NEW=1` is set, so a rebaseline cannot silently absorb a
 * regression; it can always shrink the file.
 */

const BASELINE_PATH = path.resolve(process.cwd(), 'src/showcase/a11y-baseline.json')
const writeBaseline = process.env.A11Y_WRITE_BASELINE === '1'
const acceptNew = process.env.A11Y_ACCEPT_NEW === '1'

/** jsdom cannot evaluate these; see the note above instead of pretending they pass. */
const DISABLED_RULES = ['color-contrast'] as const

/**
 * Findings we accept for now, with the reason and the intended fix. Anything here
 * must also appear in `a11y-baseline.json`; the baseline is the machine record,
 * this is the explanation.
 */
const KNOWN_ISSUES = [
  {
    component: 'date-picker',
    rule: 'aria-allowed-role',
    why: 'The Base UI popover trigger renders as `<input role="button">`; ARIA in HTML does not allow the button role on a text input.',
    next: 'Trigger the popover from a real `<button>` that contains the read-only display value, then verify with a browser pass.'
  },
  {
    component: 'tabs',
    rule: 'aria-required-children',
    why: 'The closable-tabs demo puts the "Add tab" button inside `role="tablist"`, which must only contain tabs.',
    next: 'Move the add control outside `TabsList` and re-check the visual grouping.'
  },
  {
    component: 'tabs',
    rule: 'nested-interactive',
    why: 'Each demo tab nests its close `<button>` inside `role="tab"`, so a screen reader meets an interactive control inside an interactive control.',
    next: 'Move the close control next to the tab inside a `role="presentation"` wrapper and confirm keyboard order in a browser.'
  }
] as const

type Finding = {
  component: string
  rule: string
  severity: string
  nodes: number
  targets: string[]
}

type Baseline = {
  note: string
  generatedFrom: string
  disabledRules: string[]
  knownIssues: Array<{ component: string; rule: string; why: string; next: string }>
  findings: Finding[]
}

function emptyBaseline(): Baseline {
  return {
    note: 'Known axe-core findings per component. Regenerate with `npm run a11y:baseline` after fixing or accepting a finding.',
    generatedFrom: 'src/showcase/component-a11y.test.tsx',
    disabledRules: [...DISABLED_RULES],
    knownIssues: KNOWN_ISSUES.map((issue) => ({ ...issue })),
    findings: []
  }
}

function loadBaseline(): Baseline {
  if (!fs.existsSync(BASELINE_PATH)) return emptyBaseline()
  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')) as Baseline
}

async function findingsFor(component: string): Promise<Finding[]> {
  const findings: Finding[] = []

  for (const variant of demoVariants(component)) {
    const { container, unmount } = render(<>{variant.render()}</>)
    const results = await axe.run(container, {
      rules: Object.fromEntries(DISABLED_RULES.map((rule) => [rule, { enabled: false }]))
    })

    for (const violation of results.violations) {
      findings.push({
        component,
        rule: violation.id,
        severity: violation.impact ?? 'unknown',
        nodes: violation.nodes.length,
        targets: violation.nodes.map((node) => `${variant.name}: ${node.target.join(' ')}`).sort()
      })
    }

    unmount()
  }

  return findings
}

const sortFindings = (findings: Finding[]) =>
  [...findings].sort((a, b) => a.component.localeCompare(b.component) || a.rule.localeCompare(b.rule))

const keyOf = (finding: { component: string; rule: string }) => `${finding.component}::${finding.rule}`

beforeAll(installBrowserStubs)

describe('component accessibility (axe-core)', () => {
  if (writeBaseline) {
    it('rewrites the a11y baseline from the current state', async () => {
      const found: Finding[] = []
      for (const spec of SPECS) found.push(...(await findingsFor(spec.id)))

      const current = sortFindings(found)
      const previous = loadBaseline()
      const previousKeys = new Set(previous.findings.map(keyOf))

      const added = current.filter((finding) => !previousKeys.has(keyOf(finding)))
      const currentKeys = new Set(current.map(keyOf))
      const removed = previous.findings.filter((finding) => !currentKeys.has(keyOf(finding)))

      if (removed.length > 0) {
        console.info(
          `[a11y] dropping ${removed.length} finding(s) that no longer reproduce: ${removed.map(keyOf).join(', ')}`
        )
      }

      if (added.length > 0 && !acceptNew) {
        throw new Error(
          `Refusing to add ${added.length} finding(s) to the baseline: ${added.map(keyOf).join(', ')}.\n` +
            'Fix them, or rerun with A11Y_ACCEPT_NEW=1 if they are understood and accepted.'
        )
      }

      fs.writeFileSync(BASELINE_PATH, `${JSON.stringify({ ...emptyBaseline(), findings: current }, null, 2)}\n`)
      expect(fs.existsSync(BASELINE_PATH)).toBe(true)
    }, 300_000)
  } else {
    const baseline = loadBaseline()
    const known = new Map(baseline.findings.map((finding) => [keyOf(finding), finding]))
    const seen = new Set<string>()

    it.each(SPECS.map((spec) => [spec.id, spec.title]))(
      'has no new violations in %s (%s)',
      async (id) => {
        const findings = await findingsFor(id)

        const added: string[] = []
        const grown: string[] = []

        for (const finding of findings) {
          const key = keyOf(finding)
          seen.add(key)
          const recorded = known.get(key)

          if (!recorded) {
            added.push(
              `${finding.rule} (${finding.severity}) on ${finding.nodes} node(s): ${finding.targets.join(', ')}`
            )
          } else if (finding.nodes > recorded.nodes) {
            grown.push(
              `${finding.rule} spread from ${recorded.nodes} to ${finding.nodes} node(s): ${finding.targets.join(', ')}`
            )
          }
        }

        expect(added, `${id} gained new axe violations; fix them or run \`npm run a11y:baseline\``).toEqual([])
        expect(grown, `${id} spread an existing axe violation to more nodes`).toEqual([])
      },
      120_000
    )

    afterAll(() => {
      const stale = baseline.findings.filter((finding) => !seen.has(keyOf(finding))).map(keyOf)

      if (stale.length > 0) {
        // Not a failure: this is the good direction. Rebaseline to lock the improvement in.
        console.info(`[a11y] ${stale.length} baseline finding(s) no longer reproduce — run \`npm run a11y:baseline\`.`)
      }
    })
  }
})
