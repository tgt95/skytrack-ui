# Button

> A button that can be rendered as another tag or focusable when disabled.

- Package version: `0.1.5`
- Public export: `skytrack-ui/button`
- Implementation: [`src/components/ui/button.tsx`](../../../../../src/components/ui/button.tsx)
- Public type declaration: [`dist-lib/components/ui/button.d.ts`](../../../../../dist-lib/components/ui/button.d.ts)
- Showcase demo id: `button`
- Closest demo: [`src/demos/button.demo.tsx`](../../../../../src/demos/button.demo.tsx)

## Overview

The Button component triggers immediate actions, submits forms, opens modals, and confirms operations across the SkyTrack workspace. It implements shared control sizing, high-contrast focus rings, and unified hover and disabled state styles.

Built on `@base-ui/react/button`, it provides full keyboard accessibility, support for focusable-when-disabled patterns, and flexible polymorphic rendering without losing button behavior.

**Live demo variant:** `Variants`

```tsx
import { Button } from '@/components/ui/button'
import { PaperPlaneTiltIcon } from '@phosphor-icons/react'

export function ButtonExample() {
  return (
    <Button variant='default' size='default'>
      <PaperPlaneTiltIcon size={16} />
      Launch mission
    </Button>
  )
}
```

## Usage

Use Buttons for discrete user actions: saving parameters, starting drone calibrations, dispatching commands, or navigating workflows.

Do not use Button when navigating between web pages or external URLs without an action (use anchor tags or `variant='link'`). Do not clutter forms with multiple primary buttons; keep one primary button per visual grouping to guide the operator's eye.

**Live demo variant:** `Sizes`

## Anatomy

### Composition Tree

```text
<Button variant='default|destructive|outline|secondary|ghost|link' size='default|xs|sm|lg|icon|...'>
  ├─ <LeadingIcon /> (optional)
  ├─ Button Label
  └─ <TrailingIcon /> (optional)
</Button>
```

Rendered as an interactive button element (`data-slot='button'`):

1. Leading Icon (optional): Phosphor or custom icon, automatically styled with `shrink-0` and `size-4` (or adjusted for icon sizes).
2. Label Text: Formatted with `text-sm font-medium whitespace-nowrap`.
3. Trailing Icon (optional): Phosphor icon or disclosure chevron.

Polymorphic rendering is supported via Base UI's `render` prop (e.g. `render={<a href='/missions' />}` with `nativeButton={false}`).

**Live demo variant:** `With icon`

## Variants & states

The `variant` prop controls appearance via `buttonVariants`:

- `default`: Solid primary background (`bg-primary text-primary-foreground`) for primary task completion.
- `destructive`: Red background (`bg-destructive text-(--foreground-inverse)`) for aborts and deletions.
- `outline`: Bordered button (`border border-input bg-background`) for secondary actions.
- `secondary`: Muted surface (`bg-secondary text-secondary-foreground`).
- `ghost`: Transparent background highlighting on hover for low-prominence actions.
- `link`: Underlined text button for inline navigational triggers.

The `size` prop governs scale via shared `CONTROL_SIZE_CLASSES`:

- `default`: Standard 36px control height (`h-9 px-4 py-2`).
- `xs` / `sm`: Compact heights (24px and 32px) for high-density tables and toolbars.
- `lg`: Prominent 40px height for primary landing actions.
- `icon`, `icon-xs`, `icon-sm`, `icon-lg`: Square aspect-ratio variants for icon-only controls.

**Live demo variant:** `Disabled`

## Accessibility

- Built on Base UI Button primitive with standard `role='button'`.
- Supports `focusableWhenDisabled`: Allows disabled buttons to remain in the tab sequence while suppressing click handlers, enabling screen reader users to discover unavailable actions and read associated tooltips.
- Focus ring: Uses shared `focusRing` styles (`outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50`).
- Keyboard activation: Triggers on `Enter` and `Space`.

**Live demo variant:** `Loading (focusableWhenDisabled)`

## API & examples

Import `Button`, `buttonVariants`, `focusRing`, and `controlSizeClasses` from `skytrack-ui/button` (or `@/components/ui/button` locally).

| Prop                    | Type                                                                                 | Default     | Description                                  |
| ----------------------- | ------------------------------------------------------------------------------------ | ----------- | -------------------------------------------- |
| `variant`               | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'`        | `'default'` | Visual styling variant                       |
| `size`                  | `'default' \| 'xs' \| 'sm' \| 'lg' \| 'icon' \| 'icon-xs' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Control size scale                           |
| `disabled`              | `boolean`                                                                            | `false`     | Disables interaction                         |
| `focusableWhenDisabled` | `boolean`                                                                            | `false`     | Keeps disabled control keyboard focusable    |
| `render`                | `ReactElement`                                                                       | `undefined` | Polymorphic element replacement              |
| `nativeButton`          | `boolean`                                                                            | `true`      | Set false when rendering non-button elements |

**Live demo variant:** `Rendering as another tag (nativeButton={false})`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./button`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When using `render` with non-button HTML tags (e.g. `<a>`), set `nativeButton={false}` to avoid invalid nested button DOM errors.
