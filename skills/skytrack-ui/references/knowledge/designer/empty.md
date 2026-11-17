# Empty

> A placeholder that explains why a region has no content and what people can do next.

- Package version: `0.1.5`
- Public export: `skytrack-ui/empty`
- Implementation: [`src/components/ui/empty.tsx`](../../../../../src/components/ui/empty.tsx)
- Public type declaration: [`dist-lib/components/ui/empty.d.ts`](../../../../../dist-lib/components/ui/empty.d.ts)
- Showcase demo id: `empty`
- Closest demo: [`src/demos/empty.demo.tsx`](../../../../../src/demos/empty.demo.tsx)

## Usage

Use Empty whenever a table, panel, card, or search result area has nothing to show. It names the state, explains it briefly, and offers the next useful action.

- **Fit:** A region that normally holds records is empty because of first use, filtering, or a disconnected source.
- **Avoid:** A failed request or validation problem (use Alert), a loading period (use a skeleton or progress treatment), or adding files (use Dropzone).
- **Best alternative:** Alert for errors that need recovery; Dropzone for accepting a file; a list or card layout once records exist.

**Live demo variant:** `With actions`

## Types

Choose emphasis based on where the state appears. The default treatment uses a bordered media tile for page- or panel-level states; the simple treatment removes the tile for compact or low-emphasis regions such as a small panel or sidebar section.

**Live demo variant:** `Simple`

## Behavior

Empty is static. Nothing expands, collapses, or opens from the placeholder itself.

- **Actions:** Any buttons or links in the action row behave like their standard components, including keyboard focus and disabled states.
- **Filtered results:** The message should name the active query or filter when that context is not obvious, so the state does not look like a system failure.

| Do                                                                    | Don't                                                              | Why                                                          |
| --------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| Name the state and keep one clear next step.                          | Show “No data” with no context or path forward.                    | People need to know whether the state is expected or broken. |
| Offer an action only when the person can actually complete it.        | Show a create or retry action the person has no permission to use. | A dead-end action makes the state misleading.                |

**Live demo variant:** `Inline in panel`

## Layout

Center Empty in the region it describes, with enough surrounding space that it reads as one message rather than stray text.

- **Spacing:** Three sizes — small, default, and large — change padding, the media mark, and the copy scale. Use small inside compact panels and table bodies; large for full-page or first-run areas.
- **Mobile viewports:** Keeps a single centred column; actions wrap below the copy and keep touch targets at least 44px.

**Live demo variant:** `Sizes`

## Accessibility

Empty is static text with no automatic announcement. When it appears after a search or filter, announce the result change through the surrounding search or table status region.

- **Media:** The built-in mark is decorative. A custom illustration needs meaningful alt text only when it adds information beyond the copy.
- **Headings:** The title is visual, not a heading element. When people need to reach the state through the document outline, ask for heading semantics in implementation.
- **Actions:** Keep the next step reachable by keyboard and visible on focus.

**Live demo variant:** `With actions`

## Content

Titles name the missing content in sentence case, for example “No missions scheduled”. Descriptions explain the likely cause and the next step in one or two short sentences.

- **Action labels:** Use a specific verb such as “New mission”, “Clear search”, or “Manage connections”; avoid “Submit” or “OK”.
- **Tone:** Describe the state neutrally. Do not blame the person or imply a failure when the region is simply empty.
- **Context:** Include the active search term or filter when that is why the region is empty.

**Live demo variant:** `Simple`
