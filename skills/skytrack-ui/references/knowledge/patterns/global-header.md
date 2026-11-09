# Global header

> Persistent navigation and orientation across a product, paired with local navigation for the current area.

- Pattern ID: `global-header`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/global-header/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a global header when people need a consistent way to orient and move between product areas.

**User outcome:** A stable global frame helps people move between product areas without confusing page actions with navigation.

### Design decisions

- Keep a clear sense of place and show breadcrumb levels when they help explain hierarchy.
- Keep cross-product navigation and system utilities separate from controls for the current page.
- Separate global navigation from page-level controls and match the visual hierarchy to source order.
- Provide keyboard access, landmarks, and a skip path to the main content.

### SkyTrack UI implementation route

- Compose Breadcrumb for location and Toolbar/Menu for grouped page actions.
- Keep global navigation persistent and page controls associated with the current content.
- Use semantic navigation landmarks and a clear main heading.

**Candidate components:** `Breadcrumb`, `Toolbar`, `Menu`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Guidance reference

### Overview

Anchor the top shell bar consistently across platform products so operators always recognize where they sit, switch products cleanly, and open utilities without losing active context.

#### Anatomy of a global header

1. Main menu toggle: optional hamburger icon opening and closing an accompanying left navigation panel.
2. Header brand name: platform identifier followed by product title, linking directly back to the product or domain home view.
3. Header navigation links: peer product sections within the same domain (never spawning new tabs or crossing to external domains); collapse cleanly into the left panel on narrow screens.
4. Sub-menu triggers: non-link dropdown triggers whose chevron rotates upward while expanded, closing upon item selection, label toggle, or outside click.
5. Utilities: right-justified system icons (notifications, profile, settings, search) opening utility drawers or panels—never navigating away as direct links.
6. App switcher: dedicated right-edge menu listing recent, frequent, or platform applications.

#### Header and panel persistence

Distinguish global persistence (shell zones that stay constant across the entire product suite) from local persistence (controls shown only inside one product section or workflow).

#### Task hierarchy

Separate system tasks (authentication, workspace switching, notifications, preferences, billing) from product tasks (creating, filtering, analyzing, and collaborating on domain records).

#### Persistence and task placement matrix

| Scope                  | System tasks                                                                                       | Product tasks                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Global (everywhere)    | Login, account/profile, notifications, home dashboard link, billing, permissions, product switcher | Left-nav drawer toggle, consistent cross-product Create/Save/Cancel actions |
| Local (single product) | Detailed workspace or notification configuration                                                   | Comments, record-to-record hops, context/mode toggles                       |

### Configurations

Select the header-only shell or pair it with a persistent/collapsible left navigation panel according to hierarchy depth and whether sub-menus must stay visible.

**Examples:** `global-header-with-local-nav`.

#### Header only

Best when top-level product destinations are few enough to fit cleanly across the header bar and no sub-menu group needs to stay pinned open alongside page content (since open header sub-menus overlay the workspace).

#### Header with left panel

Use when products carry deeper hierarchies, secondary category links, or nested sub-menus that benefit from staying expanded vertically without occluding workspace tables or maps.

### Navigation

#### Global navigation

Right-justify global system utilities and left-align product shell links. On constrained viewports, route left-aligned product links into the left drawer and right-aligned system utilities cleanly into a dedicated right utility panel while keeping shared platform suites structurally consistent.

#### Local navigation

Keep workflow-specific tabs, mission selectors, and scoped actions below the global bar inside page context rather than inflating global header slots.

### Best practices

#### Persistent data and UI state

Preserve active filters, selected mission context, and view state across navigation pivots (for example through URL parameters, noting that application routing must supply state persistence rather than expecting header shell markup to track it). Warn operators before leaving unsaved changes.

#### Sense of place

Make signed-in account identity, active workspace/environment, active navigation item, and operating mode unmistakable from any screen.

#### Drill down levels and breadcrumbs

When opening deep object records from collection views, place a breadcrumb trail directly above the page title leading cleanly back to root context.

#### Organizational schemes

Choose an information architecture matching how operators mentally find tools—and avoid letting unbounded user data overrun shell navigation:

**Examples:** `global-header-organize-destinations`.

##### Most recent

Surfaces recently opened workspaces or services first for quick recall, though weaker for discovering unfamiliar capabilities.

##### Customized

Permits operators or admins to pin priority destinations for recurring workflows.

##### Audience

Groups tools around distinct role workflows (pilots, planners, dispatchers), watching out for shared cross-role overlap.

##### Alphabetically

Useful strictly when operators already know exact product names; breaks down whenever users search by synonym or task.

##### Domain organization

Organize destinations by cohesive product capabilities and user domain concepts—never mirror internal corporate org charts or acquisition history.

##### Unbound content

> **dont:** Do not push user-created, arbitrarily growing record lists (hundreds of individual missions or logs) into shell side navigation—surface unbounded collections inside index tables and object drill-downs instead.

### Accessibility

#### Matching DOM order to visual hierarchy

Sequence DOM elements to mirror left-to-right visual flow (per WCAG C27), keeping responsive panel collapse orderly and aligning HTML headings (h1–h6) strictly to visual hierarchy for non-sighted header scanning.

#### Keyboard navigation and landmarks

##### Skip to main content

Place a keyboard-focusable "Skip to main content" link as the very first focus stop on the page (WCAG 2.4.1) so keyboard users bypass repetitive shell chrome directly into primary content.

##### Landmark regions and rotor navigation

Define distinct banner, navigation, search, and main landmark regions, giving every `<nav>` block (such as Global shell vs. Mission local navigation) a unique descriptive `aria-label` so screen-reader rotors tell regions apart unambiguously.

### Related components and patterns

**Related:** Breadcrumb, Menu & Navigation, Disclosures (Profile menu), Notifications (Panel).

## Interactive and visual examples

### Global header with local mission navigation

- Example ID: `global-header-with-local-nav`
- Type: **Interactive**
- Source mapping: partial-divergent — `configurations`
- Scenario: Compare a workspace-wide header alone with the same header beside mission-specific destinations; keep utilities and product switching separate.
- What it teaches: A global header gives persistent access to workspace-wide destinations while local navigation supports the current mission.
- Decision shown: Use header-only when hierarchy is shallow and sub-menus need not stay pinned open; add the left panel for vertical navigation layers, separating utility panel triggers from the app switcher.
- Consider: Provide a "Skip to main content" first Tab link, label separate nav landmarks uniquely, and route responsive product links left vs. system utilities right.
- Boundary or simplification: The desktop preview separates the Utilities menu from product switching and includes a skip link. It does not model mobile utility drawers or expandable submenu states.

### Organize destinations around workspace or current mission

- Example ID: `global-header-organize-destinations`
- Type: **Interactive**
- Source mapping: partial-divergent — `bp-organizational-schemes`
- Scenario: Compare five ways to group product destinations, and keep user-created mission records in a drill-down list instead of the global shell.
- What it teaches: Navigation can be organized using clear domain schemes—most recent, customized, audience, alphabetical, or product capabilities—while excluding unbounded user records from side rails.
- Decision shown: Choose a scheme aligned to how users look up tools rather than internal company hierarchy, and move large user-created lists into drill-down index views with breadcrumbs.
- Consider: Keep active account/mode visible and preserve filters in URL state across navigation pivots. The preview compares five bounded destination schemes; it does not model saved account or URL state.
- Boundary or simplification: The preview compares the five bounded schemes and explains where user-created records belong; saved account mode and URL filter state are not simulated.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
