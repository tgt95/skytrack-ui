# Routed Component Code Examples

**STATUS: OWNER REVIEW DRAFT** · **SOURCE BASIS: skytrack-ui 0.1.5**

These examples show the required route: user need → component knowledge → verified source/API → supported composition. Confirm that the installed consumer artifact includes the API before importing it.

## Example 1 — Choose one value from a known list

**Need:** choose one predefined option. Start with [`designer/select.md`](../knowledge/designer/select.md) for UX fit, then [`select.md`](../knowledge/select.md) for types, composition, and example. If the list requires search, compare [`combobox.md`](../knowledge/combobox.md) and [`autocomplete.md`](../knowledge/autocomplete.md) before using Select. Confirm the public `skytrack-ui/select` exports and closest demo in package `0.1.5`.

This composition follows the Select demo's supported parts; `SelectIcon` keeps a consistent trailing indicator and the visible label remains independent of the placeholder.

```tsx
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue
} from 'skytrack-ui/select'
import { FieldRoot } from 'skytrack-ui/field'

const statuses = [
  { value: 'ready', label: 'Ready' },
  { value: 'in-flight', label: 'In flight' },
  { value: 'maintenance', label: 'Maintenance' }
]

export function StatusSelect() {
  return (
    <FieldRoot className='w-full max-w-80'>
      <Select items={statuses}>
        <SelectLabel>Status</SelectLabel>
        <SelectTrigger size='default'>
          <SelectValue placeholder='Choose a status' />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner side='bottom' align='start' sideOffset={4}>
            <SelectPopup>
              <SelectList>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <SelectItemIndicator />
                    <SelectItemText>{status.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    </FieldRoot>
  )
}
```

Before adapting it, read the Designer Behavior and Accessibility guidance: a single choice closes after selection, while multi-select stays open for repeated choices. Do not copy `Select` for long, searchable, dynamic lookup without checking the alternative component pages.

`FieldRoot` groups the field, while Select keeps its own `SelectLabel` and `SelectTrigger`. For compound controls, do not replace the trigger or input with `FieldControl`.

## Example 2 — Dense records that need comparison and actions

**Need:** inspect, compare, search, sort, and page through structured records. Read [`designer/data-table.md`](../knowledge/designer/data-table.md) and [`data-table.md`](../knowledge/data-table.md), then inspect the source/types and `CUSTOMER RECORDS` demo. Use the component when columns carry meaningful relationships; use a list/card when people browse records individually and column comparison is not useful.

This code is source-checkout only. The current `0.1.5` package manifest declares the DataTable subpath, but its compiled `dist-lib` and tarball do not include DataTable runtime or declaration files. Do not use this import in a consumer app until the installed artifact contains those files; for the current consumer package, use a justified semantic table fallback.

```tsx
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'

type RecordRow = {
  id: string
  name: string
  status: string
  updatedAt: string
  responseTimeMs: number
}

const columns: DataTableColumnDef<RecordRow>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'updatedAt', header: 'Last updated' },
  {
    accessorKey: 'responseTimeMs',
    header: 'Response time (ms)',
    meta: { align: 'right' }
  }
]

const rows: RecordRow[] = [
  { id: 'R-1042', name: 'Record R-1042', status: 'Active', updatedAt: 'Nov 15, 2026', responseTimeMs: 184 },
  { id: 'R-1043', name: 'Record R-1043', status: 'Review', updatedAt: 'Nov 14, 2026', responseTimeMs: 206 }
]

export function RecordsTable() {
  return <DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
}
```

The showcase alias `@/components/ui/data-table` is valid only inside the SkyTrack source checkout. The 8 source-declared subpaths missing compiled `0.1.5` artifacts are listed in [`COMPONENT_ROUTING.md`](COMPONENT_ROUTING.md). For a consumer app, check both runtime and type files in the installed package. If DataTable is absent, use semantic table markup and available SkyTrack controls until a built package provides it. When available, its documented API covers search, sort, pagination, column visibility, optional selection, alignment metadata, and empty state; compose a missing action such as bulk assignment with verified controls rather than replacing supported table behavior.

## Example 3 — Destructive action

**Need:** trigger a destructive operation. Read [`designer/button.md`](../knowledge/designer/button.md), [`designer/alert-dialog.md`](../knowledge/designer/alert-dialog.md), and their Developer pages. Use an Alert Dialog when the decision is high impact or difficult to reverse; use a destructive button variant to express the action consistently. Verify both APIs and the closest demos before composing them.

```tsx
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from 'skytrack-ui/alert-dialog'
import { Button } from 'skytrack-ui/button'

export function DiscardDraftDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant='destructive'>Discard draft</Button>} />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogPopup className='sm:max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
            <AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose>Cancel</AlertDialogClose>
            <AlertDialogClose variant='destructive'>Discard</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialogPortal>
    </AlertDialog>
  )
}
```

The trigger opens the confirmation; the destructive action occurs only after confirmation. Use the verified Alert Dialog parts, state the consequence, and provide a safe cancel action. This is a high-impact confirmation pattern, not a recommendation to stack dialogs for unsaved edits.
