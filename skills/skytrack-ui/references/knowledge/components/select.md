# Select

> A common form component for choosing a predefined value in a dropdown menu.

- Package version: `0.1.5`
- Public export: `skytrack-ui/select`
- Implementation: [`src/components/ui/select.tsx`](../../../../../src/components/ui/select.tsx)
- Public type declaration: [`dist-lib/components/ui/select.d.ts`](../../../../../dist-lib/components/ui/select.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `select`
- Closest demo: [`src/demos/select.demo.tsx`](../../../../../src/demos/select.demo.tsx)

## Overview

The Select component provides an accessible dropdown selection menu for choosing one or more predefined options. Built on Base UI Select, it separates the button trigger from a floating popup list, supporting custom triggers, scrollable option lists, grouped categories, and full keyboard navigation.

**Live demo variant:** `Default`

```tsx
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectIcon,
  SelectValue
} from '@/components/ui/select'
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { CheckIcon } from '@phosphor-icons/react'

export function SelectDemo() {
  return (
    <FieldRoot className='w-60'>
      <FieldLabel>Flight status</FieldLabel>
      <Select defaultValue='on-time'>
        <SelectTrigger>
          <SelectValue placeholder='Select status' />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner side='bottom' align='start' sideOffset={4}>
            <SelectPopup>
              <SelectList>
                <SelectItem value='scheduled'>
                  <SelectItemText>Scheduled</SelectItemText>
                  <SelectItemIndicator>
                    <CheckIcon className='size-4' />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value='on-time'>
                  <SelectItemText>On Time</SelectItemText>
                  <SelectItemIndicator>
                    <CheckIcon className='size-4' />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value='delayed'>
                  <SelectItemText>Delayed</SelectItemText>
                  <SelectItemIndicator>
                    <CheckIcon className='size-4' />
                  </SelectItemIndicator>
                </SelectItem>
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    </FieldRoot>
  )
}
```

## Usage

Use Select when users choose from predefined options and can scan the popup list without filtering. Use `Combobox` when typing to filter will help users find an option or when multiple selections should appear as chips. Use `RadioGroup` when a small, mutually exclusive choice set should stay visible for direct comparison; choose based on option labels, viewport, and task context rather than a fixed count.

**Live demo variant:** `Labeling a select`

## Anatomy

### Composition Tree

```text
<Select value={val} onValueChange={setVal}>
├─ <SelectLabel>Label</SelectLabel> (optional)
├─ <SelectTrigger>
│  ├─ <SelectValue placeholder='Select an item...' />
│  └─ <SelectIcon />
└─ <SelectPortal>
   └─ <SelectPositioner>
      └─ <SelectPopup>
         └─ <SelectList>
            ├─ <SelectItem value='opt1'>
            │  ├─ <SelectItemText>Option 1</SelectItemText>
            │  └─ <SelectItemIndicator />
            └─ <SelectItem value='opt2'> ...
```

Select is composed of the following exported parts:

1. `Select` (Root provider managing selection, open state, and items)
2. `SelectLabel` (Dedicated label part rendered inside select tree)
3. `SelectTrigger` (Button trigger opening the menu; compose with `SelectIcon` to show the caret)
4. `SelectValue` (Displays selected value or fallback placeholder)
5. `SelectPortal` (Portals menu overlay to avoid overflow clipping)
6. `SelectPositioner` (Positions popup aligned to the trigger)
7. `SelectPopup` (Surface container with rounded border and card background)
8. `SelectList` (Scrollable container holding items)
9. `SelectItem`, `SelectItemText`, & `SelectItemIndicator` (Selectable item with label and checkmark)
10. `SelectGroup` & `SelectGroupLabel` (Category grouping and headers)
11. `SelectSeparator` (Divider between groups)
12. `SelectScrollUpArrow` & `SelectScrollDownArrow` (Optional scroll indicators)
13. `SelectIcon` (Caret icon shown at the trailing edge of the standard trigger composition)

**Live demo variant:** `Default`

## Variants & states

Supported variants and options:

- `size`: Available in `xs` (24px height), `sm` (32px), `default` (36px), and `lg` (40px) via `selectTriggerVariants`.
- Selection mode: supports single select or multiple select (`multiple={true}`).
- States: open, closed, highlighted, disabled, and invalid.

**Live demo variant:** `Sizes`

## Accessibility

Complies with the WAI-ARIA Select/Listbox pattern. The trigger exposes `role='combobox'`, `aria-haspopup='listbox'`, and `aria-expanded`. Opening the select shifts focus into the listbox where `ArrowUp` and `ArrowDown` navigate items, `Enter` or `Space` selects an option, and `Escape` dismisses the dropdown. Type-ahead filtering enables jumping directly to items by typing initial letters.

**Live demo variant:** `Disabled`

## API & examples

Import from `skytrack-ui/select` or `@/components/ui/select`. Key props on `Select`: `value`, `defaultValue`, `onValueChange`, `multiple`, `open`, `onOpenChange`, `name`, and `disabled`.

**Live demo variant:** `Grouped`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./select`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Select requires wrapping items in `SelectPortal` and `SelectPositioner` for proper overlay positioning.
