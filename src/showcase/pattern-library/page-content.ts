import type { PatternId } from './catalog'

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

export const PAGE_COMMON_ACTIONS: PatternPageDraft = {
  id: 'common-actions',
  title: 'Common actions',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/common-actions/index.md',
    _excludedSections: ['### Quick Navigation (lines 14–27)']
  },
  summary:
    'Standardized action verbs recur across forms, tables, dialogs, and navigation flows. Using each verb consistently prevents users from confusing attachment with creation, clearing with resetting, or non-destructive removal with permanent destruction.',
  sections: [
    {
      id: 'add',
      heading: 'Add',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Add attaches an existing record, user, or resource into a collection, list, or workspace without creating a brand-new item from scratch.'
        }
      ],
      demoRefs: ['common-actions-add'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Add', lines: '30–37' },
      children: [
        {
          id: 'add-hierarchy-and-placement',
          heading: 'Hierarchy and placement',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Size visual prominence—high, medium, or low emphasis—to match how central adding is on the screen. Reserve the single primary action style for pages where adding is the main task, and keep secondary or subtle treatments when adding supports other work.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/common-actions/index.md',
            heading: '### Hierarchy and placement',
            lines: '39–44'
          }
        },
        {
          id: 'add-considerations',
          heading: 'Considerations',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Clarify operational consequences before letting an operator attach an item:'
            },
            {
              type: 'list',
              items: [
                'Consequences: clarify any billing, access-control, or compliance side effects triggered by adding the item.',
                'Permissions: confirm the operator holds rights to attach to the destination before offering the trigger.',
                'Reversibility: state whether the relationship change is permanent or easily reversed.',
                'Duration: set realistic expectations when attachment spans seconds, minutes, hours, or days.',
                'Failure recovery: explain what happened and how to retry or roll back if attachment fails.',
                'Scope: make single-item versus bulk attachment unmistakable.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '### Considerations', lines: '45–57' }
        }
      ]
    },
    {
      id: 'cancel',
      heading: 'Cancel',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Cancel halts an active workflow and dismisses its modal, drawer, or editing mode. Render Cancel as a secondary button or inline link, and warn users explicitly if stopping mid-task risks discarding unsaved entries or corrupting work.'
        }
      ],
      demoRefs: ['common-actions-cancel'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Cancel', lines: '58–68' }
    },
    {
      id: 'clear',
      heading: 'Clear',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Clear empties entered characters, removes active multi-select choices, or clears content such as a live log while keeping the control ready for new input. For controls that carry an inherent baseline choice—such as radio button groups—Clear restores that default selection instead of leaving the group blank. Place a trailing close icon on the right edge of the field, chip, or value.'
        }
      ],
      demoRefs: ['common-actions-clear'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Clear', lines: '70–81' }
    },
    {
      id: 'close',
      heading: 'Close',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Close dismisses a window, panel, popover, menu, or toast notice without cancelling an underlying workflow. Render Close as an icon control anchored in the upper-right corner—never label a standard footer button Close.'
        }
      ],
      demoRefs: ['common-actions-close'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Close', lines: '83–93' }
    },
    {
      id: 'copy',
      heading: 'Copy',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Copy produces a separate duplicate of an identifier, snippet, or record while leaving the original untouched. Pair a copy icon trigger with brief confirmation feedback—such as a "Copied" tooltip immediately after click or tap.'
        }
      ],
      demoRefs: ['common-actions-copy'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Copy', lines: '95–104' }
    },
    {
      id: 'delete',
      heading: 'Delete',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Delete destroys the object rather than unlinking it and is usually permanent or difficult to reverse. When an item is easy to recreate or an immediate Undo is available, a lightweight action can be appropriate; confirm deletion when the potential loss is consequential.'
        }
      ],
      demoRefs: ['common-actions-delete'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Delete', lines: '106–116' },
      children: [
        {
          id: 'delete-low-impact',
          heading: 'Low-impact deletion',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When recreating or undoing the item is trivial, delete immediately on click or tap without interrupting the operator with a confirmation dialog.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/common-actions/index.md',
            heading: '### Low-impact deletion',
            lines: '118–122'
          }
        },
        {
          id: 'delete-moderate-impact',
          heading: 'Moderate-impact deletion',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When an object cannot be restored easily or when multiple items are selected at once, ask for explicit dialog confirmation explaining what will happen if deletion proceeds.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/common-actions/index.md',
            heading: '### Moderate-impact deletion',
            lines: '123–130'
          }
        },
        {
          id: 'delete-high-impact',
          heading: 'High-impact deletion',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When deletion destroys critical data, cascades to dependent records, or requires costly rebuilds, require both a danger dialog explaining consequences and manual typing of the exact resource name before enabling deletion.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/common-actions/index.md',
            heading: '### High-impact deletion',
            lines: '131–139'
          }
        },
        {
          id: 'delete-post-deletion',
          heading: 'Post-deletion feedback and recovery',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'After confirming deletion, return the user to the parent list view, animate the deleted row out smoothly, and surface a confirmation notification. If deletion fails, notify the user immediately, restore the item visually into the list where possible, and send a secondary alert through another channel (such as email) when supported.'
            }
          ],
          _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '### Post-deletion', lines: '140–149' }
        }
      ]
    },
    {
      id: 'edit',
      heading: 'Edit',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Edit updates values on an existing record or enters an editable state for a targeted field. Expose Edit through an overflow menu item, an explicit button, or an edit icon close to the record.'
        }
      ],
      demoRefs: ['common-actions-edit'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Edit', lines: '150–162' }
    },
    {
      id: 'errors',
      heading: 'Errors',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Errors appear across full-page fallbacks, modals, inline alerts, and compact field placements whenever an action cannot finish. State clearly what failed and give users a productive next step—such as returning to a working state, consulting support, or trying a concrete fix. Use inline error alerts inside tight input areas where space is constrained.'
        }
      ],
      demoRefs: ['common-actions-errors'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Errors', lines: '164–180' },
      children: [
        {
          id: 'errors-content-guidelines',
          heading: 'Content guidelines',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Keep copy concise, transparent, and supportive: explain what occurred and what action resolves it. Limit full-page and large-modal errors to at most three lines of paragraph text, and keep form field errors to two lines or fewer.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/common-actions/index.md',
            heading: '### Content guidelines',
            lines: '181–188'
          }
        }
      ]
    },
    {
      id: 'next',
      heading: 'Next',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Next steps an operator forward in a numbered sequence or wizard without completing the final submission. Represent Next as a button paired with a forward arrow icon or as a standalone forward icon control.'
        }
      ],
      demoRefs: ['common-actions-next'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Next', lines: '189–199' }
    },
    {
      id: 'refresh',
      heading: 'Refresh',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Refresh requests updated records for the current object, table, or list when displayed state falls behind server data. Present Refresh using a refresh icon trigger or button while preserving active view filters.'
        }
      ],
      demoRefs: ['common-actions-refresh'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Refresh', lines: '201–210' }
    },
    {
      id: 'remove',
      heading: 'Remove',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Remove detaches or moves one or more items out of a list, group, or container while preserving the source object elsewhere. Keep the distinction from destructive deletion unmistakable.'
        }
      ],
      demoRefs: ['common-actions-remove'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Remove', lines: '212–220' },
      children: [
        {
          id: 'remove-hierarchy-and-placement',
          heading: 'Hierarchy and placement',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Represent Remove with a secondary/subtle button or a subtract glyph. Removal is seldom the main workflow on a page and should avoid primary visual emphasis.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/common-actions/index.md',
            heading: '### Hierarchy and placement',
            lines: '222–226'
          }
        },
        {
          id: 'remove-considerations',
          heading: 'Considerations',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Operational impact: clarify billing, permission, or compliance effects before unlinking.',
                'Clarity against deletion: reassure users that the underlying record survives unless detachment revokes all access.',
                'Permissions: check whether the operator is allowed to modify the list membership.',
                'Permanence: inform the user explicitly if removing the relationship cannot be undone.',
                'Timeframe and failure recovery: state expected processing duration and fallback behavior on error.',
                'Scope: indicate whether one entry or a bulk selection will be detached.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '### Considerations', lines: '227–237' }
        }
      ]
    },
    {
      id: 'reset',
      heading: 'Reset',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Reset discards unapplied edits in filters or settings and restores values to the last saved checkpoint—specifically the configuration active when the operator last clicked Apply. Style Reset cleanly as an inline link or subtle action.'
        }
      ],
      demoRefs: ['common-actions-reset'],
      _sourceCitation: { path: 'patterns/common-actions/index.md', heading: '## Reset', lines: '238–248' }
    }
  ],
  demos: [
    {
      id: 'common-actions-add',
      title: 'Add',
      sectionId: 'add',
      mappingStatus: 'mapped',
      scenario: 'Attach an existing mission plan into the team review collection without creating a new record.',
      teaching: {
        meaning:
          'Add attaches an existing plan to a collection; it does not create a new plan. The user needs to include work already available elsewhere.',
        decision:
          'Use Add when the object already exists and the destination relationship changes. If adding is the page’s main task, use the single primary button and keep other actions secondary; if it is secondary, lower its visual emphasis.',
        consider:
          'Confirm permissions, operational consequences (access/billing), permanence, timeframe, failure recovery, and single-item versus bulk scope.'
      },
      interactive: true
    },
    {
      id: 'common-actions-cancel',
      title: 'Cancel',
      sectionId: 'cancel',
      mappingStatus: 'mapped',
      scenario: 'Close a route-edit dialog and discard the unsaved name while keeping the saved route unchanged.',
      teaching: {
        meaning: 'Cancel stops the current operation and leaves the user in the surrounding workflow.',
        decision:
          'Use it for an unfinished task the user can abandon; present it as a secondary button or link. Use Close to dismiss a surface and Clear to remove entered content.',
        consider:
          'State whether unsaved input is discarded or preserved, especially when work may take time to recreate; warn about data loss or corruption if abandoning the task creates that risk.'
      },
      interactive: true
    },
    {
      id: 'common-actions-clear',
      title: 'Clear',
      sectionId: 'clear',
      mappingStatus: 'mapped',
      scenario:
        'Clear entered search text or multi-select choices without resetting saved defaults or unrelated fields.',
      teaching: {
        meaning: 'Clear removes current field or selection contents while keeping the field and workflow available.',
        decision:
          'Use a close icon at the right edge of a field, item, or value to clear it; use Reset to restore the last applied or saved values.',
        consider:
          'For controls with a defined baseline selection (such as radio groups), Clear restores that default value rather than leaving nothing selected.'
      },
      interactive: true
    },
    {
      id: 'common-actions-close',
      title: 'Close',
      sectionId: 'close',
      mappingStatus: 'mapped',
      scenario: 'Dismiss a surface notice with an upper-right close icon while preserving underlying work.',
      teaching: {
        meaning:
          'Close dismisses a surface or ends a non-blocking presentation; it does not itself cancel the underlying task.',
        decision:
          'Use a close icon, usually at the upper-right of the surface, to dismiss a toast, panel, or other presentation. Do not label a button Close; use Cancel to stop an operation.',
        consider:
          'Keep the underlying work state clear after dismissal, and provide a way to find important updates again when needed.'
      },
      interactive: true
    },
    {
      id: 'common-actions-copy',
      title: 'Copy',
      sectionId: 'copy',
      mappingStatus: 'mapped',
      scenario: 'Copy a mission plan identifier for reuse while confirming the clipboard action.',
      teaching: {
        meaning: 'Copy makes an identical object or value available for reuse; it leaves the original intact.',
        decision:
          'Use it when duplication is the intended result, distinct from editing the original or adding an existing object.',
        consider:
          'Pair a copy icon trigger with brief confirmation feedback such as a “Copied” tooltip; avoid implying it stays linked to later changes in the original.'
      },
      interactive: true
    },
    {
      id: 'common-actions-delete',
      title: 'Delete',
      sectionId: 'delete',
      secondarySectionIds: ['delete-low-impact', 'delete-moderate-impact', 'delete-high-impact'],
      mappingStatus: 'mapped',
      scenario:
        'Compare immediate low-impact deletion, moderate-impact confirmation, and high-impact deletion warnings.',
      teaching: {
        meaning:
          'Delete destroys the selected object and is usually permanent or difficult to undo; Remove detaches it while leaving the object available.',
        decision:
          'Use it only when the user intends to destroy the object; scale confirmation to impact and reversibility.',
        consider:
          'For high-impact deletion, ask the user to type the resource name and explain what they will lose. After success, animate the item out of the list and confirm completion; if deletion fails, notify the user, restore the item when possible, and send a second alert through another channel when available.'
      },
      interactive: true,
      _demoNote:
        'High-impact confirmation now requires typing the plan name and states what is lost; low-impact and moderate-impact cases remain separate examples. Decorative trash icon/menu treatment is not modeled.'
    },
    {
      id: 'common-actions-edit',
      title: 'Edit',
      sectionId: 'edit',
      mappingStatus: 'mapped',
      scenario: 'Modify an existing mission name while preserving its identity and history.',
      teaching: {
        meaning: "Edit changes an existing object's information while keeping it the same object.",
        decision: 'Use Edit when users need to change saved values; offer it via a menu item, button, or edit icon.',
        consider: 'Show which values changed and make save, cancel, and validation outcomes understandable.'
      },
      interactive: true
    },
    {
      id: 'common-actions-errors',
      title: 'Errors',
      sectionId: 'errors',
      secondarySectionIds: ['errors-content-guidelines'],
      mappingStatus: 'mapped',
      scenario: 'Report a failed sync clearly within concise line caps and offer recovery only when retrying helps.',
      teaching: {
        meaning: 'Error feedback explains that an action failed and gives the user a useful next step.',
        decision:
          'Use an error message when refresh or another action cannot complete; offer Retry only when repeating the action can help.',
        consider:
          'Keep form errors to <= 2 lines and full-page or large-modal errors to <= 3 paragraph lines; redirect to a safe state, support, or concrete recovery actions.'
      },
      interactive: true
    },
    {
      id: 'common-actions-next',
      title: 'Next',
      sectionId: 'next',
      mappingStatus: 'mapped',
      scenario: 'Advance between ordered setup stages while retaining prior answers.',
      teaching: {
        meaning: 'Next advances to the next step in an ordered workflow; it does not imply final submission.',
        decision:
          'Use a button paired with a forward icon (or standalone forward icon) when another step follows; reserve final labels for submission.',
        consider:
          "Keep the step's purpose and progress clear, and avoid losing entered information when the user goes back."
      },
      interactive: true
    },
    {
      id: 'common-actions-refresh',
      title: 'Refresh',
      sectionId: 'refresh',
      mappingStatus: 'mapped',
      scenario: 'Request updated telemetry status while keeping the active filters and selection intact.',
      teaching: {
        meaning: 'Refresh requests current data again without intentionally changing filters or the underlying object.',
        decision:
          'Use a refresh icon or button when users need updated records and automatic updates are absent or insufficient.',
        consider:
          'Keep the selected filters and location, show loading and failure feedback, and avoid duplicate requests where possible.'
      },
      interactive: true
    },
    {
      id: 'common-actions-remove',
      title: 'Remove',
      sectionId: 'remove',
      secondarySectionIds: ['remove-hierarchy-and-placement', 'remove-considerations'],
      mappingStatus: 'partial-divergent',
      scenario: 'Detach a mission plan from an assignment group while keeping the underlying plan intact.',
      teaching: {
        meaning: 'Remove detaches an object from a collection while preserving the original object.',
        decision:
          'Represent Remove subtly (button or subtract icon) when the relationship should end without destroying the record.',
        consider:
          'Check access/billing/legal implications, permissions, whether unlinking is permanent, duration, failure recovery, and single vs. bulk scope; do not confuse Remove with Delete.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:518-520`) defaults to reversible "Undo removal" without showing a subtract icon or irreversible-detachment warning variant.'
    },
    {
      id: 'common-actions-reset',
      title: 'Reset',
      sectionId: 'reset',
      mappingStatus: 'mapped',
      scenario: 'Discard pending filter edits and return to the last applied settings, not factory defaults.',
      teaching: {
        meaning:
          'Reset restores the last applied or saved values; this may differ from initial defaults or blank values.',
        decision:
          'Use a subtle link-style trigger when operators want to revert unapplied settings to the last applied state.',
        consider: 'Tell users which values will change and whether reset applies immediately or needs confirmation.'
      },
      interactive: true,
      _demoNote:
        'The example keeps pending filter values separate from the last applied view; Reset restores that checkpoint.'
    }
  ],
  components: ['Button', 'Menu', 'Input', 'Alert', 'AlertDialog', 'Search']
}

export const PAGE_DIALOGS: PatternPageDraft = {
  id: 'dialogs',
  title: 'Dialogs',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/dialog-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 16–27)',
      '## References (lines 508–527)',
      '## Feedback (lines 528–534)'
    ]
  },
  summary:
    'Dialogs place a focused task or consequential message on top of an active workspace. Modal dialogs interrupt workflow until answered or dismissed; non-modal dialogs keep underlying content accessible for side-by-side work.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use dialogs to surface urgent notices, focused decisions, or lightweight supporting tasks without navigating away from the current screen.'
        }
      ],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Overview', lines: '28–39' },
      children: [
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a dialog',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Header: concise title matching the task or button label, optional context line above the title, and an upper-right close icon.',
                'Body content: form fields, message copy, or supporting controls—short-title confirmation dialogs may omit body text when the title itself carries the message.',
                'Action bar: footer action buttons with specific verb labels (such as Add, Save, or Delete); avoid vague "Done" or "OK" labels.',
                'Close icon: explicit upper-right dismiss trigger that exits without submitting.',
                'Backdrop overlay (modal dialogs only): dims and blocks interaction with the page behind.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Anatomy of a dialog (plus Title-as-message note in modal/usage.md:237–242)',
            lines: '40–59'
          }
        },
        {
          id: 'overview-when-to-use',
          heading: 'When to use a dialog',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose a dialog when an immediate decision, error acknowledgment, or short task belongs inline with the active screen—or when a floating helper needs to stay open alongside page work.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When to use a dialog',
            lines: '60–66'
          }
        },
        {
          id: 'overview-when-not-to-use',
          heading: 'When not to use a dialog',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Avoid dialogs for lengthy multi-step work, cross-record browsing, or passive background notices generated without user intent—route those to notifications, panels, or dedicated pages.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When not to use a dialog',
            lines: '67–73'
          }
        },
        {
          id: 'overview-dialog-types',
          heading: 'Dialog types',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Modal dialog',
                  whenToUse:
                    'The operator must respond, review urgent consequences, or resolve a blocking decision before touching the underlying view.',
                  whenNotToUse: 'The operator needs to read, copy, or manipulate the page behind the dialog.'
                },
                {
                  title: 'Non-modal dialog',
                  whenToUse:
                    'The operator benefits from a floating helper or inspector while keeping page controls interactive.',
                  whenNotToUse: 'The workflow requires a mandatory decision before allowing further page changes.'
                }
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Dialog types', lines: '74–98' }
        },
        {
          id: 'overview-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Best practices', lines: '99–100' },
          children: [
            {
              id: 'overview-use-sparingly',
              heading: 'Use dialogs sparingly',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Frequent modal interruptions break concentration and slow operators down; reserve blocking surfaces for truly high-value interruptions.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Use dialogs sparingly',
                lines: '101–108'
              }
            },
            {
              id: 'overview-user-initiated',
              heading: 'Dialogs should be user initiated',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Open a dialog directly from a user trigger—or an indirect consequence of an action just attempted (such as closing a dirty tab)—rather than from unsolicited background events.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Dialogs should be user initiated',
                lines: '109–120'
              }
            },
            {
              id: 'overview-keep-focused',
              heading: 'Keep dialog tasks simple and focused',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Limit a dialog to one self-contained goal that completes cleanly in place without sprawling layouts.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Keep dialog tasks simple and focused',
                lines: '121–129'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'modal-dialogs',
      heading: 'Modal dialogs',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Modal dialogs lock background content behind a dimmed overlay so the operator completes or dismisses the task before continuing.'
        }
      ],
      demoRefs: ['dialogs-modal-confirm'],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Modal dialogs', lines: '130–149' },
      children: [
        {
          id: 'modal-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### When to use', lines: '150–151' },
          children: [
            {
              id: 'modal-immediate-response',
              heading: 'An immediate response is required',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use when downstream workflow state depends on an immediate choice or short input before proceeding.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### An immediate response is required from the user',
                lines: '152–156'
              }
            },
            {
              id: 'modal-urgent-information',
              heading: 'Notify the user of urgent information',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use for critical warnings or blocking failures that operators must acknowledge immediately.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Notify the user of urgent information',
                lines: '157–162'
              }
            },
            {
              id: 'modal-confirm-decision',
              heading: 'Confirm a user decision',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use before committing irreversible or high-risk actions so the operator verifies scope and consequences (escalating to danger styling when destructive).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Confirm a user decision',
                lines: '163–169'
              }
            }
          ]
        },
        {
          id: 'modal-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When not to use',
            lines: '170–171'
          },
          children: [
            {
              id: 'modal-prevents-page-access',
              heading: 'Modals prevent access to the main page',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'If the operator needs to compare map coordinates, inspect underlying records, or run repeated actions against the workspace, choose a non-modal surface or side panel instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Modals prevent access to the main page',
                lines: '172–180'
              }
            },
            {
              id: 'modal-do-not-nest',
              heading: 'Do not nest modals',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Never stack one modal over another. Layering overlays disorients keyboard users and hides origin context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Don’t nest modals',
                lines: '181–186'
              }
            },
            {
              id: 'modal-no-full-page',
              heading: 'Do not make modals full page',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'A modal that fills the viewport signals the wrong container choice—navigate to a dedicated page or stepped flow instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Don’t make modals full page',
                lines: '187–192'
              }
            }
          ]
        },
        {
          id: 'modal-variants',
          heading: 'Modal variants',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Variant', 'Purpose', 'Footer actions'],
              rows: [
                ['Passive', 'Deliver non-blocking confirmation or status without requiring an action choice', 'None'],
                [
                  'Transactional',
                  'Collect short input or confirm/cancel an action (includes Danger variant for destructive commitments)',
                  'Cancel + Primary action (or Danger primary)'
                ],
                [
                  'Acknowledgment',
                  'Require explicit reading acknowledgment of an urgent system condition',
                  'Single specific acknowledgment button (avoid vague OK/Done)'
                ],
                [
                  'Progress',
                  'Guide a bounded multi-step dialog flow',
                  'Cancel + Previous + Next / final completion verb'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            related: [{ path: 'components/modal/usage.md', lines: '80–89' }],
            heading: '### Modal variants',
            lines: '193–205'
          }
        },
        {
          id: 'modal-dismissing',
          heading: 'Dismissing variant modals',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Passive modals close via the close icon, Escape key, or clicking the backdrop overlay. Transactional, Danger, Acknowledgment, and Progress modals close only on task completion, explicit Cancel, the close icon, or Escape—never on an accidental backdrop click.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Dismissing variant modals',
            lines: '206–225'
          }
        }
      ]
    },
    {
      id: 'non-modal-dialogs',
      heading: 'Non-modal dialogs',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Non-modal dialogs render floating surfaces without locking the page, allowing operators to inspect workspace items, switch focus freely, and move the panel if it obscures underlying details.'
        }
      ],
      demoRefs: ['dialogs-non-modal-inspect'],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Non-modal dialogs', lines: '226–239' },
      children: [
        {
          id: 'non-modal-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### When to use', lines: '240–241' },
          children: [
            {
              id: 'non-modal-page-access',
              heading: 'When access to the page is needed',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Choose non-modal when users must inspect or edit the active canvas—and optionally reposition the floating panel so nothing stays hidden.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### When access to the page is needed',
                lines: '242–251'
              }
            },
            {
              id: 'non-modal-accelerate-workflow',
              heading: 'Aid or accelerate a workflow',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Support repeatable utilities such as find-and-replace or quick property adjustments across multiple selections without reopening a dialog on every step.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Aid or accelerate a user’s work flow',
                lines: '252–259'
              }
            },
            {
              id: 'non-modal-additional-info',
              heading: 'Display additional information',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Surface supplemental contextual records or hints while keeping primary work uninterrupted.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Display additional information',
                lines: '260–265'
              }
            }
          ]
        },
        {
          id: 'non-modal-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When not to use',
            lines: '266–267'
          },
          children: [
            {
              id: 'non-modal-not-for-required-response',
              heading: 'Do not use if a response is required',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'If continuing safely requires an immediate user answer or confirmation, block the page with a modal instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Don’t use if the user’s response is required',
                lines: '268–272'
              }
            }
          ]
        },
        {
          id: 'non-modal-variants',
          heading: 'Non-modal variants',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Passive non-modal',
                  whenToUse: 'Supplemental information or preview without embedded footer actions.'
                },
                {
                  title: 'Transactional non-modal',
                  whenToUse:
                    'One or more repeatable action triggers (such as Find Next / Replace) that stay open across invocations until manually closed.'
                }
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Non-modal variants',
            lines: '273–279'
          }
        },
        {
          id: 'non-modal-dismissing',
          heading: 'Dismissing non-modal dialogs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Non-modal dialogs close intentionally via the header close icon, Cancel, or Escape. Clicking onto the surrounding workspace keeps the dialog open so users can reference both.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Dismissing non-modal dialogs',
            lines: '280–289'
          }
        }
      ]
    },
    {
      id: 'designing-with-dialogs',
      heading: 'Designing with dialogs',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Consistent button grouping, focus management, sizing, and component restraint keep dialogs fast to scan and reliable under keyboard navigation.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/dialog-pattern/index.md',
        heading: '## Designing with dialogs',
        lines: '290–291'
      },
      children: [
        {
          id: 'designing-button-groups',
          heading: 'Button groups',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Anchor the footer cleanly along the bottom edge, keeping Cancel farthest left and at most one primary action farthest right. Wait—note that full-bleed 25%/50% spans reflect container-edge styling conventions alongside padded dialog footers.'
            }
          ],
          demoRefs: ['dialogs-button-groups'],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            related: [{ path: 'components/modal/style.md', lines: '108–118' }],
            heading: '### Button groups',
            lines: '292–305'
          },
          children: [
            {
              id: 'button-groups-one',
              heading: 'One button',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Used for single-action acknowledgments, spanning 50% width aligned to the right edge with specific labeling rather than vague "Done" or "OK".'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### One button',
                lines: '306–312'
              }
            },
            {
              id: 'button-groups-two',
              heading: 'Two buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Splits the footer 50/50 between secondary Cancel on the left and the primary commitment action on the right.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Two buttons',
                lines: '313–318'
              }
            },
            {
              id: 'button-groups-three',
              heading: 'Three buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Uses 25%-width action slots right-aligned after left-anchored Cancel, applying primary emphasis strictly to the rightmost action—or styling all three secondary when equal weight is intended.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Three buttons',
                lines: '319–325'
              }
            },
            {
              id: 'button-groups-progress',
              heading: 'Progress indicator buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Places ghost-style Cancel (25%) at the far left opposite secondary Previous (25%) and primary Next (25%) on the right, renaming Next on the final step to the concrete completion verb.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Progress indicator buttons',
                lines: '326–336'
              }
            }
          ]
        },
        {
          id: 'designing-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Behaviors', lines: '337–338' },
          children: [
            {
              id: 'behaviors-trigger',
              heading: 'Trigger',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Launch modals from clear interactive triggers such as toolbar actions, menu items, links, or status errors without auto-spawning unexpectedly.'
                }
              ],
              _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '#### Trigger', lines: '339–344' }
            },
            {
              id: 'behaviors-focus',
              heading: 'Focus',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'On open, trap keyboard focus inside the dialog and move focus directly to the first interactive body control (or to the primary footer action when the body contains no inputs). Return focus to the invoking trigger on close.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                related: [{ path: 'components/modal/usage.md', lines: '265' }],
                heading: '#### Focus',
                lines: '345–350'
              }
            },
            {
              id: 'behaviors-scrolling',
              heading: 'Scrolling',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Constrain dialogs to four responsive height tiers (xs 48%, sm 72%, md 84%, lg 96% viewport max-height; full-height scrolling on mobile viewports). Keep the header and footer fixed while only the body scrolls vertically with edge fades; never introduce horizontal scrolling.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                related: [{ path: 'components/modal/style.md', lines: '133–196' }],
                heading: '#### Scrolling',
                lines: '351–356'
              }
            },
            {
              id: 'behaviors-validation',
              heading: 'Validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep invalid dialogs open until fixed. Validate client rules when focus leaves each field (on blur) and clear errors immediately once corrected; display server-side failures in an inline alert, and favor constrained controls (radios, selects) to prevent typos.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Validation',
                lines: '357–384'
              }
            },
            {
              id: 'behaviors-task-completion-loading',
              heading: 'Task completion and loading',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'For short processing waits inside a modal, display body-level loading feedback and lock the primary button against duplicate submission (or show inline button loading). If an operation takes more than a few seconds, close or hand off the dialog and surface measurable progress cleanly elsewhere on screen.'
                }
              ],
              demoRefs: ['dialogs-long-task-progress'],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                related: [{ path: 'components/modal/usage.md', lines: '283–285' }],
                heading: '#### Task completion and loading',
                lines: '385–399'
              }
            }
          ]
        },
        {
          id: 'designing-using-components',
          heading: 'Using components',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Select simple inputs, selection lists, switches, and structured summaries inside dialog bodies, avoiding patterns that pull attention away or create heavy nesting:'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Using components',
            lines: '400–408'
          },
          children: [
            {
              id: 'using-components-no-exit-links',
              heading: 'Avoid components that direct the user away from the dialog',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep external navigation links out of dialog copy so operators are not pulled mid-task away from an unfinished modal decision.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Avoid components that will direct the user away from the dialog',
                lines: '409–415'
              }
            },
            {
              id: 'using-components-no-hidden-info',
              heading: 'Avoid components that hide information',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Do not place tabs or accordions inside a dialog; if content needs multiple panes, move the workflow to a side panel, tearsheet, or dedicated page.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Avoid components that hide information',
                lines: '416–424'
              }
            },
            {
              id: 'using-components-no-complex-tables',
              heading: 'Avoid complex interactions with data tables',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep any embedded table selection-only rather than exposing inline row editing, filters, or overflow action menus—or swap to structured lists or tiles.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Avoid complex interactions with data tables',
                lines: '425–443'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Accessibility', lines: '445–446' },
      children: [
        {
          id: 'a11y-focus',
          heading: 'Focus management',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Move focus directly onto the first focusable body input when opening a modal (never landing first on footer buttons when inputs exist), confine Tab and Shift+Tab within the dialog, and restore focus to the opener button upon close.'
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Focus', lines: '447–469' }
        },
        {
          id: 'a11y-keyboard-navigation',
          heading: 'Keyboard navigation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Support Escape to dismiss non-critical dialogs cleanly, Tab/Shift+Tab to cycle controls, Space/Enter to toggle selections, and Enter on text inputs or focused actions only where safe.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Keyboard navigation',
            lines: '470–476'
          }
        },
        {
          id: 'a11y-tab-order',
          heading: 'Tab order',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'First interactive control inside the dialog body',
                'Remaining body controls left-to-right, top-to-bottom',
                'Primary footer action',
                'Secondary footer action (Cancel)',
                'Header close (×) icon button last'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Tab order', lines: '477–485' }
        },
        {
          id: 'a11y-aria',
          heading: 'ARIA semantics',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Expose modal dialog role and title labeling, mark background content inert when modal, and describe urgency accurately when confirmation guards destructive state.'
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### ARIA', lines: '486–491' }
        }
      ]
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Dialog', kind: 'component' },
            { label: 'Button', kind: 'component' },
            { label: 'Common actions', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/dialog-pattern/index.md',
        heading: '## Related components and patterns',
        lines: '492–507'
      }
    }
  ],
  demos: [
    {
      id: 'dialogs-modal-confirm',
      title: 'Modal · confirm a route change',
      sectionId: 'modal-dialogs',
      secondarySectionIds: ['modal-confirm-decision', 'behaviors-validation'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Ask for the replacement route name before the pilot confirms a consequential change, then show the confirmation after the modal closes.',
      teaching: {
        meaning:
          'A modal asks the user to decide before returning to the blocked page. It fits a consequential route change only when confirmation is required to continue.',
        decision:
          'Use a modal for a required response or urgent information; keep the task short and user-initiated. Use a non-modal surface when the page must remain accessible.',
        consider:
          'Validate the required route name on confirmation; clear the inline error as soon as the name is valid and keep focus inside the modal.'
      },
      interactive: true,
      _demoNote:
        'The route-name field validates on blur and on confirmation; entering a valid name clears the inline error before the local confirmation closes the modal.'
    },
    {
      id: 'dialogs-non-modal-inspect',
      title: 'Non-modal · inspect a route while keeping the page available',
      sectionId: 'non-modal-dialogs',
      secondarySectionIds: ['non-modal-page-access'],
      mappingStatus: 'mapped',
      scenario: 'Keep waypoint details readable beside the map or table without blocking interaction on the main page.',
      teaching: {
        meaning: 'A non-modal dialog presents supporting information while users can still work with the page.',
        decision:
          'Choose it when the user benefits from extra detail—or repeatable workflow helpers—without blocking access to underlying controls.',
        consider:
          'Keep the floating surface dismissible via close icon, Cancel, or Escape rather than outside clicks, and avoid obscuring underlying reference details.'
      },
      interactive: true
    },
    {
      id: 'dialogs-button-groups',
      title: 'Button groups · one, two, or three decisions',
      sectionId: 'designing-button-groups',
      secondarySectionIds: ['button-groups-one', 'button-groups-two', 'button-groups-three', 'button-groups-progress'],
      mappingStatus: 'partial-divergent',
      scenario: 'Compare single-action acknowledgment, two-button confirmation, and multi-decision dialog footers.',
      teaching: {
        meaning:
          'Dialog actions should make the available choice and its consequence clear. More choices add comparison work.',
        decision:
          'Use one action for explicit acknowledgment, two for Cancel + Primary confirmation, three only when a third distinct choice is essential, and Progress groups for bounded multi-step dialogs.',
        consider:
          'Put Cancel at the far left and at most one Primary action farthest right; replace vague labels like "Done" or "OK" with outcome verbs like "Acknowledge".'
      },
      interactive: true,
      _demoNote:
        'Acknowledgment uses an outcome verb and the required-response dialog now presents three distinct choices. Footer spacing remains package-specific.'
    },
    {
      id: 'dialogs-long-task-progress',
      title: 'Show progress after confirming a longer task',
      sectionId: 'behaviors-task-completion-loading',
      mappingStatus: 'partial-divergent',
      scenario:
        'After a dispatcher confirms a longer route check, close the dialog and show persistent on-page progress until validation completes.',
      teaching: {
        meaning:
          'A progress indicator communicates that a confirmed dialog task is still underway without trapping the operator inside a frozen modal.',
        decision:
          'Use inside-dialog loading for short waits, and hand off to persistent page-level progress whenever work takes longer than a few seconds.',
        consider:
          'Do not leave users unsure whether the dialog can close or whether the action finished; provide clear completion and failure recovery.'
      },
      interactive: true,
      _demoNote:
        'A confirmation dialog now starts the route check and closes before page-level progress appears; failure recovery remains outside this sample.'
    }
  ],
  notes: [
    {
      kind: 'implementation',
      text: 'SkyTrack DialogFooter uses aligned padded action spacing; if building edge-to-edge modal footers, note the full-bleed 50%/25% layout conventions in the source design.'
    }
  ],
  components: ['Dialog', 'AlertDialog', 'Button', 'Progress']
}

