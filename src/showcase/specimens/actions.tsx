import * as React from 'react'
import { PlusIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'

export function isIconSize(size?: string) {
  return size?.startsWith('icon') ?? false
}

export function ButtonSpecimenContent({
  size,
  label,
  close = false
}: {
  size?: string
  label: string
  close?: boolean
}) {
  if (!isIconSize(size)) return label
  return close ? <XIcon aria-hidden /> : <PlusIcon aria-hidden />
}

/* ------------------------------------------------------------------ Button */

export function ButtonSpecimen({ variant, size }: { variant?: string; size?: string }) {
  const icon = isIconSize(size)
  return (
    <Button
      variant={variant as React.ComponentProps<typeof Button>['variant']}
      size={size as React.ComponentProps<typeof Button>['size']}
      aria-label={icon ? (size ?? 'icon') : undefined}
    >
      {icon ? <PlusIcon aria-hidden /> : variant === 'link' ? 'Link' : 'Button'}
    </Button>
  )
}

/* ------------------------------------------------------------------ Toggle */

export function ToggleSpecimen({ variant, size }: { variant?: string; size?: string }) {
  const isIcon = size?.startsWith('icon')
  return (
    <Toggle
      variant={variant as React.ComponentProps<typeof Toggle>['variant']}
      size={size as React.ComponentProps<typeof Toggle>['size']}
      defaultPressed
      aria-label={`toggle ${variant ?? size ?? ''}`}
    >
      {isIcon ? <PlusIcon aria-hidden /> : 'Bold'}
    </Toggle>
  )
}

export function ToggleGroupSpecimen({
  variant,
  size,
  orientation
}: {
  variant?: string
  size?: string
  orientation?: string
}) {
  return (
    <ToggleGroup
      variant={variant as React.ComponentProps<typeof ToggleGroup>['variant']}
      size={size as React.ComponentProps<typeof ToggleGroup>['size']}
      orientation={orientation as React.ComponentProps<typeof ToggleGroup>['orientation']}
      defaultValue={['a']}
      aria-label={`toggle group ${variant ?? size ?? orientation ?? ''}`}
    >
      <Toggle value='a'>A</Toggle>
      <Toggle value='b'>B</Toggle>
    </ToggleGroup>
  )
}

/* ----------------------------------------------------------------- Toolbar */

export function ToolbarSpecimen({
  size,
  isActivated,
  orientation
}: {
  size?: string
  isActivated?: string
  orientation?: string
}) {
  const icon = size === 'icon'
  return (
    <Toolbar orientation={orientation as React.ComponentProps<typeof Toolbar>['orientation']}>
      <ToolbarButton
        size={size as React.ComponentProps<typeof ToolbarButton>['size']}
        isActivated={isActivated === 'true'}
        aria-label='Bold'
      >
        {icon ? <PlusIcon aria-hidden /> : 'B'}
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton size={size as React.ComponentProps<typeof ToolbarButton>['size']} aria-label='Italic'>
        {icon ? <PlusIcon aria-hidden /> : 'I'}
      </ToolbarButton>
    </Toolbar>
  )
}
