import * as React from 'react'
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockLineNumbersToggle,
  CodeBlockTitle,
  useHighlightedCode
} from '@/components/ui/code-block'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export type CodeBlockTreeNodeKind = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null'

export type CodeBlockTreeNodeContext = {
  /** The property key (string), array index (number), or null for the root value. */
  key: string | number | null
  /** Context label alias for key. */
  label: string | number | null
  /** The value of the JSON node. */
  value: unknown
  /** Deterministic path identifying this node in the JSON tree (e.g. `$/mission/id`). */
  path: string
  /** 0-based depth of the node in the JSON hierarchy. */
  depth: number
  /** The JSON data type of the node. */
  kind: CodeBlockTreeNodeKind
  /** Alias for kind. */
  nodeKind: CodeBlockTreeNodeKind
  /** Whether this node can be expanded or collapsed (objects and arrays with entries). */
  expandable: boolean
  /** Whether the node is currently expanded. */
  expanded: boolean
  /** The default Shiki syntax-highlighted content for this row. */
  defaultContent: React.ReactNode
  /** Alias for defaultContent. */
  defaultHighlightedContent: React.ReactNode
}

type JsonEntry = { label: string | number; value: unknown; isArrayItem: boolean }

type JsonTreeNode = {
  path: string
  parentPath?: string
  label: string | number | null
  value: unknown
  depth: number
  startLine: number
  endLine: number
  children: JsonTreeNode[]
  expandable: boolean
  isArray: boolean
  hasNext: boolean
  kind: CodeBlockTreeNodeKind
}

type VisibleLine = {
  lineNumber: number
  text: string
}

type ParsedJson = {
  source: string
  text: string
  value: unknown
  error: boolean
  empty: boolean
}

export type CodeBlockTreeProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  /** JSON text or a JSON-serializable value. Strings are parsed as JSON text. */
  value?: unknown
  /** Short context label shown in the code block header. */
  title?: string
  /** Whether line numbers are visible. Controlled when supplied; defaults to true. */
  lineNumbers?: boolean
  /** Initial line-number visibility when `lineNumbers` is uncontrolled. Defaults to true. */
  defaultLineNumbers?: boolean
  /** Whether the header shows the line-number visibility toggle. Defaults to true. */
  showLineNumbersToggle?: boolean
  /** Called when the built-in line-number toggle changes visibility. */
  onLineNumbersChange?: (enabled: boolean) => void
  /** Custom header actions rendered after the line-number toggle and before Copy. */
  toolbarActions?: React.ReactNode
  /** Optional callback to render custom ReactNode/JSX for each JSON node while retaining hierarchy and disclosure. */
  renderNode?: (context: CodeBlockTreeNodeContext) => React.ReactNode
}

function getNodeKind(value: unknown): CodeBlockTreeNodeKind {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'object'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'
  return 'null'
}

