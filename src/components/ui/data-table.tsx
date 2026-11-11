import * as React from 'react'
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
  type ColumnDef,
  type Row,
  type RowData,
  type ReactTable
} from '@tanstack/react-table'
import {
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  CaretUpDownIcon,
  CheckIcon,
  SlidersHorizontalIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import { Search } from '@/components/ui/search'
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
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
  sortedRowModel: createSortedRowModel(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  columnVisibilityFeature,
  rowSelectionFeature,
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric }
})

type DataTableAlignment = 'left' | 'center' | 'right'
export type DataTableSelectionMode = 'multiple' | 'single'
export type DataTableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type DataTableColumnMeta = { align?: DataTableAlignment }

const alignmentClasses: Record<DataTableAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const sortButtonAlignmentClasses: Record<DataTableAlignment, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
}

const cellSizeClasses: Record<DataTableSize, string> = {
  xs: 'px-3 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-3 py-3 text-sm',
  xl: 'px-3 py-4 text-base'
}

export type DataTableColumnDef<TData extends RowData> = ColumnDef<typeof dataTableFeatures, TData, unknown> & {
  meta?: DataTableColumnMeta
}

export type DataTableRenderProps<TData extends RowData> = {
  table: ReactTable<typeof dataTableFeatures, TData>
  rowCount: number
  firstRow: number
  lastRow: number
}

export type DataTableExpandedRowProps<TData extends RowData> = DataTableRenderProps<TData> & {
  row: Row<typeof dataTableFeatures, TData>
}

export type DataTableProps<TData extends RowData> = {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  enableRowSelection?: boolean
  selectionMode?: DataTableSelectionMode
  getRowId?: (originalRow: TData, index: number) => string
  pageSize?: number
  size?: DataTableSize
  striped?: boolean
  loading?: boolean
  searchPlaceholder?: string
  renderSearch?: (props: DataTableRenderProps<TData>) => React.ReactNode
  renderColumnVisibility?: (props: DataTableRenderProps<TData>) => React.ReactNode
  renderPagination?: (props: DataTableRenderProps<TData>) => React.ReactNode
  renderExpandedRow?: (props: DataTableExpandedRowProps<TData>) => React.ReactNode
  getRowCanExpand?: (originalRow: TData) => boolean
  tableContainerClassName?: string
  emptyMessage?: React.ReactNode
  className?: string
}

