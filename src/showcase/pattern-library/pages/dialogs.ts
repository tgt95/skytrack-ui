import type { PatternPageDraft } from './types'

export const PAGE_DIALOGS: PatternPageDraft = {
  id: 'dialogs',
  title: 'Dialogs',
  group: 'Core',
  source: {
    status: 'Universal',
    _primaryPath: 'docs/carbon-ds-reference/patterns/dialog-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 16–27)',
      '## References (lines 508–527)',
      '## Feedback (lines 528–534)'
    ]
  },
  summary:
    'Dialogs place a focused task or consequential message on top of an active workspace. Modal dialogs interrupt workflow until answered or dismissed; non-modal dialogs keep underlying content accessible for side-by-side work.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use dialogs to surface urgent notices, focused decisions, or lightweight supporting tasks without navigating away from the current screen.'
        }
      ],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Overview', lines: '28–39' },
      children: [
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a dialog',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Header: concise title matching the task or button label, optional context line above the title, and an upper-right close icon.',
                'Body content: form fields, message copy, or supporting controls—short-title confirmation dialogs may omit body text when the title itself carries the message.',
                'Action bar: footer action buttons with specific verb labels (such as Add, Save, or Delete); avoid vague "Done" or "OK" labels.',
                'Close icon: explicit upper-right dismiss trigger that exits without submitting.',
                'Backdrop overlay (modal dialogs only): dims and blocks interaction with the page behind.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Anatomy of a dialog (plus Title-as-message note in modal/usage.md:237–242)',
            lines: '40–59'
          }
        },
        {
          id: 'overview-when-to-use',
          heading: 'When to use a dialog',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose a dialog when an immediate decision, error acknowledgment, or short task belongs inline with the active screen—or when a floating helper needs to stay open alongside page work.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When to use a dialog',
            lines: '60–66'
          }
        },
        {
          id: 'overview-when-not-to-use',
          heading: 'When not to use a dialog',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Avoid dialogs for lengthy multi-step work, cross-record browsing, or passive background notices generated without user intent—route those to notifications, panels, or dedicated pages.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When not to use a dialog',
            lines: '67–73'
          }
        },
        {
          id: 'overview-dialog-types',
          heading: 'Dialog types',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Modal dialog',
                  whenToUse:
                    'The operator must respond, review urgent consequences, or resolve a blocking decision before touching the underlying view.',
                  whenNotToUse: 'The operator needs to read, copy, or manipulate the page behind the dialog.'
                },
                {
                  title: 'Non-modal dialog',
                  whenToUse:
                    'The operator benefits from a floating helper or inspector while keeping page controls interactive.',
                  whenNotToUse: 'The workflow requires a mandatory decision before allowing further page changes.'
                }
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Dialog types', lines: '74–98' }
        },
        {
          id: 'overview-best-practices',
          heading: 'Best practices',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Best practices', lines: '99–100' },
          children: [
            {
              id: 'overview-use-sparingly',
              heading: 'Use dialogs sparingly',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Frequent modal interruptions break concentration and slow operators down; reserve blocking surfaces for truly high-value interruptions.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Use dialogs sparingly',
                lines: '101–108'
              }
            },
            {
              id: 'overview-user-initiated',
              heading: 'Dialogs should be user initiated',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Open a dialog directly from a user trigger—or an indirect consequence of an action just attempted (such as closing a dirty tab)—rather than from unsolicited background events.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Dialogs should be user initiated',
                lines: '109–120'
              }
            },
            {
              id: 'overview-keep-focused',
              heading: 'Keep dialog tasks simple and focused',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Limit a dialog to one self-contained goal that completes cleanly in place without sprawling layouts.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Keep dialog tasks simple and focused',
                lines: '121–129'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'modal-dialogs',
      heading: 'Modal dialogs',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Modal dialogs lock background content behind a dimmed overlay so the operator completes or dismisses the task before continuing.'
        }
      ],
      demoRefs: ['dialogs-modal-confirm'],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Modal dialogs', lines: '130–149' },
      children: [
        {
          id: 'modal-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### When to use', lines: '150–151' },
          children: [
            {
              id: 'modal-immediate-response',
              heading: 'An immediate response is required',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use when downstream workflow state depends on an immediate choice or short input before proceeding.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### An immediate response is required from the user',
                lines: '152–156'
              }
            },
            {
              id: 'modal-urgent-information',
              heading: 'Notify the user of urgent information',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use for critical warnings or blocking failures that operators must acknowledge immediately.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Notify the user of urgent information',
                lines: '157–162'
              }
            },
            {
              id: 'modal-confirm-decision',
              heading: 'Confirm a user decision',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use before committing irreversible or high-risk actions so the operator verifies scope and consequences (escalating to danger styling when destructive).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Confirm a user decision',
                lines: '163–169'
              }
            }
          ]
        },
        {
          id: 'modal-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When not to use',
            lines: '170–171'
          },
          children: [
            {
              id: 'modal-prevents-page-access',
              heading: 'Modals prevent access to the main page',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'If the operator needs to compare map coordinates, inspect underlying records, or run repeated actions against the workspace, choose a non-modal surface or side panel instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Modals prevent access to the main page',
                lines: '172–180'
              }
            },
            {
              id: 'modal-do-not-nest',
              heading: 'Do not nest modals',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Never stack one modal over another. Layering overlays disorients keyboard users and hides origin context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Don’t nest modals',
                lines: '181–186'
              }
            },
            {
              id: 'modal-no-full-page',
              heading: 'Do not make modals full page',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'A modal that fills the viewport signals the wrong container choice—navigate to a dedicated page or stepped flow instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Don’t make modals full page',
                lines: '187–192'
              }
            }
          ]
        },
        {
          id: 'modal-variants',
          heading: 'Modal variants',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Variant', 'Purpose', 'Footer actions'],
              rows: [
                ['Passive', 'Deliver non-blocking confirmation or status without requiring an action choice', 'None'],
                [
                  'Transactional',
                  'Collect short input or confirm/cancel an action (includes Danger variant for destructive commitments)',
                  'Cancel + Primary action (or Danger primary)'
                ],
                [
                  'Acknowledgment',
                  'Require explicit reading acknowledgment of an urgent system condition',
                  'Single specific acknowledgment button (avoid vague OK/Done)'
                ],
                [
                  'Progress',
                  'Guide a bounded multi-step dialog flow',
                  'Cancel + Previous + Next / final completion verb'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            related: [{ path: 'components/modal/usage.md', lines: '80–89' }],
            heading: '### Modal variants',
            lines: '193–205'
          }
        },
        {
          id: 'modal-dismissing',
          heading: 'Dismissing variant modals',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Passive modals close via the close icon, Escape key, or clicking the backdrop overlay. Transactional, Danger, Acknowledgment, and Progress modals close only on task completion, explicit Cancel, the close icon, or Escape—never on an accidental backdrop click.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Dismissing variant modals',
            lines: '206–225'
          }
        }
      ]
    },
    {
      id: 'non-modal-dialogs',
      heading: 'Non-modal dialogs',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Non-modal dialogs render floating surfaces without locking the page, allowing operators to inspect workspace items, switch focus freely, and move the panel if it obscures underlying details.'
        }
      ],
      demoRefs: ['dialogs-non-modal-inspect'],
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Non-modal dialogs', lines: '226–239' },
      children: [
        {
          id: 'non-modal-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### When to use', lines: '240–241' },
          children: [
            {
              id: 'non-modal-page-access',
              heading: 'When access to the page is needed',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Choose non-modal when users must inspect or edit the active canvas—and optionally reposition the floating panel so nothing stays hidden.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### When access to the page is needed',
                lines: '242–251'
              }
            },
            {
              id: 'non-modal-accelerate-workflow',
              heading: 'Aid or accelerate a workflow',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Support repeatable utilities such as find-and-replace or quick property adjustments across multiple selections without reopening a dialog on every step.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Aid or accelerate a user’s work flow',
                lines: '252–259'
              }
            },
            {
              id: 'non-modal-additional-info',
              heading: 'Display additional information',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Surface supplemental contextual records or hints while keeping primary work uninterrupted.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Display additional information',
                lines: '260–265'
              }
            }
          ]
        },
        {
          id: 'non-modal-when-not-to-use',
          heading: 'When not to use',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### When not to use',
            lines: '266–267'
          },
          children: [
            {
              id: 'non-modal-not-for-required-response',
              heading: 'Do not use if a response is required',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'If continuing safely requires an immediate user answer or confirmation, block the page with a modal instead.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Don’t use if the user’s response is required',
                lines: '268–272'
              }
            }
          ]
        },
        {
          id: 'non-modal-variants',
          heading: 'Non-modal variants',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Passive non-modal',
                  whenToUse: 'Supplemental information or preview without embedded footer actions.'
                },
                {
                  title: 'Transactional non-modal',
                  whenToUse:
                    'One or more repeatable action triggers (such as Find Next / Replace) that stay open across invocations until manually closed.'
                }
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Non-modal variants',
            lines: '273–279'
          }
        },
        {
          id: 'non-modal-dismissing',
          heading: 'Dismissing non-modal dialogs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Non-modal dialogs close intentionally via the header close icon, Cancel, or Escape. Clicking onto the surrounding workspace keeps the dialog open so users can reference both.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Dismissing non-modal dialogs',
            lines: '280–289'
          }
        }
      ]
    },
    {
      id: 'designing-with-dialogs',
      heading: 'Designing with dialogs',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Consistent button grouping, focus management, sizing, and component restraint keep dialogs fast to scan and reliable under keyboard navigation.'
        }
      ],
      _sourceCitation: {
        path: 'patterns/dialog-pattern/index.md',
        heading: '## Designing with dialogs',
        lines: '290–291'
      },
      children: [
        {
          id: 'designing-button-groups',
          heading: 'Button groups',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Anchor the footer cleanly along the bottom edge, keeping Cancel farthest left and at most one primary action farthest right. Wait—note that full-bleed 25%/50% spans reflect container-edge styling conventions alongside padded dialog footers.'
            }
          ],
          demoRefs: ['dialogs-button-groups'],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            related: [{ path: 'components/modal/style.md', lines: '108–118' }],
            heading: '### Button groups',
            lines: '292–305'
          },
          children: [
            {
              id: 'button-groups-one',
              heading: 'One button',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Used for single-action acknowledgments, spanning 50% width aligned to the right edge with specific labeling rather than vague "Done" or "OK".'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### One button',
                lines: '306–312'
              }
            },
            {
              id: 'button-groups-two',
              heading: 'Two buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Splits the footer 50/50 between secondary Cancel on the left and the primary commitment action on the right.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Two buttons',
                lines: '313–318'
              }
            },
            {
              id: 'button-groups-three',
              heading: 'Three buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Uses 25%-width action slots right-aligned after left-anchored Cancel, applying primary emphasis strictly to the rightmost action—or styling all three secondary when equal weight is intended.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Three buttons',
                lines: '319–325'
              }
            },
            {
              id: 'button-groups-progress',
              heading: 'Progress indicator buttons',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Places ghost-style Cancel (25%) at the far left opposite secondary Previous (25%) and primary Next (25%) on the right, renaming Next on the final step to the concrete completion verb.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Progress indicator buttons',
                lines: '326–336'
              }
            }
          ]
        },
        {
          id: 'designing-behaviors',
          heading: 'Behaviors',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Behaviors', lines: '337–338' },
          children: [
            {
              id: 'behaviors-trigger',
              heading: 'Trigger',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Launch modals from clear interactive triggers such as toolbar actions, menu items, links, or status errors without auto-spawning unexpectedly.'
                }
              ],
              _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '#### Trigger', lines: '339–344' }
            },
            {
              id: 'behaviors-focus',
              heading: 'Focus',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'On open, trap keyboard focus inside the dialog and move focus directly to the first interactive body control (or to the primary footer action when the body contains no inputs). Return focus to the invoking trigger on close.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                related: [{ path: 'components/modal/usage.md', lines: '265' }],
                heading: '#### Focus',
                lines: '345–350'
              }
            },
            {
              id: 'behaviors-scrolling',
              heading: 'Scrolling',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Constrain dialogs to four responsive height tiers (xs 48%, sm 72%, md 84%, lg 96% viewport max-height; full-height scrolling on mobile viewports). Keep the header and footer fixed while only the body scrolls vertically with edge fades; never introduce horizontal scrolling.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                related: [{ path: 'components/modal/style.md', lines: '133–196' }],
                heading: '#### Scrolling',
                lines: '351–356'
              }
            },
            {
              id: 'behaviors-validation',
              heading: 'Validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep invalid dialogs open until fixed. Validate client rules when focus leaves each field (on blur) and clear errors immediately once corrected; display server-side failures in an inline alert, and favor constrained controls (radios, selects) to prevent typos.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Validation',
                lines: '357–384'
              }
            },
            {
              id: 'behaviors-task-completion-loading',
              heading: 'Task completion and loading',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'For short processing waits inside a modal, display body-level loading feedback and lock the primary button against duplicate submission (or show inline button loading). If an operation takes more than a few seconds, close or hand off the dialog and surface measurable progress cleanly elsewhere on screen.'
                }
              ],
              demoRefs: ['dialogs-long-task-progress'],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                related: [{ path: 'components/modal/usage.md', lines: '283–285' }],
                heading: '#### Task completion and loading',
                lines: '385–399'
              }
            }
          ]
        },
        {
          id: 'designing-using-components',
          heading: 'Using components',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Select simple inputs, selection lists, switches, and structured summaries inside dialog bodies, avoiding patterns that pull attention away or create heavy nesting:'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Using components',
            lines: '400–408'
          },
          children: [
            {
              id: 'using-components-no-exit-links',
              heading: 'Avoid components that direct the user away from the dialog',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep external navigation links out of dialog copy so operators are not pulled mid-task away from an unfinished modal decision.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Avoid components that will direct the user away from the dialog',
                lines: '409–415'
              }
            },
            {
              id: 'using-components-no-hidden-info',
              heading: 'Avoid components that hide information',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Do not place tabs or accordions inside a dialog; if content needs multiple panes, move the workflow to a side panel, tearsheet, or dedicated page.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Avoid components that hide information',
                lines: '416–424'
              }
            },
            {
              id: 'using-components-no-complex-tables',
              heading: 'Avoid complex interactions with data tables',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep any embedded table selection-only rather than exposing inline row editing, filters, or overflow action menus—or swap to structured lists or tiles.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/dialog-pattern/index.md',
                heading: '#### Avoid complex interactions with data tables',
                lines: '425–443'
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
      _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '## Accessibility', lines: '445–446' },
      children: [
        {
          id: 'a11y-focus',
          heading: 'Focus management',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Move focus directly onto the first focusable body input when opening a modal (never landing first on footer buttons when inputs exist), confine Tab and Shift+Tab within the dialog, and restore focus to the opener button upon close.'
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Focus', lines: '447–469' }
        },
        {
          id: 'a11y-keyboard-navigation',
          heading: 'Keyboard navigation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Support Escape to dismiss non-critical dialogs cleanly, Tab/Shift+Tab to cycle controls, Space/Enter to toggle selections, and Enter on text inputs or focused actions only where safe.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/dialog-pattern/index.md',
            heading: '### Keyboard navigation',
            lines: '470–476'
          }
        },
        {
          id: 'a11y-tab-order',
          heading: 'Tab order',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'First interactive control inside the dialog body',
                'Remaining body controls left-to-right, top-to-bottom',
                'Primary footer action',
                'Secondary footer action (Cancel)',
                'Header close (×) icon button last'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### Tab order', lines: '477–485' }
        },
        {
          id: 'a11y-aria',
          heading: 'ARIA semantics',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Expose modal dialog role and title labeling, mark background content inert when modal, and describe urgency accurately when confirmation guards destructive state.'
            }
          ],
          _sourceCitation: { path: 'patterns/dialog-pattern/index.md', heading: '### ARIA', lines: '486–491' }
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
            { label: 'Dialog', kind: 'component' },
            { label: 'Button', kind: 'component' },
            { label: 'Common actions', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/dialog-pattern/index.md',
        heading: '## Related components and patterns',
        lines: '492–507'
      }
    }
  ],
  demos: [
    {
      id: 'dialogs-modal-confirm',
      title: 'Modal · confirm a route change',
      sectionId: 'modal-dialogs',
      secondarySectionIds: ['modal-confirm-decision', 'behaviors-validation'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Ask for the replacement route name before the pilot confirms a consequential change, then show the confirmation after the modal closes.',
      teaching: {
        meaning:
          'A modal asks the user to decide before returning to the blocked page. It fits a consequential route change only when confirmation is required to continue.',
        decision:
          'Use a modal for a required response or urgent information; keep the task short and user-initiated. Use a non-modal surface when the page must remain accessible.',
        consider:
          'Validate the required route name on confirmation; clear the inline error as soon as the name is valid and keep focus inside the modal.'
      },
      interactive: true,
      _demoNote:
        'The route-name field validates on blur and on confirmation; entering a valid name clears the inline error before the local confirmation closes the modal.'
    },
    {
      id: 'dialogs-non-modal-inspect',
      title: 'Non-modal · inspect a route while keeping the page available',
      sectionId: 'non-modal-dialogs',
      secondarySectionIds: ['non-modal-page-access'],
      mappingStatus: 'mapped',
      scenario: 'Keep waypoint details readable beside the map or table without blocking interaction on the main page.',
      teaching: {
        meaning: 'A non-modal dialog presents supporting information while users can still work with the page.',
        decision:
          'Choose it when the user benefits from extra detail—or repeatable workflow helpers—without blocking access to underlying controls.',
        consider:
          'Keep the floating surface dismissible via close icon, Cancel, or Escape rather than outside clicks, and avoid obscuring underlying reference details.'
      },
      interactive: true
    },
    {
      id: 'dialogs-button-groups',
      title: 'Button groups · one, two, or three decisions',
      sectionId: 'designing-button-groups',
      secondarySectionIds: ['button-groups-one', 'button-groups-two', 'button-groups-three', 'button-groups-progress'],
      mappingStatus: 'partial-divergent',
      scenario: 'Compare single-action acknowledgment, two-button confirmation, and multi-decision dialog footers.',
      teaching: {
        meaning:
          'Dialog actions should make the available choice and its consequence clear. More choices add comparison work.',
        decision:
          'Use one action for explicit acknowledgment, two for Cancel + Primary confirmation, three only when a third distinct choice is essential, and Progress groups for bounded multi-step dialogs.',
        consider:
          'Put Cancel at the far left and at most one Primary action farthest right; replace vague labels like "Done" or "OK" with outcome verbs like "Acknowledge".'
      },
      interactive: true,
      _demoNote:
        'Acknowledgment uses an outcome verb and the required-response dialog now presents three distinct choices. Footer spacing remains package-specific.'
    },
    {
      id: 'dialogs-long-task-progress',
      title: 'Show progress after confirming a longer task',
      sectionId: 'behaviors-task-completion-loading',
      mappingStatus: 'partial-divergent',
      scenario:
        'After a dispatcher confirms a longer route check, close the dialog and show persistent on-page progress until validation completes.',
      teaching: {
        meaning:
          'A progress indicator communicates that a confirmed dialog task is still underway without trapping the operator inside a frozen modal.',
        decision:
          'Use inside-dialog loading for short waits, and hand off to persistent page-level progress whenever work takes longer than a few seconds.',
        consider:
          'Do not leave users unsure whether the dialog can close or whether the action finished; provide clear completion and failure recovery.'
      },
      interactive: true,
      _demoNote:
        'A confirmation dialog now starts the route check and closes before page-level progress appears; failure recovery remains outside this sample.'
    }
  ],
  notes: [
    {
      kind: 'implementation',
      text: 'SkyTrack DialogFooter uses aligned padded action spacing; if building edge-to-edge modal footers, note the full-bleed 50%/25% layout conventions in the source design.'
    }
  ],
  components: ['Dialog', 'AlertDialog', 'Button', 'Progress']
}
