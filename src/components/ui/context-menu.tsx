import * as React from 'react'
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { CaretRightIcon, CheckIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Context menus reuse the Menu row styling so a right-clicked popup and a
 * clicked popup look identical. `variant="destructive"` is the destructive item variant.
 */
export const contextMenuItemVariants = cva(
  cn(
    'relative flex cursor-pointer items-center gap-2 rounded-(--radius) px-2 py-1.5 text-left text-sm text-popover-foreground select-none outline-none transition-colors',
    'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {
      variant: {
        default: '',
        destructive: 'text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-white'
      },
      inset: {
        true: 'pl-8',
        false: ''
      }
    },
    defaultVariants: { variant: 'default', inset: false }
  }
)

export type ContextMenuItemVariantProps = VariantProps<typeof contextMenuItemVariants>

/* ------------------------------------------------------------------ Root */

function ContextMenu(props: React.ComponentProps<typeof BaseContextMenu.Root>) {
  return <BaseContextMenu.Root {...props} />
}

function ContextMenuTrigger({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Trigger>) {
  return (
    <BaseContextMenu.Trigger
      data-slot='context-menu-trigger'
      className={className}
      {...props}
    />
  )
}

function ContextMenuPortal({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Portal>) {
  return <BaseContextMenu.Portal data-slot='context-menu-portal' className={cn(className as string)} {...props} />
}

function ContextMenuBackdrop({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Backdrop>) {
  return (
    <BaseContextMenu.Backdrop
      data-slot='context-menu-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-150',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function ContextMenuPositioner({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Positioner>) {
  return (
    <BaseContextMenu.Positioner
      data-slot='context-menu-positioner'
      className={cn('z-50 outline-hidden', className as string)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------- Popup */

function ContextMenuPopup({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Popup>) {
  return (
    <BaseContextMenu.Popup
      data-slot='context-menu-popup'
      className={cn(
        'origin-[var(--transform-origin)] rounded-(--radius) border border-border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
        'max-h-[var(--available-height)] min-w-[8rem] overflow-y-auto overscroll-contain',
        'transition-[scale,opacity] duration-100 ease-out data-[instant]:transition-none',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function ContextMenuArrow({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Arrow>) {
  return (
    <BaseContextMenu.Arrow
      data-slot='context-menu-arrow'
      className={cn(
        'h-2 w-2 rotate-45 rounded-(--radius) border border-border bg-popover',
        'data-[side=top]:-bottom-1 data-[side=top]:-rotate-135',
        'data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45',
        'data-[side=left]:-right-1 data-[side=left]:rotate-225',
        'data-[side=right]:-left-1 data-[side=right]:rotate-135',
        className as string
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ Items */

function ContextMenuGroup({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Group>) {
  return <BaseContextMenu.Group data-slot='context-menu-group' className={cn(className as string)} {...props} />
}

function ContextMenuGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.GroupLabel>) {
  return (
    <BaseContextMenu.GroupLabel
      data-slot='context-menu-group-label'
      className={cn(
        'px-2 py-1.5 text-xs font-medium tracking-wide text-muted-foreground select-none',
        className as string
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Separator>) {
  return (
    <BaseContextMenu.Separator
      data-slot='context-menu-separator'
      className={cn('-mx-1 my-1 h-px shrink-0 bg-border', className as string)}
      {...props}
    />
  )
}

type ContextMenuItemProps = React.ComponentProps<typeof BaseContextMenu.Item> & ContextMenuItemVariantProps

function ContextMenuItem({ className, variant, inset, ...props }: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      data-slot='context-menu-item'
      className={cn(contextMenuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

type ContextMenuLinkItemProps = React.ComponentProps<typeof BaseContextMenu.LinkItem> & ContextMenuItemVariantProps

function ContextMenuLinkItem({ className, variant, inset, ...props }: ContextMenuLinkItemProps) {
  return (
    <BaseContextMenu.LinkItem
      data-slot='context-menu-link-item'
      className={cn(contextMenuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------- Submenus */

function ContextMenuSubmenuRoot(props: React.ComponentProps<typeof BaseContextMenu.SubmenuRoot>) {
  return <BaseContextMenu.SubmenuRoot {...props} />
}

type ContextMenuSubmenuTriggerProps = React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger> &
  ContextMenuItemVariantProps

function ContextMenuSubmenuTrigger({ className, children, variant, inset, ...props }: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      data-slot='context-menu-submenu-trigger'
      className={cn(
        contextMenuItemVariants({ variant, inset }),
        'justify-between data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground',
        className as string
      )}
      {...props}
    >
      {children}
      <CaretRightIcon className='ml-auto' />
    </BaseContextMenu.SubmenuTrigger>
  )
}

/* ------------------------------------------------------------ Radio/Check */

function ContextMenuRadioGroup({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.RadioGroup>) {
  return (
    <BaseContextMenu.RadioGroup
      data-slot='context-menu-radio-group'
      className={cn('py-0.5', className as string)}
      {...props}
    />
  )
}

type ContextMenuRadioItemProps = React.ComponentProps<typeof BaseContextMenu.RadioItem> & ContextMenuItemVariantProps

function ContextMenuRadioItem({ className, variant, inset, ...props }: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem
      data-slot='context-menu-radio-item'
      className={cn(contextMenuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

function ContextMenuRadioItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.RadioItemIndicator>) {
  return (
    <BaseContextMenu.RadioItemIndicator
      data-slot='context-menu-radio-item-indicator'
      className={cn(
        'absolute left-2 flex size-4 items-center justify-center text-current',
        'transition-all data-[starting-style]:scale-50 data-[starting-style]:opacity-0 data-[ending-style]:scale-50 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    >
      {children ?? <span className='size-2 rounded-full bg-current' />}
    </BaseContextMenu.RadioItemIndicator>
  )
}

type ContextMenuCheckboxItemProps = React.ComponentProps<typeof BaseContextMenu.CheckboxItem> &
  ContextMenuItemVariantProps

function ContextMenuCheckboxItem({ className, variant, inset, ...props }: ContextMenuCheckboxItemProps) {
  return (
    <BaseContextMenu.CheckboxItem
      data-slot='context-menu-checkbox-item'
      className={cn(contextMenuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

function ContextMenuCheckboxItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.CheckboxItemIndicator>) {
  return (
    <BaseContextMenu.CheckboxItemIndicator
      data-slot='context-menu-checkbox-item-indicator'
      className={cn(
        'absolute left-2 flex size-4 items-center justify-center text-current',
        'transition-all data-[starting-style]:scale-75 data-[starting-style]:opacity-0 data-[ending-style]:scale-75 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    >
      {children ?? <CheckIcon className='size-3.5' weight='bold' />}
    </BaseContextMenu.CheckboxItemIndicator>
  )
}

/* ------------------------------------------------------------- Shortcuts */

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='context-menu-shortcut'
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className as string)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuBackdrop,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuArrow,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuSeparator,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuShortcut
}