function DataTable<TData extends RowData>({
  columns,
  data,
  enableRowSelection = false,
  selectionMode = 'multiple',
  getRowId,
  pageSize = 10,
  size = 'md',
  striped = false,
  loading = false,
  searchPlaceholder = 'Search records',
  renderSearch,
  renderColumnVisibility,
  renderPagination,
  renderExpandedRow,
  getRowCanExpand,
  tableContainerClassName,
  emptyMessage = 'No results found.',
  className
}: DataTableProps<TData>) {
  const selectionName = React.useId()
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    initialState: { pagination: { pageIndex: 0, pageSize } },
    globalFilterFn: 'includesString',
    getRowCanExpand: (row) => Boolean(renderExpandedRow) && (getRowCanExpand?.(row.original) ?? true),
    defaultColumn: { sortFn: 'alphanumeric' }
  })
  const FlexRender = table.FlexRender
  const pageRows = table.getRowModel().rows
  const rowCount = table.getRowCount()
  const pageIndex = table.state.pagination.pageIndex
  const firstRow = rowCount === 0 ? 0 : pageIndex * table.state.pagination.pageSize + 1
  const lastRow = rowCount === 0 ? 0 : firstRow + pageRows.length - 1
  const selectedRowId = Object.keys(table.state.rowSelection).find((rowId) => table.state.rowSelection[rowId]) ?? ''
  const query = table.state.globalFilter ?? ''
  const renderProps: DataTableRenderProps<TData> = { table, rowCount, firstRow, lastRow }

  const renderBodyRows = () => {
    if (loading) {
      return Array.from({ length: Math.min(Math.max(pageSize, 3), 5) }, (_, rowIndex) => (
        <tr key={`loading-${rowIndex}`} aria-hidden='true' className='border-b border-border last:border-0'>
          {renderExpandedRow && <td className={cellSizeClasses[size]} />}
          {enableRowSelection && <td className={cellSizeClasses[size]} />}
          {table.getVisibleLeafColumns().map((column, columnIndex) => (
            <td key={column.id} className={cellSizeClasses[size]}>
              <span
                className={cn(
                  'block h-3 animate-pulse bg-muted',
                  columnIndex % 3 === 0 ? 'w-24' : columnIndex % 3 === 1 ? 'w-36' : 'w-16'
                )}
              />
            </td>
          ))}
        </tr>
      ))
    }

    if (!pageRows.length) {
      return (
        <tr>
          <td
            colSpan={
              table.getVisibleLeafColumns().length + Number(enableRowSelection) + Number(Boolean(renderExpandedRow))
            }
            className={cn('h-24 text-center text-muted-foreground', cellSizeClasses[size])}
          >
            {emptyMessage}
          </td>
        </tr>
      )
    }

    return pageRows.map((row) => (
      <React.Fragment key={row.id}>
        <tr
          data-selected={row.getIsSelected() || undefined}
          className={cn(
            'group border-b border-border last:border-0 bg-background hover:bg-muted/40 data-[selected=true]:bg-accent/50',
            striped && 'odd:bg-muted/20'
          )}
        >
          {renderExpandedRow && (
            <td className={cn('px-1', cellSizeClasses[size])}>
              {row.getCanExpand() && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon-xs'
                  aria-label={`${row.getIsExpanded() ? 'Collapse' : 'Expand'} details for ${row.id}`}
                  aria-expanded={row.getIsExpanded()}
                  onClick={row.getToggleExpandedHandler()}
                >
                  {row.getIsExpanded() ? <CaretDownIcon aria-hidden='true' /> : <CaretRightIcon aria-hidden='true' />}
                </Button>
              )}
            </td>
          )}
          {enableRowSelection && (
            <td className={cn('w-10', cellSizeClasses[size])}>
              {selectionMode === 'single' ? (
                <RadioRoot value={row.id} aria-label={`Select row ${row.id}`} disabled={!row.getCanSelect()} />
              ) : (
                <CheckboxRoot
                  aria-label={`Select row ${row.id}`}
                  checked={row.getIsSelected()}
                  disabled={!row.getCanSelect()}
                  onCheckedChange={(checked) => row.toggleSelected(checked === true)}
                />
              )}
            </td>
          )}
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={cn(
                'whitespace-nowrap align-middle',
                cellSizeClasses[size],
                alignmentClasses[(cell.column.columnDef.meta as DataTableColumnMeta | undefined)?.align ?? 'left']
              )}
            >
              <FlexRender cell={cell} />
            </td>
          ))}
        </tr>
        {renderExpandedRow && row.getIsExpanded() && (
          <tr className='border-b border-border'>
            <td
              colSpan={table.getVisibleLeafColumns().length + Number(enableRowSelection) + 1}
              className={cn('bg-muted/30 px-4 py-3', size === 'xs' || size === 'sm' ? 'text-sm' : undefined)}
            >
              {renderExpandedRow({ ...renderProps, row })}
            </td>
          </tr>
        )}
      </React.Fragment>
    ))
  }

  return (
    <div
      data-slot='data-table'
      aria-busy={loading || undefined}
      className={cn('flex w-full min-w-0 flex-col gap-4', className)}
    >
      <div className='flex flex-wrap items-center justify-between gap-3'>
        {renderSearch ? (
          renderSearch(renderProps)
        ) : (
          <Search
            size='sm'
            aria-label={searchPlaceholder}
            placeholder={searchPlaceholder}
            className='w-full sm:max-w-64'
            value={String(query)}
            disabled={loading}
            onValueChange={(nextQuery) => table.setGlobalFilter(nextQuery)}
            onClear={() => table.setGlobalFilter('')}
          />
        )}
        {renderColumnVisibility ? (
          renderColumnVisibility(renderProps)
        ) : (
          <Menu>
            <MenuTrigger render={<Button type='button' variant='outline' size='sm' disabled={loading} />}>
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
        )}
      </div>

      <div className={cn('w-full overflow-x-auto rounded-(--radius) border border-border', tableContainerClassName)}>
        <table aria-busy={loading || undefined} className='w-max min-w-full border-collapse text-left text-sm'>
          <thead className='sticky top-0 z-10 bg-muted text-muted-foreground'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='border-b border-border'>
                {renderExpandedRow && headerGroup.id === table.getHeaderGroups()[0]?.id && (
                  <th scope='col' aria-label='Expand row' className={cn('w-10', cellSizeClasses[size])} />
                )}
                {enableRowSelection && (
                  <th scope='col' aria-label='Select row' className={cn('w-10', cellSizeClasses[size])}>
                    {selectionMode === 'multiple' && headerGroup.id === table.getHeaderGroups()[0]?.id && (
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
                      className={cn('whitespace-nowrap font-medium', cellSizeClasses[size], alignmentClasses[align])}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className={cn(
                            'h-auto w-full cursor-pointer gap-1.5 p-0 !px-0 font-medium hover:text-foreground focus-visible:underline',
                            sortButtonAlignmentClasses[align]
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className='inline-flex items-center gap-1.5'>
                            <FlexRender header={header} />
                            <SortIcon
                              aria-hidden='true'
                              className='size-3.5 shrink-0'
                            />
                          </span>
                        </Button>
                      ) : (
                        <FlexRender header={header} />
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {enableRowSelection && selectionMode === 'single' ? (
            <RadioGroup
              render={<tbody />}
              role='rowgroup'
              name={selectionName}
              value={selectedRowId}
              className='table-row-group text-left text-sm'
              onValueChange={(value) => table.setRowSelection({ [String(value)]: true })}
            >
              {renderBodyRows()}
            </RadioGroup>
          ) : (
            <tbody>{renderBodyRows()}</tbody>
          )}
        </table>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p role={loading ? 'status' : undefined} className='whitespace-nowrap text-sm text-muted-foreground'>
          {loading
            ? 'Loading records…'
            : `Showing ${firstRow}–${lastRow} of ${rowCount} rows${enableRowSelection ? ` · ${Object.keys(table.state.rowSelection).length} selected` : ''}`}
        </p>
        {!loading &&
          (renderPagination ? (
            renderPagination(renderProps)
          ) : (
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
                    Page {Math.min(pageIndex + 1, Math.max(table.getPageCount(), 1))} of{' '}
                    {Math.max(table.getPageCount(), 1)}
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
          ))}
      </div>
    </div>
  )
}

export { DataTable }
