import type { PatternPageDraft } from './types'

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
