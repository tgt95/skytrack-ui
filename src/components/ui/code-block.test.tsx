import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockLineNumbersToggle
} from './code-block'

describe('CodeBlock line index / line numbers API', () => {
  it('renders without line numbers by default', () => {
    const { container } = render(
      <CodeBlock>
        <CodeBlockContent>
          <CodeBlockLine>console.log("hello")</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    )

    expect(container.querySelector('[data-slot="code-block-line-number"]')).toBeNull()
    expect(screen.getByText('console.log("hello")')).toBeDefined()
  })

  it('renders line numbers when lineNumbers={true} is on CodeBlock', () => {
    const { container } = render(
      <CodeBlock lineNumbers>
        <CodeBlockContent>
          <CodeBlockLine>line 1</CodeBlockLine>
          <CodeBlockLine>line 2</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    )

    const lineNumbers = container.querySelectorAll('[data-slot="code-block-line-number"]')
    expect(lineNumbers.length).toBe(2)
    expect(lineNumbers[0].textContent).toBe('1')
    expect(lineNumbers[1].textContent).toBe('2')
    expect(lineNumbers[0].className).toContain('border-r')
  })

  it('supports lineIndex alias prop and startLineIndex', () => {
    const { container } = render(
      <CodeBlock lineIndex startLineIndex={10}>
        <CodeBlockContent>
          <CodeBlockLine>line 10</CodeBlockLine>
          <CodeBlockLine>line 11</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    )

    const lineNumbers = container.querySelectorAll('[data-slot="code-block-line-number"]')
    expect(lineNumbers.length).toBe(2)
    expect(lineNumbers[0].textContent).toBe('10')
    expect(lineNumbers[1].textContent).toBe('11')
  })

  it('supports raw string children in CodeBlockContent with lineNumbers', () => {
    const { container } = render(
      <CodeBlock lineNumbers>
        <CodeBlockContent>{'first\nsecond\nthird'}</CodeBlockContent>
      </CodeBlock>
    )

    const lineNumbers = container.querySelectorAll('[data-slot="code-block-line-number"]')
    expect(lineNumbers.length).toBe(3)
    expect(lineNumbers[0].textContent).toBe('1')
    expect(lineNumbers[1].textContent).toBe('2')
    expect(lineNumbers[2].textContent).toBe('3')
  })

  it('allows toggling line numbers on and off via CodeBlockLineNumbersToggle', async () => {
    const user = userEvent.setup()

    const { container } = render(
      <CodeBlock defaultLineNumbers={false}>
        <CodeBlockActions>
          <CodeBlockLineNumbersToggle />
        </CodeBlockActions>
        <CodeBlockContent>
          <CodeBlockLine>toggle test</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    )

    const toggleButton = screen.getByRole('button', { name: /show line numbers/i })
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false')
    expect(container.querySelector('[data-slot="code-block-line-number"]')).toBeNull()

    // Click to enable line numbers
    await user.click(toggleButton)
    expect(toggleButton.getAttribute('aria-pressed')).toBe('true')
    const activeNumber = container.querySelector('[data-slot="code-block-line-number"]')
    expect(activeNumber).not.toBeNull()
    expect(activeNumber?.textContent).toBe('1')

    // Click again to disable line numbers
    await user.click(toggleButton)
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false')
    expect(container.querySelector('[data-slot="code-block-line-number"]')).toBeNull()
  })
})
