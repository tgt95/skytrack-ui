import * as React from 'react'
import { Search } from '@/components/ui/search'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import type { DemoMeta } from '@/showcase/demo'

function ControlledSearch() {
  const id = React.useId()
  const [query, setQuery] = React.useState('Northstar')

  return (
    <FieldRoot className='w-full max-w-sm'>
      <FieldLabel htmlFor={id}>Search workspaces</FieldLabel>
      <Search
        id={id}
        aria-label='Search workspaces'
        value={query}
        onValueChange={setQuery}
        placeholder='Search workspaces'
      />
      <FieldDescription aria-live='polite'>
        {query ? `Filtering sample workspaces by “${query}”.` : 'All sample workspaces are shown.'}
      </FieldDescription>
    </FieldRoot>
  )
}

function FluidSearch() {
  return (
    <FieldRoot className='w-full max-w-lg'>
      <FieldLabel htmlFor='fluid-mission-search'>Search mission records</FieldLabel>
      <Search
        id='fluid-mission-search'
        aria-label='Search mission records'
        appearance='fluid'
        placeholder='Search mission records'
        defaultValue='SKY-104'
      />
      <FieldDescription>Sample query; the parent view decides which records to filter.</FieldDescription>
    </FieldRoot>
  )
}

export const demo: DemoMeta = {
  id: 'search',
  title: 'Search',
  description: 'Find relevant records with an accessible search field and an explicit clear action.',
  group: 'Data Display',
  variants: [
    { name: 'DEFAULT WITH CLEAR', render: () => <ControlledSearch /> },
    { name: 'FLUID', render: () => <FluidSearch /> },
    {
      name: 'DISABLED',
      render: () => <Search aria-label='Search archived records' disabled placeholder='Search archived records' />
    }
  ]
}
