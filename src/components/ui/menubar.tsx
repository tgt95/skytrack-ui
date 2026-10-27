import * as React from 'react'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { cn } from '@/lib/utils'

/**
 * Container for a row of `Menu.Root` instances. Menus themselves come from
 * `@/components/ui/menu`; this only styles the bar that holds the triggers.
 */
function Menubar({ className, ...props }: React.ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      data-slot='menubar'
      className={cn(
        'flex items-center gap-1 rounded-(--radius) border border-border bg-background p-1',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        'data-[disabled]:opacity-50',
        className as string
      )}
      {...props}
    />
  )
}

export { Menubar }
