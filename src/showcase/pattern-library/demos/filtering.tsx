import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import { FILTER_ITEMS, DemoFrame, UseCaseSection } from './shared'

export function FilteringDemo() {
  const [status, setStatus] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [mode, setMode] = useState<'instant' | 'batch'>('instant')
  const [appliedTypes, setAppliedTypes] = useState<string[]>([])
  const activeTypes = mode === 'instant' ? selectedTypes : appliedTypes
  const statusResults = FILTER_ITEMS.filter((item) => status === 'All' || item.status === status)
  const categoryResults = FILTER_ITEMS.filter((item) => !activeTypes.length || activeTypes.includes(item.category))

  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose one status · instant results'
        scenario='A dispatcher selects one status and sees the mission list update immediately.'
      >
        <RadioGroup
          value={status}
          onValueChange={(value) => setStatus(String(value))}
          aria-label='Filter missions by status'
          className='flex flex-wrap gap-x-5 gap-y-2'
        >
          {['All', 'Ready', 'In review', 'Complete'].map((option) => (
            <label key={option} className='flex cursor-pointer items-center gap-2'>
              <RadioRoot value={option} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {statusResults.length} {statusResults.length === 1 ? 'mission' : 'missions'} shown for {status.toLowerCase()}.
        </p>
        <ul className='divide-y divide-border border-y border-border'>
          {statusResults.map((item) => (
            <li key={item.name} className='flex justify-between gap-3 py-2'>
              <span>{item.name}</span>
              <Badge count={item.status} status='outline' className='rounded-(--radius)' />
            </li>
          ))}
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Combine categories · apply or update instantly'
        scenario='A coordinator selects several plan types and can review pending filters before applying them.'
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            size='sm'
            variant={mode === 'instant' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'instant'}
            onClick={() => setMode('instant')}
          >
            Instant
          </Button>
          <Button
            size='sm'
            variant={mode === 'batch' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'batch'}
            onClick={() => setMode('batch')}
          >
            Batch
          </Button>
        </div>
        <FieldRoot>
          <FieldLabel nativeLabel={false} render={<span>Filter by plan category</span>} />
          <CheckboxGroup
            value={selectedTypes}
            onValueChange={(value) => setSelectedTypes(value as string[])}
            aria-label='Filter by plan category'
            className='flex flex-wrap gap-x-5 gap-y-2'
          >
            {['Planning', 'Review', 'Complete'].map((option) => (
              <label key={option} className='flex cursor-pointer items-center gap-2'>
                <CheckboxRoot value={option} aria-label={option} />
                <span>{option}</span>
              </label>
            ))}
          </CheckboxGroup>
        </FieldRoot>
        <div className='flex flex-wrap gap-2'>
          {mode === 'batch' && (
            <Button size='sm' onClick={() => setAppliedTypes(selectedTypes)}>
              Apply filters
            </Button>
          )}
          <Button size='sm' variant='outline' disabled={!selectedTypes.length} onClick={() => setSelectedTypes([])}>
            Clear selections
          </Button>
          <Button
            size='sm'
            variant='ghost'
            disabled={mode === 'instant' && selectedTypes.length === 0 && appliedTypes.length === 0}
            onClick={() => {
              setSelectedTypes([])
              setAppliedTypes([])
              setMode('instant')
            }}
          >
            Reset all filters
          </Button>
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {categoryResults.length} {categoryResults.length === 1 ? 'mission' : 'missions'} shown
          {mode === 'batch' ? ` · ${selectedTypes.length} pending selection(s)` : ' · instant update'}.
        </p>
        {categoryResults.length ? (
          <ul className='divide-y divide-border border-y border-border'>
            {categoryResults.map((item) => (
              <li key={item.name} className='flex justify-between gap-3 py-2'>
                <span>{item.name}</span>
                <Badge count={item.category} status='outline' className='rounded-(--radius)' />
              </li>
            ))}
          </ul>
        ) : (
          <Alert role='status'>
            <AlertTitle>No matching plans</AlertTitle>
            <AlertDescription>Clear the selected categories to restore the complete sample list.</AlertDescription>
          </Alert>
        )}
      </UseCaseSection>
    </DemoFrame>
  )
}
