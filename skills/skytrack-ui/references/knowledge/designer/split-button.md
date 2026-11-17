# Split Button

> One dominant action plus a menu of related actions, joined into a single control.

- Package version: `0.1.6`
- Public export: `skytrack-ui/split-button`
- Implementation: [`src/components/ui/split-button.tsx`](../../../../../src/components/ui/split-button.tsx)
- Public type declaration: [`dist-lib/components/ui/split-button.d.ts`](../../../../../dist-lib/components/ui/split-button.d.ts)
- Showcase demo id: `split-button`
- Closest demo: [`src/demos/split-button.demo.tsx`](../../../../../src/demos/split-button.demo.tsx)

## Usage

Use Split Button when one action is clearly dominant and the menu holds variants or follow-ups of that same action: **Save** with *Save as draft*, **Export** with *Export as CSV*, **Publish** with *Schedule*.

- **Fit:** The primary action covers most cases; the menu is the short tail of related options.
- **Avoid:** Actions of equal weight, unrelated commands, navigation, filters, or settings.
- **Best alternative:** Separate Buttons when both actions matter; `skytrack-ui/toolbar` for a set of peer actions; `skytrack-ui/menu` alone for a command list with no primary action.

**Live demo variant:** `Default`

## Types

Choose the variant by the consequence of the primary action, and the size by the surrounding control. Both come from the Button configuration, so Split Button never introduces a second visual scale.

- **Variant:** `default` for normal work, `destructive` when the primary action deletes, `outline` and `secondary` in dense panels, `ghost` in toolbars, `link` for inline navigation-like actions.
- **Size:** `xs` and `sm` in table rows and toolbars, `default` in forms and page headers, `lg` for a single first-run action.

**Live demo variant:** `Variants`

## Behavior

The primary half acts immediately. The caret opens a menu; nothing opens from the primary half.

- **Menu:** Owned by Menu, including arrow keys, Escape, outside click, and focus return. Do not build a custom popup.
- **Unavailable action:** Disable the action half and keep the menu reachable when its items are still valid.

| Do                                                                  | Don't                                                                | Why                                                                     |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Pair one dominant action with a short list of related actions.      | Use a split button for commands with equal weight or unrelated jobs. | The joined control implies a hierarchy that the commands do not have.   |
| Keep the caret menu short and scoped to the same object and task.   | Hide unrelated page or system commands behind the caret.              | People scan the primary label and expect the menu to continue it.        |

**Live demo variant:** `Disabled action`

## Layout

Keep the two halves at the same height and let the control size come from the surrounding layout. The caret is always on the trailing side.

- **Width:** The control sizes to its label; set a max width on the action for long labels rather than letting the pair stretch.
- **Placement:** Put the split button where the primary action would sit, usually the end of a page header or dialog footer, with secondary buttons beside it.
- **Spacing:** Keep at least 8px between the split button and neighbouring controls so the joined edge reads as one control.

**Live demo variant:** `Sizes`

## Accessibility

- Two tab stops: the action first, then the caret. Do not merge them into one button.
- The caret needs an accessible name such as “More actions”; never rely on the icon alone.
- Group the halves so assistive technology announces them together; the component provides the group role.
- The focus ring must stay visible on both halves, including where they meet.
- Keep the menu trigger enabled when the menu items remain valid, even if the primary action is disabled.

**Live demo variant:** `Default`

## Content

Label the primary action with a specific verb and object: “Save mission”, “Export report”, “Publish changes”. The caret carries no visible text.

- **Menu labels:** Use sentence case and name the outcome, not the mechanism: “Save as draft”, not “Draft mode”.
- **Pairing:** Every menu item must read as a variation or follow-up of the primary label.
- **Destructive items:** Place destructive menu items last, separated from the routine ones.
- **Length:** Keep the primary label under about 24 characters and menu labels under about 32 so the pair stays compact.

**Live demo variant:** `Leading icon`
