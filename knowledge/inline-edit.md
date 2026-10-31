# Inline Edit

> Switch text into an editable field. The trigger is headless and accepts a caller-provided element through render.

- Package version: `0.1.5`
- Public export: `skytrack-ui/inline-edit`
- Implementation: [`src/components/ui/inline-edit.tsx`](../src/components/ui/inline-edit.tsx)
- Public type declaration: [`dist-lib/components/ui/inline-edit.d.ts`](../dist-lib/components/ui/inline-edit.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `inline-edit`
- Closest demo: [`src/demos/inline-edit.demo.tsx`](../src/demos/inline-edit.demo.tsx)

## Overview

The Inline Edit component allows users to switch static display text into an active editable input in place. It provides a headless trigger pattern via `@base-ui/react/use-render`, supporting seamless editing of entity names, document titles, and table cells without cluttering the screen with permanent input boxes.

**Live demo variant:** `Custom trigger via render`

```tsx
import * as React from 'react'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'

export function InlineEditDemo() {
  const [title, setTitle] = React.useState('Mission Alpha Orbit')

  return (
    <InlineEdit value={title} onValueChange={setTitle} label='Mission title' className='max-w-sm'>
      <InlineEditTrigger render={<h3 className='cursor-pointer text-lg font-semibold hover:underline' />}>
        {title}
      </InlineEditTrigger>
      <InlineEditInput placeholder='Enter mission title...' />
    </InlineEdit>
  )
}
```

## Usage

Use Inline Edit for secondary metadata, project titles, notes, or spreadsheet-like cells where quick in-place modifications are convenient. Avoid using Inline Edit for critical form fields that require extensive multi-field validation, or when users frequently edit multiple fields at once (prefer standard forms with explicit Save/Cancel buttons).

**Live demo variant:** `Headless trigger`

## Anatomy

Inline Edit consists of:

1. `InlineEdit` (Root provider managing edit state, draft value, focus restoration, and keyboard shortcuts)
2. `InlineEditTrigger` (Displays the read view; accepts a custom element via `render`)
3. `InlineEditInput` (Input field displayed during editing mode; automatically auto-focuses)

When `editing` is false, `InlineEditTrigger` is rendered; when `editing` is true, `InlineEditInput` replaces it.

**Live demo variant:** `Custom trigger via render`

## Variants & states

Supported states and controls:

- Controlled/uncontrolled value: via `value`/`onValueChange` and `defaultValue`.
- Controlled/uncontrolled editing: via `editing`/`onEditingChange` and `defaultEditing`.
- `disabled`: Prevents entering edit mode.
- Keyboard shortcuts: `Enter` commits changes and closes editor; `Escape` discards edits and restores previous value; `Tab` commits changes and moves focus to the next element.

**Live demo variant:** `Custom trigger via render`

## Accessibility

`InlineEditTrigger` renders as an accessible interactive button or attaches keyboard triggers to custom elements. It exposes `aria-label` derived from the `label` prop. When clicked or activated via `Enter` or `Space`, focus transfers to `InlineEditInput`. Cancelling or committing restores focus to the trigger element automatically.

**Live demo variant:** `Headless trigger`

## API & examples

Import `InlineEdit`, `InlineEditTrigger`, and `InlineEditInput` from `skytrack-ui/inline-edit` or `@/components/ui/inline-edit`. Key root props: `value`, `defaultValue`, `onValueChange`, `editing`, `defaultEditing`, `onEditingChange`, `disabled`, and `label`.

**Live demo variant:** `Custom trigger via render`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./inline-edit`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When using `render` on `InlineEditTrigger`, ensure the custom rendered element properly receives and renders keyboard focus rings.
