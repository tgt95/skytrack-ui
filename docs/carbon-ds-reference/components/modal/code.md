---
title: Modal
description:
  Modals focus the user’s attention exclusively on one task or piece of
  information via a window that sits on top of the page content.
tabs: ['Usage', 'Style', 'Code', 'Accessibility']
---


> Preview the modal component with the React live demo. For detailed code usage
> documentation, see the Storybooks for each framework below.


## Documentation


  
- 📄 [**React**](https://react.carbondesignsystem.com/?path=/story/components-modal--default)
 `[Feature flag]` 

  </ResourceCard>


  
- 📄 [**Web Components**](https://web-components.carbondesignsystem.com/?path=/story/components-modal--default)

  </ResourceCard>


  
- 📄 [**Angular (Community)**](https://angular.carbondesignsystem.com/?path=/story/components-modal--basic)

  </ResourceCard>


  
- 📄 [**Vue (Community)**](http://vue.carbondesignsystem.com/?path=/story/components-cvmodal--default)

  </ResourceCard>


### Feature flags

A [feature flag](/components/overview/feature-flags/) has been added to modal to
improve accessibility and changes parts of its functionality, not its visual
appearance. For more code-specific feature flag information, refer to the
[@carbon/react](https://react.carbondesignsystem.com/?path=/docs/components-modal-feature-flag--flag-details)
framework. Once the next major release (v12) is released in the future, this
feature flag will become the default version of the component.

The `enable-focus-wrap-without-sentinels` flag is a new approach to focus wrap
behavior, modifying the DOM to no longer include hidden "sentinel nodes" that
previously marked the beginning and end of the wrapped focus. This behavior
considers all interactive child nodes and wraps focus based on their tab order.

## Live demo


> 🔗 **Interactive Live Demo:** [Carbon React Storybook](https://react.carbondesignsystem.com)

