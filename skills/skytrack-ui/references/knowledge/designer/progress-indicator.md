# Progress Indicator

## Usage

Use Progress Indicator to show where someone is in a fixed, linear task with three or more steps. It works alongside the current step content; it is not a substitute for progress feedback on an operation that is running.

**Live demo variant:** `HORIZONTAL`

## Types

- **Horizontal:** compact step sequence when labels fit.
- **Vertical:** longer labels or descriptions where a stacked layout reads more clearly.
- **Step states:** complete, current, upcoming, error, and disabled.

**Live demo variant:** `VERTICAL WITH ERROR`

## Behavior

The component is informational by default. The current step is identified, prior steps appear complete, and later steps remain upcoming. Validation errors and disabled steps should reflect actual workflow state.

**Live demo variant:** `VERTICAL WITH ERROR`

## Layout

Use horizontal orientation when short labels fit. Use vertical orientation for longer labels, descriptions, or narrow containers. Keep step titles concise and place helper text directly below each title.

**Live demo variant:** `HORIZONTAL`

## Accessibility

Use a task-specific accessible name. The ordered-list structure communicates sequence; the current step uses `aria-current`, and state labels are available to assistive technology. Do not rely on color alone for error or completion.

**Live demo variant:** `VERTICAL WITH ERROR`

## Content

Use short action or outcome labels, such as “Workspace”, “Flight plan”, and “Review”. Mark optional steps explicitly and explain errors close to the step they affect.

**Live demo variant:** `HORIZONTAL`