export const PAGE_DISABLED_STATES: PatternPageDraft = {
  id: 'disabled-states',
  title: 'Disabled states',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/disabled-states/index.md',
    _excludedSections: ['### Quick Navigation (lines 16–23)']
  },
  summary:
    'Unavailable controls communicate why an action or value cannot change right now—choosing deliberately among default disabled, read-only, and hidden treatments based on prerequisites, value readability, and role permissions.',
  sections: [
    {
      id: 'disabled-variations',
      heading: 'Disabled variations',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select among three distinct treatments depending on whether the user must resolve a dependency, inspect a locked value, or lacks permission to know a capability exists:'
        },
        {
          type: 'table',
          columns: ['Variation', 'Cause', 'Visibility', 'Screen reader & keyboard access'],
          rows: [
            [
              'Default disabled',
              'Temporarily unmet prerequisite or system dependency',
              'Visible at reduced opacity',
              'Not focusable and not read by screen readers'
            ],
            [
              'Read-only',
              'Value locked by role or workflow but still relevant to read',
              'Visible at normal readable contrast without interactive styling',
              'Focusable, readable, and copyable'
            ],
            [
              'Hidden',
              'Excluded by assigned user permissions or role',
              'Removed completely from view',
              'Absent from visual layout and assistive tree'
            ]
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/disabled-states/index.md', heading: '## Disabled variations', lines: '24–31' }
    },
    {
      id: 'default-disabled',
      heading: 'Default disabled',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Apply default disabled styling when an action or input is temporarily blocked by an unmet prerequisite or software dependency and will re-enable once the user resolves that condition. Never hide a control merely because a prerequisite is currently unsatisfied.'
        }
      ],
      demoRefs: ['disabled-states-default'],
      _sourceCitation: { path: 'patterns/disabled-states/index.md', heading: '## Default disabled', lines: '32–45' },
      children: [
        {
          id: 'default-disabled-style',
          heading: 'Visual styling and interaction',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Control container and icons render at 50% opacity; labels and value text render at 25% opacity.',
                'Hover styling is completely disabled.',
                'Pointer hover displays the not-allowed cursor to reinforce unavailability.',
                'Controls remain skipped by keyboard navigation and screen readers; explain any prerequisite in persistent nearby copy so everyone can discover how to unlock the control.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/disabled-states/index.md', heading: '### Style', lines: '46–64' }
        },
        {
          id: 'default-disabled-additional-warning',
          heading: 'Additional warning for blocking conditions',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Whenever a disabled state blocks the flow’s primary action or disables multiple interactive items at once, add an inline warning notification nearby stating exactly how to re-enable the blocked workflow.'
            }
          ],
          demoRefs: ['disabled-states-warning'],
          _sourceCitation: {
            path: 'patterns/disabled-states/index.md',
            heading: '### Additional warning',
            lines: '66–75'
          }
        }
      ]
    },
    {
      id: 'read-only',
      heading: 'Read-only',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use read-only rather than default disabled when a control cannot be modified in the current context yet its value remains needed for review, copying, or screen-reader inspection.'
        }
      ],
      demoRefs: ['disabled-states-read-only'],
      _sourceCitation: { path: 'patterns/disabled-states/index.md', heading: '## Read-only', lines: '77–84' },
      children: [
        {
          id: 'read-only-style',
          heading: 'Styling restrictions',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Preserve high legibility and assistive-technology discoverability while removing every cue of mutability: never apply primary brand or interactive accent tokens, hover transitions, link underlines, or other clickable embellishments.'
            }
          ],
          _sourceCitation: { path: 'patterns/disabled-states/index.md', heading: '### Style', lines: '85–90' }
        }
      ]
    },
    {
      id: 'hidden',
      heading: 'Hidden',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Hide an element completely only when the user’s assigned role lacks permission to access or see it. Keep the control absent unless permissions change—never hide controls merely because of incomplete steps.'
        }
      ],
      demoRefs: ['disabled-states-hidden'],
      _sourceCitation: { path: 'patterns/disabled-states/index.md', heading: '## Hidden', lines: '91–106' }
    }
  ],
  demos: [
    {
      id: 'disabled-states-default',
      title: 'Default disabled · missing prerequisite',
      sectionId: 'default-disabled',
      secondarySectionIds: ['default-disabled-style'],
      mappingStatus: 'mapped',
      scenario:
        'Keep a primary launch control visible but blocked until the operator completes the preflight prerequisite.',
      teaching: {
        meaning: 'A disabled control shows an action exists but cannot run until a prerequisite is met.',
        decision:
          "Keep it visible when the user can satisfy the prerequisite; use read-only for inspectable values and hide actions outside the user's permission.",
        consider:
          'Default disabled controls are skipped by screen readers, so place prerequisite instructions in persistent readable helper text.'
      },
      interactive: false
    },
    {
      id: 'disabled-states-warning',
      title: 'Disabled with a warning · unsaved prerequisite',
      sectionId: 'default-disabled-additional-warning',
      mappingStatus: 'partial-divergent',
      scenario:
        'Unsaved route edits block the primary scheduling action; explain what needs to happen before the user can continue.',
      teaching: {
        meaning:
          'A warning adds explicit remediation guidance when an unmet prerequisite blocks a primary flow or disables several controls at once.',
        decision:
          'Use an inline warning alert specifically when a primary action or multi-item region is stalled—such as requiring unsaved edits to be saved before continuing.',
        consider: 'State the exact resolving step clearly without relying on color alone.'
      },
      interactive: false
    },
    {
      id: 'disabled-states-read-only',
      title: 'Read-only · value is available for review',
      sectionId: 'read-only',
      secondarySectionIds: ['read-only-style'],
      mappingStatus: 'mapped',
      scenario: 'Keep mission coordinates reviewable and accessible without implying the value can be edited here.',
      teaching: {
        meaning:
          'Read-only content remains available to inspect and read aloud while preventing edits in this context.',
        decision:
          'Choose read-only when users need the value for reference; choose disabled only when an interactive control is temporarily blocked.',
        consider: 'Keep values at high contrast without interactive brand colors, hover highlights, or underlines.'
      },
      interactive: false
    },
    {
      id: 'disabled-states-hidden',
      title: 'Hidden · action is outside this role’s permissions',
      sectionId: 'hidden',
      mappingStatus: 'mapped',
      scenario: 'Remove restricted administrative actions completely when the signed-in role lacks permission.',
      teaching: {
        meaning: "A hidden action is unavailable because the user's role should not see it.",
        decision:
          'Hide controls strictly for role permissions; keep temporarily blocked prerequisites visible as disabled.',
        consider: 'Do not hide actions simply because a user has not finished entering a form field.'
      },
      interactive: false
    }
  ],
  notes: [
    {
      kind: 'content',
      text: 'Cross-pattern note: Community Edit mentions disabled appearance for locked fields, whereas SkyTrack follows Core Read-only rules whenever operators must still inspect and navigate locked values.'
    }
  ],
  components: ['Button', 'Field', 'Alert']
}

export const PAGE_DISCLOSURES: PatternPageDraft = {
  id: 'disclosures',
  title: 'Disclosures',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/disclosures-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 13–24)',
      '## References (lines 556–573)',
      '## Feedback (lines 574–578)'
    ],
    _upstreamAnomalies: [
      'Maintained source defines disclosures strictly as user-triggered Popover/Menu controls (up to 6 columns wide). The fourth existing demo ("Inline disclosure · supporting details", built with Collapsible) has no maintained section here and is flagged UNMAPPED.'
    ]
  },
  summary:
    'Disclosures open a lightweight, user-initiated popover or menu panel anchored to a trigger control so operators can view account tools, filter settings, or grouped alternatives without losing their place on the page.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Every maintained disclosure pairs two elements: an interactive trigger control and a floating popover panel capable of holding richer text, links, or interactive form controls than a plain informational tooltip.'
        }
      ],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Overview', lines: '25–35' },
      children: [
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a disclosure when secondary controls, session actions, or view settings belong near an interactive trigger without dedicating permanent canvas space or interrupting work with a full dialog.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### When to use', lines: '36–44' }
        },
        {
          id: 'overview-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not place critical warnings, required workflow forms, or sprawling layouts inside a popover—promote required confirmations to dialogs and complex tasks to side panels or dedicated pages.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### When not to use',
            lines: '45–54'
          }
        },
        {
          id: 'overview-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '55–56'
          },
          children: [
            {
              id: 'best-practices-reasonable-size',
              heading: 'Keep disclosures at a reasonable size',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep floating panels compact and scannable—never wider than six layout columns on desktop screens.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keep disclosures at a reasonable size',
                lines: '57–65'
              }
            },
            {
              id: 'best-practices-user-initiated',
              heading: 'Disclosures should be user initiated',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Open disclosures strictly when the user activates the trigger control; never pop open panels automatically on page load or idle hover timers.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Disclosures should be user initiated',
                lines: '66–71'
              }
            },
            {
              id: 'best-practices-one-at-a-time',
              heading: 'One disclosure should open at a time',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Limit the screen to one active disclosure at once so opening a second disclosure automatically closes any previously open panel.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### One disclosure should open at a time',
                lines: '72–86'
              }
            },
            {
              id: 'best-practices-no-nesting',
              heading: 'Avoid nesting disclosures',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Do not launch secondary popovers inside an open disclosure. The lone exception is a side-flyout cascading submenu inside an interactive action menu.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Avoid nesting disclosures',
                lines: '87–94'
              }
            },
            {
              id: 'best-practices-no-critical-info',
              heading: 'Do not hide critical information inside a disclosure',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Essential status, legal terms, or blocking prerequisites must remain directly visible on the canvas rather than tucked inside an unrevealed popover.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Do not hide critical information within a disclosure',
                lines: '95–100'
              }
            }
          ]
        },
        {
          id: 'overview-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Users should dismiss an open disclosure effortlessly by pressing Escape, clicking outside the panel, toggling the trigger button again, or moving Tab focus past the end of its container.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Behaviors',
            lines: '101–112'
          },
          children: [
            {
              id: 'behaviors-dismissible-action',
              heading: 'Dismissible action placement',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When adding an explicit close (×) button inside a complex disclosure, reserve empty header space in the upper-right corner—never place it inline alongside checkboxes, toggles, or action controls.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Dismissible action',
                lines: '113–128'
              }
            }
          ]
        },
        {
          id: 'overview-visual-guidance',
          heading: 'Visual guidance',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Visual guidance',
            lines: '129–130'
          },
          children: [
            {
              id: 'visual-trigger-container',
              heading: 'Trigger button container',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Size disclosure triggers consistently across the hierarchy at 48px (large/global header), 40px (medium/toolbar), or 32px (compact/table actions).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Trigger button container',
                lines: '131–145'
              }
            },
            {
              id: 'visual-trigger-icon',
              heading: 'Trigger button icon',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair 48px and 40px triggers with 20px icons, stepping down cleanly to 16px icons on compact 32px triggers.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Trigger button icon',
                lines: '146–157'
              }
            },
            {
              id: 'visual-popover',
              heading: 'Popover container',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Anchor the popover layer cleanly beside its trigger button using subtle elevation and sufficient padding so panel edges read distinctly against page cards.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Popover',
                lines: '158–171'
              }
            }
          ]
        },
        {
          id: 'overview-content',
          heading: 'Content layout',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Content', lines: '172–179' },
          children: [
            {
              id: 'content-heading-text',
              heading: 'Heading text',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Separate concise panel headings from body content tightly (0px extra gap or a hairline horizontal divider).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Heading text',
                lines: '180–192'
              }
            },
            {
              id: 'content-footer',
              heading: 'Footer content',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Leave at least 16px breathing room or a clear divider above footer actions so confirmation buttons stay distinct from option lists.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Footer content',
                lines: '193–205'
              }
            },
            {
              id: 'content-multiple-sections',
              heading: 'Multiple sections of text',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Break distinct informational groups with consistent vertical spacing or light dividers so panels remain scannable.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Multiple sections of text',
                lines: '206–219'
              }
            },
            {
              id: 'content-interactive-elements',
              heading: 'Interactive elements',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Provide at least 16px vertical spacing between interactive inputs, toggles, or links inside a popover to avoid accidental taps.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Interactive elements',
                lines: '220–234'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'common-use-cases',
      heading: 'Common use cases',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Three recurring product patterns apply disclosure panels consistently: header profile menus, batch-applied settings/filter popovers, and split combo-action menus.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/disclosures-pattern/index.md',
        heading: '## Common use cases',
        lines: '235–246'
      }
    },
    {
      id: 'profile-menu',
      heading: 'Profile menu',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'A profile menu anchors to the authenticated user’s trigger in the global header bar and surfaces account identity, session details, quick links, and sign-out.'
        }
      ],
      demoRefs: ['disclosures-profile-menu'],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Profile menu', lines: '247–259' },
      children: [
        {
          id: 'profile-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Header trigger: compact 48px icon or avatar button inside the global shell.',
                'Identity header: user name, handle/email, and optional avatar image.',
                'Optional dividers grouping logical sections cleanly.',
                'Optional session metadata (active workspace, plan tier, region) editable or inspectable in context.',
                'Optional quick links above account navigation items (Profile, Preferences, Log out) with sparse supportive icons.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Anatomy', lines: '260–281' }
        },
        {
          id: 'profile-structure',
          heading: 'Structure',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Align menu rows vertically from general session identity at the top down to account management and session termination actions at the bottom.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Structure', lines: '282–296' }
        },
        {
          id: 'profile-functionality',
          heading: 'Functionality',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Functionality',
            lines: '297–298'
          },
          children: [
            {
              id: 'profile-mouse',
              heading: 'Mouse behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Clicking the header icon opens or collapses the panel; clicking outside closes it cleanly.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Mouse',
                lines: '299–310'
              }
            },
            {
              id: 'profile-keyboard',
              heading: 'Keyboard behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Tab highlights the trigger; Enter or Space opens the panel and moves focus to the first menu item; Up and Down arrows step through destinations; Enter invokes and Escape dismisses back to the trigger.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keyboard',
                lines: '311–319'
              }
            }
          ]
        },
        {
          id: 'profile-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '320–321'
          },
          children: [
            {
              id: 'profile-bp-header',
              heading: 'Pair with a global toolbar header',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep the profile menu anchored in the top-right utility bar of authenticated applications rather than scattering account menus inside body panels.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Use with a global toolbar header',
                lines: '322–327'
              }
            },
            {
              id: 'profile-bp-session',
              heading: 'Show session-relevant details',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Display identity, active organization, or workspace status needed immediately without duplicating full profile pages.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Show information that is pertinent to the user account or session',
                lines: '328–334'
              }
            },
            {
              id: 'profile-bp-icons',
              heading: 'Use selective icons and links to aid orientation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Include recognizable icons or external indicators only where they clarify destination type rather than decorating every line.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Add icons and links to help guide the user',
                lines: '335–343'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'settings-and-filter-menus',
      heading: 'Settings and filter menus',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Settings and filter disclosures reveal grouped checkboxes, radio sets, toggles, or search inputs inside a popover paired with batch Apply and Reset actions.'
        }
      ],
      demoRefs: ['disclosures-settings-filter-menu'],
      _sourceCitation: {
        path: 'patterns/disclosures-pattern/index.md',
        heading: '## Settings and filter menus',
        lines: '344–351'
      },
      children: [
        {
          id: 'settings-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Combine an icon trigger button, a structured popover housing interactive controls with optional filter search/clear controls, and bottom Apply and Reset actions.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Anatomy', lines: '352–366' }
        },
        {
          id: 'settings-structure',
          heading: 'Structure',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Group related controls cleanly with clear spacing so operators can review pending settings together before committing updates.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Structure', lines: '367–382' }
        },
        {
          id: 'settings-functionality',
          heading: 'Functionality',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Functionality',
            lines: '383–384'
          },
          children: [
            {
              id: 'settings-mouse',
              heading: 'Mouse behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Controls remain open while adjusting selections; clicking Apply commits all pending choices and closes the popover, while Reset clears unapplied edits or restores saved defaults.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Mouse',
                lines: '385–397'
              }
            },
            {
              id: 'settings-keyboard',
              heading: 'Keyboard behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Because the panel contains mixed interactive form controls, opening focuses the first interactive control and users move through choices, Reset, and Apply using Tab and Shift+Tab rather than simple single-menu arrows.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keyboard',
                lines: '398–408'
              }
            }
          ]
        },
        {
          id: 'settings-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '409–410'
          },
          children: [
            {
              id: 'settings-bp-batch-buttons',
              heading: 'Provide Apply and Reset buttons to commit changes together',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Apply multi-control edits as a batch so views do not flash or reload mid-selection while the user is still choosing criteria.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Use a set of buttons to apply all changes',
                lines: '411–417'
              }
            },
            {
              id: 'settings-bp-not-overcrowded',
              heading: 'Do not overcrowd menus',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep popovers focused on one domain view; promote sprawling preference sets to full settings screens or drawers.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: "#### Don't overcrowd menus with unnecessary content",
                lines: '418–423'
              }
            },
            {
              id: 'settings-bp-spacing',
              heading: 'Maintain clear element spacing',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Preserve at least 16px gaps between grouped form controls so selections stay easy to target.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Include enough space between elements',
                lines: '424–429'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'combo-button',
      heading: 'Combo button',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'A combo button merges one dominant primary action with an adjacent menu toggle revealing secondary alternatives.'
        }
      ],
      demoRefs: ['disclosures-combo-button'],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Combo button', lines: '430–435' },
      children: [
        {
          id: 'combo-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Pairs a default action button on the left with a slim chevron icon trigger beside it opening an overflow menu popover with horizontal section dividers where needed.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Anatomy', lines: '436–449' }
        },
        {
          id: 'combo-structure',
          heading: 'Structure',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Keep both halves visually joined at equal control height, presenting alternate choices beneath the split trigger without competing with the main label.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Structure', lines: '450–459' }
        },
        {
          id: 'combo-functionality',
          heading: 'Functionality',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Functionality',
            lines: '460–461'
          },
          children: [
            {
              id: 'combo-mouse',
              heading: 'Mouse behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Clicking the primary half fires the default command immediately; clicking the chevron half opens the menu of alternative commands.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Mouse',
                lines: '462–473'
              }
            },
            {
              id: 'combo-keyboard',
              heading: 'Keyboard behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Tab reaches the primary button first (Enter or Space triggers it) and tabs next to the chevron toggle (Enter, Space, or Down arrow opens the alternatives menu, navigated with Up/Down arrows and dismissed with Escape).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keyboard',
                lines: '474–486'
              }
            }
          ]
        },
        {
          id: 'combo-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '487–488'
          },
          children: [
            {
              id: 'combo-bp-default-action',
              heading: 'Choose a clear default action',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Assign the high-frequency task as the visible default button so operators succeed in one click, relegating rarer siblings to the menu.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Choose a default action',
                lines: '489–495'
              }
            },
            {
              id: 'combo-bp-reduce-complexity',
              heading: 'Reduce visual clutter in dense headers',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Collapse secondary variations into a combo button when adjacent buttons share one object context and would otherwise crowd the toolbar.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Use to reduce visual complexity on a page',
                lines: '496–501'
              }
            },
            {
              id: 'combo-bp-no-extra-icons',
              heading: 'Avoid extra icons inside labels',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Keep text-only labels inside both the primary action button and menu rows—never add extra icons alongside the mandatory split-menu chevron.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Avoid using extra icons',
                lines: '502–516'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Expose trigger expanded state (`aria-expanded`), open/close cleanly on Enter or Space, and preserve distinct keyboard mechanics: Up/Down arrow traversal for Menu-style lists versus Tab/Shift+Tab movement inside multi-control Settings popovers.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/disclosures-pattern/index.md',
        heading: '## Accessibility > #### Screen readers',
        lines: '517–529'
      }
    },
    {
      id: 'related',
      heading: 'Related components',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Button', kind: 'component' },
            { label: 'Popover', kind: 'component' },
            { label: 'Toggletip', kind: 'component' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Related', lines: '530–555' }
    }
  ],
  demos: [
    {
      id: 'disclosures-profile-menu',
      title: 'Profile menu · account actions',
      sectionId: 'profile-menu',
      secondarySectionIds: ['profile-bp-header', 'profile-bp-session'],
      mappingStatus: 'partial-divergent',
      scenario: 'Reveal operator account identity, session details, and account actions from a compact menu trigger.',
      teaching: {
        meaning: 'A profile menu reveals account- or session-related options on request.',
        decision:
          "Use it for secondary items tied to the user's identity inside a global header; keep primary task actions in their task context.",
        consider:
          'Keep the menu concise, keyboard reachable via Up/Down arrows, and clear about whether actions navigate or update a session setting.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:824-844`) renders an isolated outline button "Tuan Trinh · Account" rather than a 48px global-header avatar/icon trigger with session details or dividers.'
    },
    {
      id: 'disclosures-settings-filter-menu',
      title: 'Settings and filter menu · change a view',
      sectionId: 'settings-and-filter-menus',
      secondarySectionIds: ['settings-keyboard', 'settings-bp-batch-buttons'],
      mappingStatus: 'mapped',
      scenario:
        'Stage related mission categories in a compact popover, apply them together, and inspect the updated mission list.',
      teaching: {
        meaning:
          'A settings menu reveals compact popover controls for changing a view without keeping every option pinned on screen.',
        decision:
          'Use an interactive Popover with batch Reset and Apply buttons so users can inspect several selections before applying together.',
        consider:
          'Navigate mixed panel controls with Tab/Shift+Tab; distinguish pending choices from applied settings and leave 16px spacing between controls.'
      },
      interactive: true
    },
    {
      id: 'disclosures-combo-button',
      title: 'Combo button · primary action plus alternatives',
      sectionId: 'combo-button',
      secondarySectionIds: ['combo-bp-default-action', 'combo-bp-no-extra-icons'],
      mappingStatus: 'mapped',
      scenario:
        'Highlight one frequent export action while keeping secondary formats grouped behind an adjacent menu trigger.',
      teaching: {
        meaning: 'A combo button keeps one common action prominent and groups related alternatives.',
        decision:
          'Use it when one action is the clear default and alternatives are less frequent; keep extra icons out of primary and menu action labels.',
        consider: 'Make the default action unmistakable and support Enter/Space/Down-arrow menu activation.'
      },
      interactive: true
    },
    {
      id: 'disclosures-inline-local',
      title: 'Inline disclosure · supporting details',
      sectionId: 'UNMAPPED',
      mappingStatus: 'UNMAPPED',
      scenario:
        'Reveal secondary waypoint or schedule notes inline inside the page flow using a local Collapsible extension.',
      teaching: {
        meaning:
          'Local extension: an inline Collapsible disclosure reveals related secondary details within the page flow when requested.',
        decision:
          'UNMAPPED to maintained source (source covers popover disclosures only). Use inline disclosures only for non-critical supporting details when a floating popover is unnecessary.',
        consider: 'Keep revealed content focused, avoid nested disclosures, and expose aria-expanded state cleanly.'
      },
      interactive: true,
      _demoNote:
        'UNMAPPED local extension (`demos.tsx:919`, `<Collapsible>`). Maintained `disclosures-pattern/index.md` covers strictly popover-based disclosures (Profile menu, Settings/filter popover, Combo button) and omits inline accordion/collapsible panels. Keep component intact in UI while labeling as a local SkyTrack extension.'
    }
  ],
  notes: [
    {
      kind: 'content',
      text: 'UNMAPPED demo disclosure: "Inline disclosure · supporting details" uses inline Collapsible as a SkyTrack extension; maintained source guidance covers Popover/Menu disclosures up to 6 columns wide.'
    },
    {
      kind: 'implementation',
      text: 'Prefer the existing Popover component (`popover.tsx`) rather than Menu when building multi-control Settings and filter disclosures that require batch Apply/Reset.'
    }
  ],
  components: ['Popover', 'Menu', 'Button', 'Collapsible']
}

export const PAGE_EMPTY_STATES: PatternPageDraft = {
  id: 'empty-states',
  title: 'Empty states',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Dedicated source standards for Error states and Onboarding tours are noted as future source expansions; rely only on the high-level error and onboarding guidance documented here.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/empty-states-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 14–26)',
      '## References (lines 542–556)',
      '## Feedback (lines 557–561)'
    ]
  },
  summary:
    'Empty states fill containers that currently hold no records—due to initial first use, filtered zero-matches, healthy completion, or failed retrieval—and orient users toward a clear recovery or creation step.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Whenever a table, card grid, inbox, or workspace has nothing to show, present an honest explanation and one unmistakable action rather than leaving operators staring at blank headers or unexplained zero counts.'
        }
      ],
      _sourceCitation: { path: 'patterns/empty-states-pattern/index.md', heading: '## Overview', lines: '27–46' }
    },
    {
      id: 'anatomy',
      heading: 'Anatomy',
      level: 2,
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Image (optional): concise non-interactive graphic proportional to container size.',
            'Title (required): clear positive framing describing what happens next (prefer "Start by adding..." over negative "You have no...").',
            'Body copy (required): explains the state concisely and delivers a next step via one of three routes—a button beneath copy, an inline link in copy, or guidance pointing to an existing control on screen.',
            'Primary action button (optional): shown when a button is the clearest way to resolve the empty state.',
            'Secondary action link (optional): tertiary text link (such as "Learn more") pointing to documentation when helpful.'
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/empty-states-pattern/index.md', heading: '## Anatomy', lines: '47–82' }
    },
    {
      id: 'designing-with-empty-states',
      heading: 'Designing with empty states',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Choose basic empty states for routine or secondary views; reserve heavier in-depth alternatives—inline guides, guided onboarding, or pre-loaded starter kits—strictly for primary workflows.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/empty-states-pattern/index.md',
        heading: '## Designing with empty states',
        lines: '83–100'
      },
      children: [
        {
          id: 'designing-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Display an empty state whenever zero items are present before first setup, after an over-narrow filter/search, when all alerts are clear, or when data fails to load.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### When to use',
            lines: '101–115'
          }
        },
        {
          id: 'designing-basic-empty-states',
          heading: 'Basic empty states',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Replace the entire missing component container (for example, omit data table column headings, filter toolbars that make no sense without rows, and pagination footers) so users and assistive technology never traverse dead table shells.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Basic empty states',
            lines: '116–129'
          }
        },
        {
          id: 'designing-where-to-use',
          heading: 'Where to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use across full-page collections, split view panes, dashboard cards/tiles, data tables, and notification trays whenever records can drop to zero.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Where to use',
            lines: '130–139'
          }
        },
        {
          id: 'visual-smaller-spaces',
          heading: 'Visual guidelines for smaller empty spaces',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Visual guidelines for smaller empty spaces',
            lines: '140–144'
          },
          children: [
            {
              id: 'smaller-alignment',
              heading: 'Alignment of elements',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep title, body copy, and action controls left-aligned inside compact tiles or narrow drawers. Only the optional illustration may sit centered above left-aligned text in small square tiles.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Alignment of elements',
                lines: '145–153'
              }
            },
            {
              id: 'smaller-image-choice',
              heading: 'Image choice considerations',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep graphics lightweight or omit images altogether inside tight cards so text remains effortless to read without inflating container height.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Image choice considerations',
                lines: '154–159'
              }
            },
            {
              id: 'smaller-multiple',
              heading: 'Multiple empty states',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When several dashboard cards show empty states at the same time, demote individual triggers from primary to tertiary actions so buttons do not visually fight each other. If multiple widgets fail to load data, drop imagery and display clear text-only recovery guidance.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Multiple empty states',
                lines: '160–178'
              }
            }
          ]
        },
        {
          id: 'visual-larger-spaces',
          heading: 'Visual guidelines for larger empty spaces',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Visual guidelines for larger empty spaces',
            lines: '179–184'
          },
          children: [
            {
              id: 'larger-alignment',
              heading: 'Alignment of elements',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep text left-aligned within its content block even when the block itself sits positioned cleanly inside a wide canvas or grid region—never center multi-line explanatory prose.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Alignment of elements',
                lines: '185–193'
              }
            },
            {
              id: 'larger-layout-options',
              heading: 'Layout and positioning options',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Anchor large empty blocks comfortably near top-left with balanced margins or inside a horizontally centered content column with left-aligned text.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Layout/positioning options',
                lines: '194–200'
              }
            },
            {
              id: 'larger-image-position',
              heading: 'Image position options',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Place wider landscape illustrations directly above the empty-state heading, or place taller portrait/spot illustrations neatly beside the left-aligned text column.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Image position options',
                lines: '201–207'
              }
            },
            {
              id: 'larger-image-choice',
              heading: 'Image choice considerations',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use custom product imagery only where it reinforces domain meaning without distracting from the recovery CTA.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Image choice considerations',
                lines: '208–232'
              }
            },
            {
              id: 'larger-best-practices',
              heading: 'Best practices',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Conserve vertical scan flow, limit copy to one clear purpose, and link directly to the next action.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Best practices',
                lines: '233–247'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'types-of-empty-states',
      heading: 'Types of empty states',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Match copy tone and offered actions carefully to the cause of emptiness so users never mistake an unavailable service or an overly narrow search for a freshly installed product.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/empty-states-pattern/index.md',
        heading: '## Types of empty states',
        lines: '248–249'
      },
      children: [
        {
          id: 'types-no-data',
          heading: 'No data empty states',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Appear before an operator creates or imports records for the first time. Name specifically what belongs in this view and offer one direct action to begin.'
            },
            {
              type: 'callout',
              kind: 'do',
              text: 'State specifically what will live here, write positive inviting titles ("Start by creating a plan"), and keep a single focused call to action.'
            },
            {
              type: 'callout',
              kind: 'dont',
              text: 'Do not write vague placeholders, bury users in internal jargon, or apologize negatively ("You don\'t have anything yet") when inviting first-time creation.'
            }
          ],
          demoRefs: ['empty-states-no-data'],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: "### No data empty states > Do / Don't",
            lines: '250–287'
          }
        },
        {
          id: 'types-user-action',
          heading: 'User action empty states',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Trigger from direct operator actions and split into two distinct situations: (1) zero search or filter matches—where the active query remains clear alongside options to clear or broaden filters rather than offering "Create first item"; and (2) healthy completion states—such as a cleared inbox or configured monitor with zero triggered alerts, where calm status confirmation needs no intrusive action button.'
            }
          ],
          demoRefs: ['empty-states-no-results'],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### User action empty states',
            lines: '288–319'
          }
        },
        {
          id: 'types-error-management',
          heading: 'Error management empty states',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Explain clearly why records could not appear without falsely claiming the collection is empty:'
            },
            {
              type: 'table',
              columns: ['Cause', 'What to communicate to operators'],
              rows: [
                ['Permissions issue', 'Explain access limits and who can grant role rights'],
                [
                  'Systems issue',
                  'State that service connectivity or retrieval failed and offer safe Retry or status guidance'
                ],
                ['Configuration required', 'Point to the missing setup prerequisite needed before data flows in'],
                [
                  'Action not supported',
                  'Explain why the requested view or capability is unavailable in this environment'
                ]
              ]
            },
            {
              type: 'callout',
              kind: 'do',
              text: 'Use plain human language describing what happened and rank recovery steps cleanly from primary fix to secondary support links.'
            },
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never expose cryptic numeric error codes alone or leave operators without a clear next step.'
            },
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Source limit: comprehensive standalone Error states guidance is marked for future development in the reference taxonomy.'
            }
          ],
          demoRefs: ['empty-states-error'],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: "### Error management empty states > Do / Don't",
            lines: '320–382'
          }
        }
      ]
    },
    {
      id: 'in-depth-alternatives',
      heading: 'In-depth alternatives',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'For flagship workflows where a two-line empty state leaves new teams guessing how the capability works, substitute richer educational structures with clear fallback paths.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/empty-states-pattern/index.md',
        heading: '## In-depth alternatives',
        lines: '383–393'
      },
      children: [
        {
          id: 'alternatives-overview',
          heading: 'Choosing among educational approaches',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Weigh localization overhead, skip behavior, and deletability before picking inline documentation, guided onboarding, or pre-seeded starter content over a lightweight basic empty state.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Alternative approaches',
            lines: '394–405'
          }
        },
        {
          id: 'alternatives-inline-docs',
          heading: 'In-line documentation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Embed structured feature explanation and visual walkthrough material directly in the empty workspace so teams learn before their first configuration run.'
            }
          ],
          demoRefs: ['empty-states-inline-doc'],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### In-line documentation',
            lines: '406–414'
          },
          children: [
            {
              id: 'inline-docs-considerations',
              heading: 'Considerations for in-line documentation',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Restrict coverage strictly to one primary feature so the screen never reads like a documentation portal.',
                    'Account for maintenance cost: annotated screenshots or diagrams require regeneration and multi-language translation whenever the UI updates.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Considerations for in-line documentation',
                lines: '415–430'
              }
            }
          ]
        },
        {
          id: 'alternatives-onboarding',
          heading: 'Onboarding',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Offer step-by-step orientation or setup checklists for multi-part workflows where learning the conceptual model first increases activation success.'
            }
          ],
          demoRefs: ['empty-states-onboarding'],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Onboarding',
            lines: '431–445'
          },
          children: [
            {
              id: 'onboarding-considerations',
              heading: 'Considerations for onboarding',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep onboarding optional and skippable, and always design a basic empty state behind it once dismissed. Note: standalone Onboarding pattern documentation is planned as a future addition in the reference set.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Considerations for onboarding',
                lines: '446–463'
              }
            }
          ]
        },
        {
          id: 'alternatives-starter-content',
          heading: 'Starter content',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Seed unfamiliar workspaces with concrete sample records or pre-assembled templates so operators inspect working output immediately instead of building from scratch.'
            }
          ],
          demoRefs: ['empty-states-starter-content'],
          _sourceCitation: {
            path: 'patterns/empty-states-pattern/index.md',
            heading: '### Starter content',
            lines: '464–469'
          },
          children: [
            {
              id: 'starter-pre-built-apps',
              heading: 'Pre-built sample content',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Include realistic sample data sets clearly tagged as examples so teams test views, filters, and visualizations without harming real operations.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Pre-built content for apps',
                lines: '470–493'
              }
            },
            {
              id: 'starter-pre-configured-kits',
              heading: 'Pre-configured kits and workflows',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Supply starter templates or rule bundles that operators duplicate or adapt into production workflows.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Pre-configured kits and workflows',
                lines: '494–503'
              }
            },
            {
              id: 'starter-considerations',
              heading: 'Considerations for starter content',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Whenever users are allowed to archive or delete starter items, ensure deleting all samples cleanly reveals a fallback basic empty state.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/empty-states-pattern/index.md',
                heading: '#### Considerations for starter content',
                lines: '504–510'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Decorative illustrations inside empty states convey no extra facts beyond surrounding headings and copy; assign empty alt attributes (`alt=""`) so screen readers skip decorative artwork cleanly across browsers and assistive tools.'
        }
      ],
      _sourceCitation: { path: 'patterns/empty-states-pattern/index.md', heading: '## Accessibility', lines: '511–525' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Data table', kind: 'component' },
            { label: 'Tile / Card', kind: 'component' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Search', kind: 'pattern' },
            { label: 'Error states (future reference expansion)', kind: 'pattern' },
            { label: 'Onboarding (future reference expansion)', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/empty-states-pattern/index.md', heading: '## Related', lines: '526–541' }
    }
  ],
  demos: [
    {
      id: 'empty-states-no-data',
      title: 'No data · create the first plan',
      sectionId: 'types-no-data',
      secondarySectionIds: ['anatomy', 'visual-larger-spaces'],
      mappingStatus: 'mapped',
      scenario: 'Show a positive first step, then make the new plan visible in the collection after creation.',
      teaching: {
        meaning: 'This state explains that no plans exist yet and helps the user create the first one.',
        decision:
          'Replace the entire container (omitting empty table headers/footers), use a positive action-oriented title, and provide one clear resolution CTA.',
        consider:
          'Left-align empty-state text as a block (never centering multi-line prose) and never use first-use copy for load errors or zero search matches.'
      },
      interactive: true
    },
    {
      id: 'empty-states-no-results',
      title: 'No results · recover a search',
      sectionId: 'types-user-action',
      mappingStatus: 'mapped',
      scenario:
        'Keep the query visible, show matching plans as it changes, and offer a clear way back from zero matches.',
      teaching: {
        meaning:
          'This user-action state shows that records exist in the system, though the active query returned none.',
        decision:
          'Keep the query visible and offer filter reset or query revision rather than a Create First Item prompt; note that zero-item completion views (such as zero pending alerts) require no extra call to action.',
        consider:
          'Reserve extra recovery controls for zero-match searches while keeping healthy completion states concise.'
      },
      interactive: true,
      _demoNote:
        'This sample demonstrates a no-match search state; it does not represent a healthy completed zero-alert view.'
    },
    {
      id: 'empty-states-error',
      title: 'Error · recover an unavailable collection',
      sectionId: 'types-error-management',
      mappingStatus: 'mapped',
      scenario:
        'Clarify when data retrieval failed—across permissions, system outage, setup gaps, or unsupported actions—using plain language rather than raw error codes.',
      teaching: {
        meaning:
          'An error empty state explains that the collection could not load, so its absence is not evidence that no plans exist.',
        decision:
          'Communicate permission, system, configuration, or capability failures in plain human terms without cryptic error codes, and rank recovery steps.',
        consider:
          'Preserve relevant filters, drop imagery if multiple dashboard tiles fail simultaneously, and note comprehensive Error states guidance is planned in source.'
      },
      interactive: true
    },
    {
      id: 'empty-states-inline-doc',
      title: 'Inline documentation · explain the next step',
      sectionId: 'alternatives-inline-docs',
      secondarySectionIds: ['inline-docs-considerations'],
      mappingStatus: 'mapped',
      scenario: 'Guide setup beside the empty workspace and show the created sample plan beside the instruction.',
      teaching: {
        meaning: 'Inline documentation teaches a primary workflow beside the place where the user performs it.',
        decision:
          'Limit inline documentation to a single feature inside a high-value space, weighing visual asset maintenance and localization costs.',
        consider: 'Keep instruction proportional to the space and keep container state self-contained.'
      },
      interactive: true
    },
    {
      id: 'empty-states-onboarding',
      title: 'Onboarding · guide a first task',
      sectionId: 'alternatives-onboarding',
      secondarySectionIds: ['onboarding-considerations'],
      mappingStatus: 'mapped',
      scenario:
        'Show progress through a few first steps, then let the user dismiss the guide and return to a simple workspace state.',
      teaching: {
        meaning:
          'Onboarding helps a new user learn how to approach a multi-step capability when a two-line prompt is not enough.',
        decision:
          'Pair optional onboarding flows with an underlying basic empty state in case users skip or dismiss the tour.',
        consider:
          'Standalone Onboarding guidelines remain a future expansion in the reference; keep steps tied to immediate user goals.'
      },
      interactive: true
    },
    {
      id: 'empty-states-starter-content',
      title: 'Starter content · orient the user with an example',
      sectionId: 'alternatives-starter-content',
      secondarySectionIds: ['starter-pre-built-apps', 'starter-considerations'],
      mappingStatus: 'mapped',
      scenario:
        'Seed clearly labeled example data, then let the user clear it to inspect the empty-state fallback and restore the sample.',
      teaching: {
        meaning:
          'Starter content gives users sample plans or pre-configured workflows to inspect before building their own.',
        decision:
          'Use sample data or starter kits when exploring real configuration teaches faster than prose alone, always providing a basic empty state if users delete starter records.',
        consider:
          'Mark sample content unmistakably so operators never confuse starter data with live operational missions.'
      },
      interactive: true
    }
  ],
  components: ['Empty', 'Button', 'Alert', 'Collapsible']
}

