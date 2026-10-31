# Combobox

> A filterable select: an input with a list of predefined, selectable items.

- Package version: `0.1.5`
- Public export: `skytrack-ui/combobox`
- Implementation: [`src/components/ui/combobox.tsx`](../src/components/ui/combobox.tsx)
- Public type declaration: [`dist-lib/components/ui/combobox.d.ts`](../dist-lib/components/ui/combobox.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `combobox`
- Closest demo: [`src/demos/combobox.demo.tsx`](../src/demos/combobox.demo.tsx)

## Overview

The Combobox component provides a filterable select menu combining a text input with an interactive dropdown of selectable options. Built on Base UI Combobox, it supports both single and multiple selections, chip tokens, async filtering, creatable entries, and full keyboard navigation.

**Live demo variant:** `Default`

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner
} from '@/components/ui/combobox'
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { CheckIcon } from '@phosphor-icons/react'

interface Airport {
  code: string
  name: string
}

const airports: Airport[] = [
  { code: 'SFO', name: 'San Francisco' },
  { code: 'SEA', name: 'Seattle' },
  { code: 'LAX', name: 'Los Angeles' }
]

export function ComboboxDemo() {
  return (
    <FieldRoot className='w-64'>
      <FieldLabel>Departure airport</FieldLabel>
      <Combobox items={airports} itemToStringValue={(a: Airport) => a.name}>
        <ComboboxInput placeholder='Select an airport...' />
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxEmpty>No airport found.</ComboboxEmpty>
              <ComboboxList>
                {(airport: Airport) => (
                  <ComboboxItem key={airport.code} value={airport}>
                    {airport.name} ({airport.code})
                    <ComboboxItemIndicator>
                      <CheckIcon className='size-4' />
                    </ComboboxItemIndicator>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </FieldRoot>
  )
}
```

## Usage

Use Combobox when typing to filter predefined options helps users find a value, or when multiple selections should appear as chips. For a short, stable list that users can scan without search, use Select. When users need to enter values beyond the supplied options, use Autocomplete or a standard Input.

**Live demo variant:** `Value selection with IDs`

## Anatomy

Combobox exposes the following parts in render order:

1. `Combobox` (Root provider managing items, value, search state, and popup controls)
2. `ComboboxLabel` (Optional dedicated label rendered within combobox tree)
3. `ComboboxInputGroup` (Input wrapper providing border, focus ring, and chip containment)
4. `ComboboxChips` & `ComboboxChip` (Token container for multi-select selections)
5. `ComboboxChipRemove` (Button removing an individual selected chip)
6. `ComboboxInput` (Search input filter)
7. `ComboboxTrigger` / `ComboboxTriggerButton` (Toggles the popup menu)
8. `ComboboxClear` (Button clearing active search or selection)
9. `ComboboxPortal` (Renders popup outside local overflow bounds)
10. `ComboboxPositioner` (Positions popup relative to the input group anchor)
11. `ComboboxPopup` (Card surface displaying items and lists)
12. `ComboboxList` (Container mapping over items)
13. `ComboboxItem` & `ComboboxItemIndicator` (Option row with selection checkmark)
14. `ComboboxGroup` & `ComboboxGroupLabel` (Section groupings)
15. `ComboboxEmpty` (Fallback content when no matches exist)
16. `ComboboxStatus` (Accessibility live announcements container)

The smallest valid composition includes `Combobox`, `ComboboxInput`, `ComboboxPortal`, `ComboboxPositioner`, `ComboboxPopup`, and `ComboboxList`.

**Live demo variant:** `Default`

## Variants & states

Supported variants and configurations:

- `size`: `xs` (24px), `sm` (32px), `default` (36px), and `lg` (40px) via `comboboxInputGroupVariants`.
- `shape`: `input` (standard single-line control) or `chips` (wrapping multi-select layout).
- Selection modes: single-select or multi-select (`multiple={true}`).
- States: open, closed, highlighted, disabled, and invalid.

**Live demo variant:** `Sizes`

## Accessibility

Implements the WAI-ARIA Combobox pattern with `role='combobox'`. Manages `aria-expanded`, `aria-autocomplete='list'`, `aria-controls`, and `aria-activedescendant`. Arrow keys navigate suggestions, `Enter` selects items, and `Escape` dismisses the dropdown. `ComboboxStatus` provides an `aria-live='polite'` region for real-time status reporting to screen readers.

**Live demo variant:** `Multiple select`

## API & examples

Import from `skytrack-ui/combobox` or `@/components/ui/combobox`. Key root props: `items`, `itemToStringValue`, `multiple`, `value`, `defaultValue`, `onValueChange`, `open`, `onOpenChange`, `filter`, and `autoHighlight`. Helper functions `useComboboxFilter` and `createComboboxItems` assist with complex or custom data models.

**Live demo variant:** `Grouped`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./combobox`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When `multiple` is active, chip wrapping requires `shape='chips'` on `ComboboxInputGroup` to prevent visual overflow in narrow columns.
