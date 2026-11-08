import { createElement, useEffect, useState } from 'react'
import type { ContentBlock, PatternPageDraft, SectionNode } from './page-content'

function BlockView ({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'prose':
      return <p className='text-muted-foreground'>{block.text}</p>
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag className={`${block.ordered ? 'list-decimal' : 'list-disc'} space-y-2 ps-5 text-muted-foreground`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ListTag>
      )
    }
    case 'table':
      return (
        <div className='max-w-full overflow-x-auto rounded-(--radius) border border-border'>
          <table className='w-full min-w-[36rem] border-collapse text-left text-sm'>
            <thead className='bg-muted/40 text-foreground'>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope='col' className='border-b border-border px-3 py-2 font-medium'>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`${rowIndex}-${row[0]}`} className='border-b border-border last:border-0'>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className='px-3 py-2 align-top text-muted-foreground'>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'variants':
      return (
        <div className='grid min-w-0 gap-4 md:grid-cols-2'>
          {block.items.map((item) => (
            <section key={item.title} className='min-w-0 space-y-2'>
              <h5 className='font-medium text-foreground'>{item.title}</h5>
              {item.whenToUse && <p className='text-sm text-muted-foreground'>{item.whenToUse}</p>}
              {item.whenNotToUse && <p className='text-sm text-muted-foreground'>{item.whenNotToUse}</p>}
              {item.body?.map((text) => (
                <p key={text} className='text-sm text-muted-foreground'>
                  {text}
                </p>
              ))}
            </section>
          ))}
        </div>
      )
    case 'callout': {
      const label =
        block.kind === 'source-limit'
          ? 'Source limits'
          : block.kind === 'local-interpretation'
          ? 'Local interpretation'
          : block.kind
      return (
        <aside className='space-y-1 border-s-2 border-border ps-3' data-content-kind={block.kind}>
          <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{label}</p>
          <p className='text-muted-foreground'>{block.text}</p>
        </aside>
      )
    }
    case 'media-ref':
      return <p className='text-sm text-muted-foreground'>{block.altIntent ?? block.label}</p>
    case 'related':
      return (
        <ul className='flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground'>
          {block.items.map((item) => (
            <li key={`${item.kind}-${item.label}`}>{item.label}</li>
          ))}
        </ul>
      )
  }
}

function headingTag (level: SectionNode['level']) {
  return `h${Math.min(level + 1, 6)}` as 'h3' | 'h4' | 'h5' | 'h6'
}

function headingClass (level: SectionNode['level']) {
  return level === 2 ? 'h4' : level === 3 ? 'h5' : 'h6'
}

function blockPreview (block: ContentBlock): string {
  switch (block.type) {
    case 'prose':
      return block.text
    case 'list':
      return block.items[0] ?? ''
    case 'table':
      return block.rows[0]?.join(' · ') ?? ''
    case 'variants':
      return block.items[0]?.whenToUse ?? block.items[0]?.title ?? ''
    case 'callout':
      return block.text
    case 'media-ref':
      return block.altIntent ?? block.label
    case 'related':
      return block.items.map((item) => item.label).join(' · ')
  }
}

function PageSection ({
  page,
  node,
  allDemos
}: {
  page: PatternPageDraft
  node: SectionNode
  allDemos: PatternPageDraft['demos']
}) {
  const id = `pattern-section-${page.id}-${node.id}`
  const Heading = headingTag(node.level)
  const linkedDemos = (node.demoRefs ?? []).flatMap((demoId) => {
    const demo = allDemos.find((item) => item.id === demoId)
    return demo ? [demo] : []
  })

  return (
    <section id={id} className='min-w-0 scroll-mt-24 space-y-3 py-5' aria-labelledby={`${id}-heading`}>
      {createElement(
        Heading,
        { id: `${id}-heading`, className: `${headingClass(node.level)} text-foreground` },
        node.heading
      )}
      {node.blocks.length > 0 && (
        <div className='min-w-0 space-y-3'>
          {node.blocks.map((block, index) => (
            <BlockView key={`${node.id}-block-${index}`} block={block} />
          ))}
        </div>
      )}
      {node.children?.map((child) => (
        <PageSection key={child.id} page={page} node={child} allDemos={allDemos} />
      ))}
      {linkedDemos.length > 0 && (
        <div className='min-w-0 space-y-4 pt-2' data-pattern-demo-slots>
          {linkedDemos.map((demo) => (
            <div key={demo.id} data-pattern-demo-slot={demo.id} />
          ))}
        </div>
      )}
    </section>
  )
}

