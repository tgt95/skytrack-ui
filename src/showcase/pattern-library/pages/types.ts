import type { PatternId } from '../catalog'

export type SourceStatus = 'Universal' | 'Additional local topic' | 'Community maintained' | 'Community catalog only'

export type SourceCitation = {
  path: string
  heading: string
  lines?: string
  note?: string
  related?: Array<{ path: string; lines?: string; note?: string }>
}

export type ContentBlock =
  | { type: 'prose'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | {
      type: 'variants'
      items: Array<{
        title: string
        whenToUse?: string
        whenNotToUse?: string
        body?: string[]
      }>
    }
  | {
      type: 'callout'
      kind: 'note' | 'warning' | 'do' | 'dont' | 'source-limit' | 'local-interpretation'
      text: string
    }
  | { type: 'media-ref'; label: string; sourceAsset?: string; altIntent?: string }
  | {
      type: 'related'
      items: Array<{ label: string; path?: string; kind?: 'component' | 'pattern' | 'guideline' | 'reference' }>
    }

export type SectionNode = {
  id: string
  heading: string
  level: 2 | 3 | 4 | 5
  subpageId?: 'overview' | 'usage' | 'flows' | 'content'
  experimentalStatus?: 'Preview'
  blocks: ContentBlock[]
  demoRefs?: string[]
  children?: SectionNode[]
  _sourceCitation: SourceCitation
}

export type DemoRef = {
  id: string
  title: string // Exact verbatim match with PATTERN_EXAMPLE_TEACHING / demos.tsx
  sectionId: string // Primary SectionNode.id or 'UNMAPPED'
  secondarySectionIds?: string[]
  mappingStatus: 'mapped' | 'partial-divergent' | 'local-interpretation' | 'UNMAPPED'
  scenario: string
  teaching: {
    meaning: string
    decision: string
    consider: string
  }
  interactive: boolean
  _demoNote?: string
}

export type PageNote = {
  kind: 'accessibility' | 'content' | 'source-limit' | 'implementation'
  text: string
}

export type PatternPageDraft = {
  id: PatternId
  title: string
  group: 'Core' | 'Community'
  source: {
    status: SourceStatus
    subpages?: Array<{ id: 'overview' | 'usage' | 'flows' | 'content'; title: string; order: number; _path: string }>
    catalogEvidence?: string
    limits?: string[]
    _primaryPath: string
    _primaryLines?: string
    _relatedSources?: Array<{ path: string; lines?: string }>
    _excludedSections: string[]
    _upstreamAnomalies?: string[]
  }
  summary: string
  sections: SectionNode[]
  demos: DemoRef[]
  notes?: PageNote[]
  _implementationNotes?: string[]
  components?: string[]
}
