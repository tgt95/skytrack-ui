import type { PatternPageDraft } from './types'

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
