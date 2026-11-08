/** Shared heights and typography for controls aligned with the standard control sizes. */
export type ControlSize = 'xs' | 'sm' | 'default' | 'lg'

export const CONTROL_SIZE_CLASSES: Record<ControlSize, string> = {
  xs: 'h-6 text-xs',
  sm: 'h-8 text-sm',
  default: 'h-9 text-sm',
  lg: 'h-10 text-sm'
}
