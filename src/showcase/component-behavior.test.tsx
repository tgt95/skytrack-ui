import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { demoVariants, installBrowserStubs } from './test-support/demo-harness'

/**
 * Behaviour checks for demo states whose interaction cannot be expressed by markup
 * alone. Currently: the closable-tabs demo, where the close affordance is a
 * decorative icon (mouse) plus Delete/Backspace on the focused tab (keyboard).
 * Without this test, replacing the nested `<button>` with a `span` could silently
 * drop the only keyboard way to close a tab.
 */
beforeAll(installBrowserStubs)

function renderClosableTabs() {
  const variant = demoVariants('tabs').find((item) => item.name === 'Closable tabs')
  if (!variant) throw new Error('The tabs demo no longer has a "Closable tabs" variant')
  return render(<>{variant.render()}</>)
}

const tabNames = () => screen.getAllByRole('tab').map((tab) => tab.textContent?.trim())

describe('closable tabs', () => {
  it('closes the focused tab with Delete', async () => {
    const user = userEvent.setup()
    renderClosableTabs()

    expect(tabNames()).toEqual(['Tab 1', 'Tab 2', 'Tab 3'])

    screen.getByRole('tab', { name: /Tab 2/ }).focus()
    await user.keyboard('{Delete}')

    expect(tabNames()).toEqual(['Tab 1', 'Tab 3'])
  })

  it('closes a tab with Backspace as well', async () => {
    const user = userEvent.setup()
    renderClosableTabs()

    screen.getByRole('tab', { name: /Tab 3/ }).focus()
    await user.keyboard('{Backspace}')

    expect(tabNames()).toEqual(['Tab 1', 'Tab 2'])
  })

  it('keeps the close icon out of the accessibility tree', () => {
    renderClosableTabs()

    const tab = screen.getByRole('tab', { name: /Tab 1/ })

    // The icon is decorative for assistive tech; aria-keyshortcuts advertises the
    // keyboard path instead of nesting a control inside the tab.
    expect(tab.querySelector('[aria-hidden="true"]')).not.toBeNull()
    expect(tab.getAttribute('aria-keyshortcuts')).toBe('Delete')
  })
})

afterEach(cleanup)
