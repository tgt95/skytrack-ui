import { cn } from './utils'
import {
  CONTROL_CHILD_SVG_CLASSES,
  CONTROL_FONT_SIZE_CLASSES,
  CONTROL_GAP_CLASSES,
  CONTROL_HEIGHT_CLASSES,
  CONTROL_PADDING_X_CLASSES,
  type ControlSize
} from './control-sizes'

export const toggleSizeClasses: Record<ControlSize | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg', string> = {
  xs: cn(
    CONTROL_HEIGHT_CLASSES.xs,
    CONTROL_FONT_SIZE_CLASSES.xs,
    CONTROL_PADDING_X_CLASSES.xs,
    CONTROL_GAP_CLASSES.xs,
    CONTROL_CHILD_SVG_CLASSES.xs
  ),
  sm: cn(
    CONTROL_HEIGHT_CLASSES.sm,
    CONTROL_FONT_SIZE_CLASSES.sm,
    CONTROL_PADDING_X_CLASSES.sm,
    CONTROL_GAP_CLASSES.sm,
    CONTROL_CHILD_SVG_CLASSES.sm
  ),
  default: cn(
    CONTROL_HEIGHT_CLASSES.default,
    CONTROL_FONT_SIZE_CLASSES.default,
    CONTROL_PADDING_X_CLASSES.default,
    CONTROL_GAP_CLASSES.default,
    CONTROL_CHILD_SVG_CLASSES.default
  ),
  lg: cn(
    CONTROL_HEIGHT_CLASSES.lg,
    CONTROL_FONT_SIZE_CLASSES.lg,
    CONTROL_PADDING_X_CLASSES.lg,
    CONTROL_GAP_CLASSES.lg,
    CONTROL_CHILD_SVG_CLASSES.lg
  ),
  icon: cn(CONTROL_HEIGHT_CLASSES.default, 'aspect-square p-0', CONTROL_CHILD_SVG_CLASSES.default),
  'icon-xs': cn(CONTROL_HEIGHT_CLASSES.xs, 'aspect-square p-0', CONTROL_CHILD_SVG_CLASSES.xs),
  'icon-sm': cn(CONTROL_HEIGHT_CLASSES.sm, 'aspect-square p-0', CONTROL_CHILD_SVG_CLASSES.sm),
  'icon-lg': cn(CONTROL_HEIGHT_CLASSES.lg, 'aspect-square p-0', CONTROL_CHILD_SVG_CLASSES.lg)
}

/** Toggle cva configuration, shared with the showcase spec sheet. */
export const toggleVariantConfig = {
  variants: {
    variant: {
      default: 'bg-transparent hover:bg-muted hover:text-foreground',
      outline: 'border border-input bg-transparent hover:bg-accent',
      segmented:
        'flex-1 justify-center rounded-(--radius) bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-pressed:bg-card data-pressed:text-foreground data-pressed:shadow-sm',
      brand:
        'bg-transparent hover:bg-muted hover:text-foreground data-pressed:bg-primary data-pressed:text-primary-foreground'
    },
    size: {
      default: toggleSizeClasses.default,
      xs: toggleSizeClasses.xs,
      sm: toggleSizeClasses.sm,
      lg: toggleSizeClasses.lg,
      icon: toggleSizeClasses.icon,
      'icon-xs': toggleSizeClasses['icon-xs'],
      'icon-sm': toggleSizeClasses['icon-sm'],
      'icon-lg': toggleSizeClasses['icon-lg']
    }
  },
  defaultVariants: { variant: 'default', size: 'default' } as const
}
