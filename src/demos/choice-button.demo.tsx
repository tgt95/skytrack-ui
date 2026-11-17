import * as React from 'react'
import { ChoiceButton, ChoiceGroup } from '@/components/ui/choice-button'
import type { DemoMeta } from '@/showcase/demo'

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' }
] as const

function PriorityChoice() {
  const [value, setValue] = React.useState('normal')

  return (
    <ChoiceGroup aria-label='Mission priority' value={value} onValueChange={(nextValue) => setValue(String(nextValue))}>
      {PRIORITIES.map((priority) => (
        <ChoiceButton key={priority.value} value={priority.value}>
          {priority.label}
        </ChoiceButton>
      ))}
    </ChoiceGroup>
  )
}

function DefaultPriorityChoice() {
  return (
    <ChoiceGroup aria-label='Mission priority' defaultValue='normal'>
      {PRIORITIES.map((priority) => (
        <ChoiceButton key={priority.value} value={priority.value}>
          {priority.label}
        </ChoiceButton>
      ))}
    </ChoiceGroup>
  )
}

function DisabledPriorityChoice() {
  const [value, setValue] = React.useState('normal')

  return (
    <ChoiceGroup aria-label='Mission priority' value={value} onValueChange={(nextValue) => setValue(String(nextValue))}>
      {PRIORITIES.map((priority) => (
        <ChoiceButton key={priority.value} value={priority.value} disabled={priority.value === 'low'}>
          {priority.label}
        </ChoiceButton>
      ))}
    </ChoiceGroup>
  )
}

function ChannelChoice() {
  const [value, setValue] = React.useState('push')

  return (
    <ChoiceGroup
      aria-label='Alert channel'
      value={value}
      onValueChange={(nextValue) => setValue(String(nextValue))}
      className='flex-col items-stretch'
    >
      <ChoiceButton value='push'>Push notification</ChoiceButton>
      <ChoiceButton value='email'>Email digest</ChoiceButton>
      <ChoiceButton value='none'>No alerts</ChoiceButton>
    </ChoiceGroup>
  )
}

function ChoiceButtonOptions() {
  return (
    <div className='flex flex-col gap-4'>
      <ChoiceGroup aria-label='Choice button size' defaultValue='sm'>
        <ChoiceButton size='xs' value='xs'>
          Extra small
        </ChoiceButton>
        <ChoiceButton size='sm' value='sm'>
          Small
        </ChoiceButton>
        <ChoiceButton size='default' value='default'>
          Default
        </ChoiceButton>
        <ChoiceButton size='lg' value='lg'>
          Large
        </ChoiceButton>
      </ChoiceGroup>
      <ChoiceGroup aria-label='Choice button appearance' defaultValue='subtle'>
        <ChoiceButton value='default'>Default selection</ChoiceButton>
        <ChoiceButton value='subtle' selectedVariant='subtle' showCheckmark={false}>
          Subtle without checkmark
        </ChoiceButton>
      </ChoiceGroup>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'choice-button',
  title: 'Choice Button',
  description: 'Chip-like radio choices with shared sizes, two selected appearances, and an optional checkmark.',
  group: 'Forms',
  variants: [
    {
      name: 'Default',
      render: () => <PriorityChoice />
    },
    {
      name: 'Default value',
      render: () => <DefaultPriorityChoice />
    },
    {
      name: 'Disabled choice',
      render: () => <DisabledPriorityChoice />
    },
    {
      name: 'Vertical group',
      render: () => <ChannelChoice />
    },
    {
      name: 'Sizes and selected variants',
      render: () => <ChoiceButtonOptions />
    }
  ]
}
