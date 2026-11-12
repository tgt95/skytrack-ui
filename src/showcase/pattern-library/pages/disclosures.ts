import type { PatternPageDraft } from './types'

export const PAGE_DISCLOSURES: PatternPageDraft = {
  id: 'disclosures',
  title: 'Disclosures',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/disclosures-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 13–24)',
      '## References (lines 556–573)',
      '## Feedback (lines 574–578)'
    ],
    _upstreamAnomalies: [
      'Maintained source defines disclosures strictly as user-triggered Popover/Menu controls (up to 6 columns wide). The fourth existing demo ("Inline disclosure · supporting details", built with Collapsible) has no maintained section here and is flagged UNMAPPED.'
    ]
  },
  summary:
    'Disclosures open a lightweight, user-initiated popover or menu panel anchored to a trigger control so operators can view account tools, filter settings, or grouped alternatives without losing their place on the page.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Every maintained disclosure pairs two elements: an interactive trigger control and a floating popover panel capable of holding richer text, links, or interactive form controls than a plain informational tooltip.'
        }
      ],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Overview', lines: '25–35' },
      children: [
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a disclosure when secondary controls, session actions, or view settings belong near an interactive trigger without dedicating permanent canvas space or interrupting work with a full dialog.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### When to use', lines: '36–44' }
        },
        {
          id: 'overview-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not place critical warnings, required workflow forms, or sprawling layouts inside a popover—promote required confirmations to dialogs and complex tasks to side panels or dedicated pages.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### When not to use',
            lines: '45–54'
          }
        },
        {
          id: 'overview-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '55–56'
          },
          children: [
            {
              id: 'best-practices-reasonable-size',
              heading: 'Keep disclosures at a reasonable size',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep floating panels compact and scannable—never wider than six layout columns on desktop screens.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keep disclosures at a reasonable size',
                lines: '57–65'
              }
            },
            {
              id: 'best-practices-user-initiated',
              heading: 'Disclosures should be user initiated',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Open disclosures strictly when the user activates the trigger control; never pop open panels automatically on page load or idle hover timers.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Disclosures should be user initiated',
                lines: '66–71'
              }
            },
            {
              id: 'best-practices-one-at-a-time',
              heading: 'One disclosure should open at a time',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Limit the screen to one active disclosure at once so opening a second disclosure automatically closes any previously open panel.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### One disclosure should open at a time',
                lines: '72–86'
              }
            },
            {
              id: 'best-practices-no-nesting',
              heading: 'Avoid nesting disclosures',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Do not launch secondary popovers inside an open disclosure. The lone exception is a side-flyout cascading submenu inside an interactive action menu.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Avoid nesting disclosures',
                lines: '87–94'
              }
            },
            {
              id: 'best-practices-no-critical-info',
              heading: 'Do not hide critical information inside a disclosure',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Essential status, legal terms, or blocking prerequisites must remain directly visible on the canvas rather than tucked inside an unrevealed popover.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Do not hide critical information within a disclosure',
                lines: '95–100'
              }
            }
          ]
        },
        {
          id: 'overview-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Users should dismiss an open disclosure effortlessly by pressing Escape, clicking outside the panel, toggling the trigger button again, or moving Tab focus past the end of its container.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Behaviors',
            lines: '101–112'
          },
          children: [
            {
              id: 'behaviors-dismissible-action',
              heading: 'Dismissible action placement',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When adding an explicit close (×) button inside a complex disclosure, reserve empty header space in the upper-right corner—never place it inline alongside checkboxes, toggles, or action controls.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Dismissible action',
                lines: '113–128'
              }
            }
          ]
        },
        {
          id: 'overview-visual-guidance',
          heading: 'Visual guidance',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Visual guidance',
            lines: '129–130'
          },
          children: [
            {
              id: 'visual-trigger-container',
              heading: 'Trigger button container',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Size disclosure triggers consistently across the hierarchy at 48px (large/global header), 40px (medium/toolbar), or 32px (compact/table actions).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Trigger button container',
                lines: '131–145'
              }
            },
            {
              id: 'visual-trigger-icon',
              heading: 'Trigger button icon',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair 48px and 40px triggers with 20px icons, stepping down cleanly to 16px icons on compact 32px triggers.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Trigger button icon',
                lines: '146–157'
              }
            },
            {
              id: 'visual-popover',
              heading: 'Popover container',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Anchor the popover layer cleanly beside its trigger button using subtle elevation and sufficient padding so panel edges read distinctly against page cards.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Popover',
                lines: '158–171'
              }
            }
          ]
        },
        {
          id: 'overview-content',
          heading: 'Content layout',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Content', lines: '172–179' },
          children: [
            {
              id: 'content-heading-text',
              heading: 'Heading text',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Separate concise panel headings from body content tightly (0px extra gap or a hairline horizontal divider).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Heading text',
                lines: '180–192'
              }
            },
            {
              id: 'content-footer',
              heading: 'Footer content',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Leave at least 16px breathing room or a clear divider above footer actions so confirmation buttons stay distinct from option lists.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Footer content',
                lines: '193–205'
              }
            },
            {
              id: 'content-multiple-sections',
              heading: 'Multiple sections of text',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Break distinct informational groups with consistent vertical spacing or light dividers so panels remain scannable.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Multiple sections of text',
                lines: '206–219'
              }
            },
            {
              id: 'content-interactive-elements',
              heading: 'Interactive elements',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Provide at least 16px vertical spacing between interactive inputs, toggles, or links inside a popover to avoid accidental taps.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Interactive elements',
                lines: '220–234'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'common-use-cases',
      heading: 'Common use cases',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Three recurring product patterns apply disclosure panels consistently: header profile menus, batch-applied settings/filter popovers, and split combo-action menus.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/disclosures-pattern/index.md',
        heading: '## Common use cases',
        lines: '235–246'
      }
    },
    {
      id: 'profile-menu',
      heading: 'Profile menu',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'A profile menu anchors to the authenticated user’s trigger in the global header bar and surfaces account identity, session details, quick links, and sign-out.'
        }
      ],
      demoRefs: ['disclosures-profile-menu'],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Profile menu', lines: '247–259' },
      children: [
        {
          id: 'profile-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Header trigger: compact 48px icon or avatar button inside the global shell.',
                'Identity header: user name, handle/email, and optional avatar image.',
                'Optional dividers grouping logical sections cleanly.',
                'Optional session metadata (active workspace, plan tier, region) editable or inspectable in context.',
                'Optional quick links above account navigation items (Profile, Preferences, Log out) with sparse supportive icons.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Anatomy', lines: '260–281' }
        },
        {
          id: 'profile-structure',
          heading: 'Structure',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Align menu rows vertically from general session identity at the top down to account management and session termination actions at the bottom.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Structure', lines: '282–296' }
        },
        {
          id: 'profile-functionality',
          heading: 'Functionality',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Functionality',
            lines: '297–298'
          },
          children: [
            {
              id: 'profile-mouse',
              heading: 'Mouse behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Clicking the header icon opens or collapses the panel; clicking outside closes it cleanly.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Mouse',
                lines: '299–310'
              }
            },
            {
              id: 'profile-keyboard',
              heading: 'Keyboard behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Tab highlights the trigger; Enter or Space opens the panel and moves focus to the first menu item; Up and Down arrows step through destinations; Enter invokes and Escape dismisses back to the trigger.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keyboard',
                lines: '311–319'
              }
            }
          ]
        },
        {
          id: 'profile-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '320–321'
          },
          children: [
            {
              id: 'profile-bp-header',
              heading: 'Pair with a global toolbar header',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep the profile menu anchored in the top-right utility bar of authenticated applications rather than scattering account menus inside body panels.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Use with a global toolbar header',
                lines: '322–327'
              }
            },
            {
              id: 'profile-bp-session',
              heading: 'Show session-relevant details',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Display identity, active organization, or workspace status needed immediately without duplicating full profile pages.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Show information that is pertinent to the user account or session',
                lines: '328–334'
              }
            },
            {
              id: 'profile-bp-icons',
              heading: 'Use selective icons and links to aid orientation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Include recognizable icons or external indicators only where they clarify destination type rather than decorating every line.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Add icons and links to help guide the user',
                lines: '335–343'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'settings-and-filter-menus',
      heading: 'Settings and filter menus',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Settings and filter disclosures reveal grouped checkboxes, radio sets, toggles, or search inputs inside a popover paired with batch Apply and Reset actions.'
        }
      ],
      demoRefs: ['disclosures-settings-filter-menu'],
      _sourceCitation: {
        path: 'patterns/disclosures-pattern/index.md',
        heading: '## Settings and filter menus',
        lines: '344–351'
      },
      children: [
        {
          id: 'settings-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Combine an icon trigger button, a structured popover housing interactive controls with optional filter search/clear controls, and bottom Apply and Reset actions.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Anatomy', lines: '352–366' }
        },
        {
          id: 'settings-structure',
          heading: 'Structure',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Group related controls cleanly with clear spacing so operators can review pending settings together before committing updates.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Structure', lines: '367–382' }
        },
        {
          id: 'settings-functionality',
          heading: 'Functionality',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Functionality',
            lines: '383–384'
          },
          children: [
            {
              id: 'settings-mouse',
              heading: 'Mouse behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Controls remain open while adjusting selections; clicking Apply commits all pending choices and closes the popover, while Reset clears unapplied edits or restores saved defaults.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Mouse',
                lines: '385–397'
              }
            },
            {
              id: 'settings-keyboard',
              heading: 'Keyboard behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Because the panel contains mixed interactive form controls, opening focuses the first interactive control and users move through choices, Reset, and Apply using Tab and Shift+Tab rather than simple single-menu arrows.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keyboard',
                lines: '398–408'
              }
            }
          ]
        },
        {
          id: 'settings-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '409–410'
          },
          children: [
            {
              id: 'settings-bp-batch-buttons',
              heading: 'Provide Apply and Reset buttons to commit changes together',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Apply multi-control edits as a batch so views do not flash or reload mid-selection while the user is still choosing criteria.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Use a set of buttons to apply all changes',
                lines: '411–417'
              }
            },
            {
              id: 'settings-bp-not-overcrowded',
              heading: 'Do not overcrowd menus',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep popovers focused on one domain view; promote sprawling preference sets to full settings screens or drawers.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: "#### Don't overcrowd menus with unnecessary content",
                lines: '418–423'
              }
            },
            {
              id: 'settings-bp-spacing',
              heading: 'Maintain clear element spacing',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Preserve at least 16px gaps between grouped form controls so selections stay easy to target.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Include enough space between elements',
                lines: '424–429'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'combo-button',
      heading: 'Combo button',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'A combo button merges one dominant primary action with an adjacent menu toggle revealing secondary alternatives.'
        }
      ],
      demoRefs: ['disclosures-combo-button'],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Combo button', lines: '430–435' },
      children: [
        {
          id: 'combo-anatomy',
          heading: 'Anatomy',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Pairs a default action button on the left with a slim chevron icon trigger beside it opening an overflow menu popover with horizontal section dividers where needed.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Anatomy', lines: '436–449' }
        },
        {
          id: 'combo-structure',
          heading: 'Structure',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Keep both halves visually joined at equal control height, presenting alternate choices beneath the split trigger without competing with the main label.'
            }
          ],
          _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '### Structure', lines: '450–459' }
        },
        {
          id: 'combo-functionality',
          heading: 'Functionality',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Functionality',
            lines: '460–461'
          },
          children: [
            {
              id: 'combo-mouse',
              heading: 'Mouse behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Clicking the primary half fires the default command immediately; clicking the chevron half opens the menu of alternative commands.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Mouse',
                lines: '462–473'
              }
            },
            {
              id: 'combo-keyboard',
              heading: 'Keyboard behavior',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Tab reaches the primary button first (Enter or Space triggers it) and tabs next to the chevron toggle (Enter, Space, or Down arrow opens the alternatives menu, navigated with Up/Down arrows and dismissed with Escape).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Keyboard',
                lines: '474–486'
              }
            }
          ]
        },
        {
          id: 'combo-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/disclosures-pattern/index.md',
            heading: '### Best practices',
            lines: '487–488'
          },
          children: [
            {
              id: 'combo-bp-default-action',
              heading: 'Choose a clear default action',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Assign the high-frequency task as the visible default button so operators succeed in one click, relegating rarer siblings to the menu.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Choose a default action',
                lines: '489–495'
              }
            },
            {
              id: 'combo-bp-reduce-complexity',
              heading: 'Reduce visual clutter in dense headers',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Collapse secondary variations into a combo button when adjacent buttons share one object context and would otherwise crowd the toolbar.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Use to reduce visual complexity on a page',
                lines: '496–501'
              }
            },
            {
              id: 'combo-bp-no-extra-icons',
              heading: 'Avoid extra icons inside labels',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Keep text-only labels inside both the primary action button and menu rows—never add extra icons alongside the mandatory split-menu chevron.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/disclosures-pattern/index.md',
                heading: '#### Avoid using extra icons',
                lines: '502–516'
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
          text: 'Expose trigger expanded state (`aria-expanded`), open/close cleanly on Enter or Space, and preserve distinct keyboard mechanics: Up/Down arrow traversal for Menu-style lists versus Tab/Shift+Tab movement inside multi-control Settings popovers.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/disclosures-pattern/index.md',
        heading: '## Accessibility > #### Screen readers',
        lines: '517–529'
      }
    },
    {
      id: 'related',
      heading: 'Related components',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Button', kind: 'component' },
            { label: 'Popover', kind: 'component' },
            { label: 'Toggletip', kind: 'component' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/disclosures-pattern/index.md', heading: '## Related', lines: '530–555' }
    }
  ],
  demos: [
    {
      id: 'disclosures-profile-menu',
      title: 'Profile menu · account actions',
      sectionId: 'profile-menu',
      secondarySectionIds: ['profile-bp-header', 'profile-bp-session'],
      mappingStatus: 'partial-divergent',
      scenario: 'Reveal operator account identity, session details, and account actions from a compact menu trigger.',
      teaching: {
        meaning: 'A profile menu reveals account- or session-related options on request.',
        decision:
          "Use it for secondary items tied to the user's identity inside a global header; keep primary task actions in their task context.",
        consider:
          'Keep the menu concise, keyboard reachable via Up/Down arrows, and clear about whether actions navigate or update a session setting.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:824-844`) renders an isolated outline button "Tuan Trinh · Account" rather than a 48px global-header avatar/icon trigger with session details or dividers.'
    },
    {
      id: 'disclosures-settings-filter-menu',
      title: 'Settings and filter menu · change a view',
      sectionId: 'settings-and-filter-menus',
      secondarySectionIds: ['settings-keyboard', 'settings-bp-batch-buttons'],
      mappingStatus: 'mapped',
      scenario:
        'Stage related mission categories in a compact popover, apply them together, and inspect the updated mission list.',
      teaching: {
        meaning:
          'A settings menu reveals compact popover controls for changing a view without keeping every option pinned on screen.',
        decision:
          'Use an interactive Popover with batch Reset and Apply buttons so users can inspect several selections before applying together.',
        consider:
          'Navigate mixed panel controls with Tab/Shift+Tab; distinguish pending choices from applied settings and leave 16px spacing between controls.'
      },
      interactive: true
    },
    {
      id: 'disclosures-combo-button',
      title: 'Combo button · primary action plus alternatives',
      sectionId: 'combo-button',
      secondarySectionIds: ['combo-bp-default-action', 'combo-bp-no-extra-icons'],
      mappingStatus: 'mapped',
      scenario:
        'Highlight one frequent export action while keeping secondary formats grouped behind an adjacent menu trigger.',
      teaching: {
        meaning: 'A combo button keeps one common action prominent and groups related alternatives.',
        decision:
          'Use it when one action is the clear default and alternatives are less frequent; keep extra icons out of primary and menu action labels.',
        consider: 'Make the default action unmistakable and support Enter/Space/Down-arrow menu activation.'
      },
      interactive: true
    },
    {
      id: 'disclosures-inline-local',
      title: 'Inline disclosure · supporting details',
      sectionId: 'UNMAPPED',
      mappingStatus: 'UNMAPPED',
      scenario:
        'Reveal secondary waypoint or schedule notes inline inside the page flow using a local Collapsible extension.',
      teaching: {
        meaning:
          'Local extension: an inline Collapsible disclosure reveals related secondary details within the page flow when requested.',
        decision:
          'UNMAPPED to maintained source (source covers popover disclosures only). Use inline disclosures only for non-critical supporting details when a floating popover is unnecessary.',
        consider: 'Keep revealed content focused, avoid nested disclosures, and expose aria-expanded state cleanly.'
      },
      interactive: true,
      _demoNote:
        'UNMAPPED local extension (`demos.tsx:919`, `<Collapsible>`). Maintained `disclosures-pattern/index.md` covers strictly popover-based disclosures (Profile menu, Settings/filter popover, Combo button) and omits inline accordion/collapsible panels. Keep component intact in UI while labeling as a local SkyTrack extension.'
    }
  ],
  notes: [
    {
      kind: 'content',
      text: 'UNMAPPED demo disclosure: "Inline disclosure · supporting details" uses inline Collapsible as a SkyTrack extension; maintained source guidance covers Popover/Menu disclosures up to 6 columns wide.'
    },
    {
      kind: 'implementation',
      text: 'Prefer the existing Popover component (`popover.tsx`) rather than Menu when building multi-control Settings and filter disclosures that require batch Apply/Reset.'
    }
  ],
  components: ['Popover', 'Menu', 'Button', 'Collapsible']
}
