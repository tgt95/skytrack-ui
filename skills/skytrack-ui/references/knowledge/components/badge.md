# Badge

> A small count, dot or status indicator. Anchor it to a child, or render it standalone as a plain status pill.

- Package version: `0.1.5`
- Public export: `skytrack-ui/badge`
- Implementation: [`src/components/ui/badge.tsx`](../../../../../src/components/ui/badge.tsx)
- Public type declaration: [`dist-lib/components/ui/badge.d.ts`](../../../../../dist-lib/components/ui/badge.d.ts)
- Showcase demo id: `badge`
- Closest demo: [`src/demos/badge.demo.tsx`](../../../../../src/demos/badge.demo.tsx)

## Overview

The Badge component displays a small count, status dot, or category indicator. It operates in two primary modes: anchored to a child component (such as an icon or avatar with a notification count positioned at the top-end corner) or rendered standalone as an inline status pill.

Badges provide high-density status communication across flight logs, notification bells, equipment lists, and table rows.

**Live demo variant:** `Basic`

```tsx
import { Badge } from '@/components/ui/badge'
import { BellIcon } from '@phosphor-icons/react'

export function BadgeExample() {
  return (
    <Badge count={3} status='error'>
      <div className='grid size-10 place-items-center rounded-(--radius) bg-muted text-muted-foreground'>
        <BellIcon size={20} />
      </div>
    </Badge>
  )
}
```

## Usage

Use anchored Badges for notification bells, message trays, and task queues to indicate pending items or unread alerts. Use standalone Badges (or status pills) to signify system state, connectivity modes, or severity levels within tables and card headers.

Do not use Badge as an interactive button or clickable filter chip; for clickable tags, compose with `skytrack-ui/button` or `skytrack-ui/toggle`. Keep count numbers legible; use `maxCount` (default 99) to cap long numeric strings (e.g. `99+`).

**Live demo variant:** `Status`

## Anatomy

### Composition Tree

**Anchored mode:**

```text
<Badge variant='default|secondary|outline|destructive' count={5}>
  <TargetElement /> (e.g. <Button /> or <Avatar />)
</Badge>
```

**Standalone pill:**

```text
<Badge variant='default|secondary|outline|destructive'>
  Label
</Badge>
```

Render in one of two modes:

1. Anchored mode: Outer relative wrapper (`data-slot='badge'`) wraps the target child and an absolute corner positioning wrapper (`absolute top-0 inset-e-0 translate-x-1/2 -translate-y-1/2`). Inside rests the pill span (`data-slot='badge-count'`).
2. Standalone mode: When rendered without `children` or with explicit `variant`, only the inline pill (`data-slot='badge-count'`) is output without positioning wrappers.

**Live demo variant:** `Standalone`

## Variants & states

The `status` prop defines semantic colors:

- `default`: Neutral muted background with contrasting text (`bg-muted text-foreground`).
- `success`: Success fill for online drones or completed missions (`bg-success text-(--foreground-inverse)`).
- `processing`: Primary fill for active syncing or in-flight operations (`bg-primary text-primary-foreground`).
- `secondary`: Secondary fill for low-priority or auxiliary indicators (`bg-secondary text-secondary-foreground`).
- `error`: Destructive red fill for critical battery, collision, or lost-link alerts (`bg-destructive text-(--foreground-inverse)`).
- `warning`: Warning fill for cautionary alerts (`bg-warning text-(--foreground-inverse)`).
- `outline`: Border-only pill with background fill (`border border-input bg-background text-foreground`).

Modifiers:

- `dot`: Replaces count text with a compact 6px circle (`size-1.5`).
- `size`: Supports `'default'` (`h-5 min-w-5 px-1.5 text-xs`, default) or `'sm'` (`h-4 min-w-4 px-1 text-[11px]`).
- `showZero`: Controls whether a count of 0 is rendered or suppressed.
- `animationPing`: Renders an animated pulse ring for real-time live alerts.

## Typography defaults

Preserve the component's default size, uppercase transformation, and tracking. Do not add consumer
`text-base`, `normal-case`, or CSS overrides to normalize Badge text. Use the documented `size`
variant only when the task specifically calls for a compact Badge; do not replace its internal
typography with a global baseline.

**Live demo variant:** `Overflow`

## Accessibility

- When count or status is purely visual, provide an `aria-label` describing the full status (e.g. `aria-label='3 unread alerts'`).
- The pill employs tabular numerals (`tabular-nums`) to prevent jitter as digits change.
- Status uses semantic theme tokens. Pair color with a readable count or status label, and check rendered text contrast in each supported theme; the component does not enforce a WCAG ratio.

**Live demo variant:** `Dot`

## API & examples

Import `Badge` and `badgeVariants` from `skytrack-ui/badge` (or `@/components/ui/badge` locally).

| Prop            | Type                                                                                         | Default     | Description                                   |
| --------------- | -------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `count`         | `ReactNode`                                                                                  | `undefined` | Numeric or text value to display              |
| `maxCount`      | `number`                                                                                     | `99`        | Maximum number before displaying `+` overflow |
| `dot`           | `boolean`                                                                                    | `false`     | Render as a small dot instead of count        |
| `status`        | `'default' \| 'success' \| 'processing' \| 'secondary' \| 'error' \| 'warning' \| 'outline'` | `'default'` | Semantic coloration                           |
| `size`          | `'default' \| 'sm'`                                                                          | `'default'` | Height and text size scale                    |
| `showZero`      | `boolean`                                                                                    | `false`     | Display badge when count is zero              |
| `animationPing` | `boolean`                                                                                    | `false`     | Ping animation for live updates               |

**Live demo variant:** `Sizes`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./badge`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When `children` are passed, `className` applies to the internal pill span, not the anchor wrapper.
