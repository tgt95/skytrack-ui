# Alert

> A callout for important information, feedback, and actions.

- Package version: `0.1.5`
- Public export: `skytrack-ui/alert`
- Implementation: [`src/components/ui/alert.tsx`](../../../../../src/components/ui/alert.tsx)
- Public type declaration: [`dist-lib/components/ui/alert.d.ts`](../../../../../dist-lib/components/ui/alert.d.ts)
- Showcase demo id: `alert`
- Closest demo: [`src/demos/alert.demo.tsx`](../../../../../src/demos/alert.demo.tsx)

## Overview

The Alert component presents contextual notifications, status updates, and actionable operational notices inline with page content. It communicates system status—such as airspace advisories, low battery warnings, or connectivity notices—without interrupting the user's current workflow.

Alerts feature semantic coloration, distinct icon treatments, and optional structured titles and inline or stacked actions.

**Live demo variant:** `Semantic variants`

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function AlertExample() {
  return (
    <Alert variant='info' className='max-w-md'>
      <AlertTitle>Firmware update scheduled</AlertTitle>
      <AlertDescription>
        Flight controller maintenance will execute at 02:00 UTC. Ensure battery levels exceed 60%.
      </AlertDescription>
    </Alert>
  )
}
```

## Usage

Use Alert for persistent, high-visibility feedback or instructions tied to a screen or form section. Common scenarios include pre-flight compliance warnings, mission upload status, and credential renewal alerts.

Do not use Alert for transient feedback that auto-dismisses after a user action (use `skytrack-ui/toast`). Do not use Alert for modal interruptions requiring explicit user confirmation before proceeding (use `skytrack-ui/alert-dialog`). Keep alert copy concise, descriptive, and actionable.

**Live demo variant:** `With action`

## Anatomy

### Composition Tree

```text
<Alert variant='info|success|warning|destructive'>
├─ <Icon /> (optional leading Phosphor SVG)
├─ <div className='flex flex-col gap-1'>
│  ├─ <AlertTitle />
│  └─ <AlertDescription />
└─ <AlertAction /> (optional)
```

Render in logical visual order:

1. `Alert`: Outer boundary container styled via `alertVariants` (`data-slot='alert'`). Uses semantic borders and tinted backgrounds.
2. Icon (optional): Phosphor or custom SVG placed as a leading child; automatically sized to `size-5` and positioned at top-0.5.
3. Text content wrapper: Flex column holding text nodes.
4. `AlertTitle`: Title container rendered as a styled `<div>` (accepting `ComponentProps<'h5'>`) for the alert headline (`data-slot='alert-title'`).
5. `AlertDescription`: Paragraph/div body containing contextual explanation (`data-slot='alert-description'`).
6. `AlertAction`: Optional interactive container for resolution buttons or links (`data-slot='alert-action'`).

**Live demo variant:** `Action below description`

## Variants & states

The `variant` prop controls semantic intent via CVA:

- `default`: Neutral border and foreground for standard operational notices (`border-border bg-card text-card-foreground [&>svg]:text-foreground`).
- `destructive`: Destructive semantic tokens (`border-destructive/40 bg-destructive/10 text-foreground [&>svg]:text-destructive`) for critical flight or safety errors.
- `info`: Info semantic tokens (`border-info/40 bg-info/10 text-foreground [&>svg]:text-info`) for informational updates.
- `success`: Success semantic tokens (`border-success/40 bg-success/10 text-foreground [&>svg]:text-success`) for successful operations.
- `warning`: Warning semantic tokens (`border-warning/40 bg-warning/10 text-foreground [&>svg]:text-warning`) for degraded performance or cautionary notices.

**Live demo variant:** `Semantic variants`

## Accessibility

- `Alert` defaults to `role='alert'`; the `variant` changes visual styling and does not select announcement urgency. Reserve the default alert role for urgent messages. Set `role='status'` for non-urgent updates that should be announced politely; avoid adding a duplicate live announcement.
- `AlertTitle` renders a styled `<div>` (accepting `ComponentProps<'h5'>`) without native heading semantics. Consumers needing document outline or native heading semantics should render an explicit heading element outside/alongside the styled container, or provide `role='heading'` with `aria-level` on `AlertTitle` if appropriate and verified.
- Focusable controls within `AlertAction` remain accessible in standard tab navigation order.
- The component uses semantic theme tokens. Check text and icon contrast against the rendered surface in both supported themes; the component does not measure or enforce a WCAG contrast ratio.

**Live demo variant:** `With action`

## API & examples

Import named parts from `skytrack-ui/alert` (or `@/components/ui/alert` locally): `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction`, `alertVariants`.

| Prop        | Target    | Type                                                             | Default     |
| ----------- | --------- | ---------------------------------------------------------------- | ----------- |
| `variant`   | `Alert`   | `'default' \| 'destructive' \| 'info' \| 'success' \| 'warning'` | `'default'` |
| `className` | All parts | `string`                                                         | `undefined` |

Integrates with `--radius`, `--foreground`, `--destructive`, and theme color tokens. Actions typically embed `Button` with `size='sm'`.

**Live demo variant:** `Action below description`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./alert`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: `AlertTitle` renders an internal styled `<div>` taking `ComponentProps<'h5'>` rather than a native `<h5>` tag; add a separate semantic heading or verified `role='heading'` plus `aria-level` when needed. The package does not measure theme contrast. Alerts do not provide automatic dismiss timers; use `toast` for ephemeral notifications.
