# Progress

> A high-quality, unstyled React progress bar component that displays the status of a task that takes a long time.

- Package version: `0.1.5`
- Public export: `skytrack-ui/progress`
- Implementation: [`src/components/ui/progress.tsx`](../../../../../src/components/ui/progress.tsx)
- Public type declaration: [`dist-lib/components/ui/progress.d.ts`](../../../../../dist-lib/components/ui/progress.d.ts)
- Showcase demo id: `progress`
- Closest demo: [`src/demos/progress.demo.tsx`](../../../../../src/demos/progress.demo.tsx)

## Overview

The Progress component conveys completion status for an ongoing asynchronous operation or upload. It is not a step navigator: use `skytrack-ui/progress-indicator` to orient people through completed, current, and upcoming steps in a linear workflow.

Built on `@base-ui/react/progress`, it supports determinate progress bars with animated width fills, numeric value displays, and indeterminate loading modes.

**Live demo variant:** `Live value`

```tsx
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from '@/components/ui/progress'

export function ProgressExample() {
  return (
    <Progress value={65} max={100} className='w-64'>
      <ProgressLabel>Uploading flight plan</ProgressLabel>
      <ProgressValue />
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  )
}
```

## Usage

Use Progress when an operation is visibly ongoing and users benefit from completion feedback. Use a determinate value when the amount complete is known, or an indeterminate state when it is not. Avoid flashing a progress bar for near-instant actions.

Do not use Progress to display a scalar measurement or capacity (e.g. remaining battery charge or disk space; use `skytrack-ui/meter`).

**Live demo variant:** `Complete and indeterminate`

## Anatomy

### Composition Tree

```text
<Progress value={60} max={100}>
├─ <ProgressLabel>Uploading file...</ProgressLabel>
├─ <ProgressValue>60%</ProgressValue>
└─ <ProgressTrack>
   └─ <ProgressIndicator />
</Progress>
```

Render in strict two-column grid structure:

1. `Progress`: Root 2-column grid container (`data-slot='progress'`).
2. `ProgressLabel`: Title describing the ongoing task (`data-slot='progress-label'`), placed in the top-left cell.
3. `ProgressValue`: Text display of current percentage or custom value (`data-slot='progress-value'`), right-aligned in top-right cell.
4. `ProgressTrack`: Full-width background groove spanning both columns (`data-slot='progress-track' col-span-2 h-1 bg-muted`).
5. `ProgressIndicator`: Fill bar reflecting current progress percentage (`data-slot='progress-indicator' bg-primary`).

**Live demo variant:** `Live value`

## Variants & states

Supported modes:

- Determinate: `value` is a number between `min` (0) and `max` (100). Smooth 500ms transition updates indicator width.
- Indeterminate: `value={null}` puts indicator into continuous indeterminate mode with `data-indeterminate:w-full`.
- Completed: Reaching 100% can trigger visual completion indicators or status text updates.

**Live demo variant:** `Complete and indeterminate`

## Accessibility

- Built on `@base-ui/react/progress`:
- Sets WAI-ARIA `role='progressbar'`.
- Automatically connects `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- In indeterminate mode, omits `aria-valuenow` per ARIA specification to signal indefinite progress.
- `ProgressLabel` is linked via `aria-labelledby`, ensuring screen readers announce task context.

**Live demo variant:** `Live value`

## API & examples

Import named parts from `skytrack-ui/progress` (or `@/components/ui/progress` locally).

| Component           | Target Props                                                                                 | Description                                |
| ------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `Progress`          | `value: number \| null`, `min?: number`, `max?: number`, `format?: Intl.NumberFormatOptions` | Root progress container                    |
| `ProgressLabel`     | `children: ReactNode`                                                                        | Text label describing the operation        |
| `ProgressValue`     | —                                                                                            | Automatically outputs formatted percentage |
| `ProgressTrack`     | `className?: string`                                                                         | Background track groove                    |
| `ProgressIndicator` | `className?: string`                                                                         | Animated fill bar                          |

Tokens: Uses `--primary`, `--muted`, `--foreground`, and `--radius`.

**Live demo variant:** `Complete and indeterminate`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./progress`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Progress tracks operational completion toward 100%; use `meter` for static capacity metrics.
