# Command-driven / Search-first Shell

> Command palette and search-first shell minimizing chrome and maximizing keyboard velocity.

- Package version: `0.1.5`
- Showcase demo id: `command-first-shell`
- Closest demo: [`src/demos/command-first-shell.demo.tsx`](../../../../../src/demos/command-first-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Command-driven Shell for power-user, developer-focused, and operational SaaS products where users prioritize keyboard execution speed over clicking through nested menus. The UI chrome is radically simplified, centering around an omnipresent global search and command palette activated via `Cmd+K` or `Ctrl+K`.

- **Fit:** Developer platforms (Vercel, Linear, GitHub), headless CMS suites, high-velocity SaaS products (Notion Enterprise, Raycast, Superhuman).
- **Avoid:** Low-frequency consumer portals or casual users needing hierarchical guidance.
- **Best alternative:** For casual users requiring menu discovery, choose Left Navigation Shell.

**Live demo variant:** `Default`

## Types

- **Global Command Palette Overlay:** Centered modal dialog triggered via keyboard shortcut for instant action dispatch and entity lookup.
- **Embedded Search-first Header Bar:** Prominent search bar in the global header serving as an omnipresent interactive visual trigger.

## Behavior

- **Global shortcut trigger:** Pressing `Cmd+K` (macOS) or `Ctrl+K` (Windows) anywhere in the application immediately displays the command overlay.
- **Fuzzy matching:** Typeahead search matches abbreviations, verbs, and entity titles with instant ranking.
- **Keyboard-only traversal:** Up/Down Arrow keys navigate matches, `Enter` executes the command, and `Escape` dismisses the palette.

| Do | Don't | Why |
| --- | --- | --- |
| Categorize results clearly into groups such as Actions, Navigation, and Analytics. | Display an undifferentiated flat list of hundreds of mixed results. | Clear categories allow users to immediately discern executable actions from links. |
| Display keyboard shortcuts beside each command item (e.g., `↵`, `⌘B`). | Conceal shortcut cues from power users. | Visible hints accelerate muscle memory and user proficiency over time. |

**Live demo variant:** `Default`

## Layout

- **Minimal header:** 48px height featuring a prominent 320px - 400px command bar with a `⌘K` badge.
- **Workspace area:** Minimalist overview of recent activities, health states, and quick keys.
- **Command overlay:** Centered dialog, 440px - 560px wide, with subtle backdrop blur and deep elevation shadow.

**Live demo variant:** `Default`

## Accessibility

- Autofocus immediately shifts to the command input on open.
- Implements standard `role="combobox"` and `aria-autocomplete="list"` semantics.
- Pressing `Escape` safely closes the palette and restores focus to the previously active element.

**Live demo variant:** `Default`

## Content

- Commands lead with active verbs: "Create new Invoice", "Run Monthly Financial Report", "Rotate Production API Keys".
- Navigation destinations indicate destination context: "Go to Customer: Acme Corp", "View Security Audit Logs".

**Live demo variant:** `Default`
