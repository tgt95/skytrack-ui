# Data Table

> A reusable, headless data table built with TanStack Table and semantic HTML.

- Package version: `0.1.5`
- Public export: `skytrack-ui/data-table`
- Implementation: [`src/components/ui/data-table.tsx`](../../../../src/components/ui/data-table.tsx)
- Public type declaration: generated declaration `dist-lib/components/ui/data-table.d.ts` is absent in this checkout; source type declarations are exported in [`src/components/ui/data-table.tsx`](../../../../src/components/ui/data-table.tsx).
- Showcase demo id: `data-table`
- Closest demo: [`src/demos/data-table.demo.tsx`](../../../../src/demos/data-table.demo.tsx)

## Overview

The Data Table component provides a dense, feature-complete tabular data interface built on top of TanStack Table core features and semantic HTML table markup. It integrates column sorting, global filtering, pagination, column visibility controls, row selection, and text alignment in a unified presentation.

**Live demo variant:** `DENSE RECORDS`

```tsx
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'

interface FlightRecord {
  id: string
  callsign: string
  destination: string
  altitude: number
  status: 'Active' | 'Delayed'
  avatarUrl?: string
}

const columns: DataTableColumnDef<FlightRecord>[] = [
  { accessorKey: 'callsign', header: 'Callsign' },
  { accessorKey: 'destination', header: 'Destination' },
  { accessorKey: 'status', header: 'Status', filterFn: 'includesString' },
  {
    accessorKey: 'altitude',
    header: 'Altitude (ft)',
    meta: { align: 'right' }
  }
]

const data: FlightRecord[] = [
  { id: '1', callsign: 'SKY101', destination: 'SFO', altitude: 32000, status: 'Active' },
  { id: '2', callsign: 'SKY204', destination: 'SEA', altitude: 28000, status: 'Delayed' }
]

export function DataTableDemo() {
  return <DataTable columns={columns} data={data} />
}
```

## Usage

Use Data Table for structured, multi-attribute operational records such as flight logs, transaction histories, user rosters, or sensor telemetry streams. For small or non-uniform datasets, using lists or cards is a UX heuristic rather than a component constraint—choose cards or lists when items are browsed individually, but retain Data Table whenever column-by-column comparison across records matters. For freeform key-value pairs without tabular relationships, use a description list.

**Live demo variant:** `DENSE RECORDS`

## Anatomy

DataTable encapsulates TanStack Table logic within semantic table markup:

1. `DataTable` (Top-level orchestrator rendering toolbar, table container, and footer pagination)
2. Filter toolbar (Search input and column visibility dropdown menu)
3. `table` element with `thead`, `tbody`, `tr`, `th`, and `td`
4. Column sort triggers with directional caret indicators
5. `Pagination` controls (Previous/Next navigation and page index indicators)

All internal elements are rendered as standard semantic HTML elements styled with design tokens.

**Live demo variant:** `DENSE RECORDS`

## Variants & states

Supported visual and functional states include:

- `align`: Specified per column via `meta: { align: 'left' | 'center' | 'right' }`.
- `sorting`: Columns support ascending, descending, or unsorted states.
- `filtering`: Global search input filters rows using TanStack Table's global filtering via `includesString`; there is no `searchKey` prop. The input placeholder is customizable via `searchPlaceholder` (default `'Search records'`).
- `visibility`: Dropdown menu toggles column visibility checkboxes dynamically.
- `empty`: Displays a centered "No results." row spanning all visible columns when no data matches.
- `selection`: Supports batch row selection checkboxes.
- `selectionMode`: `multiple` (default) uses checkboxes; `single` uses a radio input to select one row.
- `size`: `xs`, `sm`, `md`, `lg`, or `xl` adjusts header and row density.
- `striped`: adds alternating row backgrounds.
- `loading`: marks the table busy, renders placeholder rows, disables built-in toolbar controls, and announces loading.

**Live demo variant:** `DENSE RECORDS`

## Accessibility

