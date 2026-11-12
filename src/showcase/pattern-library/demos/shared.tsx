import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  useToastManager
} from '@/components/ui/toast'
import { PatternId } from '../catalog'
import { type PatternPageDraft, type SectionNode } from '../page-content'

export const SAMPLE_ITEMS = [
  { name: 'North coast survey', type: 'Planning' },
  { name: 'Runway inspection', type: 'Review' },
  { name: 'River mapping', type: 'Planning' },
  { name: 'Solar array scan', type: 'Complete' }
]

export const FILTER_ITEMS = [
  { name: 'North coast survey', status: 'Ready', category: 'Planning' },
  { name: 'Runway inspection', status: 'In review', category: 'Review' },
  { name: 'River mapping', status: 'Ready', category: 'Planning' },
  { name: 'Solar array scan', status: 'Complete', category: 'Complete' }
]

export const GLOBAL_NAVIGATION_SCHEMES = [
  { id: 'recent', label: 'Most recent', items: ['Missions', 'Aircraft', 'Team', 'Settings'] },
  { id: 'customized', label: 'Customized', items: ['Pinned missions', 'Flight plans', 'Aircraft', 'Settings'] },
  { id: 'audience', label: 'Audience', items: ['Pilot tools', 'Planner tools', 'Dispatcher tools', 'Settings'] },
  { id: 'alphabetical', label: 'Alphabetical', items: ['Aircraft', 'Flight plans', 'Missions', 'Settings'] },
  { id: 'domain', label: 'Product domains', items: ['Flight planning', 'Fleet operations', 'Workspace admin'] }
] as const

export const PatternDemoContext = createContext<{ patternId: PatternId; page: PatternPageDraft } | null>(null)

export function findSection(sections: SectionNode[], sectionId: string): SectionNode | undefined {
  for (const section of sections) {
    if (section.id === sectionId) return section
    const childSection = findSection(section.children ?? [], sectionId)
    if (childSection) return childSection
  }
  return undefined
}

export function DemoFrame({ children }: { children: ReactNode }) {
  return <div className='min-w-0 space-y-4'>{children}</div>
}

export function UseCaseSection({
  title,
  scenario,
  children
}: {
  title: string
  scenario: string
  children: ReactNode
}) {
  const context = useContext(PatternDemoContext)
  const demo = context?.page.demos.find((item) => item.title === title)
  const [portal, setPortal] = useState<{ demoId: string; target: HTMLElement } | null>(null)

  useEffect(() => {
    if (!demo) return
    const target = document.querySelector<HTMLElement>(`[data-pattern-demo-slot="${demo.id}"]`)
    setPortal(target ? { demoId: demo.id, target } : null)
  }, [context?.patternId, demo?.id])

  if (!context || !demo) {
    throw new Error(`Missing source-mapped demo copy for ${context?.patternId ?? 'unknown pattern'}: ${title}`)
  }

  const sourceSection = findSection(context.page.sections, demo.sectionId)
  const sourceSectionHeading = sourceSection?.heading
  const ExampleHeading = `h${Math.min((sourceSection?.level ?? 2) + 2, 6)}` as 'h4' | 'h5' | 'h6'

  const content = (
    <section
      id={`pattern-example-${demo.id}`}
      data-pattern-example
      data-pattern-example-id={demo.id}
      className='grid min-w-0 scroll-mt-24 gap-4 border-t border-border py-4 first:border-0 first:pt-0'
    >
      <header className='min-w-0 space-y-1'>
        {sourceSectionHeading !== title && (
          <ExampleHeading className='text-lg font-medium text-(--foreground)'>{title}</ExampleHeading>
        )}
        <p className='text-base text-muted-foreground'>{demo.scenario || scenario}</p>
      </header>
      <dl data-pattern-teaching-copy className='grid min-w-0 gap-4 md:grid-cols-3'>
        <div className='min-w-0 space-y-1'>
          <dt className='text-lg font-medium text-(--foreground)'>What it means</dt>
          <dd className='text-muted-foreground'>{demo.teaching.meaning}</dd>
        </div>
        <div className='min-w-0 space-y-1'>
          <dt className='text-lg font-medium text-(--foreground)'>How to choose</dt>
          <dd className='text-muted-foreground'>{demo.teaching.decision}</dd>
        </div>
        <div className='min-w-0 space-y-1'>
          <dt className='text-lg font-medium text-(--foreground)'>Before you ship</dt>
          <dd className='text-muted-foreground'>{demo.teaching.consider}</dd>
        </div>
      </dl>
      <div data-pattern-demo-card className='min-w-0 overflow-hidden rounded-(--radius) border border-border bg-card'>
        <div className='flex items-center justify-between gap-3 border-b border-border px-4 py-2'>
          <span className='text-xs font-semibold sub-heading uppercase tracking-wider text-muted-foreground'>
            {demo.interactive ? 'Interactive example' : 'Visual example'}
          </span>
          <span className='text-xs font-semibold sub-heading uppercase tracking-wider text-muted-foreground'>
            {demo.interactive ? 'Try it' : 'Reference'}
          </span>
        </div>
        <div className='@container flex min-h-80 min-w-0 flex-wrap items-center justify-center gap-4 p-4 sm:p-6'>
          <div className='min-w-0 w-full space-y-4'>
            {demo.interactive && (
              <p data-pattern-demo-instruction className='border-b border-border pb-3 text-sm text-muted-foreground'>
                Use a control below, then look for the sample result in this example. Changes stay in this preview.
              </p>
            )}
            {!demo.interactive && (
              <p data-pattern-demo-instruction className='border-b border-border pb-3 text-sm text-muted-foreground'>
                Visual reference only. The sample shows this pattern’s state or layout without a live interaction.
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  )

  return portal?.demoId === demo.id ? createPortal(content, portal.target, demo.id) : null
}

export function ToastItems() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div className='grid min-w-0 flex-1 gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastClose aria-label='Dismiss notification' />
      </ToastContent>
    </ToastRoot>
  ))
}

export function highlightMatches(text: string, query: string): ReactNode {
  if (!query) return text
  const haystack = text.toLowerCase()
  const needle = query.toLowerCase()
  const result: ReactNode[] = []
  let start = 0
  let match = haystack.indexOf(needle, start)
  let key = 0
  while (match !== -1) {
    if (match > start) result.push(text.slice(start, match))
    result.push(
      <mark key={`match-${key++}`} className='bg-primary/20 text-foreground'>
        {text.slice(match, match + query.length)}
      </mark>
    )
    start = match + query.length
    match = haystack.indexOf(needle, start)
  }
  if (start < text.length) result.push(text.slice(start))
  return result
}
