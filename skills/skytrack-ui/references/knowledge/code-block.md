# Code Block

> Present code, terminal output, or a diff in a readable, copyable block.

- Package version: `0.1.5`
- Public export: `skytrack-ui/code-block`
- Implementation: [`src/components/ui/code-block.tsx`](../../../../src/components/ui/code-block.tsx)
- Public type declaration: generated target is `dist-lib/components/ui/code-block.d.ts`; it is not present until the library build runs. Source types are in the implementation above.
- Showcase demo id: `code-block`
- Closest demo: [`src/demos/code-block.demo.tsx`](../../../../src/demos/code-block.demo.tsx)

## Overview

Use Code Block to display a static snippet, command output, or a line-based diff. Header, copy action, line numbers, wrapping, and footer are optional composition choices. Syntax highlighting is an optional hook so plain text does not load Shiki until it is requested.

**Live demo variant:** `Default`

```tsx
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle
} from 'skytrack-ui/code-block'

const example = 'const ready = mission.status === "planned"'

export function MissionCode() {
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>mission.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={example} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{example}</CodeBlockContent>
    </CodeBlock>
  )
}
```

## Usage

Use it when people need to inspect or copy code, commands, logs, or a compact change preview. Use a code editor only when people need to author or run code. For plain prose, use normal text content instead of a monospaced block.

**Live demo variant:** `Small terminal output`

## Anatomy

- `CodeBlock` provides the bordered, themed root and `default` or `destructive` treatment; `size` is `default` or `sm`.
- `CodeBlockHeader` is optional. Place `CodeBlockTitle` and `CodeBlockActions` directly inside it.
- `CodeBlockCopyButton` copies its `value` and announces success or failure. Place it in `CodeBlockActions`.
- `CodeBlockContent` renders a focusable, left-to-right `<pre><code>` region. `wrap`, `lineNumbers`, and `startLine` are optional.
- `CodeBlockLine` supports `default`, `added`, `removed`, and `highlighted` line treatments. It owns its line height from the root size (`leading-6` for default, `leading-5` for `sm`); empty highlighted lines retain their height with a non-breaking space.
- `CodeBlockFooter` is optional and can hold related actions or status.

Without a header, `CodeBlockActions` is positioned over the content and the content receives top padding. Use the documented direct-child composition so the root can detect its header.

**Live demo variant:** `Diff`

## Variants & states

The root defaults to `variant="default"` and `size="default"`. `variant="destructive"` is for code or output associated with an error state; `size="sm"` reduces content padding, font size, and line height. Content and individual lines share one density mapping. The copy button uses the SkyTrack Button and reports `Copy`, `Copied`, or `Copy failed` through its accessible label and a live status region.

Syntax coloring is opt-in through `useHighlightedCode(code, language)`. It begins as plain text, loads Shiki on demand, and falls back to plain text if the language cannot be highlighted. It follows the package's class-based theme: VS Code Light+ in light mode and VS Code Dark+ under `.dark`.

**Live demo variant:** `Syntax highlighting`

## Accessibility

The content region is keyboard-focusable and uses left-to-right direction for code reading. The copy action is a labeled button and announces its result. Diff markers remain readable alongside their semantic line treatment; do not rely on background color alone. Provide a useful title when the snippet needs context, and do not use this component as a replacement for an editable code field.

**Live demo variant:** `Line numbers`

## API & examples

Import the compound parts from `skytrack-ui/code-block` or named exports from the package root. `CodeBlockContent` accepts native `<pre>` props plus `wrap`, `lineNumbers`, and `startLine`; `CodeBlockLine` accepts native `<span>` props plus its line `variant`. `CodeBlockCopyButton` takes required `value` and optional `copyLabel`, `copiedLabel`, and `copyFailedLabel`. `useHighlightedCode(code, language)` returns renderable line nodes and selects the bundled language with the matching light/dark VS Code theme.

The component uses SkyTrack semantic surface, border, foreground, and state tokens and the package radius token. It does not execute code. The code area scrolls horizontally unless `wrap` is enabled.

**Live demo variant:** `Default`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./code-block`.
- Source, types, and demo: linked above. Generated declaration is not present until `build:lib`.
- Optional syntax highlighting is provided by the package's Shiki dependency; the default unhighlighted path is plain text.
- Official implementation reference: [shadcn/ui Code Block for Base UI](https://ui.shadcn.com/docs/components/base/code-block).
