import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function Tabs({ className, ...props }: React.ComponentProps<typeof BaseTabs.Root>) {
  return (
    <BaseTabs.Root
      data-slot='tabs'
      className={cn('flex w-full flex-col gap-2', className as string)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ List */

const tabsListVariants = cva('relative z-0 flex w-fit items-center text-muted-foreground', {
  variants: {
    variant: {
      filled: 'gap-1 rounded-(--radius) bg-muted p-1',
      standard: 'gap-2 bg-transparent',
      outlined: 'gap-1 rounded-(--radius) border border-input bg-transparent p-1'
    }
  },
  defaultVariants: { variant: 'filled' }
})

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>

function TabsList({ className, variant, ...props }: React.ComponentProps<typeof BaseTabs.List> & TabsListVariantProps) {
  return (
    <BaseTabs.List
      data-slot='tabs-list'
      className={cn(tabsListVariants({ variant }), className as string)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------- Tab */

const tabsTabVariants = cva(
  cn(
    'relative z-10 inline-flex cursor-pointer flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-(--radius) font-medium transition-colors select-none',
    'hover:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    focusRing
  ),
  {
    variants: {
      variant: {
        filled: 'data-[active]:bg-background data-[active]:text-foreground',
        standard: 'data-[active]:bg-transparent data-[active]:text-primary',
        outlined: 'data-[active]:bg-background data-[active]:text-foreground'
      },
      size: {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
      }
    },
    defaultVariants: { variant: 'filled', size: 'default' }
  }
)

export type TabsTabVariantProps = VariantProps<typeof tabsTabVariants>

function TabsTab({ className, variant, size, ...props }: React.ComponentProps<typeof BaseTabs.Tab> & TabsTabVariantProps) {
  return (
    <BaseTabs.Tab
      data-slot='tabs-tab'
      className={cn(tabsTabVariants({ variant, size }), className as string)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------- Indicator */

const tabsIndicatorVariants = cva(
  cn('absolute z-0', 'transition-[left,top,width,height] duration-200 ease-out motion-reduce:transition-none'),
  {
    variants: {
      variant: {
        pill: 'left-[var(--active-tab-left)] top-[var(--active-tab-top)] h-[var(--active-tab-height)] w-[var(--active-tab-width)] rounded-(--radius) bg-background',
        /* Follow the active tab edge: bottom for horizontal, left for vertical. */
        underline:
          'top-auto bottom-0 left-[var(--active-tab-left)] h-0.5 w-[var(--active-tab-width)] rounded-none bg-primary shadow-none data-[orientation=vertical]:top-[var(--active-tab-top)] data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:h-[var(--active-tab-height)] data-[orientation=vertical]:w-0.5'
      }
    },
    defaultVariants: { variant: 'pill' }
  }
)

export type TabsIndicatorVariantProps = VariantProps<typeof tabsIndicatorVariants>

function TabsIndicator({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator> & TabsIndicatorVariantProps) {
  return (
    <BaseTabs.Indicator
      data-slot='tabs-indicator'
      className={cn(tabsIndicatorVariants({ variant }), className as string)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------- Panel */

function TabsPanel({ className, ...props }: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      data-slot='tabs-panel'
      className={cn(
        'flex-1 rounded-(--radius) border border-border bg-card p-4 text-sm text-card-foreground outline-none',
        'transition-all duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        'motion-safe:data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%]',
        'motion-safe:data-[starting-style]:data-[activation-direction=right]:translate-x-[50%]',
        'motion-safe:data-[ending-style]:data-[activation-direction=left]:translate-x-[50%]',
        'motion-safe:data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%]',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

/** shadcn-style aliases. */
const TabsTrigger = TabsTab
const TabsContent = TabsPanel

export { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanel, TabsTrigger, TabsContent }
