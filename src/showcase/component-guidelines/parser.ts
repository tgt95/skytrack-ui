import type { GuidelineSection, MarkdownBlock, ParsedGuideline } from './types'

export function splitTableRow(rowStr: string): string[] {
  let s = rowStr.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|')) s = s.slice(0, -1)

  const cells: string[] = []
  let currentCell = ''
  let inBackticks = false

  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    if (char === '\\' && i + 1 < s.length && s[i + 1] === '|') {
      currentCell += '|'
      i++
      continue
    }
    if (char === '`') {
      inBackticks = !inBackticks
      currentCell += char
      continue
    }
    if (char === '|' && !inBackticks) {
      cells.push(currentCell.trim())
      currentCell = ''
      continue
    }
    currentCell += char
  }
  cells.push(currentCell.trim())
  return cells
}

export function parseGuidelineMarkdown(markdown: string, fallbackSlug: string): ParsedGuideline {
  const lines = markdown.split(/\r?\n/)

  let title = fallbackSlug
  let description = ''
  let packageVersion: string | undefined
  let publicExport: string | undefined
  let implementation: string | undefined
  let publicTypeDeclaration: string | undefined
  let showcaseDemoId: string | undefined
  let closestDemo: string | undefined

  // Extract header metadata
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const line = lines[i].trim()
    if (line.startsWith('# ') && title === fallbackSlug) {
      title = line.slice(2).trim()
    } else if (line.startsWith('> ') && !description) {
      description = line.slice(2).trim()
    } else if (line.startsWith('- Package version:')) {
      packageVersion = line.replace(/^- Package version:\s*`?([^`]+)`?/, '$1').trim()
    } else if (line.startsWith('- Public export:')) {
      publicExport = line.replace(/^- Public export:\s*`?([^`]+)`?/, '$1').trim()
    } else if (line.startsWith('- Implementation:')) {
      implementation = line.replace(/^- Implementation:\s*/, '').trim()
    } else if (line.startsWith('- Public type declaration:')) {
      publicTypeDeclaration = line.replace(/^- Public type declaration:\s*/, '').trim()
    } else if (line.startsWith('- Showcase demo id:')) {
      showcaseDemoId = line.replace(/^- Showcase demo id:\s*`?([^`]+)`?/, '$1').trim()
    } else if (line.startsWith('- Closest demo:')) {
      closestDemo = line.replace(/^- Closest demo:\s*/, '').trim()
    }
  }

  // Extract canonical JSX snippet (first ```tsx block in markdown)
  const jsxMatch = markdown.match(/```tsx\r?\n([\s\S]*?)\r?\n```/)
  const canonicalJsx = jsxMatch ? jsxMatch[1].trim() : null

  // Split by H2 sections (## Section)
  const sectionChunks = markdown.split(/^##\s+/m)
  const sections: Record<string, GuidelineSection> = {}
  const orderedSectionTitles: string[] = []
  let evidenceAndLimits: MarkdownBlock[] | undefined

  for (let i = 1; i < sectionChunks.length; i++) {
    const chunk = sectionChunks[i]
    const firstNewline = chunk.indexOf('\n')
    const sectionTitle = (firstNewline === -1 ? chunk : chunk.slice(0, firstNewline)).trim()
    const sectionBody = firstNewline === -1 ? '' : chunk.slice(firstNewline + 1)

    if (sectionTitle === 'Evidence and limits') {
      evidenceAndLimits = parseMarkdownBlocks(sectionBody.trim())
      continue
    }

    orderedSectionTitles.push(sectionTitle)

    // Extract Live demo variant
    const variantMatch = sectionBody.match(/\*\*Live demo variant:\*\*\s*`([^`]+)`/)
    const variantName = variantMatch ? variantMatch[1].trim() : null

    // Strip Live demo variant line
    let cleanBody = sectionBody.replace(/\*\*Live demo variant:\*\*\s*`[^`]+`\r?\n*/g, '')
    // In Overview, strip canonical JSX snippet so it's not duplicated in prose
    if (sectionTitle === 'Overview') {
      cleanBody = cleanBody.replace(/```tsx[\s\S]*?```\r?\n*/g, '').trim()
    }

    const blocks = parseMarkdownBlocks(cleanBody.trim())

    sections[sectionTitle] = {
      title: sectionTitle,
      variantName,
      rawContent: sectionBody,
      blocks
    }
  }

  const slug = publicExport ? publicExport.replace(/^skytrack-ui\//, '') : fallbackSlug

  return {
    slug,
    title,
    description,
    packageVersion,
    publicExport,
    implementation,
    publicTypeDeclaration,
    showcaseDemoId: showcaseDemoId ?? slug,
    closestDemo,
    canonicalJsx,
    sections,
    orderedSectionTitles,
    evidenceAndLimits
  }
}

export function parseMarkdownBlocks(text: string): MarkdownBlock[] {
  const lines = text.split(/\r?\n/)
  const blocks: MarkdownBlock[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i++
      continue
    }

    // Code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++ // skip closing ```
      blocks.push({
        type: 'code',
        code: codeLines.join('\n'),
        language: lang || undefined
      })
      continue
    }

    // Heading (### or ####)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim()
      })
      i++
      continue
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const bqLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        bqLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      blocks.push({
        type: 'blockquote',
        text: bqLines.join(' ')
      })
      continue
    }

    // Table
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }

      if (tableLines.length >= 2) {
        const headers = splitTableRow(tableLines[0])
        const rows: string[][] = []

        for (let r = 1; r < tableLines.length; r++) {
          if (/^\|?\s*[:\-\s|]+\s*\|?$/.test(tableLines[r])) continue // separator row
          rows.push(splitTableRow(tableLines[r]))
        }

        blocks.push({
          type: 'table',
          headers,
          rows
        })
      }
      continue
    }

    // Unordered List
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length) {
        const l = lines[i].trim()
        if (l.startsWith('- ') || l.startsWith('* ')) {
          items.push(l.slice(2).trim())
          i++
        } else if (
          l &&
          !l.startsWith('|') &&
          !l.startsWith('#') &&
          !l.startsWith('```') &&
          !l.startsWith('> ') &&
          items.length > 0
        ) {
          // Continuation of previous list item
          items[items.length - 1] += ' ' + l
          i++
        } else {
          break
        }
      }
      blocks.push({
        type: 'list',
        ordered: false,
        items
      })
      continue
    }

    // Ordered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length) {
        const l = lines[i].trim()
        const m = l.match(/^\d+\.\s+(.+)$/)
        if (m) {
          items.push(m[1].trim())
          i++
        } else if (
          l &&
          !l.startsWith('|') &&
          !l.startsWith('#') &&
          !l.startsWith('```') &&
          !l.startsWith('> ') &&
          items.length > 0
        ) {
          items[items.length - 1] += ' ' + l
          i++
        } else {
          break
        }
      }
      blocks.push({
        type: 'list',
        ordered: true,
        items
      })
      continue
    }

    // Paragraph
    const pLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('> ') &&
      !lines[i].trim().startsWith('```')
    ) {
      pLines.push(lines[i].trim())
      i++
    }

    if (pLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: pLines.join(' ')
      })
    }
  }

  return blocks
}
