import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

type TabsRootProps = React.ComponentProps<typeof BaseTabs.Root>

const TabsOrientationContext = React.createContext<'horizontal' | 'vertical'>('horizontal')

function Tabs ({ className, orientation = 'horizontal', ...props }: TabsRootProps) {
  return (
    <TabsOrientationContext.Provider value={orientation}>
      <BaseTabs.Root
        data-slot='tabs'
        orientation={orientation}
        className={cn('flex w-full flex-col gap-2', className as string)}
        {...props}
      />
    </TabsOrientationContext.Provider>
  )
}

/* ------------------------------------------------------------------ List */

const tabsListVariants = cva('relative z-0 flex items-center text-muted-foreground', {
  variants: {
    variant: {
      line: 'gap-4 rounded-none border-b border-border bg-transparent p-0 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-border data-[orientation=vertical]:data-[indicator-side=right]:border-l-0 data-[orientation=vertical]:data-[indicator-side=right]:border-r data-[orientation=vertical]:data-[indicator-side=right]:border-border',
      filled: 'gap-1 rounded-(--radius) bg-muted p-0.5',
      pill: 'gap-1 rounded-none bg-transparent p-0'
    },
    width: {
      full: 'w-full',
      hug: 'w-fit'
    },
    size: {
      xs: 'h-6',
      sm: 'h-8',
      default: 'h-9',
      lg: 'h-10'
    }
  },
  compoundVariants: [{ variant: 'filled', size: 'xs', class: 'p-0' }],
  defaultVariants: { variant: 'line', width: 'hug' }
})

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>
type TabsVariant = NonNullable<TabsListVariantProps['variant']>
const TabsVariantContext = React.createContext<TabsVariant>('line')
type TabsSize = 'xs' | 'sm' | 'default' | 'lg'
const TabsSizeContext = React.createContext<TabsSize>('default')
type TabsIndicatorSide = 'left' | 'right'
const TabsIndicatorSideContext = React.createContext<TabsIndicatorSide>('left')

type TabsListProps = React.ComponentProps<typeof BaseTabs.List> &
  TabsListVariantProps & {
    indicatorClassName?: string
    indicatorSide?: TabsIndicatorSide
    showIndicator?: boolean
    size?: TabsSize
  }

function TabsList ({
  children,
  className,
  indicatorClassName,
  variant = 'line',
  indicatorSide = 'left',
  showIndicator = true,
  size = 'default',
  width = 'hug',
  ...props
}: TabsListProps) {
  const resolvedVariant = variant ?? 'line'
  const orientation = React.useContext(TabsOrientationContext)
  const orientationClassName = orientation === 'vertical' ? 'h-auto self-start flex-col items-stretch' : undefined
  return (
    <TabsVariantContext.Provider value={resolvedVariant}>
      <TabsSizeContext.Provider value={size}>
        <TabsIndicatorSideContext.Provider value={indicatorSide}>
          <BaseTabs.List
            data-slot='tabs-list'
            data-variant={resolvedVariant}
            data-indicator-side={indicatorSide}
            data-orientation={orientation}
            data-size={size}
            className={cn(
              tabsListVariants({ variant: resolvedVariant, width, size }),
              orientationClassName,
              className as string
            )}
            {...props}
          >
            {children}
            {resolvedVariant === 'line' && showIndicator && (
              <TabsIndicator
                data-variant='line'
                data-side={indicatorSide}
                className={indicatorClassName}
              />
            )}
          </BaseTabs.List>
        </TabsIndicatorSideContext.Provider>
      </TabsSizeContext.Provider>
    </TabsVariantContext.Provider>
  )
}

/* ------------------------------------------------------------------- Tab */

const tabsTabVariants = cva(
  cn(
    'relative z-10 inline-flex h-full cursor-pointer flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-(--radius) font-medium transition-colors select-none',
    'hover:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    focusRing
  ),
  {
    variants: {
      variant: {
        line: 'rounded-none data-[active]:text-primary',
        filled:
          'data-[active]:border data-[active]:border-border data-[active]:bg-background data-[active]:text-foreground',
        pill: 'data-[active]:bg-secondary data-[active]:text-secondary-foreground dark:hover:bg-secondary/40 hover:bg-secondary/80'
      },
      size: {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
      }
    },
    compoundVariants: [{ variant: 'filled', size: 'xs', class: 'px-1.5 py-0' }],
    defaultVariants: { variant: 'line', size: 'default' }
  }
)

export type TabsTabVariantProps = VariantProps<typeof tabsTabVariants>

function TabsTab ({
  className,
  style,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab> & TabsTabVariantProps) {
  const listVariant = React.useContext(TabsVariantContext)
  const listSize = React.useContext(TabsSizeContext)
  const indicatorSide = React.useContext(TabsIndicatorSideContext)
  const orientation = React.useContext(TabsOrientationContext)
  const resolvedVariant = variant ?? listVariant
  const resolvedSize = size ?? listSize
  const verticalLine = resolvedVariant === 'line' && orientation === 'vertical'
  const verticalFilled = resolvedVariant === 'filled' && orientation === 'vertical'

  return (
    <BaseTabs.Tab
      data-slot='tabs-tab'
      data-variant={resolvedVariant}
      data-orientation={orientation}
      data-indicator-side={indicatorSide}
      className={cn(
        tabsTabVariants({ variant: resolvedVariant, size: resolvedSize }),
        verticalFilled && 'transition-[color,border-color]',
        className as string
      )}
      style={{
        ...style,
        ...(verticalLine
          ? {
              justifyContent: indicatorSide === 'right' ? 'flex-end' : 'flex-start',
              textAlign: indicatorSide === 'right' ? 'right' : 'left'
            }
          : {})
      }}
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
        /* Follow active tab edge: bottom for horizontal, left or right for vertical. */
        line: 'top-auto bottom-0 left-[var(--active-tab-left)] h-0.5 w-[var(--active-tab-width)] rounded-none bg-primary shadow-none data-[orientation=vertical]:left-0 data-[orientation=vertical]:top-[var(--active-tab-top)] data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:h-[var(--active-tab-height)] data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:data-[side=right]:left-auto data-[orientation=vertical]:data-[side=right]:right-0'
      }
    },
    defaultVariants: { variant: 'line' }
  }
)

export type TabsIndicatorVariantProps = VariantProps<typeof tabsIndicatorVariants>

function TabsIndicator ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator> & TabsIndicatorVariantProps) {
  return (
    <BaseTabs.Indicator
      data-slot='tabs-indicator'
      data-variant={variant ?? 'line'}
      className={cn(tabsIndicatorVariants({ variant }), className as string)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------- Panel */

function TabsPanel ({ className, ...props }: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      data-slot='tabs-panel'
      className={cn(
        'flex-1 outline-none',
        'transition-opacity duration-150 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none',
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