Renders native HTML `table`, `thead`, `tbody`, `tr`, `th`, and `td` elements. Sortable column headers expose interactive buttons with accessible labels and clear visual indicators. Selection controls have row-specific accessible names; single-selection radio inputs remain native to preserve valid table structure without inserting a group wrapper inside table rows. Empty data states are communicated in a spanning cell, and loading sets `aria-busy` and announces status.

**Live demo variant:** `DENSE RECORDS`

## API & examples

Import `DataTable` and types `DataTableColumnDef`, `DataTableRenderProps`, `DataTableExpandedRowProps`, `DataTableSelectionMode`, and `DataTableSize` from `skytrack-ui/data-table` or `@/components/ui/data-table`. The primary component props are `columns`, `data`, `enableRowSelection`, `selectionMode`, `getRowId`, `pageSize`, `size`, `striped`, `loading`, `searchPlaceholder`, `renderSearch`, `renderColumnVisibility`, `renderPagination`, `renderExpandedRow`, `getRowCanExpand`, `tableContainerClassName`, `emptyMessage`, and `className`. Pagination defaults to 10 rows per page with built-in TanStack Table page index calculation.

The three `render*` props replace their built-in controls and receive `{ table, rowCount, firstRow, lastRow }`. Use the supplied TanStack table instance to build custom JSX while keeping it connected to filtering, column visibility, or pagination. Omit a prop to keep its default control; return `null` to hide that control.

Use `tableContainerClassName` to set a bounded table viewport when rows should scroll independently from the toolbar and footer. The column header remains sticky within that scroll area.

Use `renderExpandedRow` to supply the row-detail JSX. It receives the same table context plus the expanded row; `getRowCanExpand` can restrict which records show the disclosure control. Omit `renderExpandedRow` to keep the table flat.

```tsx
<DataTable
  columns={columns}
  data={data}
  renderSearch={({ table }) => (
    <Input
      aria-label='Search flights'
      value={table.state.globalFilter ?? ''}
      onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
    />
  )}
  renderColumnVisibility={({ table }) => (
    <Button onClick={() => table.getColumn('destination')?.toggleVisibility()}>Toggle destination</Button>
  )}
  renderPagination={({ table }) => (
    <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
      Next
    </Button>
  )}
  getRowCanExpand={(flight) => Boolean(flight.destination)}
  renderExpandedRow={({ row }) => <div>Flight {row.original.callsign} details</div>}
/>
```

## Demo variants

The showcase provides eleven reusable compositions: `DEFAULT TABLE`, `SELECTABLE ROWS`, `OPEN ROW DETAILS ON DEMAND`, `SINGLE ROW SELECTION`, `BATCH ACTIONS`, `CUSTOM SEARCH + COLUMNS`, `COLLAPSED SEARCH`, `ADVANCED FILTERS`, `DENSE RECORDS`, `ROW DENSITY + ZEBRA`, and `LOADING + EMPTY STATES`. The row-details example intentionally combines expansion with selection; there is no standalone expansion-only variant. Search, columns, and pagination can use custom JSX through render props. Batch actions, density, stripes, loading, and empty results are demonstrated without requiring a product table to adopt every option.

`ADVANCED FILTERS` combines global search with multi-select filters for role, location, and status. Its `renderSearch` slot composes SkyTrack `Popover`, `CheckboxRoot`, `Badge`, `Input`, and `Button` components; each filter updates its own TanStack column filter, so filters can combine and clear independently.

The `Name` column also demonstrates a custom cell renderer that composes `Avatar` image/fallback with text. Its `accessorKey: 'name'` keeps sorting and filtering tied to the raw name while the cell can render arbitrary JSX:

```tsx
{
  accessorKey: 'name',
  header: 'Name',
  cell: ({ row }) => (
    <div className='flex items-center gap-2'>
      <Avatar size='sm' aria-hidden='true'>
        {row.original.avatarUrl && <AvatarImage src={row.original.avatarUrl} alt='' />}
        <AvatarFallback>{row.original.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>{row.original.name}</span>
    </div>
  )
}
```

