# Autocomplete

> An input that suggests options as you type.

- Package version: `0.1.5`
- Public export: `skytrack-ui/autocomplete`
- Implementation: [`src/components/ui/autocomplete.tsx`](../../../../src/components/ui/autocomplete.tsx)
- Public type declaration: [`dist-lib/components/ui/autocomplete.d.ts`](../../../../dist-lib/components/ui/autocomplete.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `autocomplete`
- Closest demo: [`src/demos/autocomplete.demo.tsx`](../../../../src/demos/autocomplete.demo.tsx)

## Overview

The Autocomplete component provides an input field that dynamically filters and suggests matching items as the user types. Built upon Base UI, it separates freeform text input from overlay selection, enabling predictive search, command palettes, and fast data entry while preserving full control over filtering logic and popup positioning.

**Live demo variant:** `Default`

```tsx
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner
} from '@/components/ui/autocomplete'
import { FieldLabel, FieldRoot } from '@/components/ui/field'

interface Item {
  id: string
  label: string
}

const items: Item[] = [
  { id: '1', label: 'San Francisco (SFO)' },
  { id: '2', label: 'Seattle (SEA)' },
  { id: '3', label: 'Los Angeles (LAX)' }
]

export function AutocompleteDemo() {
  return (
    <FieldRoot className='w-64'>
      <FieldLabel>Destination airport</FieldLabel>
      <Autocomplete items={items} itemToStringValue={(item: Item) => item.label}>
        <AutocompleteInput placeholder='Search airports...' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>No airports found.</AutocompleteEmpty>
              <AutocompleteList>
                {(item: Item) => (
                  <AutocompleteItem key={item.id} value={item}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </FieldRoot>
  )
}
```

## Usage

Use Autocomplete when users can either type arbitrary search queries or pick from a large, dynamically filtered list of suggestions (such as tags, locations, or user accounts). When the user must pick exclusively from a small, fixed set of choices without typing new values, use Select. When the user needs multi-token chips or complex multi-selection with persistent selected state, consider Combobox.

**Live demo variant:** `Default`

## Anatomy

Autocomplete is composed of the following exported parts in hierarchical render order:

1. `Autocomplete` (Root provider managing items, filter matching, and open state)
2. `AutocompleteInputGroup` (Optional styled input wrapper supporting trigger buttons or icons)
3. `AutocompleteInput` (Text input element supporting standalone or grouped contexts)
4. `AutocompleteTrigger` / `AutocompleteTriggerButton` (Button opening or cycling suggestions)
5. `AutocompleteClear` (Action button clearing current input text)
6. `AutocompletePortal` (Portals the suggestion popup to `document.body` or floating root)
7. `AutocompletePositioner` (Anchors and positions popup relative to the input element)
8. `AutocompletePopup` (Surface container displaying items, groups, and status states)
9. `AutocompleteList` (Renders items via render function or mapped array)
10. `AutocompleteItem` (Individual selectable item)
11. `AutocompleteGroup` & `AutocompleteGroupLabel` (Categorized item grouping)
12. `AutocompleteEmpty` (Feedback displayed when no items match current query)
13. `AutocompleteStatus` (Screen reader live feedback announcement surface)

The smallest valid composition requires `Autocomplete`, `AutocompleteInput`, `AutocompletePortal`, `AutocompletePositioner`, `AutocompletePopup`, and `AutocompleteList`.

**Live demo variant:** `Default`

## Variants & states

Supported variants include:

- `size`: Available in `xs` (24px height), `sm` (32px), `default` (36px), and `lg` (40px) on both `AutocompleteInput` and `AutocompleteInputGroup`.
- `context`: `AutocompleteInput` supports `standalone` (bordered box) and `group` (transparent inner field inside `AutocompleteInputGroup`).
- Interaction states include open, closed, highlighted, disabled, and empty. Highlighted items reflect keyboard navigation or auto-highlighting via `autoHighlight`.

**Live demo variant:** `Sizes`

## Accessibility

Autocomplete adheres to the WAI-ARIA Combobox pattern. The input maintains `role='combobox'`, manages `aria-expanded`, and references the listbox via `aria-controls`. `AutocompleteStatus` provides an ARIA live region (`aria-live='polite'`) for screen-reader announcements when suggestions update. Keyboard interaction supports `ArrowDown`/`ArrowUp` for navigation, `Enter` to select, `Escape` to close popup, and `Home`/`End` inside lists.

**Live demo variant:** `Auto highlight`

## API & examples

Import the components and utilities directly from `skytrack-ui/autocomplete`. Key root props include `items`, `itemToStringValue`, `filter`, `autoHighlight`, `limit`, and `open`/`onOpenChange`. The package also exports `useAutocompleteFilter` and `useAutocompleteFilteredItems` hooks for external filtering orchestration.

**Live demo variant:** `Grouped`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./autocomplete`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When virtualizing large datasets, a fixed height must be configured on the scroll container; item rendering functions must supply stable unique keys.
