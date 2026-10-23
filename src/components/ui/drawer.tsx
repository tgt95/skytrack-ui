import * as React from 'react'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

/** Shared variant/size props for `DrawerTrigger` and `DrawerClose`. */
export type DrawerButtonProps = VariantProps<typeof buttonVariants>

/**
 * Drawer — a panel that slides in from the edge of the screen, with
 * swipe-to-dismiss gestures. `Drawer.Root`, `Drawer.Provider` and
 * `Drawer.VirtualKeyboardProvider` render no element of their own, so they are
 * re-exported as-is.
 */
const Drawer = BaseDrawer.Root
const DrawerProvider = BaseDrawer.Provider
const DrawerVirtualKeyboardProvider = BaseDrawer.VirtualKeyboardProvider

/** Creates a handle that lets detached triggers control this drawer. */
const createHandle = BaseDrawer.createHandle

type DrawerChangeEventDetails = Parameters<NonNullable<React.ComponentProps<typeof BaseDrawer.Root>['onOpenChange']>>[1]

type DrawerSnapPoint = NonNullable<React.ComponentProps<typeof BaseDrawer.Root>['snapPoints']>[number]

/**
 * Side variants for the positioning container and the panel itself.
 * Keep `side` in sync with `swipeDirection` on `Drawer.Root`.
 */
export const drawerSideVariants = cva('', {
  variants: {
    side: {
      bottom: 'items-end justify-center',
      top: 'items-start justify-center',
      left: 'items-stretch justify-start',
      right: 'items-stretch justify-end'
    }
  },
  defaultVariants: { side: 'bottom' }
})

export const drawerPopupVariants = cva(
  cn(
    'flex max-h-dvh w-full flex-col overflow-y-auto overscroll-contain rounded-lg border border-border bg-background text-foreground shadow-lg outline-none',
    'transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform',
    'data-[swiping]:select-none',
    'data-[ending-style]:duration-[calc(var(--drawer-swipe-strength,0)*400ms)]',
    'motion-reduce:transition-none'
  ),
  {
    variants: {
      side: {
        bottom: cn(
          'max-h-[80vh] rounded-b-none border-b-0 px-6 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]',
          '[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]',
          'data-[starting-style]:[transform:translateY(100%)] data-[ending-style]:[transform:translateY(100%)]'
        ),
        top: cn(
          'max-h-[80vh] rounded-t-none border-t-0 px-6 py-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))]',
          '[transform:translateY(calc(var(--drawer-snap-point-offset,0px)*-1+var(--drawer-swipe-movement-y,0px)))]',
          'data-[starting-style]:[transform:translateY(-100%)] data-[ending-style]:[transform:translateY(-100%)]'
        ),
        left: cn(
          'h-full max-w-[calc(100vw-3rem)] rounded-r-none border-r-0 py-6 pr-6 pl-[calc(1.5rem+env(safe-area-inset-left,0px))]',
          'w-[20rem]',
          '[transform:translateX(calc(var(--drawer-snap-point-offset,0px)*-1+var(--drawer-swipe-movement-x,0px)))]',
          'data-[starting-style]:[transform:translateX(-100%)] data-[ending-style]:[transform:translateX(-100%)]'
        ),
        right: cn(
          'h-full max-w-[calc(100vw-3rem)] rounded-l-none border-l-0 py-6 pl-6 pr-[calc(1.5rem+env(safe-area-inset-right,0px))]',
          'w-[20rem]',
          '[transform:translateX(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-x,0px)))]',
          'data-[starting-style]:[transform:translateX(100%)] data-[ending-style]:[transform:translateX(100%)]'
        )
      }
    },
    defaultVariants: { side: 'bottom' }
  }
)

export type DrawerSideProps = VariantProps<typeof drawerSideVariants>

