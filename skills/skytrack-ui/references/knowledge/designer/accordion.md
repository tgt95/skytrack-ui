# Accordion

> Expandable sections help people scan related information and reveal details when needed.

- Package version: `0.1.5`
- Public export: `skytrack-ui/accordion`
- Implementation: [`src/components/ui/accordion.tsx`](../../../../../src/components/ui/accordion.tsx)
- Public type declaration: [`dist-lib/components/ui/accordion.d.ts`](../../../../../dist-lib/components/ui/accordion.d.ts)
- Showcase demo id: `accordion`
- Closest demo: [`src/demos/accordion.demo.tsx`](../../../../../src/demos/accordion.demo.tsx)
- Official guidance: [W3C WAI ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

## Usage

Use Accordion when people need to scan related topics and reveal details without leaving the current view.

- **Fit:** Frequently asked questions, grouped preferences, and secondary details related to one task.
- **Avoid:** Primary navigation (use Navigation Menu), solitary disclosures (use Collapsible), or full-screen view switches (use Tabs). Never conceal critical alarms or blocking fields inside collapsed panels.
- **Best alternative:** For a single disclosure section, use Collapsible.

**Live demo variant:** `Demo`

## Types

Choose a single-open, multi-open, or compact disclosure according to whether people need to compare sections or focus on one at a time.

## Behavior

Expanding an item rotates the trailing chevron 180 degrees and smoothly animates panel height.

- **Open sections:** Allow several sections to stay open when people need to compare information across them. Use one-open-at-a-time behavior when the sections are alternatives and comparison is unnecessary.
- **Keyboard activation:** People can focus each section control and expand or collapse it with Enter or Space.

| Do                                                                              | Don't                                                                                    | Why                                                                          |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Let people keep related sections open when they need to compare their contents. | Close one section whenever another opens, even when people need to cross-reference both. | Keeping useful context visible reduces repeated navigation between sections. |

**Live demo variant:** `Open multiple panels`

## Layout

Let the accordion fill its content area so section labels and revealed content have room to read.

- **Spacing:** Separate items with subtle dividers. Give revealed content 12–16px of vertical breathing room.
- **Mobile viewports:** Stacks vertically in a single column with minimum 44px tap targets on triggers.

**Live demo variant:** `Demo`

## Accessibility

Make open sections easy to identify and connect each section control with the content it reveals. Users can reach controls with Tab and expand or collapse them with Enter or Space. Do not rely on color alone to show state.

**Live demo variant:** `Disabled item`

## Content

Trigger labels should be short, specific noun phrases in sentence case (e.g., "Account details", "Notification preferences").

- **Length:** Keep headers concise and scannable. Context determines appropriate length; avoid arbitrary word limits.
- **Secondary text:** Add a brief supporting hint below a label only when it helps people decide whether to open the section.

**Live demo variant:** `Hidden until found`
