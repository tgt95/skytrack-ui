# Separator

> A separator element accessible to screen readers.

- Package version: `0.1.5`
- Public export: `skytrack-ui/separator`
- Implementation: [`src/components/ui/separator.tsx`](../../../../../src/components/ui/separator.tsx)
- Public type declaration: [`dist-lib/components/ui/separator.d.ts`](../../../../../dist-lib/components/ui/separator.d.ts)
- Showcase demo id: `separator`
- Closest demo: [`src/demos/separator.demo.tsx`](../../../../../src/demos/separator.demo.tsx)

## Overview

The Separator component renders a thematic divider line that visually or semantically separates groups of content, menu items, toolbar buttons, or form sections. In SkyTrack, it demarcates dense UI areas—such as separating drone telemetry stats from map controls, splitting navigation links, or dividing form groups.

Built on `@base-ui/react/separator`, it supports both horizontal and vertical orientations while automatically conveying correct ARIA divider semantics.

**Live demo variant:** `Horizontal`

```tsx
import { Separator } from '@/components/ui/separator'

export function SeparatorExample() {
  return (
    <div className='flex w-64 flex-col gap-3 text-sm'>
      <div>Autonomous Mission #104</div>
      <Separator orientation='horizontal' />
      <div className='text-muted-foreground'>Telemetry stream locked</div>
    </div>
  )
}
```

## Usage

Use Separator to delineate distinct content groups, toolbar button clusters, or section headers where visual whitespace alone is insufficient to convey separation.

Do not use Separator purely as a decorative line if spacing utilities (`border-b`, `divide-y`, `gap-*`) suffice. Do not use horizontal separators between every single row in a table (tables provide their own semantic row borders).

**Live demo variant:** `Vertical`

## Anatomy

### Composition Tree

```text
<Separator orientation='horizontal|vertical' decorative />
```

Rendered as a single self-contained divider element:

1. `Separator`: Renders an HTML `<div>` with `data-slot='separator'` and `shrink-0 bg-border`.
   - In horizontal orientation: styled with `h-px w-full`.
   - In vertical orientation: styled with `h-full w-px`.

**Live demo variant:** `Horizontal`

## Variants & states

The `orientation` prop governs the divider axis:

- `horizontal` (default): Full-width 1px dividing line (`h-px w-full`).
- `vertical`: 1px wide full-height line (`h-full w-px`). Frequently composed within flex rows to separate button groups or breadcrumbs.

**Live demo variant:** `Vertical`

## Accessibility

- Built on `@base-ui/react/separator`:
- Outputs `role='separator'` to convey structural division to assistive technologies.
- Supports `aria-orientation`: automatically matches the `orientation` prop (`'horizontal'` or `'vertical'`).
- If decorative only, can be silenced for screen readers by setting `decorative={true}` or `aria-hidden='true'`.

**Live demo variant:** `Horizontal`

## API & examples

Import `Separator` from `skytrack-ui/separator` (or `@/components/ui/separator` locally).

| Prop          | Type                         | Default        | Description              |
| ------------- | ---------------------------- | -------------- | ------------------------ |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Axis of the divider line |
| `className`   | `string`                     | `undefined`    | Utility class overrides  |

Tokens: Uses `--border` token for contrast against background surfaces.

**Live demo variant:** `Vertical`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./separator`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When using `orientation='vertical'` within flex layouts, ensure the parent container specifies a concrete height or `items-stretch` so the vertical separator occupies full height.
