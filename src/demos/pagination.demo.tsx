import * as React from 'react'
import { CaretDownIcon } from '@phosphor-icons/react'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type MissionRecord = { id: string; callsign: string; region: string; status: string }

const missionRecords: MissionRecord[] = Array.from({ length: 14 }, (_, index) => ({
  id: `S-${index + 1}`,
  callsign: `SKY-${104 + index}`,
  region: ['North', 'Central', 'South'][index % 3],
  status: ['Ready', 'In review', 'Complete'][index % 3]
}))

const missionColumns: DataTableColumnDef<MissionRecord>[] = [
  { accessorKey: 'callsign', header: 'Callsign' },
  { accessorKey: 'region', header: 'Region' },
  { accessorKey: 'status', header: 'Status' }
]
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import type { DemoMeta } from '@/showcase/demo'

function InteractivePagination() {
  const [page, setPage] = React.useState(2)
  const totalPages = 8

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, target: number) => {
    event.preventDefault()
    setPage(Math.max(1, Math.min(totalPages, target)))
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <p aria-live='polite' className='text-sm text-muted-foreground'>
        Page {page} of {totalPages}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' aria-disabled={page === 1} onClick={(event) => goTo(event, page - 1)} />
          </PaginationItem>
          {[1, 2, 3].map((number) => (
            <PaginationItem key={number}>
              <PaginationLink href='#' isActive={page === number} onClick={(event) => goTo(event, number)}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive={page === totalPages} onClick={(event) => goTo(event, totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' aria-disabled={page === totalPages} onClick={(event) => goTo(event, page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function TablePaginationExample() {
  const [pageSize, setPageSize] = React.useState(5)

  return (
    <div className='w-full space-y-2'>
      <p className='text-xs text-muted-foreground'>Sample mission records; pagination state stays in this preview.</p>
      <DataTable
        data={missionRecords}
        columns={missionColumns}
        getRowId={(record) => record.id}
        pageSize={pageSize}
        renderPagination={({ table }) => {
          const pageCount = Math.max(table.getPageCount(), 1)
          const pageIndex = Math.min(table.state.pagination.pageIndex, pageCount - 1)
          return (
            <div className='flex flex-wrap items-center justify-end gap-4'>
              <div className='flex items-center gap-2'>
                <span className='whitespace-nowrap text-sm text-muted-foreground'>Rows per page</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    if (!value) return
                    const nextPageSize = Number(value)
                    setPageSize(nextPageSize)
                    table.setPageSize(nextPageSize)
                  }}
                >
                  <SelectTrigger aria-label='Rows per page' size='sm' className='w-28'>
                    <SelectValue>{(value: string | null) => `${value ?? pageSize} rows`}</SelectValue>
                    <SelectIcon>
                      <CaretDownIcon aria-hidden='true' className='size-4' />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner>
                      <SelectPopup>
                        <SelectList>
                          {[5, 10].map((size) => (
                            <SelectItem key={size} value={String(size)}>
                              <SelectItemText>{size} rows</SelectItemText>
                            </SelectItem>
                          ))}
                        </SelectList>
                      </SelectPopup>
                    </SelectPositioner>
                  </SelectPortal>
                </Select>
              </div>
              <div className='flex items-center gap-2'>
                <Select
                  value={String(pageIndex + 1)}
                  onValueChange={(value) => value != null && table.setPageIndex(Number(value) - 1)}
                >
                  <SelectTrigger aria-label='Page' size='sm' className='w-28'>
                    <SelectValue>{(value: string | null) => `Page ${value ?? pageIndex + 1}`}</SelectValue>
                    <SelectIcon>
                      <CaretDownIcon aria-hidden='true' className='size-4' />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner>
                      <SelectPopup>
                        <SelectList>
                          {Array.from({ length: pageCount }, (_, index) => (
                            <SelectItem key={index} value={String(index + 1)}>
                              <SelectItemText>{index + 1}</SelectItemText>
                            </SelectItem>
                          ))}
                        </SelectList>
                      </SelectPopup>
                    </SelectPositioner>
                  </SelectPortal>
                </Select>
                <span className='whitespace-nowrap text-sm text-muted-foreground'>of {pageCount}</span>
              </div>
              <Pagination aria-label='Table pages' className='mx-0 w-auto justify-end'>
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
          )
        }}
      />
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'pagination',
  title: 'Pagination',
  description: 'Accessible page navigation with previous, next, page links, and ellipsis.',
  group: 'Data Display',
  variants: [
    { name: 'PAGE NAVIGATION', render: () => <InteractivePagination /> },
    { name: 'TABLE PAGINATION', render: () => <TablePaginationExample /> }
  ]
}
