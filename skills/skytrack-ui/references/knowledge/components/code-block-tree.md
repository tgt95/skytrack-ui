# Code Block Tree

> Inspect nested JSON with syntax highlighting, per-node disclosure, and custom JSX rendering.

- Package version: `0.1.5`
- Public export: `skytrack-ui/code-block-tree`
- Implementation: [`src/components/ui/code-block-tree.tsx`](../../../../../src/components/ui/code-block-tree.tsx)
- Showcase demo id: `code-block-tree`
- Closest demo: [`src/demos/code-block-tree.demo.tsx`](../../../../../src/demos/code-block-tree.demo.tsx)

## Usage

Use Code Block Tree when people need to browse nested JSON and expand objects or arrays. Use `CodeBlock` for static code samples or for programming languages that do not have structured tree navigation.

```tsx
import { CodeBlockTree } from 'skytrack-ui/code-block-tree'
import { Button } from 'skytrack-ui/button'

export function MissionReportJson({ report }: { report: unknown }) {
  return <CodeBlockTree value={report} title='mission-report.json' />
}
```

## Behavior

- Object and array disclosures nest to match the JSON structure. Empty objects and arrays stay visible as `{}` and `[]`.
- Each non-empty object or array can expand or collapse independently. Fold arrows sit after line numbers in a dedicated editor-style gutter. JSON row text indents by two spaces per depth.
- Line numbers default to visible and can be toggled in the code block header or set through the `lineNumbers` API. Hiding numbers keeps the gutter cell and divider mounted, clears only the index text, and shrinks the cell to the narrow disclosure width. Row content stays aligned after it.
- Consumers can hide the line-number toggle with `showLineNumbersToggle={false}` while keeping line numbers visible.
- The `toolbarActions` slot accepts custom JSX and renders after the line-number toggle, before the built-in Copy button.
- JSON tokens use the package Shiki light and dark themes. Unsupported or failed highlighting falls back to readable plain text.
- Invalid JSON shows an error and the original text. An omitted value shows an explicit empty state.
- Copy exports normalized, indented JSON when the input is valid.

## API

`CodeBlockTree` accepts `value?: unknown`, `title?: string`, controlled `lineNumbers?: boolean`, uncontrolled `defaultLineNumbers?: boolean`, `showLineNumbersToggle?: boolean`, `onLineNumbersChange?: (enabled: boolean) => void`, `toolbarActions?: React.ReactNode`, `renderNode?: (context) => React.ReactNode`, and native `<div>` props such as `className`. Line numbers default to visible; the visibility toggle also defaults to visible. A string value is parsed as JSON text; other values are serialized and parsed as JSON. The component owns tree hierarchy and disclosure state. `renderNode` can replace each row's displayed content with JSX while keeping disclosure controls and line numbers. Its context exposes `key`, `label`, `value`, `path`, `depth`, `kind`, `expandable`, `expanded`, and `defaultContent`; return `defaultContent` to retain Shiki rendering for rows you do not customize. Custom toolbar JSX appears before the built-in Copy button.

```tsx
<CodeBlockTree
  value={report}
  lineNumbers={false}
  showLineNumbersToggle={false}
  toolbarActions={
    <Button size='sm' variant='ghost'>
      Download JSON
    </Button>
  }
  renderNode={({ key, value, defaultContent }) =>
    key === 'status' ? <span className='status-badge'>{String(value)}</span> : defaultContent
  }
/>
```

The tree supports JSON structure only. Use `CodeBlock` with `useHighlightedCode(code, language)` for syntax-colored TypeScript, Python, shell, or other standalone snippets; syntax highlighting does not parse those languages into expandable trees.

## Accessibility and limits

Disclosure actions are keyboard-operable buttons with `aria-expanded`. Custom renderers receive JSON data and should keep their JSX readable in both themes. The component reads and copies JSON but does not edit or execute it.
