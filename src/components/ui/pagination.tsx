import * as React from 'react'
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot='pagination-content' className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' className={cn(className)} {...props} />
}

type PaginationLinkProps = React.ComponentProps<'a'> & {
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

function PaginationLink({ className, isActive = false, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }),
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

type PaginationDirectionProps = PaginationLinkProps & { text?: string }

function PaginationPrevious({ className, text = 'Previous', ...props }: PaginationDirectionProps) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <CaretLeftIcon aria-hidden='true' />
      <span className='hidden sm:block'>{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, text = 'Next', ...props }: PaginationDirectionProps) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className='hidden sm:block'>{text}</span>
      <CaretRightIcon aria-hidden='true' />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden='true'
      data-slot='pagination-ellipsis'
      className={cn('flex size-9 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      <DotsThreeIcon className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
