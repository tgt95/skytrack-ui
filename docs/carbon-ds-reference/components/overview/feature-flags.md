---
title: Overview
description:
  Components are one of the key building blocks of the design system. Each
  component has been designed and coded to solve a specific UI problem.
tabs: ['Components', 'Accessibility status', 'Feature flags']
---


> Feature flags enable new behaviors and styling, allowing users to opt-in to new
> breaking changes while staying on the current major version.


### Quick Navigation

- [Overview](#overview)
- [Components with feature flags](#components-with-feature-flags)
- [How to implement](#how-to-implement)


## Overview

When a new feature flag is introduced, it is set to false or "off" by default to
ensure backward compatibility. We are not deprecating the current components but
encourage all teams to use the new feature flag-enabled components in their
products moving forward. Once the next major release (v12) is released in the
future, these feature flags will become the default version of the component.

## Components with feature flags

The following components have v12 feature flags, with changes related to either
design or development.

| Component                    | Design change                                                                    | Code change                                                                                                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menu buttons (Overflow menu) | No design change                                                                 | [React](https://react.carbondesignsystem.com/?path=/docs/components-overflowmenu-feature-flag--flag-details)             |
| Modal                        | No design change                                                                 | [React](https://react.carbondesignsystem.com/?path=/docs/components-modal-feature-flag--flag-details)                    |
| Notification                 | No design change                                                                 | [React](https://react.carbondesignsystem.com/?path=/docs/components-notifications-actionable-feature-flag--flag-details) |
| Structured list              | [Usage tab](/components/structured-list/usage/#feature-flags) | [React](https://react.carbondesignsystem.com/?path=/docs/components-structuredlist-feature-flag--flag-details)           |
| Tile                         | [Usage tab](/components/tile/usage/#feature-flags)            | [React](https://react.carbondesignsystem.com/?path=/docs/components-tile-feature-flag--flag-details)                     |
| Toggle                       | [Usage tab](/components/toggle/usage/#feature-flags)          | [React](https://react.carbondesignsystem.com/?path=/docs/components-toggle-feature-flag--flag-details)                   |
| Tree view                    | No design change                                                                 | [React](https://react.carbondesignsystem.com/?path=/docs/components-treeview-feature-flag--flag-details)                 |

## How to implement

### Code

Each framework handles feature flags differently. At the moment, only React has
available feature flags. This may change in the future, check back later for
updates related to all available feature flags.


### React


The development specifics for feature flags in React can be found in the
[@carbon/react](https://react.carbondesignsystem.com/?path=/docs/getting-started-feature-flags--overview)
framework.

### Design

Inside a design file, click on the component with a feature flag (A). In the
properties panel, locate the **v12 feature flag** boolean property (B). By
default, this feature is turned off, but can be toggled on to enable the v12
feature flag.


![Feature flag implementation in Figma](images/feature-flag-implementation-1.png)


Additionally, when clicking on the **components details** (C) in the properties
panel, a description of the v12 feature flag, and a link to the component's
usage guidance is provided for more information in the **Component
documentation** window (D).


![Feature flag implementation in Figma](images/feature-flag-implementation-2.png)


