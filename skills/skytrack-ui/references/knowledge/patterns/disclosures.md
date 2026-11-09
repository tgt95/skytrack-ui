# Disclosures

> User-triggered content that reveals information related to the control or item that opened it.

- Pattern ID: `disclosures`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/disclosures-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a disclosure for secondary details or options that are useful in context but need not occupy the page by default.

**User outcome:** The page stays scannable while related details remain available where they are needed.

### Design decisions

- Keep the revealed content reasonably sized and do not hide critical information.
- Choose inline expansion for related details and a menu or popover for compact options.
- Avoid nested disclosures and avoid opening many competing sections at once.
- Make the trigger, expanded state, and dismissal behavior easy to understand.

### SkyTrack UI implementation route

- Use Collapsible for inline reveal and Menu for a compact set of actions or settings.
- Keep the trigger user initiated and place the revealed content next to its source.
- Use menu apply/cancel actions when users edit several settings as a batch.

**Candidate components:** `Collapsible`, `Menu`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source notes

- Maintained source defines disclosures strictly as user-triggered Popover/Menu controls (up to 6 columns wide). The fourth existing demo ("Inline disclosure · supporting details", built with Collapsible) has no maintained section here and is flagged UNMAPPED.

## Guidance reference

### Overview

Every maintained disclosure pairs two elements: an interactive trigger control and a floating popover panel capable of holding richer text, links, or interactive form controls than a plain informational tooltip.

#### When to use

Use a disclosure when secondary controls, session actions, or view settings belong near an interactive trigger without dedicating permanent canvas space or interrupting work with a full dialog.

#### When not to use

Do not place critical warnings, required workflow forms, or sprawling layouts inside a popover—promote required confirmations to dialogs and complex tasks to side panels or dedicated pages.

#### Best practices

##### Keep disclosures at a reasonable size

Keep floating panels compact and scannable—never wider than six layout columns on desktop screens.

##### Disclosures should be user initiated

Open disclosures strictly when the user activates the trigger control; never pop open panels automatically on page load or idle hover timers.

##### One disclosure should open at a time

Limit the screen to one active disclosure at once so opening a second disclosure automatically closes any previously open panel.

##### Avoid nesting disclosures

Do not launch secondary popovers inside an open disclosure. The lone exception is a side-flyout cascading submenu inside an interactive action menu.

##### Do not hide critical information inside a disclosure

Essential status, legal terms, or blocking prerequisites must remain directly visible on the canvas rather than tucked inside an unrevealed popover.

#### Behaviors

Users should dismiss an open disclosure effortlessly by pressing Escape, clicking outside the panel, toggling the trigger button again, or moving Tab focus past the end of its container.

##### Dismissible action placement

When adding an explicit close (×) button inside a complex disclosure, reserve empty header space in the upper-right corner—never place it inline alongside checkboxes, toggles, or action controls.

#### Visual guidance

##### Trigger button container

Size disclosure triggers consistently across the hierarchy at 48px (large/global header), 40px (medium/toolbar), or 32px (compact/table actions).

##### Trigger button icon

Pair 48px and 40px triggers with 20px icons, stepping down cleanly to 16px icons on compact 32px triggers.

##### Popover container

Anchor the popover layer cleanly beside its trigger button using subtle elevation and sufficient padding so panel edges read distinctly against page cards.

#### Content layout

##### Heading text

Separate concise panel headings from body content tightly (0px extra gap or a hairline horizontal divider).

##### Footer content

Leave at least 16px breathing room or a clear divider above footer actions so confirmation buttons stay distinct from option lists.

##### Multiple sections of text

Break distinct informational groups with consistent vertical spacing or light dividers so panels remain scannable.

##### Interactive elements

Provide at least 16px vertical spacing between interactive inputs, toggles, or links inside a popover to avoid accidental taps.

### Common use cases

Three recurring product patterns apply disclosure panels consistently: header profile menus, batch-applied settings/filter popovers, and split combo-action menus.

### Profile menu

A profile menu anchors to the authenticated user’s trigger in the global header bar and surfaces account identity, session details, quick links, and sign-out.

**Examples:** `disclosures-profile-menu`.

#### Anatomy

- Header trigger: compact 48px icon or avatar button inside the global shell.
- Identity header: user name, handle/email, and optional avatar image.
- Optional dividers grouping logical sections cleanly.
- Optional session metadata (active workspace, plan tier, region) editable or inspectable in context.
- Optional quick links above account navigation items (Profile, Preferences, Log out) with sparse supportive icons.

#### Structure

Align menu rows vertically from general session identity at the top down to account management and session termination actions at the bottom.

#### Functionality

##### Mouse behavior

Clicking the header icon opens or collapses the panel; clicking outside closes it cleanly.

##### Keyboard behavior

Tab highlights the trigger; Enter or Space opens the panel and moves focus to the first menu item; Up and Down arrows step through destinations; Enter invokes and Escape dismisses back to the trigger.

#### Best practices

##### Pair with a global toolbar header

Keep the profile menu anchored in the top-right utility bar of authenticated applications rather than scattering account menus inside body panels.

##### Show session-relevant details

Display identity, active organization, or workspace status needed immediately without duplicating full profile pages.

##### Use selective icons and links to aid orientation

Include recognizable icons or external indicators only where they clarify destination type rather than decorating every line.

### Settings and filter menus

Settings and filter disclosures reveal grouped checkboxes, radio sets, toggles, or search inputs inside a popover paired with batch Apply and Reset actions.

**Examples:** `disclosures-settings-filter-menu`.

