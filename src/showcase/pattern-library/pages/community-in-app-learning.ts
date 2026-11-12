import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_IN_APP_LEARNING: PatternPageDraft = {
  id: 'community-in-app-learning',
  title: 'Content: in-app learning',
  group: 'Community',
  source: {
    status: 'Community catalog only',
    catalogEvidence:
      'The community pattern index lists Content: in-app learning as a collection of five adoption topics to help users understand key features: welcome screens, getting started, in-context help and guidance, global help and guidance, and updates.',
    limits: [
      'Catalog-only entry: no dedicated detail specification is maintained locally; all referenced external content-design guides are unavailable here.',
      'Missing maintained rules: triggers, dismissal persistence, completion tracking, frequency caps, visual anatomy, placement, and accessibility requirements are not defined in the local source.',
      'All behavioral guidance and interactive examples on this page are SkyTrack local interpretations only.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/index.md',
    _primaryLines: '38',
    _excludedSections: [
      'No dedicated pattern page exists locally; standard maintained sections (Anatomy, Behavior, Accessibility, Related) are intentionally omitted per catalog-only limits.'
    ]
  },
  summary:
    'Catalog-only reference listing five feature-adoption topics—welcome screens, getting started, in-context help, global help, and product updates—without locally maintained behavioral or persistence specifications.',
  sections: [
    {
      id: 'source-evidence',
      heading: 'Catalog evidence',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'The maintained local community index records only a single catalog entry identifying five adoption-focused learning moments intended to help people understand key capabilities:'
        },
        {
          type: 'list',
          items: [
            'Welcome screens',
            'Getting started',
            'In-context help and guidance',
            'Global help and guidance',
            'Updates (what’s new)'
          ]
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Content: in-app learning',
        lines: '38'
      }
    },
    {
      id: 'source-limits',
      heading: 'Source limits',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'source-limit',
          text: 'No detailed specification is maintained locally for any of these five topics. The local catalog defines no opening triggers, dismissal behavior, progress persistence, recurrence rules, layout anatomy, or accessibility contracts.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Content: in-app learning (IBM-only links)',
        lines: '31, 38'
      }
    },
    {
      id: 'local-interpretation',
      heading: 'Local interpretation for examples',
      level: 2,
      blocks: [
        {
          type: 'callout',
          kind: 'local-interpretation',
          text: 'Local interpretation: because the maintained index provides topic names without interaction rules, the guidance below explains only how SkyTrack illustrates those five moments in the interactive examples.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Content: in-app learning (local demo mapping)',
        lines: '38'
      },
      children: [
        {
          id: 'local-welcome-screens',
          heading: 'Welcome screens (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: a concise welcome banner can orient someone entering a new workspace without blocking immediate work, provided dismissal and a route to revisit are clear.'
            }
          ],
          demoRefs: ['in-app-learning-welcome'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'welcome screens (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-getting-started',
          heading: 'Getting started checklists (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: a short ordered checklist can introduce initial setup tasks one step at a time while clarifying locally whether progress persists.'
            }
          ],
          demoRefs: ['in-app-learning-checklist'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'getting started (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-in-context-help',
          heading: 'In-context help and guidance (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: placing brief task tips right beside unfamiliar controls answers specific questions without pulling operators away from their workflow.'
            }
          ],
          demoRefs: ['in-app-learning-context-tip'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'in-context help and guidance (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-global-help',
          heading: 'Global help and guidance (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: a steady workspace help destination gives people a predictable place to find general documentation and support contacts across screens.'
            }
          ],
          demoRefs: ['in-app-learning-global-help'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'global help and guidance (catalog topic)',
            lines: '38'
          }
        },
        {
          id: 'local-updates',
          heading: 'Product updates (local interpretation)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Local interpretation: concise release alerts can highlight meaningful workflow changes when users can dismiss them and look them up again later.'
            }
          ],
          demoRefs: ['in-app-learning-updates'],
          _sourceCitation: {
            path: 'community/patterns/index.md',
            heading: 'what’s new / updates (catalog topic)',
            lines: '38'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'in-app-learning-welcome',
      title: 'Welcome a first-time user',
      sectionId: 'local-welcome-screens',
      mappingStatus: 'local-interpretation',
      scenario:
        'Orient a new workspace member with a short welcome and one clear way to begin or dismiss the introduction.',
      teaching: {
        meaning: 'Local interpretation: a brief welcome orients someone who is new and gives them a first step.',
        decision:
          'Local interpretation: use a welcome when a new capability or workspace needs orientation; keep a way to dismiss and revisit it.',
        consider:
          'Avoid blocking the user’s task; dismissal persistence and welcome behavior are not defined in the local catalog source.'
      },
      interactive: true,
      _demoNote:
        'Local-only walkthrough: Get started opens a sample first step, dismissal can be reversed, and progress is not persisted.'
    },
    {
      id: 'in-app-learning-checklist',
      title: 'Help users get started with a short checklist',
      sectionId: 'local-getting-started',
      mappingStatus: 'local-interpretation',
      scenario: 'Break an unfamiliar task into visible first steps and show progress as each item is completed.',
      teaching: {
        meaning:
          'Local interpretation: a short checklist breaks an unfamiliar task into first steps and makes progress visible.',
        decision:
          'Local interpretation: use it when a person needs a sequence to get started; keep each step tied to the task at hand.',
        consider:
          'If completion is tracked, decide how users can resume and avoid repeating finished guidance; progress policy is not in the local source.'
      },
      interactive: true
    },
    {
      id: 'in-app-learning-context-tip',
      title: 'Show in-context guidance beside a task',
      sectionId: 'local-in-context-help',
      mappingStatus: 'local-interpretation',
      scenario:
        'Offer a short explanation where a person encounters a new control, with a way to complete or reopen the tip.',
      teaching: {
        meaning: 'Local interpretation: a nearby tip explains a feature at the moment someone encounters it.',
        decision:
          'Local interpretation: choose contextual guidance when a question arises during a specific task rather than sending users away for general reference.',
        consider:
          'Keep tips relevant to the active control without obscuring surrounding inputs; local source defines no contextual-tip policy.'
      },
      interactive: true
    },
    {
      id: 'in-app-learning-global-help',
      title: 'Keep global help available across the workspace',
      sectionId: 'local-global-help',
      mappingStatus: 'local-interpretation',
      scenario:
        'Place learning resources in a predictable help location instead of repeating a full introduction on every page.',
      teaching: {
        meaning:
          'Local interpretation: workspace-wide help gives people a steady destination when a question spans multiple screens.',
        decision:
          'Local interpretation: use a global help entry point for reference that must stay reachable across workflows.',
        consider:
          'Make help discoverable without interrupting active tasks; the local catalog defines no navigation or access rules.'
      },
      interactive: true,
      _demoNote:
        'In `demos.tsx:2781-2785`, expanded "Workspace help and guidance" renders static plain list text with no interactive links.'
    },
    {
      id: 'in-app-learning-updates',
      title: 'Explain what changed in a product update',
      sectionId: 'local-updates',
      mappingStatus: 'local-interpretation',
      scenario: 'Show a concise release note that users can dismiss and find again from the help area.',
      teaching: {
        meaning: 'Local interpretation: an update explains a recent product change that affects daily workflow.',
        decision:
          'Local interpretation: surface update guidance when a change matters to users, letting them dismiss and revisit it.',
        consider:
          'Describe the real workflow change concisely; recurrence and display-frequency rules are absent from the local source.'
      },
      interactive: true
    }
  ],
  _implementationNotes: [
    'InAppLearningDemo uses Collapsible, Alert, and Button in local React state (`demos.tsx:2674-2816`) and intentionally does not persist learner progress.',
    'Note for catalog sync: `catalog.ts:470-471` (`whenToUse`, `userBenefit`) and `example-copy.ts:541-574` currently lack explicit `Local interpretation:` prefixes on `meaning`/`decision`.'
  ]
}
