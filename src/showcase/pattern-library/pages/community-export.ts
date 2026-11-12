import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_EXPORT: PatternPageDraft = {
  id: 'community-export',
  title: 'Export',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Export and Download share most rules in the community reference, with explicit exceptions for hidden extensions on Download and native browser save-location handoff.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/export-pattern/index.md',
    _excludedSections: ['#### Maintainers: (lines 7–10)', '### Quick Navigation (lines 34–40)']
  },
  summary:
    'Export saves a resource externally with an option to change its file format, whereas Download transfers a remote resource to the user’s device unchanged; most interaction, naming, status, and focus rules apply to both.',
  sections: [
    {
      id: 'intuitive-default-name',
      heading: 'Intuitive default name',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When a resource already carries an intuitive default file name and the user does not need to select an export format or save destination, start the export or download immediately upon clicking the button with no intermediate dialog.'
        }
      ],
      demoRefs: ['export-intuitive-download'],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Intuitive default name',
        lines: '42–62'
      }
    },
    {
      id: 'editable-name',
      heading: 'Editable name',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When users may rename the file before exporting or downloading, open a dialog with a textbox pre-populated with the default name. Hide the file extension when downloading unchanged files; when exporting, validate that the edited name retains a valid extension and show an active "Exporting..." loading indicator while the file prepares.'
        }
      ],
      demoRefs: ['export-customize'],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Editable name (+ newimage1.png, 3.png)',
        lines: '63–85'
      }
    },
    {
      id: 'optional-extras',
      heading: 'Optional extras',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Optional extras',
        lines: '86–87'
      },
      children: [
        {
          id: 'specify-location',
          heading: 'Specify the export or download location',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When users can specify where a downloaded file goes, activating the primary Download control invokes the browser’s native save-location dialog; the transfer begins once they choose a folder and confirm Save.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Specify the export or download location',
            lines: '88–97'
          }
        },
        {
          id: 'choosing-export-format',
          heading: 'Choosing export format',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When two to five export formats are available, present them as a radio-button group with a sensible default pre-selected and concise guidance explaining when each format fits best.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Choosing export format',
            lines: '98–107'
          }
        },
        {
          id: 'passive-success-modal',
          heading: 'Passive success modal',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optionally present a passive success modal once an export finishes cleanly.'
            }
          ],
          demoRefs: ['export-confirm-completion'],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Passive success modal',
            lines: '108–115'
          }
        },
        {
          id: 'errors-and-failures',
          heading: 'Errors and failures',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'If an export or server operation fails, report the error clearly inside the modal rather than silently closing or implying success.'
            }
          ],
          demoRefs: ['export-progress-and-error'],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Errors and failures (+ newimage4.png)',
            lines: '116–123'
          }
        },
        {
          id: 'success-notification',
          heading: 'Success notification',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optionally trigger a brief toast notification to confirm that the export completed.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Success notification',
            lines: '124–131'
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
          text: 'Follow standard modal keyboard and focus-management guarantees across triggers, configuration forms, and passive status dialogs:'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/export-pattern/index.md',
        heading: '## Accessibility',
        lines: '132–136'
      },
      children: [
        {
          id: 'accessibility-trigger',
          heading: 'Trigger',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Navigate to the Export button with Tab (or move across overflow menu items using Up and Down arrows).',
                'Ensure the button or menu item receives visible focus.',
                'Press Enter to open the Export modal.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Trigger',
            lines: '137–146'
          }
        },
        {
          id: 'accessibility-focus',
          heading: 'Focus',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Initial modal focus and subsequent Tab order depend on whether the user must supply input before running:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Focus',
            lines: '147–151'
          },
          children: [
            {
              id: 'focus-required-inputs',
              heading: 'If the user must complete fields first',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Open focus lands on the first input field accepting user entry.',
                    'Tab advances through any additional input controls.',
                    'Tab moves to Export.',
                    'Tab moves to Cancel.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/export-pattern/index.md',
                heading: '#### If the user must complete fields before the export can be executed:',
                lines: '152–159'
              }
            },
            {
              id: 'focus-sensible-defaults',
              heading: 'If a sensible default value is provided',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Open focus lands directly on the Export button.',
                    'Tab moves to Cancel.',
                    'Tab enters the first editable input (following standard radio or text-input keyboard controls).',
                    'Tab continues through any remaining inputs.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/export-pattern/index.md',
                heading: '#### If a sensible default value is provided:',
                lines: '160–170'
              }
            }
          ]
        },
        {
          id: 'accessibility-success-failure',
          heading: 'Success & Failure modals',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When opening a passive modal to announce export completion or failure, apply initial keyboard focus directly to the modal’s close (×) button.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/export-pattern/index.md',
            heading: '### Success & Failure modals',
            lines: '171–174'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'export-intuitive-download',
      title: 'Download a standard report with its intuitive name',
      sectionId: 'intuitive-default-name',
      mappingStatus: 'mapped',
      scenario:
        'When the user needs the default report and no format or destination choice, offer a direct download action without an extra form.',
      teaching: {
        meaning: 'Direct download transfers an unchanged resource immediately when a sensible name already exists.',
        decision:
          'Skip dialogs whenever no filename edits, format switches, or destination inputs are needed; keep Download distinct from format-converting Export.',
        consider: 'Never claim a file was saved or downloaded until the transfer actually occurs.'
      },
      interactive: true
    },
    {
      id: 'export-customize',
      title: 'Customize a report before export',
      sectionId: 'editable-name',
      secondarySectionIds: ['choosing-export-format', 'specify-location', 'accessibility-focus'],
      mappingStatus: 'partial-divergent',
      scenario:
        'When users need to rename a report or choose its format, collect those choices in a dialog before preparing the export.',
      teaching: {
        meaning:
          'An export dialog collects the file name and format when the user must make those choices before preparation.',
        decision:
          'Keep the selected format and file extension consistent, provide concise guidance for each radio option, and let the browser handle the save location when a workflow downloads a file.',
        consider:
          'With a sensible default selected, place initial focus on Export, then let Tab move to Cancel and the editable fields. The preview does not open a native save dialog or create a file.'
      },
      interactive: true,
      _demoNote:
        'The local preview now uses a Dialog, a guided RadioGroup, extension validation, and a modal failure state. It explains the browser Save dialog for real downloads but does not invoke the system dialog or create a file.'
    },
    {
      id: 'export-progress-and-error',
      title: 'Track preparation and recover from an export failure',
      sectionId: 'errors-and-failures',
      secondarySectionIds: ['editable-name'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Show progress only while preparation runs, then communicate completion or a recoverable destination error.',
      teaching: {
        meaning:
          'Operators need live preparation feedback while generating a file and explicit error reporting if preparation fails.',
        decision:
          'Show an active loading state while running and surface export failures inside the modal (offering recovery or retry where feasible).',
        consider:
          'Use indeterminate spinners unless real measurable step progress exists, and never present failed exports as ready.'
      },
      interactive: true,
      _demoNote:
        'Live demo uses an indeterminate Progress only while preparation is active. The simulated failure appears in a Dialog with initial focus on its close control; retry restarts the local preparation preview.'
    },
    {
      id: 'export-confirm-completion',
      title: 'Confirm export completion without implying a download',
      sectionId: 'passive-success-modal',
      secondarySectionIds: ['success-notification', 'accessibility-success-failure'],
      mappingStatus: 'partial-divergent',
      scenario:
        'After a successful export, show a passive completion message and a separate brief notification; make the local-only result explicit.',
      teaching: {
        meaning:
          'Passive completion modals and optional notifications confirm that preparation finished without overstating a file save.',
        decision:
          'Pair completion with a passive success modal (opening focus onto its close icon) and/or a brief toast notification once the output is genuinely ready.',
        consider: 'Distinguish prepared output from local disk download when running sample previews.'
      },
      interactive: true,
      _demoNote:
        'The preview opens a passive success Dialog with initial focus on its close control; a separate action previews the optional Toast. Neither action creates or saves a file.'
    }
  ],
  _implementationNotes: [
    'ExportDemoWithProvider uses Dialog, Fieldset, Field, Input, RadioGroup, RadioRoot, Button, Progress, Alert, and Toast (`demos.tsx:4566-4860`).',
    'Use the package RadioGroup for 2–5 mutually exclusive format choices and include a short use-case description for each option.'
  ]
}
