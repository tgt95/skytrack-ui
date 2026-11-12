import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_API_KEY: PatternPageDraft = {
  id: 'community-api-key',
  title: 'Generate an API key',
  group: 'Community',
  source: {
    status: 'Community maintained',
    limits: [
      'Key rotation, revocation menus, and lost-key recovery procedures are SkyTrack security additions not specified in the maintained community reference.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/generate-an-api-key/index.md',
    _excludedSections: [
      '#### Maintainers: (lines 8–11)',
      '[!NOTE] Vendor-internal React storybook link (lines 18–21)',
      '### Quick Navigation (lines 23–30)'
    ],
    _upstreamAnomalies: [
      'Retrieval subsection #### API key can be retrieved via another platform names specific vendor cloud platforms as examples; generalized here to "another platform" for vendor neutrality.'
    ]
  },
  summary:
    'API key generation flows ensure operators understand what a credential grants access to, its security implications, where it will be used, and whether it can be retrieved later.',
  sections: [
    {
      id: 'general-access-keys',
      heading: 'General access keys',
      level: 2,
      blocks: [],
      demoRefs: ['api-key-create-and-manage'],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## General access keys',
        lines: '38–39'
      },
      children: [
        {
          id: 'instant-generation',
          heading: 'Instant generation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Trigger creation from a primary Generate button, displaying a "Generating..." loading state if issuance takes noticeable time, and reveal the generated key inside a modal containing a Copy button.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Instant generation',
            lines: '40–53'
          },
          children: [
            {
              id: 'instant-generation-optional',
              heading: 'Optional display affordances',
              level: 4,
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Split the credential into two parts when the system requires dual key components.',
                    'Display an encoded version of the key when integrations expect it.',
                    'Provide concise explanatory text describing how the key should be used.',
                    'Let users toggle key visibility between masked and revealed states.',
                    'Provide a secondary download link alongside Copy.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### Optionally:',
                lines: '55–74'
              }
            }
          ]
        },
        {
          id: 'name-the-api-key',
          heading: 'Name the API key',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Ask users for a descriptive name before clicking Generate whenever they manage keys for multiple integrations in one workspace. Whenever pre-generation fields (such as key name or access options) are collected first, present the newly created credential in a separate post-generate modal view.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Name the API key',
            lines: '76–89'
          }
        },
        {
          id: 'retrieval-warnings',
          heading: 'Retrieval warnings',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Clearly communicate whether a key remains accessible after closing the generation modal; any of the three retrieval policies may be paired with a `.txt` or `JSON` download link:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Retrieval warnings',
            lines: '90–95'
          },
          children: [
            {
              id: 'retrieval-in-product',
              heading: 'API key can be retrieved in the product',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Inform the user that the key stays retrievable later inside the product (such as on an API key management page) and consider linking directly to that view.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### API key can be retrieved in the product',
                lines: '96–107'
              }
            },
            {
              id: 'retrieval-other-platform',
              heading: 'API key can be retrieved via another platform',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Tell the user that retrieval happens inside a separate external platform or console and link to clear instructions for locating it there.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### API key can be retrieved via another platform',
                lines: '109–121'
              }
            },
            {
              id: 'retrieval-non-recoverable',
              heading: 'API key cannot be retrieved at a later date',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'warning',
                  text: 'When a secret cannot be retrieved after leaving the creation modal, warn the user prominently inside the modal and offer an immediate JSON download option.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/generate-an-api-key/index.md',
                heading: '#### API key cannot be retrieved at a later date',
                lines: '123–133'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'restricted-access-keys',
      heading: 'Restricted access keys',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Let users scope permissions before creating a key when integrations do not require full workspace privileges. Present restriction options inside the modal prior to generation—splitting complex setup across a multi-step modal with a progress indicator rather than letting the dialog scroll. Whenever naming is offered, place the key name field first.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## Restricted access keys',
        lines: '135–158'
      },
      children: [
        {
          id: 'ordering-restricted-options',
          heading: 'Ordering restricted access options',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Present optional restriction controls in this logical order (omitting steps that do not apply):'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Key or connected application name (optional) so operators can recognize its destination later.',
                'Permitted actions (optional), such as Read and write, Write only, or Read only.',
                'Target accessible resources (optional), specified by naming or picking specific items.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/generate-an-api-key/index.md',
            heading: '### Ordering restricted access options',
            lines: '160–172'
          }
        }
      ]
    },
    {
      id: 'show-in-context',
      heading: 'Show the API key in context (optional)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When helpful, keep the newly created key summary visible in the page near the Generate trigger after the modal closes, paired with an option to generate another key.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## Show the API key in context (optional)',
        lines: '173–186'
      }
    },
    {
      id: 'management-page',
      heading: 'API key management page (optional)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Provide a central API key management view inside a predictable access administration area—such as Settings or Access—listing credentials in a data table by recognizable key or application name so operators can create, inspect, or edit keys.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## API key management page (optional)',
        lines: '188–206'
      }
    },
    {
      id: 'edit-api-key',
      heading: 'Edit an API key (optional)',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'When supported from either the creation context or the management table, allow editing metadata and restrictions—such as connected application name, key name, and scoped permissions—ending with a Save action. Editing an existing key must never alter the underlying secret contents.'
        }
      ],
      demoRefs: ['api-key-edit-existing'],
      _sourceCitation: {
        path: 'community/patterns/generate-an-api-key/index.md',
        heading: '## Edit an API key (optional) (+ Edit.png)',
        lines: '208–224'
      }
    }
  ],
  demos: [
    {
      id: 'api-key-create-and-manage',
      title: 'Create and manage an API key safely',
      sectionId: 'general-access-keys',
      secondarySectionIds: [
        'instant-generation',
        'name-the-api-key',
        'retrieval-warnings',
        'restricted-access-keys',
        'ordering-restricted-options',
        'show-in-context'
      ],
      mappingStatus: 'partial-divergent',
      scenario:
        'Set a key name and access level, choose where a real key would be retrieved, then review a separate sample result before closing it.',
      teaching: {
        meaning:
          'People need to understand what an API key can access and whether its value can be retrieved again before they create one.',
        decision:
          'Ask for a recognizable name, explain the access level, and state the retrieval policy before generation. Show a separate result view; if the key is one-time, warn people to save it and offer a secure download. This preview uses a fixed placeholder and skips real generation, waiting, copying, and file download.',
        consider:
          'Keep access limited to what the integration needs. Provide recovery or rotation guidance, and never expose or persist real secrets in a UI example.'
      },
      interactive: true,
      _demoNote:
        'The preview opens a configuration dialog and a separate result dialog. It shows only a fixed sample value: no credential is created, no clipboard is accessed, and no file is downloaded. Retrieval choices explain product decisions but do not implement a retrieval service.'
    },
    {
      id: 'api-key-edit-existing',
      title: 'Manage or edit an existing key without changing its secret',
      sectionId: 'edit-api-key',
      secondarySectionIds: ['management-page'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A workspace administrator reviews named keys, opens management actions, and edits access without changing an existing key value.',
      teaching: {
        meaning:
          'Key metadata and permissions can be updated independently from rotating or replacing the secret value itself.',
        decision:
          'List keys by recognizable key or application name in a management data table under Settings or Access, and allow editing name, application label, and restrictions via Save without modifying the secret.',
        consider:
          'Keep secret replacement (such as rotation or revocation—SkyTrack local security extensions) separate from metadata editing.'
      },
      interactive: true,
      _demoNote:
        'Live demo shows one recognizable key row rather than a full Settings/Access data table. Rotation and revocation are explicitly labeled as local previews and do not change credentials.'
    }
  ],
  _implementationNotes: [
    'ApiKeyDemo uses Dialog, Field, Fieldset, Input, RadioGroup, RadioRoot, Button, Alert, and Menu; the key value is a fixed non-secret placeholder, and copy/download controls report preview-only outcomes.'
  ]
}
