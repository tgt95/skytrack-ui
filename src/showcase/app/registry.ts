import { type DemoMeta } from '../demo'

/**
 * Auto-registers every demo file. Members add `src/demos/<id>.demo.tsx`;
 * nobody edits this file to register a component.
 */
const modules = import.meta.glob<{ demo: DemoMeta }>('../../demos/*.demo.tsx', { eager: true })

export const GROUP_ORDER: DemoMeta['group'][] = [
  'Actions',
  'Forms',
  'Overlays',
  'Menus & Navigation',
  'Data Display',
  'Layout',
  'Patterns',
  'UI shell'
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

const groupRank = (group: DemoMeta['group']) => {
  const index = GROUP_ORDER.indexOf(group)
  return index === -1 ? GROUP_ORDER.length : index
}

export const demos: DemoMeta[] = (calendarDemo ? [...rawDemos, calendarDemo] : rawDemos).sort(
  (a, b) => groupRank(a.group) - groupRank(b.group) || a.title.localeCompare(b.title)
)

export const demosMap = demos.reduce<Record<string, DemoMeta>>((acc, d) => {
  acc[d.id] = d
  return acc
}, {})

export const VIEWS = [
  ['components', 'Components'],
  ['sheet', 'Sheet'],
  ['showcase', 'Showcase'],
  ['pattern', 'Patterns']
] as const

/** `Overview` and `Dashboard` are two tabs of the merged `showcase` route, not routes of their own. */

export type View = (typeof VIEWS)[number][0]
export type Audience = 'designer' | 'developer'

/**
 * The two showcases that share the merged `showcase` route. The filled tabs in the top nav
 * switch between them, the same way the components route separates its variants.
 */
export const SHOWCASE_PANELS = [
  ['overview', '01', 'Overview'],
  ['dashboard', '02', 'Dashboard']
] as const

export type ShowcasePanel = (typeof SHOWCASE_PANELS)[number][0]

/** Legacy routes that now resolve to the merged `showcase` route. */
const LEGACY_VIEW_ALIASES: Record<string, ShowcasePanel> = {
  'style-overview': 'overview',
  dashboard: 'dashboard'
}

export function readComponentFromUrl(): string | null {
  const id = new URLSearchParams(window.location.search).get('component')
  return id && demosMap[id] ? id : null
}

/**
 * The merged showcase route. The two legacy routes (`style-overview`, `dashboard`) resolve to it,
 * so old links keep working.
 */
export function readViewFromUrl(): View {
  const route = new URLSearchParams(window.location.search).get('view')
  if (route && route in LEGACY_VIEW_ALIASES) return 'showcase'
  return VIEWS.some(([id]) => id === route) ? (route as View) : 'components'
}

/**
 * Which of the two showcases the merged route shows. The old routes carry their showcase in the
 * `view` param, so `?view=dashboard` still lands on the dashboard.
 */
export function readShowcasePanelFromUrl(): ShowcasePanel {
  const params = new URLSearchParams(window.location.search)
  const legacy = LEGACY_VIEW_ALIASES[params.get('view') ?? '']
  if (legacy) return legacy
  return params.get('panel') === 'dashboard' ? 'dashboard' : 'overview'
}

/** True when the URL still points at one of the routes merged into `showcase`. */
export function hasLegacyView(): boolean {
  const route = new URLSearchParams(window.location.search).get('view')
  return route != null && route in LEGACY_VIEW_ALIASES
}
