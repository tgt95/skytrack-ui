import { useState } from 'react'
import {
  TerminalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowRightIcon,
  ChartBarIcon,
  FileTextIcon,
  GearSixIcon,
  CheckCircleIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import type { DemoMeta } from '@/showcase/demo'

export function CommandFirstShellMock() {
  const [paletteOpen, setPaletteOpen] = useState(true)

  const commands = [
    { id: 'new-invoice', label: 'Create new Invoice', group: 'Actions', icon: PlusIcon },
    { id: 'go-acme', label: 'Go to Customer: Acme Corp', group: 'Navigation', icon: ArrowRightIcon },
    { id: 'monthly-report', label: 'Run Monthly Financial Report', group: 'Analytics', icon: ChartBarIcon },
    { id: 'audit-log', label: 'View Security Audit Logs', group: 'System', icon: FileTextIcon },
    { id: 'api-keys', label: 'Rotate Production API Keys', group: 'Actions', icon: GearSixIcon }
  ]

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs relative'>
      {/* 1. Header with Prominent Command Search Bar */}
      <header className='flex h-12 shrink-0 items-center justify-between border-b border-border bg-card px-4'>
        <div className='flex items-center gap-2'>
          <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-primary-foreground font-bold'>
            <TerminalIcon className='size-4' />
          </div>
          <span className='font-bold text-foreground'>Linear Flow</span>
        </div>

        {/* Global Command Bar Input Trigger */}
        <div className='w-80 max-w-full'>
          <Button
            variant='outline'
            onClick={() => setPaletteOpen(true)}
            className='h-8 w-full justify-between font-normal text-muted-foreground hover:text-foreground px-3 text-xs bg-muted/30'
          >
            <div className='flex items-center gap-2'>
              <MagnifyingGlassIcon className='size-3.5' />
              <span>Search or type a command...</span>
            </div>
            <Badge size='sm' count='⌘ K' className='rounded-(--radius) text-[10px]' />
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => setPaletteOpen(!paletteOpen)}
            className='h-7 text-xs'
          >
            {paletteOpen ? 'Close Overlay' : 'Open Palette'}
          </Button>
          <Avatar size='xs'>
            <AvatarFallback className='text-[10px]'>DX</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* 2. Main Content Area (Background Workspace) */}
      <main className='flex-1 overflow-y-auto p-4 space-y-4 bg-background'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-semibold text-foreground'>Command Center</h3>
            <p className='text-xs text-muted-foreground'>
              Keyboard-first workspace designed for high-frequency operations.
            </p>
          </div>
          <Badge size='sm' count='Power User Mode' status='outline' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs sub-heading text-muted-foreground'>Recent Activity</div>
            <div className='mt-1 font-semibold text-foreground'>Deployed v4.12.0 to US-East</div>
            <div className='mt-1 flex items-center gap-1 text-[10px] text-success'>
              <CheckCircleIcon className='size-3' /> Success · 14m ago
            </div>
          </div>
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs sub-heading text-muted-foreground'>Active Workflows</div>
            <div className='mt-1 font-semibold text-foreground'>18 pipelines healthy</div>
            <div className='mt-1 text-[10px] text-muted-foreground'>Avg execution 120ms</div>
          </div>
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs sub-heading text-muted-foreground'>Quick Key</div>
            <div className='mt-1 font-mono font-medium text-foreground'>Press ⌘+K anytime</div>
            <div className='mt-1 text-[10px] text-muted-foreground'>Jump directly to any entity</div>
          </div>
        </div>
      </main>

      {/* 3. Command Palette Overlay using SkyTrack UI Command */}
      {paletteOpen && (
        <div className='absolute inset-0 bg-background/60 backdrop-blur-xs flex items-start justify-center pt-8 z-20 p-4'>
          <div className='w-full max-w-md rounded-(--radius) border border-border bg-popover shadow-lg overflow-hidden'>
            <Command className='rounded-none bg-transparent'>
              <CommandInput placeholder='Type a command or jump to entity...' className='text-xs h-9' />
              <CommandList className='max-h-52 text-xs'>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading='Suggestions'>
                  {commands.map((cmd) => {
                    const Icon = cmd.icon
                    return (
                      <CommandItem
                        key={cmd.id}
                        onSelect={() => setPaletteOpen(false)}
                        className='text-xs py-2 flex items-center justify-between cursor-pointer'
                      >
                        <div className='flex items-center gap-2'>
                          <Icon className='size-3.5 text-muted-foreground' />
                          <span>{cmd.label}</span>
                        </div>
                        <Badge size='sm' count={cmd.group} status='outline' className='text-[10px]' />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>

            <div className='flex items-center justify-between border-t border-border bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground'>
              <span>Navigate with ↑ and ↓</span>
              <span>Select with ↵</span>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => setPaletteOpen(false)}
                className='h-auto p-0 text-[10px] text-muted-foreground hover:text-foreground'
              >
                Esc to close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'command-first-shell',
  title: 'Command-driven / Search-first Shell',
  description: 'Command palette and search-first shell minimizing chrome and maximizing keyboard velocity.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <CommandFirstShellMock />
    }
  ]
}
