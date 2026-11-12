import type { PatternPageDraft } from './types'

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
