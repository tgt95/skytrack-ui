import type { PatternPageDraft } from './types'

export const PAGE_LOADING: PatternPageDraft = {
  id: 'loading',
  title: 'Loading',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'SkyTrack UI package constraint: SkyTrack UI ships `Progress` (`progress.tsx`) and does NOT currently ship dedicated `Skeleton`, activity spinner `Loading`, or `InlineLoading` primitives. Local examples use pulse placeholder geometry and indeterminate `<Progress value={null}>` bars strictly as visual stand-ins.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/loading-pattern/index.md',
    _relatedSources: [{ path: 'components/loading/usage.md' }, { path: 'components/inline-loading/usage.md' }],
    _excludedSections: [
      '### Quick Navigation (lines 15–27)',
      '## References (lines 191–202)',
      '## Feedback (lines 203–207)'
    ]
  },
  summary:
    'Loading feedback communicates active progress, scopes waiting precisely to blocked vs. local regions, escalates appropriately with wait duration, and keeps interactive controls accessible.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select loading treatments by how predictable the layout is and how long the operation lasts:'
        },
        {
          type: 'table',
          columns: ['Estimated duration & context', 'Recommended loading mechanism'],
          rows: [
            [
              'Sub-3 seconds / initial known layout load',
              'Skeleton states (animated placeholders for containers and primary data blocks)'
            ],
            [
              'Unknown wait > 3 seconds',
              'Activity spinner (inline for a local control/row, full-screen only when entire page is blocked)'
            ],
            [
              'Measurable duration exceeding a moment or two',
              'Determinate progress bar reporting real progress (never swap a bar for short indeterminate spinners in production)'
            ],
            [
              'Background job taking several minutes or more',
              'Hand off cleanly and notify the operator via notification when finished'
            ]
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/loading-pattern/index.md',
        related: [{ path: 'components/loading/usage.md', lines: '40–41' }],
        heading: '## Overview',
        lines: '28–38'
      }
    },
    {
      id: 'skeleton-states',
      heading: 'Skeleton states',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use animated skeleton blocks solely on initial page loads lasting at most a few seconds when the target container shape is known ahead of arrival. Render skeletons for structural cards, tiles, structured lists, and data tables—leaving interactive action controls omitted or inactive until ready.'
        },
        {
          type: 'callout',
          kind: 'dont',
          text: 'Never place skeletons on interactive buttons, form inputs, checkboxes, toggles, toast notifications, overflow menus, dropdown options, loading spinners, or outer modal frames (skeletonize only inner modal body data).'
        }
      ],
      demoRefs: ['loading-skeleton-list'],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Skeleton states', lines: '39–65' }
    },
    {
      id: 'loading-indicators',
      heading: 'Loading indicators',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Indeterminate activity spinners report active work without inventing fake percentages once a wait passes roughly three seconds; promote to a determinate progress indicator once meaningful steps or completion percentages can be measured—and avoid stacking multiple simultaneous spinners on one view.'
        },
        {
          type: 'callout',
          kind: 'source-limit',
          text: 'SkyTrack package note: because spinner primitives (`Loading`, `InlineLoading`) are not yet present in SkyTrack UI, the measured progress demo sits here alongside indeterminate progress-bar stand-ins.'
        }
      ],
      demoRefs: ['loading-measured-progress'],
      _sourceCitation: {
        path: 'patterns/loading-pattern/index.md',
        related: [{ path: 'components/loading/usage.md', lines: '40–66' }],
        heading: '## Loading indicators',
        lines: '66–75'
      },
      children: [
        {
          id: 'loading-full-screen',
          heading: 'Full-screen loading',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a full-screen blocking spinner overlay sparingly only when saving, switching tenant environment, or recalculating page-wide state prevents safe interaction across the entire viewport.'
            }
          ],
          demoRefs: ['loading-full-screen-save'],
          _sourceCitation: {
            path: 'patterns/loading-pattern/index.md',
            heading: '### Full-screen loading',
            lines: '76–97'
          }
        },
        {
          id: 'loading-inline',
          heading: 'Inline loading',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Scope an inline spinner directly to the triggered button, row, or form panel while the rest of the workspace stays usable. While active, disable both the triggering action and dependent actions like Cancel; transition cleanly to a brief finished checkmark (~1.5s before invoking the follow-up completion callback) or revert to inactive alongside an inline error alert on failure.'
            }
          ],
          demoRefs: ['loading-inline-check'],
          _sourceCitation: {
            path: 'patterns/loading-pattern/index.md',
            related: [{ path: 'components/inline-loading/usage.md', lines: '102–140' }],
            heading: '### Inline loading',
            lines: '98–112'
          }
        }
      ]
    },
    {
      id: 'progressive-loading',
      heading: 'Progressive loading',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Staged progressive loading accelerates large multi-source dashboards and complex faceted tables by rendering core structure in priority order instead of blocking behind one global spinner:'
        },
        {
          type: 'list',
          items: [
            'Batch 1 (render immediately): layout containers, non-data UI chrome and headings, and lightweight skeletons for primary data values.',
            'Batch 2+ (stream asynchronously): heavy charts, offscreen table rows, secondary action controls, and delayed imagery—reserving fixed empty negative space matched to final image dimensions (e.g., 600×600px) rather than mandatory skeleton boxes so layouts never jump.'
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/loading-pattern/index.md',
        heading: '## Progressive loading',
        lines: '113–148'
      }
    },
    {
      id: 'load-more-options',
      heading: 'Load more options',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Pair truncated database-backed feeds or tables with an explicit "Load more" control to retrieve additional batches asynchronously while keeping scroll stability and current context intact.'
        }
      ],
      demoRefs: ['loading-batch-collection'],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Load more options', lines: '149–162' }
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Expose loading, busy, stalled, and failed transitions programmatically using `aria-busy` on updating containers and polite live regions so non-visual operators know whether work is still underway, stalled, or finished without polling visually.'
        }
      ],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Accessibility', lines: '163–173' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Progress', kind: 'component' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Dialogs', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/loading-pattern/index.md', heading: '## Related', lines: '174–190' }
    }
  ],
  demos: [
    {
      id: 'loading-measured-progress',
      title: 'Show measured task progress',
      sectionId: 'loading-indicators',
      secondarySectionIds: ['overview'],
      mappingStatus: 'mapped',
      scenario:
        'Display real completion percentage when upload or processing stages are measurable and run past a brief wait.',
      teaching: {
        meaning:
          'A progress indicator reports how much of a task is complete when the system can measure real step progress.',
        decision:
          'Use measured progress indicators once work exceeds a moment or two with real completion steps; use an activity spinner when duration cannot be measured.',
        consider: 'Never invent synthetic percentages, and transition cleanly to completion or failure recovery.'
      },
      interactive: true
    },
    {
      id: 'loading-inline-check',
      title: 'Keep an inline check responsive',
      sectionId: 'loading-inline',
      secondarySectionIds: ['accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Show local activity feedback for one connection check without blocking the rest of the page; the sample keeps its trigger and Cancel check unavailable while active.',
      teaching: {
        meaning:
          'Inline loading communicates that a single control or region is busy while sibling workflows remain interactive.',
        decision:
          'Disable the trigger and related Cancel controls while active, transition through a brief finished confirmation (~1.5s) before follow-up actions, or revert with an inline error on failure.',
        consider:
          'SkyTrack UI lacks `InlineLoading` spinner primitives, so this local demo substitutes an indeterminate `<Progress value={null}>` bar.'
      },
      interactive: true,
      _demoNote:
        'Uses the supported indeterminate Progress composition and a separate completion control for the local preview; it does not simulate the source 1.5s transition or failure recovery.'
    },
    {
      id: 'loading-full-screen-save',
      title: 'Block the page while a save completes',
      sectionId: 'loading-full-screen',
      mappingStatus: 'partial-divergent',
      scenario:
        'Cover an entire blocking workflow temporarily so conflicting mutations cannot occur during critical save processing.',
      teaching: {
        meaning:
          'A page-level busy overlay signals that a save or workspace switch blocks safe interaction until finished.',
        decision:
          'Reserve blocking overlays strictly for full-context operations lasting > 3 seconds; isolate local tasks with inline loading instead.',
        consider:
          'Ensure overlay scrims cover or disable triggering controls as well as body inputs and announce completion clearly.'
      },
      interactive: true,
      _demoNote:
        'The local overlay blocks its sample content; a labeled demo control remains outside so readers can end the preview. A real page-level save should block the rest of the page.'
    },
    {
      id: 'loading-batch-collection',
      title: 'Load a collection in batches',
      sectionId: 'load-more-options',
      secondarySectionIds: ['progressive-loading'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Reveal the next sample batch on request while preserving the list and making the end of the collection clear.',
      teaching: {
        meaning: 'A Load more control reveals the next portion of a collection without forcing a full-page reload.',
        decision:
          'Pair incremental initial batching with Load more when operators scan sequentially; consider multi-batch progressive loading (containers first, reserved whitespace for delayed media) on large dashboards.',
        consider: 'Preserve scroll focus/position and announce loading state cleanly.'
      },
      interactive: true,
      _demoNote:
        'The local sample reveals its next records immediately and says it does not fetch data or simulate network delay.'
    },
    {
      id: 'loading-skeleton-list',
      title: 'Reserve the shape of a list while its first data loads',
      sectionId: 'skeleton-states',
      secondarySectionIds: ['accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Preview known container and text structure on brief initial loads without skeletonizing buttons, menus, toasts, or outer modal shells.',
      teaching: {
        meaning: 'A skeleton previews known structural layout during brief (< a few seconds) initial page loads.',
        decision:
          'Use skeletons strictly on containers and data blocks (cards, list items, table data, inner modal bodies)—never on action buttons, inputs, menus, dropdown items, toast alerts, or outer modals.',
        consider:
          'Expose loading regions with aria-busy rather than misleading static `role="img"` placeholders alone, and show content immediately upon arrival.'
      },
      interactive: false,
      _demoNote:
        'The local pulse-bar illustration now exposes `aria-busy` on its containing region and hides decorative bars from assistive technology; the package still has no Skeleton primitive.'
    }
  ],
  notes: [
    {
      kind: 'implementation',
      text: 'Package gap: `src/components/ui/` provides `Progress` (`progress.tsx`) only; `Skeleton`, full-page spinner `Loading`, and `InlineLoading` primitives do not yet exist in SkyTrack UI.'
    }
  ],
  components: ['Progress', 'Button', 'Badge']
}
