import type { PatternPageDraft } from './types'

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
