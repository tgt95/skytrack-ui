import * as React from 'react'
import { CaretDownIcon } from '@phosphor-icons/react'
import type { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants, type ButtonProps } from '@/components/ui/button'
import type { ControlSize } from '@/lib/control-sizes'
import { cn } from '@/lib/utils'

/**
 * Split Button reuses the Button variant and size axes instead of defining its own
 * visual tokens. Deriving the types from `buttonVariants` keeps the two in sync:
 * a new Button variant or control height reaches Split Button without edits here.
 */
export type SplitButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>

/** Control heights shared with Button (xs 24 · sm 32 · default 40 · lg 48 px). */
export type SplitButtonSize = ControlSize

type SplitButtonContextValue = {
  variant: SplitButtonVariant
  size: SplitButtonSize
  disabled: boolean
}

const SplitButtonContext = React.createContext<SplitButtonContextValue | null>(null)

function useSplitButtonContext() {
  return React.useContext(SplitButtonContext) ?? { variant: 'default', size: 'default', disabled: false }
}

/**
 * Maps the shared control height to the matching square Button size, so the trigger
 * is exactly as tall as the action without a second size scale.
 */
const TRIGGER_SIZE: Record<ControlSize, 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'> = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  default: 'icon',
  lg: 'icon-lg'
}

const splitButtonRootClasses = cn(
  'inline-flex items-stretch',
  '[&>[data-split-button-part=action]]:rounded-r-none',
  '[&>[data-split-button-part=trigger]]:rounded-l-none',
  '[&>[data-split-button-part=trigger]]:-ml-px',
  '[&>[data-split-button-part]:focus-visible]:relative',
  '[&>[data-split-button-part]:focus-visible]:z-10'
)

/**
 * Filled variants have no border of their own, so the trigger draws the seam.
 * `outline` and `link` are excluded: `outline` already brings a 1px border on both
 * parts, and a second border colour there produces a darker, uneven seam.
 */
const splitButtonDividerClasses = cn(
  '[&>[data-split-button-part=trigger]]:border-l',
  '[&>[data-split-button-part=trigger]]:border-current/20'
)

export type SplitButtonProps = React.ComponentProps<'div'> & {
  /** Button variant applied to every part unless a part overrides it. */
  variant?: SplitButtonVariant
  /** Button control size applied to every part. The menu trigger keeps the same height. */
  size?: SplitButtonSize
  /** Disables the action and the menu trigger together. */
  disabled?: boolean
}

/**
 * Groups one primary action with a menu of related actions.
 * Use it only when one action is clearly dominant; for actions of equal weight use
 * a separate Button and Menu.
 */
function SplitButton({
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  children,
  ...props
}: SplitButtonProps) {
  return (
    <SplitButtonContext.Provider value={{ variant, size, disabled }}>
      <div
        data-slot='split-button'
        data-variant={variant}
        data-size={size}
        role='group'
        className={cn(
          splitButtonRootClasses,
          variant !== 'outline' && variant !== 'link' && splitButtonDividerClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SplitButtonContext.Provider>
  )
}

export type SplitButtonActionProps = Omit<ButtonProps, 'variant' | 'size'>

/** The dominant action. Renders a standard Button with inherited variant and size. */
function SplitButtonAction({ className, disabled, ...props }: SplitButtonActionProps) {
  const context = useSplitButtonContext()

  return (
    <Button
      variant={context.variant}
      size={context.size}
      disabled={disabled ?? context.disabled}
      data-split-button-part='action'
      className={cn('relative', className)}
      {...props}
    />
  )
}

export type SplitButtonTriggerProps = Omit<ButtonProps, 'variant' | 'size' | 'children'> & {
  /** Accessible name for the menu trigger. Required: the caret alone has no label. */
  'aria-label': string
  /** Replaces the default caret icon. Keep it decorative. */
  children?: React.ReactNode
}

/**
 * The menu trigger. Compose it with `MenuTrigger render={<SplitButtonTrigger />}` so the
 * popup, keyboard behavior, and `aria-expanded` stay owned by Menu.
 */
function SplitButtonTrigger({ className, disabled, children, ...props }: SplitButtonTriggerProps) {
  const context = useSplitButtonContext()

  return (
    <Button
      variant={context.variant}
      size={TRIGGER_SIZE[context.size]}
      disabled={disabled ?? context.disabled}
      data-split-button-part='trigger'
      className={cn('relative', className)}
      {...props}
    >
      {children ?? <CaretDownIcon aria-hidden='true' />}
    </Button>
  )
}

export { SplitButton, SplitButtonAction, SplitButtonTrigger }
