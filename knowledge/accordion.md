# Accordion

> A set of collapsible panels with headings.

- Package version: `0.1.5`
- Public export: `skytrack-ui/accordion`
- Implementation: [`src/components/ui/accordion.tsx`](../src/components/ui/accordion.tsx)
- Public type declaration: [`dist-lib/components/ui/accordion.d.ts`](../dist-lib/components/ui/accordion.d.ts)
- Showcase demo id: `accordion`
- Closest demo: [`src/demos/accordion.demo.tsx`](../src/demos/accordion.demo.tsx)

## Overview

The Accordion organizes content into stacked, vertically collapsible disclosure sections controlled by header triggers. It enables operators to scan dense hierarchies—such as drone subsystem status, flight checklist groups, or technical FAQs—without screen clutter while retaining rapid access to details.

Each section pairs an accessible heading trigger with an expandable panel whose height animates dynamically via CSS custom properties.

**Live demo variant:** `Demo`

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export function AccordionExample() {
  return (
    <Accordion className='w-full max-w-sm'>
      <AccordionItem value='telemetry'>
        <AccordionTrigger>Telemetry streams</AccordionTrigger>
        <AccordionContent>
          <div className='pb-4 text-muted-foreground'>Live link frequency is locked at 20 Hz across primary nodes.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='payload'>
        <AccordionTrigger>Payload diagnostics</AccordionTrigger>
        <AccordionContent>
          <div className='pb-4 text-muted-foreground'>Sensor bay and gimbal calibration reports are nominal.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## Usage

Use Accordions when users need an overview of multiple related content sections and benefit from expanding items on demand. Ideal for FAQs, hardware parameter groups, multi-step flight checklists, and secondary inspector panes.

Do not use Accordions for primary navigation (use `skytrack-ui/navigation-menu`), solitary collapsible blocks (use `skytrack-ui/collapsible`), or tabbed workflows where only one pane is viewed at a time in full screen (use `skytrack-ui/tabs`). Avoid placing critical flight alarms or safety-blocking actions inside collapsed panels where they could be missed.

**Live demo variant:** `Demo`

## Anatomy

Render in strict structural order:

1. `Accordion`: Root container managing single or multiple selection state (`data-slot='accordion'`).
2. `AccordionItem`: Individual disclosure section wrapper (`data-slot='accordion-item'`), separated by border tokens.
3. `AccordionHeader`: Optional semantic heading container (`data-slot='accordion-header'`).
4. `AccordionTrigger`: Interactive button toggle with automatic chevron rotation indicator (`data-slot='accordion-trigger'`).
5. `AccordionContent` (or alias `AccordionPanel`): Collapsible body animated via height transitions (`data-slot='accordion-content'`).

Minimal composition requires `Accordion` wrapping `AccordionItem`, `AccordionTrigger`, and `AccordionContent`.

**Live demo variant:** `Open multiple panels`

## Variants & states

Accordion supports single or multiple expanded items via `multiple={true}` on the root. Controlled state is managed via `value` and `onValueChange` string or number arrays (`AccordionValue`). Individual items can be disabled with `disabled` on `AccordionItem` or `AccordionTrigger`.

Visual states:

- Collapsed: Indicator chevron rests at 0 degrees; content panel collapses to 0 height.
- Expanded: `data-panel-open` rotates the indicator chevron 180 degrees with a 200ms ease-out transition.
- Focus: Applies SkyTrack `focusRing` outline on keyboard focus.
- Disabled: Fades trigger opacity to 50% with `pointer-events-none`.

**Live demo variant:** `Hidden until found`

## Accessibility

Built upon Base UI Accordion primitives:

- Trigger automatically receives `role='button'`, `aria-expanded`, and links to the associated panel via `aria-controls`.
- Panels have `role='region'` linked by `aria-labelledby`.
- Keyboard interaction: Following updated W3C APG guidance, triggers are standard tab stops (`Tab` / `Shift+Tab`); `Enter` or `Space` toggles the focused panel.
- Reduced motion: UNVERIFIED in component source (`accordionContent` lacks `motion-reduce:transition-none`); consumers should supply `motion-reduce:transition-none` via `className` when required.

**Live demo variant:** `Disabled item`

## API & examples

Import named parts from canonical `skytrack-ui/accordion` (or `@/components/ui/accordion` locally).

| Prop                     | Target          | Type                                    | Default        |
| ------------------------ | --------------- | --------------------------------------- | -------------- |
| `multiple`               | `Accordion`     | `boolean`                               | `false`        |
| `value` / `defaultValue` | `Accordion`     | `string[] \| number[]`                  | `undefined`    |
| `onValueChange`          | `Accordion`     | `(value: string[] \| number[]) => void` | `undefined`    |
| `disabled`               | `AccordionItem` | `boolean`                               | `false`        |
| `value`                  | `AccordionItem` | `string`                                | auto-generated |

The component uses `--border`, `--foreground`, and `--muted-foreground` design tokens. Panels animate cleanly with CSS custom property `--accordion-panel-height`.

**Live demo variant:** `Demo`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./accordion`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Panels rely on `@base-ui/react/accordion` transitions.
