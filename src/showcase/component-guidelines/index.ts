import { parseGuidelineMarkdown } from './parser'
import type { ParsedGuideline } from './types'
import type { DesignerPracticeRegistry } from './practice-types'

export * from './types'
export * from './parser'
export * from './markdown-renderer'
export * from './guideline-sheet'
export * from './designer-guideline-sheet'

const markdownFiles = import.meta.glob<string>('../../../skills/skytrack-ui/references/knowledge/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

const designerMarkdownFiles = import.meta.glob<string>(
  '../../../skills/skytrack-ui/references/knowledge/designer/*.md',
  {
    query: '?raw',
    import: 'default',
    eager: true
  }
)

export const guidelinesBySlug: Record<string, ParsedGuideline> = {}

for (const [filePath, content] of Object.entries(markdownFiles)) {
  const filename = filePath.split('/').pop()
  if (!filename || filename.startsWith('_') || filename === 'README.md') continue
  const fallbackSlug = filename.replace('.md', '')
  guidelinesBySlug[fallbackSlug] = parseGuidelineMarkdown(content, fallbackSlug)
}

export const designerGuidelinesBySlug: Record<string, ParsedGuideline> = {}

for (const [filePath, content] of Object.entries(designerMarkdownFiles)) {
  const filename = filePath.split('/').pop()
  if (!filename || filename.startsWith('_') || filename === 'README.md') continue
  const fallbackSlug = filename.replace('.md', '')
  designerGuidelinesBySlug[fallbackSlug] = parseGuidelineMarkdown(content, fallbackSlug)
}

const designerPracticeModules = import.meta.glob<{ designerPracticeRegistry: DesignerPracticeRegistry }>(
  './practices/designer-practices-*.tsx',
  { eager: true }
)

export const designerPracticesBySlug: DesignerPracticeRegistry = Object.assign(
  {},
  ...Object.values(designerPracticeModules).map((module) => module.designerPracticeRegistry)
)
