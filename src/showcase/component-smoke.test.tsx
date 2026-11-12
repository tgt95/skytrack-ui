import type { ReactNode } from 'react'
import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { Calendar } from '@/components/ui/calendar'
import type { DemoMeta } from './demo'
import { SPECS } from './specs/component-specs'

/**
 * Smoke coverage for every shipped component.
 *
 * The Sheet specs (`component-specs.ts`) are the list of components the library
 * claims to ship, and `src/demos/*.demo.tsx` are the showcase's own usage
 * examples. This test renders each component once through its demo, so a new
 * component without a demo — or a demo that no longer renders — fails here
 * before it reaches the Sheet.
 */
const modules = import.meta.glob<{ demo: DemoMeta }>('../demos/*.demo.tsx', { eager: true })

const demoById = new Map<string, DemoMeta>()
for (const module of Object.values(modules)) {
  if (module.demo) demoById.set(module.demo.id, module.demo)
}

/** Shell demos compose many components, so they have no single component to smoke test. */
const SHELL_DEMO_IDS = new Set([
  'canvas-shell',
  'combined-shell',
  'command-first-shell',
  'left-nav-shell',
  'multi-pane-shell',
  'multi-tab-shell',
  'top-nav-shell'
])

/** Components with no showcase demo yet still need a case here. */
const MANUAL_CASES: Record<string, () => ReactNode> = {
  calendar: () => <Calendar mode='single' />
}

/** The demo harness in the showcase wraps each variant in its own block. */
function renderComponent(id: string) {
  const demo = demoById.get(id)

  if (!demo) {
    const manual = MANUAL_CASES[id]
    expect(manual, `No demo or manual smoke case for "${id}"`).toBeDefined()
    return render(<>{manual()}</>).container
  }

  return render(
    <>
      {demo.variants.map((variant) => (
        <div key={variant.name} data-smoke-variant={variant.name}>
          {variant.render()}
        </div>
      ))}
    </>
  ).container
}

/** A component rendered nothing recognisable if it has no slot marker, role or form element. */
function landmarkCount(container: HTMLElement) {
  return container.querySelectorAll('[data-slot], [role]').length
}

beforeAll(() => {
  // jsdom lacks these; several components measure themselves or observe scroll.
  class ObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  const globals = globalThis as unknown as Record<string, unknown>
  for (const name of ['ResizeObserver', 'IntersectionObserver', 'MutationObserver']) {
    if (!globals[name]) globals[name] = ObserverStub
  }

  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false
    })) as unknown as typeof window.matchMedia
  }

  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {}
})

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
