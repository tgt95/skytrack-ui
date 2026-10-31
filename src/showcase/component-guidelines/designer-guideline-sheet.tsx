import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import type { DemoMeta } from '@/showcase/demo'
import { MarkdownRenderer, renderInlineMarkdown } from './markdown-renderer'
import type { DesignerPracticePair } from './practice-types'
import type { MarkdownBlock, ParsedGuideline } from './types'

const DESIGNER_TABS = ['Usage', 'Types', 'Behavior', 'Layout', 'Accessibility', 'Content'] as const

interface DesignerGuidelineSheetProps {
  guideline: ParsedGuideline
  demo?: DemoMeta
  allDemos: Record<string, DemoMeta>
  practices?: Partial<Record<(typeof DESIGNER_TABS)[number], DesignerPracticePair[]>>
}

class DesignerPreviewBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <p className='text-xs text-destructive' role='alert'>
          Preview failed to render: {this.state.error.message}
        </p>
      )
    }
    return this.props.children
  }
}

function DesignerGuidance({ blocks, practices = [] }: { blocks: MarkdownBlock[]; practices?: DesignerPracticePair[] }) {
  let practiceRowIndex = 0

  return (
    <div className='space-y-4'>
      {blocks.map((block, index) => {
        const isDoDontTable =
          block.type === 'table' &&
          block.headers.length >= 2 &&
          block.headers[0].trim().toLowerCase() === 'do' &&
          block.headers[1].trim().toLowerCase().startsWith("don't")

        if (isDoDontTable && block.type === 'table') {
          const whyColumn = block.headers.findIndex((header) => header.trim().toLowerCase() === 'why')
          return (
            <div key={index} className='space-y-3'>
              {block.rows.map((row, rowIndex) => {
                const practice = practices[practiceRowIndex]
                practiceRowIndex += 1

                return (
                  <div key={rowIndex} className='grid gap-3 md:grid-cols-2'>
                    <section className='space-y-3 rounded-(--radius) border border-primary/30 bg-primary/5 p-4'>
                      <h3 className='text-sm font-semibold text-primary'>Do</h3>
                      {practice ? (
                        <div className='flex min-h-24 items-center justify-center rounded-(--radius) border border-border/70 bg-background p-3'>
                          <DesignerPreviewBoundary key={`recommended-${rowIndex}`}>
                            {practice.recommended}
                          </DesignerPreviewBoundary>
                        </div>
                      ) : (
                        <p
                          className='rounded-(--radius) border border-destructive/40 bg-background p-3 text-sm text-destructive'
                          role='alert'
                        >
                          Missing compiled JSX example for this comparison.
                        </p>
                      )}
                      <p className='text-lg leading-loose text-foreground'>{renderInlineMarkdown(row[0] ?? '')}</p>
                    </section>
                    <section className='space-y-3 rounded-(--radius) border border-destructive/30 bg-destructive/5 p-4'>
                      <h3 className='text-sm font-semibold text-destructive'>Don't</h3>
                      {practice ? (
                        <div className='flex min-h-24 items-center justify-center rounded-(--radius) border border-border/70 bg-background p-3'>
                          <DesignerPreviewBoundary key={`discouraged-${rowIndex}`}>
                            {practice.discouraged}
                          </DesignerPreviewBoundary>
                        </div>
                      ) : (
                        <p
                          className='rounded-(--radius) border border-destructive/40 bg-background p-3 text-sm text-destructive'
                          role='alert'
                        >
                          Missing compiled JSX example for this comparison.
                        </p>
                      )}
                      <p className='text-lg leading-loose text-foreground'>{renderInlineMarkdown(row[1] ?? '')}</p>
                    </section>
                    {whyColumn >= 0 && row[whyColumn] && (
                      <p className='text-lg leading-loose text-muted-foreground md:col-span-2'>
                        <span className='font-semibold text-foreground'>Why: </span>
                        {renderInlineMarkdown(row[whyColumn])}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )
        }

        return <MarkdownRenderer key={index} blocks={[block]} />
      })}
    </div>
  )
}

export function DesignerGuidelineSheet({ guideline, demo, allDemos, practices }: DesignerGuidelineSheetProps) {
  const targetDemoId = guideline.showcaseDemoId ?? guideline.slug
  const targetDemo = allDemos[targetDemoId] ?? demo
  const tabs = DESIGNER_TABS.filter((title) => guideline.sections[title])

  return (
    <section className='w-full min-w-0 rounded-(--radius)'>
      <Tabs defaultValue={tabs[0]} className='w-full min-w-0'>
        <div className='mb-4 max-w-full overflow-x-auto border-border border-b'>
          <TabsList
            variant='line'
            width='hug'
            aria-label={`${guideline.title} designer guidance sections`}
            className='gap-2 sm:gap-4 max-w-full pb-px border-0'
          >
            {tabs.map((title) => (
              <TabsTab key={title} value={title} className='whitespace-nowrap px-2 py-2 text-xs sm:px-3 sm:text-sm'>
                {title}
              </TabsTab>
            ))}
          </TabsList>
        </div>

        {tabs.map((title) => {
          const section = guideline.sections[title]
          const requestedVariant = section.variantName
          const liveVariant = requestedVariant
            ? targetDemo?.variants.find((variant) => variant.name.toLowerCase() === requestedVariant.toLowerCase())
            : targetDemo?.variants[0]

          return (
            <TabsPanel key={title} value={title} className='w-full min-w-0 pt-1 outline-none'>
              <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-2'>
                <div className='min-w-0 space-y-4'>
                  <DesignerGuidance blocks={section.blocks} practices={practices?.[title]} />
                </div>

                <div className='min-w-0 space-y-3 lg:sticky lg:top-20'>
                  <div className='overflow-hidden rounded-(--radius) border border-border bg-background'>
                    <div className='flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-3.5 py-2'>
                      <span className='truncate text-xs font-medium sub-heading'>Interactive example</span>
                      <Badge size='sm' count='Try it' />
                    </div>
                    <div className='flex min-h-36 flex-wrap items-center justify-center gap-4 bg-muted/5 p-4'>
                      {liveVariant ? (
                        <DesignerPreviewBoundary key={liveVariant.name}>{liveVariant.render()}</DesignerPreviewBoundary>
                      ) : (
                        <p className='text-xs text-destructive' role='alert'>
                          {requestedVariant
                            ? `Configured demo variant “${requestedVariant}” is missing from ${targetDemoId}.`
                            : `No live preview is registered for ${targetDemoId}.`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsPanel>
          )
        })}
      </Tabs>
    </section>
  )
}
