# Checkbox Group

> Provides shared state to a series of checkboxes.

- Package version: `0.1.5`
- Public export: `skytrack-ui/checkbox-group`
- Implementation: [`src/components/ui/checkbox-group.tsx`](../../../../src/components/ui/checkbox-group.tsx)
- Public type declaration: [`dist-lib/components/ui/checkbox-group.d.ts`](../../../../dist-lib/components/ui/checkbox-group.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `checkbox-group`
- Closest demo: [`src/demos/checkbox-group.demo.tsx`](../../../../src/demos/checkbox-group.demo.tsx)

## Overview

The Checkbox Group component orchestrates shared value array state across multiple related Checkbox controls. It wraps Base UI CheckboxGroup to manage collective selection, controlled value arrays, and group-level disabled states with a vertical layout.

**Live demo variant:** `Default`

```tsx
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { FieldItem, FieldLabel, FieldRoot } from '@/components/ui/field'

export function CheckboxGroupDemo() {
  return (
    <FieldRoot className='w-full gap-2'>
      <FieldLabel className='font-semibold'>Telemetry subscriptions</FieldLabel>
      <CheckboxGroup defaultValue={['altitude']}>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot name='telemetry' value='altitude' />
            Altitude tracking
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot name='telemetry' value='velocity' />
            Velocity tracking
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </FieldRoot>
  )
}
```

## Usage

Use Checkbox Group when users may choose zero, one, or several options from a related set of checkboxes, such as permission checklists, notification preferences, or filter lists. When users may only choose one mutually exclusive item, use RadioGroup instead. For standalone, unrelated toggles, use independent Checkbox components without a group.

**Live demo variant:** `Labeling a checkbox group`

## Anatomy

Checkbox Group is composed of:

1. `CheckboxGroup` (Container element providing React context for value array and child dispatch)
2. Descendant `CheckboxRoot` controls (from `skytrack-ui/checkbox`) with distinct `value` strings
3. Optional `FieldItem` and `FieldLabel` wrappers (from `skytrack-ui/field`) for accessible layout

The minimal valid composition requires a `CheckboxGroup` container and at least one child `CheckboxRoot` with a `value` prop.

**Live demo variant:** `Default`

## Variants & states

Supported behavior includes:

- Controlled state: managed via `value` (array of strings) and `onValueChange` callback.
- Uncontrolled state: configured via `defaultValue` array.
- Disabled state: passing `disabled` to `CheckboxGroup` disables all child checkboxes collectively.
- Layout: rendered as a column with `flex flex-col items-start gap-2 text-sm text-foreground`. Custom classes can override spacing or switch to row layouts.

**Live demo variant:** `Default`

## Accessibility

`CheckboxGroup` renders a container with `role='group'` and supports accessible naming via `aria-labelledby` or `aria-label`. Group labels should identify the overarching category. Individual checkboxes remain independently focusable in the tab sequence (unlike RadioGroup which uses roving tabindex), allowing users to navigate and toggle with `Tab` and `Space`.

**Live demo variant:** `Labeling a checkbox group`

## API & examples

Import `CheckboxGroup` from `skytrack-ui/checkbox-group` or `@/components/ui/checkbox-group`. Primary props include `value`, `defaultValue`, `onValueChange`, `disabled`, `name`, and standard HTML container attributes. When used in forms, each child checkbox automatically aligns with the group's active state.

**Live demo variant:** `Default`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./checkbox-group`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: CheckboxGroup manages string array values; non-string object values are not supported directly by Base UI CheckboxGroup.
