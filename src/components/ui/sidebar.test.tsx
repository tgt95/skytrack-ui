import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SidebarProvider } from './sidebar'

const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia')

describe('SidebarProvider keyboard shortcut', () => {
  beforeEach(() => {
    const mediaQuery = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => false)
    }
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => mediaQuery)
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    if (originalMatchMedia) Object.defineProperty(window, 'matchMedia', originalMatchMedia)
    else Reflect.deleteProperty(window, 'matchMedia')
  })

  it('keeps one keydown listener while toggling between expanded and collapsed', () => {
    const addListener = vi.spyOn(window, 'addEventListener')
    const removeListener = vi.spyOn(window, 'removeEventListener')

    const { container } = render(<SidebarProvider>Workspace</SidebarProvider>)
    const keydownAdds = addListener.mock.calls.filter(([type]) => type === 'keydown').length
    expect(keydownAdds).toBe(1)

    fireEvent.keyDown(window, { key: 'b', ctrlKey: true })
    expect(container.querySelector('[data-slot="sidebar-provider"]')?.getAttribute('data-state')).toBe('collapsed')
    expect(addListener.mock.calls.filter(([type]) => type === 'keydown')).toHaveLength(keydownAdds)
    expect(removeListener.mock.calls.filter(([type]) => type === 'keydown')).toHaveLength(0)

    fireEvent.keyDown(window, { key: 'b', ctrlKey: true })
    expect(container.querySelector('[data-slot="sidebar-provider"]')?.getAttribute('data-state')).toBe('expanded')
    expect(addListener.mock.calls.filter(([type]) => type === 'keydown')).toHaveLength(keydownAdds)
  })
})
