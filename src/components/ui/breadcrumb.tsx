import * as React from 'react'
import { DotsThreeIcon, CaretRightIcon } from '@phosphor-icons/react'
import { useRender } from '@base-ui/react/use-render'
import { cn } from '@/lib/utils'

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav data-slot='breadcrumb' aria-label='breadcrumb' className={cn(className as string)} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn('flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5', className as string)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-item'
      className={cn('inline-flex items-center gap-1.5', className as string)}
      {...props}
    />
  )
}

type BreadcrumbLinkProps = useRender.ComponentProps<'a'>

function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      'data-slot': 'breadcrumb-link',
      className: cn('text-muted-foreground transition-colors hover:text-foreground', className as string),
      ...props
    }
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-current='page'
      aria-disabled='true'
      className={cn('font-normal text-foreground', className as string)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ className, children, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className as string)}
      {...props}
    >
      {children ?? <CaretRightIcon />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn('flex size-8 items-center justify-center text-muted-foreground', className as string)}
      {...props}
    >
      <DotsThreeIcon className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
