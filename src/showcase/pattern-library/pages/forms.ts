import type { PatternPageDraft } from './types'

export const PAGE_FORMS: PatternPageDraft = {
  id: 'forms',
  title: 'Forms',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Exploratory / incomplete areas in the reference source: In-line editing inside forms, horizontal dividing Rules between sections, and Accordion forms (beyond dialog bans) do not yet have finalized source guidance.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/forms-pattern/index.md',
    _relatedSources: [{ path: 'components/form/usage.md' }],
    _excludedSections: [
      '### Quick Navigation (lines 15–27)',
      '## References / ### Further reading (lines 811–849)',
      '## Feedback (lines 850–854)'
    ],
    _upstreamAnomalies: [
      'Source repeats "### Deciding what to use" three times (under Text inputs, Selection controls, Bound entry controls); headings are scoped clearly under each parent here.',
      'Source line 168 contains truncated alert heading "DON\'T: DON" above the (optional)-on-complex-forms warning; line 243 leaves an authoring placeholder about MultiSelect examples.'
    ]
  },
  summary:
    'Forms gather structured operator inputs through scannable labels, minority-marked required or optional indicators, purposeful control selection, immediate blur validation, and layouts sized to workflow complexity.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Effective forms ask only for what the workflow truly requires, present controls in logical domain order, and match the validation and button layout to the task length.'
        }
      ],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Overview', lines: '28–29' },
      children: [
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use structured forms whenever users configure resources, enter request parameters, update account or operational records, or submit transactional tasks.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### When to use', lines: '30–42' }
        },
        {
          id: 'overview-respect-user',
          heading: 'Respect the user',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Privacy by design: request only data necessary to complete the task cleanly.',
                'Logical grouping and sequence: group related controls under clear headings in the order users expect (for instance, given name before family name).',
                'Low friction: minimize switching between keyboard typing and mouse clicking, preserve compatibility with password managers and browser autofill, and reveal optional branches progressively.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Respect the user', lines: '43–60' }
        },
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a form',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Labels: identify every control above the input.',
                'Text inputs: collect freeform text, secrets, and multi-line notes.',
                'Data inputs: constrain selection or structured values via choices and bound pickers.',
                'Help mechanisms: helper text, tooltips, placeholders, and safe defaults.',
                'Action buttons: commit, advance, or abandon the form.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Anatomy of a form', lines: '61–79' }
        }
      ]
    },
    {
      id: 'building-a-form',
      heading: 'Building a form',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Select every field control, label marker, help layer, and footer button intentionally so operators finish quickly with minimal preventable errors.'
        }
      ],
      demoRefs: ['forms-contact-details'],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Building a form', lines: '80–81' },
      children: [
        {
          id: 'building-labels',
          heading: 'Labels',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Write short, sentence-case labels of one to three words with no trailing colons so eyes scan straight down without visual noise.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Labels', lines: '82–98' },
          children: [
            {
              id: 'labels-top-aligned',
              heading: 'Top-aligned labels',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Place labels consistently directly above every input control to speed vertical scanning and keep horizontal widths flexible across languages.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Top-aligned labels',
                lines: '99–113'
              }
            }
          ]
        },
        {
          id: 'building-optional-vs-mandatory',
          heading: 'Optional versus mandatory fields',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Always mark only the minority state rather than decorating every field on screen.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Optional vs. mandatory',
            lines: '114–158'
          },
          children: [
            {
              id: 'optional-when-to-use',
              heading: 'When to mark optional vs. required',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'On short or mostly mandatory forms, append "(optional)" exclusively to optional fields and leave required fields unmarked. On longer or complex forms where most inputs are optional, append "(required)" exclusively to mandatory fields.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### When to use',
                lines: '159–171'
              }
            },
            {
              id: 'optional-best-practices',
              heading: 'Best practices for field requirement marking',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Apply one rule consistently across all sibling forms of the same category across the platform, and cluster numerous optional fields into their own clearly headed section.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Best practices',
                lines: '172–184'
              }
            }
          ]
        },
        {
          id: 'building-text-inputs',
          heading: 'Text inputs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose between single-line text inputs, masked password fields, and multi-line text areas based on expected answer length, and place initial focus on the first required field upon form entry when appropriate.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Text inputs > ### Deciding what to use > #### Best practices',
            lines: '185–212'
          }
        },
        {
          id: 'building-data-inputs',
          heading: 'Data inputs',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Replace freeform typing with structured controls whenever allowable values are enumerable or bounded.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Data inputs', lines: '213–219' },
          children: [
            {
              id: 'data-selection-controls',
              heading: 'Selection controls',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use checkboxes, radio groups, switches, dropdowns/selects, and file uploaders to constrain discrete picks:'
                },
                {
                  type: 'table',
                  columns: ['Control', 'Use rule & layout constraint'],
                  rows: [
                    [
                      'Radio buttons',
                      'Mutually exclusive picks up to 5 choices stacked vertically; pre-select the safest default and add "None" if null is allowed'
                    ],
                    ['Checkboxes', 'Multi-select independent choices up to 5 options stacked vertically'],
                    [
                      'Toggle / Switch',
                      'Instant binary on/off preference with immediate effect; label the controlled attribute clearly'
                    ],
                    [
                      'Select / Combo box / Multiselect',
                      'Mandatory swap whenever choices exceed 5 options so long lists do not overwhelm form flow'
                    ]
                  ]
                }
              ],
              demoRefs: ['forms-optional-checks'],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading:
                  '#### Selection controls > ### Deciding what to use > #### Radio buttons / checkboxes / Toggles / Select lists',
                lines: '220–270'
              }
            },
            {
              id: 'data-bound-entry',
              heading: 'Bound entry controls',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Use number steppers, sliders, date pickers, and time pickers whenever inputs follow strict numeric bounds or calendar constraints—preventing malformed entries upfront so freeform text validation is unnecessary.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Bound entry controls > ### Deciding what to use',
                lines: '271–292'
              }
            }
          ]
        },
        {
          id: 'building-offering-help',
          heading: 'Offering help',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Reserve each help layer for a clear role so hints remain accessible after typing starts:'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Offering help', lines: '293–294' },
          children: [
            {
              id: 'help-tooltips',
              heading: 'Tooltips',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'do',
                  text: 'Pair optional background clarifications with an outlined "i" info icon trigger beside the label (or inside internal-label fluid inputs).'
                },
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not use question-mark (?) icons or hide essential formatting rules behind hover/focus tooltips.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: "#### Tooltips > Do / Don't",
                lines: '295–325'
              }
            },
            {
              id: 'help-helper-text',
              heading: 'Helper text',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'do',
                  text: 'Place concise, essential rules directly under labels (shorter than the input width) where text stays visible during focus. When two side-by-side controls differ in helper length, top-align the input boxes themselves rather than misaligning boxes to keep labels level.'
                },
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not write full paragraphs inside field helper text.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: "#### Helper text > Do / Don't",
                lines: '326–356'
              }
            },
            {
              id: 'help-placeholder-text',
              heading: 'Placeholder text',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'do',
                  text: 'Limit placeholders to brief, anonymized example formatting cues that reinforce (never replace) the label and helper text.'
                },
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Never rely on placeholder text as a substitute for visible labels or essential instructions, because placeholders vanish on input.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: "#### Placeholder text > Do / Don't",
                lines: '357–379'
              }
            },
            {
              id: 'help-default-values',
              heading: 'Default values',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pre-fill safe, verifiable defaults—such as today’s date on start pickers or standard environment quotas—only when accuracy is high and unintentional submission carries low risk.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Default values',
                lines: '380–397'
              }
            }
          ]
        },
        {
          id: 'building-buttons',
          heading: 'Buttons',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Buttons', lines: '398–402' },
          children: [
            {
              id: 'buttons-alignment',
              heading: 'Button alignment and margins',
              level: 4,
              blocks: [
                {
                  type: 'table',
                  columns: ['Form surface', 'Horizontal edge / layout', 'Primary vs. Secondary order'],
                  rows: [
                    [
                      'Standard in-page form',
                      'Left-aligned with margins',
                      'Primary farthest left, Secondary (Cancel) right of it'
                    ],
                    [
                      'Multi-step wizard',
                      'Right-aligned with margins',
                      'Secondary (Cancel) left of Primary Next / final verb on the right'
                    ],
                    [
                      'Dialog or Side panel',
                      'Full-width bottom bleed',
                      'Cancel left, single Primary action farthest right (stack with Primary lowest if copy wraps)'
                    ]
                  ]
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Button alignment / Margins vs. full bleed / Button emphasis',
                lines: '403–452'
              }
            },
            {
              id: 'buttons-not-top-aligned',
              heading: 'Keep action bars at the bottom of the form',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Never place form submit buttons above fields at the top of a page; anchor actions below the last input (48px gap) so natural top-to-bottom progression leads to submission.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Do not top-align buttons',
                lines: '453–482'
              }
            },
            {
              id: 'buttons-naming-actions',
              heading: 'Naming form actions',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Avoid generic "Submit" buttons—name the real outcome ("Save plan", "Create route", "Request flight"). Never use a secondary footer button labeled "Back" inside stepped forms; let users return through clickable progress steps, breadcrumbs, or browser history while reserving secondary buttons for Cancel.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Naming actions (+ line 466 Back ban)',
                lines: '466–496'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'behavior',
      heading: 'Behavior',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Behavior', lines: '498–499' },
      children: [
        {
          id: 'behavior-errors-validation',
          heading: 'Errors and validation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Surface validation feedback close to the broken field without clearing valid user work.'
            }
          ],
          demoRefs: ['forms-validation-recovery'],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Errors and validation',
            lines: '500–506'
          },
          children: [
            {
              id: 'validation-client-side',
              heading: 'Client-side validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Validate format and required rules when focus leaves each control (on blur) rather than nagging mid-keystroke or only on submit, and remove the inline error immediately once corrected.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Client-side validation',
                lines: '507–530'
              }
            },
            {
              id: 'validation-server-side',
              heading: 'Server-side validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair server rejection messages with an inline alert summarizing what prevented saving alongside targeted field errors, clearing resolved errors cleanly on re-submission.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Server-side validation',
                lines: '531–546'
              }
            }
          ]
        },
        {
          id: 'behavior-enabling-disabling-buttons',
          heading: 'Enabling and disabling buttons',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Reserve pre-validation disabling strictly for short, compact forms whose entire input set fits comfortably above the fold. On longer forms where offending fields may scroll out of sight, keep the primary submit button enabled so clicking validates and focuses the error—disabling the button only during active in-flight submission to prevent duplicate posts.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Enabling and disabling buttons',
            lines: '547–560'
          }
        },
        {
          id: 'behavior-inline-editing',
          heading: 'In-line editing',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Source limit: consolidated guidance for in-line table or value editing inside forms is incomplete in the maintained local reference.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### In-line editing', lines: '561–570' }
        },
        {
          id: 'behavior-longer-forms',
          heading: 'Designing for longer forms',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Structure complex workflows so operators tackle manageable decisions sequentially rather than facing a wall of unrelated fields:'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Designing for longer forms',
            lines: '571–578'
          },
          children: [
            {
              id: 'longer-progressive-disclosure',
              heading: 'Progressive disclosure',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Hide secondary or branch-specific inputs until an earlier choice makes them relevant.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Progressive disclosure',
                lines: '579–588'
              }
            },
            {
              id: 'longer-accordion-forms',
              heading: 'Accordion forms',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'source-limit',
                  text: 'Never embed accordion sections inside dialog forms; accordion form patterns on full pages remain exploratory without consolidated reference standards.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Accordion forms',
                lines: '589–606'
              }
            },
            {
              id: 'longer-multistep-forms',
              heading: 'Multistep forms',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Divide distinct procedural phases across numbered progress steps, preserving entered answers whenever users revisit earlier steps via the progress indicator.'
                }
              ],
              demoRefs: ['forms-multistep-request'],
              _sourceCitation: {
                path: 'patterns/forms-pattern/index.md',
                heading: '#### Multistep forms',
                lines: '607–630'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'designing-a-form',
      heading: 'Designing a form',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Designing a form', lines: '631–632' },
      children: [
        {
          id: 'designing-layout',
          heading: 'Layout and headings',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Pair a clear page or container title with concise group/section subheadings organizing fields into scannable clusters.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Layout > #### Form headings / Group and section headings',
            lines: '633–651'
          }
        },
        {
          id: 'designing-spacing',
          heading: 'Spacing',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use standard 40px default input heights. Apply 32px vertical spacing between inputs on spacious full pages versus 24px or 16px inside compact dialogs/panels, widen to 32px–40px before distinct field groups, and allow 48px before action buttons. Horizontal hairline dividing rules across form sections currently lack finalized source guidance.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/forms-pattern/index.md',
            heading: '### Spacing > #### Form context / Separating... / Rules',
            lines: '652–699'
          }
        },
        {
          id: 'designing-columns',
          heading: 'Columns',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Default to a single vertical column so gaze travels straight downward. Combine two or three inputs horizontally only when they form one tight conceptual cluster—such as First / Middle / Last name, City / State / Postal code, or Card / Expiration / CVC.'
            }
          ],
          _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '### Columns', lines: '700–732' }
        }
      ]
    },
    {
      id: 'variants',
      heading: 'Variants',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Size the host container to field volume and whether page context must remain readable:'
        },
        {
          type: 'variants',
          items: [
            {
              title: 'Dialog forms',
              whenToUse: 'Self-contained interruptions holding fewer than 5 fields.',
              whenNotToUse:
                'Flows exceeding 4 fields, needing vertical tabs/accordions, or requiring background page access.'
            },
            {
              title: 'Side panel forms',
              whenToUse:
                'Forms of 5 or more fields, repeated editing tasks, or entry tasks benefiting from live reference to the page behind (without tabs or accordions).'
            }
          ]
        }
      ],
      _sourceCitation: {
        path: 'patterns/forms-pattern/index.md',
        heading: '## Variants > Deciding what to use > Dialog forms / Side panel forms',
        lines: '733–764'
      }
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Wrap inputs in semantic form elements, associate labels and error messages programmatically, maintain predictable visual Tab order, avoid hiding formatting syntax inside disappearing placeholders, and declare overall form rules and required conventions before users begin traversing inputs.'
        }
      ],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Accessibility', lines: '765–788' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            {
              label: 'Text inputs, Checkbox, Radio, Switch, Select, DatePicker, NumberField, Slider',
              kind: 'component'
            },
            { label: 'Common actions', kind: 'pattern' },
            { label: 'Dialogs', kind: 'pattern' },
            { label: 'Fluid styles', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/forms-pattern/index.md', heading: '## Related', lines: '789–810' }
    }
  ],
  demos: [
    {
      id: 'forms-contact-details',
      title: 'Collect mission contact details',
      sectionId: 'building-a-form',
      secondarySectionIds: ['building-labels', 'optional-when-to-use', 'designing-columns'],
      mappingStatus: 'mapped',
      scenario:
        'Collect essential contact fields with clear labels, helper text, and minority-only optional indicators.',
      teaching: {
        meaning:
          'A form gathers the information needed to complete a task, with labels and required/optional status that users can understand.',
        decision:
          'Ask only for necessary details, mark only the minority state ((optional) on mostly required forms; (required) on complex mostly optional forms), and default to single-column stacking unless fields form a tight cluster.',
        consider:
          'Use concise 1–3 word labels without colons, avoid placeholders as labels, and top-align adjacent inputs when helper lengths differ.'
      },
      interactive: true
    },
    {
      id: 'forms-validation-recovery',
      title: 'Validate and recover from missing information',
      sectionId: 'behavior-errors-validation',
      secondarySectionIds: ['validation-client-side', 'validation-server-side', 'behavior-enabling-disabling-buttons'],
      mappingStatus: 'mapped',
      scenario:
        'Catch client errors on blur, clear resolved errors immediately, and distinguish server-side rejection feedback.',
      teaching: {
        meaning: 'Validation tells users which input needs attention and how to fix it before they continue.',
        decision:
          'Run client checks when focus leaves a field (on blur), keep submit buttons enabled on longer forms so users can locate scrolled errors, and show an inline alert for server rejections.',
        consider:
          'Keep entered values intact, associate each message programmatically with its field, and clear fixed errors immediately.'
      },
      interactive: true
    },
    {
      id: 'forms-multistep-request',
      title: 'Break a long mission request into steps',
      sectionId: 'longer-multistep-forms',
      secondarySectionIds: ['buttons-alignment', 'buttons-naming-actions'],
      mappingStatus: 'mapped',
      scenario:
        'Organize an extended multi-phase request across progress steps while preserving entered values across steps.',
      teaching: {
        meaning: 'A multi-step form divides a longer task into manageable stages with linear progress orientation.',
        decision:
          'Use wizards for genuinely multi-stage tasks, aligning actions on the right (secondary Cancel left of Primary Next / final completion label) rather than placing a "Back" button on secondary footer controls.',
        consider:
          'Let users return to earlier stages via the progress indicator or breadcrumbs without losing entered values.'
      },
      interactive: true
    },
    {
      id: 'forms-optional-checks',
      title: 'Select optional checks for a mission request',
      sectionId: 'data-selection-controls',
      mappingStatus: 'mapped',
      scenario:
        'Present independent multi-select options in a vertical checkbox group (switching to Combobox/Multiselect beyond five items).',
      teaching: {
        meaning: 'Checkboxes let users select independent optional checks that can apply together.',
        decision:
          'Stack Checkbox or Radio controls vertically when options are <= 5 (switch to Select/Combobox when > 5); use Checkbox for non-exclusive sets and Radio with a safe default when mutually exclusive.',
        consider:
          'Pair bound inputs (NumberField, Slider, DatePicker) for bounded numerical or calendar values to eliminate unnecessary freeform validation errors.'
      },
      interactive: true
    }
  ],
  notes: [
    {
      kind: 'source-limit',
      text: 'Maintained source notes that inline form editing, section horizontal divider rules, and accordion forms lack finalized rules (and bans accordions/tabs inside dialog/panel forms).'
    },
    {
      kind: 'implementation',
      text: 'SkyTrack UI ships Radio, Switch, Combobox, NumberField, DatePicker, and Slider to cover the full Data Inputs and Bound Entry taxonomy.'
    }
  ],
  components: [
    'Field',
    'Input',
    'Checkbox',
    'Radio',
    'Switch',
    'Combobox',
    'NumberField',
    'DatePicker',
    'Slider',
    'Button',
    'Alert'
  ]
}
