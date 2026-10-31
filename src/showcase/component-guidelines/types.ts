export type MarkdownBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'blockquote'; text: string }
  | { type: 'code'; code: string; language?: string }

export interface GuidelineSection {
  title: string
  variantName: string | null
  rawContent: string
  blocks: MarkdownBlock[]
}

export interface ParsedGuideline {
  slug: string
  title: string
  description: string
  packageVersion?: string
  publicExport?: string
  implementation?: string
  publicTypeDeclaration?: string
  showcaseDemoId?: string
  closestDemo?: string
  canonicalJsx: string | null
  sections: Record<string, GuidelineSection>
  orderedSectionTitles: string[]
  evidenceAndLimits?: MarkdownBlock[]
}
