import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XIcon,
  PaletteIcon,
  CodeIcon
} from '@phosphor-icons/react'
import { VariantBlock } from './demo'
import { ShowcaseBrandLink } from './brand-link'
import { Sheet } from './sheet'
import { OverviewStyle } from './overview-style'
import { OverviewDashboard } from './overview-dashboard'
import { PatternLibrary } from './pattern-library'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import skytrackLogo from '../../public/skytrack-logo-full.svg?raw'
import {
  GROUP_ORDER,
  demos,
  demosMap,
  View,
  Audience,
  SHOWCASE_PANELS,
  ShowcasePanel,
  readComponentFromUrl,
  readViewFromUrl,
  readShowcasePanelFromUrl,
  hasLegacyView
} from './app/registry'
import { ThumbnailPreview } from './app/thumbnails'
import { resetDocumentScroll } from '@/lib/reset-document-scroll'
import { ViewSwitcher } from './app/view-switcher'
import { SearchTrigger } from './app/search-trigger'

export function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('skytrack-ui-theme') === 'dark')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>(readViewFromUrl)
  const [componentId, setComponentId] = useState<string | null>(readComponentFromUrl)
  const [showcasePanel, setShowcasePanel] = useState<ShowcasePanel>(readShowcasePanelFromUrl)
  const [audience, setAudience] = useState<Audience>('designer')
  const [commandOpen, setCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')

  const navigateToView = (nextView: View) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', nextView)
    url.searchParams.delete('component')
    if (nextView === 'showcase') url.searchParams.set('panel', showcasePanel)
    else url.searchParams.delete('panel')
    window.history.pushState({ view: nextView }, '', url)
    setView(nextView)
    setComponentId(null)
  }

  /** Switches the showcase shown by the merged route. */
  const selectShowcasePanel = (panel: ShowcasePanel) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'showcase')
    url.searchParams.delete('component')
    url.searchParams.set('panel', panel)
    window.history.pushState({ view: 'showcase', panel }, '', url)
    setView('showcase')
    setComponentId(null)
    setShowcasePanel(panel)
  }

  const navigateToComponent = (id: string | null) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'components')
    url.searchParams.delete('panel')
    if (id && demosMap[id]) url.searchParams.set('component', id)
    else url.searchParams.delete('component')
    window.history.pushState({ view: 'components', component: id }, '', url)
    setView('components')
    setComponentId(id && demosMap[id] ? id : null)
  }

  useEffect(() => {
    const syncViewFromUrl = () => {
      setView(readViewFromUrl())
      setComponentId(readComponentFromUrl())
      setShowcasePanel(readShowcasePanelFromUrl())
    }
    window.addEventListener('popstate', syncViewFromUrl)
    return () => window.removeEventListener('popstate', syncViewFromUrl)
  }, [])

  // The two former routes now resolve to the merged `showcase` route; rewrite the address bar
  // so only one route stays in the history.
  useEffect(() => {
    if (!hasLegacyView()) return
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'showcase')
    url.searchParams.set('panel', readShowcasePanelFromUrl())
    window.history.replaceState({ view: 'showcase' }, '', url)
  }, [])

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      setCommandQuery('')
      setCommandOpen(true)
    }
    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [])

  /**
   * Opens the component search dialog. The header keeps the inline filter field from `sm` up;
   * below it there is no room for a usable field, so a search button opens the same dialog as
   * the keyboard shortcut.
   */
  const openSearchDialog = () => {
    setCommandQuery('')
    setCommandOpen(true)
  }

  useEffect(() => {
    // The showcase route keeps the old per-showcase markers so the shipped CSS selectors
    // (`style-overview`) still match the right page.
    document.body.dataset.showcaseView =
      view === 'showcase' ? (showcasePanel === 'overview' ? 'style-overview' : 'dashboard') : view
    return () => {
      delete document.body.dataset.showcaseView
    }
  }, [view, showcasePanel])

  useLayoutEffect(resetDocumentScroll, [view, componentId, showcasePanel])

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

  const renderViewContent = (selectedAudience: Audience) =>
    view === 'showcase' ? null : view === 'components' ? (
      componentId ? (
        (() => {
          const d = demosMap[componentId]
          const developerGuideline = guidelinesBySlug[d.id]
          const designerGuideline = designerGuidelinesBySlug[d.id]
          return (
            <div className='mx-auto max-w-7xl space-y-8 px-6 py-10 sm:px-8'>
              <Button variant='ghost' onClick={() => navigateToComponent(null)}>
                <ArrowLeftIcon /> All components
              </Button>
              <header className='space-y-2'>
                <h1 className='h1'>{d.title}</h1>
                <p className='text-muted-foreground'>
                  {selectedAudience === 'designer' ? (designerGuideline?.description ?? d.description) : d.description}
                </p>
              </header>
              {selectedAudience === 'designer' && designerGuideline ? (
                <DesignerGuidelineSheet
                  guideline={designerGuideline}
                  demo={d}
                  allDemos={demosMap}
                  practices={designerPracticesBySlug[d.id]}
                />
              ) : developerGuideline ? (
                <ComponentGuidelineSheet guideline={developerGuideline} demo={d} allDemos={demosMap} />
              ) : (
                <div className='grid gap-4'>
                  {d.variants.map((v) => (
                    <VariantBlock key={v.name} name={v.name}>
                      {v.render()}
                    </VariantBlock>
                  ))}
                </div>
              )}
            </div>
          )
        })()
      ) : (
        <div className='mx-auto max-w-[1600px] space-y-16 px-6 sm:px-8 py-10'>
          <h1 className='h1'>All components</h1>
          {GROUP_ORDER.map((group) => {
            const items = filtered.filter((d) => d.group === group)
            return items.length ? (
              <section key={group} className='space-y-4'>
                <div className='h3'>{group}</div>
                <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
                  {items.map((d) => (
                    <div
                      key={d.id}
                      role='link'
                      tabIndex={0}
                      onClick={() => navigateToComponent(d.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          navigateToComponent(d.id)
                        }
                      }}
                      className='overflow-hidden rounded-(--radius) border border-border bg-card text-left hover:border-primary/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary'
                    >
                      <div
                        className={`showcase-thumbnail thumbnail-${d.id} flex h-64 items-center justify-center overflow-hidden bg-muted/30 p-6`}
                      >
                        <div
                          className={`pointer-events-none flex w-full items-center justify-center ${
                            d.id === 'radio-group' || d.id === 'switch' ? '[&>*]:!w-fit' : ''
                          }`}
                        >
                          <ThumbnailPreview demo={d} />
                        </div>
                      </div>
                      <div className='flex items-center justify-between gap-3 border-t border-border p-4'>
                        <span className='font-medium'>{d.title}</span>
                        <Badge
                          size='sm'
                          count={
                            guidelinesBySlug[d.id] || designerGuidelinesBySlug[d.id] ? 'Guidelines' : 'No guidelines'
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null
          })}
        </div>
      )
    ) : view === 'pattern' ? (
      <PatternLibrary query={query} audience={selectedAudience} onClearSearch={() => setQuery('')} />
    ) : (
      <div className='mx-auto max-w-7xl px-8 py-10'>
        <Sheet />
      </div>
    )

  const renderShowcasePanel = (panel: ShowcasePanel) => (
    <div className='mx-auto max-w-7xl px-8 py-10'>
      {panel === 'overview' ? <OverviewStyle /> : <OverviewDashboard />}
    </div>
  )

  return (
    <SidebarProvider className='min-h-screen w-full bg-background'>
      {view === 'components' && (
        <Sidebar className='md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0'>
          <SidebarHeader className='gap-0 p-0'>
            <div className='flex h-14 items-center gap-2 border-b border-sidebar-border px-5'>
              <ShowcaseBrandLink logo={skytrackLogo} />
              <div className='relative flex items-center justify-centerh-5'>
                <Badge count='ui' status='outline' className='text-sm font-semibold border-primary shrink-0' />
                <div className='absolute h-2 w-2 bg-background border-primary border top-0 right-0 translate-x-1/2 -translate-y-1/2' />
                <div className='absolute h-2 w-2 bg-background border-primary border top-0 left-0 -translate-x-1/2 -translate-y-1/2' />
                <div className='absolute h-2 w-2 bg-background border-primary border bottom-0 right-0 translate-x-1/2 translate-y-1/2' />
                <div className='absolute h-2 w-2 bg-background border-primary border bottom-0 left-0 -translate-x-1/2 translate-y-1/2' />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className='gap-0 p-3 text-sm'>
            <SidebarGroup className='mb-4 gap-0 p-0'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={!componentId} onClick={() => navigateToComponent(null)}>
                    All components
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
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
                          <SidebarMenuButton isActive={componentId === d.id} onClick={() => navigateToComponent(d.id)}>
                            <span className='min-w-0 truncate'>{d.title}</span>
                            {/* <span className='ml-auto shrink-0 text-xs text-muted-foreground'>{d.variants.length}</span> */}
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
        value={view === 'showcase' ? showcasePanel : audience}
        onValueChange={(value) => {
          if (value === 'overview' || value === 'dashboard') selectShowcasePanel(value)
          else setAudience(value as Audience)
        }}
        className='w-full min-w-0 flex-1 gap-0'
      >
        <header className='w-full sticky top-0 z-1 flex h-14 items-center gap-1 border-b border-border bg-background/90 px-3 backdrop-blur sm:gap-4 md:z-40'>
          {view === 'components' && <SidebarTrigger />}
          <ViewSwitcher view={view} onSelect={navigateToView} />
          {view === 'components' && (
            <>
              <Input
                startAdornment={<MagnifyingGlassIcon />}
                endAdornment={
                  <>
                    <Badge size='sm' count='⌘ K' className='hidden rounded-(--radius) sm:inline-flex' />
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
                className='hidden w-full min-w-0 sm:flex sm:max-w-60'
              />
              <SearchTrigger onOpen={openSearchDialog} />
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
            </>
          )}
          {view === 'showcase' && (
            <div className='flex flex-row items-center gap-2'>
              <div className='hidden text-xs text-muted-foreground sm:block'>Show:</div>
              <TabsList variant='filled' width='hug' aria-label='Showcase view' className='shrink-0'>
                {SHOWCASE_PANELS.map(([panel, index, label]) => (
                  <TooltipProvider key={panel}>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <TabsTab value={panel} aria-label={`${index} ${label}`} className='font-mono'>
                            {index}
                          </TabsTab>
                        }
                      />
                      <TooltipPortal>
                        <TooltipPositioner sideOffset={8}>
                          <TooltipPopup>
                            {label}
                            <TooltipArrow />
                          </TooltipPopup>
                        </TooltipPositioner>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </TabsList>
            </div>
          )}
          <Button onClick={() => setDark((d) => !d)} aria-label='Toggle theme' size='icon' variant='outline'>
            {dark ? <SunIcon className='size-4' /> : <MoonIcon className='size-4' />}
          </Button>
        </header>
        <main className='min-w-0 flex-1'>
          <TabsPanel value='designer' className='min-w-0 outline-none'>
            {renderViewContent('designer')}
          </TabsPanel>
          <TabsPanel value='developer' className='min-w-0 outline-none'>
            {renderViewContent('developer')}
          </TabsPanel>
          <TabsPanel value='overview' className='min-w-0 outline-none bg-muted'>
            {renderShowcasePanel('overview')}
          </TabsPanel>
          <TabsPanel value='dashboard' className='min-w-0 outline-none'>
            {renderShowcasePanel('dashboard')}
          </TabsPanel>
        </main>
      </Tabs>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput value={commandQuery} onValueChange={setCommandQuery} placeholder='Search components...' />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          {GROUP_ORDER.map((group) => {
            const items = demos.filter(
              (demo) =>
                demo.group === group &&
                `${demo.title} ${demo.id} ${demo.description}`.toLowerCase().includes(commandQuery.toLowerCase())
            )
            if (!items.length) return null
            return (
              <CommandGroup key={group} heading={group}>
                {items.map((demo) => (
                  <CommandItem
                    key={demo.id}
                    value={`${demo.title} ${demo.id}`}
                    onSelect={() => {
                      setQuery('')
                      setCommandOpen(false)
                      navigateToComponent(demo.id)
                    }}
                  >
                    {demo.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  )
}
