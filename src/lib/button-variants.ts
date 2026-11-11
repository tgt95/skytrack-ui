import { CONTROL_SIZE_CLASSES } from './control-sizes'

/**
 * Button cva configuration. Kept in an internal module so the showcase can read
 * the real variant and size axes instead of hand-copying them.
 */
export const buttonVariantConfig = {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
        'bg-destructive text-(--foreground-inverse) hover:bg-destructive/90 focus-visible:ring-destructive/30',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: CONTROL_SIZE_CLASSES.default,
      xs: CONTROL_SIZE_CLASSES.xs,
      sm: CONTROL_SIZE_CLASSES.sm,
      lg: CONTROL_SIZE_CLASSES.lg,
      icon: "size-10 [&_svg:not([class*='size-'])]:size-4",
      'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3.5",
      'icon-sm': "size-8 [&_svg:not([class*='size-'])]:size-4",
      'icon-lg': "size-12 [&_svg:not([class*='size-'])]:size-5"
    }
  },
  defaultVariants: { variant: 'default', size: 'default' } as const
}
