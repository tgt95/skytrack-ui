import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ArrowClockwiseIcon, CheckIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import themeCss from '../index.css?raw'
import sharedTokensCss from '../styles/shared-tokens.css?raw'
import { cn } from '@/lib/utils'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChoiceButton, ChoiceGroup } from '@/components/ui/choice-button'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { focusRing } from '@/lib/focus-ring'
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { renderConfiguredSpecimen, renderStateSpecimen } from './sheet-specimens'
import { SPECS, type ComponentSpec } from './specs/component-specs'

/**
 * Sheet — a single reference page for the library: design tokens plus every
 * variant axis and size each component exposes. Values are read from the real
 * sources (index.css for tokens, the cva definitions for component props), so
 * the sheet stays honest when those sources change.
 */

/* ------------------------------------------------------------------ Tokens */

type Declarations = Record<string, string>

/** Reads `--name: value` declarations out of one selector block in index.css. */
function readBlock (source: string, selector: string): Declarations {
  const at = source.indexOf(`${selector} {`)
  if (at === -1) return {}
  const open = source.indexOf('{', at)
  const close = source.indexOf('}', open)
  const body = source.slice(open + 1, close).replace(/\/\*[\s\S]*?\*\//g, '')
  const out: Declarations = {}
  for (const chunk of body.split(';')) {
    const colon = chunk.indexOf(':')
    if (colon === -1) continue
    const name = chunk.slice(0, colon).trim()
    if (!name.startsWith('--')) continue
    out[name] = chunk
      .slice(colon + 1)
      .replace(/\s+/g, ' ')
      .trim()
  }
  return out
}

const LIGHT = { ...readBlock(sharedTokensCss, ':root'), ...readBlock(themeCss, ':root') }
const DARK = { ...readBlock(sharedTokensCss, '.dark'), ...readBlock(themeCss, '.dark') }
const THEME = readBlock(themeCss, '@theme inline')
const DARK_SURFACE = DARK['--background'] ?? 'oklch(0.145 0 0)'

const TOKEN_GROUPS: { id: string; title: string; description: string; tokens: string[] }[] = [
  {
    id: 'surfaces',
    title: 'Surfaces & structure',
    description: 'Page, card and overlay fills, plus the lines and focus ring that hold them together.',
    tokens: [
      '--background',
      '--card',
      '--popover',
      '--muted',
      '--secondary',
      '--accent',
      '--border',
      '--input',
      '--ring'
    ]
  },
  {
    id: 'text',
    title: 'Text',
    description: 'Foreground pairs. Use the pair that matches the surface behind the text.',
    tokens: [
      '--foreground',
      '--card-foreground',
      '--popover-foreground',
      '--muted-foreground',
      '--secondary-foreground',
      '--accent-foreground',
      '--primary-foreground'
    ]
  },
  {
    id: 'status',
    title: 'Semantic',
    description:
      'Primary is the brand accent. Destructive, success, warning and info carry status meaning; favourite is for starred state only.',
    tokens: ['--primary', '--destructive', '--success', '--warning', '--info', '--favorite']
  },
  {
    id: 'chart',
    title: 'Data visuallization',
    description: 'Categorical series colors for charts, with two shades each of blue, orange, teal, purple, and pink.',
    tokens: [
      '--chart-1',
      '--chart-2',
      '--chart-3',
      '--chart-4',
      '--chart-5',
      '--chart-6',
      '--chart-7',
      '--chart-8',
      '--chart-9',
      '--chart-10'
    ]
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    description: 'Separate surface set for navigation rails so app chrome does not borrow page colours.',
    tokens: [
      '--sidebar',
      '--sidebar-foreground',
      '--sidebar-primary',
      '--sidebar-primary-foreground',
      '--sidebar-accent',
      '--sidebar-accent-foreground',
      '--sidebar-border',
      '--sidebar-ring'
    ]
  }
]

const COLOR_TOKEN_COUNT = TOKEN_GROUPS.reduce((n, g) => n + g.tokens.length, 0)

const RADIUS_PREVIEW_PX = [2] as const

const TYPE_SCALE: { className: string; size: string; line: string }[] = [
  { className: 'text-xs', size: '12', line: '16' },
  { className: 'text-sm', size: '14', line: '20' },
  { className: 'text-base', size: '16', line: '24' },
  { className: 'text-lg', size: '18', line: '28' },
  { className: 'text-xl', size: '20', line: '28' },
  { className: 'text-2xl', size: '24', line: '32' },
  { className: 'text-3xl', size: '30', line: '36' }
]

type TypeScaleRow = typeof TYPE_SCALE[number]

function round (value: number) {
  return Number(value.toFixed(3)).toString()
}

function CopyValue ({
  value,
  className,
  tooltipPlacement = 'above'
}: {
  value: string
  className?: string
  tooltipPlacement?: 'above' | 'below'
}) {
  const [copied, setCopied] = useState(false)

  async function copy () {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <span className='relative inline-flex'>
      <button
        type='button'
        aria-label={`Copy ${value}`}
        onClick={copy}
        className={cn(
          'inline cursor-copy rounded-(--radius) text-left font-mono  text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring',
          className
        )}
      >
        {value}
      </button>
      {copied && (
        <span
          role='status'
          className={cn(
            'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-(--radius) bg-foreground px-3 py-1.5 font-sans text-xs text-background shadow-md',
            tooltipPlacement === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'
          )}
        >
          Copied
        </span>
      )}
    </span>
  )
}

function ColorSwatch ({ value, surface }: { value: string; surface: 'light' | 'dark' }) {
  return (
    <span
      aria-hidden='true'
      className='inline-block size-5 shrink-0 border border-border'
      style={{ backgroundColor: surface === 'light' ? LIGHT['--background'] : DARK_SURFACE }}
    >
      <span className='block size-full' style={{ backgroundColor: value }} />
    </span>
  )
}

type TokenRow = { token: string; light: string; dark: string }

const tokenColumns: DataTableColumnDef<TokenRow>[] = [
  {
    accessorKey: 'token',
    header: 'Token',
    meta: { wrap: true },
    cell: ({ row }) => (
      <Badge variant='default' className='max-w-full min-w-0 whitespace-normal break-words font-mono normal-case'>
        {row.original.token}
      </Badge>
    )
  },
  {
    accessorKey: 'light',
    header: 'Light',
    meta: { wrap: true },
    cell: ({ row }) => (
      <span className='flex min-w-0 items-center gap-2'>
        <ColorSwatch value={row.original.light} surface='light' />
        <span className='min-w-0 flex-1'>
          <CopyValue value={row.original.light} className='block max-w-full text-xs break-words' />
        </span>
      </span>
    )
  },
  {
    accessorKey: 'dark',
    header: 'Dark',
    meta: { wrap: true },
    cell: ({ row }) => (
      <span className='flex min-w-0 items-center gap-2'>
        <ColorSwatch value={row.original.dark} surface='dark' />
        <span className='min-w-0 flex-1'>
          <CopyValue value={row.original.dark} className='block max-w-full text-xs break-words' />
        </span>
      </span>
    )
  }
]

function TokenTable ({ tokens }: { tokens: string[] }) {
  const rows = tokens.map((token) => {
    const light = LIGHT[token] ?? '—'
    const dark = DARK[token] ?? light
    return { token, light, dark }
  })

  return (
    <DataTable
      size='lg'
      data={rows}
      columns={tokenColumns}
      getRowId={(row) => row.token}
      renderSearch={() => null}
      renderColumnVisibility={() => null}
      renderPagination={() => null}
      showRowCount={false}
      tableContainerClassName='[&_table]:table-fixed [&_table]:w-full'
    />
  )
}

function RadiusScale () {
  return (
    <div className='flex flex-wrap items-end gap-6'>
      {RADIUS_PREVIEW_PX.map((radiusPx) => {
        const size = 48 + radiusPx * 4
        return (
          <div key={radiusPx} className='flex flex-col gap-1.5'>
            <div
              className='border border-foreground/30 bg-muted'
              style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${radiusPx}px` }}
            />
            <CopyValue value={`${round(radiusPx)}px`} className='w-fit' tooltipPlacement='below' />
          </div>
        )
      })}
    </div>
  )
}

const typeScaleColumns: DataTableColumnDef<TypeScaleRow>[] = [
  {
    accessorKey: 'className',
    header: 'Utility',
    cell: ({ row }) => <code className='block min-w-24'>{row.original.className}</code>
  },
  {
    accessorKey: 'size',
    header: 'Size / line-height',
    cell: ({ row }) => (
      <span className='text-muted-foreground'>
        {row.original.size}px / {row.original.line}px
      </span>
    )
  },
  {
    id: 'sample',
    header: 'Sample',
    enableSorting: false,
    cell: ({ row }) => <span className={row.original.className}>The quick brown fox jumps over a lazy dog</span>
  }
]

function TypographyTable () {
  return (
    <DataTable
      size='lg'
      data={TYPE_SCALE}
      columns={typeScaleColumns}
      getRowId={(row) => row.className}
      renderSearch={() => null}
      renderColumnVisibility={() => null}
      renderPagination={() => null}
      showRowCount={false}
    />
  )
}

function firstFamily (stack: string | undefined, fallback: string) {
  let family = stack
    ?.split(',')[0]
    ?.trim()
  if (family?.startsWith('var(')) {
    const token = family.match(/^var\((--[\w-]+)/)?.[1]
    family = (token && LIGHT[token]) || fallback
  }
  family = family?.replace(/^['"]|['"]$/g, '')
  return family || fallback
}

function SheetSection ({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <>
    <div className='w-full h-px bg-border'/>
    <div className='pb-8'>
      <div className='relative flex items-baseline gap-2'>
        <div className='h2'>{title}</div>
        {/* <span className='absolute left-0 top-1/2 -translate-x-[calc(100%+1rem)] translate-y-[-50%] text-xl font-extralight tabular-nums text-muted-foreground/50'>
          {index}
        </span> */}
      </div>
      <div className='mt-2 text-base text-muted-foreground'>{description}</div>
    </div>
    </>
  )
}

/* -------------------------------------------------------------- Components */

const AXIS_COUNT = SPECS.reduce((n, spec) => n + (spec.axes?.length ?? 0), 0)
const OPTION_COUNT = SPECS.reduce((n, spec) => n + (spec.axes?.reduce((m, axis) => m + axis.values.length, 0) ?? 0), 0)

function combinationCount (spec: ComponentSpec) {
  if (!spec.axes?.length) return 1
  if (spec.id === 'progress-indicator') return 3
  return spec.axes.reduce((n, axis) => n * axis.values.length, 1)
}

function Chip ({ children, shaded }: { children: ReactNode; shaded?: boolean }) {
  return (
    <code
      className={cn(
        'inline-flex items-center border px-1.5 py-0.5  leading-4',
        shaded ? 'border-foreground/60 bg-muted font-medium text-foreground' : 'border-border text-muted-foreground'
      )}
    >
      {children}
    </code>
  )
}

function ChoiceStyleToggle ({
  value,
  selected,
  children
}: {
  value: string
  selected: boolean
  children: ReactNode
}) {
  return (
    <Toggle
      value={value}
      size='sm'
      variant='default'
      className={cn(
        'min-h-8 cursor-pointer select-none gap-2 rounded-(--radius) border border-input bg-background px-3 py-1 text-sm font-medium text-foreground',
        'hover:bg-accent hover:text-accent-foreground',
        'data-pressed:border-primary data-pressed:bg-primary data-pressed:text-(--foreground-inverse)',
        'data-pressed:hover:bg-primary/90 data-pressed:hover:text-(--foreground-inverse)',
        focusRing
      )}
    >
      {selected && <CheckIcon aria-hidden='true' className='size-3.5 shrink-0' weight='bold' />}
      {children}
    </Toggle>
  )
}

function ResetDefaultButton ({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type='button'
              size='icon-sm'
              variant='ghost'
              aria-label='Reset default'
              onClick={onClick}
            >
              <ArrowClockwiseIcon aria-hidden='true' />
            </Button>
          }
        />
        <TooltipPortal>
          <TooltipPositioner side='top' align='end' sideOffset={4}>
            <TooltipPopup>Reset default</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}

function ComponentLevelRow ({ spec }: { spec: ComponentSpec }) {
  const isSizeAxisName = (name: string) => name.toLowerCase().includes('size')

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (spec.axes ?? []).map((axis) => [axis.name, isSizeAxisName(axis.name) ? 'all' : axis.default ?? axis.values[0]])
    )
  )
  const [selectedState, setSelectedState] = useState<string | undefined>(spec.states?.[0])
  const combinations = combinationCount(spec)
  const meta = spec.axes?.length
    ? `${spec.axes.length} props · ${combinations.toLocaleString()} combinations`
    : 'no visual props'

  const sizeAxes = (spec.axes ?? []).filter((axis) => isSizeAxisName(axis.name))
  const allActiveSizeAxes = sizeAxes.filter((axis) => selected[axis.name] === 'all')

  return (
    <div
      id={spec.id}
      className='grid scroll-mt-20 gap-3 py-6 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-12'
    >
      <div className='flex flex-col gap-1'>
        <div className='h5'>{spec.title}</div>
        <p className='text-base text-muted-foreground'>{meta}</p>
      </div>
      <div className='flex min-w-0 flex-col gap-2.5'>
        {spec.axes
          ?.filter((axis) => axis.name !== 'alignment' || selected.orientation === 'horizontal')
          .map((axis) => {
            const isSizeAxis = isSizeAxisName(axis.name)
            const values = isSizeAxis ? ['all', ...axis.values] : axis.values
            return (
              <div key={axis.name} className='grid gap-1.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-3'>
                <span className='text-xs sub-heading leading-8'>{axis.name}</span>
                <ChoiceGroup
                  aria-label={`${spec.title} ${axis.name}`}
                  value={selected[axis.name] ?? ''}
                  className='gap-1.5'
                  onValueChange={(nextValue) =>
                    setSelected((current) => ({
                      ...current,
                      [axis.name]: String(nextValue),
                      ...(spec.id === 'progress-indicator' && axis.name === 'orientation' && nextValue === 'vertical'
                        ? { alignment: 'start' }
                        : {})
                    }))
                  }
                >
                  {values.map((value) => {
                    const isDefault = isSizeAxis ? value === 'all' : axis.default === value
                    return (
                      <ChoiceButton
                        key={value}
                        value={value}
                        title={isDefault ? 'Component default' : undefined}
                        size='sm'
                        selectedVariant='subtle'
                      >
                        {value === 'all' ? 'All' : value}
                        {isDefault && <span className='ml-1 opacity-75'>· default</span>}
                      </ChoiceButton>
                    )
                  })}
                </ChoiceGroup>
              </div>
            )
          })}
        {spec.axes?.length ? (
          <div className='bg-background mt-1 flex min-w-0 flex-col gap-2 border border-border p-3'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <span className='font-medium text-foreground'>Live preview · selected combination</span>
              <ResetDefaultButton
                onClick={() =>
                  setSelected(
                    Object.fromEntries(
                      (spec.axes ?? []).map((axis) => [
                        axis.name,
                        isSizeAxisName(axis.name) ? 'all' : axis.default ?? axis.values[0]
                      ])
                    )
                  )
                }
              />
            </div>
            <div className='flex min-h-12 min-w-0 items-center overflow-x-auto -mx-2 px-2 py-1'>
              {allActiveSizeAxes.length === 0 ? (
                renderConfiguredSpecimen(spec.id, selected)
              ) : (
                <div className='flex flex-wrap w-full items-start gap-6'>
                  {allActiveSizeAxes[0].values.map((sizeVal) => {
                    const variantSettings: Record<string, string> = { ...selected }
                    for (const axis of allActiveSizeAxes) {
                      if (axis.values.includes(sizeVal)) {
                        variantSettings[axis.name] = sizeVal
                      } else {
                        variantSettings[axis.name] = axis.default ?? axis.values[0]
                      }
                    }
                    return (
                      <div key={sizeVal} className='flex flex-col items-start gap-1.5'>
                        <span className='font-mono text-xs text-muted-foreground'>{sizeVal}</span>
                        <div className='flex items-center'>{renderConfiguredSpecimen(spec.id, variantSettings)}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
        {spec.states && (
          <div className='grid gap-1.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-3'>
            <span className='text-xs sub-heading leading-8'>states &amp; modes</span>
            <ChoiceGroup
              aria-label={`${spec.title} states`}
              value={selectedState ?? ''}
              className='gap-1.5'
              onValueChange={(value) => setSelectedState(String(value))}
            >
              {spec.states.map((state, idx) => {
                const isDefault = idx === 0
                return (
                  <ChoiceButton
                    key={state}
                    value={state}
                    size='sm'
                    selectedVariant='subtle'
                  >
                    {state}
                    {isDefault && <span className='ml-1 opacity-75'>· default</span>}
                  </ChoiceButton>
                )
              })}
            </ChoiceGroup>
          </div>
        )}
        {renderStateSpecimen(spec.id, selectedState ?? spec.states?.[0]) && (
          <div className='bg-background mt-1 flex min-w-0 flex-col gap-2 border border-border p-3'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <span className='font-medium text-foreground'>
                {spec.axes?.length
                  ? `State preview · ${selectedState ?? spec.states?.[0]}`
                  : `Live preview · ${selectedState ?? spec.states?.[0]}`}
              </span>
              <ResetDefaultButton onClick={() => setSelectedState(spec.states?.[0])} />
            </div>
            <div className='flex min-h-12 min-w-0 items-center overflow-x-auto -mx-2 px-2 py-1'>
              {renderStateSpecimen(spec.id, selectedState ?? spec.states?.[0])}
            </div>
          </div>
        )}
        {spec.sizes && !spec.axes?.some((axis) => axis.name.toLowerCase().includes('size')) && (
          <p className='text-sm leading-5 text-muted-foreground'>{spec.sizes}</p>
        )}
        {spec.note && <p className='text-sm leading-5 text-muted-foreground'>{spec.note}</p>}
      </div>
    </div>
  )
}

function SheetLegend () {
  return (
    <p className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
      <Chip shaded>default</Chip>
      <span>= component default. Select prop values to update the combined live preview.</span>
      <span className='hidden sm:inline'>·</span>
      <span>Counts show the Cartesian product of the listed props.</span>
    </p>
  )
}

export function Sheet({ className }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>(['all'])
  const pendingScrollAnchor = useRef<{ id: string; top: number } | null>(null)

  useLayoutEffect(() => {
    const anchor = pendingScrollAnchor.current
    if (!anchor) return

    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(anchor.id)
      if (element) {
        const topDelta = element.getBoundingClientRect().top - anchor.top
        if (Math.abs(topDelta) > 2) window.scrollBy(0, topDelta)
      }
      pendingScrollAnchor.current = null
    })

    return () => window.cancelAnimationFrame(frame)
  }, [selectedComponentIds])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SPECS
    return SPECS.filter((spec) => {
      const haystack = [
        spec.title,
        spec.group,
        ...(spec.axes?.flatMap((axis) => [axis.name, ...axis.values]) ?? []),
        ...(spec.states ?? [])
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  const specs = useMemo(() => filtered.sort((a, b) => a.title.localeCompare(b.title)), [filtered])
  const visibleSpecs = selectedComponentIds.includes('all')
    ? specs
    : specs.filter((spec) => selectedComponentIds.includes(spec.id))

  const headingFamily = firstFamily(THEME['--font-heading'], 'Host Grotesk Variable')
  const sansFamily = firstFamily(THEME['--font-sans'], 'IBM Plex Sans')
  const monoFamily = firstFamily(THEME['--font-mono'], 'IBM Plex Mono')

  return (
    <div className={cn('flex flex-col gap-48', className)}>
      <header className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='h1'>UI sheet</div>
          <div className='max-w-2xl text-base text-muted-foreground'>
            See each component&apos;s configurable variants, prop values and combination count. <br />
            Change a value to inspect the combined preview before adding a one-off style.
          </div>
        </div>
        <dl className='grid grid-cols-2 border border-border bg-card sm:grid-cols-4'>
          {[
            [String(SPECS.length), 'components'],
            [String(AXIS_COUNT), 'configurable props'],
            [String(OPTION_COUNT), 'prop values'],
            [String(COLOR_TOKEN_COUNT), 'colour tokens']
          ].map(([value, label]) => (
            <div key={label} className='flex flex-col justify-between aspect-2/1 p-6 not-last:border-r not-last:border-border'>
              <dt className='text-xs sub-heading'>{label}</dt>
              <dd className='h2 tabular-nums'>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className='flex flex-col gap-16'>
        <SheetSection
          index='01'
          title='Tokens'
          description='Semantic CSS variables. Use the matching Tailwind utility (bg-primary, text-muted-foreground, border-border, ring-ring) instead of a raw colour. Dark values apply when .dark sits on an ancestor.'
        />

        {TOKEN_GROUPS.map((group) => (
          <div key={group.id} className='grid scroll-mt-20 gap-3 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-12'>
            <div>
              <div className='h3'>{group.title}</div>
              <p className='mt-2 text-base text-muted-foreground'>{group.description}</p>
            </div>
            <TokenTable tokens={group.tokens} />
          </div>
        ))}

          <div className='grid scroll-mt-20 gap-3 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-12'>
            <div>
              <div className='h3'>Radius</div>
              <p className='mt-2 text-base text-muted-foreground'>Component corner radius: 2px (`var(--radius)`).</p>
            </div>
            <RadiusScale />
          </div>

          <div className='grid scroll-mt-20 gap-3 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-12'>
            <div>
              <div className='h3'>Typeface</div>
            </div>
            <div className='grid grid-cols-3 border border-border'>
              <div className='flex flex-col justify-between aspect-4/3 bg-card p-6 not-last:border-r not-last:border-border'>
                <div className='text-xs sub-heading'>Heading</div>
                <div className='text-2xl heading'>{headingFamily}</div>
              </div>
              <div className='flex flex-col justify-between aspect-4/3 bg-card p-6 not-last:border-r not-last:border-border'>
                <div className='text-xs sub-heading'>Sans</div>
                <div className='text-2xl'>{sansFamily}</div>
              </div>
              <div className='flex flex-col justify-between aspect-4/3 bg-card p-6 not-last:border-r not-last:border-border'>
                <div className='text-xs sub-heading'>Mono</div>
                <code className='text-2xl'>{monoFamily}</code>
              </div>
            </div>
          </div>

        <div className='grid scroll-mt-20 gap-3 py-6 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-12'>
          <div>
            <div className='h3'>Type scale</div>
            <p className='mt-2 text-base text-muted-foreground'>
              Sizes in px at the default 16 px root. Showcase headings pair a ramp size with semibold and
              tracking-tight.
            </p>
          </div>
          <TypographyTable />
        </div>
      </section>

      <section className='flex flex-col gap-6'>
        <SheetSection
          index='02'
          title='Component levels'
          description='Each component lists its library-defined design axes (variant, size, orientation, structure, placement, adornment and activation) plus selected states. Base UI pass-through props are not exhaustively listed. Values are copied from component definitions; shaded values are defaults.'
        />

        <div className='grid scroll-mt-20 gap-3 py-6 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-12'>
          <div className='w-full sm:max-w-64'>
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
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Filter components/ values'
            />
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div id='component-filter-group' data-component-filter-anchor>
              <ToggleGroup
                multiple
                aria-label='Filter components'
                value={selectedComponentIds}
                className='h-auto flex-wrap items-center gap-1.5 rounded-none border-0'
                onValueChange={(values) => {
                  const nextValues = values.map(String)
                  const nextSelection = nextValues.includes('all')
                    ? selectedComponentIds.includes('all') && nextValues.length > 1
                      ? nextValues.filter((value) => value !== 'all')
                      : ['all']
                    : nextValues.length > 0
                      ? nextValues
                      : ['all']
                  const anchorElement = document.getElementById('component-filter-group')
                  pendingScrollAnchor.current = anchorElement
                    ? { id: anchorElement.id, top: anchorElement.getBoundingClientRect().top }
                    : null
                  setSelectedComponentIds(nextSelection)
                }}
              >
                <ChoiceStyleToggle value='all' selected={selectedComponentIds.includes('all')}>
                  All
                </ChoiceStyleToggle>
                {specs.map((spec) => (
                  <ChoiceStyleToggle
                    key={spec.id}
                    value={spec.id}
                    selected={selectedComponentIds.includes(spec.id)}
                  >
                    {spec.title}
                  </ChoiceStyleToggle>
                ))}
              </ToggleGroup>
            </div>
          </div>
          {/* <SheetLegend /> */}
        </div>

        {specs.length === 0 && <p className='text-sm text-muted-foreground'>No component matches “{query}”.</p>}

        <div className='flex flex-col gap-10'>
          {visibleSpecs.map((spec) => (
            <ComponentLevelRow key={spec.id} spec={spec} />
          ))}
        </div>
      </section>
    </div>
  )
}
