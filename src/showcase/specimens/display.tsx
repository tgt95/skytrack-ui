import * as React from 'react'
import { PlusIcon } from '@phosphor-icons/react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import type { ControlSize } from '@/lib/control-sizes'
import { Calendar } from '@/components/ui/calendar'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from '@/components/ui/code-block'
import { DataTable, type DataTableColumnDef, type DataTableSize } from '@/components/ui/data-table'
import { DatePicker, DateRangePicker, DateWeekPicker } from '@/components/ui/date-picker'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function AttachmentSpecimen({
  state = 'done',
  size = 'default',
  orientation = 'horizontal',
  media = 'icon'
}: {
  state?: string
  size?: string
  orientation?: string
  media?: string
}) {
  return (
    <Attachment
      state={state as React.ComponentProps<typeof Attachment>['state']}
      size={size as React.ComponentProps<typeof Attachment>['size']}
      orientation={orientation as React.ComponentProps<typeof Attachment>['orientation']}
      className='max-w-sm'
    >
      <AttachmentMedia variant={media as React.ComponentProps<typeof AttachmentMedia>['variant']}>
        <PlusIcon aria-hidden />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>mission-plan.json</AttachmentTitle>
        <AttachmentDescription>
          {state === 'error' ? 'Upload failed · Retry' : state === 'done' ? 'Ready · 24 KB' : `${state} · 24 KB`}
        </AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  )
}

/* ------------------------------------------------------------------- Badge */

export function BadgeSpecimen({ status, size }: { status?: string; size?: string }) {
  return (
    <Badge
      status={status as React.ComponentProps<typeof Badge>['status']}
      size={size as React.ComponentProps<typeof Badge>['size']}
      count={status ?? 8}
    />
  )
}

/* --------------------------------------------------------------- Separator */

export function SeparatorSpecimen({ orientation }: { orientation: string }) {
  if (orientation === 'vertical') {
    return (
      <span className='flex h-6 items-center'>
        <Separator orientation='vertical' />
      </span>
    )
  }
  return <Separator className='w-24' />
}

/* ------------------------------------------------------------- Scroll area */

