import * as React from 'react'
import { CheckIcon, CopySimpleIcon, ListNumbersIcon } from '@phosphor-icons/react'
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
  lineNumbers: boolean
  startLine: number
  toggleLineNumbers?: () => void
}

const CodeBlockContext = React.createContext<CodeBlockContextValue>({
  size: 'default',
  floatingActions: false,
  lineNumbers: false,
  startLine: 1
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
  VariantProps<typeof codeBlockVariants> & {
    size?: CodeBlockSize
    lineNumbers?: boolean
    lineIndex?: boolean
    showLineNumbers?: boolean
    defaultLineNumbers?: boolean
    defaultLineIndex?: boolean
    startLine?: number
    startLineIndex?: number
    onLineNumbersChange?: (enabled: boolean) => void
  }

function CodeBlock({
  className,
  size = 'default',
  variant = 'default',
  lineNumbers: controlledLineNumbers,
  lineIndex: controlledLineIndex,
  showLineNumbers: controlledShowLineNumbers,
  defaultLineNumbers,
  defaultLineIndex,
  startLine,
  startLineIndex,
  onLineNumbersChange,
  children,
  ...props
}: CodeBlockProps) {
  const resolvedSize = size ?? 'default'
  const resolvedVariant = variant ?? 'default'
  const explicitLineNumbers = controlledLineNumbers ?? controlledLineIndex ?? controlledShowLineNumbers
  const isControlled = explicitLineNumbers !== undefined
  const initialLineNumbers = defaultLineNumbers ?? defaultLineIndex ?? false
  const [internalLineNumbers, setInternalLineNumbers] = React.useState<boolean>(initialLineNumbers)
  const lineNumbers = isControlled ? explicitLineNumbers : internalLineNumbers

  const toggleLineNumbers = React.useCallback(() => {
    const next = !lineNumbers
    if (!isControlled) {
      setInternalLineNumbers(next)
    }
    onLineNumbersChange?.(next)
  }, [lineNumbers, isControlled, onLineNumbersChange])

  const resolvedStartLine = startLine ?? startLineIndex ?? 1

  const floatingActions = !React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === CodeBlockHeader
  )
  const context = React.useMemo(
    () => ({
      size: resolvedSize,
      floatingActions,
      lineNumbers,
      startLine: resolvedStartLine,
      toggleLineNumbers
    }),
    [resolvedSize, floatingActions, lineNumbers, resolvedStartLine, toggleLineNumbers]
  )

  return (
    <CodeBlockContext.Provider value={context}>
      <div
        data-slot='code-block'
        data-size={resolvedSize}
        data-variant={resolvedVariant}
        data-line-numbers={lineNumbers ? 'true' : 'false'}
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
        floatingActions
          ? 'absolute right-2 top-2 z-10 flex items-center gap-1'
          : 'ml-auto flex shrink-0 items-center gap-1',
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

  React.useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    },
    []
  )

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
  lineIndex?: boolean
  showLineNumbers?: boolean
  startLine?: number
  startLineIndex?: number
}

