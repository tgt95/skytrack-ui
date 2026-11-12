import type { PatternPageDraft } from './types'

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
