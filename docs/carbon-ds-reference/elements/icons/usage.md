---
label:
  Icons are visual symbols used to represent ideas, objects, or actions. They
  communicate messages at a glance, afford interactivity, and draw attention to
  important information.
title: Icons
description:
  Icons are visual symbols used to represent ideas, objects, or actions. They
  communicate messages at a glance, afford interactivity, and draw attention to
  important information.
tabs: ['Library', 'Usage', 'Code']
---


> Icons are visual symbols used to represent ideas, objects, or actions. They
> communicate messages at a glance, afford interactivity, and draw attention to
> important information.


## Resources


  
- 📄 [**IBM® UI Icon Library**](https://www.figma.com/design/J5c0d85dSJn9JnBhSYYLmD/IBM%C2%AE-UI-Icon-Library?m=auto)
 </ResourceCard>


  
- 📄 [**Elements package: Icons**](https://github.com/carbon-design-system/carbon/tree/main/packages/icons)

  </ResourceCard>


  
- 📄 [**Elements package: Icons-React**](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react)

 </ResourceCard>


  
- 📄 [**Carbon Animated Icons Collection**](https://carbon-design-system.github.io/icons-motion/#/)

 </ResourceCard>


<br />
<br />

## Designing with icons

### Sizing

Carbon components typically use icons on 16px artboards. Icons on 20px, 24px,
and 32px artboards can also be used within the UI. Be sure icon size is
consistent throughout your product.

![icon sizing](images/iconography_usage_sizing-alt.svg)

![icon alignment](images/iconography-usage-sizing-2.svg)


*Caption: 16px and 20px icons are optimized to feel balanced when paired with 14px and
  16px IBM Plex. Use 24px and 32px when larger icons are needed.*


  
> [!TIP] **DO: Do use the correct icon size with IBM Plex.**
> ![proper sizing](images/iconography-usage-sizing-3.svg)

  
> [!WARNING] **DON'T: Don’t alter the icon-text size ratio.**
> ![improper sizing](images/iconography-usage-sizing-4.svg)


### Touch targets

All touch targets for interactive icons need to be 44px or larger. Developers
can add padding to a touch target with CSS to meet the 44px requirement.

![touch target padding](images/iconography-usage-padding-6.svg)


*Caption: A 22px icon centered in a 48px touch target.*


### Color

Icons are always a solid, monochromatic color and need to pass the same color
contrast ratio as typography (4.5:1). The color of the icon should reflect the
importance of the icon’s action which should always be to help guide a user. For
more information on color, see the [Color guidelines](/elements/color/overview).

It's also important to note that Carbon v10 icons themselves do not have
interaction states, only their backgrounds do.


  
> [!TIP] **DO: Do match your icon color with your text color when pairing them.**
> ![proper alignment](images/iconography-color-01.png)

  
> [!WARNING] **DON'T: Don’t use different colors for text and icons.**
> ![improper alignment](images/iconography-color-02.png)


### Alignment

When used next to text, icons should be center-aligned.


  
> [!TIP] **DO: Do center-align icons when they’re next to text.**
> ![proper alignment](images/iconography-usage-sizing-5.svg)

  
> [!WARNING] **DON'T: Don’t baseline-align icons to the text.**
> ![improper alignment](images/iconography-usage-sizing-6.svg)


