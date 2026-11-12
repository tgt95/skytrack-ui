import type { PatternPageDraft } from './types'

export const PAGE_TEXT_TOOLBARS: PatternPageDraft = {
  id: 'text-toolbars',
  title: 'Text toolbars',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Experimental component warning in source: the maintained reference explicitly notes that the in-editor keyword search interaction shown in Text toolbars is NOT currently ready for production use.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/text-toolbar-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 20–31)',
      '## Resources (lines 32–38 — design kit link)',
      '## References (lines 276–280)',
      '## Feedback (lines 281–285)'
    ],
    _upstreamAnomalies: [
      'Upstream ## Resources precedes ## Overview at line 32 and points solely to an external design kit link; excluded cleanly in normalization.'
    ]
  },
  summary:
    'Text toolbars anchor editing, formatting, paragraph, attachment, and optional search actions horizontally above editable text containers, adapting across viewport sizes and preserving a single-Tab roving keyboard surface.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Place a cohesive horizontal action bar directly above an editable text area whenever authors format briefs, embed links, or attach supporting documents—trimming away unused tools to keep workspaces focused.'
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Overview', lines: '39–74' }
    },
    {
      id: 'anatomy',
      heading: 'Anatomy',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Customize your toolbar from six functional control groups paired directly with the editor body below:'
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Edit actions: Undo, Redo, Cut, Copy, and Paste.',
            'Text formatting: Typeface selector, Type size selector, Bold, Italic, Underline, and Text color menu.',
            'Paragraph structure: Alignment options, Bulleted, Checked, and Numbered lists, plus Indent more/less.',
            'Attachments and links: File attachment trigger and inline Link embedding tool.',
            'In-editor Search (optional, non-production experimental reference concept).',
            'Connected editable text area immediately beneath the bar.'
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Anatomy', lines: '75–91' }
    },
    {
      id: 'when-to-use',
      heading: 'When to use',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use a text toolbar for structured briefs, operational notes, comments, or message composers that genuinely require inline formatting or embedded assets; use plain text areas when unformatted notes suffice.'
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## When to use', lines: '92–101' }
    },
    {
      id: 'behaviors',
      heading: 'Behaviors',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Behaviors', lines: '102–103' },
      children: [
        {
          id: 'behaviors-states',
          heading: 'Control states',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Every toolbar icon control communicates five clear interactive states—enabled, hover, focus, active/pressed, and disabled—paired with dropdown pickers for font/size and compact popup menus for color or alignment options.'
            }
          ],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### States', lines: '104–130' }
        },
        {
          id: 'behaviors-attach-files',
          heading: 'Attach files',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Trigger file picking from the toolbar attachment action and anchor attached file chips directly inside the lower-left footer area of the editable text container itself with an inline close (×) button to detach.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Attach files',
            lines: '131–145'
          }
        },
        {
          id: 'behaviors-embed-links',
          heading: 'Embed links',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Activating the toolbar Link button opens an inline URL popover where typing or confirming embeds the target link cleanly; close via its close icon or clicking outside. Selecting or highlighting existing linked text reopens that URL popover so authors can inspect, revise, or remove the link in place.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Embed links',
            lines: '146–163'
          }
        },
        {
          id: 'behaviors-search',
          heading: 'In-editor search (non-production)',
          level: 3,
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'callout',
              kind: 'source-limit',
              text: 'Source warning: in-editor keyword search is explicitly documented as NOT production-ready in the maintained reference; treat any in-editor find bar as an experimental pattern concept.'
            },
            {
              type: 'prose',
              text: 'When toggled from the bar, searches substrings solely within the current text document, highlights matching occurrences inside the editor body, displays current hit totals inside a clearable tag/pill with × inside the search field, and exits cleanly via close icon or clicking outside.'
            }
          ],
          demoRefs: ['text-toolbars-find-in-context'],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Search (plus [!NOTE] lines 13–17)',
            lines: '13–17, 164–180'
          }
        },
        {
          id: 'behaviors-responsiveness',
          heading: 'Responsiveness across breakpoints',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Viewport tier', 'Toolbar layout adaptation'],
              rows: [
                [
                  'Extra large / Max',
                  'All enabled controls render on a single row; search field expands as horizontal room grows'
                ],
                ['Large (lg)', 'Search shrinks to an icon toggle or secondary actions tuck into an overflow menu'],
                ['Medium (md)', 'Toolbar cleanly wraps into two organized horizontal control rows'],
                ['Small (sm)', 'Compact two-row wrap paired with an overflow menu gathering lower-priority actions']
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Responsiveness',
            lines: '181–196'
          }
        },
        {
          id: 'behaviors-overflow',
          heading: 'Overflow menu containment',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Spill lower-frequency actions smoothly into a single Overflow menu button at narrow widths rather than duplicating full buttons in extra rows beneath the toolbar.'
            }
          ],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### Overflow', lines: '197–205' }
        },
        {
          id: 'behaviors-saving',
          heading: 'Saving and draft persistence',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Support either an explicit "Save draft" trigger or transparent background autosave alongside final publish/send actions so operators never lose long-form writing.'
            }
          ],
          demoRefs: ['text-toolbars-format-draft'],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### Saving', lines: '206–215' }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/text-toolbar-pattern/index.md',
        heading: '## Accessibility',
        lines: '216–217'
      },
      children: [
        {
          id: 'a11y-tooltips',
          heading: 'Tooltips on hover and focus',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Display concise tooltips on both pointer hover and keyboard focus for every icon-only toolbar action.'
            }
          ],
          _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '### Tooltips', lines: '218–225' }
        },
        {
          id: 'a11y-keyboard',
          heading: 'Keyboard roving focus and menu navigation',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Entry stop: pressing Tab enters and exits the toolbar as a single logical stop, placing focus onto the first enabled control (or optionally restoring the last focused button on return).',
                'Horizontal travel: Right and Left Arrow keys move smoothly across toolbar items so users never traverse twenty individual Tab stops.',
                'Menu traversal: Enter or Space toggles dropdowns and overflow menus open, then Up/Down Arrow keys select options cleanly.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Keyboard > When focus moves / Horizontal toolbars / Menus',
            lines: '226–247'
          }
        },
        {
          id: 'a11y-screen-readers',
          heading: 'Screen reader toolbar semantics',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Expose `role="toolbar"` following ARIA toolbar guidelines, announce pressed formatting toggle states, and give every grouped toolbar an accessible label.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/text-toolbar-pattern/index.md',
            heading: '### Screen readers',
            lines: '248–257'
          }
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
            { label: 'Toolbar, Toggle, Menu, Tooltip, Attachment', kind: 'component' },
            { label: 'Common actions', kind: 'pattern' },
            { label: 'Search', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/text-toolbar-pattern/index.md', heading: '## Related', lines: '258–266' }
    }
  ],
  demos: [
    {
      id: 'text-toolbars-format-draft',
      title: 'Format a mission brief and manage its draft',
      sectionId: 'behaviors-saving',
      secondarySectionIds: ['anatomy', 'behaviors-attach-files', 'behaviors-embed-links', 'a11y-keyboard'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Style a sample mission brief, add a reference or attachment, and review the formatted draft before saving it locally.',
      teaching: {
        meaning:
          'A text toolbar keeps editing, formatting, paragraph, attachment, and draft tools clustered immediately above the editable area.',
        decision:
          'Include only controls needed for the task, collapse extra tools into an overflow menu across md/sm breakpoints, anchor attachments inside the bottom-left editor footer, and support highlight-to-edit inline link popovers.',
        consider:
          'Expose hover+focus tooltips on icon controls, use single-Tab-stop `role="toolbar"` with Left/Right arrow navigation, and never duplicate menu actions as redundant standalone buttons below the bar.'
      },
      interactive: true,
      _demoNote:
        'The preview keeps each toolbar action and its local result together and removes duplicate standalone menu actions. It remains a simplified editor: attachment placement is below the textarea rather than in an editor footer, and icon-button tooltips/highlight-to-edit link popovers are not modeled.'
    },
    {
      id: 'text-toolbars-find-in-context',
      title: 'Find and edit wording in context',
      sectionId: 'behaviors-search',
      mappingStatus: 'partial-divergent',
      scenario:
        'Search within a sample draft, review highlighted matches and the hit count, and keep the experimental status visible.',
      teaching: {
        meaning:
          'In-document search locates wording inside the active editor without confusion against global workspace search.',
        decision:
          'Highlight matching text directly inside the editor body, display total hits inside a clearable pill/tag with ×, and close via × or click-outside.',
        consider:
          'Maintained source explicitly marks in-editor keyword search NOT ready for production use—treat UI details here as experimental.'
      },
      interactive: true,
      _demoNote:
        'The local preview now highlights matching words, reports a clearable hit count, and labels the feature experimental/not production-ready. Search remains a permanent field with a separate matching preview rather than a toolbar-triggered search that highlights text directly in the editable body.'
    }
  ],
  components: ['Toolbar', 'Toggle', 'Menu', 'Tooltip', 'Attachment', 'Input', 'Button', 'Badge']
}
