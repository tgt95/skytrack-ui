import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShowcaseBrandLink } from './brand-link'

describe('ShowcaseBrandLink', () => {
  it('keeps the home link available to assistive technology', () => {
    render(<ShowcaseBrandLink logo='<svg aria-hidden="true" />' />)

    const link = screen.getByRole('link', { name: 'SkyTrack UI home' })

    expect(link.getAttribute('href')).toBe('/')
    expect(link.hasAttribute('aria-hidden')).toBe(false)
  })
})
