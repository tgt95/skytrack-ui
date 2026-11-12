import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import {
  demoById,
  installBrowserStubs,
  MANUAL_CASES,
  renderComponent,
  SHELL_DEMO_IDS,
  SPECS
} from './test-support/demo-harness'

/**
 * Smoke coverage for every shipped component.
 *
 * This test renders each component once through its demo, so a new component
 * without a demo — or a demo that no longer renders — fails here before it
 * reaches the Sheet. The same harness feeds `component-a11y.test.tsx`.
 */

/** A component rendered nothing recognisable if it has no slot marker, role or form element. */
function landmarkCount(container: HTMLElement) {
  return container.querySelectorAll('[data-slot], [role]').length
}

beforeAll(installBrowserStubs)

afterEach(cleanup)

describe('component smoke', () => {
  it.each(SPECS.map((spec) => [spec.id, spec.title]))('renders %s (%s)', (id) => {
    const container = renderComponent(id)

    expect(container.querySelectorAll('[data-demo-error]')).toHaveLength(0)
    expect(landmarkCount(container), `${id} rendered no slot marker, role or form element`).toBeGreaterThan(0)
  })

  it('covers every shipped component with a demo or a manual case', () => {
    const missing = SPECS.map((spec) => spec.id).filter((id) => !demoById.has(id) && !(id in MANUAL_CASES))

    expect(missing, 'Add a demo in src/demos or a manual case above').toEqual([])
  })

  it('maps every demo file to a documented component or a shell', () => {
    const specIds = new Set(SPECS.map((spec) => spec.id))
    const unknown = [...demoById.keys()].filter((id) => !specIds.has(id) && !SHELL_DEMO_IDS.has(id))

    expect(unknown, 'Add the component to component-specs.ts or list the demo as a shell').toEqual([])
  })
})
