import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_CREATE_FLOWS: PatternPageDraft = {
  id: 'community-create-flows',
  title: 'Create flows',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Inline creation guidance is explicitly marked under construction in the maintained community reference.',
      'Trigger styling leaves the secondary choice between tertiary and ghost emphasis unresolved when a primary button already occupies the section.',
      'Wide tearsheet and full-page footers note an upcoming 80px fluid button height update replacing 64px.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/create-flows/index.md',
    _excludedSections: [
      '#### Maintainers: (lines 10–13)',
      '### Quick Navigation (lines 21–34)',
      '## Feedback (lines 443–447)',
      'Vendor-internal tearsheet/page-header links stripped while preserving UI concepts inside ## Related.'
    ],
    _upstreamAnomalies: [
      'Source mixes H2 -> H4 directly for When to use / When not to use subsections under Inline creation, Modal, Side panel, Narrow tearsheet, Wide tearsheet, and Full page; normalized to level 3 here while preserving exact sequence.',
      'Full page When to use / When not to use lists vendor-specific cloud provisioning exceptions; generalized here to prerequisite-setup conditions without vendor branding.'
    ]
  },
  summary:
    'Create flows generate a brand-new resource—distinct from attaching an existing item (Add) or modifying a saved record (Edit)—by matching simple or multi-step surfaces to field count, scrolling, context needs, and prerequisite status.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Creating generates a new resource rather than attaching an existing item (Add) or revising an existing one (Edit); never reuse Create surfaces for Add or Edit workflows. Select among six creation surfaces according to form complexity and whether surrounding page context must remain visible and interactive:'
        },
        {
          type: 'table',
          columns: ['Surface', 'When it fits', 'Page context visibility'],
          rows: [
            [
              'Inline',
              'Quick, simple item creation right on the canvas',
              'On-page content stays visible and interactive'
            ],
            ['Modal', 'Simple or transitional creation with 1–2 form fields', 'On-page content is obscured by overlay'],
            [
              'Side panel',
              'Medium complexity where live page context helps',
              'On-page content stays visible and interactive (no overlay)'
            ],
            [
              'Narrow tearsheet',
              'Medium complexity needing scrolling or section headers',
              'On-page content is obscured by overlay'
            ],
            [
              'Wide tearsheet',
              'Complex multi-step flows or spacious single-step layouts',
              'On-page content is obscured by overlay'
            ],
            [
              'Full page',
              'Rare prerequisite flows that must finish before a product or service becomes usable',
              'Dedicated page canvas'
            ]
          ]
        }
      ],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Overview', lines: '36–57' }
    },
    {
      id: 'inline-creation',
      heading: 'Inline creation',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'note',
          text: 'Under construction: the community reference notes that inline creation guidance is still evolving across edge cases.'
        }
      ],
      demoRefs: ['create-flows-inline'],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Inline creation',
        lines: '58–87'
      },
      children: [
        {
          id: 'inline-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Prefer inline creation for quick, simple items when keeping the surrounding list or workspace visible helps the operator stay oriented.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Inline creation)',
            lines: '60–67'
          }
        },
        {
          id: 'inline-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use inline creation if finishing the flow transitions the user onto another page—such as opening the newly created resource or moving to a confirmation screen; use a Modal instead. For complex objects like major system resources, step up to Narrow or Wide tearsheets.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Inline creation)',
            lines: '68–78'
          }
        }
      ]
    },
    {
      id: 'modal',
      heading: 'Modal',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-modal'],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Modal', lines: '89–117' },
      children: [
        {
          id: 'modal-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Simple creations requiring only one or two form fields.',
                'Transitional creations that navigate the user to a new page after submitting.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Modal)',
            lines: '91–96'
          }
        },
        {
          id: 'modal-when-not-to-use',
          heading: 'When not to use a modal',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never substitute a modal for an inline creation opportunity, and never use a modal if the form requires more than four fields or internal vertical scrolling.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use a modal',
            lines: '97–102'
          }
        },
        {
          id: 'modal-anatomy',
          heading: 'Anatomy of a modal',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Small modal container paired with a backdrop overlay that dims underlying content.',
                'Create title with an optional concise subtitle.',
                'Body holding necessary instructions and form fields.',
                'Primary Create button and secondary Cancel button (no top-right close icon).'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a modal',
            lines: '103–117'
          }
        }
      ]
    },
    {
      id: 'side-panel',
      heading: 'Side panel',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-side-panel'],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Side panel', lines: '118–150' },
      children: [
        {
          id: 'side-panel-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a side panel when medium-complexity setup benefits from keeping live page content visible and interactive beside the form.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Side panel)',
            lines: '120–124'
          }
        },
        {
          id: 'side-panel-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Avoid side panels for high-complexity flows where users need a visible step-by-step progress indicator.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Side panel)',
            lines: '125–129'
          }
        },
        {
          id: 'side-panel-anatomy',
          heading: 'Anatomy of a side panel',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                '480px panel width with NO backdrop overlay, keeping the page in an interactive non-focus state so operators can reference on-screen records.',
                'Create title and optional subtitle.',
                'Body with form controls and supporting guidance.',
                'Primary Create button and secondary Cancel button.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a side panel',
            lines: '130–144'
          }
        },
        {
          id: 'side-panel-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Anchor the 480px panel cleanly along the trailing edge so primary page landmarks and reference tables stay unobstructed.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Side panel)',
            lines: '145–150'
          }
        }
      ]
    },
    {
      id: 'narrow-tearsheet',
      heading: 'Narrow tearsheet',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-narrow-tearsheet'],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Narrow tearsheet',
        lines: '151–183'
      },
      children: [
        {
          id: 'narrow-tearsheet-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Choose a narrow tearsheet instead of a modal whenever the form needs vertical scrolling.',
                'Use it when related inputs organize cleanly beneath labeled section headers.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Narrow tearsheet)',
            lines: '153–158'
          }
        },
        {
          id: 'narrow-tearsheet-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use a narrow tearsheet for high-complexity workflows that require a multi-step progress indicator.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Narrow tearsheet)',
            lines: '159–163'
          }
        },
        {
          id: 'narrow-tearsheet-anatomy',
          heading: 'Anatomy of a tearsheet',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Narrow sheet container paired with a full backdrop overlay obscuring underlying page content.',
                'Create title and optional subtitle.',
                'Scrollable body organized around form fields and section headings.',
                'Primary Create button and secondary Cancel button.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a tearsheet',
            lines: '164–177'
          }
        },
        {
          id: 'narrow-tearsheet-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Center or dock the narrow sheet rhythmically inside the viewport grid with consistent header, body, and sticky footer padding.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Narrow tearsheet)',
            lines: '178–183'
          }
        }
      ]
    },
    {
      id: 'wide-tearsheet',
      heading: 'Wide tearsheet',
      level: 2,
      blocks: [],
      demoRefs: ['create-flows-wide-tearsheet'],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Wide tearsheet',
        lines: '184–287'
      },
      children: [
        {
          id: 'wide-tearsheet-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Use a wide tearsheet for creation flows spanning two or more distinct steps.',
                'For single-step tasks requiring broad space—such as interactive selectors, diagrams, or tables—use a wide tearsheet with the progress rail omitted.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Wide tearsheet)',
            lines: '186–191'
          }
        },
        {
          id: 'wide-tearsheet-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use a wide tearsheet for simple single-step creations with few fields.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Wide tearsheet)',
            lines: '192–196'
          }
        },
        {
          id: 'wide-tearsheet-anatomy',
          heading: 'Anatomy of a wide tearsheet',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Wide sheet container with screen overlay obscuring underlying content.',
                'Create title with optional subtitle.',
                'Left vertical progress indicator (256px default rail width, expanding to 320px for long step labels).',
                'Optional "Show all available options" toggle allowing users to inspect every step on one scrollable view with anchor links.',
                'Body area containing step controls, tables, or guidance.',
                'Sticky footer housing primary Next (changing to Create on the final step), secondary Back (disabled on step 1), and ghost Cancel.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a wide tearsheet',
            lines: '197–217'
          }
        },
        {
          id: 'wide-tearsheet-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Align form columns inside the wide canvas next to the 256px or 320px left progress rail, pairing fluid bottom footer buttons (noting upcoming 80px button height conventions replacing 64px) cleanly across the full footer span.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Wide tearsheet)',
            lines: '218–238'
          }
        },
        {
          id: 'wide-tearsheet-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Switching on "Show all available options" converts the vertical progress rail into in-page navigation anchor links across one continuous scrolling canvas above a sticky, top-bordered footer without a fade gradient. You may default this view on when it benefits power users; whenever toggling it back off risks hiding or discarding modified advanced values, show a warning confirmation modal first.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Behaviors (Wide tearsheet)',
            lines: '239–287'
          }
        }
      ]
    },
    {
      id: 'full-page',
      heading: 'Full page',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          text: 'Rare edge case: never confuse Full page with—or use it as a substitute for—the Wide tearsheet.'
        }
      ],
      demoRefs: ['create-flows-full-page'],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Full page', lines: '288–371' },
      children: [
        {
          id: 'full-page-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Reserve full-page creation solely for mandatory prerequisite setup that must be completed before the operator can use the product or service at all (such as initial non-billable service provisioning before workspace access exists).'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When to use (Full page)',
            lines: '296–302'
          }
        },
        {
          id: 'full-page-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Do not use a full-page flow when the product or service is already usable before creation begins, or when creating the resource fits cleanly in a side panel, tearsheet, or catalog provisioning view.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '#### When not to use (Full page)',
            lines: '303–310'
          }
        },
        {
          id: 'full-page-anatomy',
          heading: 'Anatomy of a full page',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Optional location-based breadcrumbs when hierarchy context helps.',
                'Page title (not required to match the Create title verbatim).',
                'Create title (typically "Create <asset>").',
                'Vertical progress rail (256px default, 320px for long step labels).',
                'Main form body.',
                'Optional "Show all available options" toggle.',
                'Fluid sticky footer buttons (64px height, transitioning toward 80px): Next (becoming Create on the final step), Back (disabled on step 1), and ghost Cancel returning to the prior view.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Anatomy of a full page',
            lines: '311–332'
          }
        },
        {
          id: 'full-page-alignment',
          heading: 'Alignment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Align page headers, progress rail, form column, and fluid footer bar cleanly to the full-page grid, allowing for upcoming 80px fluid footer buttons.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Alignment (Full page)',
            lines: '333–350'
          }
        },
        {
          id: 'full-page-optional-toggle',
          heading: 'Optional toggle',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Like wide tearsheets, full-page flows may offer the "Show all available options" toggle to replace step-by-step progress with scrollable anchor links.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Optional toggle',
            lines: '351–357'
          }
        },
        {
          id: 'full-page-leaving',
          heading: 'Leaving the Create flow',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Whenever an operator attempts to leave a full-page creation flow through any route other than explicitly clicking Cancel—such as breadcrumbs or workspace navigation links—display a confirmation modal warning that entered work will be lost.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Leaving the Create flow',
            lines: '358–371'
          }
        }
      ]
    },
    {
      id: 'designing-with-creation-flows',
      heading: 'Designing with creation flows',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Designing with creation flows',
        lines: '372–373'
      },
      children: [
        {
          id: 'designing-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'community/patterns/create-flows/index.md',
            heading: '### Behaviors',
            lines: '374–375'
          },
          children: [
            {
              id: 'designing-triggers',
              heading: 'Triggers',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Launch creation from a "New <asset type>" button paired with a plus icon (for example, "New mission"). Apply primary emphasis only when no other primary action already exists in that section; otherwise step down to tertiary or ghost emphasis (exact preference between tertiary and ghost remains open in the reference). In multi-step flows, disable Back on step 1, rename Next to Create on the final step, and keep Next and Create disabled until every required field is populated.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/create-flows/index.md',
                heading: '#### Triggers',
                lines: '376–391'
              }
            },
            {
              id: 'designing-dismissing',
              heading: 'Dismissing flows',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Omit the top-right close (×) icon on create Modals, Side panels, Narrow tearsheets, and Wide tearsheets so operators make an explicit decision to exit via Cancel.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/create-flows/index.md',
                heading: '#### Dismissing flows',
                lines: '392–397'
              }
            },
            {
              id: 'designing-completion-loading',
              heading: 'Flow completion & loading',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'After the user submits Create, show immediate loading or submitting feedback aligned with loading and modal loading standards. Once finished, either open the new resource or its detail page, or remain on the originating view with a clear success banner notification; whenever creation fails, always surface an error notification.'
                }
              ],
              demoRefs: ['create-flows-completion-loading'],
              _sourceCitation: {
                path: 'community/patterns/create-flows/index.md',
                heading: '#### Flow completion & loading',
                lines: '398–410'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'related-use-cases',
      heading: 'Related use cases',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Related use cases',
        lines: '411–424'
      },
      children: [
        {
          id: 'related-add',
          heading: 'Add',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Attaching an existing resource shares similar ergonomics, yet Add workflows are distinct and must follow their own action guidance rather than Create.'
            }
          ],
          _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '### Add', lines: '413–418' }
        },
        {
          id: 'related-edit',
          heading: 'Edit',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Modifying saved resources overlaps in surface parity, yet Edit workflows carry separate impact and confirmation rules handled under the Edit pattern.'
            }
          ],
          _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '### Edit', lines: '419–424' }
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
          text: 'Inherit accessibility contracts from the underlying Modal, Side panel, Tearsheet, Form, and Progress indicator components—preserving focus trapping on overlay surfaces, non-focus accessibility on side panels, keyboard activation on Cancel and disabled Next/Create states, and clear status announcements on submission.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/create-flows/index.md',
        heading: '## Accessibility',
        lines: '425–433'
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
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Loading', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Common actions (Add)', kind: 'pattern' },
            { label: 'Edit', kind: 'pattern' },
            { label: 'Switch (All-options toggle)', kind: 'component' },
            { label: 'Progress', kind: 'component' }
          ]
        }
      ],
      _sourceCitation: { path: 'community/patterns/create-flows/index.md', heading: '## Related', lines: '434–442' }
    }
  ],
  demos: [
    {
      id: 'create-flows-inline',
      title: 'Create a quick mission inline',
      sectionId: 'inline-creation',
      secondarySectionIds: ['overview', 'designing-triggers'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Create a new one-field mission while keeping the collection visible; use this compact route when no extra context is needed.',
      teaching: {
        meaning:
          'Inline creation adds a quick new item right inside the workspace while keeping surrounding collection records visible.',
        decision:
          'Choose inline only for simple non-transitional creation (noting inline guidance remains under construction); move to a Modal if creation opens a new destination page.',
        consider:
          'Keep required fields disabled-gated on Create and clarify exit behavior; remember Create builds a new item rather than adding an existing one.'
      },
      interactive: true,
      _demoNote:
        'The inline variant now has one required field and disables Create while it is empty; Clear empties the field rather than cancelling the whole flow.'
    },
    {
      id: 'create-flows-modal',
      title: 'Create a mission in a focused dialog',
      sectionId: 'modal',
      secondarySectionIds: ['modal-anatomy', 'designing-dismissing'],
      mappingStatus: 'partial-divergent',
      scenario: 'Use a modal for a short task that needs focused attention but not a full page.',
      teaching: {
        meaning: 'A focused modal blocks the page to collect 1–2 inputs or bridge a short transitional create flow.',
        decision:
          'Use a modal for 1–2 fields or post-create page navigation—never in place of inline creation, and never if fields exceed four or cause scrolling.',
        consider:
          'Omit the top-right close icon so users exit via Cancel, and keep Create disabled until required fields are filled.'
      },
      interactive: true,
      _demoNote:
        'Create stays disabled until the required mission name is present; the sample still uses the library Dialog header and does not create a persisted record.'
    },
    {
      id: 'create-flows-side-panel',
      title: 'Create a complex mission in a side panel',
      sectionId: 'side-panel',
      secondarySectionIds: ['side-panel-anatomy', 'designing-dismissing'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Keep the mission collection visible and usable beside a longer creation form in a non-blocking side panel.',
      teaching: {
        meaning:
          'A 480px non-modal side panel lets operators configure a medium-complexity resource while referencing and interacting with the underlying page.',
        decision:
          'Use a side panel when live page context helps and no step-by-step progress rail is required; step up to a Wide tearsheet for multi-step workflows.',
        consider:
          'Omit any backdrop overlay that blocks non-focus reference on the page, omit a top-right close icon, and gate Create until required inputs are complete.'
      },
      interactive: true,
      _demoNote:
        'The in-card side-panel preview keeps the mission list usable while the create form is open; it does not model a production drawer component or save a mission.'
    },
    {
      id: 'create-flows-full-page',
      title: 'Give a multi-step creation task a full-page canvas',
      sectionId: 'full-page',
      secondarySectionIds: ['full-page-anatomy', 'full-page-leaving', 'designing-triggers'],
      mappingStatus: 'mapped',
      scenario:
        'Set up the initial flight-operations workspace that dispatchers must complete before mission planning is available; the preview uses a dedicated two-step canvas.',
      teaching: {
        meaning:
          'Full-page creation is a rare surface reserved for setup the operator must complete before a product or service becomes usable.',
        decision:
          'Do NOT use Full page merely because a creation flow is long or multi-step—use a Wide tearsheet instead unless prerequisite blocking requires a dedicated page. On multi-step flows, disable Back on step 1 and gate Next/Create.',
        consider:
          'Confirm before discarding when users leave through workspace navigation as well as Cancel. This preview demonstrates the Cancel path; navigation is not routed.'
      },
      interactive: true
    },
    {
      id: 'create-flows-narrow-tearsheet',
      title: 'Use a narrow tearsheet for a compact create task',
      sectionId: 'narrow-tearsheet',
      secondarySectionIds: ['narrow-tearsheet-when-to-use', 'designing-dismissing'],
      mappingStatus: 'mapped',
      scenario:
        'When a create form needs vertical scrolling, use a narrow tearsheet to group related fields while keeping its actions visible.',
      teaching: {
        meaning:
          'A narrow tearsheet provides an overlay-backed form when a create task is too tall for a modal or its fields need section headers.',
        decision:
          'Choose it for a single-step form that needs vertical scrolling or clear field sections; choose a Wide tearsheet when progress across multiple steps must stay visible.',
        consider:
          'Keep Cancel and Create visible while the body scrolls. This static layout preview is not an interactive `skytrack-ui` Tearsheet.'
      },
      interactive: false,
      _demoNote:
        'Static layout reference uses a scrollable, sectioned form with fixed actions; Tearsheet is not shipped in `skytrack-ui`.'
    },
    {
      id: 'create-flows-wide-tearsheet',
      title: 'Use a wide tearsheet when the task needs more room',
      sectionId: 'wide-tearsheet',
      secondarySectionIds: ['wide-tearsheet-anatomy', 'wide-tearsheet-behaviors', 'designing-dismissing'],
      mappingStatus: 'mapped',
      scenario:
        'Show a multi-step mission setup that needs a progress rail and roomy review area; the overlay blocks the page until operators finish or exit the flow.',
      teaching: {
        meaning:
          'A wide tearsheet hosts 2+ distinct steps (with a 256px/320px vertical progress rail) or one spacious interactive canvas (progress rail omitted).',
        decision:
          'Choose a Wide tearsheet—not a Full page—for complex multi-step creations or spacious selectors/tables/diagrams; include an optional "Show all available options" anchor toggle when helpful.',
        consider:
          'Keep Back disabled on step 1, warn before discarding edits if toggling off all-options hides data, and keep the sticky footer bordered without a fade gradient.'
      },
      interactive: false,
      _demoNote:
        'Static two-step illustration includes progress rail, review guidance, and a fixed footer; Tearsheet is not a shipped `skytrack-ui` component, so no fields or actions are interactive.'
    },
    {
      id: 'create-flows-completion-loading',
      title: 'Show completion and a brief loading state',
      sectionId: 'designing-completion-loading',
      secondarySectionIds: ['designing-triggers'],
      mappingStatus: 'partial-divergent',
      scenario:
        'After the user submits a create flow, communicate that local preparation is in progress and then show completion.',
      teaching: {
        meaning:
          'Submitting Create requires active loading feedback followed by an unambiguous success or failure outcome.',
        decision:
          'Keep Next and Create disabled until required fields pass; after submission, show loading, then open the created resource or remain on page with a success banner—and always show an error notification on failure.',
        consider: 'Never report success while preparation is still running.'
      },
      interactive: true,
      _demoNote:
        'Submit starts the local preparation preview and Continue completes it; persistence and failure recovery are not simulated.'
    }
  ],
  _implementationNotes: [
    'CreateFlowsDemo uses Dialog, Drawer, AlertDialog, Field, Input, Button, Progress, and Alert (`demos.tsx:2818-3101`).',
    'Tearsheet components are not shipped in `skytrack-ui`; narrow and wide tearsheet examples render responsive static layout illustrations.'
  ]
}
