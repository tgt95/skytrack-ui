import type { PatternPageDraft } from './types'

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
