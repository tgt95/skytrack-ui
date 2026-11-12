import type { PatternPageDraft } from './types'

export const PAGE_NOTIFICATIONS: PatternPageDraft = {
  id: 'notifications',
  title: 'Notifications',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Experimental WIP concepts: Banner notifications and the Notification panel are explicitly flagged experimental / work-in-progress requiring further design iteration in the maintained local reference.',
      'Deferred Error pattern: standalone dedicated Error states pattern documentation is noted as planned future work.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/notification-pattern/index.md',
    _relatedSources: [{ path: 'components/notification/usage.md' }],
    _excludedSections: [
      '### Quick Navigation (lines 14–26)',
      '## References (lines 472–491)',
      '## Feedback (lines 492–496)'
    ],
    _upstreamAnomalies: [
      '## Overview jumps straight from H2 to #### Notification status and #### Notification type (normalized to level 3 cleanly).',
      'Banner and Panel "Best practices:" subtitles carry trailing colons in source markdown.'
    ]
  },
  summary:
    'Notifications communicate events and task outcomes through three independent choices: event category, semantic status, and presentation. Keep urgency clear while limiting unnecessary interruption.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Every effective notification explains what happened and, when useful, what to do next. Decide what kind of event occurred, what status it carries, and how it should be presented as separate questions:'
        }
      ],
      _sourceCitation: { path: 'patterns/notification-pattern/index.md', heading: '## Overview', lines: '27–51' },
      children: [
        {
          id: 'overview-event-category',
          heading: 'Event category axis',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Group events in language that fits the product, such as work or task activity, collaboration or access changes, and workspace or system updates. These categories describe what happened; they do not prescribe a visual treatment.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '## Overview',
            lines: '27–70'
          }
        },
        {
          id: 'overview-notification-status',
          heading: 'Notification status axis',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Describe the event as informational, successful, cautionary, or an error. Use text and visual cues together so status is not conveyed by color alone.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '#### Notification status',
            lines: '52–59'
          }
        },
        {
          id: 'overview-notification-type',
          heading: 'Notification presentation type axis',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose where the notice appears and how much it interrupts. Timing, persistence, and actions depend on the product policy and implementation; do not assume defaults.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '#### Notification type',
            lines: '60–70'
          }
        }
      ]
    },
    {
      id: 'designing-with-notifications',
      heading: 'Designing with notifications',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Designing with notifications',
        lines: '71–72'
      },
      children: [
        {
          id: 'designing-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Match delivery context to what triggered the update:'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### When to use',
            lines: '73–82'
          },
          children: [
            {
              id: 'when-task-generated',
              heading: 'Task-generated notifications',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Appear right near the workspace action or form the operator just triggered; because the user is already looking there, keep explanation tight.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/notification-pattern/index.md',
                heading: '#### Task-generated notifications',
                lines: '83–95'
              }
            },
            {
              id: 'when-system-generated',
              heading: 'System-generated notifications',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Originate from asynchronous background jobs, external outages, or cross-product changes outside active focus—so messages must supply standalone resource and system context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/notification-pattern/index.md',
                heading: '#### System-generated notifications',
                lines: '96–108'
              }
            }
          ]
        },
        {
          id: 'designing-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Curb over-notification so alert fatigue never numbs operators to critical warnings. Do not cover working controls with alerts when quiet inline state or empty states explain the condition more naturally.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### When not to use',
            lines: '109–117'
          }
        }
      ]
    },
    {
      id: 'notification-status',
      heading: 'Notification status',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select the lowest accurate status severity that matches operational reality:'
        },
        {
          type: 'table',
          columns: ['Status', 'Icon & semantic color pairing', 'When to choose'],
          rows: [
            [
              'Informational',
              'Filled info icon / Blue',
              'Neutral system updates, helpful workspace state, or orientation notes'
            ],
            ['Success', 'Filled checkmark icon / Green', 'Completed save, sync, or requested task succeeded cleanly'],
            [
              'Warning',
              'Filled warning triangle / Yellow',
              'Potential risk, approaching quota, or prerequisite requiring caution'
            ],
            [
              'Error',
              'Filled error circle / Red',
              'Blocked submission, failed operation, or service outage needing user remediation'
            ]
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Notification status > ### Deciding what to use',
        lines: '118–143'
      }
    },
    {
      id: 'notification-types',
      heading: 'Notification presentations',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Choose a presentation based on context, urgency, interruption, and whether a response is needed. The table describes common patterns, not default behavior guarantees:'
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Notification types',
        lines: '144–152'
      },
      children: [
        {
          id: 'types-deciding',
          heading: 'Deciding what type to use',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Presentation', 'Typical context', 'Interaction', 'Guidance / maturity'],
              rows: [
                [
                  'Inline',
                  'Feedback beside affected content',
                  'Optional action or dismissal when appropriate',
                  'Keep close to the related task or control'
                ],
                [
                  'Toast',
                  'Brief, noncritical feedback after an event',
                  'Keep any action optional and easy to reach',
                  'Do not assume a timeout, queue, or archive'
                ],
                [
                  'Actionable',
                  'A notice with a useful next step',
                  'Offer a clear action without unexpected focus changes',
                  'Avoid timing out a notice that needs a response'
                ],
                [
                  'Callout',
                  'Guidance tied to a page or control',
                  'Usually informational and contextual',
                  'Do not present it as an event or action result'
                ],
                [
                  'Banner',
                  'Broad, high-visibility update',
                  'Depends on product policy',
                  'Experimental concept; behavior is not defined here'
                ],
                [
                  'Notification panel',
                  'A place to review multiple notices',
                  'Depends on product policy',
                  'Experimental concept; history and preferences are not implied'
                ],
                [
                  'Dialog / Alert Dialog',
                  'A blocking decision or acknowledgement',
                  'Use a clear choice or acknowledgement',
                  'Interaction pattern, not a notification type'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Deciding what to use',
            lines: '153–165'
          }
        },
        {
          id: 'type-inline',
          heading: 'Inline notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Place inline notices near the affected content or control. Keep the message concise, avoid obscuring work, and make dismissal or resolution behavior clear for the situation.'
            }
          ],
          demoRefs: ['notifications-inline-context'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '211–241' }],
            heading: '### Inline notification > #### Best practices:',
            lines: '166–194'
          }
        },
        {
          id: 'type-toast',
          heading: 'Toast notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a toast for brief, noncritical feedback that should not take over the current task. Set timing, placement, and queue behavior only when the product defines them; keep required decisions and critical information available.'
            }
          ],
          demoRefs: ['notifications-toast-brief'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '244–294' }],
            heading: '### Toast > #### Long messages / #### Best practices:',
            lines: '195–235'
          }
        },
        {
          id: 'type-actionable',
          heading: 'Actionable notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Offer a concise, relevant next step when it helps resolve or continue the task. Do not assume an actionable notice takes focus; preserve the user’s current context unless the interaction pattern requires otherwise.'
            }
          ],
          demoRefs: ['notifications-actionable-or-modal'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '171–189, 297–351' }],
            heading: '### Actionable > #### Best practices:',
            lines: '236–268'
          }
        },
        {
          id: 'type-callout',
          heading: 'Callout notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a callout for supporting guidance that stays close to the content it explains. Distinguish guidance from a status update or task result, and avoid redundant copy.'
            }
          ],
          demoRefs: ['notifications-callout-on-load'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '353–441' }],
            heading: '### Callout > #### Best practices:',
            lines: '269–296'
          }
        },
        {
          id: 'type-banner',
          heading: 'Banner notification (Experimental)',
          level: 3,
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Experimental source concept: Banner guidance in the maintained local reference is explicitly marked work-in-progress and subject to further iteration.'
            },
            {
              type: 'prose',
              text: 'A banner may provide a broad, high-visibility update. Its placement, dismissal, duration, and persistence require product-specific decisions; the experimental concept makes no behavioral guarantee.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Banner > #### Best practices:',
            lines: '297–324'
          }
        },
        {
          id: 'type-panel',
          heading: 'Notification panel (Experimental)',
          level: 3,
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Experimental source concept: Notification panel guidelines are flagged work-in-progress needing additional research in the maintained local reference.'
            },
            {
              type: 'prose',
              text: 'A panel may collect notices for review outside the immediate task. History, ordering, grouping, unread state, preferences, and retention must be defined by the product; the experimental concept does not specify them.'
            }
          ],
          demoRefs: ['notifications-panel-review'],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Notification panel > #### Best practices:',
            lines: '325–358'
          }
        },
        {
          id: 'type-modal',
          heading: 'Dialog for blocking decisions (related interaction)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use Dialog or Alert Dialog when the user must make a blocking decision or acknowledge information. This is an interaction pattern, not another notification presentation; choose it only when blocking is necessary.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Modal > #### Best practices:',
            lines: '359–379'
          }
        }
      ]
    },
    {
      id: 'considerations',
      heading: 'Considerations when designing',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Considerations when designing',
        lines: '380–381'
      },
      children: [
        {
          id: 'considerations-priority',
          heading: 'Notification priority and contrast',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use the product’s semantic color and contrast system consistently. Make urgency legible through wording and structure as well as color.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### Notification priority',
            lines: '382–395'
          }
        },
        {
          id: 'considerations-user-action',
          heading: 'General user action: optional vs. required',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Separate optional suggestions (where dismissing or ignoring allows normal workflow continuation) from required responses (which block workflow completion until the operator acts or resolves the condition).'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            heading: '### General user action > #### Optional action / #### Required action',
            lines: '396–417'
          }
        },
        {
          id: 'considerations-message',
          heading: 'Writing notification messages',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a clear title and concise body without repeating the same information. Include enough context for events received outside the active task, and describe a recovery step when one is known.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/notification-pattern/index.md',
            related: [{ path: 'components/notification/usage.md', lines: '156–167' }],
            heading: '### Notification message',
            lines: '418–438'
          }
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
          text: 'Provide accessible status announcements for updates that do not receive focus (WCAG 4.1.3 Status Messages). Avoid time limits that prevent users from reading or acting on important notices (WCAG 2.2.4), and let users manage interruptions where applicable (WCAG 2.2.3). Keep keyboard focus stable unless a blocking interaction requires a deliberate focus change.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        related: [{ path: 'components/notification/usage.md', lines: '450–465' }],
        heading: '## Accessibility',
        lines: '439–450'
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
            { label: 'Alert & Toast', kind: 'component' },
            { label: 'Dialog', kind: 'component' },
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Status indicators', kind: 'pattern' },
            { label: 'Error states (planned future reference)', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/notification-pattern/index.md',
        heading: '## Related components and patterns',
        lines: '451–471'
      }
    }
  ],
  demos: [
    {
      id: 'notifications-inline-context',
      title: 'Keep important status in context',
      sectionId: 'type-inline',
      secondarySectionIds: ['notification-status', 'considerations-message'],
      mappingStatus: 'mapped',
      scenario: 'Show concise status feedback beside the task or content it affects.',
      teaching: {
        meaning: 'An inline notification reports task status beside the work it affects.',
        decision:
          'Choose event category, status, and presentation independently; make any next step clear when one is needed.',
        consider: 'Keep the message concise and make status understandable without relying on color alone.'
      },
      interactive: false
    },
    {
      id: 'notifications-toast-brief',
      title: 'Confirm a completed action briefly',
      sectionId: 'type-toast',
      mappingStatus: 'mapped',
      scenario: 'Show brief, noncritical confirmation after a routine action without taking over the current task.',
      teaching: {
        meaning: 'A toast gives brief feedback after an action completes without taking over the page.',
        decision:
          'The toast preview illustrates a local message only; timing, placement, and queue behavior are not defined by this guide.',
        consider: 'Never place required actions or critical unrecovered failures inside timed toasts.'
      },
      interactive: true
    },
    {
      id: 'notifications-callout-on-load',
      title: 'Keep field guidance close to its control',
      sectionId: 'type-callout',
      mappingStatus: 'mapped',
      scenario: 'Show a short informational note beside the control it explains.',
      teaching: {
        meaning:
          'A callout is present when the page first loads and stays beside the relevant control as persistent context.',
        decision: 'Keep guidance close to the related control and separate it from status feedback.',
        consider: 'If the message reports an event or action result, choose a status presentation instead.'
      },
      interactive: false
    },
    {
      id: 'notifications-panel-review',
      title: 'Review sample notifications in a panel',
      sectionId: 'type-panel',
      secondarySectionIds: ['when-system-generated'],
      mappingStatus: 'mapped',
      scenario: 'Explore how multiple notices might be presented together in a panel.',
      teaching: {
        meaning: 'A notification panel is a possible place to review multiple notices outside the immediate task.',
        decision:
          'This concept is experimental. History, ordering, grouping, unread state, retention, and preferences need product decisions.',
        consider: 'The local sample does not model a notification service or stored history.'
      },
      interactive: true,
      _demoNote:
        'The panel is a local illustration with sample items and status labels; it does not implement history, unread state, preferences, grouping, or deduplication. The experimental status is called out in the panel use case.'
    },
    {
      id: 'notifications-actionable-or-modal',
      title: 'Offer a next step or acknowledge a critical notice',
      sectionId: 'type-actionable',
      secondarySectionIds: ['type-modal', 'accessibility'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare a contextual next step, an experimental broad update concept, and a blocking acknowledgement interaction.',
      teaching: {
        meaning:
          'An actionable notice offers a relevant next step; a dialog is a separate interaction for a blocking acknowledgement.',
        decision:
          'Do not assume a timeout or focus change. Use a dialog only when the user must respond before continuing.',
        consider:
          'The dialog sample uses Alert Dialog; the broad update is a dismissible local Alert illustration, not a global Banner implementation.'
      },
      interactive: true,
      _demoNote:
        'The contextual action changes only local helper text. The blocking acknowledgement uses Alert Dialog as an interaction pattern. The broad update is labeled experimental and does not implement global placement or persistence.'
    }
  ],
  notes: [],
  components: ['Alert', 'Toast', 'AlertDialog', 'Button']
}