function DrawerTrigger({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Trigger> & DrawerButtonProps) {
  return (
    <BaseDrawer.Trigger
      data-slot='drawer-trigger'
      className={cn(buttonVariants({ variant: variant ?? 'outline', size }), className as string)}
      {...props}
    />
  )
}

function DrawerSwipeArea({ className, ...props }: React.ComponentProps<typeof BaseDrawer.SwipeArea>) {
  return (
    <BaseDrawer.SwipeArea
      data-slot='drawer-swipe-area'
      className={cn(
        'absolute z-40 touch-none',
        'data-[swipe-direction=down]:inset-x-0 top-0 h-10',
        'data-[swipe-direction=up]:inset-x-0 bottom-0 h-10',
        'data-[swipe-direction=left]:inset-y-0 left-0 w-10',
        'data-[swipe-direction=right]:inset-y-0 right-0 w-10',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function DrawerPortal({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Portal>) {
  return <BaseDrawer.Portal data-slot='drawer-portal' className={cn('z-50', className as string)} {...props} />
}

function DrawerBackdrop({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Backdrop>) {
  return (
    <BaseDrawer.Backdrop
      data-slot='drawer-backdrop'
      className={cn(
        'fixed inset-0 min-h-dvh bg-black/20 opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
        'supports-[-webkit-touch-callout:none]:absolute',
        'data-[swiping]:duration-0',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function DrawerViewport({
  className,
  side,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Viewport> & DrawerSideProps) {
  return (
    <BaseDrawer.Viewport
      data-slot='drawer-viewport'
      className={cn('fixed inset-0 z-50 flex', drawerSideVariants({ side }), className as string)}
      {...props}
    />
  )
}

function DrawerPopup({ className, side, ...props }: React.ComponentProps<typeof BaseDrawer.Popup> & DrawerSideProps) {
  return (
    <BaseDrawer.Popup
      data-slot='drawer-popup'
      className={cn(drawerPopupVariants({ side }), className as string)}
      {...props}
    />
  )
}

function DrawerContent({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Content>) {
  return (
    <BaseDrawer.Content
      data-slot='drawer-content'
      className={cn('flex w-full max-w-lg flex-col gap-4 text-sm outline-none', className as string)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      data-slot='drawer-title'
      className={cn('text-base leading-none font-semibold', className as string)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      data-slot='drawer-description'
      className={cn('text-sm text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function DrawerClose({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Close> & DrawerButtonProps) {
  return (
    <BaseDrawer.Close
      data-slot='drawer-close'
      className={cn(buttonVariants({ variant: variant ?? 'outline', size }), className as string)}
      {...props}
    />
  )
}

function DrawerIndentBackground({ className, ...props }: React.ComponentProps<typeof BaseDrawer.IndentBackground>) {
  return (
    <BaseDrawer.IndentBackground
      data-slot='drawer-indent-background'
      className={cn('fixed inset-0 -z-10 bg-background', className as string)}
      {...props}
    />
  )
}

function DrawerIndent({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Indent>) {
  return (
    <BaseDrawer.Indent
      data-slot='drawer-indent'
      className={cn(
        '[--indent-radius:calc(1rem*(1-var(--drawer-swipe-progress,0)))] [--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress,0)*100000),1))] relative origin-[center_top] bg-background will-change-transform',
        '[transform:scale(1)_translateY(0)]',
        '[transition:transform_400ms_cubic-bezier(0.32,0.72,0,1),border-radius_250ms_cubic-bezier(0.32,0.72,0,1)]',
        '[transition-duration:calc(400ms*var(--indent-transition)),calc(250ms*var(--indent-transition))]',
        'data-active:transform-[scale(calc(0.98+(0.02*var(--drawer-swipe-progress,0))))_translateY(calc(0.5rem*(1-var(--drawer-swipe-progress,0))))]',
        'data-active:rounded-tl-[var(--indent-radius)] data-active:rounded-tr-[var(--indent-radius)]',
        'motion-reduce:transition-none',
        className as string
      )}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerProvider,
  DrawerVirtualKeyboardProvider,
  createHandle,
  DrawerTrigger,
  DrawerSwipeArea,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerIndent,
  DrawerIndentBackground
}

export type { DrawerChangeEventDetails, DrawerSnapPoint }
