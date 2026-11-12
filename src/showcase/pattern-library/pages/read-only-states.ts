import type { PatternPageDraft } from './types'

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