function CodeBlockContent({
  children,
  wrap = false,
  lineNumbers: propLineNumbers,
  lineIndex: propLineIndex,
  showLineNumbers: propShowLineNumbers,
  startLine: propStartLine,
  startLineIndex: propStartLineIndex,
  tabIndex = 0,
  style,
  className,
  ...props
}: CodeBlockContentProps) {
  const context = React.useContext(CodeBlockContext)
  const size = context.size
  const floatingActions = context.floatingActions

  const lineNumbers =
    propLineNumbers ?? propLineIndex ?? propShowLineNumbers ?? context.lineNumbers ?? false
  const rawStartLine =
    propStartLine ?? propStartLineIndex ?? context.startLine ?? 1
  const validStartLine = Number.isFinite(rawStartLine) && rawStartLine > 0 ? Math.floor(rawStartLine) : 1
  const childLines = typeof children === 'string' ? children.split('\n') : React.Children.toArray(children)
  const lastLineNumber = validStartLine + Math.max(0, childLines.length - 1)
  const digitsCount = Math.max(2, String(lastLineNumber).length)
  const gutterPadding = size === 'sm' ? '1.5rem' : size === 'xs' ? '1.25rem' : '1.75rem'
  const gutterWidth = `calc(${digitsCount}ch + ${gutterPadding})`

  const contentStyle = {
    ...style,
    ...(lineNumbers ? { '--code-block-gutter-width': gutterWidth } : {})
  } as React.CSSProperties

  const content = lineNumbers
    ? childLines.map((line, index) => {
        const lineNumber = String(validStartLine + index)
        if (React.isValidElement(line) && line.type === CodeBlockLine) {
          return React.cloneElement(line as React.ReactElement<CodeBlockLineProps>, {
            lineNumber,
            'data-line-number': lineNumber
          })
        }
        return (
          <CodeBlockLine key={index} lineNumber={lineNumber} data-line-number={lineNumber}>
            {typeof line === 'string' && line.length === 0 ? '\u00a0' : line}
          </CodeBlockLine>
        )
      })
    : children

  return (
    <pre
      {...props}
      data-slot='code-block-content'
      data-line-numbers={lineNumbers ? 'true' : 'false'}
      dir='ltr'
      tabIndex={tabIndex}
      style={contentStyle}
      className={cn(
        'm-0 min-w-0 max-w-full overflow-x-auto font-mono text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset',
        lineNumbers
          ? size === 'sm'
            ? 'py-2 pr-2 pl-0 text-sm'
            : size === 'xs'
              ? 'py-1 pr-1 pl-0 text-xs'
              : 'py-3 pr-3 pl-0'
          : size === 'sm'
            ? 'p-2 text-sm'
            : size === 'xs'
              ? 'p-1 text-xs'
              : 'p-3',
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
  lineNumber?: string | number
  'data-line-number'?: string
}

function CodeBlockLine({
  variant = 'default',
  lineNumber,
  className,
  children,
  ...props
}: CodeBlockLineProps) {
  const { size } = React.useContext(CodeBlockContext)
  const resolvedLineNumber = lineNumber ?? props['data-line-number']
  const hasLineNumber = resolvedLineNumber !== undefined
  const marker = variant === 'added' ? '+' : variant === 'removed' ? '−' : null

  return (
    <span
      data-slot='code-block-line'
      data-variant={variant}
      data-line-number={resolvedLineNumber}
      className={cn(
        'flex min-w-full',
        codeBlockLineHeight[size],
        variant === 'added' && 'bg-success/10',
        variant === 'removed' && 'bg-destructive/10',
        variant === 'highlighted' && 'bg-primary/10',
        className
      )}
      {...props}
    >
      {hasLineNumber && (
        <span
          aria-hidden='true'
          data-slot='code-block-line-number'
          className={cn(
            'sticky left-0 z-1 inline-flex shrink-0 select-none justify-end border-r border-border font-mono text-muted-foreground/60 transition-colors',
            'bg-muted/20 pr-3.5 pl-3',
            size === 'sm' && 'pr-2.5 pl-2 text-xs',
            size === 'xs' && 'pr-2 pl-1.5 text-[11px]',
            variant === 'added' && 'bg-success/15 text-success',
            variant === 'removed' && 'bg-destructive/15 text-destructive',
            variant === 'highlighted' && 'bg-primary/15 text-primary'
          )}
          style={{ width: 'var(--code-block-gutter-width, 3.5rem)' }}
        >
          {resolvedLineNumber}
        </span>
      )}
      <span
        data-slot='code-block-line-content'
        className={cn(
          'flex-1 min-w-0',
          hasLineNumber ? (size === 'sm' ? 'pl-2.5' : size === 'xs' ? 'pl-2' : 'pl-3.5') : '',
          'inline-block'
        )}
      >
        {marker && <span className='mr-3 inline-block w-3 select-none text-muted-foreground'>{marker}</span>}
        {children}
      </span>
    </span>
  )
}

export type CodeBlockLineNumbersToggleProps = Omit<ButtonProps, 'children'> & {
  pressedLabel?: string
  unpressedLabel?: string
}

function CodeBlockLineNumbersToggle({
  className,
  variant = 'ghost',
  size = 'icon-sm',
  pressedLabel = 'Hide line numbers',
  unpressedLabel = 'Show line numbers',
  onClick,
  ...props
}: CodeBlockLineNumbersToggleProps) {
  const { lineNumbers, toggleLineNumbers } = React.useContext(CodeBlockContext)
  const label = lineNumbers ? pressedLabel : unpressedLabel

  const handleClick: NonNullable<ButtonProps['onClick']> = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    toggleLineNumbers?.()
  }

  return (
    <Button
      type='button'
      variant={variant}
      size={size}
      aria-label={label}
      aria-pressed={lineNumbers}
      title={label}
      className={cn(lineNumbers && 'bg-accent text-accent-foreground', className)}
      onClick={handleClick}
      {...props}
    >
      <ListNumbersIcon aria-hidden='true' />
    </Button>
  )
}

const CodeBlockLineIndexToggle = CodeBlockLineNumbersToggle
export type CodeBlockLineIndexToggleProps = CodeBlockLineNumbersToggleProps

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

    if (!language || language === 'text' || language === 'txt')
      return () => {
        active = false
      }

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
  CodeBlockLineIndexToggle,
  CodeBlockLineNumbersToggle,
  CodeBlockTitle
}
