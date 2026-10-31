# Data Table

> A reusable, headless data table built with TanStack Table and semantic HTML.

- Package version: `0.1.5`
- Public export: `skytrack-ui/data-table`
- Implementation: [`src/components/ui/data-table.tsx`](../src/components/ui/data-table.tsx)
- Public type declaration: generated declaration `dist-lib/components/ui/data-table.d.ts` is absent in this checkout; source type declarations are exported in [`src/components/ui/data-table.tsx`](../src/components/ui/data-table.tsx).
- Showcase demo id: `data-table`
- Closest demo: [`src/demos/data-table.demo.tsx`](../src/demos/data-table.demo.tsx)

## Overview

The Data Table component provides a dense, feature-complete tabular data interface built on top of TanStack Table core features and semantic HTML table markup. It integrates column sorting, global filtering, pagination, column visibility controls, row selection, and text alignment in a unified presentation.

**Live demo variant:** `CUSTOMER RECORDS`

```tsx
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'

interface FlightRecord {
  id: string
  callsign: string
  destination: string
  altitude: number
}

const columns: DataTableColumnDef<FlightRecord>[] = [
  { accessorKey: 'callsign', header: 'Callsign' },
  { accessorKey: 'destination', header: 'Destination' },
  {
    accessorKey: 'altitude',
    header: 'Altitude (ft)',
    meta: { align: 'right' }
  }
]

const data: FlightRecord[] = [
  { id: '1', callsign: 'SKY101', destination: 'SFO', altitude: 32000 },
  { id: '2', callsign: 'SKY204', destination: 'SEA', altitude: 28000 }
]

export function DataTableDemo() {
  return <DataTable columns={columns} data={data} />
}
```

## Usage

Use Data Table for structured, multi-attribute operational records such as flight logs, transaction histories, user rosters, or sensor telemetry streams. For small or non-uniform datasets, using lists or cards is a UX heuristic rather than a component constraint—choose cards or lists when items are browsed individually, but retain Data Table whenever column-by-column comparison across records matters. For freeform key-value pairs without tabular relationships, use a description list.

**Live demo variant:** `CUSTOMER RECORDS`

## Anatomy

DataTable encapsulates TanStack Table logic within semantic table markup:

1. `DataTable` (Top-level orchestrator rendering toolbar, table container, and footer pagination)
2. Filter toolbar (Search input and column visibility dropdown menu)
3. `table` element with `thead`, `tbody`, `tr`, `th`, and `td`
4. Column sort triggers with directional caret indicators
5. `Pagination` controls (Previous/Next navigation and page index indicators)

All internal elements are rendered as standard semantic HTML elements styled with design tokens.

**Live demo variant:** `CUSTOMER RECORDS`

## Variants & states

Supported visual and functional states include:

- `align`: Specified per column via `meta: { align: 'left' | 'center' | 'right' }`.
- `sorting`: Columns support ascending, descending, or unsorted states.
- `filtering`: Global search input filters rows using TanStack Table's global filtering via `includesString`; there is no `searchKey` prop. The input placeholder is customizable via `searchPlaceholder` (default `'Search records'`).
- `visibility`: Dropdown menu toggles column visibility checkboxes dynamically.
- `empty`: Displays a centered "No results." row spanning all visible columns when no data matches.
- `selection`: Supports batch row selection checkboxes.

**Live demo variant:** `CUSTOMER RECORDS`

## Accessibility

Renders native HTML `table`, `thead`, `tbody`, `tr`, `th`, and `td` elements. Sortable column headers expose interactive buttons with accessible labels and clear visual indicators. Row selection checkboxes maintain `aria-label` tags. Empty data states are communicated via accessible table cell rows.

**Live demo variant:** `CUSTOMER RECORDS`

## API & examples

Import `DataTable` and type `DataTableColumnDef` from `skytrack-ui/data-table` or `@/components/ui/data-table`. The primary component props are `columns`, `data`, `enableRowSelection`, `getRowId`, `pageSize`, `searchPlaceholder`, `emptyMessage`, and `className`. Pagination defaults to 10 rows per page with built-in TanStack Table page index calculation.

**Live demo variant:** `CUSTOMER RECORDS`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./data-table`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: The generated declaration `dist-lib/components/ui/data-table.d.ts` is absent from the 0.1.5 build distribution; consuming applications must rely on TypeScript types exported from `src/components/ui/data-table.tsx`.
