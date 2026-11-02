import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlassIcon, MoonIcon, SunIcon, XIcon, PaletteIcon, CodeIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { VariantBlock, type DemoMeta } from './demo'
import { Sheet } from './sheet'
import { OverviewStyle } from './overview-style'
import { OverviewDashboard } from './overview-dashboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  ComponentGuidelineSheet,
  designerGuidelinesBySlug,
  designerPracticesBySlug,
  guidelinesBySlug
} from './component-guidelines'
import { DesignerGuidelineSheet } from './component-guidelines/designer-guideline-sheet'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import skytrackLogo from '../../public/skytrack-logo-full.svg?raw'

/**
 * Auto-registers every demo file. Members add `src/demos/<id>.demo.tsx`;
 * nobody edits this file to register a component.
 */
const modules = import.meta.glob<{ demo: DemoMeta }>('../demos/*.demo.tsx', { eager: true })

const GROUP_ORDER: DemoMeta['group'][] = [
  'Actions',
  'Forms',
  'Overlays',
  'Menus & Navigation',
  'Data Display',
  'Layout',
  'Patterns'
]

const rawDemos = Object.values(modules)
  .map((m) => m.demo)
  .filter(Boolean)

const datePickerDemo = rawDemos.find((d) => d.id === 'date-picker')
const hasCalendarDemo = rawDemos.some((d) => d.id === 'calendar')

const calendarDemo: DemoMeta | null =
  !hasCalendarDemo && datePickerDemo
    ? {
        id: 'calendar',
        title: 'Calendar',
        description: 'A standalone month-grid calendar for selecting dates.',
        group: 'Forms',
        variants: datePickerDemo.variants.filter((v) => v.name === 'CALENDAR')
      }
    : null

const demos: DemoMeta[] = (calendarDemo ? [...rawDemos, calendarDemo] : rawDemos).sort((a, b) =>
  a.title.localeCompare(b.title)
)

const demosMap = demos.reduce<Record<string, DemoMeta>>((acc, d) => {
  acc[d.id] = d
  return acc
}, {})

const VIEWS = [
  ['components', 'Components'],
  ['sheet', 'Sheet'],
  ['style-overview', 'Overview'],
  ['dashboard', 'Dashboard']
] as const

type View = (typeof VIEWS)[number][0]
type Audience = 'designer' | 'developer'

function readViewFromUrl(): View {
  const route = new URLSearchParams(window.location.search).get('view')
  return VIEWS.some(([id]) => id === route) ? (route as View) : 'components'
}

