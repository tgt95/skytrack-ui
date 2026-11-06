---
title: 2x Grid
description:
  The grid is the framework for all the visual elements and typography at IBM.
  It’s fundamental to everything we design.
tabs: ['Overview', 'Usage', 'Code']
---


> The Carbon Grid package helps developers build digital experiences with the 2x
> Grid. The project allows you to use CSS grid to build a variety of layouts.


> [!NOTE]
> If you're using `@carbon/react`, you you probably don't need to install the grid
> package separately. See our [Carbon React](/developing/frameworks/react/) guide
> to start building.


### Quick Navigation

- [Documentation](#documentation)
- [API & Helpers](#api-helpers)
- [Legacy](#legacy)


## Documentation

### CSS Grid

Carbon provides grid components, using CSS Grid to help developers use the 2x
Grid. These components include `Grid` and `Column` and allow you to define
column widths by breakpoint, based on a 16 column grid.


  
  
- 📄 [**React**](https://react.carbondesignsystem.com/?path=/docs/elements-grid--default)

  </ResourceCard>


    
- 📄 [**CSS Grid demo**](https://carbon-elements.netlify.app/grid/examples/css-grid/)

  </ResourceCard>
  


> [!NOTE]
> The Carbon grid is an important tool for placing elements on the screen. When
>   used correctly, complex layouts can be achieved with little or no custom CSS
>   (`display: flex`, `position` declarations, size/width overrides, etc.)


### AspectRatio

When designing fluid layouts, it's helpful for an asset or card to be a specific
aspect ratio. The `AspectRatio` component supports rendering your content in a
specific aspect ratio through the ratio prop. This allows you to specify the
proportion between the width and the height of your content.


  
  
- 📄 [**React**](https://react.carbondesignsystem.com/?path=/story/components-aspectratio--default)

  </ResourceCard>

 
  
- 📄 [**Vue**](https://vue.carbondesignsystem.com/?path=/story/components-cvaspectratio--default)

  </ResourceCard>


## API & Helpers

There are many ways to make the 2x Grid work for your application using our API.
The examples below illustrate two ways of removing visibility of a given
component based on the breakpoint.

```css
@use '@carbon/grid' as *;

.component {
  display: block;

  /* applies styles inside mixin on md breakpoint or below, like max-width */
  @include breakpoint-down('md') {
    display: none;
  }
}

.component {
  display: none;

  /* applies styles inside mixin on lg breakpoint and above */
  @include breakpoint('lg') {
    display: block;
  }
}
```

In addition, you can also use Helpers to control what is being displayed on the
screen at a given breakpoint.

```css
@use '@carbon/styles/scss/utilities/helper-classes';

.my-class {
  @include helper-classes.hide-at-sm();
}
```


  
    
- 📄 [**Carbon grid package**](https://github.com/carbon-design-system/carbon/tree/main/packages/grid)

  </ResourceCard>
  
   
    
- 📄 [**Carbon grid docs API**](https://github.com/carbon-design-system/carbon/blob/main/packages/grid/docs/sass.md#api)

  </ResourceCard>
  

  
    
- 📄 [**Hide at Breakpoint Helpers on Storybook**](https://react.carbondesignsystem.com/?path=/story/helpers-hideatbreakpoint--hide-at-breakpoint)

  </ResourceCard>
  


## Legacy

### Flexbox Grid

The default grid in v11 is based off of CSS Grid, to enable the legacy
[FlexGrid](https://react.carbondesignsystem.com/?path=/docs/elements-flexgrid--auto-columns)
implementation, built using Flexbox, you will need to include the following in
your Sass files:

```scss
@use '@carbon/grid';

// Emit the flex-grid styles
@include grid.flex-grid();
```


   
    
- 📄 [**React**](https://react.carbondesignsystem.com/?path=/story/elements-flexgrid--auto-columns)

  </ResourceCard>
  

    
- 📄 [**Angular**](https://angular.carbondesignsystem.com/?path=/story/components-grid--basic)

  </ResourceCard>
  
  
    
- 📄 [**Vue**](https://vue.carbondesignsystem.com/?path=/story/components-cvgrid--auto-columns)

  </ResourceCard>
  
  
    
- 📄 [**FlexGrid demo**](https://carbon-elements.netlify.app/grid/examples/preview/)

  </ResourceCard>
  

