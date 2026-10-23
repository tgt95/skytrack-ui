import * as React from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { CaretRight, Check } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

/**
 * Shared row styling for every menu item part (Item, LinkItem, CheckboxItem,
 * RadioItem, SubmenuTrigger). `variant="destructive"` is the destructive item variant.
 */
export const menuItemVariants = cva(
  cn(
    'relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-popover-foreground select-none outline-none transition-colors',
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

export type MenuItemVariantProps = VariantProps<typeof menuItemVariants>

/* ------------------------------------------------------------------ Root */

/**
 * `Menu` and `MenuTrigger` keep Base UI's `Payload` generic so that
 * `Menu.createHandle<Payload>()` + the payload render function stay typed.
 */
function Menu<Payload = unknown>(props: BaseMenu.Root.Props<Payload>) {
  return <BaseMenu.Root<Payload> {...props} />
}

function MenuTrigger<Payload = unknown>({ className, render, ...props }: BaseMenu.Trigger.Props<Payload>) {
  // A custom rendered trigger owns its visual style (for example, a Button). Avoid stacking the
  // default outlined menu-trigger classes on top of the rendered component's variant.
  return (
    <BaseMenu.Trigger<Payload>
      data-slot='menu-trigger'
      className={cn(
        render == null
          ? cn(
              'inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium whitespace-nowrap text-foreground select-none transition-colors',
              'hover:bg-accent hover:text-accent-foreground active:bg-muted',
              'data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground',
              'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              focusRing
            )
          : '',
        className as string
      )}
      render={render}
      {...props}
    />
  )
}

function MenuPortal({ className, ...props }: React.ComponentProps<typeof BaseMenu.Portal>) {
  return <BaseMenu.Portal data-slot='menu-portal' className={cn(className as string)} {...props} />
}

function MenuBackdrop({ className, ...props }: React.ComponentProps<typeof BaseMenu.Backdrop>) {
  return (
    <BaseMenu.Backdrop
      data-slot='menu-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-150',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function MenuPositioner({ className, ...props }: React.ComponentProps<typeof BaseMenu.Positioner>) {
  return (
    <BaseMenu.Positioner
      data-slot='menu-positioner'
      className={cn('z-50 outline-hidden', className as string)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------- Popup */

function MenuPopup({ className, ...props }: React.ComponentProps<typeof BaseMenu.Popup>) {
  return (
    <BaseMenu.Popup
      data-slot='menu-popup'
      className={cn(
        'origin-[var(--transform-origin)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
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

function MenuArrow({ className, ...props }: React.ComponentProps<typeof BaseMenu.Arrow>) {
  return (
    <BaseMenu.Arrow
      data-slot='menu-arrow'
      className={cn(
        'h-2 w-2 rotate-45 rounded-md border border-border bg-popover',
        'data-[side=top]:-bottom-1 data-[side=top]:-rotate-135',
        'data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45',
        'data-[side=left]:-right-1 data-[side=left]:rotate-225',
        'data-[side=right]:-left-1 data-[side=right]:rotate-135',
        'data-[side=inline-start]:-right-1 data-[side=inline-start]:-rotate-45',
        'data-[side=inline-end]:-left-1 data-[side=inline-end]:-rotate-225',
        className as string
      )}
      {...props}
    />
  )
}

function MenuViewport({ className, ...props }: React.ComponentProps<typeof BaseMenu.Viewport>) {
  return <BaseMenu.Viewport data-slot='menu-viewport' className={cn('relative', className as string)} {...props} />
}

/* ------------------------------------------------------------------ Items */

function MenuGroup({ className, ...props }: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot='menu-group' className={cn(className as string)} {...props} />
}

function MenuGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      data-slot='menu-group-label'
      className={cn(
        'px-2 py-1.5 text-xs font-medium tracking-wide text-muted-foreground select-none',
        className as string
      )}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      data-slot='menu-separator'
      className={cn('-mx-1 my-1 h-px shrink-0 bg-border', className as string)}
      {...props}
    />
  )
}

type MenuItemProps = React.ComponentProps<typeof BaseMenu.Item> & MenuItemVariantProps

function MenuItem({ className, variant, inset, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot='menu-item'
      className={cn(menuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

type MenuLinkItemProps = React.ComponentProps<typeof BaseMenu.LinkItem> & MenuItemVariantProps

function MenuLinkItem({ className, variant, inset, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      data-slot='menu-link-item'
      className={cn(menuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------- Submenus */

function MenuSubmenuRoot(props: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot {...props} />
}

type MenuSubmenuTriggerProps = React.ComponentProps<typeof BaseMenu.SubmenuTrigger> & MenuItemVariantProps

function MenuSubmenuTrigger({ className, children, variant, inset, ...props }: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot='menu-submenu-trigger'
      className={cn(
        menuItemVariants({ variant, inset }),
        'justify-between data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground',
        className as string
      )}
      {...props}
    >
      {children}
      <CaretRight className='ml-auto' />
    </BaseMenu.SubmenuTrigger>
  )
}

/* ------------------------------------------------------------ Radio/Check */

function MenuRadioGroup({ className, ...props }: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return <BaseMenu.RadioGroup data-slot='menu-radio-group' className={cn('py-0.5', className as string)} {...props} />
}

type MenuRadioItemProps = React.ComponentProps<typeof BaseMenu.RadioItem> & MenuItemVariantProps

function MenuRadioItem({ className, variant, inset, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot='menu-radio-item'
      className={cn(menuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

function MenuRadioItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItemIndicator>) {
  return (
    <BaseMenu.RadioItemIndicator
      data-slot='menu-radio-item-indicator'
      className={cn(
        'absolute left-2 flex size-4 items-center justify-center text-current',
        'transition-all data-[starting-style]:scale-50 data-[starting-style]:opacity-0 data-[ending-style]:scale-50 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    >
      {children ?? <span className='size-2 rounded-full bg-current' />}
    </BaseMenu.RadioItemIndicator>
  )
}

type MenuCheckboxItemProps = React.ComponentProps<typeof BaseMenu.CheckboxItem> & MenuItemVariantProps

function MenuCheckboxItem({ className, variant, inset, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot='menu-checkbox-item'
      className={cn(menuItemVariants({ variant, inset }), className as string)}
      {...props}
    />
  )
}

function MenuCheckboxItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItemIndicator>) {
  return (
    <BaseMenu.CheckboxItemIndicator
      data-slot='menu-checkbox-item-indicator'
      className={cn(
        'absolute left-2 flex size-4 items-center justify-center text-current',
        'transition-all data-[starting-style]:scale-75 data-[starting-style]:opacity-0 data-[ending-style]:scale-75 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    >
      {children ?? <Check className='size-3.5' weight='bold' />}
    </BaseMenu.CheckboxItemIndicator>
  )
}

/* ------------------------------------------------------------- Shortcuts */

function MenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='menu-shortcut'
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className as string)}
      {...props}
    />
  )
}

/** Base UI helper for detached triggers (`Menu.createHandle()` in the docs). */
function createMenuHandle<Payload = unknown>() {
  return BaseMenu.createHandle<Payload>()
}
type MenuRootHandle<Payload = unknown> = BaseMenu.Handle<Payload>

export {
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuBackdrop,
  MenuPositioner,
  MenuPopup,
  MenuArrow,
  MenuViewport,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  MenuItem,
  MenuLinkItem,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuShortcut,
  createMenuHandle
}

export type { MenuRootHandle }
