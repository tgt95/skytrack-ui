import * as React from 'react'
import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import type { DemoMeta } from '@/showcase/demo'
import { MarkdownRenderer, renderInlineMarkdown } from './markdown-renderer'
import { designerTypePatternsByDemoId } from './designer-type-patterns'
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
                  <div key={rowIndex} className='grid items-stretch gap-3 md:grid-cols-2'>
                    <section className='flex min-w-0 flex-col space-y-3 rounded-(--radius) border border-success/30 bg-success/5 p-4'>
                      <h3 className='flex flex-row items-center gap-1.5 text-sm font-semibold text-success'>
                        <CheckCircleIcon className='size-5' weight='fill' />
                        Do
                      </h3>
                      {practice ? (
                        <div className='flex min-h-24 w-full min-w-0 items-center justify-center overflow-x-auto rounded-(--radius) border border-border/70 bg-background p-3'>
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
                    <section className='flex min-w-0 flex-col space-y-3 rounded-(--radius) border border-destructive/30 bg-destructive/5 p-4'>
                      <h3 className='flex flex-row items-center gap-1.5 text-sm font-semibold text-destructive'>
                        <XCircleIcon className='size-5' weight='fill' />
                        Don't
                      </h3>
                      {practice ? (
                        <div className='flex min-h-24 w-full min-w-0 items-center justify-center overflow-x-auto rounded-(--radius) border border-border/70 bg-background p-3'>
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

function DesignerTypeGallery({ demoId, demo }: { demoId: string; demo?: DemoMeta }) {
  const patterns = designerTypePatternsByDemoId[demoId]
  if (!patterns) return null

  return (
    <div className='grid grid-cols-1 items-start gap-8'>
      {patterns.map((pattern) => (
        <section key={pattern.title} className='min-w-0 space-y-4'>
          <div className='space-y-0'>
            <h4 className='h5'>{pattern.title}</h4>
            <p className='text-lg leading-loose text-muted-foreground'>{pattern.description}</p>
          </div>
          <div
            className='grid items-stretch gap-10'
            style={{
              gridTemplateColumns:
                pattern.layout === 'single-column'
                  ? 'minmax(0, 1fr)'
                  : `repeat(auto-fit, minmax(min(100%, ${pattern.minColumnWidth ?? '32rem'}), 1fr))`
            }}
          >
            {pattern.examples.map((example) => {
              const variant = example.variantName
                ? demo?.variants.find(
                    (candidate) => candidate.name.toLowerCase() === example.variantName?.toLowerCase()
                  )
                : undefined
              const Preview = example.preview
              const previewContent = Preview ? <Preview /> : variant?.render()
              const exampleKey = example.id ?? example.variantName ?? example.label

              return (
                <section key={exampleKey} className='flex min-w-0 flex-col gap-2'>
                  <div className='flex items-center justify-between gap-2'>
                    <h5 className='text-xs font-medium sub-heading'>{example.label}</h5>
                    <Badge size='sm' count='Try it' />
                  </div>
                  <div className='flex min-h-80 min-w-0 max-w-full gap-3 flex-1 flex-wrap items-center justify-center overflow-x-auto rounded-(--radius) border border-border bg-sidebar p-4 [&>[data-slot=field].w-full]:items-start [&>[data-slot=field].w-full]:justify-center'>
                    {previewContent ? (
                      <DesignerPreviewBoundary key={exampleKey}>{previewContent}</DesignerPreviewBoundary>
                    ) : (
                      <p className='text-xs text-destructive' role='alert'>
                        {`Configured demo variant “${example.variantName ?? example.label}” is missing from ${demoId}.`}
                      </p>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

export function DesignerGuidelineSheet({ guideline, demo, allDemos, practices }: DesignerGuidelineSheetProps) {
  const targetDemoId = guideline.showcaseDemoId ?? guideline.slug
  const targetDemo = allDemos[targetDemoId] ?? demo
  const tabs = DESIGNER_TABS.filter((title) => guideline.sections[title])

  return (
    <section className='w-full min-w-0 rounded-(--radius)'>
      <div className='space-y-10'>
        {tabs.map((title) => {
          const section = guideline.sections[title]
          const requestedVariant = section.variantName
          const typePatterns = title === 'Types' ? designerTypePatternsByDemoId[guideline.slug] : undefined
          const liveVariant = requestedVariant
            ? targetDemo?.variants.find((variant) => variant.name.toLowerCase() === requestedVariant.toLowerCase())
            : targetDemo?.variants[0]

          return (
            <section
              key={title}
              aria-labelledby={`designer-guideline-${title.replaceAll(' ', '-')}`}
              className='w-full min-w-0 border-t border-border/60 pt-6'
            >
              <h2 id={`designer-guideline-${title.replaceAll(' ', '-')}`} className='h3 mb-4'>
                {title}
              </h2>
              {typePatterns ? (
                <div className='space-y-6'>
                  <DesignerGuidance blocks={section.blocks} practices={practices?.[title]} />
                  <DesignerTypeGallery demoId={guideline.slug} demo={targetDemo} />
                </div>
              ) : title === 'Usage' ? (
                targetDemo?.group === 'UI shell' ? (
                  <div className='flex flex-col gap-6 w-full min-w-0'>
                    <div className='min-w-0 space-y-4'>
                      <DesignerGuidance blocks={section.blocks} practices={practices?.[title]} />
                    </div>

                    <div className='min-w-0 space-y-3 w-full'>
                      <div className='overflow-hidden rounded-(--radius) border border-border bg-background'>
                        <div className='flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-3.5 py-2'>
                          <span className='truncate text-xs font-medium sub-heading'>Interactive example</span>
                          <Badge size='sm' count='Try it' />
                        </div>
                        <div className='flex min-h-80 w-full min-w-0 flex-wrap items-center justify-center gap-4 overflow-x-auto bg-sidebar p-4'>
                          {liveVariant ? (
                            <DesignerPreviewBoundary key={liveVariant.name}>
                              {liveVariant.render()}
                            </DesignerPreviewBoundary>
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
                ) : (
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
                        <div className='flex min-h-80 w-full min-w-0 flex-wrap items-center justify-center gap-4 overflow-x-auto bg-sidebar p-4'>
                          {liveVariant ? (
                            <DesignerPreviewBoundary key={liveVariant.name}>
                              {liveVariant.render()}
                            </DesignerPreviewBoundary>
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
                )
              ) : (
                <DesignerGuidance blocks={section.blocks} practices={practices?.[title]} />
              )}
            </section>
          )
        })}
      </div>
    </section>
  )
}
