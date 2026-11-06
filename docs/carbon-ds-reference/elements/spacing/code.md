---
label:
  Spacing is an important — and often overlooked — part of visual design. Carbon
  takes a lot of the guesswork out of spacing to help designers deliver clear,
  functional layouts.
title: Spacing
description:
  Spacing is an important — and often overlooked — part of visual design. Carbon
  takes a lot of the guesswork out of spacing to help designers deliver clear,
  functional layouts.
tabs: ['Overview', 'Code']
---


> The Carbon layout package helps teams build consistent experiences through
> spacing and alignment.


> [!NOTE]
> If you're using `@carbon/react`, you probably don't need need to install the
> layout package separately. See our [Carbon React](/developing/frameworks/react/)
> guide to start building.


## Usage

The `@carbon/layout` package provides spacing tokens and conversion utilities
for the Carbon Design System. You can access these tokens and helpers by writing
the following:

```scss
@use '@carbon/layout';

.selector {
  margin-bottom: layout.$spacing-05;
  width: layout.rem(24px);
  height: layout.rem(24px);
}
```

#### API

<br />

| Export              | Description | !default |
| :------------------ | :---------- | :------- |
| `$spacing-01`       |             | ✅       |
| `$spacing-02`       |             | ✅       |
| `$spacing-03`       |             | ✅       |
| `$spacing-04`       |             | ✅       |
| `$spacing-05`       |             | ✅       |
| `$spacing-06`       |             | ✅       |
| `$spacing-07`       |             | ✅       |
| `$spacing-08`       |             | ✅       |
| `$spacing-09`       |             | ✅       |
| `$spacing-10`       |             | ✅       |
| `$spacing-11`       |             | ✅       |
| `$spacing-12`       |             | ✅       |
| `$spacing-13`       |             | ✅       |
| `$spacing `         |             |          |
| `$fluid-spacing-01` |             | ✅       |
| `$fluid-spacing-02` |             | ✅       |
| `$fluid-spacing-03` |             | ✅       |
| `$fluid-spacing-04` |             | ✅       |
| `$fluid-spacing `   |             |          |
| `@function em`      |             |          |
| `@function rem`     |             |          |
| `$base-font-size`   |             | ✅       |

### Configuration

You can configure parts of the `@carbon/layout` package that are `!default` with
Sass Modules. For example, you can change the `$base-font-size` by writing the
following:

```scss
@use '@carbon/layout' with (
  $base-font-size: 18px
);
```

## Resources


  
    
- 📄 [**Carbon layout package**](https://github.com/carbon-design-system/carbon/tree/main/packages/layout)

  </ResourceCard>
  
  
    
- 📄 [**Layout package demo**](https://carbon-elements.netlify.app/layout/examples/preview/)

  </ResourceCard>
  

