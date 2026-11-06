# Toolbar

> A high-quality, unstyled React toolbar component that groups a set of buttons and controls.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toolbar`
- Implementation: [`src/components/ui/toolbar.tsx`](../../../../src/components/ui/toolbar.tsx)
- Public type declaration: [`dist-lib/components/ui/toolbar.d.ts`](../../../../dist-lib/components/ui/toolbar.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `toolbar`
- Closest demo: [`src/demos/toolbar.demo.tsx`](../../../../src/demos/toolbar.demo.tsx)

## Overview

The Toolbar component organizes related action buttons, toggles, menus, inputs, and separators into a single cohesive keyboard-navigable strip. Built on Base UI Toolbar, it manages single-tab-stop roving focus navigation across tools while maintaining design-token styling.

**Live demo variant:** `Default`

```tsx
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@/components/ui/toolbar'
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@phosphor-icons/react'

export function ToolbarDemo() {
  return (
    <Toolbar aria-label='Flight map controls'>
      <ToolbarGroup>
        <ToolbarButton aria-label='Zoom in' size='icon'>
          <MagnifyingGlassPlusIcon />
        </ToolbarButton>
        <ToolbarButton aria-label='Zoom out' size='icon'>
          <MagnifyingGlassMinusIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label='Undo' size='icon'>
          <ArrowCounterClockwiseIcon />
        </ToolbarButton>
        <ToolbarButton aria-label='Redo' size='icon'>
          <ArrowClockwiseIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  )
}
```

## Usage

Use Toolbar for command strips above text editors, canvas surfaces, map viewers, data tables, or media players where multiple functional controls need to be clustered together. When controls represent primary application navigation between views, use `NavigationMenu` or `Tabs`.

**Live demo variant:** `Using with Menu`

## Anatomy

Toolbar is composed of:

1. `Toolbar` (Root container with `role='toolbar'` managing roving focus and orientation)
2. `ToolbarGroup` (Cluster grouping related controls together)
3. `ToolbarSeparator` (Vertical or horizontal divider rule)
4. `ToolbarButton` (Interactive action button supporting activated states and sizes)
5. `ToolbarLink` (Hyperlink styled as a toolbar button)
6. `ToolbarInput` (Embedded input styled for toolbar placement)

**Live demo variant:** `Default`

## Variants & states

Supported variants:

- `ToolbarButton.size`: `default` (32px height), `sm` (28px), `lg` (36px), and `icon` (32px square).
- `ToolbarButton.isActivated`: Highlights button with primary background and inverse text.
- `orientation`: `horizontal` (default) or `vertical`.
- `disabled`: Dimmed appearance with `pointer-events-none`.

**Live demo variant:** `Vertical`

## Accessibility

`Toolbar` renders an ARIA `role='toolbar'` container and requires an accessible name via `aria-label`. The toolbar forms a single tab stop in the page tab sequence: pressing `Tab` enters or exits the toolbar, while arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`) cycle focus smoothly across internal buttons, groups, and inputs without trapping the user.

**Live demo variant:** `Using with Tooltip`

## API & examples

Import `Toolbar`, `ToolbarGroup`, `ToolbarSeparator`, `ToolbarButton`, `ToolbarLink`, and `ToolbarInput` from `skytrack-ui/toolbar` or `@/components/ui/toolbar`. Core props on `Toolbar`: `orientation`, `disabled`, and standard container attributes.

**Live demo variant:** `Using with NumberField`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./toolbar`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When embedding third-party controls inside Toolbar, wrap them in standard toolbar items so they participate correctly in roving tabindex management.
