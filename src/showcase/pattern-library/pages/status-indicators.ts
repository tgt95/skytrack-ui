import type { PatternPageDraft } from './types'

export const PAGE_STATUS_INDICATORS: PatternPageDraft = {
  id: 'status-indicators',
  title: 'Status indicators',
  group: 'Core',
  source: {
    status: 'Additional local topic',
    limits: [
      'Catalog topic limit: Status indicators exists in the maintained local directory yet is omitted from the 14-item Universal overview catalog.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/status-indicator-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 15–28)',
      '## References (lines 528–542)',
      '## Feedback (lines 543–547)'
    ],
    _upstreamAnomalies: [
      'In ## Overview > ### Anatomy (lines 79–95), upstream lists #### 1. Icon indicator, #### 3. Badge indicator, #### 2. Shape indicator, #### 4. Differential indicator (non-sequential 3-before-2 numbering). Sequence is preserved cleanly without confusing numbering errors.',
      '## Badge indicator and ## Differential indicator jump directly from H2 to H4 subheadings in source markdown; normalized cleanly to level 3 subsections.'
    ]
  },
  summary:
    'Status indicators surface system health, lifecycle states, unread counts, and directional metric trends using strict severity tiers, bounded indicator density, left-aligned labels, distinct outlined shapes, and >= 3:1 accessible contrast.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Status indicators reveal machine condition, process readiness, pending counts, or period-over-period shifts in place without interrupting active navigation.'
        }
      ],
      _sourceCitation: { path: 'patterns/status-indicator-pattern/index.md', heading: '## Overview', lines: '29–45' },
      children: [
        {
          id: 'overview-variants',
          heading: 'Variants: icon indicators versus shape indicators',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Choose Icon indicators when space allows stronger visual urgency tied to overall system health (combining icon glyph, containing shape, semantic color, and label). Choose compact Shape indicators for tight multi-row lists or diagrams expressing product-specific workflow lifecycle or priority tiers where red-to-green urgency does not always apply.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Variants > #### Icon indicators versus shape indicators',
            lines: '46–72'
          }
        },
        {
          id: 'overview-anatomy',
          heading: 'Anatomy across the four indicator families',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Icon indicator: containing color silhouette, crisp interior symbol, and paired status text.',
                'Badge indicator: numbered count pill or compact unread dot overlaid cleanly on an interactive ghost icon button trigger.',
                'Shape indicator: distinct geometric outline silhouette + fill color paired closely with a status label.',
                'Differential indicator: directional prefix (+/− symbol, caret, or arrow) paired with formatted change value and optional semantic color.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Anatomy (preserves Icon -> Badge -> Shape -> Differential sequence)',
            lines: '73–100'
          }
        }
      ]
    },
    {
      id: 'designing-with-status-indicators',
      heading: 'Designing with status indicators',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Designing with status indicators',
        lines: '101–102'
      },
      children: [
        {
          id: 'designing-choosing-context',
          heading: 'Choosing for context',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Choosing for context',
            lines: '103–107'
          },
          children: [
            {
              id: 'context-consolidated',
              heading: 'Consolidated statuses',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When rolling multiple underlying checks up into a single summary indicator, display the single highest-severity condition (error/red overrides warning/yellow, which overrides healthy/green).'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Consolidated statuses',
                lines: '108–113'
              }
            },
            {
              id: 'context-cognitive-load',
              heading: 'Cognitive load limits',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Keep indicators meaningful: swap non-actionable or low-value metadata to plain text, because cluttering one view beyond roughly five or six distinct status indicators overwhelms operator scanning.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Cognitive load',
                lines: '114–121'
              }
            }
          ]
        },
        {
          id: 'designing-standardization',
          heading: 'Standardization',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Apply identical status labels, severity tiers, and shape encodings consistently across related dashboards and tables so operators never re-learn vocabulary screen by screen.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Standardization',
            lines: '122–133'
          }
        },
        {
          id: 'designing-severity-levels',
          heading: 'Severity levels',
          level: 3,
          blocks: [
            {
              type: 'table',
              columns: ['Tier', 'Intent', 'Representative meanings'],
              rows: [
                [
                  'High attention',
                  'Requires immediate intervention',
                  'Critical errors, failures, stop alerts, urgent blocks'
                ],
                [
                  'Medium attention',
                  'Needs awareness without immediate halt',
                  'Warnings, caution thresholds, pending acknowledgement, in-progress states'
                ],
                [
                  'Low attention',
                  'Informational or healthy baseline',
                  'Healthy ready, completed, available updates, neutral drafts'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Severity levels (High / Medium / Low attention)',
            lines: '134–158'
          }
        },
        {
          id: 'designing-visual-guidance',
          heading: 'Visual guidance',
          level: 3,
          blocks: [],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Visual guidance',
            lines: '159–172'
          },
          children: [
            {
              id: 'visual-symbols',
              heading: 'Status symbols',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Pair high-recognition icons consistently with critical system health states rather than decorating generic table attributes.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status symbols',
                lines: '173–190'
              }
            },
            {
              id: 'visual-shapes',
              heading: 'Status shapes',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Assign one unique geometry to each distinct state within a table or workflow—never reuse the exact same silhouette with two different colors inside the same view.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status shapes',
                lines: '191–211'
              }
            },
            {
              id: 'visual-palettes',
              heading: 'Status color palettes and extended yellows/oranges',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Draw states from the core semantic palette (red, orange, yellow, green, blue), plus gray for unstarted/draft work and purple for outliers or undefined readings. Reach into extended palette stops strictly where light-mode yellow or orange fills need darker strokes to guarantee accessible WCAG contrast.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status color palette / #### Extended status palettes',
                lines: '212–230'
              }
            },
            {
              id: 'visual-type-pairing',
              heading: 'Status typography and size pairings',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Size indicators proportionally to adjacent labels: pair 20px icon indicators with 16pt type (or 16px icons with 14pt type); pair 16px shape indicators with 14pt or 12pt labels cleanly.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/status-indicator-pattern/index.md',
                heading: '#### Status type',
                lines: '231–244'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'icon-indicator',
      heading: 'Icon indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use icon indicators for prominent system health, connection failures, and immediate attention notices—left-aligning symbols directly ahead of status labels in lists and tables (follow enclosing notification rules when inside alerts).'
        }
      ],
      demoRefs: ['status-icon-connection'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Icon indicator > ### Icon indicator statuses > Labeling / Alignment',
        lines: '245–303'
      }
    },
    {
      id: 'shape-indicator',
      heading: 'Shape indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Use compact outlined shapes paired with labels for scanning dense multi-row operational readiness or priority columns. Left-align shapes ahead of labels in vertical lists (trailing placement is permitted solely when every preceding text label stays constant width), never repeat one shape across different colors, and preserve 16px silhouettes with crisp outer outlines.'
        }
      ],
      demoRefs: ['status-shape-compact-list'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Shape indicator > ### Shape indicator statuses > Labeling / Alignment / Best practices',
        lines: '304–382'
      }
    },
    {
      id: 'badge-indicator',
      heading: 'Badge indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Overlay badge indicators directly on interactive ghost icon buttons—clearing badges cleanly once the user views or acknowledges the pending updates:'
        }
      ],
      demoRefs: ['status-badge-navigation'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Badge indicator',
        lines: '383–397'
      },
      children: [
        {
          id: 'badge-with-number',
          heading: 'Badge with number',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use numbered counts exclusively over large 48px global-header ghost icon buttons, capping display at three digits ("999+") so counters never blow out header layout.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '#### Badge with number',
            lines: '398–413'
          }
        },
        {
          id: 'badge-without-number',
          heading: 'Badge without number (dot badge)',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Use a lightweight dot indicator on toolbar icon buttons or anywhere exact unread tally is irrelevant or unknown, signaling new activity until opened.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '#### Badge without number',
            lines: '414–422'
          }
        }
      ]
    },
    {
      id: 'differential-indicator',
      heading: 'Differential indicator',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Communicate comparative metric delta using explicit +/− signs, directional arrows, or carets paired with comparison values and time context—so magnitude direction reads unambiguously without needing color.'
        }
      ],
      demoRefs: ['status-differential-trends'],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Differential indicator',
        lines: '423–439'
      },
      children: [
        {
          id: 'differential-color',
          heading: 'Color and metric-specific exceptions',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Optional green (upward/positive) and red (downward/negative) semantic colors enhance rapid scanning, except on metrics where numeric direction carries domain reversal or neutral physics—such as temperature changes, error-rate drops, or latency deltas.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '#### Color',
            lines: '440–454'
          }
        }
      ]
    },
    {
      id: 'accessibility',
      heading: 'Accessibility',
      level: 2,
      blocks: [],
      _sourceCitation: {
        path: 'patterns/status-indicator-pattern/index.md',
        heading: '## Accessibility',
        lines: '455–456'
      },
      children: [
        {
          id: 'a11y-elements',
          heading: 'Multi-cue contrast and standalone icon exception',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Maintain at least 3:1 luminance contrast both against page backgrounds and between adjacent statuses even in grayscale. Combine at least two visual elements (symbol, shape, color) paired with text labels; static icon-only indicators are acceptable only where high-contrast symbols guarantee >= 3:1 legibility on their own.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Elements > #### Relying only on color is insufficient / #### Using icons alone is acceptable',
            lines: '457–491'
          }
        },
        {
          id: 'a11y-outlines',
          heading: 'Outlines on shape indicators',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Because icon indicators carry high-contrast inner glyphs they require no outer border, whereas compact filled Shape indicators MUST include visible outer outlines alongside text labels—especially around light yellow or orange swatches in light surfaces.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/status-indicator-pattern/index.md',
            heading: '### Outlines',
            lines: '492–511'
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
            { label: 'Badge & Button', kind: 'component' },
            { label: 'Notifications', kind: 'pattern' },
            { label: 'Disabled states', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/status-indicator-pattern/index.md', heading: '## Related', lines: '512–527' }
    }
  ],
  demos: [
    {
      id: 'status-icon-connection',
      title: 'Show connection and attention states',
      sectionId: 'icon-indicator',
      secondarySectionIds: ['designing-severity-levels', 'a11y-elements'],
      mappingStatus: 'mapped',
      scenario:
        'Combine clear status icons, distinct severity colors, and left-aligned labels for system health telemetry.',
      teaching: {
        meaning:
          'An icon indicator pairs a high-contrast symbol inside a status color with concise text for system health and attention states.',
        decision:
          'Match icon indicators (20px/16pt or 16px/14pt) to system health conditions, rolling consolidated states up to the highest active severity.',
        consider:
          'Keep status indicators to <= 5–6 per dense area using plain text for non-actionable states, and preserve >= 3:1 grayscale contrast.'
      },
      interactive: false
    },
    {
      id: 'status-shape-compact-list',
      title: 'Scan operational readiness in a compact list',
      sectionId: 'shape-indicator',
      secondarySectionIds: ['visual-shapes', 'a11y-outlines'],
      mappingStatus: 'mapped',
      scenario:
        'Use distinct outlined 16px shapes paired with left-aligned lifecycle/readiness text in dense table rows.',
      teaching: {
        meaning:
          'Shape indicators support scanning many compact rows where product lifecycle or priority tiers differ.',
        decision:
          'Assign a unique shape geometry to each state (never reusing the same shape with different colors), size silhouettes at 16px beside labels, and always add outlines on light themes.',
        consider:
          'Reserve gray for unstarted/draft states and purple for outliers; use extended palettes strictly to keep yellow/orange 3:1 accessible.'
      },
      interactive: false
    },
    {
      id: 'status-badge-navigation',
      title: 'Summarize unread work in navigation',
      sectionId: 'badge-indicator',
      secondarySectionIds: ['badge-with-number', 'badge-without-number'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Illustrate a capped unread count, a new-item dot, and a hidden zero badge on navigation icons; production badges belong on actionable icon buttons.',
      teaching: {
        meaning:
          'A badge indicator overlays unread counts or presence dots onto interactive icon buttons until acknowledged.',
        decision:
          'Use numbered counters (max 3 digits: 999+) strictly on 48px header ghost icon buttons, use dot badges on toolbar icon buttons, and hide badges at zero.',
        consider:
          'Clear badges cleanly once acknowledged and never attach standalone zero counters beside plain text strings.'
      },
      interactive: false,
      _demoNote:
        'Static reference uses labeled icon illustrations, overlays unread/dot badges, demonstrates the 999+ cap, and hides the zero badge; it does not provide operable navigation buttons.'
    },
    {
      id: 'status-differential-trends',
      title: 'Compare operational trends over time',
      sectionId: 'differential-indicator',
      secondarySectionIds: ['differential-color'],
      mappingStatus: 'mapped',
      scenario: 'Present +/- values, directional carets/arrows, comparison baselines, and domain-safe color meaning.',
      teaching: {
        meaning: 'A differential indicator communicates magnitude and direction relative to a comparison timeframe.',
        decision:
          'Include explicit +, -, arrow, or caret markers alongside comparison labels so directional meaning never depends on color alone.',
        consider:
          'Avoid assuming green = up everywhere—metrics like battery temperature, thermal drift, or error rates invert or neutralize directional color meaning.'
      },
      interactive: false
    }
  ],
  components: ['Badge', 'Button', 'Tag']
}
