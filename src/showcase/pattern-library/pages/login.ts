import type { PatternPageDraft } from './types'

export const PAGE_LOGIN: PatternPageDraft = {
  id: 'login',
  title: 'Login',
  group: 'Core',
  source: {
    status: 'Universal',
    limits: [
      'Multi-factor authentication limit: the maintained local reference explicitly states that no consolidated MFA pattern guidance exists yet; MFA examples in the demo showcase represent local SkyTrack illustrations.'
    ],
    _primaryPath: 'docs/carbon-ds-reference/patterns/login-pattern/index.md',
    _excludedSections: [
      '### Quick Navigation (lines 13–23)',
      '## References (lines 417–428)',
      '## Feedback (lines 429–433)'
    ]
  },
  summary:
    'A security-first sign-in pattern using "Log in" framing, progressive user-ID discovery, strict password-reset failure handling that guards against account enumeration, disciplined spacing rules, and landmark accessibility.',
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      level: 2,
      blocks: [
        {
          type: 'prose',
          text: 'Authentication screens verify identity before granting workspace access while avoiding unnecessary clutter, layout shifts, or security leaks.'
        }
      ],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Overview', lines: '24–29' },
      children: [
        {
          id: 'overview-anatomy',
          heading: 'Anatomy of a basic login screen',
          level: 3,
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'Header title: always label the screen "Log in" (optionally naming the product) rather than "Sign in".',
                'Optional "Create account" route placed clearly outside decorative marketing columns.',
                'User ID input (commonly email, with optional ID-type selector) before progressively revealing password entry.',
                'Optional "Forgot ID or password" recovery link.',
                'Optional "Remember user ID" option worded explicitly so users know passwords are never stored locally.',
                'Optional ordered list of verified alternate login methods (federated identity or SSO providers).',
                'Primary "Continue" button that discovers or advances into the appropriate authentication method.',
                'Optional "Need help?" support trigger assisting with unknown user IDs.',
                'Optional subtle, brand-consistent page background.'
              ]
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Anatomy of a basic login screen',
            lines: '30–64'
          }
        },
        {
          id: 'overview-when-to-use',
          heading: 'When to use',
          level: 3,
          blocks: [
            {
              type: 'list',
              items: [
                'Initial session entry when accessing a protected workspace or product.',
                'Voluntary logout: show a clear signed-out confirmation and redirect automatically back to the login screen.',
                'Inactivity session expiration: prompt re-authentication and redirect back to the operator’s previous page afterward.'
              ]
            }
          ],
          _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '### When to use', lines: '65–75' }
        }
      ]
    },
    {
      id: 'behavior',
      heading: 'Behavior',
      level: 2,
      blocks: [],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Behavior', lines: '76–77' },
      children: [
        {
          id: 'behavior-progressive-auth',
          heading: 'Progressive authentication',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Collect only the user identifier first and click Continue so authentication can inspect the domain or identity policy before disclosing the next screen—reducing clutter and routing SSO users automatically.'
            }
          ],
          demoRefs: ['login-progressive-auth'],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Progressive authentication',
            lines: '78–89'
          },
          children: [
            {
              id: 'progressive-sso',
              heading: 'Single sign-on (SSO)',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Route recognized enterprise domains directly into their corporate identity provider—or offer an explicit SSO action when automatic detection cannot run.'
                }
              ],
              _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '#### SSO', lines: '90–101' }
            },
            {
              id: 'progressive-username-password',
              heading: 'Username and password',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Advance to password entry showing a non-editable ID reminder with a back link to change the user ID alongside "Forgot password". Security rule: never report that an email or account does not exist before the full credential check runs on submission.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Username and password',
                lines: '102–117'
              }
            },
            {
              id: 'progressive-mfa',
              heading: 'Multi-factor authentication',
              level: 4,
              blocks: [
                {
                  type: 'callout',
                  kind: 'source-limit',
                  text: 'Source limit: the maintained local reference provides no standardized multi-factor verification flow guidance yet; design second-factor steps cautiously with clear fallback recovery.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Multi-factor authentication',
                lines: '118–129'
              }
            },
            {
              id: 'progressive-separate-methods',
              heading: 'Showing alternate login options upfront',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When your platform must offer federated social or alternate logins on step one alongside user ID, build the form with default-styled controls so the Continue action aligns cleanly next to the user ID input without crowding.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Separate authentication methods',
                lines: '130–154'
              }
            }
          ]
        },
        {
          id: 'behavior-errors-validation',
          heading: 'Errors and validation',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Combine prompt client-side format validation with uniform, anti-enumeration server error recovery.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Errors and validation',
            lines: '155–164'
          },
          children: [
            {
              id: 'errors-content-guidelines',
              heading: 'Content guidelines',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'End full-sentence messages with periods (e.g., "Incorrect ID or password. Try again."), and omit periods on brief field-level fragments (such as "Password is required" or "Enter a valid email").'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Content guidelines',
                lines: '165–172'
              }
            },
            {
              id: 'errors-client-validation',
              heading: 'Client-side validation',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Validate blank required inputs and syntactic format when focus blurs or Continue is activated, clearing each inline field error immediately as valid input arrives.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Client-side validation',
                lines: '173–207'
              }
            },
            {
              id: 'errors-server-errors',
              heading: 'Server-side errors',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'When credentials fail server verification after both ID and password are submitted, reload cleanly back to the user-ID entry state, wipe the entered password completely, display a generic error notification naming both fields equally (preventing account enumeration), and stack multiple system notices cleanly without wiping other active page context.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Server-side errors',
                lines: '208–236'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'design-and-layout',
      heading: 'Design and layout',
      level: 2,
      blocks: [],
      demoRefs: ['login-choose-layout'],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Design and layout', lines: '237–238' },
      children: [
        {
          id: 'layout-fluid-vs-default',
          heading: 'Fluid versus default components and alternate button rules',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Fluid form controls fit crisp, floating progressive boxes; swap to default controls whenever upfront alternate identity buttons share the screen.'
            },
            {
              type: 'callout',
              kind: 'dont',
              text: 'Never stack alternate SSO/social buttons above the primary login form, never wedge alternate buttons between the User ID input and its Continue button, and never bury Create account or SSO links inside the decorative marketing column of a split-screen layout.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Fluid vs. default components > #### Designing for multiple alternate logins',
            lines: '239–286'
          }
        },
        {
          id: 'layout-position',
          heading: 'Position',
          level: 3,
          blocks: [],
          _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '### Position', lines: '287–297' },
          children: [
            {
              id: 'position-centered',
              heading: 'Centered layout',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Centers a focused login card over a calm solid canvas or low-contrast background pattern without distracting complex illustrations.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Centered layout',
                lines: '298–316'
              }
            },
            {
              id: 'position-split-screen',
              heading: 'Split-screen layout',
              level: 4,
              blocks: [
                {
                  type: 'prose',
                  text: 'Places interactive sign-in fields cleanly beside an adjacent product context or artwork panel while keeping every real account/SSO link inside the form column.'
                }
              ],
              _sourceCitation: {
                path: 'patterns/login-pattern/index.md',
                heading: '#### Split-screen layout',
                lines: '317–356'
              }
            }
          ]
        },
        {
          id: 'layout-spacing',
          heading: 'Spacing',
          level: 3,
          blocks: [
            {
              type: 'prose',
              text: 'Maintain balanced outer container breathing room in floating fluid login cards so step transitions do not jar vertical height. In unboxed default login layouts, tighten upper spacing by 24px whenever the optional "Remember ID" checkbox is omitted.'
            }
          ],
          _sourceCitation: {
            path: 'patterns/login-pattern/index.md',
            heading: '### Spacing > #### Fluid style login form / Default style login form',
            lines: '357–402'
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
          text: 'Preserve logical keyboard Tab flow across links, fields, and alternate providers, and wrap the authentication form inside an explicit named landmark region so screen-reader users jump directly past split-screen artwork or marketing text straight to "Log in".'
        }
      ],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Accessibility', lines: '403–410' }
    },
    {
      id: 'related',
      heading: 'Related components and patterns',
      level: 2,
      blocks: [
        {
          type: 'related',
          items: [
            { label: 'Button & Text inputs', kind: 'component' },
            { label: 'OTP field', kind: 'component' },
            { label: 'Fluid styles', kind: 'pattern' },
            { label: 'Forms', kind: 'pattern' },
            { label: 'Notifications', kind: 'pattern' }
          ]
        }
      ],
      _sourceCitation: { path: 'patterns/login-pattern/index.md', heading: '## Related', lines: '411–416' }
    }
  ],
  demos: [
    {
      id: 'login-choose-layout',
      title: 'Choose a sign-in layout',
      sectionId: 'design-and-layout',
      secondarySectionIds: ['position-centered', 'position-split-screen', 'accessibility'],
      mappingStatus: 'mapped',
      scenario:
        'Switch between centered and split-screen "Log in" layouts without scattering interactive links into decorative space.',
      teaching: {
        meaning:
          'Centered and split layouts present the same sign-in task with different room for context or supporting artwork.',
        decision:
          'Use centered layout over solid or subtle backgrounds for focus; choose split layout when scannable product context fits beside login—never placing Create account or SSO links in the decorative column.',
        consider:
          'Wrap the form in a dedicated landmark region so assistive tech jumps past split-screen copy, and preserve responsive readability.'
      },
      interactive: true
    },
    {
      id: 'login-progressive-auth',
      title: 'Authenticate progressively and recover from an error',
      sectionId: 'behavior-progressive-auth',
      secondarySectionIds: ['errors-server-errors', 'progressive-mfa'],
      mappingStatus: 'partial-divergent',
      scenario:
        'Step from user ID to SSO or password entry, reset password and step safely on credential error, and isolate MFA as illustrative.',
      teaching: {
        meaning:
          'Progressive authentication gathers User ID first with Continue, then routes to SSO or Password without premature account-existence checks.',
        decision:
          'Never validate unknown accounts before password submission; on credential failure, clear password, return to ID entry with one identical message ("Incorrect ID or password. Try again."), and stack server alerts.',
        consider:
          'MFA guidance is incomplete in the maintained reference; any verification-code step is strictly an illustrative SkyTrack continuation.'
      },
      interactive: true
    }
  ],
  components: ['Field', 'Input', 'OtpField', 'Button', 'Checkbox', 'Alert']
}
