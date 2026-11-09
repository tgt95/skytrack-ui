# Command

> A searchable command menu for quick navigation and actions.

- Package version: `0.1.5`
- Public export: `skytrack-ui/command`
- Implementation: [`src/components/ui/command.tsx`](../../../../../src/components/ui/command.tsx)
- Public type declaration: Target `./dist-lib/components/ui/command.d.ts` declared in [`package.json`](../../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/command.tsx`](../../../../../src/components/ui/command.tsx).
- Showcase demo id: `command`
- Closest demo: [`src/demos/command.demo.tsx`](../../../../../src/demos/command.demo.tsx)

## Overview

The Command component provides an accessible, searchable command palette and filterable action menu. Powered by `cmdk` and styled with SkyTrack tokens, it supports rapid keyboard navigation via `⌘K` or `Ctrl+K` to jump to drone fleets, dispatch mission tasks, execute emergency commands, or toggle system themes.

It can be mounted inline within an analytical dashboard or displayed inside an accessible modal dialog via `CommandDialog`.

**Live demo variant:** `COMMAND PALETTE`

```tsx
import * as React from 'react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut
} from '@/components/ui/command'

export function CommandExample() {
  return (
    <Command className='max-w-md rounded-(--radius) border border-border shadow-md'>
      <CommandInput placeholder='Search missions or commands...' />
      <CommandList>
        <CommandEmpty>No matching results.</CommandEmpty>
        <CommandGroup heading='Fleet actions'>
          <CommandItem onSelect={() => alert('Return to home triggered')}>
            <span>Return to Home (RTH)</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => alert('Calibration initiated')}>
            <span>Recalibrate IMU sensors</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

## Usage

Use Command for top-level search palettes, keyboard-driven omniboxes, and rapid lookup across hundreds of missions, aircraft, or system settings.

Do not use Command for standard form selects with fixed options (use `skytrack-ui/select`) or dropdown action menus anchored to buttons (use `skytrack-ui/menu`). Keep item labels concise and group related actions under clear section headings.

**Live demo variant:** `INLINE`

## Anatomy

### Composition Tree

```text
<Command> (or modal <CommandDialog>)
├─ <CommandInput placeholder='Type a command...' />
└─ <CommandList>
   ├─ <CommandEmpty>No results found.</CommandEmpty>
   ├─ <CommandGroup heading='Group'>
   │  ├─ <CommandItem>Item 1</CommandItem>
   │  └─ <CommandItem>Item 2</CommandItem>
   └─ <CommandSeparator />
```

Render in structured composition:

1. `Command`: Root wrapper managing fuzzy search filtering and active selection state (`data-slot='command'`). Alternatively, use `CommandDialog` for modal presentation.
2. `CommandInput`: Search input with integrated magnifying glass icon (`data-slot='command-input'`).
3. `CommandList`: Scrollable container managing item visibility and height limits (`data-slot='command-list'`).
4. `CommandEmpty`: Empty state fallback rendered when no items match search query (`data-slot='command-empty'`).
5. `CommandGroup`: Category grouping with optional `heading` label (`data-slot='command-group'`).
6. `CommandItem`: Selectable action row with hover and keyboard highlight styles (`data-slot='command-item'`).
7. `CommandShortcut`: Keyboard shortcut badge positioned at the trailing end (`data-slot='command-shortcut'`).
8. `CommandSeparator`: Visual divider line between groups (`data-slot='command-separator'`).

**Live demo variant:** `COMMAND PALETTE`

## Variants & states

Presentation modes:

- Inline: Embedded directly in views, dashboards, or drawers using `<Command>`.
- Modal Palette: Rendered via `<CommandDialog open={open} onOpenChange={setOpen}>`, which wraps the command palette inside SkyTrack's `Dialog` overlay.

Item states:

- Active / Highlighted: `data-[selected=true]` applies `bg-accent text-accent-foreground`.
- Disabled: `data-[disabled=true]` sets `pointer-events-none opacity-50`.
- Empty: Automatically displays `CommandEmpty` when fuzzy filter count drops to zero.

**Live demo variant:** `INLINE`

## Accessibility

- Automatically assigns WAI-ARIA combobox and listbox roles: `role='combobox'`, `role='listbox'`, `role='option'`.
- Keyboard navigation: `ArrowDown` and `ArrowUp` cycle through filtered items with automatic scroll tracking; `Enter` activates the selected item; `Escape` closes the dialog palette.
- Focus: Input remains focused while arrow keys manipulate active descendant selection.

**Live demo variant:** `COMMAND PALETTE`

## API & examples

Import named parts from `skytrack-ui/command` (or `@/components/ui/command` locally).

| Component       | Target Props                                                                 | Description                    |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------ |
| `Command`       | `value?: string`, `onValueChange?: (val: string) => void`                    | Root primitive                 |
| `CommandDialog` | `open?: boolean`, `onOpenChange?: (open: boolean) => void`                   | Centered modal command palette |
| `CommandInput`  | `placeholder?: string`, `value?: string`                                     | Filter input field             |
| `CommandGroup`  | `heading?: ReactNode`                                                        | Category container             |
| `CommandItem`   | `value?: string`, `onSelect?: (value: string) => void`, `disabled?: boolean` | Action item                    |

Tokens: Uses `--popover`, `--popover-foreground`, `--accent`, `--border`, and `--muted-foreground`.

**Live demo variant:** `INLINE`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./command`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Target declaration `./dist-lib/components/ui/command.d.ts` is absent in `dist-lib`; source types verified in `src/components/ui/command.tsx`. Built on `cmdk` package.
