# Code Block

> A readable block for inspecting or copying code, commands, output, and diffs.

- Package version: `0.1.5`
- Public export: `skytrack-ui/code-block`
- Implementation: [`src/components/ui/code-block.tsx`](../../../../../src/components/ui/code-block.tsx)
- Public type declaration: generated target is `dist-lib/components/ui/code-block.d.ts`; it is not present until the library build runs.
- Showcase demo id: `code-block`
- Closest demo: [`src/demos/code-block.demo.tsx`](../../../../../src/demos/code-block.demo.tsx)
- Official guidance: [shadcn/ui Code Block](https://ui.shadcn.com/docs/components/base/code-block) · [Shiki](https://shiki.style/guide/install)

## Usage

Use Code Block when people need to read or copy code, command output, logs, or a small diff. Use an editor only when they need to write or run code. Keep important context in the title or surrounding content, not only in syntax color.

**Live demo variant:** `Default`

## Types

- **Default:** neutral code or output.
- **Destructive:** code or output associated with an error state.
- **Default / small size:** use the default density for routine reading and small only when surrounding content is intentionally compact.
- **Plain / highlighted:** plain text is the baseline; syntax highlighting is optional and must not carry meaning by color alone. Highlighted code uses VS Code Light+ in light mode and Dark+ in dark mode.

**Live demo variant:** `Syntax highlighting`

## Behavior

People can scroll or wrap long lines, focus the code area, copy its contents, and read line numbers when enabled. A copy result is announced. Added, removed, and highlighted diff lines have distinct semantic treatments and visible markers.

| Do | Don't | Why |
| --- | --- | --- |
| Show a concise filename or purpose and keep the code copyable. | Put essential instructions only in syntax colors or omit needed context. | People need to understand the snippet and use it with assistive technology. |

**Live demo variant:** `Diff`

## Layout

Let the code area use the available width and scroll horizontally for long lines unless wrapping improves the task. Keep related copy actions in the header. Use a footer only for an action or status that belongs to the snippet.

**Live demo variant:** `Line numbers`

## Accessibility

Keep the copy control labeled and preserve its success/failure announcement. The code region is keyboard-focusable; diff markers and labels should remain understandable without color. Do not embed executable or editable experiences in a read-only code display.

**Live demo variant:** `Small terminal output`

## Content

Use a short filename, command name, or purpose as the title. Preserve whitespace and meaningful line breaks. Keep copied text aligned with the displayed snippet, including diff signs.

**Live demo variant:** `Default`
