import * as React from 'react'
import { CircleNotchIcon, MagnifyingGlassIcon, SmileyIcon } from '@phosphor-icons/react'
import {
  Autocomplete,
  AutocompleteArrow,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRow,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  useAutocompleteFilter,
  useAutocompleteFilteredItems
} from '@/components/ui/autocomplete'
import { Input } from '@/components/ui/input'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@/components/ui/scroll-area'
import type { DemoMeta } from '@/showcase/demo'

interface Tag {
  id: string
  value: string
}

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 't7', value: 'frontend' },
  { id: 't8', value: 'backend' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-collapsible', value: 'component: collapsible' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-field', value: 'component: field' },
  { id: 'c-input', value: 'component: input' },
  { id: 'c-menu', value: 'component: menu' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-slider', value: 'component: slider' },
  { id: 'c-switch', value: 'component: switch' },
  { id: 'c-tabs', value: 'component: tabs' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-toggle', value: 'component: toggle' },
  { id: 'c-tooltip', value: 'component: tooltip' }
]

/* ------------------------------------------------------------------ hero -- */

function TagAutocomplete() {
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Search tags</label>
      <Autocomplete items={tags}>
        <AutocompleteInput aria-label='Search tags' placeholder='e.g. feature' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
              <AutocompleteList>
                {(tag: Tag) => (
                  <AutocompleteItem key={tag.id} value={tag}>
                    {tag.value}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* ---------------------------------------------------------- async search -- */

interface Movie {
  id: string
  title: string
  year: number
}

const top100Movies: Movie[] = [
  { id: '1', title: 'The Shawshank Redemption', year: 1994 },
  { id: '2', title: 'The Godfather', year: 1972 },
  { id: '3', title: 'The Dark Knight', year: 2008 },
  { id: '8', title: 'Pulp Fiction', year: 1994 },
  { id: '11', title: 'Forrest Gump', year: 1994 },
  { id: '12', title: 'Inception', year: 2010 },
  { id: '14', title: 'The Matrix', year: 1999 },
  { id: '16', title: 'Interstellar', year: 2014 },
  { id: '17', title: 'Goodfellas', year: 1990 },
  { id: '20', title: 'Se7en', year: 1995 },
  { id: '34', title: 'Parasite', year: 2019 },
  { id: '40', title: 'The Prestige', year: 2006 },
  { id: '77', title: 'Good Will Hunting', year: 1997 },
  { id: '93', title: 'Amelie', year: 2001 },
  { id: '99', title: 'A Clockwork Orange', year: 1971 }
]

async function searchMovies(
  query: string,
  filter: (item: string, query: string) => boolean
): Promise<{ movies: Movie[]; error: string | null }> {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 400 + 150)
  })

  if (query === 'will_error') {
    return { movies: [], error: 'Failed to fetch movies. Please try again.' }
  }

  const movies = top100Movies.filter((movie) => filter(movie.title, query) || filter(movie.year.toString(), query))

  return { movies, error: null }
}

function AsyncAutocomplete() {
  const [searchValue, setSearchValue] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Movie[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const { contains } = useAutocompleteFilter()
  const abortControllerRef = React.useRef<AbortController | null>(null)

  let status: React.ReactNode = null
  if (isPending) {
    status = (
      <>
        <CircleNotchIcon className='size-3 animate-spin' />
        Searching…
      </>
    )
  } else if (error) {
    status = error
  } else if (searchValue === '') {
    status = null
  } else if (searchResults.length === 0) {
    status = `Movie or year "${searchValue}" does not exist in the Top 100 IMDb movies`
  } else {
    status = `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} found`
  }

  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Search movies by name or year</label>
      <Autocomplete
        items={searchResults}
        value={searchValue}
        onValueChange={(next: string) => {
          setSearchValue(next)

          const controller = new AbortController()
          abortControllerRef.current?.abort()
          abortControllerRef.current = controller

          if (next === '') {
            setSearchResults([])
            setError(null)
            return
          }

          startTransition(async () => {
            setError(null)
            const result = await searchMovies(next, contains)
            if (controller.signal.aborted) {
              return
            }
            startTransition(() => {
              setSearchResults(result.movies)
              setError(result.error)
            })
          })
        }}
        itemToStringValue={(item: Movie) => item.title}
        filter={null}
      >
        <AutocompleteInput aria-label='Search movies by name or year' placeholder='e.g. Pulp Fiction or 1994' />
        <AutocompletePortal hidden={!status}>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup aria-busy={isPending || undefined}>
              <AutocompleteStatus>
                {status ? (
                  <div className='flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground'>{status}</div>
                ) : null}
              </AutocompleteStatus>
              <AutocompleteList>
                {(movie: Movie) => (
                  <AutocompleteItem key={movie.id} value={movie} className='flex-col items-start gap-1'>
                    <span className='font-medium leading-none'>{movie.title}</span>
                    <span className='text-sm leading-none text-muted-foreground'>{movie.year}</span>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* ------------------------------------------------------- inline autocomplete -- */

function InlineAutocomplete() {
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Search tags</label>
      <Autocomplete items={tags} mode='both'>
        <AutocompleteInput aria-label='Search tags' placeholder='e.g. feature' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4} className='data-[empty]:hidden'>
            <AutocompletePopup>
              <AutocompleteList>
                {(tag: Tag) => (
                  <AutocompleteItem key={tag.id} value={tag}>
                    {tag.value}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* ---------------------------------------------------------------- grouped -- */

interface GroupedTag {
  id: string
  label: string
  group: 'Type' | 'Component'
}

interface TagGroup {
  [key: string]: unknown
  value: string
  items: GroupedTag[]
}

const groupedTags: TagGroup[] = (['Type', 'Component'] as const).map((value) => ({
  value,
  items: tags.map((tag) => ({
    id: tag.id,
    label: tag.value,
    group: value
  }))
}))

function GroupedAutocomplete() {
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Select a tag</label>
      <Autocomplete items={groupedTags}>
        <AutocompleteInput aria-label='Select a tag' placeholder='e.g. feature' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
              <AutocompleteList>
                {(group: TagGroup) => (
                  <AutocompleteGroup key={group.value} items={group.items}>
                    <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                    <AutocompleteCollection>
                      {(tag: GroupedTag) => (
                        <AutocompleteItem key={tag.id} value={tag}>
                          {tag.label}
                        </AutocompleteItem>
                      )}
                    </AutocompleteCollection>
                  </AutocompleteGroup>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* -------------------------------------------------------- fuzzy matching -- */

interface FuzzyItem {
  title: string
  description: string
  category: string
}

const fuzzyItems: FuzzyItem[] = [
  {
    title: 'React Hooks Guide',
    description: 'Learn how to use React Hooks like useState, useEffect, and custom hooks',
    category: 'React'
  },
  {
    title: 'JavaScript Array Methods',
    description: 'Master array methods like map, filter, reduce, and forEach',
    category: 'JavaScript'
  },
  {
    title: 'CSS Flexbox Layout',
    description: 'Complete guide to CSS Flexbox for responsive web design',
    category: 'CSS'
  },
  {
    title: 'TypeScript Interfaces',
    description: 'Understanding TypeScript interfaces and type definitions',
    category: 'TypeScript'
  },
  {
    title: 'React Performance Optimization',
    description: 'Tips and techniques for optimizing React application performance',
    category: 'React'
  },
  {
    title: 'Node.js Express Server',
    description: 'Building RESTful APIs with Node.js and the Express framework',
    category: 'Node.js'
  },
  {
    title: 'Vue Composition API',
    description: 'Modern Vue.js development using the Composition API',
    category: 'Vue.js'
  },
  {
    title: 'CSS Grid Layout',
    description: 'Advanced CSS Grid techniques for complex layouts',
    category: 'CSS'
  },
  {
    title: 'React Testing Library',
    description: 'Testing React components with React Testing Library',
    category: 'React'
  },
  {
    title: 'Webpack Configuration',
    description: 'Optimizing webpack configuration for production builds',
    category: 'Build Tools'
  }
]

/**
 * Subsequence match, replacing the `match-sorter` dependency from the docs
 * example: every query character must appear in order, with a bonus for
 * consecutive characters and word starts.
 */
function fuzzyScore(item: FuzzyItem, query: string): number {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) {
    return 1
  }

  const fields = [item.title, item.description, item.category]
  let best = 0

  for (const field of fields) {
    const haystack = field.toLowerCase()
    let cursor = 0
    let score = 0
    let previous = -1

    for (const char of trimmed) {
      const index = haystack.indexOf(char, cursor)
      if (index === -1) {
        score = 0
        break
      }
      score += 1
      if (previous !== -1 && index === previous + 1) {
        score += 3
      }
      if (index === 0 || haystack[index - 1] === ' ') {
        score += 2
      }
      previous = index
      cursor = index + 1
    }

    best = Math.max(best, score)
  }

  return best
}

function fuzzyFilter(item: FuzzyItem, query: string): boolean {
  return fuzzyScore(item, query) > 0
}

function highlightText(text: string, query: string): React.ReactNode {
  const trimmed = query.trim()
  if (!trimmed) {
    return text
  }

  const escaped = trimmed.slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')

  return text.split(regex).map((part, idx) =>
    regex.test(part) ? (
      <mark key={idx} className='bg-transparent font-medium text-primary'>
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function FuzzyAutocomplete() {
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Fuzzy search documentation</label>
      <Autocomplete items={fuzzyItems} filter={fuzzyFilter} itemToStringValue={(item: FuzzyItem) => item.title}>
        <AutocompleteInput aria-label='Fuzzy search documentation' placeholder='e.g. React' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>
                No results found for "<AutocompleteValue />"
              </AutocompleteEmpty>
              <AutocompleteList>
                {(item: FuzzyItem) => (
                  <AutocompleteItem key={item.title} value={item} className='flex-col items-start gap-1'>
                    <AutocompleteValue>
                      {(value) => (
                        <span className='flex w-full flex-col gap-1'>
                          <span className='flex-1 font-medium leading-none'>{highlightText(item.title, value)}</span>
                          <span className='text-sm leading-none text-muted-foreground'>
                            {highlightText(item.description, value)}
                          </span>
                        </span>
                      )}
                    </AutocompleteValue>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* ---------------------------------------------------------- limit results -- */

const LIMIT = 8

function LimitAutocomplete() {
  const [value, setValue] = React.useState('')
  const { contains } = useAutocompleteFilter({ sensitivity: 'base' })

  const totalMatches = React.useMemo(() => {
    const trimmed = value.trim()
    if (!trimmed) {
      return tags.length
    }
    return tags.filter((t) => contains(t.value, trimmed)).length
  }, [value, contains])

  const moreCount = Math.max(0, totalMatches - LIMIT)

  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Limit results to 8</label>
      <Autocomplete items={tags} value={value} onValueChange={setValue} limit={LIMIT}>
        <AutocompleteInput aria-label='Limit results to 8' placeholder='e.g. component' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup className='max-h-[min(22.5rem,var(--available-height))] overflow-y-auto py-1'>
              <AutocompleteEmpty>No results found for "{value}"</AutocompleteEmpty>
              <AutocompleteList className='max-h-none overflow-visible py-0'>
                {(tag: Tag) => (
                  <AutocompleteItem key={tag.id} value={tag}>
                    {tag.value}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
              <AutocompleteStatus>
                {moreCount > 0 ? (
                  <div className='px-2 py-2 text-sm text-muted-foreground'>
                    {`Hiding ${moreCount} results (type a more specific query to narrow results)`}
                  </div>
                ) : null}
              </AutocompleteStatus>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* --------------------------------------------------------- auto highlight -- */

function AutoHighlightAutocomplete() {
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Auto highlight on type</label>
      <Autocomplete items={tags} autoHighlight>
        <AutocompleteInput aria-label='Auto highlight on type' placeholder='e.g. feature' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
              <AutocompleteList>
                {(tag: Tag) => (
                  <AutocompleteItem key={tag.id} value={tag}>
                    {tag.value}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/* --------------------------------------------------------- command palette -- */

interface PaletteItem {
  value: string
  label: string
}

interface PaletteGroup {
  [key: string]: unknown
  value: string
  items: PaletteItem[]
}

const paletteGroups: PaletteGroup[] = [
  {
    value: 'Suggestions',
    items: [
      { value: 'linear', label: 'Linear' },
      { value: 'figma', label: 'Figma' },
      { value: 'slack', label: 'Slack' },
      { value: 'github', label: 'GitHub' },
      { value: 'notion', label: 'Notion' }
    ]
  },
  {
    value: 'Commands',
    items: [
      { value: 'clipboard-history', label: 'Clipboard History' },
      { value: 'create-snippet', label: 'Create Snippet' },
      { value: 'system-preferences', label: 'System Preferences' },
      { value: 'toggle-dark-mode', label: 'Toggle Dark Mode' },
      { value: 'new-window', label: 'New Window' },
      { value: 'search-docs', label: 'Search Documentation' }
    ]
  }
]

function CommandPalette() {
  const [lastAction, setLastAction] = React.useState<string | null>(null)

  return (
    <div className='flex w-full max-w-md flex-col gap-2'>
      <div className='flex w-80 max-w-full flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md'>
        <Autocomplete open inline items={paletteGroups} autoHighlight='always' keepHighlight>
          <AutocompleteInputGroup className='border-0 border-b border-border shadow-none'>
            <MagnifyingGlassIcon className='size-4 shrink-0 text-muted-foreground' aria-hidden />
            <AutocompleteInput
              context='group'
              aria-label='Search commands'
              placeholder='Search for apps and commands…'
            />
          </AutocompleteInputGroup>

          <ScrollArea className='max-h-72'>
            <ScrollAreaViewport className='max-h-72'>
              <ScrollAreaContent style={{ minWidth: '100%' }}>
                <AutocompleteEmpty className='min-h-32 flex items-center'>No results found.</AutocompleteEmpty>
                <AutocompleteList>
                  {(group: PaletteGroup) => (
                    <AutocompleteGroup key={group.value} items={group.items} className='not-last:mb-1'>
                      <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                      <AutocompleteCollection>
                        {(item: PaletteItem) => (
                          <AutocompleteItem
                            key={item.value}
                            value={item}
                            onClick={() => setLastAction(item.label)}
                            className='min-h-8 justify-between gap-2'
                          >
                            <span className='min-w-0 truncate'>{item.label}</span>
                            <span className='shrink-0 text-sm text-muted-foreground'>
                              {group.value === 'Suggestions' ? 'Application' : 'Command'}
                            </span>
                          </AutocompleteItem>
                        )}
                      </AutocompleteCollection>
                    </AutocompleteGroup>
                  )}
                </AutocompleteList>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar className='flex w-4 justify-center bg-muted'>
              <ScrollAreaThumb className='w-full bg-border' />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </Autocomplete>

        <div className='flex items-center justify-between border-t border-border px-3 py-2.5 text-xs text-muted-foreground'>
          <span>Last run</span>
          <span>{lastAction ?? 'Nothing yet'}</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ grid layout -- */

interface EmojiItem {
  emoji: string
  value: string
  name: string
}

interface EmojiGroup {
  [key: string]: unknown
  value: string
  label: string
  items: EmojiItem[]
}

const emojiGroups: EmojiGroup[] = [
  {
    label: 'Smileys & Emotion',
    value: 'Smileys & Emotion',
    items: [
      { emoji: '😀', name: 'grinning face' },
      { emoji: '😃', name: 'grinning face with big eyes' },
      { emoji: '😄', name: 'grinning face with smiling eyes' },
      { emoji: '😁', name: 'beaming face with smiling eyes' },
      { emoji: '😅', name: 'grinning face with sweat' },
      { emoji: '🤣', name: 'rolling on the floor laughing' },
      { emoji: '😂', name: 'face with tears of joy' },
      { emoji: '🙂', name: 'slightly smiling face' },
      { emoji: '😉', name: 'winking face' },
      { emoji: '😍', name: 'smiling face with heart-eyes' }
    ].map((item) => ({ ...item, value: item.name }))
  },
  {
    label: 'Animals & Nature',
    value: 'Animals & Nature',
    items: [
      { emoji: '🐶', name: 'dog face' },
      { emoji: '🐱', name: 'cat face' },
      { emoji: '🐰', name: 'rabbit face' },
      { emoji: '🦊', name: 'fox' },
      { emoji: '🐻', name: 'bear' },
      { emoji: '🐼', name: 'panda' },
      { emoji: '🦁', name: 'lion' },
      { emoji: '🐸', name: 'frog' },
      { emoji: '🐵', name: 'monkey face' },
      { emoji: '🦉', name: 'owl' }
    ].map((item) => ({ ...item, value: item.name }))
  },
  {
    label: 'Food & Drink',
    value: 'Food & Drink',
    items: [
      { emoji: '🍎', name: 'red apple' },
      { emoji: '🍌', name: 'banana' },
      { emoji: '🍓', name: 'strawberry' },
      { emoji: '🥑', name: 'avocado' },
      { emoji: '🥦', name: 'broccoli' },
      { emoji: '🍕', name: 'pizza' },
      { emoji: '🍣', name: 'sushi' },
      { emoji: '☕', name: 'hot beverage' },
      { emoji: '🥕', name: 'carrot' },
      { emoji: '🍫', name: 'chocolate bar' }
    ].map((item) => ({ ...item, value: item.name }))
  }
]

const EMOJI_COLUMNS = 5

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

function EmojiGrid() {
  const [textValue, setTextValue] = React.useState('')
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const textInputRef = React.useRef<HTMLInputElement | null>(null)

  function insertEmoji(value: string | null) {
    if (!value || !textInputRef.current) {
      return
    }
    const input = textInputRef.current
    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? input.value.length
    setTextValue((prev) => prev.slice(0, start) + value + prev.slice(end))
    setPickerOpen(false)
    input.focus()
    const caret = start + value.length
    input.setSelectionRange(caret, caret)
  }

  return (
    <div className='flex w-64 flex-col gap-1'>
      <div className='flex w-full'>
        <Input
          ref={textInputRef}
          aria-label='Message'
          placeholder='iMessage'
          value={textValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextValue(event.target.value)}
          className='-mr-px flex-1 rounded-none'
        />
        <Autocomplete
          items={emojiGroups}
          grid
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          onOpenChangeComplete={() => setSearchValue('')}
          value={searchValue}
          onValueChange={(value: string, details) => {
            if (details.reason !== 'item-press') {
              setSearchValue(value)
            }
          }}
        >
          <AutocompleteTrigger className='h-9 w-9 shrink-0 rounded-none border-l-0' aria-label='Choose emoji'>
            <SmileyIcon className='size-4' />
          </AutocompleteTrigger>
          <AutocompletePortal>
            <AutocompletePositioner side='bottom' align='end' sideOffset={4}>
              <AutocompletePopup aria-label='Select emoji' className='min-w-80'>
                <AutocompleteArrow className='absolute -top-2 right-6' />
                <AutocompleteInput className='rounded-none border-x-0 border-t-0' placeholder='Search emojis…' />
                <div className='border-t border-border'>
                  <AutocompleteEmpty>No emojis found</AutocompleteEmpty>
                  <AutocompleteList className='max-h-64'>
                    {(group: EmojiGroup) => (
                      <AutocompleteGroup key={group.value} items={group.items}>
                        <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
                        <div className='px-2 pb-1' role='presentation'>
                          {chunkArray(group.items, EMOJI_COLUMNS).map((row, rowIdx) => (
                            <AutocompleteRow key={rowIdx} className='grid grid-cols-5'>
                              {row.map((rowItem) => (
                                <AutocompleteItem
                                  key={rowItem.emoji}
                                  value={rowItem}
                                  onClick={() => insertEmoji(rowItem.emoji)}
                                  className='h-10 flex-col justify-center px-0.5 py-2'
                                >
                                  <span className='text-xl leading-none'>{rowItem.emoji}</span>
                                </AutocompleteItem>
                              ))}
                            </AutocompleteRow>
                          ))}
                        </div>
                      </AutocompleteGroup>
                    )}
                  </AutocompleteList>
                </div>
              </AutocompletePopup>
            </AutocompletePositioner>
          </AutocompletePortal>
        </Autocomplete>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ virtualized -- */

interface VirtualizedItem {
  id: string
  name: string
}

const virtualizedItems: VirtualizedItem[] = Array.from({ length: 10000 }, (_, index) => {
  const id = String(index + 1)
  return { id, name: `Item ${id.padStart(4, '0')}` }
})

const ROW_HEIGHT = 32
const OVERSCAN = 12

function VirtualizedAutocomplete() {
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label className='text-sm font-medium'>Search 10,000 items</label>
      <Autocomplete
        virtualized
        items={virtualizedItems}
        openOnInputClick
        itemToStringValue={(item: VirtualizedItem) => item.name}
      >
        <AutocompleteInput aria-label='Search 10,000 items' placeholder='e.g. Item 0042' />
        <AutocompleteClear aria-label='Clear' />
        <AutocompletePortal>
          <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>No items found.</AutocompleteEmpty>
              <AutocompleteList className='p-0'>
                <VirtualizedList />
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  )
}

/**
 * Fixed-height windowing over the filtered items, replacing the
 * `@tanstack/react-virtual` dependency used in the docs example.
 */
function VirtualizedList() {
  const filteredItems = useAutocompleteFilteredItems<VirtualizedItem>()
  const [scrollTop, setScrollTop] = React.useState(0)
  const [viewportHeight, setViewportHeight] = React.useState(288)

  const total = filteredItems.length
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
  const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT) + OVERSCAN * 2
  const endIndex = Math.min(total, startIndex + visibleCount)
  const window_ = filteredItems.slice(startIndex, endIndex)

  return (
    <div
      role='presentation'
      className='max-h-72 overflow-auto overscroll-contain scroll-py-1'
      onScroll={(event) => {
        setScrollTop(event.currentTarget.scrollTop)
        setViewportHeight(event.currentTarget.clientHeight || 288)
      }}
    >
      <div role='presentation' className='relative w-full' style={{ height: total * ROW_HEIGHT }}>
        {window_.map((item, offset) => {
          const index = startIndex + offset
          return (
            <AutocompleteItem
              key={item.id}
              index={index}
              value={item}
              aria-setsize={total}
              aria-posinset={index + 1}
              className='absolute left-0 w-full'
              style={{
                top: 0,
                height: ROW_HEIGHT,
                transform: `translateY(${index * ROW_HEIGHT}px)`
              }}
            >
              {item.name}
            </AutocompleteItem>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- export -- */

export const demo: DemoMeta = {
  id: 'autocomplete',
  title: 'Autocomplete',
  description: 'An input that suggests options as you type.',
  group: 'Forms',
  variants: [
    { name: 'Default', render: () => <TagAutocomplete /> },
    { name: 'Async search', render: () => <AsyncAutocomplete /> },
    { name: 'Inline autocomplete', render: () => <InlineAutocomplete /> },
    { name: 'Grouped', render: () => <GroupedAutocomplete /> },
    { name: 'Fuzzy matching', render: () => <FuzzyAutocomplete /> },
    { name: 'Limit results', render: () => <LimitAutocomplete /> },
    { name: 'Auto highlight', render: () => <AutoHighlightAutocomplete /> },
    { name: 'Command palette', render: () => <CommandPalette /> },
    { name: 'Grid layout', render: () => <EmojiGrid /> },
    { name: 'Virtualized', render: () => <VirtualizedAutocomplete /> }
  ]
}
