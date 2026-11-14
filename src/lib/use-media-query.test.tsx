import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMediaQuery } from './use-media-query'

const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia')

function Probe({ query }: { query: string }) {
  return <span>{useMediaQuery(query) ? 'narrow' : 'wide'}</span>
}

function installMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>()
  const mediaQuery = {
    matches,
    media: '(max-width: 639px)',
    onchange: null,
    addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => false)
  }
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => mediaQuery)
  })
  return { mediaQuery, listeners }
}

describe('useMediaQuery', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    if (originalMatchMedia) Object.defineProperty(window, 'matchMedia', originalMatchMedia)
    else Reflect.deleteProperty(window, 'matchMedia')
  })

  it('reads the query on the first render', () => {
    installMatchMedia(true)
    render(<Probe query='(max-width: 639px)' />)
    expect(screen.getByText('narrow')).toBeDefined()
  })

  it('follows viewport changes and unsubscribes on unmount', () => {
    const { mediaQuery, listeners } = installMatchMedia(false)
    const { unmount } = render(<Probe query='(max-width: 639px)' />)
    expect(screen.getByText('wide')).toBeDefined()

    mediaQuery.matches = true
    act(() => listeners.forEach((listener) => listener()))
    expect(screen.getByText('narrow')).toBeDefined()

    unmount()
    expect(listeners.size).toBe(0)
  })

  it('reports a wide viewport when matchMedia is missing', () => {
    Reflect.deleteProperty(window, 'matchMedia')
    render(<Probe query='(max-width: 639px)' />)
    expect(screen.getByText('wide')).toBeDefined()
  })
})
