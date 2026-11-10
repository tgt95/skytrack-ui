/** Shared heights, typography, horizontal padding, gap, and icon sizes for standard controls. */
export type ControlSize = 'xs' | 'sm' | 'default' | 'lg'

export const CONTROL_HEIGHT_CLASSES: Record<ControlSize, string> = {
  xs: 'h-6',
  sm: 'h-8',
  default: 'h-10',
  lg: 'h-12'
}

export const CONTROL_FONT_SIZE_CLASSES: Record<ControlSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  default: 'text-sm',
  lg: 'text-base'
}

export const CONTROL_PADDING_X_CLASSES: Record<ControlSize, string> = {
  xs: 'px-2',
  sm: 'px-2.5',
  default: 'px-3',
  lg: 'px-4'
}

export const CONTROL_ICON_SIZE_CLASSES: Record<ControlSize, string> = {
  xs: 'size-3.5',
  sm: 'size-4',
  default: 'size-4',
  lg: 'size-5'
}

export const CONTROL_GAP_CLASSES: Record<ControlSize, string> = {
  xs: 'gap-1.5',
  sm: 'gap-2',
  default: 'gap-2',
  lg: 'gap-2.5'
}

export const CONTROL_CHILD_SVG_CLASSES: Record<ControlSize, string> = {
  xs: "[&_svg:not([class*='size-'])]:size-3.5",
  sm: "[&_svg:not([class*='size-'])]:size-4",
  default: "[&_svg:not([class*='size-'])]:size-4",
  lg: "[&_svg:not([class*='size-'])]:size-5"
}

export const CONTROL_SIZE_CLASSES: Record<ControlSize, string> = {
  xs: `${CONTROL_HEIGHT_CLASSES.xs} ${CONTROL_FONT_SIZE_CLASSES.xs} ${CONTROL_PADDING_X_CLASSES.xs} ${CONTROL_GAP_CLASSES.xs} ${CONTROL_CHILD_SVG_CLASSES.xs}`,
  sm: `${CONTROL_HEIGHT_CLASSES.sm} ${CONTROL_FONT_SIZE_CLASSES.sm} ${CONTROL_PADDING_X_CLASSES.sm} ${CONTROL_GAP_CLASSES.sm} ${CONTROL_CHILD_SVG_CLASSES.sm}`,
  default: `${CONTROL_HEIGHT_CLASSES.default} ${CONTROL_FONT_SIZE_CLASSES.default} ${CONTROL_PADDING_X_CLASSES.default} ${CONTROL_GAP_CLASSES.default} ${CONTROL_CHILD_SVG_CLASSES.default}`,
  lg: `${CONTROL_HEIGHT_CLASSES.lg} ${CONTROL_FONT_SIZE_CLASSES.lg} ${CONTROL_PADDING_X_CLASSES.lg} ${CONTROL_GAP_CLASSES.lg} ${CONTROL_CHILD_SVG_CLASSES.lg}`
}
