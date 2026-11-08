import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from './inline-edit'

function rect(top: number, left: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    top,
    left,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({})
  }
}

describe('InlineEdit', () => {
  let measuredSlots: string[]

  beforeEach(() => {
    measuredSlots = []
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const slot = this.getAttribute('data-slot')
      if (slot === 'inline-edit' || slot === 'inline-edit-trigger') measuredSlots.push(slot)
      if (slot === 'inline-edit') return rect(0, 0, 320, 80)
      if (slot === 'inline-edit-trigger') return rect(12, 24, 120, 30)
      return rect(0, 0, 0, 0)
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('resizes from the draft without remeasuring overlay geometry and restores the value on cancel', () => {
    render(
      <InlineEdit defaultValue='Mission title' label='Mission title'>
        <InlineEditTrigger />
        <InlineEditInput />
      </InlineEdit>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Mission title' }))
    const input = screen.getByRole('textbox', { name: 'Mission title' }) as HTMLTextAreaElement
    Object.defineProperty(input, 'scrollHeight', {
      configurable: true,
      get: () => (input.value.length > 20 ? 96 : 24)
    })

    expect(input.style.height).toBe('42px')
    const geometryMeasurements = measuredSlots.length

    fireEvent.change(input, { target: { value: 'A longer mission title that wraps to multiple lines' } })

    expect(input.style.height).toBe('96px')
    expect(measuredSlots).toHaveLength(geometryMeasurements)

    fireEvent.keyDown(input, { key: 'Escape' })

    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.getByRole('button', { name: 'Mission title' }).textContent).toBe('Mission title')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Mission title' }))
  })

  it('commits a draft when Enter is pressed', () => {
    render(
      <InlineEdit defaultValue='Draft title'>
        <InlineEditTrigger />
        <InlineEditInput />
      </InlineEdit>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Draft title' }))
    const input = screen.getByRole('textbox', { name: 'Draft title' })
    fireEvent.change(input, { target: { value: 'Saved title' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(screen.getByRole('button', { name: 'Saved title' }).textContent).toBe('Saved title')
  })
})
