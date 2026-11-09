# Radio Group

> Provides shared state to a series of radio buttons.

- Package version: `0.1.5`
- Public export: `skytrack-ui/radio`
- Implementation: [`src/components/ui/radio.tsx`](../../../../../src/components/ui/radio.tsx)
- Public type declaration: [`dist-lib/components/ui/radio.d.ts`](../../../../../dist-lib/components/ui/radio.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `radio`
- Closest demo: [`src/demos/radio.demo.tsx`](../../../../../src/demos/radio.demo.tsx)

## Overview

The Radio Group component coordinates mutual exclusion across a series of selectable radio buttons. Built on Base UI Radio and RadioGroup primitives, it manages roving keyboard focus, active item selection, and form state integration with a clean visual circle indicator.

**Live demo variant:** `Default`

```tsx
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import { FieldItem, FieldLabel, FieldRoot } from '@/components/ui/field'

export function RadioDemo() {
  return (
    <FieldRoot className='w-full gap-2'>
      <FieldLabel className='font-semibold'>Flight plan priority</FieldLabel>
      <RadioGroup defaultValue='standard'>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='routine' />
            Routine transit
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='standard' />
            Standard priority
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='urgent' />
            Urgent priority
          </FieldLabel>
        </FieldItem>
      </RadioGroup>
    </FieldRoot>
  )
}
```

## Usage

Use Radio Group when users must select exactly one option from a small, mutually exclusive set and seeing all choices together supports comparison. If the list becomes difficult to scan or takes too much space, use `Select` or `Combobox`. For independent binary on/off options, use `Checkbox` or `Switch`.

**Live demo variant:** `Labeling a radio group`

## Anatomy

### Composition Tree

```text
<RadioGroup value={val} onValueChange={setVal}>
├─ <FieldItem>
│  ├─ <RadioRoot value='opt1'>
│  │  └─ <RadioIndicator /> (automatic if children omitted)
│  └─ <FieldLabel>Option 1</FieldLabel>
└─ <FieldItem>
   ├─ <RadioRoot value='opt2'>
   │  └─ <RadioIndicator />
   └─ <FieldLabel>Option 2</FieldLabel>
```

Radio Group consists of:

1. `RadioGroup` (Container coordinating value selection and keyboard navigation)
2. `RadioRoot` (Individual circular button representing a choice)
3. `RadioIndicator` (Inner indicator dot scaled dynamically when checked)
4. Optional `FieldItem` and `FieldLabel` wrappers (from `skytrack-ui/field`) for layout and text

When `RadioRoot` has no children, it automatically renders a centered `RadioIndicator` dot.

**Live demo variant:** `Default`

## Variants & states

Supported states and controls:

- Controlled/uncontrolled: managed via `value`/`onValueChange` and `defaultValue`.
- `disabled`: Disables individual buttons or the entire group.
- `readOnly`: Displays selection without permitting user changes.
- `data-invalid`: Form validation error state styling.

**Live demo variant:** `Controlled`

## Accessibility

`RadioGroup` implements the WAI-ARIA Radio Group pattern with `role='radiogroup'`. Keyboard interaction uses roving tabindex: users move between radio buttons using arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`), which immediately selects the focused button. `Tab` exits the group to the next focusable form element.

**Live demo variant:** `Disabled and read-only`

## API & examples

Import `RadioGroup`, `RadioRoot`, and `RadioIndicator` from `skytrack-ui/radio` or `@/components/ui/radio`. Key props on `RadioGroup`: `value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, and `name`.

**Live demo variant:** `Form integration`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./radio`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: RadioGroup manages string values; for complex objects, map values to string identifiers.