### Copyable composition recipes

The snippets reuse `columns` and `data` from the Usage example. Import `Button` and `Input` for the custom-control recipes, and `Avatar`, `AvatarImage`, and `AvatarFallback` for the custom-cell recipe.

Start with the default table when the built-in search, column menu, and pagination fit the task:

```tsx
<DataTable columns={columns} data={data} />
```

Enable row selection for batch actions. Read selected rows from `table.getSelectedRowModel()` when adding an action toolbar:

```tsx
<DataTable columns={columns} data={data} enableRowSelection getRowId={(record) => record.id} />
```

Add disclosure only when supplementary details belong to the selected record. This inline example keeps the detail renderer self-contained; restrict expansion per record when needed:

```tsx
<DataTable
  columns={columns}
  data={data}
  getRowCanExpand={(record) => Boolean(record.callsign)}
  renderExpandedRow={({ row }) => (
    <dl>
      <dt>Callsign</dt>
      <dd>{row.original.callsign}</dd>
      <dt>Destination</dt>
      <dd>{row.original.destination}</dd>
    </dl>
  )}
/>
```

Combine both interactions only when users need to select records and inspect details in the same task:

```tsx
<DataTable
  columns={columns}
  data={data}
  getRowId={(record) => record.id}
  enableRowSelection
  getRowCanExpand={(record) => Boolean(record.callsign)}
  renderExpandedRow={({ row }) => (
    <p>
      {row.original.callsign} flies to {row.original.destination}.
    </p>
  )}
/>
```

Keep toolbar and pagination visible while a large result set scrolls inside a bounded table viewport:

```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={12}
  tableContainerClassName='max-h-96 overflow-y-auto overscroll-contain'
/>
```

Replace built-in search and column controls with JSX while retaining the table state and built-in pagination:

```tsx
<DataTable
  columns={columns}
  data={data}
  renderSearch={({ table }) => {
    const statusColumn = table.getColumn('status')
    const activeOnly = statusColumn?.getFilterValue() === 'Active'

    return (
      <div className='flex items-center gap-2'>
        <Input
          aria-label='Search flights'
          value={table.state.globalFilter ?? ''}
          onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
        />
        <Button onClick={() => statusColumn?.setFilterValue(activeOnly ? undefined : 'Active')}>
          {activeOnly ? 'All statuses' : 'Active only'}
        </Button>
      </div>
    )
  }}
  renderColumnVisibility={({ table }) => (
    <Button onClick={() => table.getColumn('email')?.toggleVisibility()}>Toggle email</Button>
  )}
/>
```

`renderPagination` can replace the footer in the same way. Its render props include the table instance and visible row range; use `table.getCanNextPage()` and `table.nextPage()` to keep a custom control connected to pagination state:

```tsx
renderPagination={({ table, firstRow, lastRow, rowCount }) => (
  <div className='flex items-center justify-between gap-3'>
    <span>Showing {firstRow}–{lastRow} of {rowCount} rows</span>
    <div className='flex gap-2'>
      <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
        Previous
      </Button>
      <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
        Next
      </Button>
    </div>
  </div>
)}
```

**Live demo variant:** `DENSE RECORDS`

## Column visibility

Treat the `Columns` visibility menu as an optional behavior chosen from the table's IA, not a
required part of every table. Include it when the objects, roles, or tasks show that people need to
customize which attributes they see. The `DENSE RECORDS` demo is a composition reference, not a
feature checklist. If column visibility is unnecessary, no separate IA note is required just to
record its omission.

The default `Columns` control can be replaced or hidden with `renderColumnVisibility`. Do not hide
the internal control with consumer CSS; use the render prop when a table needs a different control
or no column-visibility control.

**Live demo variant:** `DENSE RECORDS`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./data-table`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: The generated declaration `dist-lib/components/ui/data-table.d.ts` is absent from the 0.1.5 build distribution; consuming applications must rely on TypeScript types exported from `src/components/ui/data-table.tsx`.
