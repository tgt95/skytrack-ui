import * as React from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'
import { MarkdownRenderer } from './markdown-renderer'
import type { ParsedGuideline } from './types'

const TAB_KEYS = ['Overview', 'Usage', 'Anatomy', 'Variants & states', 'Accessibility', 'API & examples'] as const

class SheetDemoErrorBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[sheet-demo-crash] ${this.props.name}: ${error.message}`, info.componentStack)
  }
  render() {
    if (this.state.error) {
      return <p className='text-xs text-destructive'>Demo failed to render: {this.state.error.message}</p>
    }
    return this.props.children
  }
}

function CanonicalCodeCard({ code }: { code: string | null }) {
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied' | 'error'>('idle')

  if (!code) return null

  const handleCopy = async () => {
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      textarea.style.pointerEvents = 'none'
      document.body.appendChild(textarea)
      try {
        textarea.focus()
        textarea.select()
        textarea.setSelectionRange(0, textarea.value.length)
        const didCopy = document.execCommand('copy')
        if (!didCopy) throw new Error('Clipboard copy is unavailable')
      } finally {
        textarea.remove()
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(code)
        } catch {
          fallbackCopy()
        }
      } else {
        fallbackCopy()
      }
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }

    window.setTimeout(() => setCopyStatus('idle'), 2000)
  }

  return (
    <div className='border border-border rounded-(--radius) overflow-hidden mt-4'>
      <div className='flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5'>
        <span className='text-xs font-mono font-medium text-muted-foreground'>Canonical JSX</span>
        <Button
          size='xs'
          variant='ghost'
          onClick={handleCopy}
          className='h-6 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground'
          aria-label={
            copyStatus === 'copied'
              ? 'Snippet copied to clipboard'
              : copyStatus === 'error'
                ? 'Copy failed; try again'
                : 'Copy snippet'
          }
        >
          {copyStatus === 'copied' ? (
            <>
              <CheckIcon className='size-3 text-success' />
              <span>Copied</span>
            </>
          ) : copyStatus === 'error' ? (
            <span>Retry</span>
          ) : (
            <>
              <CopyIcon className='size-3' />
              <span>Copy</span>
            </>
          )}
        </Button>
        <span className='sr-only' aria-live='polite' aria-atomic='true'>
          {copyStatus === 'copied'
            ? 'Code snippet copied to clipboard.'
            : copyStatus === 'error'
              ? 'Could not copy the code snippet.'
              : ''}
        </span>
      </div>
      <pre className='overflow-x-auto p-3 font-mono text-xs text-foreground bg-background/50 leading-relaxed max-h-72'>
        <code>{code}</code>
      </pre>
    </div>
  )
}

interface ComponentGuidelineSheetProps {
  guideline: ParsedGuideline
  demo?: DemoMeta
  allDemos: Record<string, DemoMeta>
}

export function ComponentGuidelineSheet({ guideline, demo, allDemos }: ComponentGuidelineSheetProps) {
  // Target demo can come from showcaseDemoId or current demo
  const targetDemoId = guideline.showcaseDemoId ?? guideline.slug
  const targetDemo = allDemos[targetDemoId] ?? demo

  return (
    <div className='w-full min-w-0 rounded-(--radius) border border-border/80 bg-card/60 p-6'>
      <div className='space-y-10'>

        {TAB_KEYS.map((tabKey) => {
          const sec = guideline.sections[tabKey]
          if (!sec) return null

          const requestedVariantName = sec.variantName
          const matchedVariant =
            requestedVariantName && targetDemo?.variants
              ? targetDemo.variants.find((v) => v.name.toLowerCase() === requestedVariantName.toLowerCase())
              : undefined

          const activeVariant = requestedVariantName ? matchedVariant : targetDemo?.variants?.[0]

          const isStacked = targetDemo?.group === 'UI shell'

          return (
            <section key={tabKey} aria-labelledby={`guideline-${tabKey.replaceAll(' ', '-')}`} className='w-full min-w-0 border-t border-border/60 pt-6'>
              <h2 id={`guideline-${tabKey.replaceAll(' ', '-')}`} className='h3 mb-4'>{tabKey}</h2>
              <div className={isStacked ? 'flex flex-col gap-6 w-full min-w-0' : 'grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'}>
                {/* Guidance Column (stacked first on mobile) */}
                <div className='min-w-0 space-y-4'>
                  <div className='space-y-3'>
                    <MarkdownRenderer blocks={sec.blocks} />
                  </div>

                  {tabKey === 'API & examples' &&
                    guideline.evidenceAndLimits &&
                    guideline.evidenceAndLimits.length > 0 && (
                      <div className='border-t border-border/60 pt-4 mt-4 space-y-2'>
                        <h3 className='text-xs font-semibold sub-heading uppercase tracking-wider text-muted-foreground'>
                          Evidence and limits
                        </h3>
                        <MarkdownRenderer blocks={guideline.evidenceAndLimits} />
                      </div>
                    )}

                  {guideline.canonicalJsx && <CanonicalCodeCard code={guideline.canonicalJsx} />}
                </div>

                {/* Compiled Interactive Example Column */}
                <div className={isStacked ? 'min-w-0 w-full space-y-2' : 'min-w-0 lg:sticky lg:top-20 space-y-2'}>
                  <div className='border border-border rounded-(--radius) overflow-hidden bg-background'>
                    <div className='flex items-center justify-between border-b border-border bg-muted/30 px-3.5 py-2'>
                      <div className='flex items-center gap-2 min-w-0'>
                        <span className='size-1.5 rounded-full bg-primary shrink-0' />
                        <span className='text-xs font-medium sub-heading truncate'>
                          Live preview: {activeVariant ? activeVariant.name : 'Preview'}
                        </span>
                      </div>
                      {requestedVariantName && <Badge size='sm' count={tabKey} />}
                    </div>
                    <div className='flex min-h-36 w-full min-w-0 flex-wrap items-center justify-center gap-4 overflow-x-auto p-4 bg-muted/5'>
                      {activeVariant ? (
                        <SheetDemoErrorBoundary key={activeVariant.name} name={activeVariant.name}>
                          {activeVariant.render()}
                        </SheetDemoErrorBoundary>
                      ) : (
                        <p className='text-xs text-destructive' role='alert'>
                          {requestedVariantName
                            ? `Configured demo variant “${requestedVariantName}” is missing from ${targetDemoId}.`
                            : `No live preview is registered for ${targetDemoId}.`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
