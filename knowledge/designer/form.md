# Form

> A set of related fields for entering, reviewing, and submitting information.

- Package version: `0.1.5`
- Public export: `skytrack-ui/form`
- Implementation: [`src/components/ui/form.tsx`](../../src/components/ui/form.tsx)
- Public type declaration: [`dist-lib/components/ui/form.d.ts`](../../dist-lib/components/ui/form.d.ts)
- Showcase demo id: `form`
- Closest demo: [`src/demos/form.demo.tsx`](../../src/demos/form.demo.tsx)
- Official guidance: [Carbon Design System Form Usage](https://carbondesignsystem.com/components/form/usage/)

## Usage

Use Form when people need to enter or update related information and submit it as one task, such as creating a project, changing preferences, or inviting a team member.

- **Fit:** Cohesive data entry workflows requiring validation before submission.
- **Avoid:** Search that filters results as people type (use Command or Autocomplete), or navigation links.
- **Best alternative:** For a single searchable choice, use Autocomplete.

**Live demo variant:** `Default`

## Types

A form collects related answers and provides feedback when information is missing or invalid.

- **Submit:** Collect related answers and submit them together.
- **Validation:** Check that each answer is acceptable before submission.
- **Pending state:** Make it clear when submission is in progress and prevent accidental repeat submissions.

**Live demo variant:** `Submit form values as a JavaScript object`

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

Make required information and errors clear. After failed submission, help users find the first field that needs attention. Enter should submit when expected.

**Live demo variant:** `Imperative validation (actionsRef)`

## Content

Form titles should clearly describe the task in sentence case (e.g., “Create project”, “Invite a team member”).

- **Submit button:** Use a specific action label (e.g., “Save project”, “Invite team member”) instead of “Submit”.
- **Validation messages:** Provide clear, actionable error text explaining how to resolve invalid values.

**Live demo variant:** `Submit with a Server Function`