export const PAGE_FILTERING: PatternPageDraft = {
  id: 'filtering',
  title: 'Filtering',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/filtering/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 13–23)',
      '## References (lines 187–198)',
      '## Feedback (lines 199–203)'
    ]
  },
  summary:
    'Filtering trims an existing dataset by predefined attributes—such as status, readiness tier, or region—and pairs predictable selection controls, batch or instant apply timing, hidden filter indicators, and two-level reset behavior.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use filtering when operators need to narrow a known catalog by structured criteria, compare subsets side-by-side, or exclude unwanted records cleanly—distinct from open-ended keyword search.'
        }
      ],
      _sourceCitation: { path: 'patterns/filtering/index.md', heading: '## Overview', lines: '24–30' }
    },
    {
      id: 'selection-methods',
      heading: 'Selection methods',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Choose single- versus multi-value selection controls, layout orientation, and apply cadence based on query speed and how many categories users adjust together.'
        }
      ],
      _sourceCitation: { path: 'patterns/filtering/index.md', heading: '## Selection methods', lines: '31–45' },
      children: [
        {
          id: 'selection-single',
          heading: 'Single selection',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Restrict choices to one attribute value at a time using radio semantics: standard dropdown/select lists, compact inline dropdowns, or visible radio groups.'
            }
          ],
          demoRefs: ['filtering-single-status'],
          _sourceCitation: { path: 'patterns/filtering/index.md', heading: '### Single selection', lines: '46–63' }
        },
        {
          id: 'selection-multiselect',
          heading: 'Multiselect',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Support combining two or more attribute values simultaneously using checkbox semantics: multi-select dropdowns, inline multi-select lists, or standalone checkbox sets.'
            }
          ],
          _sourceCitation: { path: 'patterns/filtering/index.md', heading: '### Multiselect', lines: '64–80' }
        },
        {
          id: 'selection-multiple-categories',
          heading: 'Selecting multiple categories',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Organize related attributes under labeled filter categories anchored vertically in a left sidebar or horizontally directly above the dataset. Never nest multiple distinct filter categories inside a single menu or dropdown trigger.'
            }
          ],
          demoRefs: ['filtering-combine-categories'],
          _sourceCitation: {
            path: 'patterns/filtering/index.md',
            heading: '### Selecting multiple categories',
            lines: '81–98'
          }
        },
        {
          id: 'selection-batch-updates',
          heading: 'Multiple filters with batch updates',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use an explicit "Apply filters" action when operators combine criteria across multiple categories or when backend queries carry noticeable latency—preventing wasted reload cycles on every individual checkbox click.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/filtering/index.md',
            heading: '### Multiple filters with batch updates',
            lines: '99–116'
          }
        },
        {
          id: 'selection-instant-updates',
          heading: 'Multiple filters with instant updates',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Apply updates immediately per click when response time is fast and operators typically adjust one filter at a time or browse live counts interactively.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/filtering/index.md',
            heading: '### Multiple filters with instant updates',
            lines: '117–123'
          }
        }
      ]
    },
    {
      id: 'filter-states',
      heading: 'Filter states',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Each filter category starts either all-unselected (when operators typically filter in one specific value) or all-selected (when operators normally exclude just one or two values), and sibling categories on the same screen may mix start states. Whenever filters tuck inside a closed drawer, dropdown, or popover, keep at least the count of active criteria visible on the trigger alongside a direct one-click clear affordance without reopening.'
        }
      ],
      _sourceCitation: { path: 'patterns/filtering/index.md', heading: '## Filter states', lines: '124–152' }
    },
    {
      id: 'resetting-filters',
      heading: 'Resetting filters',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Provide resetting at two levels: a per-category reset restoring that group to its baseline start state (whether empty or all-selected), plus a global clear/reset control removing all active filter modifications at once.'
        }
      ],
      _sourceCitation: { path: 'patterns/filtering/index.md', heading: '## Resetting filters', lines: '153–168' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Checkbox', kind: 'component' },
            { label: 'Radio', kind: 'component' },
            { label: 'Select', kind: 'component' },
            { label: 'Common actions (Clear, Reset)', kind: 'pattern' },
            { label: 'Search', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/filtering/index.md', heading: '## Related', lines: '169–186' }
    }
  ],
  demos: [
    {
      id: 'filtering-single-status',
      title: 'Choose one status · instant results',
      sectionId: 'selection-single',
      secondarySectionIds: ['selection-instant-updates'],
      mappingStatus: 'partial-divergent',
      scenario: 'Narrow a mission catalog by one attribute using immediate single-selection updates.',
      teaching: {
        meaning:
          'A single-selection filter narrows a known collection by one structured attribute using radio semantics and updates results immediately.',
        decision:
          'Use radio groups, selects, or single dropdowns for quick one-attribute filtering; keep keyword search separated into Search patterns.',
        consider: 'Let users clear or revert the category to its default state and recover cleanly from empty results.'
      },
      interactive: true,
      _demoNote:
        'The single-status example now uses the package RadioGroup/Radio controls and shows its count/list in the same example. Keyword search is separate. The combined-category example has local instant/batch selection, pending count, apply, clear-selection, and reset-all states; collapsed-trigger badges and per-category reset affordances remain simplified.'
    },
    {
      id: 'filtering-combine-categories',
      title: 'Combine categories · apply or update instantly',
      sectionId: 'selection-multiple-categories',
      secondarySectionIds: ['selection-multiselect', 'selection-batch-updates', 'filter-states', 'resetting-filters'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Combine multiple attributes cleanly using batch Apply filters when latency or deliberation warrants it, alongside two-tier resets.',
      teaching: {
        meaning:
          'Multiple filters combine attributes to narrow a known collection; placement stays left-sidebar or top-horizontal rather than nesting categories in one menu.',
        decision:
          'Use instant updates for fast single changes and batch "Apply filters" when reviewing several choices or querying slow datasets.',
        consider:
          'Show an active filter count and quick clear on collapsed filter triggers, start categories either all-unselected or all-selected as needed, and offer both per-category clear and global reset.'
      },
      interactive: true,
      _demoNote:
        'The combined-category example now filters by plan category with local pending/applied states and visibly distinguishes Clear selections from Reset all filters. Collapsed-trigger active badges and per-category reset affordances remain simplified.'
    }
  ],
  components: ['Radio', 'Checkbox', 'Select', 'Button', 'Badge']
}

export const PAGE_FLUID_STYLES: PatternPageDraft = {
  id: 'fluid-styles',
  title: 'Fluid styles',
  group: 'Core',
  source: {
    status: 'Additional local topic',
    limits: [
      'Catalog topic limit: Fluid styles exists in the maintained local pattern directory but is omitted from the 14-item Universal overview index.',
      'Component readiness limit: referenced button guidelines note that full-span fluid and hanging fluid buttons are not yet GA without custom styling overrides.',
      'SkyTrack UI package constraint: SkyTrack UI does not ship a 64px internal-label fluid Input primitive; local demos preserve visible external labels while demonstrating flush grouping and container-width matching.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/fluid-styles/index.md',
    _relatedSources: [{ path: 'components/button/usage.md' }, { path: 'components/form/usage.md' }],
    _excludedSections: ['### Quick Navigation (lines 15–23)', '## Feedback (lines 250–254)']
  },
  summary:
    'Fluid style is an expressive structural treatment in which flush inputs and edge-attached buttons meet container boundaries with 0px gaps and crisp 3:1 separator borders inside compact dialogs, side panels, or focused short forms.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Rather than merely expanding width to 100%, fluid components bleed flush to at least one edge of a parent container and depend on their compound housing—never floating alone.'
        }
      ],
      _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '## Overview', lines: '24–46' },
      children: [
        {
          id: 'overview-key-terms',
          heading: 'Key terms',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Dimension', 'Productive / Default', 'Expressive / Fluid'],
              rows: [
                [
                  'Style intent',
                  'Compact, high-density operational workflows with external spacing',
                  'Expressive architectural blocks bleeding to container edges'
                ],
                [
                  'Width behavior',
                  'Fixed width stays constant regardless of viewport width',
                  'Fluid width adapts across responsive grid columns or % widths'
                ]
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '### Key terms', lines: '47–57' }
        },
        {
          id: 'overview-when-to-use',
          heading: 'When to use fluid styles',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Apply fluid components selectively inside short, concise forms, focused dialogs, side panels, or expressive entry experiences (such as sign-in cards) where clean architectural alignment strengthens focus.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/fluid-styles/index.md',
            heading: '### When to use fluid styles',
            lines: '58–65'
          }
        },
        {
          id: 'overview-when-not-to-use',
          heading: 'When not to use fluid styles',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Avoid fluid styling on complex multi-section forms that rely on generous white space and clear section groupings—and never embed fluid controls inside accordions or sectioned containers where flush shared edges blur parent-child hierarchy.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/fluid-styles/index.md',
            heading: '### When not to use fluid styles',
            lines: '66–74'
          }
        }
      ]
    },
    {
      id: 'types-of-fluid-components',
      heading: 'Types of fluid components',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Coordinate inputs, buttons, containers, and form layouts carefully—mixing default top-labeled fields with fluid bottom actions is a valid common hybrid, whereas mixing adjacent edge styles haphazardly breaks alignment.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/fluid-styles/index.md',
        heading: '## Types of fluid components',
        lines: '75–80'
      },
      children: [
        {
          id: 'types-fluid-inputs',
          heading: 'Fluid inputs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'In the reference component architecture, a fluid input fixes height at 64px, embeds its field label cleanly inside the box aligned to input text, and shifts all helper text into an interactive info tooltip because no bottom helper slot exists.'
            },
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'SkyTrack package note: SkyTrack UI ships standard top-labeled Input fields and does not expose a 64px internal-label fluid Input variant.'
            }
          ],
          demoRefs: ['fluid-styles-edge-form'],
          _sourceCitation: {
            path: 'patterns/fluid-styles/index.md',
            related: [{ path: 'components/form/usage.md', lines: '84, 207–210' }],
            heading: '### Fluid inputs',
            lines: '81–94'
          }
        },
        {
          id: 'types-fluid-buttons',
          heading: 'Fluid buttons',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'True fluid buttons attach flush to a container’s bottom edge at 25%, 50%, or 100% spans and never sit mid-flow. Omit tertiary button styles inside fluid compositions; separate adjacent buttons with a crisp divider border.'
            },
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Reference readiness limit: full-span fluid buttons and hanging fluid buttons remain marked unavailable for out-of-the-box production without styling overrides.'
            }
          ],
          demoRefs: ['fluid-styles-align-actions'],
          _sourceCitation: {
            path: 'patterns/fluid-styles/index.md',
            related: [{ path: 'components/button/usage.md', lines: '14–18, 217, 389–405' }],
            heading: '### Fluid buttons',
            lines: '95–109'
          },
          children: [
            {
              id: 'types-fluid-width-default-buttons',
              heading: 'Fluid-width default buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Distinct from edge-attached fluid buttons, fluid-width default buttons remain floating inside the grid and expand proportionally across column spans (preferred over fixed-padding 16px/64px default buttons when balancing spacious layouts, keeping paired non-ghost buttons equal width).'
                }
              ],
              demoRefs: ['fluid-styles-match-width'],
              _sourceCitation: {
                path: 'patterns/fluid-styles/index.md',
                heading: '#### Fluid-width default buttons',
                lines: '110–128'
              }
            }
          ]
        },
        {
          id: 'types-fluid-containers',
          heading: 'Fluid containers',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Fluid containers—such as responsive modals—expand across grid columns or viewport percentages as screen width grows, whereas fixed containers—such as side panels—hold constant pixel widths independent of the underlying layout grid.'
            }
          ],
          demoRefs: ['fluid-styles-container-vs-fixed'],
          _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '### Fluid containers', lines: '129–141' }
        },
        {
          id: 'types-fluid-forms',
          heading: 'Fluid forms',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Fluid forms stack orthogonal inputs edge-to-edge using 0px gaps (or hairline 1px borders in condensed multi-column grids) for concise workflows only; complex workflows retain default forms with 32px wide gutters and external column-flush labels.'
            }
          ],
          demoRefs: ['fluid-styles-form-width'],
          _sourceCitation: {
            path: 'patterns/fluid-styles/index.md',
            related: [{ path: 'components/form/usage.md', lines: '90–128' }],
            heading: '### Fluid forms',
            lines: '142–162'
          }
        }
      ]
    },
    {
      id: 'designing-with-fluid',
      heading: 'Designing with fluid',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '## Designing with fluid', lines: '163–164' },
      children: [
        {
          id: 'designing-visual-guidance',
          heading: 'Visual guidance',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '### Visual guidance', lines: '165–166' },
          children: [
            {
              id: 'fluid-alignment',
              heading: 'Alignment and zero-gap stacking',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Stack fluid controls flush against one another and their enclosing box using 0px internal gutters; do not insert standard form gaps between truly fluid controls.'
                }
              ],
              _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '#### Alignment', lines: '167–184' }
            },
            {
              id: 'fluid-placement',
              heading: 'Placement',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Anchor fluid controls firmly against container perimeters and attach fluid action bars along the bottom edge rather than floating mid-form.'
                }
              ],
              _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '#### Placement', lines: '185–197' }
            },
            {
              id: 'fluid-sizing',
              heading: 'Sizing',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Constrain fluid-width default buttons with practical minimum and maximum bounds across breakpoints so lines never become absurdly narrow or ultra-wide.'
                }
              ],
              _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '#### Sizing', lines: '198–205' }
            },
            {
              id: 'fluid-accessibility',
              heading: 'Accessibility contrast on shared borders',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Because stacked fluid controls share borders with 0px gaps, every boundary between adjacent buttons or fields must achieve at least 3:1 visual color contrast so users clearly tell separate controls apart.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/fluid-styles/index.md',
                heading: '#### Accessibility',
                lines: '206–210'
              }
            }
          ]
        },
        {
          id: 'designing-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not confuse fluid components with forcing 100% width globally. A proven architectural pattern is a hybrid composition: default top-labeled form inputs with comfortable internal breathing room paired with flush 50%/50% fluid footer buttons anchored along the bottom of a dialog or side panel.'
            }
          ],
          _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '### Best practices', lines: '211–222' }
        }
      ]
    },
    {
      id: 'related',
      heading: 'Related components, patterns, and guidelines',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Button', kind: 'component' },
            { label: 'Text inputs & Dropdowns', kind: 'component' },
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Spacing & Color contrast guidelines', kind: 'guideline' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/fluid-styles/index.md', heading: '## Related', lines: '223–249' }
    }
  ],
  demos: [
    {
      id: 'fluid-styles-match-width',
      title: 'Match action width to the task',
      sectionId: 'types-fluid-width-default-buttons',
      mappingStatus: 'mapped',
      scenario:
        'Contrast standard content-sized actions for dense tables against column-spanning actions in expressive areas.',
      teaching: {
        meaning:
          'Fluid-width default buttons follow grid columns cleanly in expressive areas while compact buttons suit dense work.',
        decision:
          'Use fluid-width default buttons with min/max bounds for expressive sections and bottom-attached fluid buttons inside modals or panels; keep default fixed sizing inside dense toolbars.',
        consider: 'Note referenced full-span fluid buttons are marked not production-ready without custom overrides.'
      },
      interactive: false
    },
    {
      id: 'fluid-styles-align-actions',
      title: 'Align related actions in a compact panel',
      sectionId: 'types-fluid-buttons',
      secondarySectionIds: ['fluid-accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Attach related actions to a panel footer so they share its full width instead of floating in the content area.',
      teaching: {
        meaning:
          'Fluid buttons attach related actions to a compound container instead of floating in its content area.',
        decision:
          'Use them for grouped actions at a container edge, such as a panel footer; keep ordinary buttons separated in the content area.',
        consider: 'Make each action distinct and keep shared borders visible enough to separate the choices.'
      },
      interactive: false,
      _demoNote:
        'The visual now shows a shared panel footer with equal-width, adjacent actions and a contrasting divider; it remains a static anatomy reference.'
    },
    {
      id: 'fluid-styles-form-width',
      title: 'Let a fluid form follow its available width',
      sectionId: 'types-fluid-forms',
      secondarySectionIds: ['overview-when-not-to-use'],
      mappingStatus: 'mapped',
      scenario:
        'Size a short form to an enclosing container width while avoiding over-stretched complex or accordion forms.',
      teaching: {
        meaning:
          'Fluid form structure uses flush container edges for simple short tasks rather than unbounded full-width stretching.',
        decision:
          'Use fluid layout only for concise simple workflows; retain default 32px-gutter spacing for complex forms and never place fluid controls inside accordions.',
        consider:
          'Check line lengths across wide viewports and consider hybrid default inputs paired with flush footer buttons.'
      },
      interactive: false
    },
    {
      id: 'fluid-styles-edge-form',
      title: 'Attach a simple form to its container edges',
      sectionId: 'types-fluid-inputs',
      secondarySectionIds: ['fluid-alignment', 'designing-best-practices'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A quick workspace invite uses a compact, stacked group inside one border; keep each field label visible and reserve flush fluid inputs for implementations that support them.',
      teaching: {
        meaning: 'Fluid inputs stack edge-to-edge inside a container with 0px internal gaps and 3:1 shared borders.',
        decision:
          'In reference designs, fluid inputs fix 64px height with internal labels and tooltip-only help; when built with standard external-label inputs, preserve visible labels.',
        consider:
          'Do not treat fluid styling as a universal full-width rule. Keep labels visible; use zero-gap stacking only when the field implementation supports that anatomy.'
      },
      interactive: false,
      _demoNote:
        'The static card keeps external labels visible and explicitly identifies itself as a compact approximation; exact zero-gap fluid fields require a dedicated implementation.'
    },
    {
      id: 'fluid-styles-container-vs-fixed',
      title: 'Choose a fluid container or fixed side panel',
      sectionId: 'types-fluid-containers',
      mappingStatus: 'mapped',
      scenario: 'Compare a grid-responsive fluid container against a constant-width side panel.',
      teaching: {
        meaning:
          'Fluid containers adapt width by grid column spans or percentages, whereas fixed containers hold steady pixel measures independent of grid resizing.',
        decision:
          'Choose fluid containers when proportional scaling helps content fill available columns cleanly; choose a fixed panel when stable form scanning matters most.',
        consider: 'Test responsive breakpoints so narrow panes preserve readable control labels.'
      },
      interactive: false
    }
  ],
  notes: [
    {
      kind: 'source-limit',
      text: 'Fluid styles sits outside the 14-item Universal overview catalog, and component reference docs flag full-span/hanging fluid buttons as non-GA without styling overrides.'
    },
    {
      kind: 'implementation',
      text: 'SkyTrack UI ships standard top-labeled Input primitives without a 64px internal-label fluid variant; keep visible labels on standard Inputs even when demonstrating flush containers.'
    }
  ],
  components: ['Button', 'Field', 'Input']
}

export const PAGE_FORMS: PatternPageDraft = {
  id: 'forms',
  title: 'Forms',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Exploratory / incomplete areas in the reference source: In-line editing inside forms, horizontal dividing Rules between sections, and Accordion forms (beyond dialog bans) do not yet have finalized source guidance.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/forms-pattern/index.md',
    _relatedSources: [{ path: 'components/form/usage.md' }],
    _excludedSections: [
      '### Quick Navigation (lines 15–27)',
      '## References / ### Further reading (lines 811–849)',
      '## Feedback (lines 850–854)'
    ],
    _upstreamAnomalies: [
      'Source repeats "### Deciding what to use" three times (under Text inputs, Selection controls, Bound entry controls); headings are scoped clearly under each parent here.',
      'Source line 168 contains truncated alert heading "DON\'T: DON" above the (optional)-on-complex-forms warning; line 243 leaves an authoring placeholder about MultiSelect examples.'
    ]
  },
  summary:
    'Forms gather structured operator inputs through scannable labels, minority-marked required or optional indicators, purposeful control selection, immediate blur validation, and layouts sized to workflow complexity.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Effective forms ask only for what the workflow truly requires, present controls in logical domain order, and match the validation and button layout to the task length.'
        }
      ],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Overview', lines: '28–29' },
      children: [
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use structured forms whenever users configure resources, enter request parameters, update account or operational records, or submit transactional tasks.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### When to use', lines: '30–42' }
        },
        {
          id: 'overview-respect-user',
          heading: 'Respect the user',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Privacy by design: request only data necessary to complete the task cleanly.',
                'Logical grouping and sequence: group related controls under clear headings in the order users expect (for instance, given name before family name).',
                'Low friction: minimize switching between keyboard typing and mouse clicking, preserve compatibility with password managers and browser autofill, and reveal optional branches progressively.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Respect the user', lines: '43–60' }
        },
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a form',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Labels: identify every control above the input.',
                'Text inputs: collect freeform text, secrets, and multi-line notes.',
                'Data inputs: constrain selection or structured values via choices and bound pickers.',
                'Help mechanisms: helper text, tooltips, placeholders, and safe defaults.',
                'Action buttons: commit, advance, or abandon the form.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Anatomy of a form', lines: '61–79' }
        }
      ]
    },
    {
      id: 'building-a-form',
      heading: 'Building a form',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select every field control, label marker, help layer, and footer button intentionally so operators finish quickly with minimal preventable errors.'
        }
      ],
      demoRefs: ['forms-contact-details'],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Building a form', lines: '80–81' },
      children: [
        {
          id: 'building-labels',
          heading: 'Labels',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Write short, sentence-case labels of one to three words with no trailing colons so eyes scan straight down without visual noise.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Labels', lines: '82–98' },
          children: [
            {
              id: 'labels-top-aligned',
              heading: 'Top-aligned labels',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Place labels consistently directly above every input control to speed vertical scanning and keep horizontal widths flexible across languages.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Top-aligned labels',
                lines: '99–113'
              }
            }
          ]
        },
        {
          id: 'building-optional-vs-mandatory',
          heading: 'Optional versus mandatory fields',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Always mark only the minority state rather than decorating every field on screen.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Optional vs. mandatory',
            lines: '114–158'
          },
          children: [
            {
              id: 'optional-when-to-use',
              heading: 'When to mark optional vs. required',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'On short or mostly mandatory forms, append "(optional)" exclusively to optional fields and leave required fields unmarked. On longer or complex forms where most inputs are optional, append "(required)" exclusively to mandatory fields.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### When to use',
                lines: '159–171'
              }
            },
            {
              id: 'optional-best-practices',
              heading: 'Best practices for field requirement marking',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Apply one rule consistently across all sibling forms of the same category across the platform, and cluster numerous optional fields into their own clearly headed section.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Best practices',
                lines: '172–184'
              }
            }
          ]
        },
        {
          id: 'building-text-inputs',
          heading: 'Text inputs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose between single-line text inputs, masked password fields, and multi-line text areas based on expected answer length, and place initial focus on the first required field upon form entry when appropriate.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Text inputs > ### Deciding what to use > #### Best practices',
            lines: '185–212'
          }
        },
        {
          id: 'building-data-inputs',
          heading: 'Data inputs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Replace freeform typing with structured controls whenever allowable values are enumerable or bounded.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Data inputs', lines: '213–219' },
          children: [
            {
              id: 'data-selection-controls',
              heading: 'Selection controls',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use checkboxes, radio groups, switches, dropdowns/selects, and file uploaders to constrain discrete picks:'
                },
                {
                  type: 'table',
                  columns: ['Control', 'Use rule & layout constraint'],
                  rows: [
                    [
                      'Radio buttons',
                      'Mutually exclusive picks up to 5 choices stacked vertically; pre-select the safest default and add "None" if null is allowed'
                    ],
                    ['Checkboxes', 'Multi-select independent choices up to 5 options stacked vertically'],
                    [
                      'Toggle / Switch',
                      'Instant binary on/off preference with immediate effect; label the controlled attribute clearly'
                    ],
                    [
                      'Select / Combo box / Multiselect',
                      'Mandatory swap whenever choices exceed 5 options so long lists do not overwhelm form flow'
                    ]
                  ]
                }
              ],
              demoRefs: ['forms-optional-checks'],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading:
                  '#### Selection controls > ### Deciding what to use > #### Radio buttons / checkboxes / Toggles / Select lists',
                lines: '220–270'
              }
            },
            {
              id: 'data-bound-entry',
              heading: 'Bound entry controls',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use number steppers, sliders, date pickers, and time pickers whenever inputs follow strict numeric bounds or calendar constraints—preventing malformed entries upfront so freeform text validation is unnecessary.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Bound entry controls > ### Deciding what to use',
                lines: '271–292'
              }
            }
          ]
        },
        {
          id: 'building-offering-help',
          heading: 'Offering help',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Reserve each help layer for a clear role so hints remain accessible after typing starts:'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Offering help', lines: '293–294' },
          children: [
            {
              id: 'help-tooltips',
              heading: 'Tooltips',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'do',
                  text: 'Pair optional background clarifications with an outlined "i" info icon trigger beside the label (or inside internal-label fluid inputs).'
                },
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not use question-mark (?) icons or hide essential formatting rules behind hover/focus tooltips.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: "#### Tooltips > Do / Don't",
                lines: '295–325'
              }
            },
            {
              id: 'help-helper-text',
              heading: 'Helper text',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'do',
                  text: 'Place concise, essential rules directly under labels (shorter than the input width) where text stays visible during focus. When two side-by-side controls differ in helper length, top-align the input boxes themselves rather than misaligning boxes to keep labels level.'
                },
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not write full paragraphs inside field helper text.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: "#### Helper text > Do / Don't",
                lines: '326–356'
              }
            },
            {
              id: 'help-placeholder-text',
              heading: 'Placeholder text',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'do',
                  text: 'Limit placeholders to brief, anonymized example formatting cues that reinforce (never replace) the label and helper text.'
                },
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Never rely on placeholder text as a substitute for visible labels or essential instructions, because placeholders vanish on input.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: "#### Placeholder text > Do / Don't",
                lines: '357–379'
              }
            },
            {
              id: 'help-default-values',
              heading: 'Default values',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pre-fill safe, verifiable defaults—such as today’s date on start pickers or standard environment quotas—only when accuracy is high and unintentional submission carries low risk.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Default values',
                lines: '380–397'
              }
            }
          ]
        },
        {
          id: 'building-buttons',
          heading: 'Buttons',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Buttons', lines: '398–402' },
          children: [
            {
              id: 'buttons-alignment',
              heading: 'Button alignment and margins',
              level: 4,
              blocks: [
                {
                  type: 'table',
                  columns: ['Form surface', 'Horizontal edge / layout', 'Primary vs. Secondary order'],
                  rows: [
                    [
                      'Standard in-page form',
                      'Left-aligned with margins',
                      'Primary farthest left, Secondary (Cancel) right of it'
                    ],
                    [
                      'Multi-step wizard',
                      'Right-aligned with margins',
                      'Secondary (Cancel) left of Primary Next / final verb on the right'
                    ],
                    [
                      'Dialog or Side panel',
                      'Full-width bottom bleed',
                      'Cancel left, single Primary action farthest right (stack with Primary lowest if copy wraps)'
                    ]
                  ]
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Button alignment / Margins vs. full bleed / Button emphasis',
                lines: '403–452'
              }
            },
            {
              id: 'buttons-not-top-aligned',
              heading: 'Keep action bars at the bottom of the form',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Never place form submit buttons above fields at the top of a page; anchor actions below the last input (48px gap) so natural top-to-bottom progression leads to submission.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Do not top-align buttons',
                lines: '453–482'
              }
            },
            {
              id: 'buttons-naming-actions',
              heading: 'Naming form actions',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Avoid generic "Submit" buttons—name the real outcome ("Save plan", "Create route", "Request flight"). Never use a secondary footer button labeled "Back" inside stepped forms; let users return through clickable progress steps, breadcrumbs, or browser history while reserving secondary buttons for Cancel.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Naming actions (+ line 466 Back ban)',
                lines: '466–496'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'behavior',
      heading: 'Behavior',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Behavior', lines: '498–499' },
      children: [
        {
          id: 'behavior-errors-validation',
          heading: 'Errors and validation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Surface validation feedback close to the broken field without clearing valid user work.'
            }
          ],
          demoRefs: ['forms-validation-recovery'],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Errors and validation',
            lines: '500–506'
          },
          children: [
            {
              id: 'validation-client-side',
              heading: 'Client-side validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Validate format and required rules when focus leaves each control (on blur) rather than nagging mid-keystroke or only on submit, and remove the inline error immediately once corrected.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Client-side validation',
                lines: '507–530'
              }
            },
            {
              id: 'validation-server-side',
              heading: 'Server-side validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair server rejection messages with an inline alert summarizing what prevented saving alongside targeted field errors, clearing resolved errors cleanly on re-submission.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Server-side validation',
                lines: '531–546'
              }
            }
          ]
        },
        {
          id: 'behavior-enabling-disabling-buttons',
          heading: 'Enabling and disabling buttons',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Reserve pre-validation disabling strictly for short, compact forms whose entire input set fits comfortably above the fold. On longer forms where offending fields may scroll out of sight, keep the primary submit button enabled so clicking validates and focuses the error—disabling the button only during active in-flight submission to prevent duplicate posts.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Enabling and disabling buttons',
            lines: '547–560'
          }
        },
        {
          id: 'behavior-inline-editing',
          heading: 'In-line editing',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Source limit: consolidated guidance for in-line table or value editing inside forms is incomplete in the maintained local reference.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### In-line editing', lines: '561–570' }
        },
        {
          id: 'behavior-longer-forms',
          heading: 'Designing for longer forms',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Structure complex workflows so operators tackle manageable decisions sequentially rather than facing a wall of unrelated fields:'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Designing for longer forms',
            lines: '571–578'
          },
          children: [
            {
              id: 'longer-progressive-disclosure',
              heading: 'Progressive disclosure',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Hide secondary or branch-specific inputs until an earlier choice makes them relevant.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Progressive disclosure',
                lines: '579–588'
              }
            },
            {
              id: 'longer-accordion-forms',
              heading: 'Accordion forms',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'source-limit',
                  text: 'Never embed accordion sections inside dialog forms; accordion form patterns on full pages remain exploratory without consolidated reference standards.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Accordion forms',
                lines: '589–606'
              }
            },
            {
              id: 'longer-multistep-forms',
              heading: 'Multistep forms',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Divide distinct procedural phases across numbered progress steps, preserving entered answers whenever users revisit earlier steps via the progress indicator.'
                }
              ],
              demoRefs: ['forms-multistep-request'],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Multistep forms',
                lines: '607–630'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'designing-a-form',
      heading: 'Designing a form',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Designing a form', lines: '631–632' },
      children: [
        {
          id: 'designing-layout',
          heading: 'Layout and headings',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Pair a clear page or container title with concise group/section subheadings organizing fields into scannable clusters.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Layout > #### Form headings / Group and section headings',
            lines: '633–651'
          }
        },
        {
          id: 'designing-spacing',
          heading: 'Spacing',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use standard 40px default input heights. Apply 32px vertical spacing between inputs on spacious full pages versus 24px or 16px inside compact dialogs/panels, widen to 32px–40px before distinct field groups, and allow 48px before action buttons. Horizontal hairline dividing rules across form sections currently lack finalized source guidance.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Spacing > #### Form context / Separating... / Rules',
            lines: '652–699'
          }
        },
        {
          id: 'designing-columns',
          heading: 'Columns',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Default to a single vertical column so gaze travels straight downward. Combine two or three inputs horizontally only when they form one tight conceptual cluster—such as First / Middle / Last name, City / State / Postal code, or Card / Expiration / CVC.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Columns', lines: '700–732' }
        }
      ]
    },
    {
      id: 'variants',
      heading: 'Variants',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Size the host container to field volume and whether page context must remain readable:'
        },
        {
          type: 'variants',
          items: [
            {
              title: 'Dialog forms',
              whenToUse: 'Self-contained interruptions holding fewer than 5 fields.',
              whenNotToUse:
                'Flows exceeding 4 fields, needing vertical tabs/accordions, or requiring background page access.'
            },
            {
              title: 'Side panel forms',
              whenToUse:
                'Forms of 5 or more fields, repeated editing tasks, or entry tasks benefiting from live reference to the page behind (without tabs or accordions).'
            }
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/forms-pattern/index.md',
        heading: '## Variants > Deciding what to use > Dialog forms / Side panel forms',
        lines: '733–764'
      }
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Wrap inputs in semantic form elements, associate labels and error messages programmatically, maintain predictable visual Tab order, avoid hiding formatting syntax inside disappearing placeholders, and declare overall form rules and required conventions before users begin traversing inputs.'
        }
      ],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Accessibility', lines: '765–788' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            {
              label: 'Text inputs, Checkbox, Radio, Switch, Select, DatePicker, NumberField, Slider',
              kind: 'component'
            },
            { label: 'Common actions', kind: 'pattern' },
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Fluid styles', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Related', lines: '789–810' }
    }
  ],
  demos: [
    {
      id: 'forms-contact-details',
      title: 'Collect mission contact details',
      sectionId: 'building-a-form',
      secondarySectionIds: ['building-labels', 'optional-when-to-use', 'designing-columns'],
      mappingStatus: 'mapped',
      scenario:
        'Collect essential contact fields with clear labels, helper text, and minority-only optional indicators.',
      teaching: {
        meaning:
          'A form gathers the information needed to complete a task, with labels and required/optional status that users can understand.',
        decision:
          'Ask only for necessary details, mark only the minority state ((optional) on mostly required forms; (required) on complex mostly optional forms), and default to single-column stacking unless fields form a tight cluster.',
        consider:
          'Use concise 1–3 word labels without colons, avoid placeholders as labels, and top-align adjacent inputs when helper lengths differ.'
      },
      interactive: true
    },
    {
      id: 'forms-validation-recovery',
      title: 'Validate and recover from missing information',
      sectionId: 'behavior-errors-validation',
      secondarySectionIds: ['validation-client-side', 'validation-server-side', 'behavior-enabling-disabling-buttons'],
      mappingStatus: 'mapped',
      scenario:
        'Catch client errors on blur, clear resolved errors immediately, and distinguish server-side rejection feedback.',
      teaching: {
        meaning: 'Validation tells users which input needs attention and how to fix it before they continue.',
        decision:
          'Run client checks when focus leaves a field (on blur), keep submit buttons enabled on longer forms so users can locate scrolled errors, and show an inline alert for server rejections.',
        consider:
          'Keep entered values intact, associate each message programmatically with its field, and clear fixed errors immediately.'
      },
      interactive: true
    },
    {
      id: 'forms-multistep-request',
      title: 'Break a long mission request into steps',
      sectionId: 'longer-multistep-forms',
      secondarySectionIds: ['buttons-alignment', 'buttons-naming-actions'],
      mappingStatus: 'mapped',
      scenario:
        'Organize an extended multi-phase request across progress steps while preserving entered values across steps.',
      teaching: {
        meaning: 'A multi-step form divides a longer task into manageable stages with linear progress orientation.',
        decision:
          'Use wizards for genuinely multi-stage tasks, aligning actions on the right (secondary Cancel left of Primary Next / final completion label) rather than placing a "Back" button on secondary footer controls.',
        consider:
          'Let users return to earlier stages via the progress indicator or breadcrumbs without losing entered values.'
      },
      interactive: true
    },
    {
      id: 'forms-optional-checks',
      title: 'Select optional checks for a mission request',
      sectionId: 'data-selection-controls',
      mappingStatus: 'mapped',
      scenario:
        'Present independent multi-select options in a vertical checkbox group (switching to Combobox/Multiselect beyond five items).',
      teaching: {
        meaning: 'Checkboxes let users select independent optional checks that can apply together.',
        decision:
          'Stack Checkbox or Radio controls vertically when options are <= 5 (switch to Select/Combobox when > 5); use Checkbox for non-exclusive sets and Radio with a safe default when mutually exclusive.',
        consider:
          'Pair bound inputs (NumberField, Slider, DatePicker) for bounded numerical or calendar values to eliminate unnecessary freeform validation errors.'
      },
      interactive: true
    }
  ],
  notes: [
    {
      kind: 'source-limit',
      text: 'Maintained source notes that inline form editing, section horizontal divider rules, and accordion forms lack finalized rules (and bans accordions/tabs inside dialog/panel forms).'
    },
    {
      kind: 'implementation',
      text: 'SkyTrack UI ships Radio, Switch, Combobox, NumberField, DatePicker, and Slider to cover the full Data Inputs and Bound Entry taxonomy.'
    }
  ],
  components: [
    'Field',
    'Input',
    'Checkbox',
    'Radio',
    'Switch',
    'Combobox',
    'NumberField',
    'DatePicker',
    'Slider',
    'Button',
    'Alert'
  ]
}

