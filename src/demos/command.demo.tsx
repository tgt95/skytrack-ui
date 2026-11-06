import * as React from 'react'
import { CalendarBlankIcon, GearIcon, UserIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import type { DemoMeta } from '@/showcase/demo'

function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState('')

  return (
    <div className='flex flex-col items-start gap-3'>
      <Button variant='outline' onClick={() => setOpen(true)}>
        Open command menu <CommandShortcut>⌘K</CommandShortcut>
      </Button>
      <p aria-live='polite' className='text-sm text-muted-foreground'>
        {selected || 'Choose an action.'}
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem
              value='calendar'
              onSelect={() => {
                setSelected('Calendar opened')
                setOpen(false)
              }}
            >
              <CalendarBlankIcon aria-hidden='true' /> Calendar
            </CommandItem>
            <CommandItem
              value='profile'
              onSelect={() => {
                setSelected('Profile opened')
                setOpen(false)
              }}
            >
              <UserIcon aria-hidden='true' /> Profile <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem
              value='settings'
              onSelect={() => {
                setSelected('Settings opened')
                setOpen(false)
              }}
            >
              <GearIcon aria-hidden='true' /> Settings <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

function InlineCommand() {
  return (
    <Command className='w-full max-w-sm rounded-(--radius) border border-border'>
      <CommandInput placeholder='Search actions...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Workspace'>
          <CommandItem value='calendar'>Calendar</CommandItem>
          <CommandItem value='projects'>Projects</CommandItem>
          <CommandItem value='settings'>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const demo: DemoMeta = {
  id: 'command',
  title: 'Command',
  description: 'A searchable command menu for quick navigation and actions.',
  group: 'Menus & Navigation',
  variants: [
    { name: 'COMMAND PALETTE', render: () => <CommandPalette /> },
    { name: 'INLINE', render: () => <InlineCommand /> }
  ]
}
