import { useMemo, useState } from 'react'
import 'skytrack-ui/styles.css'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  CORE_PATTERN_COUNT,
  COMMUNITY_PATTERN_COUNT,
  PATTERNS,
  type PatternDefinition,
  type PatternId
} from './catalog'
import { PatternDemo } from './demos'

type Audience = 'designer' | 'developer'
type PatternGroupFilter = 'All' | 'Core' | 'Community'

type PatternLibraryProps = {
  query: string
  audience: Audience
  onClearSearch: () => void
}

const GROUP_FILTERS: Array<{ label: PatternGroupFilter; count: number }> = [
  { label: 'All', count: PATTERNS.length },
  { label: 'Core', count: CORE_PATTERN_COUNT },
  { label: 'Community', count: COMMUNITY_PATTERN_COUNT }
]

function PatternNavigation({
  patterns,
  selectedPatternId,
  onSelect
}: {
  patterns: PatternDefinition[]
  selectedPatternId: PatternId | undefined
  onSelect: (id: PatternId) => void
}) {
  const groups: Array<PatternDefinition['group']> = ['Core', 'Community']
  return (
    <nav aria-label='Carbon pattern catalog' className='space-y-5'>
      {groups.map((group) => {
        const groupPatterns = patterns.filter((pattern) => pattern.group === group)
        if (!groupPatterns.length) return null
        return (
          <section key={group} className='space-y-2' aria-labelledby={`pattern-group-${group.toLowerCase()}`}>
            <h3 id={`pattern-group-${group.toLowerCase()}`} className='text-lg font-medium text-(--foreground)'>
              {group} patterns
            </h3>
            <div className='grid gap-1'>
              {groupPatterns.map((pattern) => (
                <Button
                  key={pattern.id}
                  type='button'
                  variant={pattern.id === selectedPatternId ? 'secondary' : 'ghost'}
                  className='h-auto min-h-10 w-full justify-between gap-3 whitespace-normal px-3 py-2 text-left'
                  aria-pressed={pattern.id === selectedPatternId}
                  onClick={() => onSelect(pattern.id)}
                >
                  <span className='min-w-0'>{pattern.title}</span>
                  {pattern.sourceStatus !== 'Universal' && (
                    <Badge
                      count={group === 'Community' ? 'Community' : 'Local'}
                      status='outline'
                      className='rounded-(--radius)'
                    />
                  )}
                </Button>
              ))}
            </div>
          </section>
        )
      })}
    </nav>
  )
}

function SourceStatusBadge({ pattern }: { pattern: PatternDefinition }) {
  return <Badge count={pattern.sourceStatus} status='outline' className='rounded-(--radius)' />
}

