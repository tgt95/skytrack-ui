import type { PatternPageDraft } from './types'

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