function collectHeadings (nodes: SectionNode[]): Array<{ id: string; heading: string; level: number; preview: string }> {
  return nodes.flatMap((node) => [
    {
      id: node.id,
      heading: node.heading,
      level: node.level,
      preview: node.blocks.map(blockPreview).find(Boolean) ?? node.heading
    },
    ...collectHeadings(node.children ?? [])
  ])
}

function PatternTableOfContents ({
  page,
  headings
}: {
  page: PatternPageDraft
  headings: ReturnType<typeof collectHeadings>
}) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id)

  useEffect(() => {
    setActiveHeading(headings[0]?.id)
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)
        const firstVisibleId = visibleEntries[0]?.target.id.replace(`pattern-section-${page.id}-`, '')
        if (firstVisibleId) setActiveHeading(firstVisibleId)
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )

    headings.forEach((item) => {
      const section = document.getElementById(`pattern-section-${page.id}-${item.id}`)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [headings, page.id])

  return (
    <>
      <details className='rounded-(--radius) border border-border px-4 py-3 xl:hidden'>
        <summary className='cursor-pointer font-medium text-foreground'>On this page</summary>
        <nav aria-label={`${page.title} sections`} className='mt-3 grid gap-2 ps-2'>
          {headings.map((item) => (
            <a
              key={item.id}
              className='text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
              style={{ marginInlineStart: `${Math.max(0, item.level - 2) * 0.75}rem` }}
              href={`#pattern-section-${page.id}-${item.id}`}
            >
              {item.heading}
            </a>
          ))}
        </nav>
      </details>

      <nav
        aria-label={`${page.title} section overview`}
        className='fixed right-4 top-1/2 z-40 hidden max-h-[calc(100vh-2rem)] -translate-y-1/2 flex-col items-end gap-1 overflow-y-auto py-2 xl:flex'
      >
        {headings.map((item) => {
          const width = item.level === 2 ? 'w-8' : item.level === 3 ? 'w-6' : 'w-4'
          return (
            <div key={item.id} className='group relative flex items-center justify-end'>
              <a
                href={`#pattern-section-${page.id}-${item.id}`}
                aria-label={item.heading}
                aria-current={activeHeading === item.id ? 'location' : undefined}
                onClick={() => setActiveHeading(item.id)}
                className='flex h-2 w-10 items-center justify-end'
              >
                <span
                  className={`block h-px ${width} rounded-full transition-[width,background-color] ${
                    activeHeading === item.id
                      ? 'w-10 bg-foreground'
                      : 'bg-muted-foreground/60 group-hover:w-10 group-hover:bg-foreground group-focus-visible:w-10 group-focus-visible:bg-foreground'
                  }`}
                />
                <span className='sr-only'>{item.heading}</span>
              </a>
              <span
                aria-hidden='true'
                className='absolute right-[calc(100%+0.75rem)] top-1/2 w-80 -translate-y-1/2 rounded-(--radius) border border-border bg-popover p-4 text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100'
              >
                <span className='block truncate font-medium'>{item.heading}</span>
                <span className='mt-1 line-clamp-3 block text-sm text-muted-foreground'>{item.preview}</span>
              </span>
            </div>
          )
        })}
      </nav>
    </>
  )
}

export function PatternSourceContent ({ page }: { page: PatternPageDraft }) {
  const headings = collectHeadings(page.sections)
  return (
    <>
      {headings.length > 4 && <PatternTableOfContents page={page} headings={headings} />}
      <div className='min-w-0 divide-y divide-border border-y border-border' data-pattern-guidance>
        {page.sections.map((node) => (
          <PageSection key={node.id} page={page} node={node} allDemos={page.demos} />
        ))}
        {page.demos.filter((demo) => demo.sectionId === 'UNMAPPED').length > 0 && (
          <section className='space-y-3 py-5' aria-labelledby={`local-examples-${page.id}`}>
            <div id={`local-examples-${page.id}`} className='h5 text-foreground'>
              Local examples
            </div>
            <p className='text-sm text-muted-foreground'>
              These examples illustrate a local use case that is not covered by a maintained source section.
            </p>
            {page.demos
              .filter((demo) => demo.sectionId === 'UNMAPPED')
              .map((demo) => (
                <div key={demo.id} data-pattern-demo-slot={demo.id} />
              ))}
          </section>
        )}
        {page.notes?.map((note, index) => {
          if (note.kind === 'implementation') return null
          return (
            <section key={`${note.kind}-${index}`} className='space-y-2 py-5'>
              <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                {note.kind === 'source-limit'
                  ? 'Source limits'
                  : note.kind === 'accessibility'
                  ? 'Accessibility'
                  : 'Content'}
              </p>
              <p className='text-muted-foreground'>{note.text}</p>
            </section>
          )
        })}
      </div>
    </>
  )
}
