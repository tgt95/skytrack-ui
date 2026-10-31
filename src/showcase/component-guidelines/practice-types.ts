import type { ReactNode } from 'react'

export const DESIGNER_GUIDELINE_TOPICS = ['Usage', 'Types', 'Behavior', 'Layout', 'Accessibility', 'Content'] as const

export type DesignerGuidelineTopic = (typeof DESIGNER_GUIDELINE_TOPICS)[number]

export interface DesignerPracticePair {
  recommended: ReactNode
  discouraged: ReactNode
}

export type DesignerPracticeRegistry = Record<string, Partial<Record<DesignerGuidelineTopic, DesignerPracticePair[]>>>
