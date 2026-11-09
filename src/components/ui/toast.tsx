import * as React from 'react'
import { Toast as BaseToast } from '@base-ui/react/toast'
import { XIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { PopupArrowGlyph } from '@/lib/popup-arrow'
import { Button, type ButtonProps } from './button'

/** Props of the `Toast` root for a single toast object. */
export type ToastRootProps<Data extends object = object> = BaseToast.Root.Props & {
  toast: BaseToast.Root.ToastObject<Data>
}

/** Renders no element of its own; only provides the toast manager context. */
function ToastProvider(props: React.ComponentProps<typeof BaseToast.Provider>) {
  return <BaseToast.Provider {...props} />
}

export const toastRootVariants = cva(
  cn(
    'w-full cursor-pointer rounded-(--radius) border p-4 text-sm text-foreground shadow-md select-none',
    'origin-bottom',
    '[--gap:0.5rem] [--peek:0.5rem]',
    '[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]',
    '[--shrink:calc(1-var(--scale))]',
    '[--height:var(--toast-frontmost-height,var(--toast-height))]',
    'absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))]',
    'h-[var(--height)]',
    '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
    'transition-[transform,opacity,height] duration-300 ease-out',
    'data-expanded:h-[var(--toast-height)]',
    'data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)*-1-var(--toast-index)*var(--gap)+var(--toast-swipe-movement-y)))]',
    'data-limited:opacity-0',
    'data-starting-style:translate-y-[150%]',
    'data-ending-style:opacity-0',
    'data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
    'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
    'data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))]',
    'data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))]',
    'data-swiping:transition-none',
    // `data-type` drives the accent border per toast type.
    'bg-popover',
    'data-[type=success]:border-success/40 data-[type=success]:[background-image:linear-gradient(color-mix(in_oklab,var(--success)_10%,transparent),color-mix(in_oklab,var(--success)_10%,transparent))]',
    'data-[type=error]:border-destructive/40 data-[type=error]:[background-image:linear-gradient(color-mix(in_oklab,var(--destructive)_10%,transparent),color-mix(in_oklab,var(--destructive)_10%,transparent))]',
    'data-[type=warning]:border-warning/40 data-[type=warning]:[background-image:linear-gradient(color-mix(in_oklab,var(--warning)_10%,transparent),color-mix(in_oklab,var(--warning)_10%,transparent))]',
    'data-[type=loading]:border-border',
    focusRing
  ),
  {
    variants: {
      /** `stacked` collapses the stack behind the frontmost toast; `flat` stacks them visibly. */
      layout: {
        stacked: '',
        flat: 'static h-auto'
      }
    },
    defaultVariants: { layout: 'stacked' }
  }
)

type ToastRootComponentProps = React.ComponentProps<typeof BaseToast.Root> & VariantProps<typeof toastRootVariants>

function ToastRoot({ className, layout, ...props }: ToastRootComponentProps) {
  return <BaseToast.Root data-slot='toast-root' className={cn(toastRootVariants({ layout }), className)} {...props} />
}

function ToastContent({ className, ...props }: React.ComponentProps<typeof BaseToast.Content>) {
  return (
    <BaseToast.Content
      data-slot='toast-content'
      className={cn(
        'flex items-start gap-3 overflow-hidden transition-opacity duration-200',
        'data-behind:opacity-0 data-expanded:opacity-100',
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof BaseToast.Title>) {
  return <BaseToast.Title data-slot='toast-title' className={cn('text-sm font-medium', className)} {...props} />
}

function ToastDescription({ className, ...props }: React.ComponentProps<typeof BaseToast.Description>) {
  return (
    <BaseToast.Description
      data-slot='toast-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export const toastCloseVariants = cva(
  cn(
    'inline-flex cursor-pointer shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-(--radius) border border-input bg-background px-3 text-sm leading-none font-medium text-foreground transition-colors select-none',
    'hover:bg-accent hover:text-accent-foreground',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    focusRing
  ),
  {
    variants: {
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2.5 text-xs',
        icon: 'size-8 p-0 [&_svg]:size-4'
      },
      variant: {
        outline: '',
        ghost: 'border-transparent bg-transparent'
      }
    },
    defaultVariants: { size: 'default', variant: 'outline' }
  }
)

type ToastCloseProps = React.ComponentProps<typeof BaseToast.Close> & Pick<ButtonProps, 'variant' | 'size'>

/** Icon X by default; pass text `children` for a labelled button. `variant`/`size` always override the defaults. */
function ToastClose({ className, size, variant, children, ...props }: ToastCloseProps) {
  const iconOnly = children == null
  return (
    <BaseToast.Close
      data-slot='toast-close'
      className={className}
      render={
        <Button
          variant={variant ?? 'outline'}
          size={size ?? (iconOnly ? 'icon' : 'default')}
        />
      }
      {...props}
    >
      {children ?? <XIcon className='size-4' />}
    </BaseToast.Close>
  )
}

function ToastAction({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<typeof BaseToast.Action> & VariantProps<typeof toastCloseVariants>) {
  return (
    <BaseToast.Action
      data-slot='toast-action'
      className={cn(toastCloseVariants({ size, variant }), className)}
      {...props}
    />
  )
}

function ToastPortal({ className, ...props }: React.ComponentProps<typeof BaseToast.Portal>) {
  return <BaseToast.Portal data-slot='toast-portal' className={cn(className)} {...props} />
}

/** Anchors a toast to a trigger element instead of stacking it in the viewport. */
function ToastPositioner({ className, ...props }: React.ComponentProps<typeof BaseToast.Positioner>) {
  return (
    <BaseToast.Positioner
      data-slot='toast-positioner'
      className={cn('z-[9999] outline-hidden', className)}
      {...props}
    />
  )
}

function ToastArrow({ className, children, ...props }: React.ComponentProps<typeof BaseToast.Arrow>) {
  return (
    <BaseToast.Arrow
      data-slot='toast-arrow'
      className={cn('pointer-events-none absolute z-10 flex h-2.5 w-5 items-center justify-center', className)}
      {...props}
    >
      {children ?? <PopupArrowGlyph />}
    </BaseToast.Arrow>
  )
}

function ToastViewport({ className, ...props }: React.ComponentProps<typeof BaseToast.Viewport>) {
  return (
    <BaseToast.Viewport
      data-slot='toast-viewport'
      className={cn(
        'fixed right-4 bottom-4 z-[9999] mx-auto flex w-[calc(100vw-2rem)] max-w-sm flex-col-reverse outline-hidden',
        className
      )}
      {...props}
    />
  )
}

/** Re-exported Base UI helpers so demos never need the raw package. */
export const useToastManager = BaseToast.useToastManager
export const createToastManager = BaseToast.createToastManager

export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastPortal,
  ToastPositioner,
  ToastArrow
}
