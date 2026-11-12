import type { PatternPageDraft } from './types'

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
