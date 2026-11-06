---
title: Overview
description:
  Components are one of the key building blocks of the design system. Each
  component has been designed and coded to solve a specific UI problem.
tabs: ['Components', 'Accessibility status', 'Feature flags']
---


> Manual and automated tests assess the accessibility of Carbon components against
> established standards. Read on to learn about how components are tagged with
> test statuses across the website.


### Quick Navigation

- [Accessibility tag status](#accessibility-tag-status)
- [Accessibility test categories](#accessibility-test-categories)
- [All component accessibility status](#all-component-accessibility-status)


## Accessibility tag status

Automated accessibility verification tests (AVT) are run for each change
proposed to the Carbon codebase. Additional manual tests are done periodically,
such as screenreader testing. These tests ensure a consistent baseline of
accessibility for each stable component.

Carbon implements a robust matrix of AVT to ensure that every Carbon component
meets the utmost standards of accessibility. The status of this testing is
outlined across the website through a detailed matrix of test categories and
tags, outlined below.

| Tag                                                  | Meaning                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `[WCAG AA]`        | Automated tests have been implemented, pass, and show no violations via the [IBM Equal Access Accessibility Checker](https://github.com/IBMa/equal-access) for a component’s default state, advanced states, and keyboard navigation.                                               |
|  `[WCAG AA]`       | Some testing has been done, but is still incomplete and in progress. For example, manual tests may not have covered all use cases, or automated tests may not cover all component states. Previously existing tests may have become invalid and are temporarily skipped or removed. |
|  `[WCAG AA]`        | Manual testing has been performed and validated by a human to ensure proper accessibility, such as screen reader testing.                                                                                                                                                           |
|  `[WCAG AA]`  | In some cases, testing data is not available for certain components or component states. For instance, keyboard navigation testing is not necessary for components that are non-interactive.                                                                                        |
|  `[WCAG AA]`     | Automated or manual testing has been deferred. Most often this applies to preview or unstable components that do not have testing performed until they are [moved to stable](https://github.com/carbon-design-system/carbon/blob/main/docs/preview-code.md).                        |

## Accessibility test categories

Every accessibility test falls into one of four categories. Marked with the tags
above, these categories show the status for each of these discrete areas of
testing. This additional detail helps clarify exactly what ways a component has
been tested for accessibility.

| Test                | Meaning                                                                                                                                                            | Possible tags                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default state       | Test(s) that ensure the initial render state of a component is accessible.                                                                                         |  `[WCAG AA]`  <br/> `[WCAG AA]` <br/> `[WCAG AA]`                                           |
| Advanced states     | Tests that ensure additional states of the component are accessible. This could be interactive states of a component or its multiple variants.                     |  `[WCAG AA]`  <br/> `[WCAG AA]` <br/> `[WCAG AA]`                                           |
| Keyboard navigation | Tests that ensure focus is properly managed, and all interactive functions of a component have a proper keyboard-accessible equivalent.                            |  `[WCAG AA]`  <br/> `[WCAG AA]` <br/> `[WCAG AA]`                                        |
| Screen reader       | This manual testing ensures that the visual information on the screen is properly conveyed and read correctly by screen readers such as JAWS, VoiceOver, and NVDA. |  `[WCAG AA]` <br/> `[WCAG AA]` <br/> `[WCAG AA]`  <br/> `[WCAG AA]`  |


> ♿ **Accessibility Status:** Component audited for WCAG 2.1 AA accessibility standards.

