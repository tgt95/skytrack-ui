# Form

> A set of related fields for entering, reviewing, and submitting information.

- Package version: `0.1.5`
- Public export: `skytrack-ui/form`
- Implementation: [`src/components/ui/form.tsx`](../../../../../src/components/ui/form.tsx)
- Public type declaration: [`dist-lib/components/ui/form.d.ts`](../../../../../dist-lib/components/ui/form.d.ts)
- Showcase demo id: `form`
- Closest demo: [`src/demos/form.demo.tsx`](../../../../../src/demos/form.demo.tsx)

## Usage

Use Form when people need to enter or update related information and submit it as one task, such as creating a record, changing settings, or inviting a team member.

- **Data minimization:** Collect only necessary information required to complete the task. Avoid asking for non-essential or redundant data.
- **Progressive disclosure:** Reveal dependent fields only when relevant based on prior selections, keeping the initial form compact and focused.
- **Fit:** Cohesive data entry workflows requiring validation before submission.
- **Avoid:** Search that filters results as people type (use Command or Autocomplete), or navigation links.
- **Best alternative:** For a single searchable choice, use Autocomplete.

**Live demo variant:** `Default`

## Types

Choose a validation presentation that identifies which values need attention and what people should do next.

## Behavior

When submission fails, clearly mark fields that need attention and help people find the first one to fix.

| Do                                                                      | Don't                                                                                | Why                                                                                  |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Focus the first invalid field automatically when form submission fails. | Keep focus on the submit button without indicating where validation errors occurred. | Taking people to the first error makes it easier to understand what needs attention. |

**Live demo variant:** `Schema validation`

## Layout

Arrange fields so people can follow the task and compare related answers:

- **Columns:** Use one column on narrow screens and up to two on desktop. Use more only for short, related fields that benefit from a denser layout.
- **Spacing:** Keep 16px between fields and 24px between major groups.
- **Action area:** Place submit and cancel actions at the end of the form with 8–12px between them. Make the primary action clear.

**Live demo variant:** `Using with Zod`

## Accessibility

Make required information and errors clear. When every field in a form is required, communicate that requirement once before the form instead of repeating markers on each field. After failed submission, help users find the first field that needs attention. Enter should submit when expected.

**Live demo variant:** `Imperative validation (actionsRef)`

## Content

Form titles should clearly describe the task in sentence case (e.g., "Create record", "Invite team member").

- **Submit button:** Use a specific action label (e.g., "Save record", "Invite team member") instead of "Submit".
- **Required fields:** Mark mandatory fields individually using SkyTrack’s required-field indicator convention (e.g., an asterisk or “(required)”). Exception: if every field in a form is required, state that once before the form (e.g., “All fields are required”) instead of repeating markers across every field. Keep the convention consistent for similar forms.
- **Validation messages:** Provide clear, actionable error text explaining how to resolve invalid values.

**Live demo variant:** `Submit with a Server Function`
