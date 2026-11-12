import type { PatternPageDraft } from './types'

export const PAGE_OVERFLOW_CONTENT: PatternPageDraft = {
  id: 'overflow-content',
  title: 'Overflow content',
  group: 'Core',
  source: {
    status: 'Additional local topic',
    limits: [
      'Catalog topic limit: Overflow content is maintained in the local pattern directory, though excluded from the 14-item Universal overview catalog.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/overflow-content/index.md',
    _excludedSections: ['### Quick Navigation (lines 20–27)'],
    _upstreamAnomalies: [
      'Maintained source opens directly with ## Truncation (wrapping Quick Navigation, Usage, Variations, Code, Example Usage, Result, and "Show more" buttons). Code/Result CSS snippets are synthesized cleanly into design & implementation rules without vendor class names.'
    ]
  },
  summary:
    'Overflow handling keeps long names, links, paths, and supporting paragraphs readable in bounded layouts using strict truncation thresholds, full-text hover tooltips, directional safety, breadcrumb menus, or explicit "Show more" expansion.',
  sections: [
    {
      id: 'truncation',
      heading: 'Truncation',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Only truncate secondary read-only values when clipping hides at least three characters while keeping at least four characters visible—shorter truncations save almost no horizontal room while obscuring meaning. Always expose the hidden full value through a native hover tooltip (`title` attribute), with one explicit exception: omit tooltips at the clipped tail of a multi-line truncated paragraph.'
        }
      ],
      _sourceCitation: { path: 'patterns/overflow-content/index.md', heading: '## Truncation', lines: '17–49' },
      children: [
        {
          id: 'truncation-usage',
          heading: 'Usage boundaries',
          level: 3,
          blocks: [
            {
              type: 'callout',
              kind: 'do',
              text: 'Limit truncation strictly to expandable supporting copy, long file or asset identifiers, deep URLs, paginated items, and intermediate breadcrumb paths.'
            },
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never truncate page headers, headings/titles, form field labels, validation errors, or notification messages.'
            }
          ],
          _sourceCitation: { path: 'patterns/overflow-content/index.md', heading: '### Usage', lines: '50–62' }
        },
        {
          id: 'truncation-variations',
          heading: 'Variations',
          level: 3,
          blocks: [
            {
              type: 'variants',
              items: [
                {
                  title: 'Front-line truncation (…56789)',
                  whenToUse: 'Preserving a trailing file path, filename, or right-hand identifier continuation.',
                  whenNotToUse:
                    'Left-to-right URLs or punctuated paths unless explicitly protected with bidirectional isolation (`bdi`) so right-to-left text direction never flips slashes or domain tokens backwards.'
                },
                {
                  title: 'Mid-line truncation (1234…5678)',
                  whenToUse:
                    'Identifiers, revision slugs, or codes where both prefix and suffix differentiate items sharing common middle segments.'
                },
                {
                  title: 'End-line truncation (12345…)',
                  whenToUse:
                    'Standard trailing overflow for single-line titles, labels in compact tables, or narrative descriptions.'
                }
              ]
            }
          ],
          demoRefs: ['overflow-identifiers-links'],
          _sourceCitation: { path: 'patterns/overflow-content/index.md', heading: '### Variations', lines: '63–74' },
          children: [
            {
              id: 'variations-ellipses-alone',
              heading: 'Standalone ellipses in collapsed controls',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When collapsing multi-level navigation controls such as deep breadcrumbs to a standalone "…" token, expose the hidden intermediate segments via an interactive overflow menu on hover (and keyboard click activation for non-pointer accessibility) rather than a passive plain-text browser tooltip.'
                }
              ],
              demoRefs: ['overflow-breadcrumbs'],
              _sourceCitation: {
                path: 'patterns/overflow-content/index.md',
                heading: '#### Ellipses alone',
                lines: '75–86'
              }
            }
          ]
        },
        {
          id: 'truncation-mechanics',
          heading: 'Truncation calculation and directional safety',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'End-line and front-line cuts can rely on native CSS container width constraints paired with an explicit container width and hover `title` attribute; mid-line truncation has no universal pure-CSS equivalent and must be computed dynamically with JavaScript measurement based on available container width and distinct start/end slices.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/overflow-content/index.md',
            heading: '### Code / ### Example Usage / ### Result / #### Mid-line truncation',
            lines: '87–145'
          }
        },
        {
          id: 'show-more-buttons',
          heading: '"Show more" buttons',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Prefer explicit "Show more" / "Show less" actions over cramped scrollable boxes, masked gradients, or opaque fades when revealing longer supporting descriptions—making expanded reading deliberate and discoverable. Swap to "Load more" when lazy fetching additional backend records improves page responsiveness.'
            }
          ],
          demoRefs: ['overflow-expand-route-note'],
          _sourceCitation: {
            path: 'patterns/overflow-content/index.md',
            heading: '### "Show more" buttons',
            lines: '146–164'
          }
        }
      ]
    }
  ],
  demos: [
    {
      id: 'overflow-expand-route-note',
      title: 'Expand a long route note',
      sectionId: 'show-more-buttons',
      mappingStatus: 'mapped',
      scenario:
        'Reveal multi-line supporting copy with explicit Show more / Show less controls rather than subtle fades or nested scrollboxes.',
      teaching: {
        meaning:
          'Show more reveals complete secondary prose cleanly when truncating initial card height improves scanning.',
        decision:
          'Use Show more / Show less over gradients, fades, or tight scrollable areas; reserve Load more for async data fetching; keep headers, labels, errors, and alerts unclipped.',
        consider:
          'Omit tooltip duplication at the end of a truncated paragraph, and make expanded/collapsed state clear to screen readers.'
      },
      interactive: true
    },
    {
      id: 'overflow-identifiers-links',
      title: 'Fit identifiers and links in compact layouts',
      sectionId: 'truncation-variations',
      secondarySectionIds: ['truncation', 'truncation-mechanics'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Compare front-line, mid-line, and end-line truncation while keeping the complete value available on hover.',
      teaching: {
        meaning:
          'Directional truncation hides at least 3 clipped characters while keeping at least 4 characters visible so compact rows remain readable.',
        decision:
          'Pick front-line for trailing filenames, mid-line when both prefix and suffix identify an item, and end-line as default. Keep the full value available through a title or a separate copy/inspect action.',
        consider:
          'Protect left-to-right URLs inside right-to-left containers (`bdi` or Unicode isolation) so punctuation and path order never invert visually.'
      },
      interactive: false,
      _demoNote:
        'The CSS now performs the middle ellipsis on the complete identifier instead of receiving pre-truncated text, and the LTR URL is isolated with `<bdi>` inside its RTL container. Copy actions are guidance only and are not demonstrated by this static example.'
    },
    {
      id: 'overflow-breadcrumbs',
      title: 'Collapse long breadcrumb paths',
      sectionId: 'variations-ellipses-alone',
      mappingStatus: 'partial-divergent',
      scenario: 'Compress deep location trails using an ellipsis menu revealing intermediate levels.',
      teaching: {
        meaning:
          'A compact breadcrumb collapses middle ancestors into "…" while retaining root and destination orientation.',
        decision:
          'Open collapsed breadcrumb steps inside an overflow menu rather than relying on a passive text tooltip on hover.',
        consider:
          'Source describes hover activation on the overflow trigger; supporting click/Enter/Space menu activation alongside hover ensures keyboard and touch users reach hidden levels.'
      },
      interactive: true,
      _demoNote:
        'The ellipsis opens a local menu with the hidden Organization and Workspace ancestors; destination navigation is not simulated.'
    }
  ],
  components: ['Button', 'Menu', 'Tooltip']
}