function parseJsonValue(value: unknown): ParsedJson {
  if (value === undefined) return { source: '', text: '', value: undefined, error: false, empty: true }

  let source: string
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
    source = serialized ?? ''
  } catch {
    return {
      source: '[Unable to serialize JSON value]',
      text: '[Unable to serialize JSON value]',
      value: undefined,
      error: true,
      empty: false
    }
  }

  if (source.trim() === '') return { source, text: '', value: undefined, error: false, empty: true }

  try {
    const parsed = JSON.parse(source) as unknown
    return {
      source,
      text: JSON.stringify(parsed, null, 2),
      value: parsed,
      error: false,
      empty: false
    }
  } catch {
    return { source, text: source, value: undefined, error: true, empty: false }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function entriesFor(value: unknown): JsonEntry[] {
  if (Array.isArray(value)) {
    return value.map((entry, index) => ({ label: index, value: entry, isArrayItem: true }))
  }
  if (isRecord(value)) {
    return Object.keys(value).map((key) => ({ label: key, value: value[key], isArrayItem: false }))
  }
  return []
}

function childPath(parentPath: string, label: string | number, isArrayItem: boolean) {
  return `${parentPath}/${isArrayItem ? `i:${label}` : `p:${encodeURIComponent(String(label))}`}`
}

function buildTree(value: unknown): JsonTreeNode {
  let nextLine = 1

  const build = (
    current: unknown,
    label: string | number | null,
    path: string,
    parentPath: string | undefined,
    depth: number,
    hasNext: boolean
  ): JsonTreeNode => {
    const entries = entriesFor(current)
    const expandable = entries.length > 0
    const startLine = nextLine++
    const children = expandable
      ? entries.map((entry, index) =>
          build(
            entry.value,
            entry.label,
            childPath(path, entry.label, entry.isArrayItem),
            path,
            depth + 1,
            index < entries.length - 1
          )
        )
      : []
    const endLine = expandable ? nextLine++ : startLine

    return {
      path,
      parentPath,
      label,
      value: current,
      depth,
      startLine,
      endLine,
      children,
      expandable,
      isArray: Array.isArray(current),
      hasNext,
      kind: getNodeKind(current)
    }
  }

  return build(value, null, '$', undefined, 0, false)
}

function collectVisibleLines(root: JsonTreeNode, isExpanded: (node: JsonTreeNode) => boolean, sourceLines: string[]) {
  const result: VisibleLine[] = []

  const appendNode = (node: JsonTreeNode) => {
    if (!node.expandable) {
      const text = (sourceLines[node.startLine - 1] ?? '').trimStart()
      result.push({ lineNumber: node.startLine, text })
      return
    }

    const expanded = isExpanded(node)
    if (!expanded) {
      result.push({ lineNumber: node.startLine, text: collapsedLine(node) })
      return
    }

    const startText = (sourceLines[node.startLine - 1] ?? '').trimStart()
    result.push({ lineNumber: node.startLine, text: startText })
    node.children.forEach(appendNode)
    const endText = (sourceLines[node.endLine - 1] ?? '').trimStart()
    result.push({ lineNumber: node.endLine, text: endText })
  }

  if (root.expandable) {
    const startText = (sourceLines[root.startLine - 1] ?? '').trimStart()
    result.push({ lineNumber: root.startLine, text: startText })
    root.children.forEach(appendNode)
    const endText = (sourceLines[root.endLine - 1] ?? '').trimStart()
    result.push({ lineNumber: root.endLine, text: endText })
  } else {
    const text = (sourceLines[root.startLine - 1] ?? '').trimStart()
    result.push({ lineNumber: root.startLine, text })
  }

  return result
}

function collapsedLine(node: JsonTreeNode) {
  const property = node.label === null || typeof node.label === 'number' ? '' : `${JSON.stringify(node.label)}: `
  const summary = node.isArray ? '[ … ]' : '{ … }'
  return `${property}${summary}${node.hasNext ? ',' : ''}`
}

export function CodeBlockTree({
  value,
  title = 'JSON',
  lineNumbers: controlledLineNumbers,
  defaultLineNumbers = true,
  showLineNumbersToggle = true,
  onLineNumbersChange,
  toolbarActions,
  renderNode: renderNodeProp,
  className,
  style,
  ...props
}: CodeBlockTreeProps) {
  const parsed = React.useMemo(() => parseJsonValue(value), [value])
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(() => new Set())
  const [internalLineNumbers, setInternalLineNumbers] = React.useState(defaultLineNumbers)
  const isLineNumbersControlled = controlledLineNumbers !== undefined
  const lineNumbers = isLineNumbersControlled ? controlledLineNumbers : internalLineNumbers
  const treeId = React.useId().replaceAll(':', '')

  const sourceLines = React.useMemo(() => parsed.text.split(/\r?\n/), [parsed.text])
  const root = React.useMemo(() => (parsed.error || parsed.empty ? null : buildTree(parsed.value)), [parsed])

  const isExpanded = React.useCallback((node: JsonTreeNode) => expandedPaths.has(node.path), [expandedPaths])

  const visibleLines = React.useMemo(
    () => (root ? collectVisibleLines(root, isExpanded, sourceLines) : []),
    [isExpanded, root, sourceLines]
  )

  const codeToHighlight = React.useMemo(() => {
    if (parsed.error) return parsed.text
    return visibleLines.map((line) => line.text).join('\n')
  }, [parsed.error, parsed.text, visibleLines])

  const highlightedLines = useHighlightedCode(codeToHighlight, 'json')
  const highlightedByLine = React.useMemo(
    () => new Map(visibleLines.map((line, index) => [line.lineNumber, highlightedLines[index] ?? line.text])),
    [highlightedLines, visibleLines]
  )

  const toggleNode = (node: JsonTreeNode) => {
    setExpandedPaths((current) => {
      const next = new Set(current)
      if (next.has(node.path)) next.delete(node.path)
      else next.add(node.path)
      return next
    })
  }

  const handleLineNumbersChange = (enabled: boolean) => {
    if (!isLineNumbersControlled) setInternalLineNumbers(enabled)
    onLineNumbersChange?.(enabled)
  }
  // Keep an empty line-number cell when hidden so the disclosure gutter and divider remain mounted.
  const lineNumberFor = (line: number) => (lineNumbers ? line : '')
  const gutterLineClassName = 'min-w-max px-2 [&_[data-slot=code-block-line-number]]:pr-8'
  const lineId = (line: number) => `${treeId}-line-${line}`
  const groupId = (path: string) => `${treeId}-group-${encodeURIComponent(path)}`

  const lastLineNumber = root ? root.endLine : sourceLines.length || 1
  const digitsCount = Math.max(2, String(lastLineNumber).length)
  const gutterWidth = lineNumbers ? `calc(${digitsCount}ch + 2.75rem)` : '2.75rem'

  const renderNode = (node: JsonTreeNode): React.ReactNode => {
    const expanded = isExpanded(node)
    const defaultStartText =
      highlightedByLine.get(node.startLine) ??
      (node.expandable && !expanded ? collapsedLine(node) : (sourceLines[node.startLine - 1]?.trimStart() ?? ''))

    const context: CodeBlockTreeNodeContext = {
      key: node.label,
      label: node.label,
      value: node.value,
      path: node.path,
      depth: node.depth,
      kind: node.kind,
      nodeKind: node.kind,
      expandable: node.expandable,
      expanded,
      defaultContent: defaultStartText,
      defaultHighlightedContent: defaultStartText
    }

    const customContent = renderNodeProp ? renderNodeProp(context) : undefined
    const displayContent = customContent !== undefined ? customContent : defaultStartText

    if (!node.expandable) {
      return (
        <li key={node.path} className='m-0 list-none p-0'>
          <CodeBlockLine
            id={lineId(node.startLine)}
            lineNumber={lineNumberFor(node.startLine)}
            variant='default'
            className={gutterLineClassName}
          >
            <span className='inline-flex items-center min-w-0' style={{ paddingLeft: `${node.depth * 2}ch` }}>
              <span className='min-w-0'>{displayContent}</span>
            </span>
          </CodeBlockLine>
        </li>
      )
    }

    const childGroupId = groupId(node.path)
    const closingContent =
      highlightedByLine.get(node.endLine) ?? sourceLines[node.endLine - 1]?.trimStart() ?? (node.isArray ? ']' : '}')

    return (
      <li key={node.path} className='m-0 list-none p-0'>
        <CodeBlockLine
          id={lineId(node.startLine)}
          lineNumber={lineNumberFor(node.startLine)}
          variant='default'
          className={cn('relative', gutterLineClassName)}
        >
          <button
            type='button'
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.label === null ? 'root JSON' : String(node.label)}`}
            aria-expanded={expanded}
            aria-controls={expanded ? childGroupId : undefined}
            onClick={() => toggleNode(node)}
            className='absolute top-1/2 z-2 inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-xs border-0 bg-transparent p-0 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
            style={{ left: 'calc(var(--code-block-gutter-width) - 1.25rem)' }}
          >
            {expanded ? (
              <CaretDownIcon className='size-3.5' aria-hidden='true' />
            ) : (
              <CaretRightIcon className='size-3.5' aria-hidden='true' />
            )}
          </button>
          <span className='inline-flex items-center min-w-0' style={{ paddingLeft: `${node.depth * 2}ch` }}>
            <span className='min-w-0'>{displayContent}</span>
          </span>
        </CodeBlockLine>

        {expanded ? (
          <ul id={childGroupId} role='group' className='m-0 flex min-w-max list-none flex-col gap-0 p-0'>
            {node.children.map(renderNode)}
            <li className='m-0 list-none p-0'>
              <CodeBlockLine
                id={lineId(node.endLine)}
                lineNumber={lineNumberFor(node.endLine)}
                variant='default'
                className={gutterLineClassName}
              >
                <span className='inline-flex items-center min-w-0' style={{ paddingLeft: `${node.depth * 2}ch` }}>
                  <span className='min-w-0 font-mono'>{closingContent}</span>
                </span>
              </CodeBlockLine>
            </li>
          </ul>
        ) : null}
      </li>
    )
  }

  const rootStartContent = highlightedByLine.get(root?.startLine ?? 1) ?? sourceLines[0]?.trimStart() ?? '{'
  const rootContext: CodeBlockTreeNodeContext | null = root
    ? {
        key: null,
        label: null,
        value: root.value,
        path: root.path,
        depth: 0,
        kind: root.kind,
        nodeKind: root.kind,
        expandable: root.expandable,
        expanded: true,
        defaultContent: rootStartContent,
        defaultHighlightedContent: rootStartContent
      }
    : null
  const rootCustom = rootContext && renderNodeProp ? renderNodeProp(rootContext) : undefined
  const rootStartDisplay = rootCustom !== undefined ? rootCustom : rootStartContent

  return (
    <CodeBlock
      {...props}
      style={{ '--code-block-gutter-width': gutterWidth, ...style } as React.CSSProperties}
      className={cn('min-w-0', className)}
      size='sm'
      lineNumbers={lineNumbers}
      onLineNumbersChange={handleLineNumbersChange}
    >
      <CodeBlockHeader>
        <CodeBlockTitle>{title}</CodeBlockTitle>
        <CodeBlockActions>
          {showLineNumbersToggle ? <CodeBlockLineNumbersToggle /> : null}
          {toolbarActions}
          <CodeBlockCopyButton value={parsed.error ? parsed.source : parsed.text} />
        </CodeBlockActions>
      </CodeBlockHeader>

      {parsed.error ? (
        <div className='flex min-w-0 flex-col gap-2 p-3'>
          <Alert variant='destructive' role='alert'>
            <AlertDescription>Invalid JSON. Showing the original text.</AlertDescription>
          </Alert>
          <CodeBlockContent className='max-h-[34rem]'>
            {highlightedLines.map((line, index) => (
              <CodeBlockLine key={index}>{line}</CodeBlockLine>
            ))}
          </CodeBlockContent>
        </div>
      ) : parsed.empty ? (
        <p className='m-0 p-3 text-sm text-muted-foreground' role='status'>
          No JSON value supplied.
        </p>
      ) : (
        <ScrollArea className='h-[34rem] min-w-0'>
          <ScrollAreaViewport>
            <ScrollAreaContent className='min-w-max gap-0 p-0 font-mono text-xs leading-5 whitespace-pre'>
              {root?.expandable ? (
                <div role='group' aria-label='JSON tree'>
                  <CodeBlockLine
                    id={lineId(root.startLine)}
                    lineNumber={lineNumberFor(root.startLine)}
                    variant='default'
                    className={gutterLineClassName}
                  >
                    <span className='inline-flex items-center min-w-0'>
                      <span className='min-w-0 font-mono'>{rootStartDisplay}</span>
                    </span>
                  </CodeBlockLine>
                  <ul className='m-0 flex min-w-max list-none flex-col gap-0 p-0'>{root.children.map(renderNode)}</ul>
                  <CodeBlockLine
                    id={lineId(root.endLine)}
                    lineNumber={lineNumberFor(root.endLine)}
                    variant='default'
                    className={gutterLineClassName}
                  >
                    <span className='inline-flex items-center min-w-0'>
                      <span className='min-w-0 font-mono'>
                        {highlightedByLine.get(root.endLine) ?? sourceLines[root.endLine - 1]?.trimStart() ?? '}'}
                      </span>
                    </span>
                  </CodeBlockLine>
                </div>
              ) : (
                <CodeBlockLine
                  id={lineId(root?.startLine ?? 1)}
                  lineNumber={lineNumberFor(root?.startLine ?? 1)}
                  variant='default'
                  className={gutterLineClassName}
                >
                  <span className='inline-flex items-center min-w-0'>
                    <span className='min-w-0 font-mono'>{rootStartDisplay}</span>
                  </span>
                </CodeBlockLine>
              )}
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation='horizontal'>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      )}
    </CodeBlock>
  )
}
