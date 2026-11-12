import * as React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ControlSize } from '@/lib/control-sizes'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'
import { PageHeader } from '@/components/ui/page-header'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Search } from '@/components/ui/search'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTab } from '@/components/ui/tabs'
import { AccountFaqAccordion } from '../accordion-faq'
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '@/components/ui/collapsible'

export const TAB_ITEMS = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
]

export function BreadcrumbSpecimen({ state = 'link' }: { state?: string }) {
  const isCurrent = state === 'current page'
  const isSeparator = state === 'separator'
  const isEllipsis = state === 'ellipsis'

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{isSeparator ? '/' : undefined}</BreadcrumbSeparator>
        {isEllipsis && (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator>{isSeparator ? '/' : undefined}</BreadcrumbSeparator>
          </>
        )}
        <BreadcrumbItem>
          {isCurrent ? <BreadcrumbPage>Plan</BreadcrumbPage> : <BreadcrumbLink href='#'>Mission Alpha</BreadcrumbLink>}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/* ------------------------------------------------------------------- Tabs */

export function TabsSpecimen({
  defaultTab = 'one',
  listVariant = 'line',
  tabSize = 'default',
  listWidth = 'hug',
  indicatorSide = 'left',
  orientation = 'horizontal',
  disabledTab = 'none',
  activation = 'manual',
  focusLoop = 'loop'
}: {
  defaultTab?: 'none' | 'one' | 'two' | 'three'
  listVariant?: 'filled' | 'pill' | 'line'
  tabSize?: 'default' | 'xs' | 'sm' | 'lg'
  listWidth?: 'full' | 'hug'
  indicatorSide?: 'left' | 'right'
  orientation?: 'horizontal' | 'vertical'
  disabledTab?: 'none' | 'one' | 'two' | 'three'
  activation?: 'manual' | 'automatic'
  focusLoop?: 'loop' | 'stop'
}) {
  return (
    <Tabs
      key={defaultTab}
      defaultValue={defaultTab === 'none' ? null : defaultTab}
      orientation={orientation}
      className={orientation === 'vertical' ? 'w-fit flex-row gap-3' : 'w-fit'}
    >
      <TabsList
        variant={listVariant}
        size={tabSize}
        width={listWidth}
        indicatorSide={indicatorSide}
        activateOnFocus={activation === 'automatic'}
        loopFocus={focusLoop === 'loop'}
        className={orientation === 'vertical' ? 'flex-col' : undefined}
      >
        {TAB_ITEMS.map((tab) => (
          <TabsTab key={tab.value} value={tab.value} disabled={disabledTab === tab.value}>
            {tab.label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  )
}

/* ----------------------------------------------------------- Accordion */

export function AccordionSpecimen({ state = 'multiple expansion' }: { state?: string }) {
  const isSingle = state === 'single expansion'
  const isCompact = state === 'compact'
  const isDisabled = state === 'disabled'

  return (
    <div key={state} className='w-full max-w-sm'>
      <AccountFaqAccordion defaultOpen multiple={!isSingle} compact={isCompact} disabled={isDisabled} />
    </div>
  )
}

/* --------------------------------------------------------- Collapsible */

export function CollapsibleSpecimen({ state = 'open' }: { state?: string }) {
  const isOpen = state === 'open'
  const isDisabled = state === 'disabled'

  return (
    <Collapsible key={state} defaultOpen={isOpen} disabled={isDisabled}>
      <CollapsibleTrigger disabled={isDisabled}>Show details</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className='m-0 text-sm'>Here are the details you asked for.</p>
      </CollapsiblePanel>
    </Collapsible>
  )
}

/* ------------------------------------------------------------- Inline edit */

export function InlineEditSpecimen({ state = 'viewing' }: { state?: string }) {
  const [value, setValue] = React.useState('Design is how it works')
  const isEditing = state === 'editing'
  const isSubmitting = state === 'submitting'
  const isDisabled = state === 'disabled' || isSubmitting

  return (
    <div key={state} className='w-full max-w-xs'>
      <InlineEdit
        value={isSubmitting ? 'Saving changes...' : value}
        onValueChange={setValue}
        defaultEditing={isEditing}
        disabled={isDisabled}
        label='Mission'
      >
        <InlineEditTrigger
          render={
            <Button
              variant='ghost'
              disabled={isDisabled}
              className={cn(
                'h-auto w-full justify-start px-2 py-1 text-left text-sm font-medium',
                isSubmitting && 'opacity-60'
              )}
            />
          }
        />
        <InlineEditInput autoFocus={isEditing} />
      </InlineEdit>
    </div>
  )
}

/* ------------------------------------------------------------- Page header */

export function PageHeaderSpecimen({ state = 'with breadcrumbs' }: { state?: string }) {
  const hasBreadcrumbs = state === 'with breadcrumbs'
  const hasToolbar = state === 'with toolbar'
  const hasTabs = state === 'with tabs'

  return (
    <div className='w-full max-w-xl overflow-hidden rounded-(--radius) border border-border'>
      <PageHeader
        title='Mission Overview'
        breadcrumbs={
          hasBreadcrumbs ? (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Missions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ) : undefined
        }
        toolbar={
          hasToolbar ? (
            <Button size='sm' variant='outline'>
              Edit
            </Button>
          ) : undefined
        }
      />
      {hasTabs && (
        <div className='flex gap-4 border-t border-border px-4 py-2 text-xs font-medium text-muted-foreground'>
          <span className='border-b-2 border-primary pb-1 text-foreground'>Overview</span>
          <span>Waypoints</span>
          <span>Telemetry</span>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------- Pagination */

export function PaginationSpecimen({
  linkSize = 'icon',
  linkVariant = 'ghost'
}: {
  linkSize?: 'default' | 'sm' | 'lg' | 'icon'
  linkVariant?: 'ghost' | 'outline'
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' size={linkSize} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href='#'
            isActive={linkVariant === 'outline'}
            size={linkSize}
            className={linkVariant === 'outline' ? buttonVariants({ variant: 'outline', size: linkSize }) : undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href='#'
            isActive={false}
            size={linkSize}
            className={linkVariant === 'outline' ? buttonVariants({ variant: 'outline', size: linkSize }) : undefined}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' size={linkSize} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

/* ------------------------------------------------------------------ Search */

export function SearchSpecimen({
  appearance = 'default',
  size = 'default'
}: {
  appearance?: 'default' | 'fluid'
  size?: ControlSize
}) {
  return (
    <div className='w-full max-w-xs'>
      <Search appearance={appearance} size={size} placeholder='Search missions...' defaultValue='Initial query' />
    </div>
  )
}
