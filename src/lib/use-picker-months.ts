import { useMediaQuery } from './use-media-query'

/**
 * Calendar columns a picker may show.
 *
 * Two months sit side by side from `sm` up but stack below it, and a stacked pair is taller than
 * a phone viewport, which clips the popover under the fold. The pickers therefore render one
 * month below `sm` even when the caller asks for more.
 */
export function usePickerNumberOfMonths(calendarProps: { numberOfMonths?: number } | undefined) {
  const narrowViewport = useMediaQuery('(max-width: 639px)')
  return narrowViewport ? 1 : calendarProps?.numberOfMonths
}
