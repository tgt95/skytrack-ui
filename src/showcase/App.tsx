import { useEffect, useMemo, useState } from 'react'
import { MagnifyingGlassIcon, MoonIcon, SunIcon, XIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { VariantBlock, type DemoMeta } from './demo'
import { Sheet } from './sheet'
import { OverviewStyle } from './overview-style'
import { OverviewDashboard } from './overview-dashboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'

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
  'Layout'
]

const demos = Object.values(modules)
  .map((m) => m.demo)
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title))

export function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('skytrack-ui-theme') === 'dark')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'components' | 'sheet' | 'style' | 'dashboard'>('components')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('skytrack-ui-theme', dark ? 'dark' : 'light')
  }, [dark])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? demos.filter((d) => d.title.toLowerCase().includes(q)) : demos
  }, [query])

  const variantCount = demos.reduce((n, d) => n + d.variants.length, 0)

  return (
    <div className='flex min-h-screen'>
      {view === 'components' && (
        <aside className='sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex'>
          <div className='flex items-center gap-2 border-b border-sidebar-border px-5 h-14'>
            <a href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 81 81" fill="color-primary">
              <path d="M79.9482 20.5C79.9482 9.73024 71.2229 1 60.4609 1H20.4873C9.72532 1 1 9.73024 1 20.5V60.5C1 71.2698 9.72532 80 20.4873 80H60.4609C71.2229 80 79.9482 71.2698 79.9482 60.5V20.5ZM68.7998 64.5C68.7998 62.9636 68.2473 61.0441 67.3096 58.915C66.3761 56.7957 65.0806 54.5122 63.6387 52.2598C60.9202 48.0133 57.702 43.9139 55.4746 41.29C52.5414 44.9957 47.2413 50.412 41.2783 55.4541C45.3731 58.8249 49.7169 62.0153 53.792 64.3877C58.0389 66.86 61.921 68.4004 64.9004 68.4004C66.1563 68.4003 67.1189 68.0139 67.7666 67.3662C68.4142 66.7185 68.7998 65.7559 68.7998 64.5ZM26.5713 41C29.5224 44.655 34.6921 49.9065 40.5 54.8037C46.3079 49.9065 51.4776 44.655 54.4287 41H26.5713ZM40.5 26.1953C34.6919 31.0927 29.5224 36.345 26.5713 40H54.4287C51.4776 36.345 46.3081 31.0927 40.5 26.1953ZM12.2002 64.5C12.2002 65.7559 12.5858 66.7185 13.2334 67.3662C13.8811 68.0139 14.8437 68.4003 16.0996 68.4004C19.079 68.4004 22.9611 66.86 27.208 64.3877C31.2829 62.0155 35.6261 58.8247 39.7207 55.4541C33.7577 50.4119 28.4575 44.9956 25.5244 41.29C23.2971 43.9139 20.0796 48.0136 17.3613 52.2598C15.9194 54.5122 14.6239 56.7957 13.6904 58.915C12.7527 61.0441 12.2002 62.9636 12.2002 64.5ZM68.7998 16.5C68.7998 15.2441 68.4142 14.2815 67.7666 13.6338C67.1189 12.9861 66.1563 12.5997 64.9004 12.5996C61.921 12.5996 58.0389 14.1399 53.792 16.6123C49.7172 18.9845 45.3738 22.1745 41.2793 25.5449C47.242 30.5867 52.5413 36.0034 55.4746 39.709C57.7019 37.0851 60.9204 32.9864 63.6387 28.7402C65.0806 26.4879 66.3761 24.2042 67.3096 22.085C68.2473 19.9559 68.7998 18.0364 68.7998 16.5ZM80.9482 60.5C80.9482 71.8214 71.7758 81 60.4609 81H20.4873C9.17242 81 0 71.8214 0 60.5V20.5C0 9.17856 9.17242 0 20.4873 0H60.4609C71.7758 0 80.9482 9.17856 80.9482 20.5V60.5ZM12.2002 16.5C12.2002 18.0364 12.7527 19.9559 13.6904 22.085C14.6239 24.2042 15.9194 26.4879 17.3613 28.7402C20.0795 32.9861 23.2971 37.0851 25.5244 39.709C28.4575 36.0035 33.757 30.5868 39.7197 25.5449C35.6254 22.1746 31.2826 18.9844 27.208 16.6123C22.9611 14.1399 19.079 12.5996 16.0996 12.5996C14.8437 12.5997 13.8811 12.9861 13.2334 13.6338C12.5858 14.2815 12.2002 15.2441 12.2002 16.5ZM69.7998 16.5C69.7998 18.2435 69.1818 20.314 68.2246 22.4873C67.2631 24.6703 65.9394 27.0019 64.4814 29.2793C61.6832 33.6504 58.3672 37.8577 56.1152 40.499C58.3672 43.1403 61.6828 47.349 64.4814 51.7207C65.9392 53.9979 67.2632 56.3289 68.2246 58.5117C69.1819 60.6852 69.7998 62.7564 69.7998 64.5C69.7998 65.9638 69.3458 67.201 68.4736 68.0732C67.6014 68.9454 66.3642 69.4003 64.9004 69.4004C61.6398 69.4004 57.5611 67.7395 53.2881 65.252C49.1028 62.8154 44.6607 59.5415 40.5 56.1074C36.3393 59.5415 31.8972 62.8154 27.7119 65.252C23.4389 67.7395 19.3602 69.4004 16.0996 69.4004C14.6358 69.4003 13.3985 68.9454 12.5264 68.0732C11.6542 67.201 11.2002 65.9638 11.2002 64.5C11.2002 62.7564 11.8181 60.6852 12.7754 58.5117C13.7368 56.3289 15.0608 53.9979 16.5186 51.7207C19.317 47.3493 22.6319 43.1404 24.8838 40.499C22.6319 37.8576 19.3167 33.6501 16.5186 29.2793C15.0606 27.0019 13.7369 24.6703 12.7754 22.4873C11.8182 20.314 11.2002 18.2435 11.2002 16.5C11.2002 15.0362 11.6543 13.799 12.5264 12.9268C13.3985 12.0546 14.6358 11.5997 16.0996 11.5996C19.3602 11.5996 23.4389 13.2605 27.7119 15.748C31.897 18.1845 36.3394 21.4576 40.5 24.8916C44.6606 21.4576 49.103 18.1845 53.2881 15.748C57.5611 13.2605 61.6398 11.5996 64.9004 11.5996C66.3642 11.5997 67.6014 12.0546 68.4736 12.9268C69.3457 13.799 69.7998 15.0362 69.7998 16.5Z" fill="currentColor" />
            </svg>
            </a>
            <div>
              <div className='text-sm font-semibold'>SkyTrack UI</div>
              <div className='text-xs text-muted-foreground'>
                {demos.length} components · {variantCount} variants
              </div>
            </div>
          </div>
          <div className='border-b border-sidebar-border p-3'>
            <Input
              startAdornment={<MagnifyingGlassIcon />}
              endAdornment={
                query !== '' && (
                  <Button size='icon-xs' variant='ghost' aria-label='Clear filter' onClick={() => setQuery('')}>
                    <XIcon />
                  </Button>
                )
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Filter components'
            />
          </div>
          <nav className='flex-1 overflow-y-auto p-3 text-sm'>
            {GROUP_ORDER.map((group) => {
              const items = filtered.filter((d) => d.group === group)
              if (!items.length) return null
              return (
                <div key={group} className='mb-4'>
                  <div className='px-2 pb-1 text-xs font-medium text-muted-foreground'>{group}</div>
                  {items.map((d) => (
                    <a
                      key={d.id}
                      href={`#${d.id}`}
                      className='flex items-center justify-between px-2 py-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    >
                      {d.title}
                      <span className='text-xs text-muted-foreground'>{d.variants.length}</span>
                    </a>
                  ))}
                </div>
              )
            })}
          </nav>
        </aside>
      )}

      <main className='min-w-0 flex-1'>
        <header className='sticky top-0 flex h-14 items-center gap-4 border-b border-border bg-background/90 px-3 backdrop-blur z-1'>
          {/* <nav className='flex items-center gap-1 text-sm w-full' aria-label='Showcase views'> */}
          <ToggleGroup
            className='w-full min-w-0 gap-1 overflow-x-auto border-none'
            variant='default'
            aria-label='Showcase views'
            defaultValue={['components']}
          >
            {(
              [
                ['components', 'Components'],
                ['sheet', 'Sheet'],
                ['style', 'Style overview'],
                ['dashboard', 'Dashboard']
              ] as const
            ).map(([id, label]) => (
              <Toggle
                key={id}
                onClick={() => setView(id)}
                value={id}
                size='default'
                className='h-8 shrink-0 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm'
              >
                {label}
              </Toggle>
            ))}
          </ToggleGroup>
          <div className='hidden text-sm text-muted-foreground lg:block shrink-0'>
            Base UI · Tailwind CSS · Phosphor · IBM Plex Sans
          </div>
          <Button
            onClick={() => setDark((d) => !d)}
            aria-label='Toggle theme'
            size='icon'
            variant='outline'
          >
            {dark ? <SunIcon className='size-4' /> : <MoonIcon className='size-4' />}
          </Button>
        </header>

        {view === 'components' ? (
          <div className='mx-auto max-w-5xl space-y-16 px-8 py-10'>
            {filtered.length === 0 && <p className='text-sm text-muted-foreground'>No components match “{query}”.</p>}
            {filtered.map((d) => (
              <section key={d.id} id={d.id} className={cn('scroll-mt-20 space-y-4')}>
                <div>
                  <h2 className='text-2xl font-semibold tracking-tight'>{d.title}</h2>
                  <p className='text-sm text-muted-foreground'>{d.description}</p>
                </div>
                <div className='grid gap-4'>
                  {d.variants.map((v) => (
                    <VariantBlock key={v.name} name={v.name}>
                      {v.render()}
                    </VariantBlock>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className='mx-auto max-w-6xl px-8 py-10'>
            {view === 'sheet' ? <Sheet /> : view === 'style' ? <OverviewStyle /> : <OverviewDashboard />}
          </div>
        )}
      </main>
    </div>
  )
}
