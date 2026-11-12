import type { PatternPageDraft } from './types'

export const PAGE_COMMUNITY_CHATBOTS: PatternPageDraft = {
  id: 'community-chatbots',
  title: 'Chatbots',
  group: 'Community',
  source: {
    status: 'Community maintained',
    subpages: [
      {
        id: 'overview',
        title: 'Overview',
        order: 1,
        _path: 'docs/carbon-ds-reference/community/patterns/chatbot/overview.md'
      },
      { id: 'usage', title: 'Usage', order: 2, _path: 'docs/carbon-ds-reference/community/patterns/chatbot/usage.md' },
      { id: 'flows', title: 'Flows', order: 3, _path: 'docs/carbon-ds-reference/community/patterns/chatbot/flows.md' },
      {
        id: 'content',
        title: 'Content',
        order: 4,
        _path: 'docs/carbon-ds-reference/community/patterns/chatbot/content.md'
      }
    ],
    limits: [
      'Community-sourced guidance maintained outside the core pattern set; several flows (multiple threads, expanding cards, error recovery) and supporting primitives remain in Preview or upcoming states.',
      'Traditional UI controls and direct navigation must stay accessible for predictable tasks rather than routing everything through conversation.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/community/patterns/chatbot/overview.md',
    _excludedSections: [
      'overview.md: #### Maintainers: (duplicated lines 10–17)',
      'overview.md: ### Quick Navigation (lines 25–32)',
      'overview.md: ## Chatbot add-on library (Sketch download link, lines 118–132)',
      'overview.md: ## More information (vendor partnership note, lines 134–139)',
      'usage.md: ### Quick Navigation (lines 11–16)',
      'flows.md: ### Quick Navigation (lines 21–27)',
      'content.md: ### Quick Navigation (lines 16–21)',
      'content.md: ## Resources & ## References (external links & bibliography, lines 84–115)'
    ],
    _upstreamAnomalies: [
      'overview.md Quick Navigation lists User needs before Why a chatbot?, whereas the document body renders ## Common use cases -> ## Why a chatbot? -> ## User needs -> ## Supported components; this handoff preserves actual body order.',
      'overview.md duplicates #### Maintainers: consecutively (lines 10 and 15).',
      'usage.md #### Provide a response and request feedback duplicates its closing sentence twice (lines 119–122).'
    ]
  },
  summary:
    'A chatbot supports natural-language questions and guided tasks when on-demand answers are genuinely useful, trustworthy, and grounded in the user’s workflow—while leaving conventional navigation intact for predictable actions.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      subpageId: 'overview',
      blocks: [
        {
          type: 'prose',
          text: 'Use conversational assistance when people benefit from asking for help or looking up task-relevant answers in plain language and receiving dependable responses tailored to their goal.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/chatbot/overview.md',
        heading: '# Chatbots (Overview)',
        lines: '1–22'
      },
      children: [
        {
          id: 'overview-common-use-cases',
          heading: 'Common use cases',
          level: 3,
          subpageId: 'overview',
          blocks: [
            {
              type: 'prose',
              text: 'Conversational interfaces fit four recurring product needs best:'
            },
            {
              type: 'list',
              items: [
                'In-context help and onboarding: answer frequently asked questions at scale or help first-time operators get oriented.',
                'Case intake and triage: collect structured details upfront to prioritize requests and reduce manual support load.',
                'Routine transactions and procedures: guide people step by step through bounded operational tasks.',
                'Natural-language lookup: help users retrieve specific records, statuses, or policy details without hunting through nested filters.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/overview.md',
            heading: '## Common use cases',
            lines: '41–55'
          }
        },
        {
          id: 'overview-why-a-chatbot',
          heading: 'Why a chatbot?',
          level: 3,
          subpageId: 'overview',
          blocks: [
            {
              type: 'prose',
              text: 'Before investing in a bot, confirm that conversation outperforms simpler product alternatives by answering five readiness questions:'
            },
            {
              type: 'list',
              items: [
                'What specific outcomes are users trying to achieve?',
                'How deep or open-ended is the assistance they need?',
                'Would direct human support serve this domain better and more safely?',
                'Why is a conversational flow superior to contextual tooltips, documentation, or a structured wizard?',
                'Which verified data sources and capabilities can the bot actually act upon?'
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/overview.md',
            heading: '## Why a chatbot?',
            lines: '56–68'
          }
        },
        {
          id: 'overview-user-needs',
          heading: 'User needs',
          level: 3,
          subpageId: 'overview',
          blocks: [],
          _sourceCitation: { path: 'community/patterns/chatbot/overview.md', heading: '## User needs', lines: '69–70' },
          children: [
            {
              id: 'overview-user-needs-general',
              heading: 'What users expect from a bot',
              level: 4,
              subpageId: 'overview',
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Round-the-clock availability whenever questions arise.',
                    'Relevant, on-demand answers tied directly to their current question.',
                    'Consistent, high-quality product or operational guidance they can rely on.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/overview.md',
                heading: '#### A user may need:',
                lines: '71–76'
              }
            },
            {
              id: 'overview-user-needs-conversation',
              heading: 'What users need inside a conversation',
              level: 4,
              subpageId: 'overview',
              blocks: [
                {
                  type: 'list',
                  items: [
                    'Structured choices to supply missing context quickly without typing everything freehand.',
                    'Reflective summaries and confirming questions that show what the bot understood before acting.',
                    'Clear visual distinction identifying the latest active message so progress stays unambiguous.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/overview.md',
                heading: '#### Within a conversation, a user may need:',
                lines: '77–82'
              }
            },
            {
              id: 'overview-user-needs-dont',
              heading: 'When not to use a chatbot',
              level: 4,
              subpageId: 'overview',
              blocks: [
                {
                  type: 'callout',
                  kind: 'dont',
                  text: 'Do not force tasks into chat when traditional UI controls finish faster, when the workflow spans lengthy or highly intricate steps, or when sensitive or emotional situations belong with a person.'
                }
              ],
              demoRefs: ['chatbots-standard-navigation'],
              _sourceCitation: {
                path: 'community/patterns/chatbot/overview.md',
                heading: '#### Don’t use a chatbot when:',
                lines: '83–93'
              }
            }
          ]
        },
        {
          id: 'overview-supported-components',
          heading: 'Building block maturity',
          level: 3,
          subpageId: 'overview',
          blocks: [
            {
              type: 'prose',
              text: 'Treat conversational surface maturity carefully when scoping a product integration:'
            },
            {
              type: 'table',
              columns: ['Maturity stage', 'Covered conversational elements'],
              rows: [
                [
                  'Established design patterns',
                  'Chat window, header, system messages, user messages, structured responses, cards, text composer, launch trigger'
                ],
                ['Preview conventions', 'Welcome screen, expandable cards, human-agent messages'],
                ['Upcoming / unfinalized', 'List blocks, launch chip prompts, multi-thread switcher menu']
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/overview.md',
            heading: '## Supported components',
            lines: '94–117'
          }
        }
      ]
    },
    {
      id: 'usage',
      heading: 'Usage',
      level: 2,
      subpageId: 'usage',
      blocks: [
        {
          type: 'prose',
          text: 'Define clear structural roles inside the chat panel and follow an iterative clarification loop whenever a user request needs narrower scope before answering.'
        }
      ],
      _sourceCitation: { path: 'community/patterns/chatbot/usage.md', heading: '# Chatbots (Usage)', lines: '1–10' },
      children: [
        {
          id: 'usage-anatomy',
          heading: 'Anatomy',
          level: 3,
          subpageId: 'usage',
          blocks: [
            {
              type: 'prose',
              text: 'Combine seven consistent building blocks inside the conversational workspace:'
            },
            {
              type: 'table',
              columns: ['Element', 'Role and rules', 'Variants'],
              rows: [
                [
                  'Header',
                  'Displays the assistant title and up to four utility actions; typically always includes an explicit close control.',
                  'Default, With avatar, Large'
                ],
                [
                  'System message',
                  'Presents bot replies; fade older messages while marking the currently active system reply with a clear visual indicator.',
                  'Default'
                ],
                [
                  'User message',
                  'Shows what the operator submitted via typed text, selected structured choice, or voice.',
                  'Default'
                ],
                [
                  'Structured response',
                  'Offers bot-parseable choice pills; selecting an option changes its visual state and appends a matching user message turn.',
                  'Default'
                ],
                [
                  'Composer input',
                  'Combines a text field, an optional secondary input trigger (such as voice), and a submit button.',
                  'Default, Without secondary action button'
                ],
                [
                  'Launch button',
                  'Serves as the entry trigger that opens the conversation experience.',
                  'Primary, Alternate'
                ],
                [
                  'Chatbot cards',
                  'Present rich informational summaries or next-step actions with text, media, or data.',
                  'Text (Hero, Large, Mini), Image (Avatar, Large, Mini), Data (Table, Visualization)'
                ]
              ]
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/usage.md',
            heading: '## Anatomy (+ chatbot-4.png)',
            lines: '18–53'
          }
        },
        {
          id: 'usage-requesting-information',
          heading: 'Requesting information',
          level: 3,
          subpageId: 'usage',
          blocks: [
            {
              type: 'prose',
              text: 'Follow a predictable turn-by-turn exchange from greeting through clarification and feedback:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Greet the user and introduce what the assistant handles.',
                'Accept the user’s question or task request.',
                'Evaluate readiness to answer: if information is missing, reflect what the bot understood, ask for the missing detail, and offer structured choices; repeat this slot-filling loop until ready.',
                'Deliver the response as text/media, a direct link, or a task action button.',
                'Prompt the user for feedback on whether the response helped.'
              ]
            }
          ],
          demoRefs: ['chatbots-mission-help'],
          _sourceCitation: {
            path: 'community/patterns/chatbot/usage.md',
            heading: '## Requesting information (+ chatbot-1.png)',
            lines: '55–61'
          }
        },
        {
          id: 'usage-best-practices',
          heading: 'Best practices',
          level: 3,
          subpageId: 'usage',
          blocks: [
            {
              type: 'prose',
              text: 'Apply five baseline interaction practices across every conversational flow:'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/usage.md',
            heading: '## Best practices',
            lines: '62–67'
          },
          children: [
            {
              id: 'usage-bp-introduction',
              heading: 'Introduction',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'State clearly that the user is interacting with an automated assistant, explain its purpose, and frame the specific topics people can ask about.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Introduction',
                lines: '68–77'
              }
            },
            {
              id: 'usage-bp-user-intent',
              heading: 'User intent',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Accept initial user goals—whether questions or task requests—through freeform text input or selectable structured prompts.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### User intent',
                lines: '79–89'
              }
            },
            {
              id: 'usage-bp-structured-responses',
              heading: 'Structured responses',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Offer menus of structured choices whenever narrowing scope helps the assistant reach a precise, accurate answer faster.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Structured responses',
                lines: '91–100'
              }
            },
            {
              id: 'usage-bp-reflection',
              heading: 'Reflection',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Paraphrase what the assistant understood to verify intent—especially before performing consequential actions—and repeat slot-filling prompts until every required input is gathered.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Reflection',
                lines: '102–113'
              }
            },
            {
              id: 'usage-bp-feedback',
              heading: 'Provide a response and request feedback',
              level: 4,
              subpageId: 'usage',
              blocks: [
                {
                  type: 'prose',
                  text: 'Deliver a thorough, relevant answer grounded in the gathered context, then invite user feedback (including an optional custom text note when appropriate) so teams can evaluate quality.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/usage.md',
                heading: '#### Provide a response and request feedback',
                lines: '115–128'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'flows',
      heading: 'Flows',
      level: 2,
      subpageId: 'flows',
      blocks: [
        {
          type: 'prose',
          text: 'Complex tasks often require supplementary interactions around launching, escalation to people, long-form cards, and network recovery.'
        },
        {
          type: 'callout',
          kind: 'note',
          text: 'Preview status: multi-thread human handoff, expanding cards, and error-recovery flows represent emerging conventions that remain experimental rather than finalized standards.'
        }
      ],
      _sourceCitation: { path: 'community/patterns/chatbot/flows.md', heading: '# Chatbots (Flows)', lines: '1–19' },
      children: [
        {
          id: 'flows-launching',
          heading: 'Launching a bot',
          level: 3,
          subpageId: 'flows',
          blocks: [
            {
              type: 'prose',
              text: 'Anchor a persistent launch trigger in the bottom-right corner of the viewport, or embed an explicit launch button directly inside the relevant workflow view.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Launching a bot (+ chatbot-5.png)',
            lines: '29–36'
          }
        },
        {
          id: 'flows-multiple-threads',
          heading: 'Multiple threads (Preview)',
          level: 3,
          subpageId: 'flows',
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'prose',
              text: 'Escalate to a live human specialist whenever the bot cannot resolve a request, detects repeated failure or frustration, or the user explicitly prefers human assistance.'
            }
          ],
          demoRefs: ['chatbots-human-handoff'],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Multiple threads (Preview)',
            lines: '37–42'
          },
          children: [
            {
              id: 'flows-mt-user-initiates',
              heading: 'User initiates change',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Support both user-requested escalation and proactive bot offers to transfer after repeated unsuccessful answers.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### User initiates change',
                lines: '43–50'
              }
            },
            {
              id: 'flows-mt-notify',
              heading: 'Notify the user',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Announce context switches and agent arrival with both a transient toast banner and a persistent in-thread status message so conversation history remains clear.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Notify the user',
                lines: '51–58'
              }
            },
            {
              id: 'flows-mt-multiple-users',
              heading: 'Multiple users',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'When multiple specialists participate in one thread, distinguish who the user is speaking with whenever roles or responsibilities differ.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Multiple users',
                lines: '59–66'
              }
            },
            {
              id: 'flows-mt-incoming',
              heading: 'Incoming messages',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Signal background thread activity with an unread dot on the threads control, per-thread unread counts inside the threads list, and distinct styling for unread threads.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Incoming messages',
                lines: '67–75'
              }
            }
          ]
        },
        {
          id: 'flows-expanding-cards',
          heading: 'Expanding cards (Preview)',
          level: 3,
          subpageId: 'flows',
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'prose',
              text: 'Use progressive card expansion when structured output exceeds comfortable inline summary density.'
            }
          ],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Expanding cards (Preview)',
            lines: '76–80'
          },
          children: [
            {
              id: 'flows-ec-default',
              heading: 'Default state',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Highlight only critical summary facts in the collapsed card and provide a clear expand action.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Default state',
                lines: '81–87'
              }
            },
            {
              id: 'flows-ec-expanded',
              heading: 'Expanded state',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Reveal fuller details inside the expanded card; link to a full-page view only when genuinely unavoidable.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Expanded state',
                lines: '88–94'
              }
            },
            {
              id: 'flows-ec-full-view',
              heading: 'Full view',
              level: 4,
              subpageId: 'flows',
              experimentalStatus: 'Preview',
              blocks: [
                {
                  type: 'prose',
                  text: 'Reserve a dedicated full-view container strictly for long-form content that would overwhelm the chat stream.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/flows.md',
                heading: '### Full view',
                lines: '95–101'
              }
            }
          ]
        },
        {
          id: 'flows-error-states',
          heading: 'Error states (Preview)',
          level: 3,
          subpageId: 'flows',
          experimentalStatus: 'Preview',
          blocks: [
            {
              type: 'prose',
              text: 'Flag undelivered user messages clearly right in the transcript (for example with an inline error marker and connection-loss banner). Once connectivity returns, show a brief connected confirmation and then clear both that notice and the message-level error badges.'
            }
          ],
          demoRefs: ['chatbots-error-recovery'],
          _sourceCitation: {
            path: 'community/patterns/chatbot/flows.md',
            heading: '## Error states (Preview) (+ chatbot-6.png)',
            lines: '102–109'
          }
        }
      ]
    },
    {
      id: 'content',
      heading: 'Content',
      level: 2,
      subpageId: 'content',
      blocks: [
        {
          type: 'prose',
          text: 'Once user research validates the need for a chatbot, shape its voice, expectations, and dialogue guardrails around clear, non-deceptive communication.'
        }
      ],
      _sourceCitation: {
        path: 'community/patterns/chatbot/content.md',
        heading: '# Chatbots (Content)',
        lines: '1–15'
      },
      children: [
        {
          id: 'content-conversational-writing',
          heading: 'Conversational writing',
          level: 3,
          subpageId: 'content',
          blocks: [],
          _sourceCitation: {
            path: 'community/patterns/chatbot/content.md',
            heading: '## Conversational writing',
            lines: '23–24'
          },
          children: [
            {
              id: 'content-tailoring',
              heading: 'Tailoring the conversation to your users',
              level: 4,
              subpageId: 'content',
              blocks: [
                {
                  type: 'prose',
                  text: 'Adjust tone to fit the operator’s domain and task seriousness so phrasing feels natural without distracting from expectations.'
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/content.md',
                heading: '### Tailoring the conversation to your users',
                lines: '25–35'
              },
              children: [
                {
                  id: 'content-tailoring-should',
                  heading: 'In general, bots should',
                  level: 5,
                  subpageId: 'content',
                  blocks: [
                    {
                      type: 'callout',
                      kind: 'do',
                      text: 'Use straightforward language, keep a genuinely helpful tone without forced enthusiasm, paraphrase inputs to confirm understanding, and offer fallback options or help when users get stuck.'
                    }
                  ],
                  _sourceCitation: {
                    path: 'community/patterns/chatbot/content.md',
                    heading: '#### In general, bots should:',
                    lines: '36–43'
                  }
                },
                {
                  id: 'content-tailoring-should-not',
                  heading: 'Typically, bots should not',
                  level: 5,
                  subpageId: 'content',
                  blocks: [
                    {
                      type: 'callout',
                      kind: 'dont',
                      text: 'Never impersonate a human, leave users with a dead end and no recourse, or send pushy, unsolicited prompts.'
                    }
                  ],
                  _sourceCitation: {
                    path: 'community/patterns/chatbot/content.md',
                    heading: '#### Typically, bots should not:',
                    lines: '44–52'
                  }
                }
              ]
            },
            {
              id: 'content-principles',
              heading: 'Conversation design principles for bots',
              level: 4,
              subpageId: 'content',
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Introduce the bot clearly: establish non-human identity, scope boundaries, practical value, and realistic next steps.',
                    'Orient the user: explain supported topics and tasks upfront rather than assuming users guess what to ask.',
                    'Be proactive with structured prompts: suggest starter options when users may not know how to phrase a question.',
                    'Decrease ambiguity before consequential acts: restate key values or targets for confirmation, summarize complex inputs, and rely on structured replies to prevent dead ends.',
                    'Provide clear, manageable actions: keep structured menus small enough to scan without overwhelming users.',
                    'Guide multi-step progress: communicate expected wait or duration, confirm progress, and let users cancel or restart longer tasks.',
                    'Collect feedback: invite ongoing ratings or input so teams can monitor and improve response accuracy.'
                  ]
                }
              ],
              _sourceCitation: {
                path: 'community/patterns/chatbot/content.md',
                heading: '### Conversation design principles for bots',
                lines: '54–83'
              }
            }
          ]
        }
      ]
    }
  ],
  demos: [
    {
      id: 'chatbots-mission-help',
      title: 'Ask for help with mission planning',
      sectionId: 'usage-requesting-information',
      secondarySectionIds: ['usage-anatomy', 'usage-best-practices', 'overview-common-use-cases', 'content-principles'],
      mappingStatus: 'partial-divergent',
      scenario:
        'A pilot asks how to find route details; the scripted helper explains its limits and points to the mission record.',
      teaching: {
        meaning:
          'A conversational helper answers scoped natural-language lookups when people do not know where a record lives, while disclosing what it cannot do.',
        decision:
          'Introduce bot identity and topic limits upfront, pair freeform text with scannable structured prompts, reflect ambiguous intent before acting, and close helpful answers with a feedback prompt.',
        consider:
          'Keep the active system reply visually distinct from faded prior messages, lock selected prompt chips as echoed user turns, and never imply authority over unverified operational domains.'
      },
      interactive: true,
      _demoNote:
        'Live demo (`demos.tsx:2573-2613`) omits header utility actions/close control, past-message fading vs. active-reply bar indicator, selected structured-pill state change, multi-turn slot-fill confirmation loop, and a post-answer feedback prompt.'
    },
    {
      id: 'chatbots-standard-navigation',
      title: 'Continue through standard navigation',
      sectionId: 'overview-user-needs-dont',
      secondarySectionIds: ['content-tailoring-should', 'content-principles'],
      mappingStatus: 'partial-divergent',
      scenario: 'When a question is outside the helper’s scope, direct the user back to the Missions workspace.',
      teaching: {
        meaning:
          'Chat should work alongside ordinary product navigation rather than trapping users inside conversation for predictable tasks.',
        decision:
          'Avoid routing tasks through chat when standard UI finishes faster, and always give a direct escape hatch to conventional workspace views when a bot reaches its limit.',
        consider: 'Link directly to the target workspace view rather than echoing another bot message.'
      },
      interactive: true,
      _demoNote:
        'The action opens an in-card Missions destination preview and clearly states that product navigation did not occur; a live route is not connected in this sample.'
    },
    {
      id: 'chatbots-error-recovery',
      title: 'Recover when a message cannot be sent',
      sectionId: 'flows-error-states',
      mappingStatus: 'partial-divergent',
      scenario:
        'Show a clear failed state and preview retry recovery; this local example does not send a real message.',
      teaching: {
        meaning:
          'Send failures require visible inline status and an immediate recovery path so operators know their prompt did not go through.',
        decision:
          'Follow Preview error-state guidance: mark undelivered user bubbles inline alongside a connection notice, offer Retry, and clear error indicators after displaying a brief reconnect confirmation.',
        consider:
          'Error recovery in the community reference carries Preview status rather than finalized specification guarantees.'
      },
      interactive: true,
      _demoNote:
        'Retry updates a local preview only; it does not resend a message or contact a service. Per-message failure badges and transient reconnect-banner clearing are not modeled.'
    },
    {
      id: 'chatbots-human-handoff',
      title: 'Hand off a complex request to a person',
      sectionId: 'flows-multiple-threads',
      secondarySectionIds: ['flows-mt-user-initiates', 'flows-mt-notify', 'overview-user-needs-dont'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Preview a support handoff and preserve a return path; this example does not contact a support teammate.',
      teaching: {
        meaning:
          'Sensitive, complex, or repeatedly unresolved requests need a transparent escalation path to a human teammate.',
        decision:
          'Follow Preview multi-thread conventions: trigger handoff on user request or repeated failure, notify via both a top banner and an in-thread status message, distinguish agent roles, and surface unread counts across background threads.',
        consider:
          'Disclose shared conversation context and real support availability; escalation conventions carry Preview status.'
      },
      interactive: true,
      _demoNote:
        'The handoff changes only the preview; it does not open a support thread. Toast + in-thread notifications, agent role indicators, and unread thread badges/counts are not modeled.'
    }
  ],
  _implementationNotes: [
    'ChatbotsDemo currently composes Input, Button, and Alert in local component state (`demos.tsx:2553-2672`); `catalog.ts:458` lists Command unused by the current demo.'
  ]
}