export const PAGE_GLOBAL_HEADER: PatternPageDraft = {
  id: 'global-header',
  title: 'Global header',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/global-header/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 15–26)',
      '## References (lines 407–425)',
      '## Feedback (lines 426–430)'
    ]
  },
  summary:
    'The global header establishes persistent cross-application navigation, system utilities, and product identity while separating cross-workspace shell actions cleanly from local mission navigation.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Anchor the top shell bar consistently across platform products so operators always recognize where they sit, switch products cleanly, and open utilities without losing active context.'
        }
      ],
      _sourceCitation: { path: 'patterns/global-header/index.md', heading: '## Overview', lines: '27–39' },
      children: [
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a global header',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Main menu toggle: optional hamburger icon opening and closing an accompanying left navigation panel.',
                'Header brand name: platform identifier followed by product title, linking directly back to the product or domain home view.',
                'Header navigation links: peer product sections within the same domain (never spawning new tabs or crossing to external domains); collapse cleanly into the left panel on narrow screens.',
                'Sub-menu triggers: non-link dropdown triggers whose chevron rotates upward while expanded, closing upon item selection, label toggle, or outside click.',
                'Utilities: right-justified system icons (notifications, profile, settings, search) opening utility drawers or panels—never navigating away as direct links.',
                'App switcher: dedicated right-edge menu listing recent, frequent, or platform applications.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Anatomy of a global header',
            lines: '40–65'
          }
        },
        {
          id: 'overview-persistence',
          heading: 'Header and panel persistence',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Distinguish global persistence (shell zones that stay constant across the entire product suite) from local persistence (controls shown only inside one product section or workflow).'
            }
          ],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Header and panel persistence',
            lines: '66–75'
          }
        },
        {
          id: 'overview-task-hierarchy',
          heading: 'Task hierarchy',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Separate system tasks (authentication, workspace switching, notifications, preferences, billing) from product tasks (creating, filtering, analyzing, and collaborating on domain records).'
            }
          ],
          _sourceCitation: { path: 'patterns/global-header/index.md', heading: '### Task hierarchy', lines: '76–86' }
        },
        {
          id: 'overview-examples-matrix',
          heading: 'Persistence and task placement matrix',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Scope', 'System tasks', 'Product tasks'],
              rows: [
                [
                  'Global (everywhere)',
                  'Login, account/profile, notifications, home dashboard link, billing, permissions, product switcher',
                  'Left-nav drawer toggle, consistent cross-product Create/Save/Cancel actions'
                ],
                [
                  'Local (single product)',
                  'Detailed workspace or notification configuration',
                  'Comments, record-to-record hops, context/mode toggles'
                ]
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/global-header/index.md', heading: '### Examples', lines: '87–98' }
        }
      ]
    },
    {
      id: 'configurations',
      heading: 'Configurations',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select the header-only shell or pair it with a persistent/collapsible left navigation panel according to hierarchy depth and whether sub-menus must stay visible.'
        }
      ],
      demoRefs: ['global-header-with-local-nav'],
      _sourceCitation: { path: 'patterns/global-header/index.md', heading: '## Configurations', lines: '99–113' },
      children: [
        {
          id: 'config-header-only',
          heading: 'Header only',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Best when top-level product destinations are few enough to fit cleanly across the header bar and no sub-menu group needs to stay pinned open alongside page content (since open header sub-menus overlay the workspace).'
            }
          ],
          _sourceCitation: { path: 'patterns/global-header/index.md', heading: '### Header only', lines: '114–134' }
        },
        {
          id: 'config-header-left-panel',
          heading: 'Header with left panel',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use when products carry deeper hierarchies, secondary category links, or nested sub-menus that benefit from staying expanded vertically without occluding workspace tables or maps.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Header with left panel',
            lines: '135–148'
          }
        }
      ]
    },
    {
      id: 'navigation',
      heading: 'Navigation',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/global-header/index.md', heading: '## Navigation', lines: '149–150' },
      children: [
        {
          id: 'nav-global',
          heading: 'Global navigation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Right-justify global system utilities and left-align product shell links. On constrained viewports, route left-aligned product links into the left drawer and right-aligned system utilities cleanly into a dedicated right utility panel while keeping shared platform suites structurally consistent.'
            }
          ],
          _sourceCitation: { path: 'patterns/global-header/index.md', heading: '### Global', lines: '151–178' }
        },
        {
          id: 'nav-local',
          heading: 'Local navigation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Keep workflow-specific tabs, mission selectors, and scoped actions below the global bar inside page context rather than inflating global header slots.'
            }
          ],
          _sourceCitation: { path: 'patterns/global-header/index.md', heading: '### Local', lines: '179–196' }
        }
      ]
    },
    {
      id: 'best-practices',
      heading: 'Best practices',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/global-header/index.md', heading: '## Best practices', lines: '197–198' },
      children: [
        {
          id: 'bp-persistent-state',
          heading: 'Persistent data and UI state',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Preserve active filters, selected mission context, and view state across navigation pivots (for example through URL parameters, noting that application routing must supply state persistence rather than expecting header shell markup to track it). Warn operators before leaving unsaved changes.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Persistent data and UI state',
            lines: '199–212'
          }
        },
        {
          id: 'bp-sense-of-place',
          heading: 'Sense of place',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Make signed-in account identity, active workspace/environment, active navigation item, and operating mode unmistakable from any screen.'
            }
          ],
          _sourceCitation: { path: 'patterns/global-header/index.md', heading: '### Sense of place', lines: '213–222' }
        },
        {
          id: 'bp-breadcrumbs',
          heading: 'Drill down levels and breadcrumbs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When opening deep object records from collection views, place a breadcrumb trail directly above the page title leading cleanly back to root context.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Drill down levels and breadcrumbs',
            lines: '223–241'
          }
        },
        {
          id: 'bp-organizational-schemes',
          heading: 'Organizational schemes',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose an information architecture matching how operators mentally find tools—and avoid letting unbounded user data overrun shell navigation:'
            }
          ],
          demoRefs: ['global-header-organize-destinations'],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Organizational schemes',
            lines: '242–252'
          },
          children: [
            {
              id: 'scheme-most-recent',
              heading: 'Most recent',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Surfaces recently opened workspaces or services first for quick recall, though weaker for discovering unfamiliar capabilities.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/global-header/index.md',
                heading: '#### Most recent',
                lines: '253–259'
              }
            },
            {
              id: 'scheme-customized',
              heading: 'Customized',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Permits operators or admins to pin priority destinations for recurring workflows.'
                }
              ],
              _sourceCitation: { path: 'patterns/global-header/index.md', heading: '#### Customized', lines: '260–264' }
            },
            {
              id: 'scheme-audience',
              heading: 'Audience',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Groups tools around distinct role workflows (pilots, planners, dispatchers), watching out for shared cross-role overlap.'
                }
              ],
              _sourceCitation: { path: 'patterns/global-header/index.md', heading: '#### Audience', lines: '265–271' }
            },
            {
              id: 'scheme-alphabetically',
              heading: 'Alphabetically',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Useful strictly when operators already know exact product names; breaks down whenever users search by synonym or task.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/global-header/index.md',
                heading: '#### Alphabetically',
                lines: '272–278'
              }
            },
            {
              id: 'scheme-company-org',
              heading: 'Domain organization',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Organize destinations by cohesive product capabilities and user domain concepts—never mirror internal corporate org charts or acquisition history.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/global-header/index.md',
                heading: '#### Company organization',
                lines: '279–285'
              }
            },
            {
              id: 'scheme-unbound-content',
              heading: 'Unbound content',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not push user-created, arbitrarily growing record lists (hundreds of individual missions or logs) into shell side navigation—surface unbounded collections inside index tables and object drill-downs instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/global-header/index.md',
                heading: '#### Unbound content',
                lines: '286–292'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/global-header/index.md', heading: '## Accessibility', lines: '293–294' },
      children: [
        {
          id: 'a11y-dom-order',
          heading: 'Matching DOM order to visual hierarchy',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Sequence DOM elements to mirror left-to-right visual flow (per WCAG C27), keeping responsive panel collapse orderly and aligning HTML headings (h1–h6) strictly to visual hierarchy for non-sighted header scanning.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Matching source code order to the visual hierarchy > #### Navigating content by headers',
            lines: '295–341'
          }
        },
        {
          id: 'a11y-keyboard-navigation',
          heading: 'Keyboard navigation and landmarks',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/global-header/index.md',
            heading: '### Keyboard navigation',
            lines: '342–343'
          },
          children: [
            {
              id: 'a11y-skip-link',
              heading: 'Skip to main content',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Place a keyboard-focusable "Skip to main content" link as the very first focus stop on the page (WCAG 2.4.1) so keyboard users bypass repetitive shell chrome directly into primary content.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/global-header/index.md',
                heading: '#### Skip to main content',
                lines: '344–365'
              }
            },
            {
              id: 'a11y-landmarks',
              heading: 'Landmark regions and rotor navigation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Define distinct banner, navigation, search, and main landmark regions, giving every `<nav>` block (such as Global shell vs. Mission local navigation) a unique descriptive `aria-label` so screen-reader rotors tell regions apart unambiguously.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/global-header/index.md',
                heading: '#### Landmark regions / Navigating the page via regions',
                lines: '366–399'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Breadcrumb', kind: 'component' },
            { label: 'Menu & Navigation', kind: 'component' },
            { label: 'Disclosures (Profile menu)', kind: 'pattern' },
            { label: 'Notifications (Panel)', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/global-header/index.md', heading: '## Related', lines: '400–406' }
    }
  ],
  demos: [
    {
      id: 'global-header-with-local-nav',
      title: 'Global header with local mission navigation',
      sectionId: 'configurations',
      secondarySectionIds: ['overview-anatomy', 'nav-global', 'nav-local', 'a11y-landmarks'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare a workspace-wide header alone with the same header beside mission-specific destinations; keep utilities and product switching separate.',
      teaching: {
        meaning:
          'A global header gives persistent access to workspace-wide destinations while local navigation supports the current mission.',
        decision:
          'Use header-only when hierarchy is shallow and sub-menus need not stay pinned open; add the left panel for vertical navigation layers, separating utility panel triggers from the app switcher.',
        consider:
          'Provide a "Skip to main content" first Tab link, label separate nav landmarks uniquely, and route responsive product links left vs. system utilities right.'
      },
      interactive: true,
      _demoNote:
        'The desktop preview separates the Utilities menu from product switching and includes a skip link. It does not model mobile utility drawers or expandable submenu states.'
    },
    {
      id: 'global-header-organize-destinations',
      title: 'Organize destinations around workspace or current mission',
      sectionId: 'bp-organizational-schemes',
      secondarySectionIds: ['scheme-unbound-content', 'bp-breadcrumbs', 'bp-sense-of-place'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare organizing top-level destinations by task scope and illustrate why domain-structured IA avoids org-chart or unbounded-list clutter.',
      teaching: {
        meaning:
          'Navigation can be organized using clear domain schemes—most recent, customized, audience, alphabetical, or product capabilities—while excluding unbounded user records from side rails.',
        decision:
          'Choose a scheme aligned to how users look up tools rather than internal company hierarchy, and move large user-created lists into drill-down index views with breadcrumbs.',
        consider:
          'Keep active account/mode visible and preserve filters in URL state across navigation pivots. The preview compares five bounded destination schemes; it does not model saved account or URL state.'
      },
      interactive: true,
      _demoNote:
        'The local preview compares the five bounded schemes and explains where user-created records belong; saved account mode and URL filter state are not simulated.'
    }
  ],
  components: ['Breadcrumb', 'Menu', 'Button', 'Drawer']
}

export const PAGE_LOADING: PatternPageDraft = {
  id: 'loading',
  title: 'Loading',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'SkyTrack UI package constraint: SkyTrack UI ships `Progress` (`progress.tsx`) and does NOT currently ship dedicated `Skeleton`, activity spinner `Loading`, or `InlineLoading` primitives. Local examples use pulse placeholder geometry and indeterminate `<Progress value={null}>` bars strictly as visual stand-ins.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/loading-pattern/index.md',
    _relatedSources: [{ path: 'components/loading/usage.md' }, { path: 'components/inline-loading/usage.md' }],
    _excludedSections: [
      '### Quick Navigation (lines 15–27)',
      '## References (lines 191–202)',
      '## Feedback (lines 203–207)'
    ]
  },
  summary:
    'Loading feedback communicates active progress, scopes waiting precisely to blocked vs. local regions, escalates appropriately with wait duration, and keeps interactive controls accessible.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select loading treatments by how predictable the layout is and how long the operation lasts:'
        },
        {
          type: 'table',
          columns: ['Estimated duration & context', 'Recommended loading mechanism'],
          rows: [
            [
              'Sub-3 seconds / initial known layout load',
              'Skeleton states (animated placeholders for containers and primary data blocks)'
            ],
            [
              'Unknown wait > 3 seconds',
              'Activity spinner (inline for a local control/row, full-screen only when entire page is blocked)'
            ],
            [
              'Measurable duration exceeding a moment or two',
              'Determinate progress bar reporting real progress (never swap a bar for short indeterminate spinners in production)'
            ],
            [
              'Background job taking several minutes or more',
              'Hand off cleanly and notify the operator via notification when finished'
            ]
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/loading-pattern/index.md',
        related: [{ path: 'components/loading/usage.md', lines: '40–41' }],
        heading: '## Overview',
        lines: '28–38'
      }
    },
    {
      id: 'skeleton-states',
      heading: 'Skeleton states',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use animated skeleton blocks solely on initial page loads lasting at most a few seconds when the target container shape is known ahead of arrival. Render skeletons for structural cards, tiles, structured lists, and data tables—leaving interactive action controls omitted or inactive until ready.'
        },
        {
          type: 'callout',
          kind: 'dont',
          text: 'Never place skeletons on interactive buttons, form inputs, checkboxes, toggles, toast notifications, overflow menus, dropdown options, loading spinners, or outer modal frames (skeletonize only inner modal body data).'
        }
      ],
      demoRefs: ['loading-skeleton-list'],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Skeleton states', lines: '39–65' }
    },
    {
      id: 'loading-indicators',
      heading: 'Loading indicators',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Indeterminate activity spinners report active work without inventing fake percentages once a wait passes roughly three seconds; promote to a determinate progress indicator once meaningful steps or completion percentages can be measured—and avoid stacking multiple simultaneous spinners on one view.'
        },
        {
          type: 'callout',
          kind: 'source-limit',
          text: 'SkyTrack package note: because spinner primitives (`Loading`, `InlineLoading`) are not yet present in SkyTrack UI, the measured progress demo sits here alongside indeterminate progress-bar stand-ins.'
        }
      ],
      demoRefs: ['loading-measured-progress'],
      _sourceCitation: {
        path: 'patterns/loading-pattern/index.md',
        related: [{ path: 'components/loading/usage.md', lines: '40–66' }],
        heading: '## Loading indicators',
        lines: '66–75'
      },
      children: [
        {
          id: 'loading-full-screen',
          heading: 'Full-screen loading',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a full-screen blocking spinner overlay sparingly only when saving, switching tenant environment, or recalculating page-wide state prevents safe interaction across the entire viewport.'
            }
          ],
          demoRefs: ['loading-full-screen-save'],
          _sourceCitation: {
            path: 'patterns/loading-pattern/index.md',
            heading: '### Full-screen loading',
            lines: '76–97'
          }
        },
        {
          id: 'loading-inline',
          heading: 'Inline loading',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Scope an inline spinner directly to the triggered button, row, or form panel while the rest of the workspace stays usable. While active, disable both the triggering action and dependent actions like Cancel; transition cleanly to a brief finished checkmark (~1.5s before invoking the follow-up completion callback) or revert to inactive alongside an inline error alert on failure.'
            }
          ],
          demoRefs: ['loading-inline-check'],
          _sourceCitation: {
            path: 'patterns/loading-pattern/index.md',
            related: [{ path: 'components/inline-loading/usage.md', lines: '102–140' }],
            heading: '### Inline loading',
            lines: '98–112'
          }
        }
      ]
    },
    {
      id: 'progressive-loading',
      heading: 'Progressive loading',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Staged progressive loading accelerates large multi-source dashboards and complex faceted tables by rendering core structure in priority order instead of blocking behind one global spinner:'
        },
        {
          type: 'list',
          items: [
            'Batch 1 (render immediately): layout containers, non-data UI chrome and headings, and lightweight skeletons for primary data values.',
            'Batch 2+ (stream asynchronously): heavy charts, offscreen table rows, secondary action controls, and delayed imagery—reserving fixed empty negative space matched to final image dimensions (e.g., 600×600px) rather than mandatory skeleton boxes so layouts never jump.'
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/loading-pattern/index.md',
        heading: '## Progressive loading',
        lines: '113–148'
      }
    },
    {
      id: 'load-more-options',
      heading: 'Load more options',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Pair truncated database-backed feeds or tables with an explicit "Load more" control to retrieve additional batches asynchronously while keeping scroll stability and current context intact.'
        }
      ],
      demoRefs: ['loading-batch-collection'],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Load more options', lines: '149–162' }
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Expose loading, busy, stalled, and failed transitions programmatically using `aria-busy` on updating containers and polite live regions so non-visual operators know whether work is still underway, stalled, or finished without polling visually.'
        }
      ],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Accessibility', lines: '163–173' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Progress', kind: 'component' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Dialogs', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Related', lines: '174–190' }
    }
  ],
  demos: [
    {
      id: 'loading-measured-progress',
      title: 'Show measured task progress',
      sectionId: 'loading-indicators',
      secondarySectionIds: ['overview'],
      mappingStatus: 'mapped',
      scenario:
        'Display real completion percentage when upload or processing stages are measurable and run past a brief wait.',
      teaching: {
        meaning:
          'A progress indicator reports how much of a task is complete when the system can measure real step progress.',
        decision:
          'Use measured progress indicators once work exceeds a moment or two with real completion steps; use an activity spinner when duration cannot be measured.',
        consider: 'Never invent synthetic percentages, and transition cleanly to completion or failure recovery.'
      },
      interactive: true
    },
    {
      id: 'loading-inline-check',
      title: 'Keep an inline check responsive',
      sectionId: 'loading-inline',
      secondarySectionIds: ['accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Show local activity feedback for one connection check without blocking the rest of the page; the sample keeps its trigger and Cancel check unavailable while active.',
      teaching: {
        meaning:
          'Inline loading communicates that a single control or region is busy while sibling workflows remain interactive.',
        decision:
          'Disable the trigger and related Cancel controls while active, transition through a brief finished confirmation (~1.5s) before follow-up actions, or revert with an inline error on failure.',
        consider:
          'SkyTrack UI lacks `InlineLoading` spinner primitives, so this local demo substitutes an indeterminate `<Progress value={null}>` bar.'
      },
      interactive: true,
      _demoNote:
        'Uses the supported indeterminate Progress composition and a separate completion control for the local preview; it does not simulate the source 1.5s transition or failure recovery.'
    },
    {
      id: 'loading-full-screen-save',
      title: 'Block the page while a save completes',
      sectionId: 'loading-full-screen',
      mappingStatus: 'partial-divergent',
      scenario:
        'Cover an entire blocking workflow temporarily so conflicting mutations cannot occur during critical save processing.',
      teaching: {
        meaning:
          'A page-level busy overlay signals that a save or workspace switch blocks safe interaction until finished.',
        decision:
          'Reserve blocking overlays strictly for full-context operations lasting > 3 seconds; isolate local tasks with inline loading instead.',
        consider:
          'Ensure overlay scrims cover or disable triggering controls as well as body inputs and announce completion clearly.'
      },
      interactive: true,
      _demoNote:
        'The local overlay blocks its sample content; a labeled demo control remains outside so readers can end the preview. A real page-level save should block the rest of the page.'
    },
    {
      id: 'loading-batch-collection',
      title: 'Load a collection in batches',
      sectionId: 'load-more-options',
      secondarySectionIds: ['progressive-loading'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Reveal the next sample batch on request while preserving the list and making the end of the collection clear.',
      teaching: {
        meaning: 'A Load more control reveals the next portion of a collection without forcing a full-page reload.',
        decision:
          'Pair incremental initial batching with Load more when operators scan sequentially; consider multi-batch progressive loading (containers first, reserved whitespace for delayed media) on large dashboards.',
        consider: 'Preserve scroll focus/position and announce loading state cleanly.'
      },
      interactive: true,
      _demoNote:
        'The local sample reveals its next records immediately and says it does not fetch data or simulate network delay.'
    },
    {
      id: 'loading-skeleton-list',
      title: 'Reserve the shape of a list while its first data loads',
      sectionId: 'skeleton-states',
      secondarySectionIds: ['accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Preview known container and text structure on brief initial loads without skeletonizing buttons, menus, toasts, or outer modal shells.',
      teaching: {
        meaning: 'A skeleton previews known structural layout during brief (< a few seconds) initial page loads.',
        decision:
          'Use skeletons strictly on containers and data blocks (cards, list items, table data, inner modal bodies)—never on action buttons, inputs, menus, dropdown items, toast alerts, or outer modals.',
        consider:
          'Expose loading regions with aria-busy rather than misleading static `role="img"` placeholders alone, and show content immediately upon arrival.'
      },
      interactive: false,
      _demoNote:
        'The local pulse-bar illustration now exposes `aria-busy` on its containing region and hides decorative bars from assistive technology; the package still has no Skeleton primitive.'
    }
  ],
  notes: [
    {
      kind: 'implementation',
      text: 'Package gap: `src/components/ui/` provides `Progress` (`progress.tsx`) only; `Skeleton`, full-page spinner `Loading`, and `InlineLoading` primitives do not yet exist in SkyTrack UI.'
    }
  ],
  components: ['Progress', 'Button', 'Badge']
}

export const PAGE_LOGIN: PatternPageDraft = {
  id: 'login',
  title: 'Login',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Multi-factor authentication limit: the maintained local reference explicitly states that no consolidated MFA pattern guidance exists yet; MFA examples in the demo showcase represent local SkyTrack illustrations.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/login-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 13–23)',
      '## References (lines 417–428)',
      '## Feedback (lines 429–433)'
    ]
  },
  summary:
    'A security-first sign-in pattern using "Log in" framing, progressive user-ID discovery, strict password-reset failure handling that guards against account enumeration, disciplined spacing rules, and landmark accessibility.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Authentication screens verify identity before granting workspace access while avoiding unnecessary clutter, layout shifts, or security leaks.'
        }
      ],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Overview', lines: '24–29' },
      children: [
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a basic login screen',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Header title: always label the screen "Log in" (optionally naming the product) rather than "Sign in".',
                'Optional "Create account" route placed clearly outside decorative marketing columns.',
                'User ID input (commonly email, with optional ID-type selector) before progressively revealing password entry.',
                'Optional "Forgot ID or password" recovery link.',
                'Optional "Remember user ID" option worded explicitly so users know passwords are never stored locally.',
                'Optional ordered list of verified alternate login methods (federated identity or SSO providers).',
                'Primary "Continue" button that discovers or advances into the appropriate authentication method.',
                'Optional "Need help?" support trigger assisting with unknown user IDs.',
                'Optional subtle, brand-consistent page background.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Anatomy of a basic login screen',
            lines: '30–64'
          }
        },
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Initial session entry when accessing a protected workspace or product.',
                'Voluntary logout: show a clear signed-out confirmation and redirect automatically back to the login screen.',
                'Inactivity session expiration: prompt re-authentication and redirect back to the operator’s previous page afterward.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '### When to use', lines: '65–75' }
        }
      ]
    },
    {
      id: 'behavior',
      heading: 'Behavior',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Behavior', lines: '76–77' },
      children: [
        {
          id: 'behavior-progressive-auth',
          heading: 'Progressive authentication',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Collect only the user identifier first and click Continue so authentication can inspect the domain or identity policy before disclosing the next screen—reducing clutter and routing SSO users automatically.'
            }
          ],
          demoRefs: ['login-progressive-auth'],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Progressive authentication',
            lines: '78–89'
          },
          children: [
            {
              id: 'progressive-sso',
              heading: 'Single sign-on (SSO)',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Route recognized enterprise domains directly into their corporate identity provider—or offer an explicit SSO action when automatic detection cannot run.'
                }
              ],
              _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '#### SSO', lines: '90–101' }
            },
            {
              id: 'progressive-username-password',
              heading: 'Username and password',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Advance to password entry showing a non-editable ID reminder with a back link to change the user ID alongside "Forgot password". Security rule: never report that an email or account does not exist before the full credential check runs on submission.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Username and password',
                lines: '102–117'
              }
            },
            {
              id: 'progressive-mfa',
              heading: 'Multi-factor authentication',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'source-limit',
                  text: 'Source limit: the maintained local reference provides no standardized multi-factor verification flow guidance yet; design second-factor steps cautiously with clear fallback recovery.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Multi-factor authentication',
                lines: '118–129'
              }
            },
            {
              id: 'progressive-separate-methods',
              heading: 'Showing alternate login options upfront',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When your platform must offer federated social or alternate logins on step one alongside user ID, build the form with default-styled controls so the Continue action aligns cleanly next to the user ID input without crowding.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Separate authentication methods',
                lines: '130–154'
              }
            }
          ]
        },
        {
          id: 'behavior-errors-validation',
          heading: 'Errors and validation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Combine prompt client-side format validation with uniform, anti-enumeration server error recovery.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Errors and validation',
            lines: '155–164'
          },
          children: [
            {
              id: 'errors-content-guidelines',
              heading: 'Content guidelines',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'End full-sentence messages with periods (e.g., "Incorrect ID or password. Try again."), and omit periods on brief field-level fragments (such as "Password is required" or "Enter a valid email").'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Content guidelines',
                lines: '165–172'
              }
            },
            {
              id: 'errors-client-validation',
              heading: 'Client-side validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Validate blank required inputs and syntactic format when focus blurs or Continue is activated, clearing each inline field error immediately as valid input arrives.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Client-side validation',
                lines: '173–207'
              }
            },
            {
              id: 'errors-server-errors',
              heading: 'Server-side errors',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When credentials fail server verification after both ID and password are submitted, reload cleanly back to the user-ID entry state, wipe the entered password completely, display a generic error notification naming both fields equally (preventing account enumeration), and stack multiple system notices cleanly without wiping other active page context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Server-side errors',
                lines: '208–236'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'design-and-layout',
      heading: 'Design and layout',
      level: 2,
      blocks: [],
      demoRefs: ['login-choose-layout'],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Design and layout', lines: '237–238' },
      children: [
        {
          id: 'layout-fluid-vs-default',
          heading: 'Fluid versus default components and alternate button rules',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Fluid form controls fit crisp, floating progressive boxes; swap to default controls whenever upfront alternate identity buttons share the screen.'
            },
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never stack alternate SSO/social buttons above the primary login form, never wedge alternate buttons between the User ID input and its Continue button, and never bury Create account or SSO links inside the decorative marketing column of a split-screen layout.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Fluid vs. default components > #### Designing for multiple alternate logins',
            lines: '239–286'
          }
        },
        {
          id: 'layout-position',
          heading: 'Position',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '### Position', lines: '287–297' },
          children: [
            {
              id: 'position-centered',
              heading: 'Centered layout',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Centers a focused login card over a calm solid canvas or low-contrast background pattern without distracting complex illustrations.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Centered layout',
                lines: '298–316'
              }
            },
            {
              id: 'position-split-screen',
              heading: 'Split-screen layout',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Places interactive sign-in fields cleanly beside an adjacent product context or artwork panel while keeping every real account/SSO link inside the form column.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Split-screen layout',
                lines: '317–356'
              }
            }
          ]
        },
        {
          id: 'layout-spacing',
          heading: 'Spacing',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Maintain balanced outer container breathing room in floating fluid login cards so step transitions do not jar vertical height. In unboxed default login layouts, tighten upper spacing by 24px whenever the optional "Remember ID" checkbox is omitted.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Spacing > #### Fluid style login form / Default style login form',
            lines: '357–402'
          }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Preserve logical keyboard Tab flow across links, fields, and alternate providers, and wrap the authentication form inside an explicit named landmark region so screen-reader users jump directly past split-screen artwork or marketing text straight to "Log in".'
        }
      ],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Accessibility', lines: '403–410' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Button & Text inputs', kind: 'component' },
            { label: 'OTP field', kind: 'component' },
            { label: 'Fluid styles', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Related', lines: '411–416' }
    }
  ],
  demos: [
    {
      id: 'login-choose-layout',
      title: 'Choose a sign-in layout',
      sectionId: 'design-and-layout',
      secondarySectionIds: ['position-centered', 'position-split-screen', 'accessibility'],
      mappingStatus: 'mapped',
      scenario:
        'Switch between centered and split-screen "Log in" layouts without scattering interactive links into decorative space.',
      teaching: {
        meaning:
          'Centered and split layouts present the same sign-in task with different room for context or supporting artwork.',
        decision:
          'Use centered layout over solid or subtle backgrounds for focus; choose split layout when scannable product context fits beside login—never placing Create account or SSO links in the decorative column.',
        consider:
          'Wrap the form in a dedicated landmark region so assistive tech jumps past split-screen copy, and preserve responsive readability.'
      },
      interactive: true
    },
    {
      id: 'login-progressive-auth',
      title: 'Authenticate progressively and recover from an error',
      sectionId: 'behavior-progressive-auth',
      secondarySectionIds: ['errors-server-errors', 'progressive-mfa'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Step from user ID to SSO or password entry, reset password and step safely on credential error, and isolate MFA as illustrative.',
      teaching: {
        meaning:
          'Progressive authentication gathers User ID first with Continue, then routes to SSO or Password without premature account-existence checks.',
        decision:
          'Never validate unknown accounts before password submission; on credential failure, clear password, return to ID entry with one identical message ("Incorrect ID or password. Try again."), and stack server alerts.',
        consider:
          'MFA guidance is incomplete in the maintained reference; any verification-code step is strictly an illustrative SkyTrack continuation.'
      },
      interactive: true
    }
  ],
  components: ['Field', 'Input', 'OtpField', 'Button', 'Checkbox', 'Alert']
}

export const PAGE_NOTIFICATIONS: PatternPageDraft = {
  id: 'notifications',
  title: 'Notifications',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Experimental WIP concepts: Banner notifications and the Notification panel are explicitly flagged experimental / work-in-progress requiring further design iteration in the maintained local reference.',
      'Deferred Error pattern: standalone dedicated Error states pattern documentation is noted as planned future work.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/notification-pattern/index.md',
    _relatedSources: [{ path: 'components/notification/usage.md' }],
    _excludedSections: [
      '### Quick Navigation (lines 14–26)',
      '## References (lines 472–491)',
      '## Feedback (lines 492–496)'
    ],
    _upstreamAnomalies: [
      '## Overview jumps straight from H2 to #### Notification status and #### Notification type (normalized to level 3 cleanly).',
      'Banner and Panel "Best practices:" subtitles carry trailing colons in source markdown.'
    ]
  },
  summary:
    'Notifications communicate events and task outcomes through three independent choices: event category, semantic status, and presentation. Keep urgency clear while limiting unnecessary interruption.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Every effective notification explains what happened and, when useful, what to do next. Decide what kind of event occurred, what status it carries, and how it should be presented as separate questions:'
        }
      ],
      _sourceCitation: { path: 'patterns/notification-pattern/index.md', heading: '## Overview', lines: '27–51' },
      children: [
        {
          id: 'overview-event-category',
          heading: 'Event category axis',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Group events in language that fits the product, such as work or task activity, collaboration or access changes, and workspace or system updates. These categories describe what happened; they do not prescribe a visual treatment.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '## Overview',
            lines: '27–70'
          }
        },
        {
          id: 'overview-notification-status',
          heading: 'Notification status axis',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Describe the event as informational, successful, cautionary, or an error. Use text and visual cues together so status is not conveyed by color alone.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '#### Notification status',
            lines: '52–59'
          }
        },
        {
          id: 'overview-notification-type',
          heading: 'Notification presentation type axis',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose where the notice appears and how much it interrupts. Timing, persistence, and actions depend on the product policy and implementation; do not assume defaults.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '#### Notification type',
            lines: '60–70'
          }
        }
      ]
    },
    {
      id: 'designing-with-notifications',
      heading: 'Designing with notifications',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Designing with notifications',
        lines: '71–72'
      },
      children: [
        {
          id: 'designing-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Match delivery context to what triggered the update:'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### When to use',
            lines: '73–82'
          },
          children: [
            {
              id: 'when-task-generated',
              heading: 'Task-generated notifications',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Appear right near the workspace action or form the operator just triggered; because the user is already looking there, keep explanation tight.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/notification-pattern/index.md',
                heading: '#### Task-generated notifications',
                lines: '83–95'
              }
            },
            {
              id: 'when-system-generated',
              heading: 'System-generated notifications',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Originate from asynchronous background jobs, external outages, or cross-product changes outside active focus—so messages must supply standalone resource and system context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/notification-pattern/index.md',
                heading: '#### System-generated notifications',
                lines: '96–108'
              }
            }
          ]
        },
        {
          id: 'designing-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Curb over-notification so alert fatigue never numbs operators to critical warnings. Do not cover working controls with alerts when quiet inline state or empty states explain the condition more naturally.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### When not to use',
            lines: '109–117'
          }
        }
      ]
    },
    {
      id: 'notification-status',
      heading: 'Notification status',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select the lowest accurate status severity that matches operational reality:'
        },
        {
          type: 'table',
          columns: ['Status', 'Icon & semantic color pairing', 'When to choose'],
          rows: [
            [
              'Informational',
              'Filled info icon / Blue',
              'Neutral system updates, helpful workspace state, or orientation notes'
            ],
            ['Success', 'Filled checkmark icon / Green', 'Completed save, sync, or requested task succeeded cleanly'],
            [
              'Warning',
              'Filled warning triangle / Yellow',
              'Potential risk, approaching quota, or prerequisite requiring caution'
            ],
            [
              'Error',
              'Filled error circle / Red',
              'Blocked submission, failed operation, or service outage needing user remediation'
            ]
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Notification status > ### Deciding what to use',
        lines: '118–143'
      }
    },
    {
      id: 'notification-types',
      heading: 'Notification presentations',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Choose a presentation based on context, urgency, interruption, and whether a response is needed. The table describes common patterns, not default behavior guarantees:'
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Notification types',
        lines: '144–152'
      },
      children: [
        {
          id: 'types-deciding',
          heading: 'Deciding what type to use',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Presentation', 'Typical context', 'Interaction', 'Guidance / maturity'],
              rows: [
                [
                  'Inline',
                  'Feedback beside affected content',
                  'Optional action or dismissal when appropriate',
                  'Keep close to the related task or control'
                ],
                [
                  'Toast',
                  'Brief, noncritical feedback after an event',
                  'Keep any action optional and easy to reach',
                  'Do not assume a timeout, queue, or archive'
                ],
                [
                  'Actionable',
                  'A notice with a useful next step',
                  'Offer a clear action without unexpected focus changes',
                  'Avoid timing out a notice that needs a response'
                ],
                [
                  'Callout',
                  'Guidance tied to a page or control',
                  'Usually informational and contextual',
                  'Do not present it as an event or action result'
                ],
                [
                  'Banner',
                  'Broad, high-visibility update',
                  'Depends on product policy',
                  'Experimental concept; behavior is not defined here'
                ],
                [
                  'Notification panel',
                  'A place to review multiple notices',
                  'Depends on product policy',
                  'Experimental concept; history and preferences are not implied'
                ],
                [
                  'Dialog / Alert Dialog',
                  'A blocking decision or acknowledgement',
                  'Use a clear choice or acknowledgement',
                  'Interaction pattern, not a notification type'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Deciding what to use',
            lines: '153–165'
          }
        },
        {
          id: 'type-inline',
          heading: 'Inline notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Place inline notices near the affected content or control. Keep the message concise, avoid obscuring work, and make dismissal or resolution behavior clear for the situation.'
            }
          ],
          demoRefs: ['notifications-inline-context'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '211–241' }],
            heading: '### Inline notification > #### Best practices:',
            lines: '166–194'
          }
        },
        {
          id: 'type-toast',
          heading: 'Toast notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a toast for brief, noncritical feedback that should not take over the current task. Set timing, placement, and queue behavior only when the product defines them; keep required decisions and critical information available.'
            }
          ],
          demoRefs: ['notifications-toast-brief'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '244–294' }],
            heading: '### Toast > #### Long messages / #### Best practices:',
            lines: '195–235'
          }
        },
        {
          id: 'type-actionable',
          heading: 'Actionable notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Offer a concise, relevant next step when it helps resolve or continue the task. Do not assume an actionable notice takes focus; preserve the user’s current context unless the interaction pattern requires otherwise.'
            }
          ],
          demoRefs: ['notifications-actionable-or-modal'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '171–189, 297–351' }],
            heading: '### Actionable > #### Best practices:',
            lines: '236–268'
          }
        },
        {
          id: 'type-callout',
          heading: 'Callout notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a callout for supporting guidance that stays close to the content it explains. Distinguish guidance from a status update or task result, and avoid redundant copy.'
            }
          ],
          demoRefs: ['notifications-callout-on-load'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '353–441' }],
            heading: '### Callout > #### Best practices:',
            lines: '269–296'
          }
        },
        {
          id: 'type-banner',
          heading: 'Banner notification (Experimental)',
          level: 3,
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Experimental source concept: Banner guidance in the maintained local reference is explicitly marked work-in-progress and subject to further iteration.'
            },
            {
              type: 'prose',
              text: 'A banner may provide a broad, high-visibility update. Its placement, dismissal, duration, and persistence require product-specific decisions; the experimental concept makes no behavioral guarantee.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Banner > #### Best practices:',
            lines: '297–324'
          }
        },
        {
          id: 'type-panel',
          heading: 'Notification panel (Experimental)',
          level: 3,
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Experimental source concept: Notification panel guidelines are flagged work-in-progress needing additional research in the maintained local reference.'
            },
            {
              type: 'prose',
              text: 'A panel may collect notices for review outside the immediate task. History, ordering, grouping, unread state, preferences, and retention must be defined by the product; the experimental concept does not specify them.'
            }
          ],
          demoRefs: ['notifications-panel-review'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Notification panel > #### Best practices:',
            lines: '325–358'
          }
        },
        {
          id: 'type-modal',
          heading: 'Dialog for blocking decisions (related interaction)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use Dialog or Alert Dialog when the user must make a blocking decision or acknowledge information. This is an interaction pattern, not another notification presentation; choose it only when blocking is necessary.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Modal > #### Best practices:',
            lines: '359–379'
          }
        }
      ]
    },
    {
      id: 'considerations',
      heading: 'Considerations when designing',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Considerations when designing',
        lines: '380–381'
      },
      children: [
        {
          id: 'considerations-priority',
          heading: 'Notification priority and contrast',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use the product’s semantic color and contrast system consistently. Make urgency legible through wording and structure as well as color.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Notification priority',
            lines: '382–395'
          }
        },
        {
          id: 'considerations-user-action',
          heading: 'General user action: optional vs. required',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Separate optional suggestions (where dismissing or ignoring allows normal workflow continuation) from required responses (which block workflow completion until the operator acts or resolves the condition).'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### General user action > #### Optional action / #### Required action',
            lines: '396–417'
          }
        },
        {
          id: 'considerations-message',
          heading: 'Writing notification messages',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a clear title and concise body without repeating the same information. Include enough context for events received outside the active task, and describe a recovery step when one is known.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '156–167' }],
            heading: '### Notification message',
            lines: '418–438'
          }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Provide accessible status announcements for updates that do not receive focus (WCAG 4.1.3 Status Messages). Avoid time limits that prevent users from reading or acting on important notices (WCAG 2.2.4), and let users manage interruptions where applicable (WCAG 2.2.3). Keep keyboard focus stable unless a blocking interaction requires a deliberate focus change.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        related: [{ path: 'components/notification/usage.md', lines: '450–465' }],
        heading: '## Accessibility',
        lines: '439–450'
      }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Alert & Toast', kind: 'component' },
            { label: 'Dialog', kind: 'component' },
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Status indicators', kind: 'pattern' },
            { label: 'Error states (planned future reference)', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Related components and patterns',
        lines: '451–471'
      }
    }
  ],
  demos: [
    {
      id: 'notifications-inline-context',
      title: 'Keep important status in context',
      sectionId: 'type-inline',
      secondarySectionIds: ['notification-status', 'considerations-message'],
      mappingStatus: 'mapped',
      scenario: 'Show concise status feedback beside the task or content it affects.',
      teaching: {
        meaning: 'An inline notification reports task status beside the work it affects.',
        decision:
          'Choose event category, status, and presentation independently; make any next step clear when one is needed.',
        consider: 'Keep the message concise and make status understandable without relying on color alone.'
      },
      interactive: false
    },
    {
      id: 'notifications-toast-brief',
      title: 'Confirm a completed action briefly',
      sectionId: 'type-toast',
      mappingStatus: 'mapped',
      scenario: 'Show brief, noncritical confirmation after a routine action without taking over the current task.',
      teaching: {
        meaning: 'A toast gives brief feedback after an action completes without taking over the page.',
        decision:
          'The toast preview illustrates a local message only; timing, placement, and queue behavior are not defined by this guide.',
        consider: 'Never place required actions or critical unrecovered failures inside timed toasts.'
      },
      interactive: true
    },
    {
      id: 'notifications-callout-on-load',
      title: 'Keep field guidance close to its control',
      sectionId: 'type-callout',
      mappingStatus: 'mapped',
      scenario: 'Show a short informational note beside the control it explains.',
      teaching: {
        meaning:
          'A callout is present when the page first loads and stays beside the relevant control as persistent context.',
        decision: 'Keep guidance close to the related control and separate it from status feedback.',
        consider: 'If the message reports an event or action result, choose a status presentation instead.'
      },
      interactive: false
    },
    {
      id: 'notifications-panel-review',
      title: 'Review sample notifications in a panel',
      sectionId: 'type-panel',
      secondarySectionIds: ['when-system-generated'],
      mappingStatus: 'mapped',
      scenario: 'Explore how multiple notices might be presented together in a panel.',
      teaching: {
        meaning: 'A notification panel is a possible place to review multiple notices outside the immediate task.',
        decision:
          'This concept is experimental. History, ordering, grouping, unread state, retention, and preferences need product decisions.',
        consider: 'The local sample does not model a notification service or stored history.'
      },
      interactive: true,
      _demoNote:
        'The panel is a local illustration with sample items and status labels; it does not implement history, unread state, preferences, grouping, or deduplication. The experimental status is called out in the panel use case.'
    },
    {
      id: 'notifications-actionable-or-modal',
      title: 'Offer a next step or acknowledge a critical notice',
      sectionId: 'type-actionable',
      secondarySectionIds: ['type-modal', 'accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare a contextual next step, an experimental broad update concept, and a blocking acknowledgement interaction.',
      teaching: {
        meaning:
          'An actionable notice offers a relevant next step; a dialog is a separate interaction for a blocking acknowledgement.',
        decision:
          'Do not assume a timeout or focus change. Use a dialog only when the user must respond before continuing.',
        consider:
          'The dialog sample uses Alert Dialog; the broad update is a dismissible local Alert illustration, not a global Banner implementation.'
      },
      interactive: true,
      _demoNote:
        'The contextual action changes only local helper text. The blocking acknowledgement uses Alert Dialog as an interaction pattern. The broad update is labeled experimental and does not implement global placement or persistence.'
    }
  ],
  notes: [],
  components: ['Alert', 'Toast', 'AlertDialog', 'Button']
}

