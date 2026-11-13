import { afterEach, describe, expect, it, vi } from 'vitest'
import { resetDocumentScroll } from './reset-document-scroll'

describe('resetDocumentScroll', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('scrolls to the top immediately and again on the next frame', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const frames: FrameRequestCallback[] = []
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback)
      return frames.length
    })

    resetDocumentScroll()
    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0)

    // A mount scroll that lands after the route effect is undone by the queued frame.
    window.scrollTo(0, 9747)
    frames.forEach((callback) => callback(0))

    expect(scrollTo).toHaveBeenCalledTimes(3)
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0)
  })
})