export function ScrollAreaSpecimen({ orientation }: { orientation: string }) {
  if (orientation === 'horizontal') {
    return (
      <ScrollArea className='h-14 w-40 rounded-(--radius) border border-border'>
        <ScrollAreaViewport>
          <ScrollAreaContent className='w-72 p-2 text-xs whitespace-nowrap'>
            Wide content scrolls sideways.
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation='horizontal'>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className='h-20 w-40 rounded-(--radius) border border-border'>
      <ScrollAreaViewport>
        <ScrollAreaContent className='p-2 text-xs'>
          <p className='m-0'>Tall content scrolls vertically.</p>
          <p className='m-0'>Second line.</p>
          <p className='m-0'>Third line.</p>
          <p className='m-0'>Fourth line.</p>
          <p className='m-0'>Fifth line.</p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  )
}

/* ------------------------------------------------------------ Avatar */

export function AvatarSpecimen({ size = 'default' }: { size?: ControlSize }) {
  return (
    <div className='flex items-center gap-3'>
      <Avatar size={size}>
        <AvatarImage
          src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80'
          width='48'
          height='48'
          alt=''
        />
        <AvatarFallback>LT</AvatarFallback>
      </Avatar>
      <Avatar size={size}>
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
    </div>
  )
}

/* ---------------------------------------------------------------- Calendar */

export function CalendarSpecimen({ state = 'single selection' }: { state?: string }) {
  const isRange = state === 'range'
  const isDisabledDays = state === 'disabled days'
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  if (isRange) {
    return (
      <Calendar
        key={state}
        mode='range'
        selected={{ from: new Date(), to: new Date(Date.now() + 4 * 86400000) }}
        className='rounded-(--radius) border border-border shadow-xs'
      />
    )
  }

  return (
    <Calendar
      key={state}
      mode='single'
      selected={date}
      onSelect={setDate}
      disabled={isDisabledDays ? (d) => d.getDay() === 0 || d.getDay() === 6 : undefined}
      className='rounded-(--radius) border border-border shadow-xs'
    />
  )
}

/* ------------------------------------------------------------------- Chart */

export const chartSpecimenConfig: ChartConfig = {
  planned: { label: 'Planned', color: 'var(--color-primary)' },
  completed: { label: 'Completed', color: 'var(--color-muted-foreground)' }
}

export const chartSpecimenData = [
  { month: 'Jan', planned: 18, completed: 14 },
  { month: 'Feb', planned: 22, completed: 19 },
  { month: 'Mar', planned: 25, completed: 21 },
  { month: 'Apr', planned: 20, completed: 17 }
]

export function ChartSpecimen({ state = 'categorical series' }: { state?: string }) {
  const isCategorical = state === 'categorical series'
  const isCustomTooltip = state === 'custom tooltip'
  const isLegend = state === 'legend'

  return (
    <ChartContainer key={state} config={chartSpecimenConfig} className='h-48 w-full max-w-sm'>
      <BarChart data={chartSpecimenData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='month' tickLine={false} tickMargin={8} axisLine={false} />
        {isCustomTooltip ? (
          <ChartTooltip defaultIndex={1} content={<ChartTooltipContent hideLabel />} />
        ) : (
          <ChartTooltip content={<ChartTooltipContent />} />
        )}
        {(isLegend || isCategorical) && <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey='planned' fill='var(--color-planned)' radius={2} />
        {isCategorical && <Bar dataKey='completed' fill='var(--color-completed)' radius={2} />}
      </BarChart>
    </ChartContainer>
  )
}

/* -------------------------------------------------------------- Code block */

export function CodeBlockSpecimen({
  variant = 'default',
  size = 'default'
}: {
  variant?: 'default' | 'destructive'
  size?: 'default' | 'sm' | 'xs'
}) {
  const code = 'const ready = true\nconsole.log(ready)'
  return (
    <CodeBlock variant={variant} size={size} className='w-full max-w-sm'>
      <CodeBlockHeader>
        <CodeBlockTitle>index.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>
        <CodeBlockLine>const ready = true</CodeBlockLine>
        <CodeBlockLine>console.log(ready)</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  )
}

/* -------------------------------------------------------------- Data table */

export type DataTableSample = {
  id: string
  name: string
  status: string
}

export const dataTableSampleData: DataTableSample[] = [
  { id: '1', name: 'Alpha Flight', status: 'Active' },
  { id: '2', name: 'Beta Patrol', status: 'Standby' },
  { id: '3', name: 'Gamma Survey', status: 'Complete' }
]

export const dataTableSampleColumns: DataTableColumnDef<DataTableSample>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' }
]

export function DataTableSpecimen({ size = 'md', selection = 'none' }: { size?: DataTableSize; selection?: string }) {
  const enableSelection = selection === 'single' || selection === 'multiple'
  const selectionMode = selection === 'single' ? 'single' : 'multiple'
  return (
    <div className='w-full max-w-lg'>
      <DataTable
        columns={dataTableSampleColumns}
        data={dataTableSampleData}
        size={size}
        enableRowSelection={enableSelection}
        selectionMode={selectionMode}
        pageSize={5}
      />
    </div>
  )
}

/* ------------------------------------------------------------- Date picker */

export function DatePickerSpecimen({ mode = 'single' }: { mode?: string }) {
  if (mode === 'range') {
    return <DateRangePicker className='w-full max-w-xs' />
  }
  if (mode === 'week') {
    return <DateWeekPicker className='w-full max-w-xs' />
  }
  return <DatePicker className='w-full max-w-xs' />
}

/* --------------------------------------------------------------- Resizable */

export function ResizableSpecimen({
  orientation = 'horizontal',
  withHandle = 'false'
}: {
  orientation?: string
  withHandle?: string
}) {
  const isHorizontal = orientation === 'horizontal'
  return (
    <div className='h-32 w-full max-w-sm rounded-(--radius) border border-border p-1'>
      <ResizablePanelGroup orientation={isHorizontal ? 'horizontal' : 'vertical'}>
        <ResizablePanel defaultSize={50} minSize={20} className='flex items-center justify-center p-2'>
          <span className='text-xs text-muted-foreground'>Panel One</span>
        </ResizablePanel>
        <ResizableHandle withHandle={withHandle === 'true'} />
        <ResizablePanel defaultSize={50} minSize={20} className='flex items-center justify-center p-2'>
          <span className='text-xs text-muted-foreground'>Panel Two</span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