export function PatternLibrary({ query, audience, onClearSearch }: PatternLibraryProps) {
  const [groupFilter, setGroupFilter] = useState<PatternGroupFilter>('All')
  const [selectedPatternId, setSelectedPatternId] = useState<PatternId>('common-actions')
  const [browseOpen, setBrowseOpen] = useState(false)
  const normalizedQuery = query.trim().toLowerCase()

  const visiblePatterns = useMemo(() => {
    const queryTerms = normalizedQuery.split(/[^a-z0-9]+/).filter(Boolean)
    return PATTERNS.filter((pattern) => {
      const matchesGroup = groupFilter === 'All' || pattern.group === groupFilter
      const searchableText = [
        pattern.title,
        pattern.group,
        pattern.sourceStatus,
        pattern.summary,
        pattern.whenToUse,
        ...pattern.designGuidance,
        ...pattern.implementationGuidance,
        ...pattern.components
      ]
        .join(' ')
        .toLowerCase()
      const searchableTerms = searchableText.split(/[^a-z0-9]+/).filter(Boolean)
      return matchesGroup && queryTerms.every((term) => searchableTerms.includes(term))
    })
  }, [groupFilter, normalizedQuery])

  const selectedPattern = visiblePatterns.find((pattern) => pattern.id === selectedPatternId) ?? visiblePatterns[0]
  const selectPattern = (id: PatternId) => {
    setSelectedPatternId(id)
    setBrowseOpen(false)
  }

  return (
    <main className='mx-auto w-full min-w-0 max-w-7xl space-y-8 px-6 py-10 sm:px-8'>
      <header className='space-y-3'>
        <p className='text-muted-foreground'>Carbon-informed · SkyTrack UI</p>
        <h1 className='h3'>Design patterns</h1>
        <p className='max-w-3xl text-muted-foreground'>
          Browse reusable workflow guidance from the local Carbon Design System reference. Each entry includes a source
          note, design guidance, a SkyTrack UI composition, and a local example.
        </p>
        <p className='text-muted-foreground'>
          {CORE_PATTERN_COUNT} core topics, including 14 marked universal and 3 additional local topics, plus{' '}
          {COMMUNITY_PATTERN_COUNT} community entries. Data Visualization and component reference pages are separate
          catalogs.
        </p>
      </header>

      <section className='space-y-4' aria-labelledby='pattern-catalog-title'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='space-y-1'>
            <h2 id='pattern-catalog-title' className='h4'>
              Pattern catalog
            </h2>
            <p className='text-muted-foreground'>
              Choose a pattern to read its guidance and explore concrete use cases.
            </p>
          </div>
          <div className='flex flex-wrap gap-2' aria-label='Filter patterns by source group'>
            {GROUP_FILTERS.map(({ label, count }) => (
              <Button
                key={label}
                type='button'
                size='sm'
                variant={groupFilter === label ? 'secondary' : 'outline'}
                aria-pressed={groupFilter === label}
                onClick={() => setGroupFilter(label)}
              >
                {label} <span className='text-muted-foreground'>{count}</span>
              </Button>
            ))}
          </div>
        </div>

        {query.trim() ? (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            Shared search: <span className='text-(--foreground)'>{query}</span> · {visiblePatterns.length} matching
            patterns
          </p>
        ) : (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {visiblePatterns.length} patterns shown
          </p>
        )}

        {!visiblePatterns.length ? (
          <section role='status' className='space-y-3 border-y border-border py-6'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium text-(--foreground)'>No patterns match</h3>
              <p className='text-muted-foreground'>Clear the shared search or choose another source group.</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button type='button' variant='outline' onClick={onClearSearch}>
                Clear search
              </Button>
              <Button type='button' variant='ghost' onClick={() => setGroupFilter('All')}>
                Show all groups
              </Button>
            </div>
          </section>
        ) : (
          <div className='grid min-w-0 gap-6 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]'>
            <aside className='min-w-0 rounded-(--radius) border border-border p-4'>
              <div className='xl:hidden'>
                <Collapsible open={browseOpen} onOpenChange={setBrowseOpen}>
                  <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 rounded-(--radius) border border-border px-3 py-2 text-left'>
                    {selectedPattern?.title ?? 'Browse patterns'} <span>{browseOpen ? 'Hide' : 'Browse'}</span>
                  </CollapsibleTrigger>
                  <CollapsiblePanel>
                    <div className='mt-4 max-h-[60vh] overflow-auto'>
                      <PatternNavigation
                        patterns={visiblePatterns}
                        selectedPatternId={selectedPattern?.id}
                        onSelect={selectPattern}
                      />
                    </div>
                  </CollapsiblePanel>
                </Collapsible>
              </div>
              <div className='hidden max-h-[72vh] overflow-auto pe-1 xl:block'>
                <PatternNavigation
                  patterns={visiblePatterns}
                  selectedPatternId={selectedPattern?.id}
                  onSelect={selectPattern}
                />
              </div>
            </aside>

            {selectedPattern ? (
              <article className='min-w-0 space-y-8' aria-labelledby='selected-pattern-title'>
                <header className='space-y-3'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <h2 id='selected-pattern-title' className='h4'>
                      {selectedPattern.title}
                    </h2>
                    <SourceStatusBadge pattern={selectedPattern} />
                  </div>
                  <p className='max-w-3xl text-muted-foreground'>{selectedPattern.summary}</p>
                  {selectedPattern.sourceNote && <p className='text-muted-foreground'>{selectedPattern.sourceNote}</p>}
                </header>

                <div className='grid min-w-0 gap-8 lg:grid-cols-2'>
                  <section className='min-w-0 space-y-3' aria-labelledby='pattern-when-title'>
                    <h3 id='pattern-when-title' className='text-lg font-medium text-(--foreground)'>
                      When to use
                    </h3>
                    <p className='text-muted-foreground'>{selectedPattern.whenToUse}</p>
                  </section>
                  <section className='min-w-0 space-y-3' aria-labelledby='pattern-guidance-title'>
                    <h3 id='pattern-guidance-title' className='text-lg font-medium text-(--foreground)'>
                      {audience === 'designer' ? 'Design guidance' : 'SkyTrack UI composition'}
                    </h3>
                    <ul className='list-disc space-y-2 ps-5'>
                      {(audience === 'designer'
                        ? selectedPattern.designGuidance
                        : selectedPattern.implementationGuidance
                      ).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {audience === 'developer' && (
                      <p className='text-muted-foreground'>Compose with: {selectedPattern.components.join(' · ')}</p>
                    )}
                  </section>
                </div>

                <section className='min-w-0 space-y-3' aria-labelledby='pattern-source-title'>
                  <h3 id='pattern-source-title' className='text-lg font-medium text-(--foreground)'>
                    Source and availability
                  </h3>
                  <div className='space-y-2 text-muted-foreground'>
                    <p>
                      Catalog group: {selectedPattern.group} · source status: {selectedPattern.sourceStatus}.
                    </p>
                    <p className='break-all'>
                      Local Carbon reference: <code>{selectedPattern.sourcePath}</code>
                    </p>
                  </div>
                </section>

                <section className='min-w-0 space-y-4' aria-labelledby='pattern-demo-title'>
                  <div className='space-y-2'>
                    <h3 id='pattern-demo-title' className='text-lg font-medium text-(--foreground)'>
                      Examples and use cases
                    </h3>
                    <p className='text-muted-foreground'>
                      Scenarios, values, and outcomes are illustrative. Controls use local demo state; no product data,
                      operational guidance, credentials, files, or external service are connected.
                    </p>
                  </div>
                  <div className='min-w-0 rounded-(--radius) border border-border bg-card p-4 sm:p-6'>
                    <PatternDemo patternId={selectedPattern.id} />
                  </div>
                </section>
              </article>
            ) : null}
          </div>
        )}
      </section>
    </main>
  )
}
