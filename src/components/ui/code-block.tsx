import * as React from 'react'
import { CheckIcon, CopySimpleIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { BundledLanguage } from 'shiki'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CodeBlockSize = 'default' | 'sm' | 'xs'
const codeBlockLineHeight: Record<CodeBlockSize, string> = {
  default: 'leading-6',
  sm: 'leading-5',
  xs: 'leading-4'
}

type CodeBlockContextValue = {
  size: CodeBlockSize
  floatingActions: boolean
}

const CodeBlockContext = React.createContext<CodeBlockContextValue>({
  size: 'default',
  floatingActions: false
})

const codeBlockVariants = cva(
  'group/code-block isolate relative flex min-w-0 flex-col overflow-hidden rounded-(--radius) border text-card-foreground',
  {
    variants: {
      variant: {
        default: 'border-border bg-card',
        destructive: 'border-destructive/50 bg-destructive/5'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)

export type CodeBlockProps = React.ComponentProps<'div'> &
  VariantProps<typeof codeBlockVariants> & { size?: CodeBlockSize }

function CodeBlock({ className, size = 'default', variant = 'default', children, ...props }: CodeBlockProps) {
  const resolvedSize = size ?? 'default'
  const resolvedVariant = variant ?? 'default'
  const floatingActions = !React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === CodeBlockHeader
  )
  const context = React.useMemo(() => ({ size: resolvedSize, floatingActions }), [resolvedSize, floatingActions])

  return (
    <CodeBlockContext.Provider value={context}>
      <div
        data-slot='code-block'
        data-size={resolvedSize}
        data-variant={resolvedVariant}
        className={cn(codeBlockVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  )
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='code-block-header'
      className={cn('flex min-w-0 items-center gap-2 border-b border-border bg-muted/20 px-3 py-2', className)}
      {...props}
    />
  )
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='code-block-title'
      className={cn('min-w-0 flex-1 truncate font-medium text-foreground', className)}
      {...props}
    />
  )
}

function CodeBlockActions({ className, ...props }: React.ComponentProps<'div'>) {
  const { floatingActions } = React.useContext(CodeBlockContext)

  return (
    <div
      data-slot='code-block-actions'
      data-floating={floatingActions ? 'true' : undefined}
      className={cn(
        floatingActions ? 'absolute right-2 top-2 z-10 flex items-center gap-1' : 'ml-auto flex shrink-0 items-center gap-1',
        className
      )}
      {...props}
    />
  )
}

export type CodeBlockCopyButtonProps = Omit<ButtonProps, 'children'> & {
  value: string
  copyLabel?: string
  copiedLabel?: string
  copyFailedLabel?: string
}

function CodeBlockCopyButton({
  value,
  className,
  onClick,
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  copyFailedLabel = 'Copy failed',
  variant = 'ghost',
  size = 'icon-sm',
  ...props
}: CodeBlockCopyButtonProps) {
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle')
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const statusLabel = copyState === 'copied' ? copiedLabel : copyState === 'error' ? copyFailedLabel : copyLabel

  React.useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  const handleClick: NonNullable<ButtonProps['onClick']> = async (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    if (resetTimer.current) clearTimeout(resetTimer.current)

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API is unavailable')
      await navigator.clipboard.writeText(value)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    resetTimer.current = setTimeout(() => setCopyState('idle'), 1800)
  }

  return (
    <>
      <Button
        type='button'
        variant={variant}
        size={size}
        aria-label={statusLabel}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {copyState === 'copied' ? <CheckIcon aria-hidden='true' /> : <CopySimpleIcon aria-hidden='true' />}
      </Button>
      <span className='sr-only' role='status' aria-live='polite' aria-atomic='true'>
        {statusLabel}
      </span>
    </>
  )
}

export type CodeBlockContentProps = Omit<React.ComponentProps<'pre'>, 'children'> & {
  children?: React.ReactNode
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
}

function CodeBlockContent({
  children,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  tabIndex = 0,
  style,
  className,
  ...props
}: CodeBlockContentProps) {
  const { size, floatingActions } = React.useContext(CodeBlockContext)
  const validStartLine = Number.isFinite(startLine) && startLine > 0 ? Math.floor(startLine) : 1
  const childLines = typeof children === 'string' ? children.split('\n') : React.Children.toArray(children)
  const lastLineNumber = validStartLine + Math.max(0, childLines.length - 1)
  const gutterWidth = `${Math.max(2, String(lastLineNumber).length + 1)}ch`
  const contentStyle = {
    ...style,
    ...(lineNumbers ? { '--code-block-gutter-width': gutterWidth } : {})
  } as React.CSSProperties
  const content = lineNumbers
    ? childLines.map((line, index) => {
        const lineNumber = String(validStartLine + index)
        if (React.isValidElement(line) && line.type === CodeBlockLine) {
          return React.cloneElement(line as React.ReactElement<CodeBlockLineProps>, { 'data-line-number': lineNumber })
        }
        return (
          <CodeBlockLine key={index} data-line-number={lineNumber}>
            {typeof line === 'string' && line.length === 0 ? '\u00a0' : line}
          </CodeBlockLine>
        )
      })
    : children

  return (
    <pre
      {...props}
      data-slot='code-block-content'
      dir='ltr'
      tabIndex={tabIndex}
      style={contentStyle}
      className={cn(
        'm-0 min-w-0 max-w-full overflow-x-auto font-mono text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset',
        size === 'sm' ? 'p-2 text-sm' : size === 'xs' ? 'p-1 text-xs' : 'p-3',
        codeBlockLineHeight[size],
        floatingActions && 'pt-10',
        className
      )}
    >
      <code className={cn('block min-w-full', wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre')}>
        {content}
      </code>
    </pre>
  )
}

export type CodeBlockLineProps = React.ComponentProps<'span'> & {
  variant?: 'default' | 'added' | 'removed' | 'highlighted'
  'data-line-number'?: string
}

function CodeBlockLine({ variant = 'default', className, children, ...props }: CodeBlockLineProps) {
  const { size } = React.useContext(CodeBlockContext)
  const hasLineNumber = props['data-line-number'] !== undefined
  const marker = variant === 'added' ? '+' : variant === 'removed' ? '−' : null

  return (
    <span
      data-slot='code-block-line'
      data-variant={variant}
      className={cn(
        'block',
        codeBlockLineHeight[size],
        hasLineNumber &&
          'before:mr-4 before:inline-block before:w-[var(--code-block-gutter-width)] before:select-none before:text-right before:text-muted-foreground before:content-[attr(data-line-number)]',
        variant === 'added' && 'bg-success/10',
        variant === 'removed' && 'bg-destructive/10',
        variant === 'highlighted' && 'bg-primary/10',
        className
      )}
      {...props}
    >
      {marker && <span className='mr-3 inline-block w-3 select-none text-muted-foreground'>{marker}</span>}
      {children}
    </span>
  )
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='code-block-footer'
      className={cn('flex items-center gap-2 border-t border-border px-3 py-2', className)}
      {...props}
    />
  )
}

export function useHighlightedCode(code: string, language: string): React.ReactNode[] {
  const plainLines = React.useMemo(() => {
    const normalized = code.endsWith('\n') ? code.slice(0, -1) : code
    return normalized.split('\n')
  }, [code])
  const [lines, setLines] = React.useState<React.ReactNode[]>(plainLines)

  React.useEffect(() => {
    let active = true
    setLines(plainLines)

    if (!language || language === 'text' || language === 'txt') return () => { active = false }

    void import('shiki')
      .then(({ codeToTokensWithThemes }) =>
        codeToTokensWithThemes(code.endsWith('\n') ? code.slice(0, -1) : code, {
          lang: language as BundledLanguage,
          themes: { light: 'light-plus', dark: 'dark-plus' }
        })
      )
      .then((tokens) => {
        if (!active) return
        setLines(
          tokens.map((tokenLine, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {tokenLine.some((token) => token.content.length > 0)
                ? tokenLine.map((token, index) => {
                    const style = {
                      '--shiki-light': token.variants.light?.color ?? 'inherit',
                      '--shiki-dark': token.variants.dark?.color ?? 'inherit'
                    } as React.CSSProperties

                    return (
                      <span
                        key={index}
                        className='text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]'
                        style={style}
                      >
                        {token.content}
                      </span>
                    )
                  })
                : '\u00a0'}
            </React.Fragment>
          ))
        )
      })
      .catch(() => {
        if (active) setLines(plainLines)
      })

    return () => {
      active = false
    }
  }, [code, language, plainLines])

  return lines
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
}
