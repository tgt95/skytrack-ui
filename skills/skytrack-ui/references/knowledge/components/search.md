# Search

> A labelled search field with a leading search icon and a clear action for non-empty queries.

- Package version: `0.1.5`
- Public export: `skytrack-ui/search`
- Implementation and public types: [`src/components/ui/search.tsx`](../../../../../src/components/ui/search.tsx)
- Showcase demo: [`src/demos/search.demo.tsx`](../../../../../src/demos/search.demo.tsx)
- Official reference: [Carbon Search guidelines](https://www.carbondesignsystem.com/building-blocks/core/components/search/guidelines)

## Usage

Use Search when a query filters or locates content in a page or component. For a fixed list where users choose a known option, use `Combobox` or `Select` instead. For DataTable search, compose this component in `renderSearch` so the input stays connected to the table state.

**Live demo variant:** `DEFAULT WITH CLEAR`

```tsx
import { Search } from 'skytrack-ui/search'

;<Search aria-label='Search workspaces' value={query} onValueChange={setQuery} placeholder='Search workspaces' />
```

## Anatomy

### Composition Tree

```text
<Search
  value={query}
  onValueChange={setQuery}
  placeholder='Search...'
  appearance='default|fluid'
/>
(Internally composes Input with leading search icon and trailing clear button)
```

## Types and behavior

`Search` composes SkyTrack `Input`. It supports `appearance='default' | 'fluid'`, all remaining `InputProps`, controlled `value`, `defaultValue`, `onValueChange`, and `onClear`. A clear button appears when the query is non-empty. The underlying input uses `role='searchbox'`; label it with `aria-label` or `FieldLabel`/`id`.

- `DEFAULT WITH CLEAR`: controlled query and clear action.
- `FLUID`: taller contextual presentation for a contained search.
- `DISABLED`: unavailable state.

**Live demo variant:** `FLUID`

## Accessibility and layout

Always supply an accessible name. Use a surrounding `<form role='search'>` only when Enter submits a search to a distinct result route; a filtering field can remain an input. Keep clear behavior visible and keyboard-operable. Search expands to its container width; give it a useful width in page toolbars and let it wrap on narrow layouts.

## API

`SearchProps` omits `Input`'s `type`, adornments, and native value props, then adds:

| Prop            | Type                      | Purpose                                             |
| --------------- | ------------------------- | --------------------------------------------------- |
| `value`         | `string`                  | Controlled query.                                   |
| `defaultValue`  | `string`                  | Initial uncontrolled query.                         |
| `onValueChange` | `(value: string) => void` | Receives query updates and clear.                   |
| `onClear`       | `() => void`              | Optional callback after clear.                      |
| `appearance`    | `'default' \| 'fluid'`    | SkyTrack default or taller contextual presentation. |

Use `onChange` from `InputProps` when the native input event is also needed. The clear action empties the query; callers own result filtering.

**Live demo variant:** `DEFAULT WITH CLEAR`

## Evidence and limits

- Source, types, demo, and export subpath are in this workspace package at version `0.1.5`.
- Search does not submit a query, navigate, or filter records by itself; the consuming composition owns those behaviors.
