import * as React from 'react'
import type { MarkdownBlock } from './types'

export function renderInlineMarkdown(text: string): React.ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g
  const parts = text.split(pattern)

  return parts.map((part, index) => {
    if (!part) return null

    // Link
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      return (
        <a
          key={index}
          href={href}
          className='text-primary underline underline-offset-2 hover:opacity-80 transition-opacity'
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
          {renderInlineMarkdown(label)}
        </a>
      )
    }

    // Inline code
    const codeMatch = part.match(/^`([^`]+)`$/)
    if (codeMatch) {
      return (
        <code key={index} className='rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8em] font-medium text-foreground'>
          {codeMatch[1]}
        </code>
      )
    }

    // Bold
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/)
    if (boldMatch) {
      return (
        <strong key={index} className='font-semibold text-foreground'>
          {boldMatch[1]}
        </strong>
      )
    }

    // Italic
    const italicMatch = part.match(/^\*([^*]+)\*$/)
    if (italicMatch) {
      return (
        <em key={index} className='italic'>
          {italicMatch[1]}
        </em>
      )
    }

    return part
  })
}

export function MarkdownRenderer({ blocks }: { blocks: MarkdownBlock[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className='space-y-3'>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className='text-lg leading-loose text-muted-foreground'>
                {renderInlineMarkdown(block.text)}
              </p>
            )
          case 'heading': {
            const HeadingTag = block.level <= 3 ? 'h3' : 'h4'
            if (block.level <= 3) {
              return (
                <HeadingTag key={idx} className='text-base font-medium text-foreground pt-2'>
                  {renderInlineMarkdown(block.text)}
                </HeadingTag>
              )
            }
            return (
              <HeadingTag key={idx} className='text-sm font-medium text-foreground pt-1'>
                {renderInlineMarkdown(block.text)}
              </HeadingTag>
            )
          }
          case 'blockquote':
            return (
              <blockquote
                key={idx}
                className='border-l-2 border-primary/50 pl-3 py-1 italic text-xs text-muted-foreground bg-muted/20 rounded-r-(--radius)'
              >
                {renderInlineMarkdown(block.text)}
              </blockquote>
            )
          case 'table':
            return (
              <div key={idx} className='overflow-x-auto rounded-(--radius) border border-border my-2'>
                <table className='w-full text-xs text-left border-collapse'>
                  <thead className='bg-muted/60 border-b border-border'>
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th key={hIdx} scope='col' className='p-2.5 font-medium text-foreground'>
                          {renderInlineMarkdown(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className='border-b border-border/40 last:border-b-0 hover:bg-muted/30 transition-colors'
                      >
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className='p-2.5 text-muted-foreground align-top'>
                            {renderInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'list': {
            if (block.ordered) {
              return (
                <ol key={idx} className='list-decimal pl-5 space-y-1 text-lg text-muted-foreground leading-loose'>
                  {block.items.map((it, itIdx) => (
                    <li key={itIdx}>{renderInlineMarkdown(it)}</li>
                  ))}
                </ol>
              )
            }
            return (
              <ul key={idx} className='list-disc pl-5 space-y-1 text-lg text-muted-foreground leading-loose'>
                {block.items.map((it, itIdx) => (
                  <li key={itIdx}>{renderInlineMarkdown(it)}</li>
                ))}
              </ul>
            )
          }
          case 'code':
            return (
              <div key={idx} className='relative my-2'>
                <pre className='overflow-x-auto rounded-(--radius) bg-muted/60 p-3 font-mono text-xs text-foreground leading-relaxed border border-border'>
                  <code>{block.code}</code>
                </pre>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
