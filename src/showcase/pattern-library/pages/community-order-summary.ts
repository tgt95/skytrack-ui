import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_ORDER_SUMMARY: PatternPageDraft = {
  id: 'community-order-summary',
  title: 'Order summary',
  group: 'Community',
  source: {
    status: 'Community catalog only',
    catalogEvidence:
      'The community pattern index defines Order summary strictly as "A summary of a platform’s functionality, status, or individual service."',
    limits: [
      'Catalog-only entry: the linked detail specification is not included in the local library.',
      'Missing maintained rules: required fields, visual layout, pricing or checkout workflows, status vocabularies, actions, and accessibility requirements are absent locally.',
      'The live example on this page is a SkyTrack local interpretation of a platform service summary and does not define a transaction or submit requests.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/index.md',
    _primaryLines: '44',
    _excludedSections: [
      'No dedicated pattern page exists locally; standard maintained sections (Anatomy, Behavior, Accessibility, Related) are omitted per catalog-only limits.'
    ],
    _upstreamAnomalies: [
      'This catalog-only entry is intentionally illustrated as a platform service summary. The live sample reveals capabilities and reports a local preview result without opening a workspace or changing service state.'
    ]
  },
  summary:
    'Catalog-only reference entry defined locally as a summary of a platform’s functionality, status, or individual service; no detailed layout, interaction, or checkout specification is maintained locally.',
  sections: [
    {
      id: 'source-evidence',
      heading: 'Catalog evidence',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'The maintained local community index records one brief catalog description for Order summary: a summary of a platform’s functionality, status, or individual service.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Order summary',
        lines: '44'
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
          text: 'No dedicated detail specification exists locally. The index provides no rules for required summary fields, visual formatting, pricing, checkout, payment separation, or follow-up actions.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Order summary (IBM-only link)',
        lines: '31, 44'
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
          text: 'Local interpretation: to illustrate the catalog phrase without inventing transaction rules, the live sample summarizes platform capabilities, operational status, and workspace capacity. The preview action reports only a local sample outcome.'
        }
      ],
      demoRefs: ['order-summary-service-review'],
      _sourceCitation: {
        path: 'community/patterns/index.md',
        heading: '## Community patterns -> Order summary (local demo framing)',
        lines: '44'
      }
    }
  ],
  demos: [
    {
      id: 'order-summary-service-review',
      title: 'Review a platform service summary',
      sectionId: 'local-interpretation',
      mappingStatus: 'local-interpretation',
      scenario:
        'Summarize service scope and operating state so a team can decide whether it needs to inspect more detail.',
      teaching: {
        meaning:
          'Local interpretation: a concise summary presents platform capabilities, current service status, and capacity so an operator can decide whether to inspect more detail.',
        decision:
          'Local interpretation: use a scannable service summary when people need to verify operational scope and readiness before deciding whether more detail is needed.',
        consider:
          'No required fields, pricing rules, or follow-up actions exist in the local catalog source; this sample does not change service state or submit a request.'
      },
      interactive: true,
      _demoNote:
        'Live `OrderSummaryDemo` summarizes platform service status and workspace capacity. Its buttons reveal capabilities or report that details were previewed in this sample; they do not open an external workspace or submit a transaction.'
    }
  ],
  _implementationNotes: [
    'OrderSummaryDemo renders semantic `<dl>` key-value pairs with Badge and Button in local React state; preview and capability controls do not change a service or navigate away.'
  ]
}
