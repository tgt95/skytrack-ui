import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Calendar } from '@/components/ui/calendar'
import type { DemoMeta } from '../demo'
import { SPECS } from '../specs/component-specs'

/**
 * Shared render harness for the showcase's component-wide checks.
 *
 * The Sheet specs (`component-specs.ts`) are the list of components the library
 * claims to ship, and `src/demos/*.demo.tsx` are the showcase's own usage
 * examples. Both the smoke test and the accessibility test render every
 * component through this single path, so a component that cannot render fails in
 * both places and the two checks can never disagree about what "all components"
 * means.
 */
const modules = import.meta.glob<{ demo: DemoMeta }>('../../demos/*.demo.tsx', { eager: true })

export const demoById = new Map<string, DemoMeta>()
for (const module of Object.values(modules)) {
  if (module.demo) demoById.set(module.demo.id, module.demo)
}

/** Shell demos compose many components, so they have no single component to smoke test. */
export const SHELL_DEMO_IDS = new Set([
  'canvas-shell',
  'combined-shell',
  'command-first-shell',
  'left-nav-shell',
  'multi-pane-shell',
  'multi-tab-shell',
  'top-nav-shell'
])

/** Components with no showcase demo yet still need a case here. */
export const MANUAL_CASES: Record<string, () => ReactNode> = {
  calendar: () => <Calendar mode='single' />
}

/** The demo harness in the showcase wraps each variant in its own block. */
export function renderComponent(id: string) {
  const demo = demoById.get(id)

  if (!demo) {
    const manual = MANUAL_CASES[id]
    if (!manual) throw new Error(`No demo or manual smoke case for "${id}"`)
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

/**
 * One renderable state per variant, for checks that must look at a single state at
 * a time. Rendering every variant at once puts several `<main>`/`<nav>`/`<aside>`
 * landmarks on one page, which makes landmark rules report duplicates that no real
 * screen ever has.
 */
export function demoVariants(id: string): Array<{ name: string; render: () => ReactNode }> {
  const demo = demoById.get(id)
  if (demo) return demo.variants.map((variant) => ({ name: variant.name, render: variant.render }))

  const manual = MANUAL_CASES[id]
  if (!manual) throw new Error(`No demo or manual smoke case for "${id}"`)
  return [{ name: 'manual', render: manual }]
}

/** jsdom lacks these; several components measure themselves or observe scroll. */
export function installBrowserStubs() {
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
  // jsdom has no Web Animations API; Base UI measures finite animations after mount.
  if (!Element.prototype.getAnimations) Element.prototype.getAnimations = () => []
}

export { SPECS }
