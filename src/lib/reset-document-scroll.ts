/**
 * Puts the document back at the top, then re-asserts it on the next frame.
 *
 * Mounting an inline `<Command>` scrolls its selected item into view — cmdk calls
 * `scrollIntoView({ block: 'nearest' })` — and when that item sits outside the viewport the
 * browser scrolls the whole document to reach it. React runs that mount scroll after the
 * route's own effects, so one synchronous scroll is not enough: the frame callback re-asserts
 * the top once the mount pass is done.
 */
export function resetDocumentScroll(): void {
  window.scrollTo(0, 0)
  window.requestAnimationFrame(() => window.scrollTo(0, 0))
}
