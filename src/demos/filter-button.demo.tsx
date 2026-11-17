import * as React from 'react'
import { UserCircleGearIcon, FunnelIcon, TagIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { FilterButton } from '@/components/ui/filter-button'
import type { DemoMeta } from '@/showcase/demo'

const STATUS_OPTIONS = [
  { value: 'planned', label: 'Planned'},
  { value: 'active', label: 'Active'},
  { value: 'closed', label: 'Closed'},
  { value: 'archived', label: 'Archived'}
  // { value: 'planned', label: <Badge count='Planned' status='processing' /> },
  // { value: 'active', label: <Badge count='Active' status='success' /> },
  // { value: 'closed', label: <Badge count='Closed' status='secondary' /> },
  // { value: 'archived', label: <Badge count='Archived' status='error' /> }
]

const ASSIGNEE_OPTIONS = [
  { value: 'luna', label: 'Luna Smith' },
  { value: 'maya', label: 'Maya Chen' },
  { value: 'omar', label: 'Omar Hassan' },
  { value: 'grace', label: 'Grace Kim' }
]

const REGION_OPTIONS = [
  { value: 'north', label: 'North sector' },
  { value: 'south', label: 'South sector', disabled: true },
  { value: 'east', label: 'East sector' },
  { value: 'west', label: 'West sector', disabled: true }
]

const SIZES = [
  { size: 'xs', label: 'Extra small' },
  { size: 'sm', label: 'Small' },
  { size: 'default', label: 'Default' },
  { size: 'lg', label: 'Large' }
] as const

function StatusFilterButton () {
  const [value, setValue] = React.useState<string[]>(['active'])

  return (
    <FilterButton title='Filter by status' value={value} onValueChange={setValue} options={STATUS_OPTIONS}>
      <UserCircleGearIcon aria-hidden='true' />
      Status
      {value.length > 0 && <Badge count={value.length} status='processing' size='sm' />}
    </FilterButton>
  )
}

function AssigneeFilterButton () {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <FilterButton title='Filter by assignee' value={value} onValueChange={setValue} options={ASSIGNEE_OPTIONS}>
      <TagIcon aria-hidden='true' />
      Assignee
    </FilterButton>
  )
}

function SizedFilterButton ({ size }: { size: 'xs' | 'sm' | 'default' | 'lg' }) {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <FilterButton title='Filter by region' value={value} onValueChange={setValue} options={REGION_OPTIONS} size={size}>
      Region
      {value.length > 0 && <Badge count={value.length} status='processing' size='sm' />}
    </FilterButton>
  )
}

function VariantFilterButton ({ variant }: { variant: 'default' | 'outline' | 'secondary' }) {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <FilterButton
      title='Filter by region'
      value={value}
      onValueChange={setValue}
      options={REGION_OPTIONS}
      variant={variant}
    >
      <FunnelIcon aria-hidden='true' />
      Region
      {value.length > 0 && <Badge count={value.length} status='processing' size='sm' />}
    </FilterButton>
  )
}

function DisabledOptionsFilterButton () {
  const [value, setValue] = React.useState<string[]>(['east'])

  return (
    <FilterButton title='Filter by region' value={value} onValueChange={setValue} options={REGION_OPTIONS}>
      Region
      {value.length > 0 && <Badge count={value.length} status='processing' size='sm' />}
    </FilterButton>
  )
}

export const demo: DemoMeta = {
  id: 'filter-button',
  title: 'Filter Button',
  description:
    'A Button trigger that opens a multi-select filter popup. Trigger content stays caller-owned; a split clear action appears while values are selected.',
  group: 'Actions',
  variants: [
    {
      name: 'Default',
      render: () => <StatusFilterButton />
    },
    {
      name: 'Caller trigger content',
      render: () => <AssigneeFilterButton />
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='flex flex-col items-start gap-3'>
          {SIZES.map(({ size, label }) => (
            <div key={size} className='flex items-center gap-3'>
              <span className='w-24 text-xs sub-heading'>{label}</span>
              <SizedFilterButton size={size} />
            </div>
          ))}
        </div>
      )
    },
    {
      name: 'Variants',
      render: () => (
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <VariantFilterButton variant='outline' />
          <VariantFilterButton variant='secondary' />
          <VariantFilterButton variant='default' />
        </div>
      )
    },
    {
      name: 'Disabled options',
      render: () => <DisabledOptionsFilterButton />
    }
  ]
}