export const PAGE_OVERFLOW_CONTENT: PatternPageDraft = {
  id: 'overflow-content',
  title: 'Overflow content',
  group: 'Core',
  source: {
    status: 'Additional local topic',
    limits: [
      'Catalog topic limit: Overflow content is maintained in the local pattern directory, though excluded from the 14-item Universal overview catalog.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/overflow-content/index.md',
    _excludedSections: ['### Quick Navigation (lines 20–27)'],
    _upstreamAnomalies: [
      'Maintained source opens directly with ## Truncation (wrapping Quick Navigation, Usage, Variations, Code, Example Usage, Result, and "Show more" buttons). Code/Result CSS snippets are synthesized cleanly into design & implementation rules without vendor class names.'
    ]
  },
  summary:
    'Overflow handling keeps long names, links, paths, and supporting paragraphs readable in bounded layouts using strict truncation thresholds, full-text hover tooltips, directional safety, breadcrumb menus, or explicit "Show more" expansion.',
  sections: [
    {
      id: 'truncation',
      heading: 'Truncation',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Only truncate secondary read-only values when clipping hides at least three characters while keeping at least four characters visible—shorter truncations save almost no horizontal room while obscuring meaning. Always expose the hidden full value through a native hover tooltip (`title` attribute), with one explicit exception: omit tooltips at the clipped tail of a multi-line truncated paragraph.'
        }
      ],
      _sourceCitation: { path: 'patterns/overflow-content/index.md', heading: '## Truncation', lines: '17–49' },
      children: [
        {
          id: 'truncation-usage',
          heading: 'Usage boundaries',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'do',
              text: 'Limit truncation strictly to expandable supporting copy, long file or asset identifiers, deep URLs, paginated items, and intermediate breadcrumb paths.'
            },
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never truncate page headers, headings/titles, form field labels, validation errors, or notification messages.'
            }
          ],
          _sourceCitation: { path: 'patterns/overflow-content/index.md', heading: '### Usage', lines: '50–62' }
        },
        {
          id: 'truncation-variations',
          heading: 'Variations',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Front-line truncation (…56789)',
                  whenToUse: 'Preserving a trailing file path, filename, or right-hand identifier continuation.',
                  whenNotToUse:
                    'Left-to-right URLs or punctuated paths unless explicitly protected with bidirectional isolation (`bdi`) so right-to-left text direction never flips slashes or domain tokens backwards.'
                },
                {
                  title: 'Mid-line truncation (1234…5678)',
                  whenToUse:
                    'Identifiers, revision slugs, or codes where both prefix and suffix differentiate items sharing common middle segments.'
                },
                {
                  title: 'End-line truncation (12345…)',
                  whenToUse:
                    'Standard trailing overflow for single-line titles, labels in compact tables, or narrative descriptions.'
                }
              ]
            }
          ],
          demoRefs: ['overflow-identifiers-links'],
          _sourceCitation: { path: 'patterns/overflow-content/index.md', heading: '### Variations', lines: '63–74' },
          children: [
            {
              id: 'variations-ellipses-alone',
              heading: 'Standalone ellipses in collapsed controls',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When collapsing multi-level navigation controls such as deep breadcrumbs to a standalone "…" token, expose the hidden intermediate segments via an interactive overflow menu on hover (and keyboard click activation for non-pointer accessibility) rather than a passive plain-text browser tooltip.'
                }
              ],
              demoRefs: ['overflow-breadcrumbs'],
              _sourceCitation: {
                path: 'patterns/overflow-content/index.md',
                heading: '#### Ellipses alone',
                lines: '75–86'
              }
            }
          ]
        },
        {
          id: 'truncation-mechanics',
          heading: 'Truncation calculation and directional safety',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'End-line and front-line cuts can rely on native CSS container width constraints paired with an explicit container width and hover `title` attribute; mid-line truncation has no universal pure-CSS equivalent and must be computed dynamically with JavaScript measurement based on available container width and distinct start/end slices.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/overflow-content/index.md',
            heading: '### Code / ### Example Usage / ### Result / #### Mid-line truncation',
            lines: '87–145'
          }
        },
        {
          id: 'show-more-buttons',
          heading: '"Show more" buttons',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Prefer explicit "Show more" / "Show less" actions over cramped scrollable boxes, masked gradients, or opaque fades when revealing longer supporting descriptions—making expanded reading deliberate and discoverable. Swap to "Load more" when lazy fetching additional backend records improves page responsiveness.'
            }
          ],
          demoRefs: ['overflow-expand-route-note'],
          _sourceCitation: {
            path: 'patterns/overflow-content/index.md',
            heading: '### "Show more" buttons',
            lines: '146–164'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'overflow-expand-route-note',
      title: 'Expand a long route note',
      sectionId: 'show-more-buttons',
      mappingStatus: 'mapped',
      scenario:
        'Reveal multi-line supporting copy with explicit Show more / Show less controls rather than subtle fades or nested scrollboxes.',
      teaching: {
        meaning:
          'Show more reveals complete secondary prose cleanly when truncating initial card height improves scanning.',
        decision:
          'Use Show more / Show less over gradients, fades, or tight scrollable areas; reserve Load more for async data fetching; keep headers, labels, errors, and alerts unclipped.',
        consider:
          'Omit tooltip duplication at the end of a truncated paragraph, and make expanded/collapsed state clear to screen readers.'
      },
      interactive: true
    },
    {
      id: 'overflow-identifiers-links',
      title: 'Fit identifiers and links in compact layouts',
      sectionId: 'truncation-variations',
      secondarySectionIds: ['truncation', 'truncation-mechanics'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare front-line, mid-line, and end-line truncation while keeping the complete value available on hover.',
      teaching: {
        meaning:
          'Directional truncation hides at least 3 clipped characters while keeping at least 4 characters visible so compact rows remain readable.',
        decision:
          'Pick front-line for trailing filenames, mid-line when both prefix and suffix identify an item, and end-line as default. Keep the full value available through a title or a separate copy/inspect action.',
        consider:
          'Protect left-to-right URLs inside right-to-left containers (`bdi` or Unicode isolation) so punctuation and path order never invert visually.'
      },
      interactive: false,
      _demoNote:
        'The CSS now performs the middle ellipsis on the complete identifier instead of receiving pre-truncated text, and the LTR URL is isolated with `<bdi>` inside its RTL container. Copy actions are guidance only and are not demonstrated by this static example.'
    },
    {
      id: 'overflow-breadcrumbs',
      title: 'Collapse long breadcrumb paths',
      sectionId: 'variations-ellipses-alone',
      mappingStatus: 'partial-divergent',
      scenario: 'Compress deep location trails using an ellipsis menu revealing intermediate levels.',
      teaching: {
        meaning:
          'A compact breadcrumb collapses middle ancestors into "…" while retaining root and destination orientation.',
        decision:
          'Open collapsed breadcrumb steps inside an overflow menu rather than relying on a passive text tooltip on hover.',
        consider:
          'Source describes hover activation on the overflow trigger; supporting click/Enter/Space menu activation alongside hover ensures keyboard and touch users reach hidden levels.'
      },
      interactive: true,
      _demoNote:
        'The ellipsis opens a local menu with the hidden Organization and Workspace ancestors; destination navigation is not simulated.'
    }
  ],
  components: ['Button', 'Menu', 'Tooltip']
}

export const PAGE_READ_ONLY_STATES: PatternPageDraft = {
  id: 'read-only-states',
  title: 'Read-only states',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Component doc note: referenced standalone Form usage documentation still lists read-only inputs as upcoming, making this pattern page the authoritative specification.',
      'Taxonomy note: upstream index contains a spelling typo ("Ready-only inputs") referring to this Read-only states specification.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/read-only-states-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 14–25)',
      '#### Carbon for IBM Products (line 275)',
      '## References (lines 279–290)',
      '## Feedback (lines 291–295)'
    ],
    _upstreamAnomalies: [
      'Upstream uses docsite UI tabs "#### Tab: Read-only" / "#### Tab: Enabled" under Component fields, borders, icon signifiers, and ## Content; normalized cleanly into comparative Read-only vs. Enabled copy below.'
    ]
  },
  summary:
    'Read-only states render normally interactive controls in a legible, focusable, non-editable inspection mode during process locks, concurrent editing, or view-only access—distinct from plain static text and disabled prerequisites.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Read-only turns an active control from interactive to purely informative without removing it from keyboard navigation or concealing its saved value.'
        }
      ],
      _sourceCitation: { path: 'patterns/read-only-states-pattern/index.md', heading: '## Overview', lines: '26–39' },
      children: [
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use read-only solely on form or data controls that already possess an enabled interactive state elsewhere, triggered by three conditions: (1) an ongoing application process temporarily locking submission, (2) a concurrency lock while another operator edits the record, or (3) view-only user permissions.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/read-only-states-pattern/index.md',
            heading: '### When to use',
            lines: '40–49'
          }
        },
        {
          id: 'overview-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Never apply read-only to static text, metadata readouts, or labels that users can never edit anywhere.',
                'Never use read-only for temporarily unavailable prerequisite actions—keep those rendered as disabled.',
                'Inside full read-only pages/viewports, preserve prerequisite-disabled controls in disabled state rather than converting them to read-only.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/read-only-states-pattern/index.md',
            heading: '### When not to use',
            lines: '50–60'
          }
        }
      ]
    },
    {
      id: 'formatting',
      heading: 'Formatting and anatomy',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Keep labels, spacing geometry, value text, and structural icon placement identical to the enabled control so switching between view and edit modes introduces zero layout jump.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/read-only-states-pattern/index.md',
        heading: '## Formatting > ### Anatomy',
        lines: '61–79'
      }
    },
    {
      id: 'visual-guidance',
      heading: 'Visual guidance',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/read-only-states-pattern/index.md',
        heading: '## Visual guidance',
        lines: '80–84'
      },
      children: [
        {
          id: 'visual-structure',
          heading: 'Structure across selection and bound controls',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Maintain identical alignment, grid widths, and visual geometry across checkbox sets, radio groups, switches, selects, date/time pickers, number inputs, and sliders—letting checked indicators or selected slider/picker values stand out clearly without edit affordability.'
            }
          ],
          demoRefs: ['read-only-selected-bound'],
          _sourceCitation: {
            path: 'patterns/read-only-states-pattern/index.md',
            heading: '### Structure > #### Selection controls / #### Bound entry controls',
            lines: '85–116'
          }
        },
        {
          id: 'visual-interactive-elements',
          heading: 'Visual differences from enabled controls',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Element', 'Enabled state', 'Read-only state'],
              rows: [
                [
                  'Component fields',
                  'Standard solid input surface contrasting against container',
                  'Default fields blend transparently into layer surface; fluid fields retain their enabled fill while shedding edit cues'
                ],
                [
                  'Component borders',
                  'Crisp active underline or perimeter border',
                  'Subtle softened divider/border de-emphasizing clickability'
                ],
                [
                  'Value text & contrast',
                  'Active foreground color (>= 4.5:1)',
                  'Full active text contrast (>= 4.5:1) so values remain crystal clear'
                ],
                [
                  'Component icon signifiers (chevron, calendar, close)',
                  'Active interactive icon contrast',
                  'Remain visible in place but dim to muted disabled-icon contrast'
                ]
              ]
            }
          ],
          demoRefs: ['read-only-mission-settings'],
          _sourceCitation: {
            path: 'patterns/read-only-states-pattern/index.md',
            heading:
              '### Interactive elements > #### Component fields / borders / icon signifiers (Tab: Read-only vs. Enabled)',
            lines: '117–178'
          }
        },
        {
          id: 'visual-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/read-only-states-pattern/index.md',
            heading: '### Best practices',
            lines: '179–180'
          },
          children: [
            {
              id: 'bp-state-readability',
              heading: 'Preserve value readability',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Never dim read-only text down to disabled opacity levels; operators rely on read-only values for verification and audit accuracy.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/read-only-states-pattern/index.md',
                heading: '#### State readability',
                lines: '181–187'
              }
            },
            {
              id: 'bp-read-only-viewports',
              heading: 'Read-only viewports',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When a screen loads entirely in read-only mode due to permissions, keep controls that would otherwise be disabled for unmet dependencies rendered in disabled styling so conditional rules remain accurate.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/read-only-states-pattern/index.md',
                heading: '#### Read-only viewports',
                lines: '188–193'
              }
            },
            {
              id: 'bp-disabled-vs-read-only',
              heading: 'Keep disabled and read-only states distinct',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Reserve disabled for temporarily blocked interactive actions and read-only for inspectable locked values; swapping roles misleads screen-reader and sighted users alike.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/read-only-states-pattern/index.md',
                heading: '#### Disabled versus read-only states',
                lines: '194–208'
              }
            }
          ]
        },
        {
          id: 'visual-interactions',
          heading: 'Mouse and keyboard interactions',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Keep the pointer as a default arrow cursor on hover (never text-caret if purely selection/closed or not-allowed blocked cues) while allowing text selection and focus traversal via Tab so operators inspect and copy locked content cleanly without modifying state.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/read-only-states-pattern/index.md',
            heading: '### Interactions > #### Mouse / #### Keyboard',
            lines: '209–229'
          }
        }
      ]
    },
    {
      id: 'content',
      heading: 'Content conventions',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Keep saved values identical between enabled and read-only views. Whenever an enabled selector displays an interactive prompt when unselected (such as "Choose an option"), swap that prompt in read-only mode for a factual, solid-contrast empty statement (such as "No option selected") rather than leaving an empty placeholder field that looks incomplete or broken.'
        }
      ],
      demoRefs: ['read-only-empty-informative'],
      _sourceCitation: {
        path: 'patterns/read-only-states-pattern/index.md',
        heading: '## Content (Tab: Read-only vs. Tab: Enabled)',
        lines: '230–247'
      }
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Distinguish navigability from operability clearly: read-only fields remain navigable (reachable via keyboard Tab, announced with their labels and saved values by screen readers at >= 4.5:1 contrast) yet intentionally non-operable, whereas default disabled controls fail both and are skipped by screen readers.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/read-only-states-pattern/index.md',
        heading: '## Accessibility',
        lines: '248–256'
      }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Input, Select, Checkbox, Radio, DatePicker, NumberField', kind: 'component' },
            { label: 'Disabled states', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/read-only-states-pattern/index.md', heading: '## Related', lines: '257–278' }
    }
  ],
  demos: [
    {
      id: 'read-only-mission-settings',
      title: 'Review mission settings without changing them',
      sectionId: 'visual-interactive-elements',
      secondarySectionIds: ['overview-when-to-use', 'bp-read-only-viewports', 'accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Present locked settings at full >= 4.5:1 legibility, navigable for keyboard inspection/copy, without reverting to disabled opacity.',
      teaching: {
        meaning:
          'Read-only state lets users inspect normally editable controls when process locks, concurrency locks, or view permissions prevent edits.',
        decision:
          'Blend default field surfaces cleanly into the layer (keeping enabled fills only on fluid fields), soften borders, dim chevron/close/calendar signifiers, keep arrow cursor on hover, and preserve disabled controls on unmet prerequisites.',
        consider:
          'Read-only fields stay navigable by Tab and screen readers even though non-operable—unlike skipped disabled controls.'
      },
      interactive: true,
      _demoNote:
        'Read-only text fields use a subtle transparent, borderless treatment while staying focusable for review and copy; the disabled prerequisite remains visibly separate.'
    },
    {
      id: 'read-only-selected-bound',
      title: 'Review selected options and bound values',
      sectionId: 'visual-structure',
      mappingStatus: 'mapped',
      scenario:
        'Preserve layout alignment and saved picks cleanly across selection controls and date/number bound entries.',
      teaching: {
        meaning: 'Read-only selections and bound controls retain enabled geometry so saved values inspect reliably.',
        decision: 'Keep checkbox/radio/switch and bound control layouts consistent while preventing modification.',
        consider: 'Expose read-only state and saved values clearly to assistive technology.'
      },
      interactive: false
    },
    {
      id: 'read-only-empty-informative',
      title: 'Keep an empty selection informative',
      sectionId: 'content',
      mappingStatus: 'mapped',
      scenario:
        'Transform instructive prompts ("Choose an option") into factual read-only values ("No option selected") rather than blank placeholders.',
      teaching: {
        meaning: 'An empty read-only value confirms no option was set while preventing misleading blank-box ambiguity.',
        decision:
          'Replace interactive prompts with solid high-contrast factual statements ("No option selected" or "No note provided") instead of faint placeholder text.',
        consider:
          'Do not render an empty bordered input shell with faint placeholder text that looks editable or uninitialized.'
      },
      interactive: false
    }
  ],
  components: ['Field', 'Input', 'Checkbox', 'DatePicker']
}

export const PAGE_SEARCH: PatternPageDraft = {
  id: 'search',
  title: 'Search',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Deferred source scope: the maintained reference explicitly leaves dedicated Search results page layout design to future guidance.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/search-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 15–26)',
      '## References (lines 373–384)',
      '## Feedback (lines 385–389)'
    ]
  },
  summary:
    'Search helps operators retrieve specific records or broad matches across unfamiliar sets through open queries, optional single-select scoping starting at All/Any, live counts even at zero, and predictable keyboard focus movement.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select a search mode tailored to dataset size, query cost, and whether operators explore an entire workspace or a narrow sub-area.'
        }
      ],
      _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '## Overview', lines: '27–41' },
      children: [
        {
          id: 'overview-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Search input container pairing leading magnifying-glass icon, clearable text entry, and accessible aria-label without a visible form label.',
                'Trailing clear (×) button clearing entered terms cleanly.',
                'Optional single-select scope dropdown defaulting to "All" or "Any".',
                'Optional submit trigger (required in Basic search; omitted in Active search).',
                'Focus-triggered recent/trending suggestions and typing type-ahead preview lists.',
                'Loading/progress feedback indicator and visible result count.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Anatomy', lines: '42–55' }
        },
        {
          id: 'overview-types-of-search',
          heading: 'Types of search',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Basic search',
                  whenToUse:
                    'Queries run against large, costly, or remote datasets where waiting for explicit submit prevents wasted round-trips.'
                },
                {
                  title: 'Active search',
                  whenToUse:
                    'Small, fast tables or local catalogs where live per-keystroke filtering feels instant with no Search/Go button.'
                },
                {
                  title: 'Focused search',
                  whenToUse:
                    'Queries scoped to an active project, workspace, or category alongside a clear "See all results" widening path.'
                }
              ]
            }
          ],
          demoRefs: ['search-find-and-narrow'],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Types of search', lines: '56–70' }
        },
        {
          id: 'overview-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Best practices', lines: '71–72' },
          children: [
            {
              id: 'bp-avoid-dead-ends',
              heading: 'Avoid dead ends',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Whenever queries match nothing, preserve what the user typed and surface helpful resets, spelling suggestions, popular categories, or scope widening so zero-match screens remain actionable.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Avoid dead ends',
                lines: '73–79'
              }
            },
            {
              id: 'bp-loading-indicator',
              heading: 'Include a loading indicator',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When searches take longer than a moment or two, show loading feedback matched visually to empty-state spacing, escalating to a progress bar with estimated completion time for heavy long-running scans.'
                }
              ],
              demoRefs: ['search-loading-and-rtl'],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Include a loading indicator',
                lines: '80–87'
              }
            },
            {
              id: 'bp-display-result-count',
              heading: 'Display the number of results',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Always display matching result totals—including "0 results"—and expose counts per category option inside scope filters so operators judge breadth quickly.'
                }
              ],
              demoRefs: ['search-result-count-recovery'],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Display the number of results',
                lines: '88–93'
              }
            },
            {
              id: 'bp-do-not-include-label',
              heading: 'Do not render a visible field label',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Identify search bars with the magnifying glass glyph, informative placeholder copy, and a screen-reader aria-label—never render a visible form label above or beside the search input.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Don’t include a label',
                lines: '94–112'
              }
            },
            {
              id: 'bp-localize',
              heading: 'Localize for right-to-left and regional scripts',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Mirror search alignment, placeholder flow, clear icons, and scope dropdown ordering cleanly for right-to-left interfaces while keeping the magnifying glass icon immediately recognizable.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Localize the search field',
                lines: '113–131'
              }
            },
            {
              id: 'bp-scope-filter',
              heading: 'Add a single-select scope filter',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair global search with a single-select scope dropdown defaulting to "All" or "Any" (executing as global Basic search unless narrowed) rather than forcing operators to pick multiple scopes upfront.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Add a scope filter to your search field',
                lines: '132–147'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'basic-search',
      heading: 'Basic search',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use Basic search when querying broad or expensive indexes where execution only starts once the user commits via Enter or clicking Search.'
        }
      ],
      _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '## Basic search', lines: '148–169' },
      children: [
        {
          id: 'basic-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Behaviors', lines: '170–171' },
          children: [
            {
              id: 'basic-recent-suggestions',
              heading: 'Recent search suggestions',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When focusing an empty Basic search input, display recent personal searches and/or trending queries to speed repeat navigation.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Recent search suggestions',
                lines: '172–182'
              }
            },
            {
              id: 'basic-type-ahead-suggestions',
              heading: 'Type-ahead suggestions',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Once typing begins, replace recent history cleanly with live type-ahead suggestions matching the entered prefix so users either jump straight to a record or submit the full query.'
                }
              ],
              demoRefs: ['search-preview-type-ahead'],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Type-ahead suggestions',
                lines: '183–199'
              }
            },
            {
              id: 'basic-results-page',
              heading: 'Results page',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Submitting Basic search transitions users to a dedicated results screen hosting post-search attribute filters and result counts.'
                },
                {
                  type: 'callout',
                  kind: 'source-limit',
                  text: 'Source limit: detailed layout conventions for dedicated search results pages are marked for future guidance in the reference documentation.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Results page',
                lines: '200–210'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'active-search',
      heading: 'Active search',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use Active search inside fast local catalogs, tables, or dropdown pickers where filtering updates immediately on every keystroke.'
        }
      ],
      _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '## Active search', lines: '211–233' },
      children: [
        {
          id: 'active-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Behaviors', lines: '234–235' },
          children: [
            {
              id: 'active-search-field',
              heading: 'Search field behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Omit explicit Search or Go buttons in Active search—include only the magnifying glass icon, specific helpful placeholder text visible until typing, and a trailing clear (×) button.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Search field',
                lines: '236–252'
              }
            },
            {
              id: 'active-presenting-results',
              heading: 'Presenting results',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When filtering an inline page catalog or table, display all available records before typing starts. When Active search opens as a header dropdown panel, show recent queries on initial focus, swap to live filtered matches on typing, and optionally offer a bottom "See all results" fallback behaving like Basic search.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Presenting results',
                lines: '253–264'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'focused-search',
      heading: 'Focused search',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Focused search combines instant active matching inside the operator’s active mission, workspace, or resource folder with a clear escape hatch to widen scope globally.'
        }
      ],
      _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '## Focused search', lines: '265–285' },
      children: [
        {
          id: 'focused-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Behaviors', lines: '286–287' },
          children: [
            {
              id: 'focused-search-field',
              heading: 'Search field and category persistence',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Surface session history and recent queries upon focus, refining interactively as characters are typed. When a user narrows Focused search to a specific subcategory, run filtered results cleanly and persist that chosen scope across subsequent queries in the session until the user clears it or ends the session.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Search field',
                lines: '288–306'
              }
            },
            {
              id: 'focused-presenting-results',
              heading: 'Presenting results',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Display matching counts clearly even at zero. Group unfamiliar destinations into categorized match clusters with "View all" links when users may not know where items live (or expose a scope dropdown when destinations are known), paired with a bottom "See all results" option widening beyond local context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/search-pattern/index.md',
                heading: '#### Presenting results',
                lines: '307–322'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '## Accessibility', lines: '323–324' },
      children: [
        {
          id: 'a11y-search-keyboard',
          heading: 'Search and scope keyboard flow',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Search input: Tab enters the field; typing updates suggestions or input value; Enter submits in Basic mode.',
                'Scope selector: Tab reaches scope dropdown; Arrow keys open and browse options; Enter commits the scope and advances keyboard focus smoothly right into the search input.',
                'Type-ahead list: Down/Up arrows traverse options; Enter selects; Escape dismisses suggestions cleanly without clearing typed text.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '### Search', lines: '325–339' }
        },
        {
          id: 'a11y-faceted-filtering',
          heading: 'Faceted filtering focus persistence',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Move between facet groups via Tab, press Enter to step inside a facet group, navigate options via Arrow keys, and toggle selections via Enter—crucially holding keyboard focus anchored on that active facet checkbox/filter when live results reload so keyboard operators never have to Tab back down from the top of the page.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/search-pattern/index.md',
            heading: '### Faceted filtering',
            lines: '340–351'
          }
        }
      ]
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Search', kind: 'component' },
            { label: 'Select & Command', kind: 'component' },
            { label: 'Empty states', kind: 'pattern' },
            { label: 'Filtering', kind: 'pattern' },
            { label: 'Loading', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/search-pattern/index.md', heading: '## Related', lines: '352–372' }
    }
  ],
  demos: [
    {
      id: 'search-find-and-narrow',
      title: 'Find missions and narrow the result set',
      sectionId: 'overview-types-of-search',
      secondarySectionIds: [
        'basic-search',
        'active-search',
        'focused-search',
        'bp-scope-filter',
        'focused-search-field'
      ],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare Basic submit search, instant Active filtering, and workspace Focused search with an All/Any scope filter.',
      teaching: {
        meaning:
          'Search finds items by open-ended queries while structured scoping and filtering narrow large results cleanly.',
        decision:
          'Use Basic search (submit -> distinct results page) for broad costly datasets, Active search (no Search button; instant per-keystroke filtering) for fast small datasets, and Focused search (local scope + "See all results" widening) with persistent chosen subcategory filters.',
        consider:
          'Default single-select scope filters to All or Any, surface recent searches on focus across modes, and show result counts per scope option.'
      },
      interactive: true,
      _demoNote:
        'Search use-case controls and result feedback are now contained in the same preview. Recent terms appear on focus in every mode, focused scope is a counted single-select, Basic results are labeled as a separate-results-page preview, and Focused can widen back to all missions. The local catalog still uses sample filtering rather than the package Search component (`catalog.ts` / `search.tsx`).'
    },
    {
      id: 'search-result-count-recovery',
      title: 'Review result count and recover from no matches',
      sectionId: 'bp-display-result-count',
      secondarySectionIds: ['bp-avoid-dead-ends'],
      mappingStatus: 'mapped',
      scenario: 'Show a live match count, then clear an unmatched term to recover the complete sample list.',
      teaching: {
        meaning:
          'A visible count confirms query breadth immediately while zero-result recovery avoids search dead ends.',
        decision:
          'Always display total result counts (including 0) and per-scope counts; offer clear query revision, reset scope, or suggested categories on empty matches.',
        consider: 'Keep the entered search text visible so the user can edit one term instead of starting over.'
      },
      interactive: true
    },
    {
      id: 'search-preview-type-ahead',
      title: 'Preview matches before opening the full result set',
      sectionId: 'basic-type-ahead-suggestions',
      secondarySectionIds: ['a11y-search-keyboard'],
      mappingStatus: 'mapped',
      scenario: 'For a short mission list, filter matches as the user types and show suggestions in place.',
      teaching: {
        meaning:
          'Type-ahead suggestions surface high-confidence records as characters are entered while keeping full search submission available.',
        decision:
          'Replace focus-triggered recent queries cleanly with matching suggestions once typing starts, supporting Arrow/Enter selection and Escape dismissal.',
        consider:
          'Expose clear keyboard focus transitions from scope dropdowns into the input and keep result labels accessible.'
      },
      interactive: true
    },
    {
      id: 'search-loading-and-rtl',
      title: 'Signal a slow search and support right-to-left entry',
      sectionId: 'bp-loading-indicator',
      secondarySectionIds: ['bp-do-not-include-label', 'bp-localize'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Display empty-state-aligned loading/ETA feedback for slow scans and mirror RTL search containers cleanly without visible form labels.',
      teaching: {
        meaning:
          'Slow-search loading keeps queries visible while reassuring users; localized right-to-left containers flip control layout naturally.',
        decision:
          'Omit visible text labels on search inputs (rely on magnifying glass, helpful placeholder, and aria-label), show loading/progress ETA when heavy queries exceed a moment or two, and mirror controls cleanly for RTL locales.',
        consider:
          'Keep the magnifying-glass metaphor clear and verify trailing clear icons and cursor direction in RTL layouts.'
      },
      interactive: true,
      _demoNote:
        'The RTL search input uses its aria-label, localized placeholder, and search icon without a visible field label, as specified. Loading is a local preview and no query is sent.'
    }
  ],
  components: ['Search', 'Input', 'Select', 'Command', 'Button', 'Progress']
}

