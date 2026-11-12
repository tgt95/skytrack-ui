import type { PatternPageDraft } from './types'

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
