# Toggle Group

> A high-quality, unstyled React toggle group component that provides shared state to a series of toggle buttons.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toggle-group`
- Implementation: [`src/components/ui/toggle-group.tsx`](../../../../src/components/ui/toggle-group.tsx)
- Public type declaration: [`dist-lib/components/ui/toggle-group.d.ts`](../../../../dist-lib/components/ui/toggle-group.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `toggle-group`
- Closest demo: [`src/demos/toggle-group.demo.tsx`](../../../../src/demos/toggle-group.demo.tsx)

## Overview

The Toggle Group component coordinates shared selection state and shared sizing/variant contexts across a collection of related Toggle buttons. Built on Base UI ToggleGroup, it supports single or multiple selection modes, segmented or outline border styles, and horizontal or vertical orientations.

**Live demo variant:** `Single`

```tsx
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { TextAlignCenterIcon, TextAlignJustifyIcon, TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react'

export function ToggleGroupDemo() {
  return (
    <ToggleGroup variant='outline' size='icon' defaultValue={['left']}>
      <Toggle value='left' aria-label='Align left'>
        <TextAlignLeftIcon />
      </Toggle>
      <Toggle value='center' aria-label='Align center'>
        <TextAlignCenterIcon />
      </Toggle>
      <Toggle value='right' aria-label='Align right'>
        <TextAlignRightIcon />
      </Toggle>
      <Toggle value='justify' aria-label='Align justify'>
        <TextAlignJustifyIcon />
      </Toggle>
    </ToggleGroup>
  )
}
```

## Usage

Use Toggle Group for compact toolbars, text alignment selectors, map view layer toggles, or filter mode switches where a cluster of related buttons share styling and selection behavior. When choices represent primary navigation changing pages, use `Tabs` instead. When choices exist inside a standard form for data submission, prefer `RadioGroup` or `CheckboxGroup`.

**Live demo variant:** `Outline`

## Anatomy

Toggle Group consists of:

1. `ToggleGroup` (Container element providing `ToggleGroupContext` and layout borders)
2. Descendant `Toggle` buttons (from `skytrack-ui/toggle`) configured with individual `value` props

The minimal valid composition requires a `ToggleGroup` enclosing two or more `Toggle` elements.

**Live demo variant:** `Single`

## Variants & states

Supported variants:

- `variant`: `default` (ghost buttons), `outline` (unified outer border with internal dividers), `segmented` (pill container with card button tiles), and `brand`.
- `size`: Inherited by all child toggles (`xs`, `sm`, `default`, `lg`, or `icon` variants).
- Selection modes: single-select (mutually exclusive) or multi-select (`multiple={true}`).
- `orientation`: `horizontal` (row) or `vertical` (column).

**Live demo variant:** `Segmented inset`

## Accessibility

`ToggleGroup` renders a container with `role='group'` and manages keyboard navigation across child toggles. Arrow keys navigate between buttons (`ArrowLeft`/`ArrowRight` horizontally, `ArrowUp`/`ArrowDown` vertically). In single selection mode, roving focus allows selecting options seamlessly. Every child toggle without text must provide an `aria-label`.

**Live demo variant:** `Vertical`

## API & examples

Import `ToggleGroup` and `ToggleGroupContext` from `skytrack-ui/toggle-group` or `@/components/ui/toggle-group`. Core props on `ToggleGroup`: `value`, `defaultValue`, `onValueChange`, `multiple`, `disabled`, `variant`, `size`, and `orientation`.

**Live demo variant:** `Multiple`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./toggle-group`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When using `variant='outline'`, child `Toggle` elements automatically suppress redundant individual borders to produce a unified button strip.