export const PAGE_STATUS_INDICATORS: PatternPageDraft = {
  id: 'status-indicators',
  title: 'Status indicators',
  group: 'Core',
  source: {
    status: 'Additional local topic',
    limits: [
      'Catalog topic limit: Status indicators exists in the maintained local directory yet is omitted from the 14-item Universal overview catalog.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/status-indicator-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 15–28)',
      '## References (lines 528–542)',
      '## Feedback (lines 543–547)'
    ],
    _upstreamAnomalies: [
      'In ## Overview > ### Anatomy (lines 79–95), upstream lists #### 1. Icon indicator, #### 3. Badge indicator, #### 2. Shape indicator, #### 4. Differential indicator (non-sequential 3-before-2 numbering). Sequence is preserved cleanly without confusing numbering errors.',
      '## Badge indicator and ## Differential indicator jump directly from H2 to H4 subheadings in source markdown; normalized cleanly to level 3 subsections.'
    ]
  },
  summary:
    'Status indicators surface system health, lifecycle states, unread counts, and directional metric trends using strict severity tiers, bounded indicator density, left-aligned labels, distinct outlined shapes, and >= 3:1 accessible contrast.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Status indicators reveal machine condition, process readiness, pending counts, or period-over-period shifts in place without interrupting active navigation.'
        }
      ],
      _sourceCitation: { path: 'patterns/status-indicator-pattern/index.md', heading: '## Overview', lines: '29–45' },
      children: [
        {
          id: 'overview-variants',
          heading: 'Variants: icon indicators versus shape indicators',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose Icon indicators when space allows stronger visual urgency tied to overall system health (combining icon glyph, containing shape, semantic color, and label). Choose compact Shape indicators for tight multi-row lists or diagrams expressing product-specific workflow lifecycle or priority tiers where red-to-green urgency does not always apply.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Variants > #### Icon indicators versus shape indicators',
            lines: '46–72'
          }
        },
        {
          id: 'overview-anatomy',
          heading: 'Anatomy across the four indicator families',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Icon indicator: containing color silhouette, crisp interior symbol, and paired status text.',
                'Badge indicator: numbered count pill or compact unread dot overlaid cleanly on an interactive ghost icon button trigger.',
                'Shape indicator: distinct geometric outline silhouette + fill color paired closely with a status label.',
                'Differential indicator: directional prefix (+/− symbol, caret, or arrow) paired with formatted change value and optional semantic color.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Anatomy (preserves Icon -> Badge -> Shape -> Differential sequence)',
            lines: '73–100'
          }
        }
      ]
    },
    {
      id: 'designing-with-status-indicators',
      heading: 'Designing with status indicators',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Designing with status indicators',
        lines: '101–102'
      },
      children: [
        {
          id: 'designing-choosing-context',
          heading: 'Choosing for context',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Choosing for context',
            lines: '103–107'
          },
          children: [
            {
              id: 'context-consolidated',
              heading: 'Consolidated statuses',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When rolling multiple underlying checks up into a single summary indicator, display the single highest-severity condition (error/red overrides warning/yellow, which overrides healthy/green).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Consolidated statuses',
                lines: '108–113'
              }
            },
            {
              id: 'context-cognitive-load',
              heading: 'Cognitive load limits',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep indicators meaningful: swap non-actionable or low-value metadata to plain text, because cluttering one view beyond roughly five or six distinct status indicators overwhelms operator scanning.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Cognitive load',
                lines: '114–121'
              }
            }
          ]
        },
        {
          id: 'designing-standardization',
          heading: 'Standardization',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Apply identical status labels, severity tiers, and shape encodings consistently across related dashboards and tables so operators never re-learn vocabulary screen by screen.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Standardization',
            lines: '122–133'
          }
        },
        {
          id: 'designing-severity-levels',
          heading: 'Severity levels',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Tier', 'Intent', 'Representative meanings'],
              rows: [
                [
                  'High attention',
                  'Requires immediate intervention',
                  'Critical errors, failures, stop alerts, urgent blocks'
                ],
                [
                  'Medium attention',
                  'Needs awareness without immediate halt',
                  'Warnings, caution thresholds, pending acknowledgement, in-progress states'
                ],
                [
                  'Low attention',
                  'Informational or healthy baseline',
                  'Healthy ready, completed, available updates, neutral drafts'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Severity levels (High / Medium / Low attention)',
            lines: '134–158'
          }
        },
        {
          id: 'designing-visual-guidance',
          heading: 'Visual guidance',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Visual guidance',
            lines: '159–172'
          },
          children: [
            {
              id: 'visual-symbols',
              heading: 'Status symbols',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair high-recognition icons consistently with critical system health states rather than decorating generic table attributes.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status symbols',
                lines: '173–190'
              }
            },
            {
              id: 'visual-shapes',
              heading: 'Status shapes',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Assign one unique geometry to each distinct state within a table or workflow—never reuse the exact same silhouette with two different colors inside the same view.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status shapes',
                lines: '191–211'
              }
            },
            {
              id: 'visual-palettes',
              heading: 'Status color palettes and extended yellows/oranges',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Draw states from the core semantic palette (red, orange, yellow, green, blue), plus gray for unstarted/draft work and purple for outliers or undefined readings. Reach into extended palette stops strictly where light-mode yellow or orange fills need darker strokes to guarantee accessible WCAG contrast.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status color palette / #### Extended status palettes',
                lines: '212–230'
              }
            },
            {
              id: 'visual-type-pairing',
              heading: 'Status typography and size pairings',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Size indicators proportionally to adjacent labels: pair 20px icon indicators with 16pt type (or 16px icons with 14pt type); pair 16px shape indicators with 14pt or 12pt labels cleanly.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status type',
                lines: '231–244'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'icon-indicator',
      heading: 'Icon indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use icon indicators for prominent system health, connection failures, and immediate attention notices—left-aligning symbols directly ahead of status labels in lists and tables (follow enclosing notification rules when inside alerts).'
        }
      ],
      demoRefs: ['status-icon-connection'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Icon indicator > ### Icon indicator statuses > Labeling / Alignment',
        lines: '245–303'
      }
    },
    {
      id: 'shape-indicator',
      heading: 'Shape indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use compact outlined shapes paired with labels for scanning dense multi-row operational readiness or priority columns. Left-align shapes ahead of labels in vertical lists (trailing placement is permitted solely when every preceding text label stays constant width), never repeat one shape across different colors, and preserve 16px silhouettes with crisp outer outlines.'
        }
      ],
      demoRefs: ['status-shape-compact-list'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Shape indicator > ### Shape indicator statuses > Labeling / Alignment / Best practices',
        lines: '304–382'
      }
    },
    {
      id: 'badge-indicator',
      heading: 'Badge indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Overlay badge indicators directly on interactive ghost icon buttons—clearing badges cleanly once the user views or acknowledges the pending updates:'
        }
      ],
      demoRefs: ['status-badge-navigation'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Badge indicator',
        lines: '383–397'
      },
      children: [
        {
          id: 'badge-with-number',
          heading: 'Badge with number',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use numbered counts exclusively over large 48px global-header ghost icon buttons, capping display at three digits ("999+") so counters never blow out header layout.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '#### Badge with number',
            lines: '398–413'
          }
        },
        {
          id: 'badge-without-number',
          heading: 'Badge without number (dot badge)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a lightweight dot indicator on toolbar icon buttons or anywhere exact unread tally is irrelevant or unknown, signaling new activity until opened.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '#### Badge without number',
            lines: '414–422'
          }
        }
      ]
    },
    {
      id: 'differential-indicator',
      heading: 'Differential indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Communicate comparative metric delta using explicit +/− signs, directional arrows, or carets paired with comparison values and time context—so magnitude direction reads unambiguously without needing color.'
        }
      ],
      demoRefs: ['status-differential-trends'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Differential indicator',
        lines: '423–439'
      },
      children: [
        {
          id: 'differential-color',
          heading: 'Color and metric-specific exceptions',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optional green (upward/positive) and red (downward/negative) semantic colors enhance rapid scanning, except on metrics where numeric direction carries domain reversal or neutral physics—such as temperature changes, error-rate drops, or latency deltas.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '#### Color',
            lines: '440–454'
          }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Accessibility',
        lines: '455–456'
      },
      children: [
        {
          id: 'a11y-elements',
          heading: 'Multi-cue contrast and standalone icon exception',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Maintain at least 3:1 luminance contrast both against page backgrounds and between adjacent statuses even in grayscale. Combine at least two visual elements (symbol, shape, color) paired with text labels; static icon-only indicators are acceptable only where high-contrast symbols guarantee >= 3:1 legibility on their own.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Elements > #### Relying only on color is insufficient / #### Using icons alone is acceptable',
            lines: '457–491'
          }
        },
        {
          id: 'a11y-outlines',
          heading: 'Outlines on shape indicators',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Because icon indicators carry high-contrast inner glyphs they require no outer border, whereas compact filled Shape indicators MUST include visible outer outlines alongside text labels—especially around light yellow or orange swatches in light surfaces.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Outlines',
            lines: '492–511'
          }
        }
      ]
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Badge & Button', kind: 'component' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Disabled states', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/status-indicator-pattern/index.md', heading: '## Related', lines: '512–527' }
    }
  ],
  demos: [
    {
      id: 'status-icon-connection',
      title: 'Show connection and attention states',
      sectionId: 'icon-indicator',
      secondarySectionIds: ['designing-severity-levels', 'a11y-elements'],
      mappingStatus: 'mapped',
      scenario:
        'Combine clear status icons, distinct severity colors, and left-aligned labels for system health telemetry.',
      teaching: {
        meaning:
          'An icon indicator pairs a high-contrast symbol inside a status color with concise text for system health and attention states.',
        decision:
          'Match icon indicators (20px/16pt or 16px/14pt) to system health conditions, rolling consolidated states up to the highest active severity.',
        consider:
          'Keep status indicators to <= 5–6 per dense area using plain text for non-actionable states, and preserve >= 3:1 grayscale contrast.'
      },
      interactive: false
    },
    {
      id: 'status-shape-compact-list',
      title: 'Scan operational readiness in a compact list',
      sectionId: 'shape-indicator',
      secondarySectionIds: ['visual-shapes', 'a11y-outlines'],
      mappingStatus: 'mapped',
      scenario:
        'Use distinct outlined 16px shapes paired with left-aligned lifecycle/readiness text in dense table rows.',
      teaching: {
        meaning:
          'Shape indicators support scanning many compact rows where product lifecycle or priority tiers differ.',
        decision:
          'Assign a unique shape geometry to each state (never reusing the same shape with different colors), size silhouettes at 16px beside labels, and always add outlines on light themes.',
        consider:
          'Reserve gray for unstarted/draft states and purple for outliers; use extended palettes strictly to keep yellow/orange 3:1 accessible.'
      },
      interactive: false
    },
    {
      id: 'status-badge-navigation',
      title: 'Summarize unread work in navigation',
      sectionId: 'badge-indicator',
      secondarySectionIds: ['badge-with-number', 'badge-without-number'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Illustrate a capped unread count, a new-item dot, and a hidden zero badge on navigation icons; production badges belong on actionable icon buttons.',
      teaching: {
        meaning:
          'A badge indicator overlays unread counts or presence dots onto interactive icon buttons until acknowledged.',
        decision:
          'Use numbered counters (max 3 digits: 999+) strictly on 48px header ghost icon buttons, use dot badges on toolbar icon buttons, and hide badges at zero.',
        consider:
          'Clear badges cleanly once acknowledged and never attach standalone zero counters beside plain text strings.'
      },
      interactive: false,
      _demoNote:
        'Static reference uses labeled icon illustrations, overlays unread/dot badges, demonstrates the 999+ cap, and hides the zero badge; it does not provide operable navigation buttons.'
    },
    {
      id: 'status-differential-trends',
      title: 'Compare operational trends over time',
      sectionId: 'differential-indicator',
      secondarySectionIds: ['differential-color'],
      mappingStatus: 'mapped',
      scenario: 'Present +/- values, directional carets/arrows, comparison baselines, and domain-safe color meaning.',
      teaching: {
        meaning: 'A differential indicator communicates magnitude and direction relative to a comparison timeframe.',
        decision:
          'Include explicit +, -, arrow, or caret markers alongside comparison labels so directional meaning never depends on color alone.',
        consider:
          'Avoid assuming green = up everywhere—metrics like battery temperature, thermal drift, or error rates invert or neutralize directional color meaning.'
      },
      interactive: false
    }
  ],
  components: ['Badge', 'Button', 'Tag']
}

export const PAGE_TEXT_TOOLBARS: PatternPageDraft = {
  id: 'text-toolbars',
  title: 'Text toolbars',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Experimental component warning in source: the maintained reference explicitly notes that the in-editor keyword search interaction shown in Text toolbars is NOT currently ready for production use.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/text-toolbar-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 20–31)',
      '## Resources (lines 32–38 — design kit link)',
      '## References (lines 276–280)',
      '## Feedback (lines 281–285)'
    ],
    _upstreamAnomalies: [
      'Upstream ## Resources precedes ## Overview at line 32 and points solely to an external design kit link; excluded cleanly in normalization.'
    ]
  },
  summary:
    'Text toolbars anchor editing, formatting, paragraph, attachment, and optional search actions horizontally above editable text containers, adapting across viewport sizes and preserving a single-Tab roving keyboard surface.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Place a cohesive horizontal action bar directly above an editable text area whenever authors format briefs, embed links, or attach supporting documents—trimming away unused tools to keep workspaces focused.'
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Overview', lines: '39–74' }
    },
    {
      id: 'anatomy',
      heading: 'Anatomy',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Customize your toolbar from six functional control groups paired directly with the editor body below:'
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Edit actions: Undo, Redo, Cut, Copy, and Paste.',
            'Text formatting: Typeface selector, Type size selector, Bold, Italic, Underline, and Text color menu.',
            'Paragraph structure: Alignment options, Bulleted, Checked, and Numbered lists, plus Indent more/less.',
            'Attachments and links: File attachment trigger and inline Link embedding tool.',
            'In-editor Search (optional, non-production experimental reference concept).',
            'Connected editable text area immediately beneath the bar.'
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Anatomy', lines: '75–91' }
    },
    {
      id: 'when-to-use',
      heading: 'When to use',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use a text toolbar for structured briefs, operational notes, comments, or message composers that genuinely require inline formatting or embedded assets; use plain text areas when unformatted notes suffice.'
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## When to use', lines: '92–101' }
    },
    {
      id: 'behaviors',
      heading: 'Behaviors',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Behaviors', lines: '102–103' },
      children: [
        {
          id: 'behaviors-states',
          heading: 'Control states',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Every toolbar icon control communicates five clear interactive states—enabled, hover, focus, active/pressed, and disabled—paired with dropdown pickers for font/size and compact popup menus for color or alignment options.'
            }
          ],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### States', lines: '104–130' }
        },
        {
          id: 'behaviors-attach-files',
          heading: 'Attach files',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Trigger file picking from the toolbar attachment action and anchor attached file chips directly inside the lower-left footer area of the editable text container itself with an inline close (×) button to detach.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Attach files',
            lines: '131–145'
          }
        },
        {
          id: 'behaviors-embed-links',
          heading: 'Embed links',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Activating the toolbar Link button opens an inline URL popover where typing or confirming embeds the target link cleanly; close via its close icon or clicking outside. Selecting or highlighting existing linked text reopens that URL popover so authors can inspect, revise, or remove the link in place.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Embed links',
            lines: '146–163'
          }
        },
        {
          id: 'behaviors-search',
          heading: 'In-editor search (non-production)',
          level: 3,
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Source warning: in-editor keyword search is explicitly documented as NOT production-ready in the maintained reference; treat any in-editor find bar as an experimental pattern concept.'
            },
            {
              type: 'prose',
              text: 'When toggled from the bar, searches substrings solely within the current text document, highlights matching occurrences inside the editor body, displays current hit totals inside a clearable tag/pill with × inside the search field, and exits cleanly via close icon or clicking outside.'
            }
          ],
          demoRefs: ['text-toolbars-find-in-context'],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Search (plus [!NOTE] lines 13–17)',
            lines: '13–17, 164–180'
          }
        },
        {
          id: 'behaviors-responsiveness',
          heading: 'Responsiveness across breakpoints',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Viewport tier', 'Toolbar layout adaptation'],
              rows: [
                [
                  'Extra large / Max',
                  'All enabled controls render on a single row; search field expands as horizontal room grows'
                ],
                ['Large (lg)', 'Search shrinks to an icon toggle or secondary actions tuck into an overflow menu'],
                ['Medium (md)', 'Toolbar cleanly wraps into two organized horizontal control rows'],
                ['Small (sm)', 'Compact two-row wrap paired with an overflow menu gathering lower-priority actions']
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Responsiveness',
            lines: '181–196'
          }
        },
        {
          id: 'behaviors-overflow',
          heading: 'Overflow menu containment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Spill lower-frequency actions smoothly into a single Overflow menu button at narrow widths rather than duplicating full buttons in extra rows beneath the toolbar.'
            }
          ],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### Overflow', lines: '197–205' }
        },
        {
          id: 'behaviors-saving',
          heading: 'Saving and draft persistence',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Support either an explicit "Save draft" trigger or transparent background autosave alongside final publish/send actions so operators never lose long-form writing.'
            }
          ],
          demoRefs: ['text-toolbars-format-draft'],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### Saving', lines: '206–215' }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/text-toolbar-pattern/index.md',
        heading: '## Accessibility',
        lines: '216–217'
      },
      children: [
        {
          id: 'a11y-tooltips',
          heading: 'Tooltips on hover and focus',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Display concise tooltips on both pointer hover and keyboard focus for every icon-only toolbar action.'
            }
          ],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### Tooltips', lines: '218–225' }
        },
        {
          id: 'a11y-keyboard',
          heading: 'Keyboard roving focus and menu navigation',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Entry stop: pressing Tab enters and exits the toolbar as a single logical stop, placing focus onto the first enabled control (or optionally restoring the last focused button on return).',
                'Horizontal travel: Right and Left Arrow keys move smoothly across toolbar items so users never traverse twenty individual Tab stops.',
                'Menu traversal: Enter or Space toggles dropdowns and overflow menus open, then Up/Down Arrow keys select options cleanly.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Keyboard > When focus moves / Horizontal toolbars / Menus',
            lines: '226–247'
          }
        },
        {
          id: 'a11y-screen-readers',
          heading: 'Screen reader toolbar semantics',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Expose `role="toolbar"` following ARIA toolbar guidelines, announce pressed formatting toggle states, and give every grouped toolbar an accessible label.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Screen readers',
            lines: '248–257'
          }
        }
      ]
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Toolbar, Toggle, Menu, Tooltip, Attachment', kind: 'component' },
            { label: 'Common actions', kind: 'pattern' },
            { label: 'Search', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Related', lines: '258–266' }
    }
  ],
  demos: [
    {
      id: 'text-toolbars-format-draft',
      title: 'Format a mission brief and manage its draft',
      sectionId: 'behaviors-saving',
      secondarySectionIds: ['anatomy', 'behaviors-attach-files', 'behaviors-embed-links', 'a11y-keyboard'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Style a sample mission brief, add a reference or attachment, and review the formatted draft before saving it locally.',
      teaching: {
        meaning:
          'A text toolbar keeps editing, formatting, paragraph, attachment, and draft tools clustered immediately above the editable area.',
        decision:
          'Include only controls needed for the task, collapse extra tools into an overflow menu across md/sm breakpoints, anchor attachments inside the bottom-left editor footer, and support highlight-to-edit inline link popovers.',
        consider:
          'Expose hover+focus tooltips on icon controls, use single-Tab-stop `role="toolbar"` with Left/Right arrow navigation, and never duplicate menu actions as redundant standalone buttons below the bar.'
      },
      interactive: true,
      _demoNote:
        'The preview keeps each toolbar action and its local result together and removes duplicate standalone menu actions. It remains a simplified editor: attachment placement is below the textarea rather than in an editor footer, and icon-button tooltips/highlight-to-edit link popovers are not modeled.'
    },
    {
      id: 'text-toolbars-find-in-context',
      title: 'Find and edit wording in context',
      sectionId: 'behaviors-search',
      mappingStatus: 'partial-divergent',
      scenario:
        'Search within a sample draft, review highlighted matches and the hit count, and keep the experimental status visible.',
      teaching: {
        meaning:
          'In-document search locates wording inside the active editor without confusion against global workspace search.',
        decision:
          'Highlight matching text directly inside the editor body, display total hits inside a clearable pill/tag with ×, and close via × or click-outside.',
        consider:
          'Maintained source explicitly marks in-editor keyword search NOT ready for production use—treat UI details here as experimental.'
      },
      interactive: true,
      _demoNote:
        'The local preview now highlights matching words, reports a clearable hit count, and labels the feature experimental/not production-ready. Search remains a permanent field with a separate matching preview rather than a toolbar-triggered search that highlights text directly in the editable body.'
    }
  ],
  components: ['Toolbar', 'Toggle', 'Menu', 'Tooltip', 'Attachment', 'Input', 'Button', 'Badge']
}

export const PAGE_COMMUNITY_CHATBOTS: PatternPageDraft = {
  id: 'community-chatbots',
  title: 'Chatbots',
  group: 'Community',
  source: {
    status: 'Community maintained',
    subpages: [
      {
        id: 'overview',
        title: 'Overview',
        order: 1,
        _path: 'docs/carbon-ds-reference/community/patterns/chatbot/overview.md'
      },
      { id: 'usage', title: 'Usage', order: 2, _path: 'docs/carbon-ds-reference/community/patterns/chatbot/usage.md' },
      { id: 'flows', title: 'Flows', order: 3, _path: 'docs/carbon-ds-reference/community/patterns/chatbot/flows.md' },
      {
        id: 'content',
        title: 'Content',
        order: 4,
        _path: 'docs/carbon-ds-reference/community/patterns/chatbot/content.md'
      }
    ],
    limits: [
      'Community-sourced guidance maintained outside the core pattern set; several flows (multiple threads, expanding cards, error recovery) and supporting primitives remain in Preview or upcoming states.',
      'Traditional UI controls and direct navigation must stay accessible for predictable tasks rather than routing everything through conversation.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/chatbot/overview.md',
    _excludedSections: [
      'overview.md: #### Maintainers: (duplicated lines 10–17)',
      'overview.md: ### Quick Navigation (lines 25–32)',
      'overview.md: ## Chatbot add-on library (Sketch download link, lines 118–132)',
      'overview.md: ## More information (vendor partnership note, lines 134–139)',
      'usage.md: ### Quick Navigation (lines 11–16)',
      'flows.md: ### Quick Navigation (lines 21–27)',
      'content.md: ### Quick Navigation (lines 16–21)',
      'content.md: ## Resources & ## References (external links & bibliography, lines 84–115)'
    ],
    _upstreamAnomalies: [
      'overview.md Quick Navigation lists User needs before Why a chatbot?, whereas the document body renders ## Common use cases -> ## Why a chatbot? -> ## User needs -> ## Supported components; this handoff preserves actual body order.',
      'overview.md duplicates #### Maintainers: consecutively (lines 10 and 15).',
      'usage.md #### Provide a response and request feedback duplicates its closing sentence twice (lines 119–122).'
    ]
  },
  summary:
    'A chatbot supports natural-language questions and guided tasks when on-demand answers are genuinely useful, trustworthy, and grounded in the user’s workflow—while leaving conventional navigation intact for predictable actions.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      subpageId: 'overview',
      blocks: [
        {
          type: 'prose',
          text: 'Use conversational assistance when people benefit from asking for help or looking up task-relevant answers in plain language and receiving dependable responses tailored to their goal.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/chatbot/overview.md',
        heading: '# Chatbots (Overview)',
        lines: '1–22'
      },
      children: [
        {
          id: 'overview-common-use-cases',
          heading: 'Common use cases',
          level: 3,
          subpageId: 'overview',
          blocks: [
            {
              type: 'prose',
              text: 'Conversational interfaces fit four recurring product needs best:'
            },
            {
              type: 'list',
              items: [
                'In-context help and onboarding: answer frequently asked questions at scale or help first-time operators get oriented.',
                'Case intake and triage: collect structured details upfront to prioritize requests and reduce manual support load.',
                'Routine transactions and procedures: guide people step by step through bounded operational tasks.',
                'Natural-language lookup: help users retrieve specific records, statuses, or policy details without hunting through nested filters.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/overview.md',
            heading: '## Common use cases',
            lines: '41–55'
          }
        },
        {
          id: 'overview-why-a-chatbot',
          heading: 'Why a chatbot?',
          level: 3,
          subpageId: 'overview',
          blocks: [
            {
              type: 'prose',
              text: 'Before investing in a bot, confirm that conversation outperforms simpler product alternatives by answering five readiness questions:'
            },
            {
              type: 'list',
              items: [
                'What specific outcomes are users trying to achieve?',
                'How deep or open-ended is the assistance they need?',
                'Would direct human support serve this domain better and more safely?',
                'Why is a conversational flow superior to contextual tooltips, documentation, or a structured wizard?',
                'Which verified data sources and capabilities can the bot actually act upon?'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/overview.md',
            heading: '## Why a chatbot?',
            lines: '56–68'
          }
        },
        {
          id: 'overview-user-needs',
          heading: 'User needs',
          level: 3,
          subpageId: 'overview',
          blocks: [],
          _sourceCitation: { path: 'community/patterns/chatbot/overview.md', heading: '## User needs', lines: '69–70' },
          children: [
            {
              id: 'overview-user-needs-general',
              heading: 'What users expect from a bot',
              level: 4,
              subpageId: 'overview',
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Round-the-clock availability whenever questions arise.',
                    'Relevant, on-demand answers tied directly to their current question.',
                    'Consistent, high-quality product or operational guidance they can rely on.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/overview.md',
                heading: '#### A user may need:',
                lines: '71–76'
              }
            },
            {
              id: 'overview-user-needs-conversation',
              heading: 'What users need inside a conversation',
              level: 4,
              subpageId: 'overview',
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Structured choices to supply missing context quickly without typing everything freehand.',
                    'Reflective summaries and confirming questions that show what the bot understood before acting.',
                    'Clear visual distinction identifying the latest active message so progress stays unambiguous.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/overview.md',
                heading: '#### Within a conversation, a user may need:',
                lines: '77–82'
              }
            },
            {
              id: 'overview-user-needs-dont',
              heading: 'When not to use a chatbot',
              level: 4,
              subpageId: 'overview',
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not force tasks into chat when traditional UI controls finish faster, when the workflow spans lengthy or highly intricate steps, or when sensitive or emotional situations belong with a person.'
                }
              ],
              demoRefs: ['chatbots-standard-navigation'],
              _sourceCitation: {
                path: 'community/patterns/chatbot/overview.md',
                heading: '#### Don’t use a chatbot when:',
                lines: '83–93'
              }
            }
          ]
        },
        {
          id: 'overview-supported-components',
          heading: 'Building block maturity',
          level: 3,
          subpageId: 'overview',
          blocks: [
            {
              type: 'prose',
              text: 'Treat conversational surface maturity carefully when scoping a product integration:'
            },
            {
              type: 'table',
              columns: ['Maturity stage', 'Covered conversational elements'],
              rows: [
                [
                  'Established design patterns',
                  'Chat window, header, system messages, user messages, structured responses, cards, text composer, launch trigger'
                ],
                ['Preview conventions', 'Welcome screen, expandable cards, human-agent messages'],
                ['Upcoming / unfinalized', 'List blocks, launch chip prompts, multi-thread switcher menu']
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/overview.md',
            heading: '## Supported components',
            lines: '94–117'
          }
        }
      ]
    },
    {
      id: 'usage',
      heading: 'Usage',
      level: 2,
      subpageId: 'usage',
      blocks: [
        {
          type: 'prose',
          text: 'Define clear structural roles inside the chat panel and follow an iterative clarification loop whenever a user request needs narrower scope before answering.'
        }
      ],
      _sourceCitation: { path: 'community/patterns/chatbot/usage.md', heading: '# Chatbots (Usage)', lines: '1–10' },
      children: [
        {
          id: 'usage-anatomy',
          heading: 'Anatomy',
          level: 3,
          subpageId: 'usage',
          blocks: [
            {
              type: 'prose',
              text: 'Combine seven consistent building blocks inside the conversational workspace:'
            },
            {
              type: 'table',
              columns: ['Element', 'Role and rules', 'Variants'],
              rows: [
                [
                  'Header',
                  'Displays the assistant title and up to four utility actions; typically always includes an explicit close control.',
                  'Default, With avatar, Large'
                ],
                [
                  'System message',
                  'Presents bot replies; fade older messages while marking the currently active system reply with a clear visual indicator.',
                  'Default'
                ],
                [
                  'User message',
                  'Shows what the operator submitted via typed text, selected structured choice, or voice.',
                  'Default'
                ],
                [
                  'Structured response',
                  'Offers bot-parseable choice pills; selecting an option changes its visual state and appends a matching user message turn.',
                  'Default'
                ],
                [
                  'Composer input',
                  'Combines a text field, an optional secondary input trigger (such as voice), and a submit button.',
                  'Default, Without secondary action button'
                ],
                [
                  'Launch button',
                  'Serves as the entry trigger that opens the conversation experience.',
                  'Primary, Alternate'
                ],
                [
                  'Chatbot cards',
                  'Present rich informational summaries or next-step actions with text, media, or data.',
                  'Text (Hero, Large, Mini), Image (Avatar, Large, Mini), Data (Table, Visualization)'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/usage.md',
            heading: '## Anatomy (+ chatbot-4.png)',
            lines: '18–53'
          }
        },
        {
          id: 'usage-requesting-information',
          heading: 'Requesting information',
          level: 3,
          subpageId: 'usage',
          blocks: [
            {
              type: 'prose',
              text: 'Follow a predictable turn-by-turn exchange from greeting through clarification and feedback:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Greet the user and introduce what the assistant handles.',
                'Accept the user’s question or task request.',
                'Evaluate readiness to answer: if information is missing, reflect what the bot understood, ask for the missing detail, and offer structured choices; repeat this slot-filling loop until ready.',
                'Deliver the response as text/media, a direct link, or a task action button.',
                'Prompt the user for feedback on whether the response helped.'
              ]
            }
          ],
          demoRefs: ['chatbots-mission-help'],
          _sourceCitation: {
            path: 'community/patterns/chatbot/usage.md',
            heading: '## Requesting information (+ chatbot-1.png)',
            lines: '55–61'
          }
        },
        {
          id: 'usage-best-practices',
          heading: 'Best practices',
          level: 3,
          subpageId: 'usage',
          blocks: [
            {
              type: 'prose',
              text: 'Apply five baseline interaction practices across every conversational flow:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/usage.md',
            heading: '## Best practices',
            lines: '62–67'
          },
          children: [
            {
              id: 'usage-bp-introduction',
              heading: 'Introduction',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'State clearly that the user is interacting with an automated assistant, explain its purpose, and frame the specific topics people can ask about.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Introduction',
                lines: '68–77'
              }
            },
            {
              id: 'usage-bp-user-intent',
              heading: 'User intent',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Accept initial user goals—whether questions or task requests—through freeform text input or selectable structured prompts.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### User intent',
                lines: '79–89'
              }
            },
            {
              id: 'usage-bp-structured-responses',
              heading: 'Structured responses',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Offer menus of structured choices whenever narrowing scope helps the assistant reach a precise, accurate answer faster.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Structured responses',
                lines: '91–100'
              }
            },
            {
              id: 'usage-bp-reflection',
              heading: 'Reflection',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Paraphrase what the assistant understood to verify intent—especially before performing consequential actions—and repeat slot-filling prompts until every required input is gathered.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Reflection',
                lines: '102–113'
              }
            },
            {
              id: 'usage-bp-feedback',
              heading: 'Provide a response and request feedback',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Deliver a thorough, relevant answer grounded in the gathered context, then invite user feedback (including an optional custom text note when appropriate) so teams can evaluate quality.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Provide a response and request feedback',
                lines: '115–128'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'flows',
      heading: 'Flows',
      level: 2,
      subpageId: 'flows',
      blocks: [
        {
          type: 'prose',
          text: 'Complex tasks often require supplementary interactions around launching, escalation to people, long-form cards, and network recovery.'
        },
        {
          type: 'callout',
          kind: 'note',
          text: 'Preview status: multi-thread human handoff, expanding cards, and error-recovery flows represent emerging conventions that remain experimental rather than finalized standards.'
        }
      ],
      _sourceCitation: { path: 'community/patterns/chatbot/flows.md', heading: '# Chatbots (Flows)', lines: '1–19' },
      children: [
        {
          id: 'flows-launching',
          heading: 'Launching a bot',
          level: 3,
          subpageId: 'flows',
          blocks: [
            {
              type: 'prose',
              text: 'Anchor a persistent launch trigger in the bottom-right corner of the viewport, or embed an explicit launch button directly inside the relevant workflow view.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Launching a bot (+ chatbot-5.png)',
            lines: '29–36'
          }
        },
        {
          id: 'flows-multiple-threads',
          heading: 'Multiple threads (Preview)',
          level: 3,
          subpageId: 'flows',
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'prose',
              text: 'Escalate to a live human specialist whenever the bot cannot resolve a request, detects repeated failure or frustration, or the user explicitly prefers human assistance.'
            }
          ],
          demoRefs: ['chatbots-human-handoff'],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Multiple threads (Preview)',
            lines: '37–42'
          },
          children: [
            {
              id: 'flows-mt-user-initiates',
              heading: 'User initiates change',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Support both user-requested escalation and proactive bot offers to transfer after repeated unsuccessful answers.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### User initiates change',
                lines: '43–50'
              }
            },
            {
              id: 'flows-mt-notify',
              heading: 'Notify the user',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Announce context switches and agent arrival with both a transient toast banner and a persistent in-thread status message so conversation history remains clear.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Notify the user',
                lines: '51–58'
              }
            },
            {
              id: 'flows-mt-multiple-users',
              heading: 'Multiple users',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'When multiple specialists participate in one thread, distinguish who the user is speaking with whenever roles or responsibilities differ.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Multiple users',
                lines: '59–66'
              }
            },
            {
              id: 'flows-mt-incoming',
              heading: 'Incoming messages',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Signal background thread activity with an unread dot on the threads control, per-thread unread counts inside the threads list, and distinct styling for unread threads.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Incoming messages',
                lines: '67–75'
              }
            }
          ]
        },
        {
          id: 'flows-expanding-cards',
          heading: 'Expanding cards (Preview)',
          level: 3,
          subpageId: 'flows',
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'prose',
              text: 'Use progressive card expansion when structured output exceeds comfortable inline summary density.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Expanding cards (Preview)',
            lines: '76–80'
          },
          children: [
            {
              id: 'flows-ec-default',
              heading: 'Default state',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Highlight only critical summary facts in the collapsed card and provide a clear expand action.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Default state',
                lines: '81–87'
              }
            },
            {
              id: 'flows-ec-expanded',
              heading: 'Expanded state',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Reveal fuller details inside the expanded card; link to a full-page view only when genuinely unavoidable.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Expanded state',
                lines: '88–94'
              }
            },
            {
              id: 'flows-ec-full-view',
              heading: 'Full view',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Reserve a dedicated full-view container strictly for long-form content that would overwhelm the chat stream.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Full view',
                lines: '95–101'
              }
            }
          ]
        },
        {
          id: 'flows-error-states',
          heading: 'Error states (Preview)',
          level: 3,
          subpageId: 'flows',
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'prose',
              text: 'Flag undelivered user messages clearly right in the transcript (for example with an inline error marker and connection-loss banner). Once connectivity returns, show a brief connected confirmation and then clear both that notice and the message-level error badges.'
            }
          ],
          demoRefs: ['chatbots-error-recovery'],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Error states (Preview) (+ chatbot-6.png)',
            lines: '102–109'
          }
        }
      ]
    },
    {
      id: 'content',
      heading: 'Content',
      level: 2,
      subpageId: 'content',
      blocks: [
        {
          type: 'prose',
          text: 'Once user research validates the need for a chatbot, shape its voice, expectations, and dialogue guardrails around clear, non-deceptive communication.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/chatbot/content.md',
        heading: '# Chatbots (Content)',
        lines: '1–15'
      },
      children: [
        {
          id: 'content-conversational-writing',
          heading: 'Conversational writing',
          level: 3,
          subpageId: 'content',
          blocks: [],
          _sourceCitation: {
            path: 'community/patterns/chatbot/content.md',
            heading: '## Conversational writing',
            lines: '23–24'
          },
          children: [
            {
              id: 'content-tailoring',
              heading: 'Tailoring the conversation to your users',
              level: 4,
              subpageId: 'content',
              blocks: [
                {
                  type: 'prose',
                  text: 'Adjust tone to fit the operator’s domain and task seriousness so phrasing feels natural without distracting from expectations.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/content.md',
                heading: '### Tailoring the conversation to your users',
                lines: '25–35'
              },
              children: [
                {
                  id: 'content-tailoring-should',
                  heading: 'In general, bots should',
                  level: 5,
                  subpageId: 'content',
                  blocks: [
                    {
                      type: 'callout',
                      kind: 'do',
                      text: 'Use straightforward language, keep a genuinely helpful tone without forced enthusiasm, paraphrase inputs to confirm understanding, and offer fallback options or help when users get stuck.'
                    }
                  ],
                  _sourceCitation: {
                    path: 'community/patterns/chatbot/content.md',
                    heading: '#### In general, bots should:',
                    lines: '36–43'
                  }
                },
                {
                  id: 'content-tailoring-should-not',
                  heading: 'Typically, bots should not',
                  level: 5,
                  subpageId: 'content',
                  blocks: [
                    {
                      type: 'callout',
                      kind: 'dont',
                      text: 'Never impersonate a human, leave users with a dead end and no recourse, or send pushy, unsolicited prompts.'
                    }
                  ],
                  _sourceCitation: {
                    path: 'community/patterns/chatbot/content.md',
                    heading: '#### Typically, bots should not:',
                    lines: '44–52'
                  }
                }
              ]
            },
            {
              id: 'content-principles',
              heading: 'Conversation design principles for bots',
              level: 4,
              subpageId: 'content',
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Introduce the bot clearly: establish non-human identity, scope boundaries, practical value, and realistic next steps.',
                    'Orient the user: explain supported topics and tasks upfront rather than assuming users guess what to ask.',
                    'Be proactive with structured prompts: suggest starter options when users may not know how to phrase a question.',
                    'Decrease ambiguity before consequential acts: restate key values or targets for confirmation, summarize complex inputs, and rely on structured replies to prevent dead ends.',
                    'Provide clear, manageable actions: keep structured menus small enough to scan without overwhelming users.',
                    'Guide multi-step progress: communicate expected wait or duration, confirm progress, and let users cancel or restart longer tasks.',
                    'Collect feedback: invite ongoing ratings or input so teams can monitor and improve response accuracy.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/content.md',
                heading: '### Conversation design principles for bots',
                lines: '54–83'
              }
            }
          ]
        }
      ]
    }
  ],
  demos: [
    {
      id: 'chatbots-mission-help',
      title: 'Ask for help with mission planning',
      sectionId: 'usage-requesting-information',
      secondarySectionIds: ['usage-anatomy', 'usage-best-practices', 'overview-common-use-cases', 'content-principles'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A pilot asks how to find route details; the scripted helper explains its limits and points to the mission record.',
      teaching: {
        meaning:
          'A conversational helper answers scoped natural-language lookups when people do not know where a record lives, while disclosing what it cannot do.',
        decision:
          'Introduce bot identity and topic limits upfront, pair freeform text with scannable structured prompts, reflect ambiguous intent before acting, and close helpful answers with a feedback prompt.',
        consider:
          'Keep the active system reply visually distinct from faded prior messages, lock selected prompt chips as echoed user turns, and never imply authority over unverified operational domains.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:2573-2613`) omits header utility actions/close control, past-message fading vs. active-reply bar indicator, selected structured-pill state change, multi-turn slot-fill confirmation loop, and a post-answer feedback prompt.'
    },
    {
      id: 'chatbots-standard-navigation',
      title: 'Continue through standard navigation',
      sectionId: 'overview-user-needs-dont',
      secondarySectionIds: ['content-tailoring-should', 'content-principles'],
      mappingStatus: 'partial-divergent',
      scenario: 'When a question is outside the helper’s scope, direct the user back to the Missions workspace.',
      teaching: {
        meaning:
          'Chat should work alongside ordinary product navigation rather than trapping users inside conversation for predictable tasks.',
        decision:
          'Avoid routing tasks through chat when standard UI finishes faster, and always give a direct escape hatch to conventional workspace views when a bot reaches its limit.',
        consider: 'Link directly to the target workspace view rather than echoing another bot message.'
      },
      interactive: true,
      _demoNote:
        'The action opens an in-card Missions destination preview and clearly states that product navigation did not occur; a live route is not connected in this sample.'
    },
    {
      id: 'chatbots-error-recovery',
      title: 'Recover when a message cannot be sent',
      sectionId: 'flows-error-states',
      mappingStatus: 'partial-divergent',
      scenario:
        'Show a clear failed state and preview retry recovery; this local example does not send a real message.',
      teaching: {
        meaning:
          'Send failures require visible inline status and an immediate recovery path so operators know their prompt did not go through.',
        decision:
          'Follow Preview error-state guidance: mark undelivered user bubbles inline alongside a connection notice, offer Retry, and clear error indicators after displaying a brief reconnect confirmation.',
        consider:
          'Error recovery in the community reference carries Preview status rather than finalized specification guarantees.'
      },
      interactive: true,
      _demoNote:
        'Retry updates a local preview only; it does not resend a message or contact a service. Per-message failure badges and transient reconnect-banner clearing are not modeled.'
    },
    {
      id: 'chatbots-human-handoff',
      title: 'Hand off a complex request to a person',
      sectionId: 'flows-multiple-threads',
      secondarySectionIds: ['flows-mt-user-initiates', 'flows-mt-notify', 'overview-user-needs-dont'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Preview a support handoff and preserve a return path; this example does not contact a support teammate.',
      teaching: {
        meaning:
          'Sensitive, complex, or repeatedly unresolved requests need a transparent escalation path to a human teammate.',
        decision:
          'Follow Preview multi-thread conventions: trigger handoff on user request or repeated failure, notify via both a top banner and an in-thread status message, distinguish agent roles, and surface unread counts across background threads.',
        consider:
          'Disclose shared conversation context and real support availability; escalation conventions carry Preview status.'
      },
      interactive: true,
      _demoNote:
        'The handoff changes only the preview; it does not open a support thread. Toast + in-thread notifications, agent role indicators, and unread thread badges/counts are not modeled.'
    }
  ],
  _implementationNotes: [
    'ChatbotsDemo currently composes Input, Button, and Alert in local component state (`demos.tsx:2553-2672`); `catalog.ts:458` lists Command unused by the current demo.'
  ]
}

export const PAGE_COMMUNITY_IN_APP_LEARNING: PatternPageDraft = {
  id: 'community-in-app-learning',
  title: 'Content: in-app learning',
  group: 'Community',
  source: {
    status: 'Community catalog only',
    catalogEvidence:
      'The community pattern index lists Content: in-app learning as a collection of five adoption topics to help users understand key features: welcome screens, getting started, in-context help and guidance, global help and guidance, and updates.',
    limits: [
      'Catalog-only entry: no dedicated detail specification is maintained locally; all referenced external content-design guides are unavailable here.',
      'Missing maintained rules: triggers, dismissal persistence, completion tracking, frequency caps, visual anatomy, placement, and accessibility requirements are not defined in the local source.',
      'All behavioral guidance and interactive examples on this page are SkyTrack local interpretations only.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/index.md',
    _primaryLines: '38',
    _excludedSections: [
      'No dedicated pattern page exists locally; standard maintained sections (Anatomy, Behavior, Accessibility, Related) are intentionally omitted per catalog-only limits.'
    ]
  },
  summary:
    'Catalog-only reference listing five feature-adoption topics—welcome screens, getting started, in-context help, global help, and product updates—without locally maintained behavioral or persistence specifications.',
  sections: [
    {
      id: 'source-evidence',
      heading: 'Catalog evidence',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'The maintained local community index records only a single catalog entry identifying five adoption-focused learning moments intended to help people understand key capabilities:'
        },
        {
          type: 'list',
          items: [
            'Welcome screens',
            'Getting started',
            'In-context help and guidance',
            'Global help and guidance',
            'Updates (what’s new)'
          ]
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Content: in-app learning',
        lines: '38'
      }
    },
    {
      id: 'source-limits',
      heading: 'Source limits',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'source-limit',
          text: 'No detailed specification is maintained locally for any of these five topics. The local catalog defines no opening triggers, dismissal behavior, progress persistence, recurrence rules, layout anatomy, or accessibility contracts.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Content: in-app learning (IBM-only links)',
        lines: '31, 38'
      }
    },
    {
      id: 'local-interpretation',
      heading: 'Local interpretation for examples',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'local-interpretation',
          text: 'Local interpretation: because the maintained index provides topic names without interaction rules, the guidance below explains only how SkyTrack illustrates those five moments in the interactive examples.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Content: in-app learning (local demo mapping)',
        lines: '38'
      },
      children: [
        {
          id: 'local-welcome-screens',
          heading: 'Welcome screens (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: a concise welcome banner can orient someone entering a new workspace without blocking immediate work, provided dismissal and a route to revisit are clear.'
            }
          ],
          demoRefs: ['in-app-learning-welcome'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'welcome screens (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-getting-started',
          heading: 'Getting started checklists (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: a short ordered checklist can introduce initial setup tasks one step at a time while clarifying locally whether progress persists.'
            }
          ],
          demoRefs: ['in-app-learning-checklist'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'getting started (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-in-context-help',
          heading: 'In-context help and guidance (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: placing brief task tips right beside unfamiliar controls answers specific questions without pulling operators away from their workflow.'
            }
          ],
          demoRefs: ['in-app-learning-context-tip'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'in-context help and guidance (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-global-help',
          heading: 'Global help and guidance (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: a steady workspace help destination gives people a predictable place to find general documentation and support contacts across screens.'
            }
          ],
          demoRefs: ['in-app-learning-global-help'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'global help and guidance (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-updates',
          heading: 'Product updates (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: concise release alerts can highlight meaningful workflow changes when users can dismiss them and look them up again later.'
            }
          ],
          demoRefs: ['in-app-learning-updates'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'what’s new / updates (catalog topic)',
            lines: '38'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'in-app-learning-welcome',
      title: 'Welcome a first-time user',
      sectionId: 'local-welcome-screens',
      mappingStatus: 'local-interpretation',
      scenario:
        'Orient a new workspace member with a short welcome and one clear way to begin or dismiss the introduction.',
      teaching: {
        meaning: 'Local interpretation: a brief welcome orients someone who is new and gives them a first step.',
        decision:
          'Local interpretation: use a welcome when a new capability or workspace needs orientation; keep a way to dismiss and revisit it.',
        consider:
          'Avoid blocking the user’s task; dismissal persistence and welcome behavior are not defined in the local catalog source.'
      },
      interactive: true,
      _demoNote:
        'Local-only walkthrough: Get started opens a sample first step, dismissal can be reversed, and progress is not persisted.'
    },
    {
      id: 'in-app-learning-checklist',
      title: 'Help users get started with a short checklist',
      sectionId: 'local-getting-started',
      mappingStatus: 'local-interpretation',
      scenario: 'Break an unfamiliar task into visible first steps and show progress as each item is completed.',
      teaching: {
        meaning:
          'Local interpretation: a short checklist breaks an unfamiliar task into first steps and makes progress visible.',
        decision:
          'Local interpretation: use it when a person needs a sequence to get started; keep each step tied to the task at hand.',
        consider:
          'If completion is tracked, decide how users can resume and avoid repeating finished guidance; progress policy is not in the local source.'
      },
      interactive: true
    },
    {
      id: 'in-app-learning-context-tip',
      title: 'Show in-context guidance beside a task',
      sectionId: 'local-in-context-help',
      mappingStatus: 'local-interpretation',
      scenario:
        'Offer a short explanation where a person encounters a new control, with a way to complete or reopen the tip.',
      teaching: {
        meaning: 'Local interpretation: a nearby tip explains a feature at the moment someone encounters it.',
        decision:
          'Local interpretation: choose contextual guidance when a question arises during a specific task rather than sending users away for general reference.',
        consider:
          'Keep tips relevant to the active control without obscuring surrounding inputs; local source defines no contextual-tip policy.'
      },
      interactive: true
    },
    {
      id: 'in-app-learning-global-help',
      title: 'Keep global help available across the workspace',
      sectionId: 'local-global-help',
      mappingStatus: 'local-interpretation',
      scenario:
        'Place learning resources in a predictable help location instead of repeating a full introduction on every page.',
      teaching: {
        meaning:
          'Local interpretation: workspace-wide help gives people a steady destination when a question spans multiple screens.',
        decision:
          'Local interpretation: use a global help entry point for reference that must stay reachable across workflows.',
        consider:
          'Make help discoverable without interrupting active tasks; the local catalog defines no navigation or access rules.'
      },
      interactive: true,
      _demoNote:
        'In `demos.tsx:2781-2785`, expanded "Workspace help and guidance" renders static plain list text with no interactive links.'
    },
    {
      id: 'in-app-learning-updates',
      title: 'Explain what changed in a product update',
      sectionId: 'local-updates',
      mappingStatus: 'local-interpretation',
      scenario: 'Show a concise release note that users can dismiss and find again from the help area.',
      teaching: {
        meaning: 'Local interpretation: an update explains a recent product change that affects daily workflow.',
        decision:
          'Local interpretation: surface update guidance when a change matters to users, letting them dismiss and revisit it.',
        consider:
          'Describe the real workflow change concisely; recurrence and display-frequency rules are absent from the local source.'
      },
      interactive: true
    }
  ],
  _implementationNotes: [
    'InAppLearningDemo uses Collapsible, Alert, and Button in local React state (`demos.tsx:2674-2816`) and intentionally does not persist learner progress.',
    'Note for catalog sync: `catalog.ts:470-471` (`whenToUse`, `userBenefit`) and `example-copy.ts:541-574` currently lack explicit `Local interpretation:` prefixes on `meaning`/`decision`.'
  ]
}

