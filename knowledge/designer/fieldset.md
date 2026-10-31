# Fieldset

> A group of related form choices under one clear heading.

- Package version: `0.1.5`
- Public export: `skytrack-ui/fieldset`
- Implementation: [`src/components/ui/fieldset.tsx`](../../src/components/ui/fieldset.tsx)
- Public type declaration: [`dist-lib/components/ui/fieldset.d.ts`](../../dist-lib/components/ui/fieldset.d.ts)
- Showcase demo id: `fieldset`
- Closest demo: [`src/demos/fieldset.demo.tsx`](../../src/demos/fieldset.demo.tsx)
- Official guidance: [W3C WAI Grouping Controls Tutorial](https://www.w3.org/WAI/tutorials/forms/grouping/)

## Usage

Use Fieldset to semantically group related form controls that serve a common purpose—such as grouping account preferences, notification settings, or access options.

- **Fit:** Organizing multi-field sections within complex forms before wrapping them in visual cards.
- **Avoid:** Single isolated inputs (use Field), or top-level page tab views (use Tabs).
- **Best alternative:** For single inputs, use Field. For dividing unrelated screen sections, use Separator.

**Live demo variant:** `Default`

## Types

Fieldset supports two visual legend styles:

- **Standard Fieldset (`Default`):** Renders a prominent legend title with a subtle horizontal divider line separating the section header from its child fields.
- **Legend Without Divider (`Legend without divider`):** A minimalist presentation that displays the legend heading without a horizontal border rule, ideal for dense forms.

**Live demo variant:** `Legend without divider`

## Behavior

Fieldset provides unified container behavior:

- **Unavailable group:** When a whole group cannot be changed, make that clear across all of its choices and explain why when useful.
- **Validation grouping:** Errors across child fields roll up logically under the fieldset context.

| Do                                                                                                | Don't                                                                                      | Why                                                                                      |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Group logically related form inputs with Fieldset so screen readers announce the section context. | Present a flat 20-field form without grouping related parameters under meaningful headers. | Unstructured long forms increase cognitive fatigue and lead to misconfigured parameters. |

**Live demo variant:** `Default`

## Layout

Fieldset structures content with standard spacing tokens:

- **Spacing:** Separate content groups by 24px, and separate group headings from content by 12–16px.
- **Nesting:** Fieldset serves as a semantic surface before wrapping into cards. Do not make every small group a card by default.
- **Mobile viewports:** Fieldsets span full width; form fields inside stack cleanly in a single column with 16px gaps.

**Live demo variant:** `Default`

## Accessibility

Give each group a clear heading that helps people understand the related controls, including when navigating with assistive technology.

**Live demo variant:** `Legend without divider`

## Content

Legends should be concise category titles in sentence case or title case (e.g., "Fail-safe Return Parameters", "Activity Data Channels", "Emergency Contacts").

- **Length:** Keep legend titles to 2–4 words.
- **Helper copy:** If a group needs context, place one explanatory sentence below its title in a secondary text style.

**Live demo variant:** `Default`
