import * as React from 'react'
import { cn } from '@/lib/utils'

export type PageHeaderProps = Omit<React.ComponentProps<'header'>, 'title'> & {
  /** Breadcrumb composition, usually built with the SkyTrack Breadcrumb parts. */
  breadcrumbs?: React.ReactNode
  /** Optional custom class name for the breadcrumbs wrapper container. */
  breadcrumbsClassName?: string
  /** Page title rendered as an h1 with the `.h3` visual style. */
  title: React.ReactNode
  /** Page-level actions, usually built with SkyTrack Toolbar parts. */
  toolbar?: React.ReactNode
  /** Optional lower content, such as a caller-composed SkyTrack Tabs instance. */
  children?: React.ReactNode
}

/** Page heading composition. Breadcrumbs and Toolbar are caller-composed; children can hold Tabs. */
function PageHeader({
  breadcrumbs,
  breadcrumbsClassName,
  title,
  toolbar,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header
      data-slot='page-header'
      className={cn(
        'flex min-w-0 flex-col gap-4 bg-card border-border border-b p-4 has-[>[data-slot=page-header-breadcrumbs]]:pt-0 has-[>[data-slot=page-header-body]>[data-slot=page-header-content]>[data-slot=tabs-list][data-variant=line]]:pb-0',
        className
      )}
      {...props}
    >
      {breadcrumbs != null && (
        <div
          data-slot='page-header-breadcrumbs'
          className={cn('-mx-4 flex min-w-0 items-center border-border border-b p-2', breadcrumbsClassName)}
        >
          {breadcrumbs}
        </div>
      )}
      <div data-slot='page-header-body' className='flex min-w-0 flex-col gap-4'>
        <div
          data-slot='page-header-main'
          className='flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'
        >
          <h1 data-slot='page-header-title' className='h3 m-0 min-w-0 flex-1'>
            {title}
          </h1>
          {toolbar != null && (
            <div data-slot='page-header-toolbar' className='min-w-0 max-w-full overflow-x-auto sm:ml-auto sm:shrink-0'>
              {toolbar}
            </div>
          )}
        </div>
        {children != null && (
          <div
            data-slot='page-header-content'
            className='min-w-0 max-w-full overflow-x-auto'
            // className='min-w-0 max-w-full overflow-x-auto has-[>[data-slot=tabs-list][data-variant=line]]:-mx-3'
          >
            {children}
          </div>
        )}
      </div>
    </header>
  )
}

export { PageHeader }
