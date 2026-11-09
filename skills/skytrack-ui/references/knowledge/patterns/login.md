# Login

> A page where a user gains access through an available sign-in method.

- Pattern ID: `login`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/login-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a login flow at an access boundary; choose and order authentication methods according to product policy.

**User outcome:** A clear access flow supports the methods people can use while protecting account and credential information.

### Design decisions

- Describe available methods and keep validation and server-side error recovery distinct.
- Use the same recovery wording for unknown accounts and incorrect credentials when revealing account membership would be unsafe.
- Account for progressive authentication such as single sign-on and multi-factor verification.
- Use a layout that works at narrow widths and preserves clear focus order.

### SkyTrack UI implementation route

- Use Field and Input for a form illustration with explicit labels and recovery copy.
- Keep the demo non-authenticating and do not collect, transmit, or persist credentials.
- Connect a real login form only to the product authentication flow.

**Candidate components:** `Field`, `Input`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** This library example is a UI illustration only; it does not authenticate.

## Source limits

- Multi-factor authentication limit: the maintained local reference explicitly states that no consolidated MFA pattern guidance exists yet; MFA examples in the demo showcase represent local SkyTrack illustrations.

## Guidance reference

### Overview

Authentication screens verify identity before granting workspace access while avoiding unnecessary clutter, layout shifts, or security leaks.

#### Anatomy of a basic login screen

1. Header title: always label the screen "Log in" (optionally naming the product) rather than "Sign in".
2. Optional "Create account" route placed clearly outside decorative marketing columns.
3. User ID input (commonly email, with optional ID-type selector) before progressively revealing password entry.
4. Optional "Forgot ID or password" recovery link.
5. Optional "Remember user ID" option worded explicitly so users know passwords are never stored locally.
6. Optional ordered list of verified alternate login methods (federated identity or SSO providers).
7. Primary "Continue" button that discovers or advances into the appropriate authentication method.
8. Optional "Need help?" support trigger assisting with unknown user IDs.
9. Optional subtle, brand-consistent page background.

#### When to use

- Initial session entry when accessing a protected workspace or product.
- Voluntary logout: show a clear signed-out confirmation and redirect automatically back to the login screen.
- Inactivity session expiration: prompt re-authentication and redirect back to the operator’s previous page afterward.

### Behavior

#### Progressive authentication

Collect only the user identifier first and click Continue so authentication can inspect the domain or identity policy before disclosing the next screen—reducing clutter and routing SSO users automatically.

**Examples:** `login-progressive-auth`.

##### Single sign-on (SSO)

Route recognized enterprise domains directly into their corporate identity provider—or offer an explicit SSO action when automatic detection cannot run.

##### Username and password

Advance to password entry showing a non-editable ID reminder with a back link to change the user ID alongside "Forgot password". Security rule: never report that an email or account does not exist before the full credential check runs on submission.

##### Multi-factor authentication

> **Source limit:** Source limit: the maintained local reference provides no standardized multi-factor verification flow guidance yet; design second-factor steps cautiously with clear fallback recovery.

##### Showing alternate login options upfront

When your platform must offer federated social or alternate logins on step one alongside user ID, build the form with default-styled controls so the Continue action aligns cleanly next to the user ID input without crowding.

#### Errors and validation

Combine prompt client-side format validation with uniform, anti-enumeration server error recovery.

##### Content guidelines

End full-sentence messages with periods (e.g., "Incorrect ID or password. Try again."), and omit periods on brief field-level fragments (such as "Password is required" or "Enter a valid email").

##### Client-side validation

Validate blank required inputs and syntactic format when focus blurs or Continue is activated, clearing each inline field error immediately as valid input arrives.

##### Server-side errors

When credentials fail server verification after both ID and password are submitted, reload cleanly back to the user-ID entry state, wipe the entered password completely, display a generic error notification naming both fields equally (preventing account enumeration), and stack multiple system notices cleanly without wiping other active page context.

### Design and layout

**Examples:** `login-choose-layout`.

#### Fluid versus default components and alternate button rules

Fluid form controls fit crisp, floating progressive boxes; swap to default controls whenever upfront alternate identity buttons share the screen.

> **dont:** Never stack alternate SSO/social buttons above the primary login form, never wedge alternate buttons between the User ID input and its Continue button, and never bury Create account or SSO links inside the decorative marketing column of a split-screen layout.

#### Position

##### Centered layout

Centers a focused login card over a calm solid canvas or low-contrast background pattern without distracting complex illustrations.

##### Split-screen layout

Places interactive sign-in fields cleanly beside an adjacent product context or artwork panel while keeping every real account/SSO link inside the form column.

#### Spacing

Maintain balanced outer container breathing room in floating fluid login cards so step transitions do not jar vertical height. In unboxed default login layouts, tighten upper spacing by 24px whenever the optional "Remember ID" checkbox is omitted.

### Accessibility

Preserve logical keyboard Tab flow across links, fields, and alternate providers, and wrap the authentication form inside an explicit named landmark region so screen-reader users jump directly past split-screen artwork or marketing text straight to "Log in".

### Related components and patterns

**Related:** Button & Text inputs, OTP field, Fluid styles, Forms, Notifications.

## Interactive and visual examples

### Choose a sign-in layout

- Example ID: `login-choose-layout`
- Type: **Interactive**
- Source mapping: mapped — `design-and-layout`
- Scenario: Switch between centered and split-screen "Log in" layouts without scattering interactive links into decorative space.
- What it teaches: Centered and split layouts present the same sign-in task with different room for context or supporting artwork.
- Decision shown: Use centered layout over solid or subtle backgrounds for focus; choose split layout when scannable product context fits beside login—never placing Create account or SSO links in the decorative column.
- Consider: Wrap the form in a dedicated landmark region so assistive tech jumps past split-screen copy, and preserve responsive readability.

### Authenticate progressively and recover from an error

- Example ID: `login-progressive-auth`
- Type: **Interactive**
- Source mapping: partial-divergent — `behavior-progressive-auth`
- Scenario: Step from user ID to SSO or password entry, reset password and step safely on credential error, and isolate MFA as illustrative.
- What it teaches: Progressive authentication gathers User ID first with Continue, then routes to SSO or Password without premature account-existence checks.
- Decision shown: Never validate unknown accounts before password submission; on credential failure, clear password, return to ID entry with one identical message ("Incorrect ID or password. Try again."), and stack server alerts.
- Consider: MFA guidance is incomplete in the maintained reference; any verification-code step is strictly an illustrative SkyTrack continuation.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
