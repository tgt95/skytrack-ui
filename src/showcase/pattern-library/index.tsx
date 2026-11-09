import { useMemo, useState } from 'react'
import 'skytrack-ui/styles.css'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import {
  CORE_PATTERN_COUNT,
  COMMUNITY_PATTERN_COUNT,
  PATTERNS,
  type PatternDefinition,
  type PatternId
} from './catalog'
import { PatternDemo } from './demos'
import { PatternSourceContent } from './content-renderer'
import { PATTERN_PAGE_CONTENT, type ContentBlock, type PatternPageDraft, type SectionNode } from './page-content'

type Audience = 'designer' | 'developer'
type PatternGroupFilter = 'All' | 'Core' | 'Community'

type PatternLibraryProps = {
  query: string
  audience: Audience
  onClearSearch: () => void
}

function blockSearchText(block: ContentBlock): string {
  switch (block.type) {
    case 'prose':
      return block.text
    case 'list':
      return block.items.join(' ')
    case 'table':
      return [...block.columns, ...block.rows.flat()].join(' ')
    case 'variants':
      return block.items
        .flatMap((item) => [item.title, item.whenToUse, item.whenNotToUse, ...(item.body ?? [])])
        .join(' ')
    case 'callout':
      return block.text
    case 'media-ref':
      return `${block.label} ${block.altIntent ?? ''}`
    case 'related':
      return block.items.map((item) => item.label).join(' ')
  }
}

function sectionSearchText(sections: SectionNode[]): string {
  return sections
    .flatMap((section) => [
      section.heading,
      ...section.blocks.map(blockSearchText),
      sectionSearchText(section.children ?? [])
    ])
    .join(' ')
}

function pageSearchText(page: PatternPageDraft): string {
  return [
    page.title,
    page.summary,
    sectionSearchText(page.sections),
    ...page.demos.flatMap((demo) => [
      demo.title,
      demo.scenario,
      demo.teaching.meaning,
      demo.teaching.decision,
      demo.teaching.consider
    ]),
    ...(page.notes ?? []).filter((note) => note.kind !== 'implementation').map((note) => note.text)
  ].join(' ')
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
    <nav aria-label='Pattern catalog navigation' className='space-y-5'>
      {groups.map((group) => {
        const groupPatterns = patterns.filter((pattern) => pattern.group === group)
        if (!groupPatterns.length) return null
        return (
          <section key={group} className='space-y-2' aria-labelledby={`pattern-group-${group.toLowerCase()}`}>
            <div id={`pattern-group-${group.toLowerCase()}`} className='text-xs sub-heading px-3'>
              {group} patterns
            </div>
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
      const pageContent = PATTERN_PAGE_CONTENT[pattern.id]
      const searchableText = [
        pattern.title,
        pattern.group,
        pattern.sourceStatus,
        pageContent ? pageSearchText(pageContent) : pattern.summary,
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
    <div className='mx-auto w-full min-w-0 max-w-7xl space-y-8 px-6 py-10 sm:px-8'>
      <header className='space-y-3'>
        <h1 className='h1'>Design patterns</h1>
        <p className='max-w-3xl text-muted-foreground'>
          Each pattern explains the user need, the decision the team must make, and the result in a concrete example.
          Use the guidance to choose a fitting approach; demo controls update sample state only.
        </p>
      </header>

      <Tabs
        value={groupFilter}
        onValueChange={(value) => value && setGroupFilter(value as PatternGroupFilter)}
        className='min-w-0'
      >
        <div className='grid min-w-0 gap-6 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]'>
          <div className='min-w-0 xl:sticky xl:top-18 xl:h-[calc(100dvh-6rem)] xl:min-h-0 xl:self-start'>
            <aside className='min-w-0 overflow-hidden rounded-(--radius) border border-border p-4 xl:flex xl:h-full xl:min-h-0 xl:flex-1 xl:flex-col'>
              <TabsList
                variant='filled'
                aria-label='Filter patterns by source group'
                width='hug'
                className='w-full shrink-0 mb-6'
              >
                {GROUP_FILTERS.map(({ label, count }) => (
                  <TabsTab key={label} value={label} className=''>
                    {label} ({count})
                  </TabsTab>
                ))}
              </TabsList>
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
              <div className='hidden min-h-0 xl:block xl:h-full xl:flex-1 xl:overflow-y-auto xl:pe-1'>
                <PatternNavigation
                  patterns={visiblePatterns}
                  selectedPatternId={selectedPattern?.id}
                  onSelect={selectPattern}
                />
              </div>
            </aside>
          </div>

          <div className='min-w-0'>
            {GROUP_FILTERS.map(({ label }) => (
              <TabsPanel key={label} value={label} className='min-w-0 space-y-4 outline-none'>
                {groupFilter === label && (
                  <>
                    {query.trim() ? (
                      <p role='status' aria-live='polite' className='text-muted-foreground'>
                        Shared search: <span className='text-(--foreground)'>{query}</span> · {visiblePatterns.length}{' '}
                        matching patterns
                      </p>
                    ) : null}
                    {!visiblePatterns.length ? (
                      <section role='status' className='space-y-3 border-y border-border py-6'>
                        <div className='space-y-1'>
                          <h3 className='h5 text-foreground'>No patterns match</h3>
                          <p className='text-muted-foreground'>
                            Clear the shared search or choose another source group.
                          </p>
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
                    ) : selectedPattern ? (
                      <article className='min-w-0 space-y-8' aria-labelledby='selected-pattern-title'>
                        <header className='space-y-3'>
                          <div className='flex flex-wrap items-center gap-3'>
                            <h2 id='selected-pattern-title' className='h3'>
                              {selectedPattern.title}
                            </h2>
                            <SourceStatusBadge pattern={selectedPattern} />
                          </div>
                          <div className='max-w-3xl'>
                            <p className='text-muted-foreground'>{PATTERN_PAGE_CONTENT[selectedPattern.id].summary}</p>
                          </div>
                        </header>

                        <PatternSourceContent page={PATTERN_PAGE_CONTENT[selectedPattern.id]} />

                        {audience === 'developer' && (
                          <section className='min-w-0 space-y-3 border-y border-border py-5'>
                            <h3 className='h5 text-foreground'>SkyTrack UI implementation notes</h3>
                            <div className='min-w-0 space-y-2'>
                              <ul className='list-disc space-y-2 ps-5 text-muted-foreground'>
                                {selectedPattern.implementationGuidance.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                              <p className='text-muted-foreground'>
                                Compose with: {selectedPattern.components.join(' · ')}
                              </p>
                            </div>
                          </section>
                        )}

                        <PatternDemo patternId={selectedPattern.id} />
                      </article>
                    ) : null}
                  </>
                )}
              </TabsPanel>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