export const PAGE_COMMUNITY_CREATE_FLOWS: PatternPageDraft = {
  id: 'community-create-flows',
  title: 'Create flows',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Inline creation guidance is explicitly marked under construction in the maintained community reference.',
      'Trigger styling leaves the secondary choice between tertiary and ghost emphasis unresolved when a primary button already occupies the section.',
      'Wide tearsheet and full-page footers note an upcoming 80px fluid button height update replacing 64px.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/create-flows/index.md',
    _excludedSections: [
      '#### Maintainers: (lines 10–13)',
      '### Quick Navigation (lines 21–34)',
      '## Feedback (lines 443–447)',
      'Vendor-internal tearsheet/page-header links stripped while preserving UI concepts inside ## Related.'
    ],
    _upstreamAnomalies: [
      'Source mixes H2 -> H4 directly for When to use / When not to use subsections under Inline creation, Modal, Side panel, Narrow tearsheet, Wide tearsheet, and Full page; normalized to level 3 here while preserving exact sequence.',
      'Full page When to use / When not to use lists vendor-specific cloud provisioning exceptions; generalized here to prerequisite-setup conditions without vendor branding.'
    ]
  },
  summary:
    'Create flows generate a brand-new resource—distinct from attaching an existing item (Add) or modifying a saved record (Edit)—by matching simple or multi-step surfaces to field count, scrolling, context needs, and prerequisite status.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Creating generates a new resource rather than attaching an existing item (Add) or revising an existing one (Edit); never reuse Create surfaces for Add or Edit workflows. Select among six creation surfaces according to form complexity and whether surrounding page context must remain visible and interactive:'
        },
        {
          type: 'table',
          columns: ['Surface', 'When it fits', 'Page context visibility'],
          rows: [
            [
              'Inline',
              'Quick, simple item creation right on the canvas',
              'On-page content stays visible and interactive'
            ],
            ['Modal', 'Simple or transitional creation with 1–2 form fields', 'On-page content is obscured by overlay'],
            [
              'Side panel',
              'Medium complexity where live page context helps',
              'On-page content stays visible and interactive (no overlay)'
            ],
            [
              'Narrow tearsheet',
              'Medium complexity needing scrolling or section headers',
              'On-page content is obscured by overlay'
            ],
            [
              'Wide tearsheet',
              'Complex multi-step flows or spacious single-step layouts',
              'On-page content is obscured by overlay'
            ],
            [
              'Full page',
              'Rare prerequisite flows that must finish before a product or service becomes usable',
              'Dedicated page canvas'
            ]
          ]
        }
      ],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Overview', lines: '36–57' }
    },
    {
      id: 'inline-creation',
      heading: 'Inline creation',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'note',
          text: 'Under construction: the community reference notes that inline creation guidance is still evolving across edge cases.'
        }
      ],
      demoRefs: ['create-flows-inline'],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Inline creation',
        lines: '58–87'
      },
      children: [
        {
          id: 'inline-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Prefer inline creation for quick, simple items when keeping the surrounding list or workspace visible helps the operator stay oriented.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Inline creation)',
            lines: '60–67'
          }
        },
        {
          id: 'inline-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use inline creation if finishing the flow transitions the user onto another page—such as opening the newly created resource or moving to a confirmation screen; use a Modal instead. For complex objects like major system resources, step up to Narrow or Wide tearsheets.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Inline creation)',
            lines: '68–78'
          }
        }
      ]
    },
    {
      id: 'modal',
      heading: 'Modal',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-modal'],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Modal', lines: '89–117' },
      children: [
        {
          id: 'modal-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Simple creations requiring only one or two form fields.',
                'Transitional creations that navigate the user to a new page after submitting.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Modal)',
            lines: '91–96'
          }
        },
        {
          id: 'modal-when-not-to-use',
          heading: 'When not to use a modal',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never substitute a modal for an inline creation opportunity, and never use a modal if the form requires more than four fields or internal vertical scrolling.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use a modal',
            lines: '97–102'
          }
        },
        {
          id: 'modal-anatomy',
          heading: 'Anatomy of a modal',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Small modal container paired with a backdrop overlay that dims underlying content.',
                'Create title with an optional concise subtitle.',
                'Body holding necessary instructions and form fields.',
                'Primary Create button and secondary Cancel button (no top-right close icon).'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a modal',
            lines: '103–117'
          }
        }
      ]
    },
    {
      id: 'side-panel',
      heading: 'Side panel',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-side-panel'],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Side panel', lines: '118–150' },
      children: [
        {
          id: 'side-panel-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a side panel when medium-complexity setup benefits from keeping live page content visible and interactive beside the form.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Side panel)',
            lines: '120–124'
          }
        },
        {
          id: 'side-panel-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Avoid side panels for high-complexity flows where users need a visible step-by-step progress indicator.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Side panel)',
            lines: '125–129'
          }
        },
        {
          id: 'side-panel-anatomy',
          heading: 'Anatomy of a side panel',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                '480px panel width with NO backdrop overlay, keeping the page in an interactive non-focus state so operators can reference on-screen records.',
                'Create title and optional subtitle.',
                'Body with form controls and supporting guidance.',
                'Primary Create button and secondary Cancel button.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a side panel',
            lines: '130–144'
          }
        },
        {
          id: 'side-panel-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Anchor the 480px panel cleanly along the trailing edge so primary page landmarks and reference tables stay unobstructed.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Side panel)',
            lines: '145–150'
          }
        }
      ]
    },
    {
      id: 'narrow-tearsheet',
      heading: 'Narrow tearsheet',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-narrow-tearsheet'],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Narrow tearsheet',
        lines: '151–183'
      },
      children: [
        {
          id: 'narrow-tearsheet-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Choose a narrow tearsheet instead of a modal whenever the form needs vertical scrolling.',
                'Use it when related inputs organize cleanly beneath labeled section headers.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Narrow tearsheet)',
            lines: '153–158'
          }
        },
        {
          id: 'narrow-tearsheet-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use a narrow tearsheet for high-complexity workflows that require a multi-step progress indicator.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Narrow tearsheet)',
            lines: '159–163'
          }
        },
        {
          id: 'narrow-tearsheet-anatomy',
          heading: 'Anatomy of a tearsheet',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Narrow sheet container paired with a full backdrop overlay obscuring underlying page content.',
                'Create title and optional subtitle.',
                'Scrollable body organized around form fields and section headings.',
                'Primary Create button and secondary Cancel button.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a tearsheet',
            lines: '164–177'
          }
        },
        {
          id: 'narrow-tearsheet-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Center or dock the narrow sheet rhythmically inside the viewport grid with consistent header, body, and sticky footer padding.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Narrow tearsheet)',
            lines: '178–183'
          }
        }
      ]
    },
    {
      id: 'wide-tearsheet',
      heading: 'Wide tearsheet',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-wide-tearsheet'],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Wide tearsheet',
        lines: '184–287'
      },
      children: [
        {
          id: 'wide-tearsheet-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Use a wide tearsheet for creation flows spanning two or more distinct steps.',
                'For single-step tasks requiring broad space—such as interactive selectors, diagrams, or tables—use a wide tearsheet with the progress rail omitted.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Wide tearsheet)',
            lines: '186–191'
          }
        },
        {
          id: 'wide-tearsheet-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use a wide tearsheet for simple single-step creations with few fields.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Wide tearsheet)',
            lines: '192–196'
          }
        },
        {
          id: 'wide-tearsheet-anatomy',
          heading: 'Anatomy of a wide tearsheet',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Wide sheet container with screen overlay obscuring underlying content.',
                'Create title with optional subtitle.',
                'Left vertical progress indicator (256px default rail width, expanding to 320px for long step labels).',
                'Optional "Show all available options" toggle allowing users to inspect every step on one scrollable view with anchor links.',
                'Body area containing step controls, tables, or guidance.',
                'Sticky footer housing primary Next (changing to Create on the final step), secondary Back (disabled on step 1), and ghost Cancel.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a wide tearsheet',
            lines: '197–217'
          }
        },
        {
          id: 'wide-tearsheet-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Align form columns inside the wide canvas next to the 256px or 320px left progress rail, pairing fluid bottom footer buttons (noting upcoming 80px button height conventions replacing 64px) cleanly across the full footer span.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Wide tearsheet)',
            lines: '218–238'
          }
        },
        {
          id: 'wide-tearsheet-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Switching on "Show all available options" converts the vertical progress rail into in-page navigation anchor links across one continuous scrolling canvas above a sticky, top-bordered footer without a fade gradient. You may default this view on when it benefits power users; whenever toggling it back off risks hiding or discarding modified advanced values, show a warning confirmation modal first.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Behaviors (Wide tearsheet)',
            lines: '239–287'
          }
        }
      ]
    },
    {
      id: 'full-page',
      heading: 'Full page',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          text: 'Rare edge case: never confuse Full page with—or use it as a substitute for—the Wide tearsheet.'
        }
      ],
      demoRefs: ['create-flows-full-page'],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Full page', lines: '288–371' },
      children: [
        {
          id: 'full-page-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Reserve full-page creation solely for mandatory prerequisite setup that must be completed before the operator can use the product or service at all (such as initial non-billable service provisioning before workspace access exists).'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Full page)',
            lines: '296–302'
          }
        },
        {
          id: 'full-page-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use a full-page flow when the product or service is already usable before creation begins, or when creating the resource fits cleanly in a side panel, tearsheet, or catalog provisioning view.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Full page)',
            lines: '303–310'
          }
        },
        {
          id: 'full-page-anatomy',
          heading: 'Anatomy of a full page',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Optional location-based breadcrumbs when hierarchy context helps.',
                'Page title (not required to match the Create title verbatim).',
                'Create title (typically "Create <asset>").',
                'Vertical progress rail (256px default, 320px for long step labels).',
                'Main form body.',
                'Optional "Show all available options" toggle.',
                'Fluid sticky footer buttons (64px height, transitioning toward 80px): Next (becoming Create on the final step), Back (disabled on step 1), and ghost Cancel returning to the prior view.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a full page',
            lines: '311–332'
          }
        },
        {
          id: 'full-page-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Align page headers, progress rail, form column, and fluid footer bar cleanly to the full-page grid, allowing for upcoming 80px fluid footer buttons.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Full page)',
            lines: '333–350'
          }
        },
        {
          id: 'full-page-optional-toggle',
          heading: 'Optional toggle',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Like wide tearsheets, full-page flows may offer the "Show all available options" toggle to replace step-by-step progress with scrollable anchor links.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Optional toggle',
            lines: '351–357'
          }
        },
        {
          id: 'full-page-leaving',
          heading: 'Leaving the Create flow',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Whenever an operator attempts to leave a full-page creation flow through any route other than explicitly clicking Cancel—such as breadcrumbs or workspace navigation links—display a confirmation modal warning that entered work will be lost.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Leaving the Create flow',
            lines: '358–371'
          }
        }
      ]
    },
    {
      id: 'designing-with-creation-flows',
      heading: 'Designing with creation flows',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Designing with creation flows',
        lines: '372–373'
      },
      children: [
        {
          id: 'designing-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Behaviors',
            lines: '374–375'
          },
          children: [
            {
              id: 'designing-triggers',
              heading: 'Triggers',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Launch creation from a "New <asset type>" button paired with a plus icon (for example, "New mission"). Apply primary emphasis only when no other primary action already exists in that section; otherwise step down to tertiary or ghost emphasis (exact preference between tertiary and ghost remains open in the reference). In multi-step flows, disable Back on step 1, rename Next to Create on the final step, and keep Next and Create disabled until every required field is populated.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/create-flows/index.md',
                heading: '#### Triggers',
                lines: '376–391'
              }
            },
            {
              id: 'designing-dismissing',
              heading: 'Dismissing flows',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Omit the top-right close (×) icon on create Modals, Side panels, Narrow tearsheets, and Wide tearsheets so operators make an explicit decision to exit via Cancel.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/create-flows/index.md',
                heading: '#### Dismissing flows',
                lines: '392–397'
              }
            },
            {
              id: 'designing-completion-loading',
              heading: 'Flow completion & loading',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'After the user submits Create, show immediate loading or submitting feedback aligned with loading and modal loading standards. Once finished, either open the new resource or its detail page, or remain on the originating view with a clear success banner notification; whenever creation fails, always surface an error notification.'
                }
              ],
              demoRefs: ['create-flows-completion-loading'],
              _sourceCitation: {
                path: 'community/patterns/create-flows/index.md',
                heading: '#### Flow completion & loading',
                lines: '398–410'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'related-use-cases',
      heading: 'Related use cases',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Related use cases',
        lines: '411–424'
      },
      children: [
        {
          id: 'related-add',
          heading: 'Add',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Attaching an existing resource shares similar ergonomics, yet Add workflows are distinct and must follow their own action guidance rather than Create.'
            }
          ],
          _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '### Add', lines: '413–418' }
        },
        {
          id: 'related-edit',
          heading: 'Edit',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Modifying saved resources overlaps in surface parity, yet Edit workflows carry separate impact and confirmation rules handled under the Edit pattern.'
            }
          ],
          _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '### Edit', lines: '419–424' }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Inherit accessibility contracts from the underlying Modal, Side panel, Tearsheet, Form, and Progress indicator components—preserving focus trapping on overlay surfaces, non-focus accessibility on side panels, keyboard activation on Cancel and disabled Next/Create states, and clear status announcements on submission.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Accessibility',
        lines: '425–433'
      }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Loading', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Common actions (Add)', kind: 'pattern' },
            { label: 'Edit', kind: 'pattern' },
            { label: 'Switch (All-options toggle)', kind: 'component' },
            { label: 'Progress', kind: 'component' }
          ]
        }
      ],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Related', lines: '434–442' }
    }
  ],
  demos: [
    {
      id: 'create-flows-inline',
      title: 'Create a quick mission inline',
      sectionId: 'inline-creation',
      secondarySectionIds: ['overview', 'designing-triggers'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Create a new one-field mission while keeping the collection visible; use this compact route when no extra context is needed.',
      teaching: {
        meaning:
          'Inline creation adds a quick new item right inside the workspace while keeping surrounding collection records visible.',
        decision:
          'Choose inline only for simple non-transitional creation (noting inline guidance remains under construction); move to a Modal if creation opens a new destination page.',
        consider:
          'Keep required fields disabled-gated on Create and clarify exit behavior; remember Create builds a new item rather than adding an existing one.'
      },
      interactive: true,
      _demoNote:
        'The inline variant now has one required field and disables Create while it is empty; Clear empties the field rather than cancelling the whole flow.'
    },
    {
      id: 'create-flows-modal',
      title: 'Create a mission in a focused dialog',
      sectionId: 'modal',
      secondarySectionIds: ['modal-anatomy', 'designing-dismissing'],
      mappingStatus: 'partial-divergent',
      scenario: 'Use a modal for a short task that needs focused attention but not a full page.',
      teaching: {
        meaning: 'A focused modal blocks the page to collect 1–2 inputs or bridge a short transitional create flow.',
        decision:
          'Use a modal for 1–2 fields or post-create page navigation—never in place of inline creation, and never if fields exceed four or cause scrolling.',
        consider:
          'Omit the top-right close icon so users exit via Cancel, and keep Create disabled until required fields are filled.'
      },
      interactive: true,
      _demoNote:
        'Create stays disabled until the required mission name is present; the sample still uses the library Dialog header and does not create a persisted record.'
    },
    {
      id: 'create-flows-side-panel',
      title: 'Create a complex mission in a side panel',
      sectionId: 'side-panel',
      secondarySectionIds: ['side-panel-anatomy', 'designing-dismissing'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Keep the mission collection visible and usable beside a longer creation form in a non-blocking side panel.',
      teaching: {
        meaning:
          'A 480px non-modal side panel lets operators configure a medium-complexity resource while referencing and interacting with the underlying page.',
        decision:
          'Use a side panel when live page context helps and no step-by-step progress rail is required; step up to a Wide tearsheet for multi-step workflows.',
        consider:
          'Omit any backdrop overlay that blocks non-focus reference on the page, omit a top-right close icon, and gate Create until required inputs are complete.'
      },
      interactive: true,
      _demoNote:
        'The in-card side-panel preview keeps the mission list usable while the create form is open; it does not model a production drawer component or save a mission.'
    },
    {
      id: 'create-flows-full-page',
      title: 'Give a multi-step creation task a full-page canvas',
      sectionId: 'full-page',
      secondarySectionIds: ['full-page-anatomy', 'full-page-leaving', 'designing-triggers'],
      mappingStatus: 'mapped',
      scenario:
        'Set up the initial flight-operations workspace that dispatchers must complete before mission planning is available; the preview uses a dedicated two-step canvas.',
      teaching: {
        meaning:
          'Full-page creation is a rare surface reserved for setup the operator must complete before a product or service becomes usable.',
        decision:
          'Do NOT use Full page merely because a creation flow is long or multi-step—use a Wide tearsheet instead unless prerequisite blocking requires a dedicated page. On multi-step flows, disable Back on step 1 and gate Next/Create.',
        consider:
          'Confirm before discarding when users leave through workspace navigation as well as Cancel. This preview demonstrates the Cancel path; navigation is not routed.'
      },
      interactive: true
    },
    {
      id: 'create-flows-narrow-tearsheet',
      title: 'Use a narrow tearsheet for a compact create task',
      sectionId: 'narrow-tearsheet',
      secondarySectionIds: ['narrow-tearsheet-when-to-use', 'designing-dismissing'],
      mappingStatus: 'mapped',
      scenario:
        'When a create form needs vertical scrolling, use a narrow tearsheet to group related fields while keeping its actions visible.',
      teaching: {
        meaning:
          'A narrow tearsheet provides an overlay-backed form when a create task is too tall for a modal or its fields need section headers.',
        decision:
          'Choose it for a single-step form that needs vertical scrolling or clear field sections; choose a Wide tearsheet when progress across multiple steps must stay visible.',
        consider:
          'Keep Cancel and Create visible while the body scrolls. This static layout preview is not an interactive `skytrack-ui` Tearsheet.'
      },
      interactive: false,
      _demoNote:
        'Static layout reference uses a scrollable, sectioned form with fixed actions; Tearsheet is not shipped in `skytrack-ui`.'
    },
    {
      id: 'create-flows-wide-tearsheet',
      title: 'Use a wide tearsheet when the task needs more room',
      sectionId: 'wide-tearsheet',
      secondarySectionIds: ['wide-tearsheet-anatomy', 'wide-tearsheet-behaviors', 'designing-dismissing'],
      mappingStatus: 'mapped',
      scenario:
        'Show a multi-step mission setup that needs a progress rail and roomy review area; the overlay blocks the page until operators finish or exit the flow.',
      teaching: {
        meaning:
          'A wide tearsheet hosts 2+ distinct steps (with a 256px/320px vertical progress rail) or one spacious interactive canvas (progress rail omitted).',
        decision:
          'Choose a Wide tearsheet—not a Full page—for complex multi-step creations or spacious selectors/tables/diagrams; include an optional "Show all available options" anchor toggle when helpful.',
        consider:
          'Keep Back disabled on step 1, warn before discarding edits if toggling off all-options hides data, and keep the sticky footer bordered without a fade gradient.'
      },
      interactive: false,
      _demoNote:
        'Static two-step illustration includes progress rail, review guidance, and a fixed footer; Tearsheet is not a shipped `skytrack-ui` component, so no fields or actions are interactive.'
    },
    {
      id: 'create-flows-completion-loading',
      title: 'Show completion and a brief loading state',
      sectionId: 'designing-completion-loading',
      secondarySectionIds: ['designing-triggers'],
      mappingStatus: 'partial-divergent',
      scenario:
        'After the user submits a create flow, communicate that local preparation is in progress and then show completion.',
      teaching: {
        meaning:
          'Submitting Create requires active loading feedback followed by an unambiguous success or failure outcome.',
        decision:
          'Keep Next and Create disabled until required fields pass; after submission, show loading, then open the created resource or remain on page with a success banner—and always show an error notification on failure.',
        consider: 'Never report success while preparation is still running.'
      },
      interactive: true,
      _demoNote:
        'Submit starts the local preparation preview and Continue completes it; persistence and failure recovery are not simulated.'
    }
  ],
  _implementationNotes: [
    'CreateFlowsDemo uses Dialog, Drawer, AlertDialog, Field, Input, Button, Progress, and Alert (`demos.tsx:2818-3101`).',
    'Tearsheet components are not shipped in `skytrack-ui`; narrow and wide tearsheet examples render responsive static layout illustrations.'
  ]
}

export const PAGE_COMMUNITY_EDIT: PatternPageDraft = {
  id: 'community-edit',
  title: 'Edit',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Maintained Edit guidance covers Modal, Side-panel, and Full-page surfaces only; inline editing (`InlineEdit`) is a SkyTrack-local addition with no source section.',
      'For locked fields, the community source mentions disabled field appearance, whereas SkyTrack intentionally uses `readOnly` to align with Core Read-only accessibility rules so operators can still focus and inspect locked values.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/edit-pattern/index.md',
    _excludedSections: ['#### Maintainers: (lines 5–8)', '### Quick Navigation (lines 18–22)'],
    _upstreamAnomalies: [
      'edit-pattern/index.md begins directly with an opening surface-parity blockquote (lines 11–15) before ## Low-impact edit; its rule is captured in summary and reinforced inside the surface subsections without inventing an Overview heading.',
      '### Non-editable fields (line 161) recommends a disabled field for a few locked inputs, conflicting with SkyTrack Core Read-only rules; SkyTrack retains readOnly intentionally.'
    ]
  },
  summary:
    'Editing updates an existing resource and should match the surface used when that resource was created—varying only when editable fields are far fewer or more numerous than at creation, or when surrounding settings context is needed.',
  sections: [
    {
      id: 'low-impact-edit',
      heading: 'Low-impact edit',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When changes carry no wider operational or destructive impact, let operators edit directly without adding warning friction.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/edit-pattern/index.md',
        heading: '## Low-impact edit',
        lines: '31–41'
      },
      children: [
        {
          id: 'low-impact-modal',
          heading: 'Modal',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a modal when the resource was created in a modal or when only a small subset of fields can be edited. If enough editable fields appear to require vertical scrolling, switch to a side panel or full-page edit view instead.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Modal (Low-impact edit)',
            lines: '43–55'
          }
        },
        {
          id: 'low-impact-side-panel',
          heading: 'Side-panel',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a side panel when the resource was created in a side panel or when seeing main-view records helps the operator make accurate edits.'
            }
          ],
          demoRefs: ['edit-side-panel'],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Side-panel (Low-impact edit)',
            lines: '57–68'
          }
        },
        {
          id: 'low-impact-full-page',
          heading: 'Full page',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When a resource was created in a full-page flow and most fields remain editable, present a dedicated full-page properties or configuration view supporting clear reading and editing modes.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Full page (Low-impact edit)',
            lines: '70–81'
          }
        }
      ]
    },
    {
      id: 'high-impact-edit',
      heading: 'High-impact edit',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Whenever an edit carries broader system consequences, warn operators explicitly about likely downstream effects, state clearly that the change cannot be undone, and enforce a dedicated warning/confirmation stage before saving.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/edit-pattern/index.md',
        heading: '## High-impact edit',
        lines: '83–89'
      },
      children: [
        {
          id: 'high-impact-modal',
          heading: 'Modal',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'For a few high-impact fields, use a danger modal followed by a second confirmation modal before saving changes, optionally displaying a summary of what changed.'
            }
          ],
          demoRefs: ['edit-high-impact-modal'],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Modal (High-impact edit) (+ HighModal.png)',
            lines: '90–102'
          }
        },
        {
          id: 'high-impact-side-panel',
          heading: 'Side-panel',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When a resource was created in a side panel or holds too many editable fields for a modal, use a slide-over panel that advances to a dedicated warning screen inside the panel before saving changes.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Side-panel (High-impact edit)',
            lines: '104–124'
          }
        },
        {
          id: 'high-impact-full-page',
          heading: 'Full page',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When a resource was created in a full-page flow or involves a high volume of editable fields, edit on a full-page canvas and trigger a confirmation modal warning of save consequences when the operator submits.'
            }
          ],
          demoRefs: ['edit-full-page'],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Full page (High-impact edit)',
            lines: '126–143'
          }
        }
      ]
    },
    {
      id: 'optional-extras',
      heading: 'Optional extras',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/edit-pattern/index.md',
        heading: '## Optional extras',
        lines: '145–146'
      },
      children: [
        {
          id: 'summary-of-changes',
          heading: 'Summary of changes',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Include an old-to-new summary of modified values inside the high-impact warning stage so operators can verify every pending change before confirming.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Summary of changes',
            lines: '147–157'
          }
        },
        {
          id: 'non-editable-fields',
          heading: 'Non-editable fields',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When only a few fields are locked, keep their values visible inline alongside editable controls. When most fields cannot be edited, provide an editable-only view filter or let operators edit individual settings in focused modals.'
            },
            {
              type: 'callout',
              kind: 'note',
              text: 'SkyTrack accessibility rule: although the community source refers to disabled styling for a few locked fields, SkyTrack renders inspectable locked values as read-only rather than disabled so keyboard and screen-reader users can still read them.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Non-editable fields',
            lines: '159–174'
          }
        },
        {
          id: 'success-notifications',
          heading: 'Success notifications',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optionally display a brief success notification confirming that edited changes have been saved.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/edit-pattern/index.md',
            heading: '### Success notifications',
            lines: '175–185'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'edit-inline-local',
      title: 'Make a low-impact inline change',
      sectionId: 'UNMAPPED',
      mappingStatus: 'UNMAPPED',
      scenario: 'Update a short mission label directly in its record.',
      teaching: {
        meaning:
          'Local extension: inline editing lets a person revise a single short value in place when the change has no wider impact.',
        decision:
          'UNMAPPED to maintained source (maintained Edit covers Modal, Side-panel, and Full-page flows only). Reserve inline edits strictly for trivial, low-risk label updates where no warning is needed.',
        consider: 'Keep save/cancel state unmistakable and avoid warnings for low-impact changes.'
      },
      interactive: true,
      _demoNote:
        'UNMAPPED local extension (`demos.tsx:3115, 3149-3164`, `<InlineEdit>`). Maintained `edit-pattern/index.md` defines Modal, Side-panel, and Full-page edit surfaces only; shares one toggled demo slot with "Review a higher-impact edit before saving".'
    },
    {
      id: 'edit-high-impact-modal',
      title: 'Review a higher-impact edit before saving',
      sectionId: 'high-impact-modal',
      secondarySectionIds: ['summary-of-changes', 'non-editable-fields', 'success-notifications'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Review a mission-name change that affects how dispatchers identify the plan, then confirm it before saving.',
      teaching: {
        meaning:
          'A high-impact modal edit pairs an initial danger edit dialog with a second confirmation modal before saving.',
        decision:
          'Explain downstream system consequences, state clearly that the change cannot be undone, and optionally include an old-to-new summary in the confirmation modal.',
        consider:
          'Keep non-editable values readable (`readOnly` in SkyTrack rather than disabled) and pair completion with clear save feedback.'
      },
      interactive: true,
      _demoNote:
        'The confirmation now names the dispatch consequence and says the sample has no undo. Completion uses a local inline success alert instead of a toast; the example does not modify a live mission.'
    },
    {
      id: 'edit-side-panel',
      title: 'Keep a broader edit in a side panel',
      sectionId: 'low-impact-side-panel',
      secondarySectionIds: ['high-impact-side-panel', 'non-editable-fields'],
      mappingStatus: 'mapped',
      scenario:
        'When an update needs related context, edit it in a side surface while retaining the mission list behind it.',
      teaching: {
        meaning:
          'A side panel supports editing when the resource started in a side panel, exceeds modal scrolling limits, or depends on surrounding page context.',
        decision:
          'Omit warnings for low-impact side-panel edits; for high-impact edits, advance to a separate warning screen inside the side panel before saving.',
        consider:
          'Keep locked values legible alongside editable inputs, or provide an editable-only filter when most fields are locked.'
      },
      interactive: true
    },
    {
      id: 'edit-full-page',
      title: 'Use a full-page canvas for a complex revision',
      sectionId: 'high-impact-full-page',
      secondarySectionIds: ['low-impact-full-page', 'summary-of-changes'],
      mappingStatus: 'mapped',
      scenario:
        'Review a consequential full-page mission edit and confirm its summary before saving the local preview.',
      teaching: {
        meaning:
          'Full-page editing fits resources created in a full-page flow or revisions with large numbers of editable fields.',
        decision:
          'For low-impact full-page edits, use a read/edit properties view without warnings; for high-impact full-page edits, open a consequence confirmation modal when saving.',
        consider: 'Include a change summary in high-impact confirmation modals and clarify irreversibility.'
      },
      interactive: true
    }
  ],
  _implementationNotes: [
    'EditDemo uses InlineEdit, Dialog, AlertDialog, Drawer, Field, Input, Button, and Alert (`demos.tsx:3103-3342`).',
    'UNMAPPED disclosure: keep the live InlineEdit example intact while explicitly tagging it as a SkyTrack-local low-impact extension.'
  ]
}

