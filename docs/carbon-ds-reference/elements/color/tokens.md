---
title: Color
description:
  Maintaining consistent and engaging digital interfaces throughout IBM, whether
  applications or experiences, demands extended guidance around color usage.
tabs: ['Overview', 'Usage', 'Tokens', 'Code']
---


> Tokens are a method of applying color in a consistent, reusable, and scalable
> way. They are used in place of hard coded values, like hex codes.


### Quick Navigation

- [Core Tokens](#core-tokens)
- [Component Tokens](#component-tokens)
- [AI Tokens](#ai-tokens)


## Core Tokens

Core tokens are global colors that are used across components. They are named
and grouped by the common UI element that they are applied to.


### Quick Navigation

- [Background](#background)
- [Layer](#layer)
- [Layer accent](#layer-accent)
- [Field](#field)
- [Border](#border)
- [Text](#text)
- [Link](#link)
- [Syntax](#syntax)
- [Icon](#icon)
- [Support](#support)
- [Focus](#focus)
- [Miscellaneous](#miscellaneous)


### Background Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$background` | Default page background<br/>UI Shell base color | `#ffffff` | `#f4f4f4` | `#262626` | `#161616` |
| `$layer-background-01` | Default page background<br/>Automatically matches contextual layer background | `#ffffff` | `#f4f4f4` | `#262626` | `#161616` |
| `$background-hover` | Hover color for $background<br/>Hover color for transparent backgrounds | `#8d8d8d @ 12%` | `#8d8d8d @ 12%` | `#8d8d8d @ 16%` | `#8d8d8d @ 16%` |
| `$background-active` | Active color for $background | `#8d8d8d @ 50%` | `#8d8d8d @ 50%` | `#8d8d8d @ 40%` | `#8d8d8d @ 40%` |
| `$background-selected` | Selected color for $background | `#8d8d8d @ 20%` | `#8d8d8d @ 20%` | `#8d8d8d @ 24%` | `#8d8d8d @ 24%` |
| `$background-selected-hover` | Hover color for $background-selected | `#8d8d8d @ 32%` | `#8d8d8d @ 32%` | `#8d8d8d @ 32%` | `#8d8d8d @ 32%` |
| `$background-inverse` | High contrast backgrounds<br/>High contrast elements | `#393939` | `#393939` | `#f4f4f4` | `#f4f4f4` |
| `$background-inverse-hover` | Hover color for $background-inverse | `#4c4c4c` | `#4c4c4c` | `#e5e5e5` | `#e5e5e5` |
| `$background-brand` | Feature background color | `#0f62fe` | `#0f62fe` | `#0f62fe` | `#0f62fe` |

### Layer Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$layer-01` | Container color on $background<br/>Secondary page background | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `$layer-02` | Container color on $layer-01 | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `$layer-03` | Container color on $layer-02 | `#f4f4f4` | `#ffffff` | `#6f6f6f` | `#525252` |
| `$layer-background-02` | Container color on $layer-background-01<br/>Automatically matches contextual layer background | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `$layer-background-03` | Container color on $layer-background-02<br/>Automatically matches contextual layer background | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `$layer-hover-01` | Hover color for $layer-01 | `#e8e8e8` | `#e8e8e8` | `#474747` | `#333333` |
| `$layer-hover-02` | Hover color for $layer-02 | `#e8e8e8` | `#e8e8e8` | `#636363` | `#474747` |
| `$layer-hover-03` | Hover color for $layer-03 | `#e8e8e8` | `#e8e8e8` | `#5e5e5e` | `#636363` |
| `$layer-active-01` | Active color for $layer-01 | `#c6c6c6` | `#c6c6c6` | `#6f6f6f` | `#525252` |
| `$layer-active-02` | Active color for $layer-02 | `#c6c6c6` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$layer-active-03` | Active color for $layer-03 | `#c6c6c6` | `#c6c6c6` | `#393939` | `#8d8d8d` |
| `$layer-selected-01` | Selected color for $layer-01 | `#e0e0e0` | `#e0e0e0` | `#525252` | `#393939` |
| `$layer-selected-02` | Selected color for $layer-02 | `#e0e0e0` | `#e0e0e0` | `#6f6f6f` | `#525252` |
| `$layer-selected-03` | Selected color for $layer-03 | `#e0e0e0` | `#e0e0e0` | `#525252` | `#6f6f6f` |
| `$layer-selected-hover-01` | Hover color for $layer-selected-01 | `#d1d1d1` | `#d1d1d1` | `#636363` | `#474747` |
| `$layer-selected-hover-02` | Hover color for $layer-selected-02 | `#d1d1d1` | `#d1d1d1` | `#5e5e5e` | `#636363` |
| `$layer-selected-hover-03` | Hover color for $layer-selected-03 | `#d1d1d1` | `#d1d1d1` | `#636363` | `#5e5e5e` |
| `$layer-selected-inverse` | High contrast elements<br/>4.5:1 AA element contrast | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$layer-selected-disabled` | Disabled color for selected layers | `#8d8d8d` | `#8d8d8d` | `#8d8d8d` | `#6f6f6f` |

### Layer Accent Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$layer-accent-01` | Tertiary background paired with $layer-01 | `#e0e0e0` | `#e0e0e0` | `#525252` | `#393939` |
| `$layer-accent-02` | Tertiary background paired with $layer-02 | `#e0e0e0` | `#e0e0e0` | `#6f6f6f` | `#525252` |
| `$layer-accent-03` | Tertiary background paired with $layer-03 | `#e0e0e0` | `#e0e0e0` | `#8d8d8d` | `#6f6f6f` |
| `$layer-accent-hover-01` | Hover color for $layer-accent-01 | `#cacaca` | `#cacaca` | `#656565` | `#4c4c4c` |
| `$layer-accent-hover-02` | Hover color for $layer-accent-02 | `#cacaca` | `#cacaca` | `#5e5e5e` | `#656565` |
| `$layer-accent-hover-03` | Hover color for $layer-accent-03 | `#cacaca` | `#cacaca` | `#7a7a7a` | `#5e5e5e` |
| `$layer-accent-active-01` | Active color for $layer-accent-01 | `#a8a8a8` | `#a8a8a8` | `#6f6f6f` | `#525252` |
| `$layer-accent-active-02` | Active color for $layer-accent-02 | `#a8a8a8` | `#a8a8a8` | `#393939` | `#8d8d8d` |
| `$layer-accent-active-03` | Active color for $layer-accent-03 | `#a8a8a8` | `#a8a8a8` | `#525252` | `#393939` |

### Field Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$field-01` | Default input fields<br/>Fields on $background | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `$field-02` | Secondary input fields<br/>Fields on $layer-01 | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `$field-03` | Tertiary input fields<br/>Fields on $layer-02 | `#f4f4f4` | `#ffffff` | `#6f6f6f` | `#525252` |
| `$field-hover-01` | Hover color for $field-01 | `#e8e8e8` | `#e8e8e8` | `#474747` | `#333333` |
| `$field-hover-02` | Hover color for $field-02 | `#e8e8e8` | `#e8e8e8` | `#636363` | `#474747` |
| `$field-hover-03` | Hover color for $field-03 | `#e8e8e8` | `#e8e8e8` | `#5e5e5e` | `#636363` |

### Border Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$border-interactive` | 3:1 AA contrast<br/>Selected borders<br/>Active borders | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$border-subtle-00` | Subtle borders paired with $background | `#e0e0e0` | `#c6c6c6` | `#525252` | `#393939` |
| `$border-subtle-01` | Subtle borders paired with $layer-01 | `#c6c6c6` | `#e0e0e0` | `#6f6f6f` | `#525252` |
| `$border-subtle-02` | Subtle borders paired with $layer-02 | `#e0e0e0` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$border-subtle-03` | Subtle borders paired with $layer-03 | `#c6c6c6` | `#e0e0e0` | `#8d8d8d` | `#6f6f6f` |
| `$border-subtle-selected-01` | Selected color for $border-subtle-01 | `#c6c6c6` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$border-subtle-selected-02` | Selected color for $border-subtle-02 | `#c6c6c6` | `#c6c6c6` | `#a8a8a8` | `#8d8d8d` |
| `$border-subtle-selected-03` | Selected color for $border-subtle-03 | `#c6c6c6` | `#c6c6c6` | `#a8a8a8` | `#8d8d8d` |
| `$border-strong-01` | Medium contrast border<br/>Border-bottom paired with $field-01<br/>3:1 AA non-text contrast | `#8d8d8d` | `#8d8d8d` | `#8d8d8d` | `#6f6f6f` |
| `$border-strong-02` | Medium contrast border<br/>Border-bottom paired with $field-02<br/>3:1 AA non-text contrast | `#8d8d8d` | `#8d8d8d` | `#a8a8a8` | `#8d8d8d` |
| `$border-strong-03` | Medium contrast border<br/>Border-bottom paired with $field-03<br/>3:1 AA non-text contrast | `#8d8d8d` | `#8d8d8d` | `#c6c6c6` | `#a8a8a8` |
| `$border-tile-01` | Operable tile indicator paired with $layer-01 | `#c6c6c6` | `#a8a8a8` | `#6f6f6f` | `#525252` |
| `$border-tile-02` | Operable tile indicator paired with $layer-02 | `#a8a8a8` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$border-tile-03` | Operable tile indicator paired with $layer-03 | `#c6c6c6` | `#a8a8a8` | `#a8a8a8` | `#8d8d8d` |
| `$border-inverse` | High contrast border<br/>4.5:1 AA non-text contrast | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$border-disabled` | Disabled border color (excluding border-subtles) | `#c6c6c6` | `#c6c6c6` | `#8d8d8d @ 50%` | `#8d8d8d @ 50%` |

### Text Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$text-primary` | Primary text<br/>Body copy<br/>Headers<br/>Hover text color for $text-secondary | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$text-secondary` | Secondary text<br/>Input labels | `#525252` | `#525252` | `#c6c6c6` | `#c6c6c6` |
| `$text-placeholder` | Placeholder text | `#a8a8a8` | `#a8a8a8` | `#6f6f6f` | `#6f6f6f` |
| `$text-on-color` | Text on interactive colors<br/>Text on button colors | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `$text-on-color-disabled` | Disabled color for $text-on-color | `#8d8d8d` | `#8d8d8d` | `#ffffff – 25%` | `#ffffff – 25%` |
| `$text-helper` | Tertiary text<br/>Help text | `#6f6f6f` | `#6f6f6f` | `#8d8d8d` | `#8d8d8d` |
| `$text-error` | Error message text | `#da1e28` | `#da1e28` | `#ffb3b8` | `#ff8389` |
| `$text-inverse` | Inverse text color | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$text-disabled` | Disabled text color | `#161616 – 25%` | `#161616 – 25%` | `#f4f4f4 – 25%` | `#f4f4f4 – 25%` |

### Link Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$link-primary` | Primary links | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$link-primary-hover` | Hover color for $link-primary | `#0043ce` | `#0043ce` | `#a6c8ff` | `#a6c8ff` |
| `$link-secondary` | Secondary link color for lower contrast backgrounds | `#0043ce` | `#0043ce` | `#a6c8ff` | `#a6c8ff` |
| `$link-inverse` | Links on $background-inverse backgrounds | `#78a9ff` | `#78a9ff` | `#0f62fe` | `#0f62fe` |
| `$link-inverse-hover` | Hover color for links on $background-inverse backgrounds | `#a6c8ff` | `#a6c8ff` | `#0043ce` | `#0043ce` |
| `$link-inverse-active` | Active color for links on $background-inverse backgrounds | `#f4f4f4` | `#f4f4f4` | `#161616` | `#161616` |
| `$link-inverse-visited` | Color for visited links on $background-inverse backgrounds | `#be95ff` | `#be95ff` | `#8a3ffc` | `#8a3ffc` |
| `$link-visited` | Color for visited links | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |

### Syntax Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$syntax-comment` | Default comment text | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-line-comment` | Single-line comment | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-block-comment` | Block comment | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-doc-comment` | Documentation comment | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-doc-string` | Docstring | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-keyword` | Keywords | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-operator-keyword` | Operator keywords | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-control-keyword` | Control-flow keywords | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-definition-keyword` | Definition keywords | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-module-keyword` | Module/import keywords | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-variable` | Variable | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-name` | Name | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-variable-name` | Variable name | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-label-name` | Label name | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-attribute` | Attribute | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-attribute-name` | Attribute name | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-property-name` | Property name | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-tag` | Tag delimiters | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-tag-name` | Tag name | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-type` | Type | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-type-name` | Type name | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-class-name` | Class name | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-namespace` | Namespace | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-macro-name` | Macro name | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-atom` | Atom literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-literal` | Literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-bool` | Boolean | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-null` | Null/undefined | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-self` | Self/this | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-number` | Number | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-integer` | Integer | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-float` | Float | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-unit` | Unit | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-string` | String | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-character` | Character | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-attribute-value` | Attribute value | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-special-string` | Special string | `#a56eff` | `#a56eff` | `#be95ff` | `#be95ff` |
| `$syntax-regexp` | RegExp | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-escape` | Escape sequence | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-url` | URL literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-color` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-deref-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-arithmetic-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-logic-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-bitwise-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-compare-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-update-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-definition-operator` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-type-operator` | Color literal | `#009d9a` | `#009d9a` | `#3ddbd9` | `#3ddbd9` |
| `$syntax-control-operator` | Color literal | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-modifier` | Color literal | `#d02670` | `#d02670` | `#ff7eb6` | `#ff7eb6` |
| `$syntax-punctuation` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-separator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-bracket` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-angle-bracket` | Color literal | `#6f6f6f` | `#6f6f6f` | `#8d8d8d` | `#8d8d8d` |
| `$syntax-square-bracket` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-paren` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-brace` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-content` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-list` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-emphasis` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-strong` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-monospace` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-strikethrough` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-heading` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-1` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-2` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-3` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-4` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-5` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-6` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-content-separator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-quote` | Color literal | `#6f6f6f` | `#6f6f6f` | `#c6c6c6` | `#c6c6c6` |
| `$syntax-link` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-invalid` | Color literal | `#da1e28` | `#da1e28` | `#fa4d56` | `#fa4d56` |
| `$syntax-meta` | Color literal | `#24a148` | `#24a148` | `#42be65` | `#42be65` |
| `$syntax-document-meta` | Color literal | `#24a148` | `#24a148` | `#42be65` | `#42be65` |
| `$syntax-annotation` | Color literal | `#009d9a` | `#009d9a` | `#3ddbd9` | `#3ddbd9` |
| `$syntax-processing-instruction` | Color literal | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-definition` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-constant` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-function` | Color literal | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$syntax-standard` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-local` | Color literal | `#0f62fe` | `#0f62fe` | `#a6c8ff` | `#a6c8ff` |
| `$syntax-special` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-deleted` | Color literal | `#ffd7d9` | `#ffd7d9` | `#a2191f` | `#a2191f` |
| `$syntax-inserted` | Color literal | `#a7f0ba` | `#a7f0ba` | `#198038` | `#198038` |

### Icon Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$icon-primary` | Primary icons | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$icon-secondary` | Secondary icons | `#525252` | `#525252` | `#c6c6c6` | `#c6c6c6` |
| `$icon-on-color` | Icons on interactive colors<br/>Icons on non-layer colors | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `$icon-on-color-disabled` | Disabled color for $icon-on-color | `#8d8d8d` | `#8d8d8d` | `#ffffff – 25%` | `#ffffff – 25%` |
| `$icon-interactive` | Icons that indicate operability | `#0f62fe` | `#0f62fe` | `#ffffff` | `#ffffff` |
| `$icon-inverse` | Inverse icon color | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$icon-disabled` | Disabled icon color | `#161616 – 25%` | `#161616 – 25%` | `#f4f4f4 – 25%` | `#f4f4f4 – 25%` |

### Support Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$support-error` | Error<br/>Invalid state | `#da1e28` | `#da1e28` | `#ff8389` | `#fa4d56` |
| `$support-success` | Success<br/>On | `#24a148` | `#24a148` | `#42be65` | `#42be65` |
| `$support-warning` | Warning | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$support-info` | Information | `#0043ce` | `#0043ce` | `#4589ff` | `#4589ff` |
| `$support-error-inverse` | Error in high contrast moments | `#fa4d56` | `#fa4d56` | `#da1e28` | `#da1e28` |
| `$support-success-inverse` | Success in high contrast moments | `#42be65` | `#42be65` | `#24a148` | `#24a148` |
| `$support-warning-inverse` | Warning in high contrast moments | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$support-info-inverse` | Information in high contrast moments | `#4589ff` | `#4589ff` | `#0043ce` | `#0043ce` |
| `$support-caution-minor` | Minor caution status | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$support-caution-major` | Major caution status | `#ff832b` | `#ff832b` | `#ff832b` | `#ff832b` |
| `$support-caution-undefined` | Undefined status | `#8a3ffc` | `#8a3ffc` | `#a56eff` | `#a56eff` |

### Focus Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$focus` | Focus border<br/>Focus underline | `#0f62fe` | `#0f62fe` | `#ffffff` | `#ffffff` |
| `$focus-inset` | Contrast border paired with $focus | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$focus-inverse` | Focus on high contrast moments | `#ffffff` | `#ffffff` | `#0f62fe` | `#0f62fe` |

### Miscellaneous Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$interactive` | 3:1 AA contrast<br/>Selected elements<br/>Active elements<br/>Accent icons | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$highlight` | Highlight color | `#d0e2ff` | `#d0e2ff` | `#002d9c` | `#001d6c` |
| `$toggle-off` | Off background<br/>3:1 AA contrast | `#8d8d8d` | `#8d8d8d` | `#8d8d8d` | `#6f6f6f` |
| `$overlay` | Background overlay | `#000000 @ 60%` | `#000000 @ 60%` | `#000000 @ 60%` | `#000000 @ 60%` |
| `$skeleton-element` | Skeleton color for text and UI elements | `#c6c6c6` | `#c6c6c6` | `#525252` | `#525252` |
| `$skeleton-background` | Skeleton color for containers | `#e5e5e5` | `#e5e5e5` | `#353535` | `#353535` |


## Component Tokens

Some components have their own specific color tokens, known as component tokens.
They represent the properties associated with a particular component. They are
not global tokens like the core tokens and should never be used for anything
other than their own component. For more information on how to use component
tokens, see the
[developer documentation](https://github.com/carbon-design-system/carbon/blob/main/packages/styles/docs/sass.md#component-tokens).


### Quick Navigation

- [Button](#button)
- [Content switcher](#content-switcher)
- [Tag](#tag)
- [Notification](#notification)


### Button Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$button-primary` | Primary button color | `#0f62fe` | `#0f62fe` | `#0f62fe` | `#0f62fe` |
| `$button-primary-hover` | Hover color for $button-primary | `#0353e9` | `#0353e9` | `#0353e9` | `#0353e9` |
| `$button-primary-active` | Active color for $button-primary | `#002d9c` | `#002d9c` | `#002d9c` | `#002d9c` |
| `$button-secondary` | Secondary button color | `#393939` | `#393939` | `#6f6f6f` | `#6f6f6f` |
| `$button-secondary-hover` | Hover color for $button-secondary | `#4c4c4c` | `#4c4c4c` | `#606060` | `#606060` |
| `$button-secondary-active` | Active color for $button-secondary | `#6f6f6f` | `#6f6f6f` | `#393939` | `#393939` |
| `$button-tertiary` | Tertiary button color<br/>4.5:1 AA text contrast | `#0f62fe` | `#0f62fe` | `#ffffff` | `#ffffff` |
| `$button-tertiary-hover` | Hover color for $button-tertiary | `#0353e9` | `#0353e9` | `#f4f4f4` | `#f4f4f4` |
| `$button-tertiary-active` | Active color for $button-tertiary | `#002d9c` | `#002d9c` | `#c6c6c6` | `#c6c6c6` |
| `$button-danger-primary` | Primary danger button color<br/>3:1 AA non-text contrast | `#da1e28` | `#da1e28` | `#da1e28` | `#da1e28` |
| `$button-danger-secondary` | Tertiary danger button color<br/>Ghost danger button color<br/>4.5:1 AA text contrast | `#da1e28` | `#da1e28` | `#ff8389` | `#fa4d56` |
| `$button-danger-hover` | Hover color for $danger-primary<br/>Hover color for $danger-secondary | `#ba1b23` | `#ba1b23` | `#ba1b23` | `#ba1b23` |
| `$button-danger-active` | Active color for $danger-primary<br/>Active color for $danger-secondary | `#750e13` | `#750e13` | `#750e13` | `#750e13` |
| `$button-separator` | Fluid button separator<br/>3:1 AA non-text contrast | `#e0e0e0` | `#e0e0e0` | `#161616` | `#161616` |
| `$button-disabled` | Disabled color for button elements | `#c6c6c6` | `#c6c6c6` | `#6f6f6f` | `#525252` |

### Content Switcher Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$content-switcher-background` | Low contrast background color | `#e0e0e0` | `#e0e0e0` | `Transparent` | `Transparent` |
| `$content-switcher-background-hover` | Low contrast hover color for $content-switcher-background | `#d1d1d1` | `#d1d1d1` | `#8d8d8d @ 12%` | `#8d8d8d @ 12%` |
| `$content-switcher-selected` | Low contrast selected color | `#ffffff` | `#ffffff` | `#8d8d8d @ 24%` | `#8d8d8d @ 24%` |

### Tag Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$tag-background-gray` | Gray tag background | `#e0e0e0` | `#e0e0e0` | `#525252` | `#525252` |
| `$tag-color-gray` | Gray tag text<br/>Gray tag icon | `#161616` | `#161616` | `#e0e0e0` | `#e0e0e0` |
| `$tag-hover-gray` | Gray tag hover for $tag-background-gray | `#d1d1d1` | `#d1d1d1` | `#636363` | `#636363` |
| `$tag-border-gray` | Gray tag border for operational tag | `#a8a8a8` | `#a8a8a8` | `#8d8d8d` | `#8d8d8d` |
| `$tag-background-cool-gray` | Cool gray tag background | `#dde1e6` | `#dde1e6` | `#4d5358` | `#4d5358` |
| `$tag-color-cool-gray` | Cool gray tag text<br/>Cool gray tag icon | `#121619` | `#121619` | `#dde1e6` | `#dde1e6` |
| `$tag-hover-cool-gray` | Cool gray tag hover for $tag-background-cool-gray | `#cdd3da` | `#cdd3da` | `#5d646a` | `#5d646a` |
| `$tag-border-cool-gray` | Cool gray tag border for operational tag | `#a2a9b0` | `#a2a9b0` | `#878d96` | `#878d96` |
| `$tag-background-warm-gray` | Warm gray tag background | `#e5e0df` | `#e5e0df` | `#565151` | `#565151` |
| `$tag-color-warm-gray` | Warm gray tag text<br/>Warm gray tag icon | `#171414` | `#171414` | `#e5e0df` | `#e5e0df` |
| `$tag-hover-warm-gray` | Warm gray tag hover for $tag-background-warm-gray | `#d8d0cf` | `#d8d0cf` | `#696363` | `#696363` |
| `$tag-border-warm-gray` | Warm gray tag border for operational tag | `#ada8a8` | `#ada8a8` | `#8f8b8b` | `#8f8b8b` |
| `$tag-background-red` | Red tag background | `#ffd7d9` | `#ffd7d9` | `#a2191f` | `#a2191f` |
| `$tag-color-red` | Red tag text<br/>Red tag icon | `#a2191f` | `#a2191f` | `#ffd7d9` | `#ffd7d9` |
| `$tag-hover-red` | Red tag hover for $tag-background-red | `#ffc2c5` | `#ffc2c5` | `#c21e25` | `#c21e25` |
| `$tag-border-red` | Red tag border for operational tag | `#ff8389` | `#ff8389` | `#fa4d56` | `#fa4d56` |
| `$tag-background-magenta` | Magenta tag background | `#ffd6e8` | `#ffd6e8` | `#9f1853` | `#9f1853` |
| `$tag-color-magenta` | Magenta tag text<br/>Magenta tag icon | `#9f1853` | `#9f1853` | `#ffd6e8` | `#ffd6e8` |
| `$tag-hover-magenta` | Magenta tag hover for $tag-background-magenta | `#ffbdda` | `#ffbdda` | `#bf1d63` | `#bf1d63` |
| `$tag-border-magenta` | Magenta tag border for operational tag | `#ff7eb6` | `#ff7eb6` | `#ee5396` | `#ee5396` |
| `$tag-background-purple` | Purple tag background | `#e8daff` | `#e8daff` | `#6929c4` | `#6929c4` |
| `$tag-color-purple` | Purple tag text<br/>Purple tag icon | `#6929c4` | `#6929c4` | `#e8daff` | `#e8daff` |
| `$tag-hover-purple` | Purple tag hover for $tag-background-purple | `#dcc7ff` | `#dcc7ff` | `#7c3dd6` | `#7c3dd6` |
| `$tag-border-purple` | Purple tag border for operational tag | `#be95ff` | `#be95ff` | `#a56eff` | `#a56eff` |
| `$tag-background-blue` | Blue tag background | `#d0e2ff` | `#d0e2ff` | `#0043ce` | `#0043ce` |
| `$tag-color-blue` | Blue tag text<br/>Blue tag icon | `#0043ce` | `#0043ce` | `#d0e2ff` | `#d0e2ff` |
| `$tag-hover-blue` | Blue tag hover for $tag-background-blue | `#b8d3ff` | `#b8d3ff` | `#0053ff` | `#0053ff` |
| `$tag-border-blue` | Blue tag border for operational tag | `#78a9ff` | `#78a9ff` | `#4589ff` | `#4589ff` |
| `$tag-background-cyan` | Cyan tag background | `#bae6ff` | `#bae6ff` | `#00539a` | `#00539a` |
| `$tag-color-cyan` | Cyan tag text<br/>Cyan tag icon | `#00539a` | `#00539a` | `#bae6ff` | `#bae6ff` |
| `$tag-hover-cyan` | Cyan tag hover for $tag-background-cyan | `#99daff` | `#99daff` | `#0066bd` | `#0066bd` |
| `$tag-border-cyan` | Cyan tag border for operational tag | `#33b1ff` | `#33b1ff` | `#1192e8` | `#1192e8` |
| `$tag-background-teal` | Teal tag background | `#9ef0f0` | `#9ef0f0` | `#005D5D` | `#005D5D` |
| `$tag-color-teal` | Teal tag text<br/>Teal tag icon | `#005d5d` | `#005d5d` | `#9ef0f0` | `#9ef0f0` |
| `$tag-hover-teal` | Teal tag hover for $tag-background-teal | `#57e5e5` | `#57e5e5` | `#007070` | `#007070` |
| `$tag-border-teal` | Teal tag border for operational tag | `#08bdba` | `#08bdba` | `#009d9a` | `#009d9a` |
| `$tag-background-green` | Green tag background | `#a7f0ba` | `#a7f0ba` | `#0e6027` | `#0e6027` |
| `$tag-color-green` | Green tag text<br/>Green tag icon | `#0e6027` | `#0e6027` | `#a7f0ba` | `#a7f0ba` |
| `$tag-hover-green` | Green tag hover for $tag-background-green | `#74e792` | `#74e792` | `#11742f` | `#11742f` |
| `$tag-border-green` | Green tag border for operational tag | `#42be65` | `#42be65` | `#24a148` | `#24a148` |

### Notification Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$notification-background-error` | Error low contrast notification background | `#fff1f1` | `#fff1f1` | `#393939` | `#262626` |
| `$notification-background-success` | Success low contrast notification background | `#defbe6` | `#defbe6` | `#393939` | `#262626` |
| `$notification-background-info` | Informational low contrast notification background | `#edf5ff` | `#edf5ff` | `#393939` | `#262626` |
| `$notification-background-warning` | Warning low contrast notification background | `#fcf4d6` | `#fcf4d6` | `#393939` | `#262626` |
| `$notification-action-hover` | Hover for notification ghost button | `#ffffff` | `#ffffff` | `#474747` | `#333333` |
| `$notification-action-tertiary-inverse` | Tertiary button color for notification | `#ffffff` | `#ffffff` | `#0f62fe` | `#0f62fe` |
| `$notification-action-tertiary-inverse-active` | Active color for tertiary button in notification | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$notification-action-tertiary-inverse-hover` | Hover color for tertiary button in notification | `#c6c6c6` | `#c6c6c6` | `#002d9c` | `#002d9c` |
| `$notification-action-tertiary-inverse-text` | Text color for tertiary button in notification | `#161616` | `#161616` | `#ffffff` | `#ffffff` |
| `$notification-action-tertiary-inverse-text-on-color-disabled` | Disabled color for tertiary button in notification | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |

### Ai Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$ai-aura-start` | Linear gradient start value for large AI layers | `#4589ff @ 10%` | `#4589ff @ 10%` | `#4589ff @ 10%` | `#4589ff @ 10%` |
| `$ai-aura-start-sm` | Linear gradient start value for small AI layers | `#4589ff @ 16%` | `#4589ff @ 16%` | `#4589ff @ 16%` | `#4589ff @ 16%` |
| `$ai-aura-end` | Linear gradient start value for all AI layers | `#ffffff @ 0%` | `#ffffff @ 0%` | `#000000 @ 0%` | `#000000 @ 0%` |
| `$ai-aura-hover-start` | Linear gradient start value for the AI aura hover | `#4589ff` | `#4589ff` | `#4589ff @ 40%` | `#4589ff @ 40%` |
| `$ai-aura-hover-end` | Linear gradient end value for the AI aura hover | `#ffffff @ 0%` | `#ffffff @ 0%` | `#000000 @ 0%` | `#000000 @ 0%` |
| `$ai-aura-hover-background` | Hover background color for AI layers | `#edf5ff` | `#edf5ff` | `#e8e8e8` | `#e8e8e8` |
| `$ai-border-start` | Linear gradient start value for AI borders | `#a6c8ff @ 64%` | `#a6c8ff @ 64%` | `#a6c8ff @ 36%` | `#a6c8ff @ 36%` |
| `$ai-border-end` | Linear gradient end value for AI borders | `#78a9ff` | `#78a9ff` | `#4589ff` | `#4589ff` |
| `$ai-border-strong` | Medium contrast border for AI elements<br/>Border-bottom paired with AI fields<br/>3:1 AA non-text contrast | `#4589ff` | `#4589ff` | `#78a9ff` | `#78a9ff` |
| `$ai-drop-shadow` | Drop shadow for the AI layer | `#0f62fe @ 10%` | `#0f62fe @ 10%` | `#000000 @ 28%` | `#000000 @ 28%` |
| `$ai-inner-shadow` | Inner shadow for the AI layer | `#4589ff @ 10%` | `#4589ff @ 10%` | `#4589ff @ 16%` | `#4589ff @ 16%` |
| `$ai-popover-background` | Background color for the AI explainability popover | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$ai-popover-shadow-outer-01` | 1 of 2 shadow colors for the AI explainability popover | `#0043ce @ 6%` | `#0043ce @ 6%` | `#000000 @ 12%` | `#000000 @ 12%` |
| `$ai-popover-shadow-outer-02` | 2 of 2 shadow colors for the AI explainability popover | `#000000 @ 4%` | `#000000 @ 4%` | `#000000 @ 8%` | `#000000 @ 8%` |
| `$ai-skeleton-element` | Skeleton color for AI text and UI elements | `#4589ff` | `#4589ff` | `#78a9ff @ 30%` | `#78a9ff @ 30%` |
| `$ai-skeleton-background` | Skeleton color for AI containers | `#d0e2ff` | `#d0e2ff` | `#78a9ff @ 50%` | `#78a9ff @ 50%` |
| `$ai-overlay` | Background overlay for AI components | `#001141 @ 50%` | `#001141 @ 50%` | `#000000 @ 50%` | `#000000 @ 50%` |

### Chat Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$chat-avatar-bot` | Chat avatar background color for bots | `#6f6f6f` | `#6f6f6f` | `#8d8d8d` | `#8d8d8d` |
| `$chat-avatar-agent` | Chat avatar background color for agents | `#393939` | `#393939` | `#c6c6c6` | `#c6c6c6` |
| `$chat-avatar-user` | Chat avatar background color for users | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$chat-bubble-user` | Chat bubble background color for users | `#e0e0e0` | `#e0e0e0` | `#393939` | `#393939` |
| `$chat-bubble-agent` | Chat bubble background color for agents | `#ffffff` | `#ffffff` | `#262626` | `#262626` |
| `$chat-bubble-agent-text` | Chat bubble text color for agents | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$chat-bubble-border` | Chat bubble border color for agents | `#e0e0e0` | `#e0e0e0` | `#525252` | `#525252` |
| `$chat-bubble-user-text` | Chat bubble text color for users | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$chat-prompt-background` | Background color for chat prompt input | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$chat-prompt-border-start` | Linear gradient start value for chat prompts border | `#f4f4f4` | `#f4f4f4` | `#262626` | `#262626` |
| `$chat-prompt-border-end` | Linear gradient end value for chat prompts border | `#f4f4f4 @ 0%` | `#f4f4f4 @ 0%` | `#262626 @ 0%` | `#262626 @ 0%` |
| `$chat-prompt-text` | Text for chat prompt | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$chat-shell-background` | Chat shell background color | `#ffffff` | `#ffffff` | `#262626` | `#262626` |
| `$chat-header-background` | Chat header background color | `#ffffff` | `#ffffff` | `#262626` | `#262626` |
| `$chat-header-text` | Text / fill for header | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |

### Chat Button Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$chat-button` | Chat quick action button color | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$chat-button-hover` | Hover color for $chat-button | `#8d8d8d @ 12%` | `#8d8d8d @ 12%` | `#8d8d8d @ 16%` | `#8d8d8d @ 16%` |
| `$chat-button-text-hover` | Text color for hovered chat button | `#0043ce` | `#0043ce` | `#a6c8ff` | `#a6c8ff` |
| `$chat-button-active` | Active color for $chat-button | `#8d8d8d @ 50%` | `#8d8d8d @ 50%` | `#8d8d8d @ 40%` | `#8d8d8d @ 40%` |
| `$chat-button-selected` | Selected color for $chat-button | `#8d8d8d @ 20%` | `#8d8d8d @ 20%` | `#8d8d8d @ 24%` | `#8d8d8d @ 24%` |
| `$chat-button-text-selected` | Text color for selected chat-button | `#525252` | `#525252` | `#c6c6c6` | `#c6c6c6` |


## AI Tokens

To accommodate for the new AI styles, we have introduced a new suite of color
tokens that can be found within the main Carbon themes. These tokens should only
be used when building custom AI components, variants, or instances in your UI.
For more information on how to use the AI tokens, see the
[Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
documentation.


### Quick Navigation

- [General AI](#general-ai)
- [Chat](#chat)
- [Chat button](#chat-button)


### Background Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$background` | Default page background<br/>UI Shell base color | `#ffffff` | `#f4f4f4` | `#262626` | `#161616` |
| `$layer-background-01` | Default page background<br/>Automatically matches contextual layer background | `#ffffff` | `#f4f4f4` | `#262626` | `#161616` |
| `$background-hover` | Hover color for $background<br/>Hover color for transparent backgrounds | `#8d8d8d @ 12%` | `#8d8d8d @ 12%` | `#8d8d8d @ 16%` | `#8d8d8d @ 16%` |
| `$background-active` | Active color for $background | `#8d8d8d @ 50%` | `#8d8d8d @ 50%` | `#8d8d8d @ 40%` | `#8d8d8d @ 40%` |
| `$background-selected` | Selected color for $background | `#8d8d8d @ 20%` | `#8d8d8d @ 20%` | `#8d8d8d @ 24%` | `#8d8d8d @ 24%` |
| `$background-selected-hover` | Hover color for $background-selected | `#8d8d8d @ 32%` | `#8d8d8d @ 32%` | `#8d8d8d @ 32%` | `#8d8d8d @ 32%` |
| `$background-inverse` | High contrast backgrounds<br/>High contrast elements | `#393939` | `#393939` | `#f4f4f4` | `#f4f4f4` |
| `$background-inverse-hover` | Hover color for $background-inverse | `#4c4c4c` | `#4c4c4c` | `#e5e5e5` | `#e5e5e5` |
| `$background-brand` | Feature background color | `#0f62fe` | `#0f62fe` | `#0f62fe` | `#0f62fe` |

### Layer Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$layer-01` | Container color on $background<br/>Secondary page background | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `$layer-02` | Container color on $layer-01 | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `$layer-03` | Container color on $layer-02 | `#f4f4f4` | `#ffffff` | `#6f6f6f` | `#525252` |
| `$layer-background-02` | Container color on $layer-background-01<br/>Automatically matches contextual layer background | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `$layer-background-03` | Container color on $layer-background-02<br/>Automatically matches contextual layer background | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `$layer-hover-01` | Hover color for $layer-01 | `#e8e8e8` | `#e8e8e8` | `#474747` | `#333333` |
| `$layer-hover-02` | Hover color for $layer-02 | `#e8e8e8` | `#e8e8e8` | `#636363` | `#474747` |
| `$layer-hover-03` | Hover color for $layer-03 | `#e8e8e8` | `#e8e8e8` | `#5e5e5e` | `#636363` |
| `$layer-active-01` | Active color for $layer-01 | `#c6c6c6` | `#c6c6c6` | `#6f6f6f` | `#525252` |
| `$layer-active-02` | Active color for $layer-02 | `#c6c6c6` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$layer-active-03` | Active color for $layer-03 | `#c6c6c6` | `#c6c6c6` | `#393939` | `#8d8d8d` |
| `$layer-selected-01` | Selected color for $layer-01 | `#e0e0e0` | `#e0e0e0` | `#525252` | `#393939` |
| `$layer-selected-02` | Selected color for $layer-02 | `#e0e0e0` | `#e0e0e0` | `#6f6f6f` | `#525252` |
| `$layer-selected-03` | Selected color for $layer-03 | `#e0e0e0` | `#e0e0e0` | `#525252` | `#6f6f6f` |
| `$layer-selected-hover-01` | Hover color for $layer-selected-01 | `#d1d1d1` | `#d1d1d1` | `#636363` | `#474747` |
| `$layer-selected-hover-02` | Hover color for $layer-selected-02 | `#d1d1d1` | `#d1d1d1` | `#5e5e5e` | `#636363` |
| `$layer-selected-hover-03` | Hover color for $layer-selected-03 | `#d1d1d1` | `#d1d1d1` | `#636363` | `#5e5e5e` |
| `$layer-selected-inverse` | High contrast elements<br/>4.5:1 AA element contrast | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$layer-selected-disabled` | Disabled color for selected layers | `#8d8d8d` | `#8d8d8d` | `#8d8d8d` | `#6f6f6f` |

### Layer Accent Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$layer-accent-01` | Tertiary background paired with $layer-01 | `#e0e0e0` | `#e0e0e0` | `#525252` | `#393939` |
| `$layer-accent-02` | Tertiary background paired with $layer-02 | `#e0e0e0` | `#e0e0e0` | `#6f6f6f` | `#525252` |
| `$layer-accent-03` | Tertiary background paired with $layer-03 | `#e0e0e0` | `#e0e0e0` | `#8d8d8d` | `#6f6f6f` |
| `$layer-accent-hover-01` | Hover color for $layer-accent-01 | `#cacaca` | `#cacaca` | `#656565` | `#4c4c4c` |
| `$layer-accent-hover-02` | Hover color for $layer-accent-02 | `#cacaca` | `#cacaca` | `#5e5e5e` | `#656565` |
| `$layer-accent-hover-03` | Hover color for $layer-accent-03 | `#cacaca` | `#cacaca` | `#7a7a7a` | `#5e5e5e` |
| `$layer-accent-active-01` | Active color for $layer-accent-01 | `#a8a8a8` | `#a8a8a8` | `#6f6f6f` | `#525252` |
| `$layer-accent-active-02` | Active color for $layer-accent-02 | `#a8a8a8` | `#a8a8a8` | `#393939` | `#8d8d8d` |
| `$layer-accent-active-03` | Active color for $layer-accent-03 | `#a8a8a8` | `#a8a8a8` | `#525252` | `#393939` |

### Field Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$field-01` | Default input fields<br/>Fields on $background | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `$field-02` | Secondary input fields<br/>Fields on $layer-01 | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `$field-03` | Tertiary input fields<br/>Fields on $layer-02 | `#f4f4f4` | `#ffffff` | `#6f6f6f` | `#525252` |
| `$field-hover-01` | Hover color for $field-01 | `#e8e8e8` | `#e8e8e8` | `#474747` | `#333333` |
| `$field-hover-02` | Hover color for $field-02 | `#e8e8e8` | `#e8e8e8` | `#636363` | `#474747` |
| `$field-hover-03` | Hover color for $field-03 | `#e8e8e8` | `#e8e8e8` | `#5e5e5e` | `#636363` |

### Border Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$border-interactive` | 3:1 AA contrast<br/>Selected borders<br/>Active borders | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$border-subtle-00` | Subtle borders paired with $background | `#e0e0e0` | `#c6c6c6` | `#525252` | `#393939` |
| `$border-subtle-01` | Subtle borders paired with $layer-01 | `#c6c6c6` | `#e0e0e0` | `#6f6f6f` | `#525252` |
| `$border-subtle-02` | Subtle borders paired with $layer-02 | `#e0e0e0` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$border-subtle-03` | Subtle borders paired with $layer-03 | `#c6c6c6` | `#e0e0e0` | `#8d8d8d` | `#6f6f6f` |
| `$border-subtle-selected-01` | Selected color for $border-subtle-01 | `#c6c6c6` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$border-subtle-selected-02` | Selected color for $border-subtle-02 | `#c6c6c6` | `#c6c6c6` | `#a8a8a8` | `#8d8d8d` |
| `$border-subtle-selected-03` | Selected color for $border-subtle-03 | `#c6c6c6` | `#c6c6c6` | `#a8a8a8` | `#8d8d8d` |
| `$border-strong-01` | Medium contrast border<br/>Border-bottom paired with $field-01<br/>3:1 AA non-text contrast | `#8d8d8d` | `#8d8d8d` | `#8d8d8d` | `#6f6f6f` |
| `$border-strong-02` | Medium contrast border<br/>Border-bottom paired with $field-02<br/>3:1 AA non-text contrast | `#8d8d8d` | `#8d8d8d` | `#a8a8a8` | `#8d8d8d` |
| `$border-strong-03` | Medium contrast border<br/>Border-bottom paired with $field-03<br/>3:1 AA non-text contrast | `#8d8d8d` | `#8d8d8d` | `#c6c6c6` | `#a8a8a8` |
| `$border-tile-01` | Operable tile indicator paired with $layer-01 | `#c6c6c6` | `#a8a8a8` | `#6f6f6f` | `#525252` |
| `$border-tile-02` | Operable tile indicator paired with $layer-02 | `#a8a8a8` | `#c6c6c6` | `#8d8d8d` | `#6f6f6f` |
| `$border-tile-03` | Operable tile indicator paired with $layer-03 | `#c6c6c6` | `#a8a8a8` | `#a8a8a8` | `#8d8d8d` |
| `$border-inverse` | High contrast border<br/>4.5:1 AA non-text contrast | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$border-disabled` | Disabled border color (excluding border-subtles) | `#c6c6c6` | `#c6c6c6` | `#8d8d8d @ 50%` | `#8d8d8d @ 50%` |

### Text Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$text-primary` | Primary text<br/>Body copy<br/>Headers<br/>Hover text color for $text-secondary | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$text-secondary` | Secondary text<br/>Input labels | `#525252` | `#525252` | `#c6c6c6` | `#c6c6c6` |
| `$text-placeholder` | Placeholder text | `#a8a8a8` | `#a8a8a8` | `#6f6f6f` | `#6f6f6f` |
| `$text-on-color` | Text on interactive colors<br/>Text on button colors | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `$text-on-color-disabled` | Disabled color for $text-on-color | `#8d8d8d` | `#8d8d8d` | `#ffffff – 25%` | `#ffffff – 25%` |
| `$text-helper` | Tertiary text<br/>Help text | `#6f6f6f` | `#6f6f6f` | `#8d8d8d` | `#8d8d8d` |
| `$text-error` | Error message text | `#da1e28` | `#da1e28` | `#ffb3b8` | `#ff8389` |
| `$text-inverse` | Inverse text color | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$text-disabled` | Disabled text color | `#161616 – 25%` | `#161616 – 25%` | `#f4f4f4 – 25%` | `#f4f4f4 – 25%` |

### Link Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$link-primary` | Primary links | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$link-primary-hover` | Hover color for $link-primary | `#0043ce` | `#0043ce` | `#a6c8ff` | `#a6c8ff` |
| `$link-secondary` | Secondary link color for lower contrast backgrounds | `#0043ce` | `#0043ce` | `#a6c8ff` | `#a6c8ff` |
| `$link-inverse` | Links on $background-inverse backgrounds | `#78a9ff` | `#78a9ff` | `#0f62fe` | `#0f62fe` |
| `$link-inverse-hover` | Hover color for links on $background-inverse backgrounds | `#a6c8ff` | `#a6c8ff` | `#0043ce` | `#0043ce` |
| `$link-inverse-active` | Active color for links on $background-inverse backgrounds | `#f4f4f4` | `#f4f4f4` | `#161616` | `#161616` |
| `$link-inverse-visited` | Color for visited links on $background-inverse backgrounds | `#be95ff` | `#be95ff` | `#8a3ffc` | `#8a3ffc` |
| `$link-visited` | Color for visited links | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |

### Syntax Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$syntax-comment` | Default comment text | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-line-comment` | Single-line comment | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-block-comment` | Block comment | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-doc-comment` | Documentation comment | `#198038` | `#198038` | `#42be65` | `#42be65` |
| `$syntax-doc-string` | Docstring | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-keyword` | Keywords | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-operator-keyword` | Operator keywords | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-control-keyword` | Control-flow keywords | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-definition-keyword` | Definition keywords | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-module-keyword` | Module/import keywords | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-variable` | Variable | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-name` | Name | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-variable-name` | Variable name | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-label-name` | Label name | `#0f62fe` | `#0f62fe` | `#78a9ff` | `#78a9ff` |
| `$syntax-attribute` | Attribute | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-attribute-name` | Attribute name | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-property-name` | Property name | `#00bcd4` | `#00bcd4` | `#5fd7e7` | `#5fd7e7` |
| `$syntax-tag` | Tag delimiters | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-tag-name` | Tag name | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-type` | Type | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-type-name` | Type name | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-class-name` | Class name | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-namespace` | Namespace | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-macro-name` | Macro name | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-atom` | Atom literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-literal` | Literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-bool` | Boolean | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-null` | Null/undefined | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-self` | Self/this | `#009d9a` | `#009d9a` | `#2fd3cc` | `#2fd3cc` |
| `$syntax-number` | Number | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-integer` | Integer | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-float` | Float | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-unit` | Unit | `#198038` | `#198038` | `#6fdc8c` | `#6fdc8c` |
| `$syntax-string` | String | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-character` | Character | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-attribute-value` | Attribute value | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-special-string` | Special string | `#a56eff` | `#a56eff` | `#be95ff` | `#be95ff` |
| `$syntax-regexp` | RegExp | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-escape` | Escape sequence | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-url` | URL literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-color` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-deref-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-arithmetic-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-logic-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-bitwise-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-compare-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-update-operator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-definition-operator` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-type-operator` | Color literal | `#009d9a` | `#009d9a` | `#3ddbd9` | `#3ddbd9` |
| `$syntax-control-operator` | Color literal | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-modifier` | Color literal | `#d02670` | `#d02670` | `#ff7eb6` | `#ff7eb6` |
| `$syntax-punctuation` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-separator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-bracket` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-angle-bracket` | Color literal | `#6f6f6f` | `#6f6f6f` | `#8d8d8d` | `#8d8d8d` |
| `$syntax-square-bracket` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-paren` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-brace` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-content` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-list` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-emphasis` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-strong` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-monospace` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-strikethrough` | Color literal | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$syntax-heading` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-1` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-2` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-3` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-4` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-5` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-heading-6` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-content-separator` | Color literal | `#8d8d8d` | `#8d8d8d` | `#e5e5e5` | `#e5e5e5` |
| `$syntax-quote` | Color literal | `#6f6f6f` | `#6f6f6f` | `#c6c6c6` | `#c6c6c6` |
| `$syntax-link` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-invalid` | Color literal | `#da1e28` | `#da1e28` | `#fa4d56` | `#fa4d56` |
| `$syntax-meta` | Color literal | `#24a148` | `#24a148` | `#42be65` | `#42be65` |
| `$syntax-document-meta` | Color literal | `#24a148` | `#24a148` | `#42be65` | `#42be65` |
| `$syntax-annotation` | Color literal | `#009d9a` | `#009d9a` | `#3ddbd9` | `#3ddbd9` |
| `$syntax-processing-instruction` | Color literal | `#8a3ffc` | `#8a3ffc` | `#be95ff` | `#be95ff` |
| `$syntax-definition` | Color literal | `#0072c3` | `#0072c3` | `#78a9ff` | `#78a9ff` |
| `$syntax-constant` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-function` | Color literal | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$syntax-standard` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-local` | Color literal | `#0f62fe` | `#0f62fe` | `#a6c8ff` | `#a6c8ff` |
| `$syntax-special` | Color literal | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$syntax-deleted` | Color literal | `#ffd7d9` | `#ffd7d9` | `#a2191f` | `#a2191f` |
| `$syntax-inserted` | Color literal | `#a7f0ba` | `#a7f0ba` | `#198038` | `#198038` |

### Icon Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$icon-primary` | Primary icons | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `$icon-secondary` | Secondary icons | `#525252` | `#525252` | `#c6c6c6` | `#c6c6c6` |
| `$icon-on-color` | Icons on interactive colors<br/>Icons on non-layer colors | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `$icon-on-color-disabled` | Disabled color for $icon-on-color | `#8d8d8d` | `#8d8d8d` | `#ffffff – 25%` | `#ffffff – 25%` |
| `$icon-interactive` | Icons that indicate operability | `#0f62fe` | `#0f62fe` | `#ffffff` | `#ffffff` |
| `$icon-inverse` | Inverse icon color | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$icon-disabled` | Disabled icon color | `#161616 – 25%` | `#161616 – 25%` | `#f4f4f4 – 25%` | `#f4f4f4 – 25%` |

### Support Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$support-error` | Error<br/>Invalid state | `#da1e28` | `#da1e28` | `#ff8389` | `#fa4d56` |
| `$support-success` | Success<br/>On | `#24a148` | `#24a148` | `#42be65` | `#42be65` |
| `$support-warning` | Warning | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$support-info` | Information | `#0043ce` | `#0043ce` | `#4589ff` | `#4589ff` |
| `$support-error-inverse` | Error in high contrast moments | `#fa4d56` | `#fa4d56` | `#da1e28` | `#da1e28` |
| `$support-success-inverse` | Success in high contrast moments | `#42be65` | `#42be65` | `#24a148` | `#24a148` |
| `$support-warning-inverse` | Warning in high contrast moments | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$support-info-inverse` | Information in high contrast moments | `#4589ff` | `#4589ff` | `#0043ce` | `#0043ce` |
| `$support-caution-minor` | Minor caution status | `#f1c21b` | `#f1c21b` | `#f1c21b` | `#f1c21b` |
| `$support-caution-major` | Major caution status | `#ff832b` | `#ff832b` | `#ff832b` | `#ff832b` |
| `$support-caution-undefined` | Undefined status | `#8a3ffc` | `#8a3ffc` | `#a56eff` | `#a56eff` |

### Focus Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$focus` | Focus border<br/>Focus underline | `#0f62fe` | `#0f62fe` | `#ffffff` | `#ffffff` |
| `$focus-inset` | Contrast border paired with $focus | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `$focus-inverse` | Focus on high contrast moments | `#ffffff` | `#ffffff` | `#0f62fe` | `#0f62fe` |

### Miscellaneous Tokens

| Token | Role | White | Gray 10 | Gray 90 | Gray 100 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `$interactive` | 3:1 AA contrast<br/>Selected elements<br/>Active elements<br/>Accent icons | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `$highlight` | Highlight color | `#d0e2ff` | `#d0e2ff` | `#002d9c` | `#001d6c` |
| `$toggle-off` | Off background<br/>3:1 AA contrast | `#8d8d8d` | `#8d8d8d` | `#8d8d8d` | `#6f6f6f` |
| `$overlay` | Background overlay | `#000000 @ 60%` | `#000000 @ 60%` | `#000000 @ 60%` | `#000000 @ 60%` |
| `$skeleton-element` | Skeleton color for text and UI elements | `#c6c6c6` | `#c6c6c6` | `#525252` | `#525252` |
| `$skeleton-background` | Skeleton color for containers | `#e5e5e5` | `#e5e5e5` | `#353535` | `#353535` |

