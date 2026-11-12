import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_IMPORT: PatternPageDraft = {
  id: 'community-import',
  title: 'Import',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Duplicate-file handling, conflict resolution, and byte-size limits are unspecified in the maintained community reference and must be defined at the product level.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/import-pattern/index.md',
    _excludedSections: [
      '#### Maintainers: (lines 8–11)',
      '### Quick Navigation (lines 24–29)',
      '## Feedback (lines 251–253)'
    ]
  },
  summary:
    'Import transfers files or supported remote data into the system—reserving modals strictly for a single file with no extra actions, moving multi-file or metadata tasks to side panels or full pages, and specifying distinct keyboard focus loops for each.',
  sections: [
    {
      id: 'choose-file-modal',
      heading: 'Choose a file (modal)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use an import modal only when uploading a single file that needs no follow-up actions. Offer both drag-and-drop and local file browsing, plus optional external-resource URL entry when supported. Whenever multiple files can be added or extra tasks such as entering metadata are required, do not use a modal—move to a side panel or full page instead.'
        }
      ],
      demoRefs: ['import-single-file-modal'],
      _sourceCitation: {
        path: 'community/patterns/import-pattern/index.md',
        heading: '## Choose a file (modal)',
        lines: '37–68'
      },
      children: [
        {
          id: 'import-url-modal',
          heading: 'Import from a URL (modal)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'When your product supports remote source imports inside a single-file modal, include a URL field alongside the file uploader.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Import from a URL (modal)',
            lines: '69–84'
          }
        }
      ]
    },
    {
      id: 'choose-file-full-or-panel',
      heading: 'Choose a file (full page or side-panel)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'In full-page and side-panel flows, provide drag-and-drop and local file browsing restricted to supported file types, displaying clear loading and loaded states as items arrive. Perform extra actions—such as adding metadata or destination details—separately from file upload and before the import completes, either in a subsequent step or in a distinct on-screen section when space allows.'
        }
      ],
      demoRefs: ['import-multiple-files-or-url', 'import-metadata-side-panel'],
      _sourceCitation: {
        path: 'community/patterns/import-pattern/index.md',
        heading: '## Choose a file (full page or side-panel)',
        lines: '86–120'
      },
      children: [
        {
          id: 'import-url-full-or-panel',
          heading: 'Import from a URL (full page or side-panel)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Provide URL import controls inside the full-page or side-panel layout whenever remote source imports are supported.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Import from a URL (full page or side-panel)',
            lines: '122–137'
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
          text: 'Keyboard navigation and focus return behavior differ significantly depending on whether an operator imports one file or multiple files:'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/import-pattern/index.md',
        heading: '## Accessibility',
        lines: '139–147'
      },
      children: [
        {
          id: 'a11y-single-file',
          heading: 'Single file uploads and imports',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Applies to any single-file upload or import interaction, typically presented inside a modal:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Single file uploads and imports',
            lines: '148–152'
          },
          children: [
            {
              id: 'a11y-single-trigger',
              heading: 'Trigger',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Move to the Import trigger via Tab (or Up/Down arrows inside an overflow menu).',
                    'Confirm visible focus on the trigger.',
                    'Press Enter to launch the import flow.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Trigger (Single file)',
                lines: '153–163'
              }
            },
            {
              id: 'a11y-single-focus',
              heading: 'Focus',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'On opening, focus lands on the drag-and-drop uploader area.',
                    'Tab moves to the URL input field if present; pressing Return in the URL field (or tabbing to Add file and pressing Return) imports the URL with optional loading feedback.',
                    'Tab moves to the primary button (Import, Save, or Next) only once enabled—keep the Import button disabled until a file is chosen.',
                    'Tab moves to Cancel.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Focus (Single file)',
                lines: '164–191'
              }
            },
            {
              id: 'a11y-single-selected',
              heading: 'Once the file is selected',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Move focus automatically to the remove icon on the chosen file; pressing Return clears the file and restores the empty state.',
                    'Tab moves to the now-enabled Import button.',
                    'Tab moves to Cancel.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Once the file is selected',
                lines: '192–198'
              }
            }
          ]
        },
        {
          id: 'a11y-multiple-files',
          heading: 'Multiple file uploads and imports',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never use a modal when multiple files may be selected.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/import-pattern/index.md',
            heading: '### Multiple file uploads and imports',
            lines: '199–202'
          },
          children: [
            {
              id: 'a11y-multi-focus',
              heading: 'Focus',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'First Tab into the import section lands on the file uploader.',
                    'Next Tab moves to the optional URL input field.',
                    'Return activates the chosen input method; pressing Return inside the URL input (or on Add file) fetches with optional loading state.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### Focus (Multiple files)',
                lines: '203–223'
              }
            },
            {
              id: 'a11y-multi-some-selected',
              heading: 'When (some) files are selected',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Return focus to whichever selection method was just used (for example, keep focus in the URL field so another URL can be added right away).',
                    'If the file uploader was used, Tab moves next to the URL field.',
                    'Subsequent Tab presses walk through the remove icon of each selected file.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### When (some) files are selected',
                lines: '224–236'
              }
            },
            {
              id: 'a11y-multi-max-files',
              heading: 'On reaching the maximum number of added files',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Disable both the file uploader and URL selection controls once the maximum allowed file count is reached.',
                    'Place returning focus onto the uploaded files’ remove actions.',
                    'Let Tab advance through each file’s remove icon and onward to the next page section.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/import-pattern/index.md',
                heading: '#### On reaching the maximum number of added files',
                lines: '237–250'
              }
            }
          ]
        }
      ]
    }
  ],
  demos: [
    {
      id: 'import-multiple-files-or-url',
      title: 'Choose multiple mission files or a source URL',
      sectionId: 'choose-file-full-or-panel',
      secondarySectionIds: ['import-url-full-or-panel', 'a11y-multiple-files'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A full-page or side-panel workflow can accept several supported JSON or GeoJSON files and show validation or selection status.',
      teaching: {
        meaning:
          'Multi-file imports use a full page or side panel—never a modal—and restrict selection to supported file types.',
        decision:
          'Use side-panel or full-page flows whenever users can add multiple files or optional remote URLs; disable upload and URL inputs once the maximum file cap is reached.',
        consider:
          'Show loading and loaded states, let Tab walk each file’s remove action, and define duplicate-file conflict policy in your product because the community reference leaves it open.'
      },
      interactive: true,
      _demoNote:
        'Divergences in `demos.tsx:3844-3942`: (1) `Attachment` items lack remove buttons; (2) URL input has no `Return`/`Enter` submit shortcut; (3) no file-count cap disables selection controls; (4) no transient file loading state is shown.'
    },
    {
      id: 'import-single-file-modal',
      title: 'Import one file or URL in a focused modal',
      sectionId: 'choose-file-modal',
      secondarySectionIds: ['import-url-modal', 'a11y-single-file'],
      mappingStatus: 'partial-divergent',
      scenario:
        'For one item with no extra metadata, choose a local file or a URL; keep Import disabled until the chosen source is valid.',
      teaching: {
        meaning: 'A compact modal fits only single-file imports that require zero extra metadata or follow-up steps.',
        decision:
          'Keep the primary Import action disabled until a valid file or URL is selected; open focus onto the dropzone, support Return inside the URL input, and move focus to the file’s remove control once selected.',
        consider: 'Move immediately to a side panel or full page if requirements grow to multiple files or metadata.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:3944-4049`) properly disables "Import file" until selection, but omits a remove button on the chosen file, `Enter` submit in the URL input, and automatic initial/selected focus transitions.'
    },
    {
      id: 'import-metadata-side-panel',
      title: 'Add metadata in a side panel after file selection',
      sectionId: 'choose-file-full-or-panel',
      mappingStatus: 'mapped',
      scenario:
        'When an import needs a name or destination, keep the selection step distinct and collect the extra information in a side panel.',
      teaching: {
        meaning:
          'Additional import actions such as naming or assigning metadata stay distinct from file selection and finish before import runs.',
        decision:
          'Use a side panel or full page whenever metadata is needed, placing those inputs in a follow-up step or separate panel section before final import.',
        consider: 'Define duplicate and conflict handling at the product level before shipping.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:4051-4081`) illustrates the separate post-selection metadata Drawer cleanly; product duplicate-conflict handling remains intentionally unspecified per source.'
    }
  ],
  _implementationNotes: [
    'ImportDemo uses Field, Dropzone, Attachment, Dialog, Drawer, Input, and Button (`demos.tsx:3829-4084`); selected files remain strictly in browser memory with zero network upload or URL fetch.'
  ]
}