export const PAGE_COMMUNITY_EXPORT: PatternPageDraft = {
  id: 'community-export',
  title: 'Export',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Export and Download share most rules in the community reference, with explicit exceptions for hidden extensions on Download and native browser save-location handoff.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/export-pattern/index.md',
    _excludedSections: ['#### Maintainers: (lines 7–10)', '### Quick Navigation (lines 34–40)']
  },
  summary:
    'Export saves a resource externally with an option to change its file format, whereas Download transfers a remote resource to the user’s device unchanged; most interaction, naming, status, and focus rules apply to both.',
  sections: [
    {
      id: 'intuitive-default-name',
      heading: 'Intuitive default name',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When a resource already carries an intuitive default file name and the user does not need to select an export format or save destination, start the export or download immediately upon clicking the button with no intermediate dialog.'
        }
      ],
      demoRefs: ['export-intuitive-download'],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Intuitive default name',
        lines: '42–62'
      }
    },
    {
      id: 'editable-name',
      heading: 'Editable name',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When users may rename the file before exporting or downloading, open a dialog with a textbox pre-populated with the default name. Hide the file extension when downloading unchanged files; when exporting, validate that the edited name retains a valid extension and show an active "Exporting..." loading indicator while the file prepares.'
        }
      ],
      demoRefs: ['export-customize'],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Editable name (+ newimage1.png, 3.png)',
        lines: '63–85'
      }
    },
    {
      id: 'optional-extras',
      heading: 'Optional extras',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Optional extras',
        lines: '86–87'
      },
      children: [
        {
          id: 'specify-location',
          heading: 'Specify the export or download location',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When users can specify where a downloaded file goes, activating the primary Download control invokes the browser’s native save-location dialog; the transfer begins once they choose a folder and confirm Save.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Specify the export or download location',
            lines: '88–97'
          }
        },
        {
          id: 'choosing-export-format',
          heading: 'Choosing export format',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When two to five export formats are available, present them as a radio-button group with a sensible default pre-selected and concise guidance explaining when each format fits best.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Choosing export format',
            lines: '98–107'
          }
        },
        {
          id: 'passive-success-modal',
          heading: 'Passive success modal',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optionally present a passive success modal once an export finishes cleanly.'
            }
          ],
          demoRefs: ['export-confirm-completion'],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Passive success modal',
            lines: '108–115'
          }
        },
        {
          id: 'errors-and-failures',
          heading: 'Errors and failures',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'If an export or server operation fails, report the error clearly inside the modal rather than silently closing or implying success.'
            }
          ],
          demoRefs: ['export-progress-and-error'],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Errors and failures (+ newimage4.png)',
            lines: '116–123'
          }
        },
        {
          id: 'success-notification',
          heading: 'Success notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optionally trigger a brief toast notification to confirm that the export completed.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Success notification',
            lines: '124–131'
          }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Follow standard modal keyboard and focus-management guarantees across triggers, configuration forms, and passive status dialogs:'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Accessibility',
        lines: '132–136'
      },
      children: [
        {
          id: 'accessibility-trigger',
          heading: 'Trigger',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Navigate to the Export button with Tab (or move across overflow menu items using Up and Down arrows).',
                'Ensure the button or menu item receives visible focus.',
                'Press Enter to open the Export modal.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Trigger',
            lines: '137–146'
          }
        },
        {
          id: 'accessibility-focus',
          heading: 'Focus',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Initial modal focus and subsequent Tab order depend on whether the user must supply input before running:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Focus',
            lines: '147–151'
          },
          children: [
            {
              id: 'focus-required-inputs',
              heading: 'If the user must complete fields first',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Open focus lands on the first input field accepting user entry.',
                    'Tab advances through any additional input controls.',
                    'Tab moves to Export.',
                    'Tab moves to Cancel.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/export-pattern/index.md',
                heading: '#### If the user must complete fields before the export can be executed:',
                lines: '152–159'
              }
            },
            {
              id: 'focus-sensible-defaults',
              heading: 'If a sensible default value is provided',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Open focus lands directly on the Export button.',
                    'Tab moves to Cancel.',
                    'Tab enters the first editable input (following standard radio or text-input keyboard controls).',
                    'Tab continues through any remaining inputs.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/export-pattern/index.md',
                heading: '#### If a sensible default value is provided:',
                lines: '160–170'
              }
            }
          ]
        },
        {
          id: 'accessibility-success-failure',
          heading: 'Success & Failure modals',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When opening a passive modal to announce export completion or failure, apply initial keyboard focus directly to the modal’s close (×) button.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Success & Failure modals',
            lines: '171–174'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'export-intuitive-download',
      title: 'Download a standard report with its intuitive name',
      sectionId: 'intuitive-default-name',
      mappingStatus: 'mapped',
      scenario:
        'When the user needs the default report and no format or destination choice, offer a direct download action without an extra form.',
      teaching: {
        meaning: 'Direct download transfers an unchanged resource immediately when a sensible name already exists.',
        decision:
          'Skip dialogs whenever no filename edits, format switches, or destination inputs are needed; keep Download distinct from format-converting Export.',
        consider: 'Never claim a file was saved or downloaded until the transfer actually occurs.'
      },
      interactive: true
    },
    {
      id: 'export-customize',
      title: 'Customize a report before export',
      sectionId: 'editable-name',
      secondarySectionIds: ['choosing-export-format', 'specify-location', 'accessibility-focus'],
      mappingStatus: 'partial-divergent',
      scenario:
        'When users need to rename a report or choose its format, collect those choices in a dialog before preparing the export.',
      teaching: {
        meaning:
          'An export dialog collects the file name and format when the user must make those choices before preparation.',
        decision:
          'Keep the selected format and file extension consistent, provide concise guidance for each radio option, and let the browser handle the save location when a workflow downloads a file.',
        consider:
          'With a sensible default selected, place initial focus on Export, then let Tab move to Cancel and the editable fields. The preview does not open a native save dialog or create a file.'
      },
      interactive: true,
      _demoNote:
        'The local preview now uses a Dialog, a guided RadioGroup, extension validation, and a modal failure state. It explains the browser Save dialog for real downloads but does not invoke the system dialog or create a file.'
    },
    {
      id: 'export-progress-and-error',
      title: 'Track preparation and recover from an export failure',
      sectionId: 'errors-and-failures',
      secondarySectionIds: ['editable-name'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Show progress only while preparation runs, then communicate completion or a recoverable destination error.',
      teaching: {
        meaning:
          'Operators need live preparation feedback while generating a file and explicit error reporting if preparation fails.',
        decision:
          'Show an active loading state while running and surface export failures inside the modal (offering recovery or retry where feasible).',
        consider:
          'Use indeterminate spinners unless real measurable step progress exists, and never present failed exports as ready.'
      },
      interactive: true,
      _demoNote:
        'Live demo uses an indeterminate Progress only while preparation is active. The simulated failure appears in a Dialog with initial focus on its close control; retry restarts the local preparation preview.'
    },
    {
      id: 'export-confirm-completion',
      title: 'Confirm export completion without implying a download',
      sectionId: 'passive-success-modal',
      secondarySectionIds: ['success-notification', 'accessibility-success-failure'],
      mappingStatus: 'partial-divergent',
      scenario:
        'After a successful export, show a passive completion message and a separate brief notification; make the local-only result explicit.',
      teaching: {
        meaning:
          'Passive completion modals and optional notifications confirm that preparation finished without overstating a file save.',
        decision:
          'Pair completion with a passive success modal (opening focus onto its close icon) and/or a brief toast notification once the output is genuinely ready.',
        consider: 'Distinguish prepared output from local disk download when running sample previews.'
      },
      interactive: true,
      _demoNote:
        'The preview opens a passive success Dialog with initial focus on its close control; a separate action previews the optional Toast. Neither action creates or saves a file.'
    }
  ],
  _implementationNotes: [
    'ExportDemoWithProvider uses Dialog, Fieldset, Field, Input, RadioGroup, RadioRoot, Button, Progress, Alert, and Toast (`demos.tsx:4566-4860`).',
    'Use the package RadioGroup for 2–5 mutually exclusive format choices and include a short use-case description for each option.'
  ]
}

export const PAGE_COMMUNITY_API_KEY: PatternPageDraft = {
  id: 'community-api-key',
  title: 'Generate an API key',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Key rotation, revocation menus, and lost-key recovery procedures are SkyTrack security additions not specified in the maintained community reference.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/generate-an-api-key/index.md',
    _excludedSections: [
      '#### Maintainers: (lines 8–11)',
      '[!NOTE] Vendor-internal React storybook link (lines 18–21)',
      '### Quick Navigation (lines 23–30)'
    ],
    _upstreamAnomalies: [
      'Retrieval subsection #### API key can be retrieved via another platform names specific vendor cloud platforms as examples; generalized here to "another platform" for vendor neutrality.'
    ]
  },
  summary:
    'API key generation flows ensure operators understand what a credential grants access to, its security implications, where it will be used, and whether it can be retrieved later.',
  sections: [
    {
      id: 'general-access-keys',
      heading: 'General access keys',
      level: 2,
      blocks: [],
      demoRefs: ['api-key-create-and-manage'],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## General access keys',
        lines: '38–39'
      },
      children: [
        {
          id: 'instant-generation',
          heading: 'Instant generation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Trigger creation from a primary Generate button, displaying a "Generating..." loading state if issuance takes noticeable time, and reveal the generated key inside a modal containing a Copy button.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Instant generation',
            lines: '40–53'
          },
          children: [
            {
              id: 'instant-generation-optional',
              heading: 'Optional display affordances',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Split the credential into two parts when the system requires dual key components.',
                    'Display an encoded version of the key when integrations expect it.',
                    'Provide concise explanatory text describing how the key should be used.',
                    'Let users toggle key visibility between masked and revealed states.',
                    'Provide a secondary download link alongside Copy.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### Optionally:',
                lines: '55–74'
              }
            }
          ]
        },
        {
          id: 'name-the-api-key',
          heading: 'Name the API key',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Ask users for a descriptive name before clicking Generate whenever they manage keys for multiple integrations in one workspace. Whenever pre-generation fields (such as key name or access options) are collected first, present the newly created credential in a separate post-generate modal view.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Name the API key',
            lines: '76–89'
          }
        },
        {
          id: 'retrieval-warnings',
          heading: 'Retrieval warnings',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Clearly communicate whether a key remains accessible after closing the generation modal; any of the three retrieval policies may be paired with a `.txt` or `JSON` download link:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Retrieval warnings',
            lines: '90–95'
          },
          children: [
            {
              id: 'retrieval-in-product',
              heading: 'API key can be retrieved in the product',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Inform the user that the key stays retrievable later inside the product (such as on an API key management page) and consider linking directly to that view.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### API key can be retrieved in the product',
                lines: '96–107'
              }
            },
            {
              id: 'retrieval-other-platform',
              heading: 'API key can be retrieved via another platform',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Tell the user that retrieval happens inside a separate external platform or console and link to clear instructions for locating it there.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### API key can be retrieved via another platform',
                lines: '109–121'
              }
            },
            {
              id: 'retrieval-non-recoverable',
              heading: 'API key cannot be retrieved at a later date',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'warning',
                  text: 'When a secret cannot be retrieved after leaving the creation modal, warn the user prominently inside the modal and offer an immediate JSON download option.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### API key cannot be retrieved at a later date',
                lines: '123–133'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'restricted-access-keys',
      heading: 'Restricted access keys',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Let users scope permissions before creating a key when integrations do not require full workspace privileges. Present restriction options inside the modal prior to generation—splitting complex setup across a multi-step modal with a progress indicator rather than letting the dialog scroll. Whenever naming is offered, place the key name field first.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## Restricted access keys',
        lines: '135–158'
      },
      children: [
        {
          id: 'ordering-restricted-options',
          heading: 'Ordering restricted access options',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Present optional restriction controls in this logical order (omitting steps that do not apply):'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Key or connected application name (optional) so operators can recognize its destination later.',
                'Permitted actions (optional), such as Read and write, Write only, or Read only.',
                'Target accessible resources (optional), specified by naming or picking specific items.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Ordering restricted access options',
            lines: '160–172'
          }
        }
      ]
    },
    {
      id: 'show-in-context',
      heading: 'Show the API key in context (optional)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When helpful, keep the newly created key summary visible in the page near the Generate trigger after the modal closes, paired with an option to generate another key.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## Show the API key in context (optional)',
        lines: '173–186'
      }
    },
    {
      id: 'management-page',
      heading: 'API key management page (optional)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Provide a central API key management view inside a predictable access administration area—such as Settings or Access—listing credentials in a data table by recognizable key or application name so operators can create, inspect, or edit keys.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## API key management page (optional)',
        lines: '188–206'
      }
    },
    {
      id: 'edit-api-key',
      heading: 'Edit an API key (optional)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When supported from either the creation context or the management table, allow editing metadata and restrictions—such as connected application name, key name, and scoped permissions—ending with a Save action. Editing an existing key must never alter the underlying secret contents.'
        }
      ],
      demoRefs: ['api-key-edit-existing'],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## Edit an API key (optional) (+ Edit.png)',
        lines: '208–224'
      }
    }
  ],
  demos: [
    {
      id: 'api-key-create-and-manage',
      title: 'Create and manage an API key safely',
      sectionId: 'general-access-keys',
      secondarySectionIds: [
        'instant-generation',
        'name-the-api-key',
        'retrieval-warnings',
        'restricted-access-keys',
        'ordering-restricted-options',
        'show-in-context'
      ],
      mappingStatus: 'partial-divergent',
      scenario:
        'Set a key name and access level, choose where a real key would be retrieved, then review a separate sample result before closing it.',
      teaching: {
        meaning:
          'People need to understand what an API key can access and whether its value can be retrieved again before they create one.',
        decision:
          'Ask for a recognizable name, explain the access level, and state the retrieval policy before generation. Show a separate result view; if the key is one-time, warn people to save it and offer a secure download. This preview uses a fixed placeholder and skips real generation, waiting, copying, and file download.',
        consider:
          'Keep access limited to what the integration needs. Provide recovery or rotation guidance, and never expose or persist real secrets in a UI example.'
      },
      interactive: true,
      _demoNote:
        'The preview opens a configuration dialog and a separate result dialog. It shows only a fixed sample value: no credential is created, no clipboard is accessed, and no file is downloaded. Retrieval choices explain product decisions but do not implement a retrieval service.'
    },
    {
      id: 'api-key-edit-existing',
      title: 'Manage or edit an existing key without changing its secret',
      sectionId: 'edit-api-key',
      secondarySectionIds: ['management-page'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A workspace administrator reviews named keys, opens management actions, and edits access without changing an existing key value.',
      teaching: {
        meaning:
          'Key metadata and permissions can be updated independently from rotating or replacing the secret value itself.',
        decision:
          'List keys by recognizable key or application name in a management data table under Settings or Access, and allow editing name, application label, and restrictions via Save without modifying the secret.',
        consider:
          'Keep secret replacement (such as rotation or revocation—SkyTrack local security extensions) separate from metadata editing.'
      },
      interactive: true,
      _demoNote:
        'Live demo shows one recognizable key row rather than a full Settings/Access data table. Rotation and revocation are explicitly labeled as local previews and do not change credentials.'
    }
  ],
  _implementationNotes: [
    'ApiKeyDemo uses Dialog, Field, Fieldset, Input, RadioGroup, RadioRoot, Button, Alert, and Menu; the key value is a fixed non-secret placeholder, and copy/download controls report preview-only outcomes.'
  ]
}

export const PAGE_COMMUNITY_IMPORT: PatternPageDraft = {
  id: 'community-import',
  title: 'Import',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Duplicate-file handling, conflict resolution, and byte-size limits are unspecified in the maintained community reference and must be defined at the product level.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/import-pattern/index.md',
    _excludedSections: [
      '#### Maintainers: (lines 8–11)',
      '### Quick Navigation (lines 24–29)',
      '## Feedback (lines 251–253)'
    ]
  },
  summary:
    'Import transfers files or supported remote data into the system—reserving modals strictly for a single file with no extra actions, moving multi-file or metadata tasks to side panels or full pages, and specifying distinct keyboard focus loops for each.',
  sections: [
    {
      id: 'choose-file-modal',
      heading: 'Choose a file (modal)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use an import modal only when uploading a single file that needs no follow-up actions. Offer both drag-and-drop and local file browsing, plus optional external-resource URL entry when supported. Whenever multiple files can be added or extra tasks such as entering metadata are required, do not use a modal—move to a side panel or full page instead.'
        }
      ],
      demoRefs: ['import-single-file-modal'],
      _sourceCitation: {
        path: 'community/patterns/import-pattern/index.md',
        heading: '## Choose a file (modal)',
        lines: '37–68'
      },
      children: [
        {
          id: 'import-url-modal',
          heading: 'Import from a URL (modal)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When your product supports remote source imports inside a single-file modal, include a URL field alongside the file uploader.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Import from a URL (modal)',
            lines: '69–84'
          }
        }
      ]
    },
    {
      id: 'choose-file-full-or-panel',
      heading: 'Choose a file (full page or side-panel)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'In full-page and side-panel flows, provide drag-and-drop and local file browsing restricted to supported file types, displaying clear loading and loaded states as items arrive. Perform extra actions—such as adding metadata or destination details—separately from file upload and before the import completes, either in a subsequent step or in a distinct on-screen section when space allows.'
        }
      ],
      demoRefs: ['import-multiple-files-or-url', 'import-metadata-side-panel'],
      _sourceCitation: {
        path: 'community/patterns/import-pattern/index.md',
        heading: '## Choose a file (full page or side-panel)',
        lines: '86–120'
      },
      children: [
        {
          id: 'import-url-full-or-panel',
          heading: 'Import from a URL (full page or side-panel)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Provide URL import controls inside the full-page or side-panel layout whenever remote source imports are supported.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Import from a URL (full page or side-panel)',
            lines: '122–137'
          }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Keyboard navigation and focus return behavior differ significantly depending on whether an operator imports one file or multiple files:'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/import-pattern/index.md',
        heading: '## Accessibility',
        lines: '139–147'
      },
      children: [
        {
          id: 'a11y-single-file',
          heading: 'Single file uploads and imports',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Applies to any single-file upload or import interaction, typically presented inside a modal:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Single file uploads and imports',
            lines: '148–152'
          },
          children: [
            {
              id: 'a11y-single-trigger',
              heading: 'Trigger',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Move to the Import trigger via Tab (or Up/Down arrows inside an overflow menu).',
                    'Confirm visible focus on the trigger.',
                    'Press Enter to launch the import flow.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Trigger (Single file)',
                lines: '153–163'
              }
            },
            {
              id: 'a11y-single-focus',
              heading: 'Focus',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'On opening, focus lands on the drag-and-drop uploader area.',
                    'Tab moves to the URL input field if present; pressing Return in the URL field (or tabbing to Add file and pressing Return) imports the URL with optional loading feedback.',
                    'Tab moves to the primary button (Import, Save, or Next) only once enabled—keep the Import button disabled until a file is chosen.',
                    'Tab moves to Cancel.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Focus (Single file)',
                lines: '164–191'
              }
            },
            {
              id: 'a11y-single-selected',
              heading: 'Once the file is selected',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Move focus automatically to the remove icon on the chosen file; pressing Return clears the file and restores the empty state.',
                    'Tab moves to the now-enabled Import button.',
                    'Tab moves to Cancel.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Once the file is selected',
                lines: '192–198'
              }
            }
          ]
        },
        {
          id: 'a11y-multiple-files',
          heading: 'Multiple file uploads and imports',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never use a modal when multiple files may be selected.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Multiple file uploads and imports',
            lines: '199–202'
          },
          children: [
            {
              id: 'a11y-multi-focus',
              heading: 'Focus',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'First Tab into the import section lands on the file uploader.',
                    'Next Tab moves to the optional URL input field.',
                    'Return activates the chosen input method; pressing Return inside the URL input (or on Add file) fetches with optional loading state.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Focus (Multiple files)',
                lines: '203–223'
              }
            },
            {
              id: 'a11y-multi-some-selected',
              heading: 'When (some) files are selected',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Return focus to whichever selection method was just used (for example, keep focus in the URL field so another URL can be added right away).',
                    'If the file uploader was used, Tab moves next to the URL field.',
                    'Subsequent Tab presses walk through the remove icon of each selected file.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### When (some) files are selected',
                lines: '224–236'
              }
            },
            {
              id: 'a11y-multi-max-files',
              heading: 'On reaching the maximum number of added files',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Disable both the file uploader and URL selection controls once the maximum allowed file count is reached.',
                    'Place returning focus onto the uploaded files’ remove actions.',
                    'Let Tab advance through each file’s remove icon and onward to the next page section.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### On reaching the maximum number of added files',
                lines: '237–250'
              }
            }
          ]
        }
      ]
    }
  ],
  demos: [
    {
      id: 'import-multiple-files-or-url',
      title: 'Choose multiple mission files or a source URL',
      sectionId: 'choose-file-full-or-panel',
      secondarySectionIds: ['import-url-full-or-panel', 'a11y-multiple-files'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A full-page or side-panel workflow can accept several supported JSON or GeoJSON files and show validation or selection status.',
      teaching: {
        meaning:
          'Multi-file imports use a full page or side panel—never a modal—and restrict selection to supported file types.',
        decision:
          'Use side-panel or full-page flows whenever users can add multiple files or optional remote URLs; disable upload and URL inputs once the maximum file cap is reached.',
        consider:
          'Show loading and loaded states, let Tab walk each file’s remove action, and define duplicate-file conflict policy in your product because the community reference leaves it open.'
      },
      interactive: true,
      _demoNote:
        'Divergences in `demos.tsx:3844-3942`: (1) `Attachment` items lack remove buttons; (2) URL input has no `Return`/`Enter` submit shortcut; (3) no file-count cap disables selection controls; (4) no transient file loading state is shown.'
    },
    {
      id: 'import-single-file-modal',
      title: 'Import one file or URL in a focused modal',
      sectionId: 'choose-file-modal',
      secondarySectionIds: ['import-url-modal', 'a11y-single-file'],
      mappingStatus: 'partial-divergent',
      scenario:
        'For one item with no extra metadata, choose a local file or a URL; keep Import disabled until the chosen source is valid.',
      teaching: {
        meaning: 'A compact modal fits only single-file imports that require zero extra metadata or follow-up steps.',
        decision:
          'Keep the primary Import action disabled until a valid file or URL is selected; open focus onto the dropzone, support Return inside the URL input, and move focus to the file’s remove control once selected.',
        consider: 'Move immediately to a side panel or full page if requirements grow to multiple files or metadata.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:3944-4049`) properly disables "Import file" until selection, but omits a remove button on the chosen file, `Enter` submit in the URL input, and automatic initial/selected focus transitions.'
    },
    {
      id: 'import-metadata-side-panel',
      title: 'Add metadata in a side panel after file selection',
      sectionId: 'choose-file-full-or-panel',
      mappingStatus: 'mapped',
      scenario:
        'When an import needs a name or destination, keep the selection step distinct and collect the extra information in a side panel.',
      teaching: {
        meaning:
          'Additional import actions such as naming or assigning metadata stay distinct from file selection and finish before import runs.',
        decision:
          'Use a side panel or full page whenever metadata is needed, placing those inputs in a follow-up step or separate panel section before final import.',
        consider: 'Define duplicate and conflict handling at the product level before shipping.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:4051-4081`) illustrates the separate post-selection metadata Drawer cleanly; product duplicate-conflict handling remains intentionally unspecified per source.'
    }
  ],
  _implementationNotes: [
    'ImportDemo uses Field, Dropzone, Attachment, Dialog, Drawer, Input, and Button (`demos.tsx:3829-4084`); selected files remain strictly in browser memory with zero network upload or URL fetch.'
  ]
}

export const PAGE_COMMUNITY_ORDER_SUMMARY: PatternPageDraft = {
  id: 'community-order-summary',
  title: 'Order summary',
  group: 'Community',
  source: {
    status: 'Community catalog only',
    catalogEvidence:
      'The community pattern index defines Order summary strictly as "A summary of a platform’s functionality, status, or individual service."',
    limits: [
      'Catalog-only entry: the linked detail specification is not included in the local library.',
      'Missing maintained rules: required fields, visual layout, pricing or checkout workflows, status vocabularies, actions, and accessibility requirements are absent locally.',
      'The live example on this page is a SkyTrack local interpretation of a platform service summary and does not define a transaction or submit requests.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/index.md',
    _primaryLines: '44',
    _excludedSections: [
      'No dedicated pattern page exists locally; standard maintained sections (Anatomy, Behavior, Accessibility, Related) are omitted per catalog-only limits.'
    ],
    _upstreamAnomalies: [
      'This catalog-only entry is intentionally illustrated as a platform service summary. The live sample reveals capabilities and reports a local preview result without opening a workspace or changing service state.'
    ]
  },
  summary:
    'Catalog-only reference entry defined locally as a summary of a platform’s functionality, status, or individual service; no detailed layout, interaction, or checkout specification is maintained locally.',
  sections: [
    {
      id: 'source-evidence',
      heading: 'Catalog evidence',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'The maintained local community index records one brief catalog description for Order summary: a summary of a platform’s functionality, status, or individual service.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Order summary',
        lines: '44'
      }
    },
    {
      id: 'source-limits',
      heading: 'Source limits',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'source-limit',
          text: 'No dedicated detail specification exists locally. The index provides no rules for required summary fields, visual formatting, pricing, checkout, payment separation, or follow-up actions.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Order summary (IBM-only link)',
        lines: '31, 44'
      }
    },
    {
      id: 'local-interpretation',
      heading: 'Local interpretation for examples',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'local-interpretation',
          text: 'Local interpretation: to illustrate the catalog phrase without inventing transaction rules, the live sample summarizes platform capabilities, operational status, and workspace capacity. The preview action reports only a local sample outcome.'
        }
      ],
      demoRefs: ['order-summary-service-review'],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Order summary (local demo framing)',
        lines: '44'
      }
    }
  ],
  demos: [
    {
      id: 'order-summary-service-review',
      title: 'Review a platform service summary',
      sectionId: 'local-interpretation',
      mappingStatus: 'local-interpretation',
      scenario:
        'Summarize service scope and operating state so a team can decide whether it needs to inspect more detail.',
      teaching: {
        meaning:
          'Local interpretation: a concise summary presents platform capabilities, current service status, and capacity so an operator can decide whether to inspect more detail.',
        decision:
          'Local interpretation: use a scannable service summary when people need to verify operational scope and readiness before deciding whether more detail is needed.',
        consider:
          'No required fields, pricing rules, or follow-up actions exist in the local catalog source; this sample does not change service state or submit a request.'
      },
      interactive: true,
      _demoNote:
        'Live `OrderSummaryDemo` summarizes platform service status and workspace capacity. Its buttons reveal capabilities or report that details were previewed in this sample; they do not open an external workspace or submit a transaction.'
    }
  ],
  _implementationNotes: [
    'OrderSummaryDemo renders semantic `<dl>` key-value pairs with Badge and Button in local React state; preview and capability controls do not change a service or navigate away.'
  ]
}

export const PAGE_COMMUNITY_REMOVE: PatternPageDraft = {
  id: 'community-remove',
  title: 'Remove',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Ghost-style low-impact triggers that reveal red destructive emphasis only on hover or focus may require styling overrides beyond standard default button tokens.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/remove-pattern/index.md',
    _excludedSections: ['#### Maintainer: (lines 9–12)', '### Quick Navigation (lines 19–27)'],
    _upstreamAnomalies: [
      'Source starts with ### Delete / Remove variations (H3, line 29) before ## High-impact deletion (H2, line 39); normalized here to level 2 so heading hierarchy stays consistent.',
      'High-impact deletion (line 56) links to #done-modal and #requested-modal anchors that correspond to ### Optional passive modal under ## Anatomy.'
    ]
  },
  summary:
    'Removing can unlink information or destroy it. Deletion is usually permanent or difficult to reverse, while low-risk items may be recoverable or easy to recreate; match confirmation to the possible loss and available recovery.',
  sections: [
    {
      id: 'delete-remove-variations',
      heading: 'Delete and remove impact variations',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select confirmation intensity across five tiers based on whether the action destroys or merely unlinks data, whether it can be reversed, and how severe an accidental trigger would be:'
        },
        {
          type: 'table',
          columns: ['Action', 'Impact tier', 'Rule and confirmation'],
          rows: [
            [
              'Delete',
              'High impact',
              'Irreversible destruction with major operational loss. Operator must type the exact resource name in the confirmation modal.'
            ],
            [
              'Delete',
              'Medium impact',
              'Irreversible destruction with moderate loss. Modal names the resource, consequences, and irreversibility without typed confirmation.'
            ],
            [
              'Delete',
              'Low impact',
              'Reversible or minimal loss (or paired with Undo). Confirmation modal may be skipped.'
            ],
            [
              'Remove',
              'Medium impact',
              'Non-destructive move/unlink that cannot be reversed and carries moderate impact. Modal states consequences and irreversibility.'
            ],
            ['Remove', 'Low impact', 'Non-destructive and easily reversed. Confirmation modal is typically omitted.']
          ]
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/remove-pattern/index.md',
        heading: '### Delete / Remove variations',
        lines: '29–38'
      }
    },
    {
      id: 'high-impact-deletion',
      heading: 'High-impact deletion',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When irreversible deletion would cause major loss if triggered accidentally, present a confirmation modal containing four required elements:'
        },
        {
          type: 'list',
          items: [
            'The exact name of the resource being deleted.',
            'Clear consequences of deleting it.',
            'An explicit statement that the action cannot be undone.',
            'An input field where the operator must manually enter the exact resource name—keeping the Delete button disabled until the typed text matches perfectly.'
          ]
        },
        {
          type: 'prose',
          text: 'Optionally pair completion with a passive Done modal, an async Requested modal, or a notification (or one modal combined with a notification).'
        }
      ],
      demoRefs: ['remove-high-impact-delete'],
      _sourceCitation: {
        path: 'community/patterns/remove-pattern/index.md',
        heading: '## High-impact deletion',
        lines: '39–74'
      }
    },
    {
      id: 'medium-impact-deletion',
      heading: 'Medium-impact deletion',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When irreversible deletion causes moderate rather than catastrophic loss, require a confirmation modal without a typed-name barrier, displaying three elements:'
        },
        {
          type: 'list',
          items: [
            'The resource name.',
            'Specific consequences of deletion (and what remains intact).',
            'An explicit statement that the action cannot be undone.'
          ]
        },
        {
          type: 'prose',
          text: 'Optionally follow up with a passive completion modal, a notification, or both.'
        }
      ],
      demoRefs: ['remove-medium-impact-delete'],
      _sourceCitation: {
        path: 'community/patterns/remove-pattern/index.md',
        heading: '## Medium-impact deletion',
        lines: '75–95'
      }
    },
    {
      id: 'low-impact-deletion',
      heading: 'Low-impact deletion',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Confirming deletion is generally recommended, yet in low-impact situations—or whenever an immediate Undo action is provided—you may omit the confirmation modal. In dense lists or toolbars, prefer subtle ghost triggers that reveal destructive red emphasis only on hover or focus over rows crowded with solid red danger buttons.'
        }
      ],
      demoRefs: ['remove-low-impact-delete'],
      _sourceCitation: {
        path: 'community/patterns/remove-pattern/index.md',
        heading: '## Low-impact deletion (+ LowImpactDelete.png, LowImpactDelete2.png)',
        lines: '96–114'
      }
    },
    {
      id: 'medium-impact-removal',
      heading: 'Medium-impact removal',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Non-destructive removal still carries medium impact whenever unlinking or moving an item cannot be undone easily and affects access or shared state. Display a confirmation modal stating both the operational consequences of removal and that the action cannot be undone.'
        }
      ],
      demoRefs: ['remove-medium-impact-unlink'],
      _sourceCitation: {
        path: 'community/patterns/remove-pattern/index.md',
        heading: '## Medium-impact removal',
        lines: '115–131'
      }
    },
    {
      id: 'low-impact-removal',
      heading: 'Low-impact removal',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Because unlinking or moving does not destroy the underlying resource, low-impact removal typically needs no confirmation modal. Use standard or subtle ghost hover-danger triggers cleanly in context.'
        }
      ],
      demoRefs: ['remove-low-impact-unlink'],
      _sourceCitation: {
        path: 'community/patterns/remove-pattern/index.md',
        heading: '## Low-impact removal (+ LowImpactRemove.png, LowImpactRemove2.png)',
        lines: '132–149'
      }
    },
    {
      id: 'anatomy',
      heading: 'Anatomy',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'community/patterns/remove-pattern/index.md', heading: '## Anatomy', lines: '150–151' },
      children: [
        {
          id: 'optional-passive-modal',
          heading: 'Optional passive modal',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'For medium- and high-impact flows, optionally show a passive modal reflecting the outcome state: display a Requested modal when deletion or removal runs asynchronously (explaining the request was sent, users can close and keep working, and a notification will follow), or a Done modal once an immediate action completes.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/remove-pattern/index.md',
            heading: '### Optional passive modal (+ Requested.png, DoneMedium.png)',
            lines: '152–172'
          }
        },
        {
          id: 'notification',
          heading: 'Notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optionally send a completion notification after medium- or high-impact removals and deletions—especially valuable when the operation takes longer than a few moments.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/remove-pattern/index.md',
            heading: '### Notification',
            lines: '173–186'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'remove-high-impact-delete',
      title: 'High-impact deletion · require the resource name',
      sectionId: 'high-impact-deletion',
      secondarySectionIds: ['delete-remove-variations', 'optional-passive-modal', 'notification'],
      mappingStatus: 'mapped',
      scenario:
        'For an irreversible action with significant loss, identify the resource and require an exact name match before enabling Delete.',
      teaching: {
        meaning:
          'High-impact deletion destroys a consequential asset permanently and requires deliberate typed verification.',
        decision:
          'Display the resource name, consequences, "This action cannot be undone", and a text input matching the exact resource name before enabling Delete.',
        consider:
          'Optionally pair completion with a passive Done or Requested modal and notification; never offer an undo button on irreversible deletion.'
      },
      interactive: true
    },
    {
      id: 'remove-medium-impact-delete',
      title: 'Medium-impact deletion · confirm the consequence',
      sectionId: 'medium-impact-deletion',
      secondarySectionIds: ['delete-remove-variations', 'optional-passive-modal', 'notification'],
      mappingStatus: 'mapped',
      scenario:
        'For a smaller but irreversible loss, explain what will be deleted and require a deliberate confirmation.',
      teaching: {
        meaning:
          'Medium-impact deletion permanently destroys a bounded item whose loss is consequential but not catastrophic.',
        decision:
          'Confirm in a modal naming the resource, its consequences, and that the action cannot be undone—without requiring typed-name confirmation.',
        consider:
          'State clearly what remains untouched so operators do not confuse deleting a filter or view with deleting primary records.'
      },
      interactive: true
    },
    {
      id: 'remove-low-impact-delete',
      title: 'Low-impact deletion · undo a draft deletion',
      sectionId: 'low-impact-deletion',
      secondarySectionIds: ['delete-remove-variations'],
      mappingStatus: 'partial-divergent',
      scenario:
        'When deleting a low-risk draft is easy to reverse or recreate, skip the confirmation and keep an immediate Undo action beside the result.',
      teaching: {
        meaning:
          'Low-impact deletion skips confirmation dialogs when loss is minor or an immediate Undo action protects against slips.',
        decision:
          'Omit modal friction for low-risk deletions paired with immediate Undo, and prefer subtle hover-danger triggers in dense lists.',
        consider:
          'Keep Undo available long enough to recover, and distinguish deleting the draft from unlinking an existing item.'
      },
      interactive: true,
      _demoNote:
        'The local Delete/Undo example represents low-impact deletion; the separate unlink example demonstrates non-destructive removal.'
    },
    {
      id: 'remove-medium-impact-unlink',
      title: 'Medium-impact removal · preserve the original data',
      sectionId: 'medium-impact-removal',
      secondarySectionIds: ['delete-remove-variations', 'optional-passive-modal', 'notification'],
      mappingStatus: 'partial-divergent',
      scenario:
        'For a non-destructive but consequential unlink, explain the impact and confirm before removing access.',
      teaching: {
        meaning:
          'Medium-impact removal unlinks or moves an item without destroying the source, yet cannot be reversed cleanly.',
        decision:
          'Confirm in a modal explaining what loses access or leaves the collection and stating explicitly that the action cannot be undone.',
        consider:
          'Do not present irreversible medium-impact removal as undoable; reserve immediate Undo for low-impact cases.'
      },
      interactive: true,
      _demoNote:
        'The confirmation names the collection impact and says the removal cannot be undone from this sample view; the completed state has no Restore or Undo action. This remains a local preview and does not change real access.'
    },
    {
      id: 'remove-low-impact-unlink',
      title: 'Low-impact removal · unlink and undo',
      sectionId: 'low-impact-removal',
      secondarySectionIds: ['delete-remove-variations'],
      mappingStatus: 'mapped',
      scenario: 'For a reversible unlink, remove it without a warning and keep an Undo action close to the result.',
      teaching: {
        meaning: 'Low-impact removal unlinks an item harmlessly without destroying the underlying source.',
        decision:
          'Execute directly without a confirmation dialog, optionally offer immediate Undo nearby, and use ghost hover-danger triggers where dense rows appear.',
        consider: 'Clarify that unlinking removes only the reference in this view while leaving the source intact.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:4349-4381`) matches low-impact removal rules; uses an outline trigger rather than illustrating the optional ghost hover-danger trigger treatment.'
    }
  ],
  _implementationNotes: [
    'RemoveDemo uses AlertDialog, Field, Input, and Button (`demos.tsx:4140-4385`); `pattern-library.test.tsx:111-127` asserts irreversibility on high- and medium-impact deletion examples.',
    'Note `catalog.ts:655` lists `Alert` in `components`, though RemoveDemo currently renders inline status text rather than an Alert.'
  ]
}

export const PATTERN_PAGE_CONTENT: Record<PatternId, PatternPageDraft> = {
  'common-actions': PAGE_COMMON_ACTIONS,

  dialogs: PAGE_DIALOGS,

  'disabled-states': PAGE_DISABLED_STATES,

  disclosures: PAGE_DISCLOSURES,

  'empty-states': PAGE_EMPTY_STATES,

  filtering: PAGE_FILTERING,

  'fluid-styles': PAGE_FLUID_STYLES,

  forms: PAGE_FORMS,

  'global-header': PAGE_GLOBAL_HEADER,

  loading: PAGE_LOADING,

  login: PAGE_LOGIN,

  notifications: PAGE_NOTIFICATIONS,

  'overflow-content': PAGE_OVERFLOW_CONTENT,

  'read-only-states': PAGE_READ_ONLY_STATES,

  search: PAGE_SEARCH,

  'status-indicators': PAGE_STATUS_INDICATORS,

  'text-toolbars': PAGE_TEXT_TOOLBARS,

  'community-chatbots': PAGE_COMMUNITY_CHATBOTS,

  'community-in-app-learning': PAGE_COMMUNITY_IN_APP_LEARNING,

  'community-create-flows': PAGE_COMMUNITY_CREATE_FLOWS,

  'community-edit': PAGE_COMMUNITY_EDIT,

  'community-export': PAGE_COMMUNITY_EXPORT,

  'community-api-key': PAGE_COMMUNITY_API_KEY,

  'community-import': PAGE_COMMUNITY_IMPORT,

  'community-order-summary': PAGE_COMMUNITY_ORDER_SUMMARY,

  'community-remove': PAGE_COMMUNITY_REMOVE
}
