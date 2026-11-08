# Progress Indicator

> A non-interactive-by-default ordered list of completed, current, and upcoming steps in a linear task.

- Package version: `0.1.5`
- Public subpath: `skytrack-ui/progress-indicator`
- Implementation and source types: [`src/components/ui/progress-indicator.tsx`](../../../../src/components/ui/progress-indicator.tsx)
- Showcase demo: [`src/demos/progress-indicator.demo.tsx`](../../../../src/demos/progress-indicator.demo.tsx)
- Official reference: [Carbon Progress indicator guidelines](https://www.carbondesignsystem.com/building-blocks/core/components/progress-indicator/guidelines)

## Usage

Use Progress Indicator to orient people in a linear task with three or more steps. It is distinct from `Progress`, which communicates completion of an operation, and from `Meter`, which compares a current value with a known range. This component does not advance the workflow; the form or task flow owns navigation and validation.

**Live demo variant:** `HORIZONTAL`

```tsx
import { ProgressStepIndicator } from 'skytrack-ui/progress-indicator'

<ProgressStepIndicator
  aria-label='Workspace setup'
  currentStep={1}
  steps={[
    { label: 'Workspace', description: 'Choose a team workspace.' },
    { label: 'Flight plan', description: 'Add sample route details.' },
    { label: 'Review' }
  ]}
/>
```

## Types and states

- `orientation`: `horizontal` or `vertical`.
- `currentStep`: zero-based current position; earlier steps default to `complete`, the current one to `current`, and later ones to `upcoming`.
- Per-step `status`: optionally set `complete`, `current`, `upcoming`, `error`, or `disabled` to represent validation and availability states.
- `optional`: adds an “Optional” label beside the step title.
- `description`: concise helper information for a step.

Steps remain informational by default. Do not use the status treatment to imply that a user can jump between steps.

**Live demo variant:** `VERTICAL WITH ERROR`

## Accessibility

The component renders an ordered list. The current item exposes `aria-current='step'`; disabled items expose `aria-disabled`. Status is conveyed in text to assistive technology as well as by the marker. Give the list an `aria-label` that names the task.

## API

`ProgressStepIndicator` accepts standard ordered-list props plus `steps`, `currentStep`, and `orientation`. `ProgressIndicatorStep` contains `label`, optional `description`, `optional`, and optional `status`. The root barrel and component subpath both expose it as `ProgressStepIndicator` to avoid colliding with the progress bar's nested `ProgressIndicator` part.

## Evidence and limits

- Source, types, demo, and export subpath are in this workspace package at version `0.1.5`.
- Carbon's interactive step navigation is not implemented here. The current component is for progress orientation; the owning form or flow handles navigation.