export function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('skytrack-ui-theme') === 'dark')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>(readViewFromUrl)
  const [audience, setAudience] = useState<Audience>('designer')
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false)
  const filterInputRef = useRef<HTMLInputElement>(null)

  const navigateToView = (nextView: View) => {
    if (nextView === view) return
    const url = new URL(window.location.href)
    url.searchParams.set('view', nextView)
    window.history.pushState({ view: nextView }, '', url)
    setView(nextView)
  }

  useEffect(() => {
    const syncViewFromUrl = () => setView(readViewFromUrl())
    window.addEventListener('popstate', syncViewFromUrl)
    return () => window.removeEventListener('popstate', syncViewFromUrl)
  }, [])

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      setShouldFocusSearch(true)
      if (view !== 'components') navigateToView('components')
      else filterInputRef.current?.focus()
    }

    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [view])

  useEffect(() => {
    if (!shouldFocusSearch || view !== 'components') return
    filterInputRef.current?.focus()
    filterInputRef.current?.select()
    setShouldFocusSearch(false)
  }, [shouldFocusSearch, view])

  useEffect(() => {
    document.body.dataset.showcaseView = view
    return () => {
      delete document.body.dataset.showcaseView
    }
  }, [view])

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    const targetId = decodeURIComponent(hash)
    document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
  }, [view])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('skytrack-ui-theme', dark ? 'dark' : 'light')
  }, [dark])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? demos.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.id.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        )
      : demos
  }, [query])

  const componentCount = demos.filter((d) => guidelinesBySlug[d.id]).length
  const patternCount = demos.length - componentCount
  const variantCount = demos.reduce((n, d) => n + d.variants.length, 0)

  const renderViewContent = (selectedAudience: Audience) =>
    view === 'components' ? (
      <div className='mx-auto max-w-7xl space-y-16 px-6 sm:px-8 py-10'>
        <h1 className='sr-only'>SkyTrack UI component showcase</h1>
        {filtered.length === 0 && <p className='text-sm text-muted-foreground'>No components match “{query}”.</p>}
        {filtered.map((d) => {
          const developerGuideline = guidelinesBySlug[d.id]
          const designerGuideline = designerGuidelinesBySlug[d.id]
          return (
            <section
              key={d.id}
              id={d.id}
              className={cn('scroll-mt-20 space-y-6 pb-12 border-b border-border/40 last:border-b-0')}
            >
              <div className='flex flex-col gap-2'>
                <h2 className='h2'>{d.title}</h2>
                <p className='text-base text-muted-foreground'>
                  {selectedAudience === 'designer' ? (designerGuideline?.description ?? d.description) : d.description}
                </p>
              </div>

              {selectedAudience === 'designer'
                ? designerGuideline && (
                    <DesignerGuidelineSheet
                      guideline={designerGuideline}
                      demo={d}
                      allDemos={demosMap}
                      practices={designerPracticesBySlug[d.id]}
                    />
                  )
                : developerGuideline && (
                    <ComponentGuidelineSheet guideline={developerGuideline} demo={d} allDemos={demosMap} />
                  )}

              {(selectedAudience === 'developer' || (!developerGuideline && !designerGuideline)) && (
                <div className='space-y-3 pt-2'>
                  <div className='text-xs font-semibold sub-heading uppercase tracking-wider text-muted-foreground'>
                    {developerGuideline ? 'All Demo Variants' : 'Pattern Specimens'}
                  </div>
                  <div className='grid gap-4'>
                    {d.variants.map((v) => (
                      <div key={v.name} className='min-w-0 max-w-full overflow-x-auto'>
                        <VariantBlock name={v.name}>{v.render()}</VariantBlock>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )
        })}
      </div>
    ) : (
      <div className='mx-auto max-w-7xl px-8 py-10'>
        {view === 'sheet' ? <Sheet /> : view === 'style-overview' ? <OverviewStyle /> : <OverviewDashboard />}
      </div>
    )

  return (
    <SidebarProvider className='min-h-screen w-full bg-background'>
      {view === 'components' && (
        <Sidebar className='md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0'>
          <SidebarHeader className='gap-0 p-0'>
            <div className='flex h-14 items-center gap-2 border-b border-sidebar-border px-5'>
              <a
                href='/'
                aria-hidden='true'
                className='block h-5 [&>svg]:block [&>svg]:h-full [&>svg]:w-full'
                dangerouslySetInnerHTML={{ __html: skytrackLogo }}
                aria-label={`${componentCount} components · ${patternCount} pattern · ${variantCount} variants`}
              />
              <Badge count='ui' status='outline'></Badge>
            </div>
          </SidebarHeader>
          <SidebarContent className='gap-0 p-3 text-sm'>
            {GROUP_ORDER.map((group) => {
              const items = filtered.filter((d) => d.group === group)
              if (!items.length) return null
              return (
                <SidebarGroup key={group} className='mb-6 gap-0 p-0 last:mb-0'>
                  <SidebarGroupLabel className='h-8 px-2 pb-1'>{group}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((d) => (
                        <SidebarMenuItem key={d.id}>
                          <SidebarMenuButton render={<a href={`#${d.id}`} />}>
                            <span className='min-w-0 truncate'>{d.title}</span>
                            <span className='ml-auto shrink-0 text-xs text-muted-foreground'>{d.variants.length}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )
            })}
          </SidebarContent>
        </Sidebar>
      )}

      <Tabs
        value={audience}
        onValueChange={(value) => setAudience(value as Audience)}
        className='w-full min-w-0 flex-1 gap-0'
      >
        <header className='w-full sticky top-0 z-1 flex h-14 items-center gap-1 border-b border-border bg-background/90 px-3 backdrop-blur sm:gap-4 md:z-40'>
          {view === 'components' && <SidebarTrigger />}
          <ToggleGroup
            className='w-18 shrink-0 gap-1 overflow-x-auto border-none sm:w-full sm:min-w-0 sm:flex-1'
            variant='default'
            aria-label='Showcase views'
            value={[view]}
          >
            {VIEWS.map(([id, label]) => (
              <Toggle key={id} onClick={() => navigateToView(id)} value={id}>
                {label}
              </Toggle>
            ))}
          </ToggleGroup>
          <Input
            ref={filterInputRef}
            startAdornment={<MagnifyingGlassIcon />}
            endAdornment={
              <>
                <Badge size='sm' count='⌘ K' />
                {query !== '' && (
                  <Button size='icon-xs' variant='ghost' aria-label='Clear filter' onClick={() => setQuery('')}>
                    <XIcon />
                  </Button>
                )}
              </>
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search components'
            className='w-full min-w-0 max-w-28 sm:max-w-60'
          />
          <Separator orientation='vertical' className='h-[calc(100%-var(--spacing)*8)]' />
          <div className='flex flex-row items-center gap-2'>
            <div className='hidden text-xs text-muted-foreground sm:block'>View as:</div>
            <TabsList variant='filled' width='hug' aria-label='Guidance audience' className='shrink-0'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <TabsTab
                        value='designer'
                        render={
                          <Button size='icon' variant='ghost'>
                            <PaletteIcon />
                          </Button>
                        }
                      />
                    }
                    aria-label='Designer'
                  />
                  <TooltipPortal>
                    <TooltipPositioner sideOffset={8}>
                      <TooltipPopup>
                        Designer
                        <TooltipArrow />
                      </TooltipPopup>
                    </TooltipPositioner>
                  </TooltipPortal>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <TabsTab
                        value='developer'
                        render={
                          <Button size='icon' variant='ghost'>
                            <CodeIcon />
                          </Button>
                        }
                      />
                    }
                    aria-label='Developer'
                  />
                  <TooltipPortal>
                    <TooltipPositioner sideOffset={8}>
                      <TooltipPopup>
                        Developer
                        <TooltipArrow />
                      </TooltipPopup>
                    </TooltipPositioner>
                  </TooltipPortal>
                </Tooltip>
              </TooltipProvider>
            </TabsList>
          </div>
          <Button onClick={() => setDark((d) => !d)} aria-label='Toggle theme' size='icon' variant='outline'>
            {dark ? <SunIcon className='size-4' /> : <MoonIcon className='size-4' />}
          </Button>
        </header>
        <TabsPanel value='designer' className={`min-w-0 outline-none ${view === 'style-overview' && 'bg-muted'}`}>
          {renderViewContent('designer')}
        </TabsPanel>
        <TabsPanel value='developer' className='min-w-0 outline-none'>
          {renderViewContent('developer')}
        </TabsPanel>
      </Tabs>
    </SidebarProvider>
  )
}
