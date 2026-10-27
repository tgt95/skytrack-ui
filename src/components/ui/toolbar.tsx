import * as React from 'react'
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

export const toolbarButtonVariants = cva(
  cn(
    'inline-flex cursor-pointer shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-(--radius) text-sm font-medium text-foreground select-none transition-colors',
    'hover:bg-accent hover:text-accent-foreground active:bg-muted',
    'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing
  ),
  {
    variants: {
      isActivated: {
        true: 'bg-primary text-primary-foreground',
        false: ''
      },
      size: {
        default: 'h-8 min-w-8 px-2.5 data-[orientation=vertical]:w-full',
        sm: 'h-7 min-w-7 px-2 text-xs data-[orientation=vertical]:w-full',
        lg: 'h-9 min-w-9 px-3 data-[orientation=vertical]:w-full',
        icon: 'size-8'
      }
    },
    defaultVariants: { isActivated: false, size: 'default' }
  }
)

export type ToolbarButtonVariantProps = VariantProps<typeof toolbarButtonVariants>

/* ------------------------------------------------------------------ Root */

function Toolbar({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Root>) {
  return (
    <BaseToolbar.Root
      data-slot='toolbar'
      className={cn(
        'inline-flex w-fit items-center gap-1 rounded-(--radius) border border-border bg-background p-1',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        'data-[disabled]:opacity-50',
        className as string
      )}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group
      data-slot='toolbar-group'
      className={cn(
        'flex items-center gap-1',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className as string
      )}
      {...props}
    />
  )
}

function ToolbarSeparator({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Separator>) {
  return (
    <BaseToolbar.Separator
      data-slot='toolbar-separator'
      className={cn(
        'mx-1 my-1 shrink-0 bg-border',
        'data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px',
        'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
        className as string
      )}
      {...props}
    />
  )
}

/* ---------------------------------------------------------------- Button */

type ToolbarButtonProps = React.ComponentProps<typeof BaseToolbar.Button> & ToolbarButtonVariantProps

function ToolbarButton({ className, isActivated, size, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      data-slot='toolbar-button'
      className={cn(toolbarButtonVariants({ isActivated, size }), className as string)}
      {...props}
    />
  )
}

function ToolbarLink({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link
      data-slot='toolbar-link'
      className={cn(
        'inline-flex cursor-pointer shrink-0 items-center gap-1.5 rounded-(--radius) px-2 text-sm text-muted-foreground no-underline transition-colors select-none',
        'hover:text-foreground',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ Input */

function ToolbarInput({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Input>) {
  return (
    <BaseToolbar.Input
      data-slot='toolbar-input'
      className={cn(
        'h-8 min-w-0 flex-1 rounded-(--radius) border border-input bg-background px-2 text-sm text-foreground',
        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

export { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarButton, ToolbarLink, ToolbarInput }
