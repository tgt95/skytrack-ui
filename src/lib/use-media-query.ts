import * as React from 'react'

/**
 * Tracks a CSS media query from JavaScript.
 *
 * Components that change structure (not just styling) at a breakpoint need this: Tailwind can
 * hide a second calendar month, but the component has to stop rendering it to keep a popover
 * inside a small viewport. The first render reads the query synchronously so an open overlay
 * never paints at the wrong size, and `false` is returned when `matchMedia` is unavailable
 * (server render, jsdom without the harness stub).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(query)
    const update = () => setMatches(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [query])

  return matches
}