#### Anatomy

Combine an icon trigger button, a structured popover housing interactive controls with optional filter search/clear controls, and bottom Apply and Reset actions.

#### Structure

Group related controls cleanly with clear spacing so operators can review pending settings together before committing updates.

#### Functionality

##### Mouse behavior

Controls remain open while adjusting selections; clicking Apply commits all pending choices and closes the popover, while Reset clears unapplied edits or restores saved defaults.

##### Keyboard behavior

Because the panel contains mixed interactive form controls, opening focuses the first interactive control and users move through choices, Reset, and Apply using Tab and Shift+Tab rather than simple single-menu arrows.

#### Best practices

##### Provide Apply and Reset buttons to commit changes together

Apply multi-control edits as a batch so views do not flash or reload mid-selection while the user is still choosing criteria.

##### Do not overcrowd menus

Keep popovers focused on one domain view; promote sprawling preference sets to full settings screens or drawers.

##### Maintain clear element spacing

Preserve at least 16px gaps between grouped form controls so selections stay easy to target.

### Combo button

A combo button merges one dominant primary action with an adjacent menu toggle revealing secondary alternatives.

**Examples:** `disclosures-combo-button`.

#### Anatomy

Pairs a default action button on the left with a slim chevron icon trigger beside it opening an overflow menu popover with horizontal section dividers where needed.

#### Structure

Keep both halves visually joined at equal control height, presenting alternate choices beneath the split trigger without competing with the main label.

#### Functionality

##### Mouse behavior

Clicking the primary half fires the default command immediately; clicking the chevron half opens the menu of alternative commands.

##### Keyboard behavior

Tab reaches the primary button first (Enter or Space triggers it) and tabs next to the chevron toggle (Enter, Space, or Down arrow opens the alternatives menu, navigated with Up/Down arrows and dismissed with Escape).

#### Best practices

##### Choose a clear default action

Assign the high-frequency task as the visible default button so operators succeed in one click, relegating rarer siblings to the menu.

##### Reduce visual clutter in dense headers

Collapse secondary variations into a combo button when adjacent buttons share one object context and would otherwise crowd the toolbar.

##### Avoid extra icons inside labels

> **dont:** Keep text-only labels inside both the primary action button and menu rows—never add extra icons alongside the mandatory split-menu chevron.

### Accessibility

Expose trigger expanded state (`aria-expanded`), open/close cleanly on Enter or Space, and preserve distinct keyboard mechanics: Up/Down arrow traversal for Menu-style lists versus Tab/Shift+Tab movement inside multi-control Settings popovers.

### Related components

**Related:** Button, Popover, Toggletip.

## Interactive and visual examples

### Profile menu · account actions

- Example ID: `disclosures-profile-menu`
- Type: **Interactive**
- Source mapping: partial-divergent — `profile-menu`
- Scenario: Reveal operator account identity, session details, and account actions from a compact menu trigger.
- What it teaches: A profile menu reveals account- or session-related options on request.
- Decision shown: Use it for secondary items tied to the user's identity inside a global header; keep primary task actions in their task context.
- Consider: Keep the menu concise, keyboard reachable via Up/Down arrows, and clear about whether actions navigate or update a session setting.
- Boundary or simplification: Live demo (`demos.tsx:824-844`) renders an isolated outline button "Tuan Trinh · Account" rather than a 48px global-header avatar/icon trigger with session details or dividers.

### Settings and filter menu · change a view

- Example ID: `disclosures-settings-filter-menu`
- Type: **Interactive**
- Source mapping: mapped — `settings-and-filter-menus`
- Scenario: Stage related mission categories in a compact popover, apply them together, and inspect the updated mission list.
- What it teaches: A settings menu reveals compact popover controls for changing a view without keeping every option pinned on screen.
- Decision shown: Use an interactive Popover with batch Reset and Apply buttons so users can inspect several selections before applying together.
- Consider: Navigate mixed panel controls with Tab/Shift+Tab; distinguish pending choices from applied settings and leave 16px spacing between controls.

### Combo button · primary action plus alternatives

- Example ID: `disclosures-combo-button`
- Type: **Interactive**
- Source mapping: mapped — `combo-button`
- Scenario: Highlight one frequent export action while keeping secondary formats grouped behind an adjacent menu trigger.
- What it teaches: A combo button keeps one common action prominent and groups related alternatives.
- Decision shown: Use it when one action is the clear default and alternatives are less frequent; keep extra icons out of primary and menu action labels.
- Consider: Make the default action unmistakable and support Enter/Space/Down-arrow menu activation.

### Inline disclosure · supporting details

- Example ID: `disclosures-inline-local`
- Type: **Interactive**
- Source mapping: UNMAPPED
- Scenario: Reveal secondary waypoint or schedule notes inline inside the page flow using a local Collapsible extension.
- What it teaches: Local extension: an inline Collapsible disclosure reveals related secondary details within the page flow when requested.
- Decision shown: UNMAPPED to maintained source (source covers popover disclosures only). Use inline disclosures only for non-critical supporting details when a floating popover is unnecessary.
- Consider: Keep revealed content focused, avoid nested disclosures, and expose aria-expanded state cleanly.
- Boundary or simplification: UNMAPPED local extension (`demos.tsx:919`, `<Collapsible>`). Maintained `disclosures-pattern/index.md` covers strictly popover-based disclosures (Profile menu, Settings/filter popover, Combo button) and omits inline accordion/collapsible panels. Keep component intact in UI while labeling as a local SkyTrack extension.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
