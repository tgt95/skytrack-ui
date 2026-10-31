import * as React from 'react'
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
  type ColumnDef,
  type RowData
} from '@tanstack/react-table'
import {
  CaretDownIcon,
  CaretUpIcon,
  CaretUpDownIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  SlidersHorizontalIcon,
  XIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger
} from '@/components/ui/menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  columnVisibilityFeature,
  rowSelectionFeature,
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric }
})

type DataTableAlignment = 'left' | 'center' | 'right'
type DataTableColumnMeta = { align?: DataTableAlignment }

const alignmentClasses: Record<DataTableAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

export type DataTableColumnDef<TData extends RowData> = ColumnDef<typeof dataTableFeatures, TData, any> & {
  meta?: DataTableColumnMeta
}

export type DataTableProps<TData extends RowData> = {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  enableRowSelection?: boolean
  getRowId?: (originalRow: TData, index: number) => string
  pageSize?: number
  searchPlaceholder?: string
  emptyMessage?: React.ReactNode
  className?: string
}

function DataTable<TData extends RowData>({
  columns,
  data,
  enableRowSelection = false,
  getRowId,
  pageSize = 10,
  searchPlaceholder = 'Search records',
  emptyMessage = 'No results found.',
  className
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    initialState: { pagination: { pageIndex: 0, pageSize } },
    globalFilterFn: 'includesString',
    defaultColumn: { sortFn: 'alphanumeric' }
  })
  const pageRows = table.getRowModel().rows
  const rowCount = table.getRowCount()
  const pageIndex = table.state.pagination.pageIndex
  const firstRow = rowCount === 0 ? 0 : pageIndex * table.state.pagination.pageSize + 1
  const lastRow = rowCount === 0 ? 0 : firstRow + pageRows.length - 1
  const query = table.state.globalFilter ?? ''

  return (
    <div data-slot='data-table' className={cn('flex w-full min-w-0 flex-col gap-4', className)}>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <Input
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
          endAdornment={
            query !== '' ? (
              <Button
                type='button'
                size='icon-xs'
                variant='ghost'
                aria-label='Clear filter'
                onClick={() => table.setGlobalFilter('')}
              >
                <XIcon aria-hidden='true' />
              </Button>
            ) : undefined
          }
          className='w-full sm:max-w-64'
          value={query}
          onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
        />
        <Menu>
          <MenuTrigger render={<Button type='button' variant='outline' size='sm' />}>
            <SlidersHorizontalIcon aria-hidden='true' />
            Columns
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner side='bottom' align='end' sideOffset={4}>
              <MenuPopup>
                {table
                  .getAllLeafColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <MenuCheckboxItem
                      key={column.id}
                      inset
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked) => column.toggleVisibility(checked)}
                    >
                      <MenuCheckboxItemIndicator>
                        <CheckIcon className='size-3.5' weight='bold' />
                      </MenuCheckboxItemIndicator>
                      {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                    </MenuCheckboxItem>
                  ))}
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </div>

      <div className='w-full overflow-x-auto rounded-(--radius) border border-border'>
        <table className='w-full min-w-[640px] border-collapse text-left text-sm'>
          <thead className='bg-muted text-muted-foreground'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='border-b border-border'>
                {enableRowSelection && (
                  <th scope='col' className='w-10 px-3 py-2'>
                    {headerGroup.id === table.getHeaderGroups()[0]?.id && (
                      <CheckboxRoot
                        aria-label='Select all rows on this page'
                        checked={table.getIsAllPageRowsSelected()}
                        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
                      />
                    )}
                  </th>
                )}
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  const SortIcon = sorted === 'asc' ? CaretUpIcon : sorted === 'desc' ? CaretDownIcon : CaretUpDownIcon
                  const align = (header.column.columnDef.meta as DataTableColumnMeta | undefined)?.align ?? 'left'
                  return (
                    <th
                      key={header.id}
                      scope='col'
                      colSpan={header.colSpan}
                      aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
                      className={cn('px-3 py-2 font-medium', alignmentClasses[align])}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type='button'
                          className='inline-flex cursor-pointer items-center gap-1.5 text-left outline-none hover:text-foreground focus-visible:underline'
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <table.FlexRender header={header} />
                          <SortIcon aria-hidden='true' className='size-3.5' />
                        </button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  data-selected={row.getIsSelected() || undefined}
                  className='border-b border-border last:border-0 hover:bg-muted/40 data-[selected=true]:bg-accent/50'
                >
                  {enableRowSelection && (
                    <td className='px-3 py-2'>
                      <CheckboxRoot
                        aria-label={`Select row ${row.id}`}
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
                      />
                    </td>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'px-3 py-2 align-middle',
                        alignmentClasses[
                          (cell.column.columnDef.meta as DataTableColumnMeta | undefined)?.align ?? 'left'
                        ]
                      )}
                    >
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length + Number(enableRowSelection)}
                  className='h-24 px-3 text-center text-muted-foreground'
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-sm text-muted-foreground'>
          Showing {firstRow}–{lastRow} of {rowCount} rows
          {enableRowSelection && ` · ${Object.keys(table.state.rowSelection).length} selected`}
        </p>
        <Pagination className='mx-0 w-auto justify-end'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                aria-disabled={!table.getCanPreviousPage()}
                onClick={(event) => {
                  event.preventDefault()
                  if (table.getCanPreviousPage()) table.previousPage()
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <span className='px-2 text-sm tabular-nums text-muted-foreground'>
                Page {Math.min(pageIndex + 1, Math.max(table.getPageCount(), 1))} of {Math.max(table.getPageCount(), 1)}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href='#'
                aria-disabled={!table.getCanNextPage()}
                onClick={(event) => {
                  event.preventDefault()
                  if (table.getCanNextPage()) table.nextPage()
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export { DataTable }
