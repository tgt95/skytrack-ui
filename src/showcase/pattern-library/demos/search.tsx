import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from '@/components/ui/progress'
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  SelectIcon
} from '@/components/ui/select'
import { SAMPLE_ITEMS, DemoFrame, UseCaseSection } from './shared'
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'

export function SearchDemo() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'basic' | 'active' | 'focused'>('active')
  const [scope, setScope] = useState('All')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [recoveryQuery, setRecoveryQuery] = useState('')
  const [previewQuery, setPreviewQuery] = useState('')
  const [previewActiveIndex, setPreviewActiveIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const scopedItems = SAMPLE_ITEMS.filter((item) => scope === 'All' || item.type === scope)
  const results = scopedItems.filter((item) =>
    item.name.toLowerCase().includes((mode === 'basic' ? submittedQuery : query).toLowerCase())
  )
  const recoveryResults = SAMPLE_ITEMS.filter((item) => item.name.toLowerCase().includes(recoveryQuery.toLowerCase()))
  const previewResults = SAMPLE_ITEMS.filter((item) => item.name.toLowerCase().includes(previewQuery.toLowerCase()))
  const previewOptions = previewResults.slice(0, 3)
  return (
    <DemoFrame>
      <UseCaseSection
        title='Find missions and narrow the result set'
        scenario='Compare submitted search, live filtering, and category-scoped search with recent suggestions and result feedback.'
      >
        <div className='flex flex-wrap gap-2'>
          {(['basic', 'active', 'focused'] as const).map((value) => (
            <Button
              key={value}
              size='sm'
              variant={mode === value ? 'secondary' : 'outline'}
              aria-pressed={mode === value}
              onClick={() => {
                setMode(value)
                setSubmittedQuery('')
              }}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </Button>
          ))}
        </div>
        {mode === 'focused' && (
          <FieldRoot className='max-w-xs'>
            <FieldLabel>Search scope</FieldLabel>
            <Select<string> value={scope} onValueChange={(value) => value && setScope(value)}>
              <SelectTrigger>
                <SelectValue />
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner side='bottom' align='start' sideOffset={4}>
                  <SelectPopup>
                    <SelectList>
                      {['All', 'Planning', 'Review', 'Complete'].map((value) => {
                        const count =
                          value === 'All'
                            ? SAMPLE_ITEMS.length
                            : SAMPLE_ITEMS.filter((item) => item.type === value).length
                        return (
                          <SelectItem key={value} value={value}>
                            <SelectItemIndicator />
                            <SelectItemText>
                              {value} · {count}
                            </SelectItemText>
                          </SelectItem>
                        )
                      })}
                    </SelectList>
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>
          </FieldRoot>
        )}
        <form
          className='flex flex-wrap gap-2'
          onSubmit={(event) => {
            event.preventDefault()
            setSubmittedQuery(query)
          }}
        >
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (mode !== 'basic') setSubmittedQuery(event.target.value)
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder={
              mode === 'focused' ? `Search ${scope === 'All' ? 'missions' : scope.toLowerCase()}` : 'Search missions'
            }
            aria-label='Search missions'
            startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
            endAdornment={
              query ? (
                <Button
                  size='icon-xs'
                  variant='ghost'
                  aria-label='Clear search'
                  onClick={() => {
                    setQuery('')
                    setSubmittedQuery('')
                  }}
                >
                  <XIcon />
                </Button>
              ) : null
            }
          />
          {mode === 'basic' && <Button type='submit'>Search</Button>}
        </form>
        {searchFocused && !query && (
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-muted-foreground'>Recent searches:</span>
            {['North coast', 'Runway inspection'].map((recent) => (
              <Button
                key={recent}
                size='sm'
                variant='ghost'
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setQuery(recent)
                  setSubmittedQuery(recent)
                  setSearchFocused(false)
                }}
              >
                {recent}
              </Button>
            ))}
          </div>
        )}
        {mode === 'focused' && query && scope !== 'All' && (
          <Button size='sm' variant='ghost' onClick={() => setScope('All')}>
            Search all missions for “{query}”
          </Button>
        )}
        <div className='space-y-2'>
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {mode === 'basic' && !submittedQuery
              ? 'Submit a query to see the results page preview.'
              : `${results.length} ${results.length === 1 ? 'mission' : 'missions'} match`}
            {mode === 'focused' ? ` · ${scope} scope` : ''}
          </p>
          {mode === 'basic' && !submittedQuery ? null : results.length ? (
            <ul className='list-disc ps-5'>
              {results.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <Alert role='status'>
              <AlertTitle>No missions found</AlertTitle>
              <AlertDescription>Try another term, widen the scope, or clear the search.</AlertDescription>
            </Alert>
          )}
          {mode === 'basic' && submittedQuery && (
            <p className='text-xs text-muted-foreground'>Basic search opens a separate results view in this sample.</p>
          )}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Review result count and recover from no matches'
        scenario='Show a live match count, then clear an unmatched term to recover the complete sample list.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Search the sample catalog</FieldLabel>
          <Input
            value={recoveryQuery}
            onChange={(event) => setRecoveryQuery(event.target.value)}
            placeholder='Try an unmatched term'
          />
        </FieldRoot>
        <p aria-live='polite' className='text-muted-foreground'>
          {recoveryResults.length} {recoveryResults.length === 1 ? 'mission' : 'missions'} found in this example.
        </p>
        {recoveryResults.length ? (
          <ul className='list-disc ps-5'>
            {recoveryResults.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <Alert role='status'>
            <AlertTitle>No missions found</AlertTitle>
            <AlertDescription>Clear the term to restore the complete sample list.</AlertDescription>
          </Alert>
        )}
        {recoveryQuery && (
          <Button size='sm' variant='outline' onClick={() => setRecoveryQuery('')}>
            Clear search
          </Button>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Preview matches before opening the full result set'
        scenario='For a short mission list, filter matches as the user types and show suggestions in place.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Find a mission preview</FieldLabel>
          <Input
            value={previewQuery}
            onChange={(event) => {
              setPreviewQuery(event.target.value)
              setPreviewActiveIndex(0)
              setPreviewOpen(Boolean(event.target.value))
            }}
            onFocus={() => setPreviewOpen(Boolean(previewQuery))}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' && previewOptions.length) {
                event.preventDefault()
                setPreviewActiveIndex((index) => (index + 1) % previewOptions.length)
              } else if (event.key === 'ArrowUp' && previewOptions.length) {
                event.preventDefault()
                setPreviewActiveIndex((index) => (index - 1 + previewOptions.length) % previewOptions.length)
              } else if (event.key === 'Enter' && previewOpen && previewOptions[previewActiveIndex]) {
                event.preventDefault()
                setPreviewQuery(previewOptions[previewActiveIndex].name)
                setPreviewOpen(false)
              } else if (event.key === 'Escape') {
                setPreviewOpen(false)
              }
            }}
            role='combobox'
            aria-expanded={previewOpen}
            aria-controls={previewOpen ? 'mission-search-suggestions' : undefined}
            aria-activedescendant={previewOpen ? `mission-search-option-${previewActiveIndex}` : undefined}
            placeholder='Type a mission name'
          />
        </FieldRoot>
        {previewOpen && (
          <ul
            id='mission-search-suggestions'
            role='listbox'
            aria-label='Mission suggestions'
            aria-live='polite'
            className='divide-y divide-border border-y border-border'
          >
            {previewOptions.map((item, index) => (
              <li
                key={item.name}
                id={`mission-search-option-${index}`}
                role='option'
                aria-selected={previewActiveIndex === index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setPreviewQuery(item.name)
                  setPreviewOpen(false)
                }}
                className={`flex cursor-pointer items-center justify-between gap-3 py-2 ${previewActiveIndex === index ? 'bg-muted' : ''}`}
              >
                <span>{item.name}</span>
                <Badge variant='outline'>{item.type}</Badge>
              </li>
            ))}
            {!previewResults.length && <li className='py-2 text-muted-foreground'>No matching preview yet.</li>}
          </ul>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Signal a slow search and support right-to-left entry'
        scenario='For a resource-intensive query, communicate that the request is still running; keep the search icon and text-entry order usable in right-to-left interfaces.'
      >
        <FieldRoot className='max-w-md'>
          <Input
            dir='rtl'
            aria-label='Search missions in right-to-left layout'
            placeholder='ابحث عن مهمة'
            startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
          />
        </FieldRoot>
        {searchLoading && (
          <Progress value={null}>
            <ProgressLabel>Searching the mission archive</ProgressLabel>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        )}
        <Button size='sm' variant='outline' onClick={() => setSearchLoading((current) => !current)}>
          {searchLoading ? 'Finish sample search' : 'Preview slow search'}
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}
