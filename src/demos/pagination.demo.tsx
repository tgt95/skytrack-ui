import * as React from 'react'
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

export const demo: DemoMeta = {
  id: 'pagination',
  title: 'Pagination',
  description: 'Accessible page navigation with previous, next, page links, and ellipsis.',
  group: 'Data Display',
  variants: [{ name: 'INTERACTIVE', render: () => <InteractivePagination /> }]
}
