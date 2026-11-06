---
title: Data table
description:
  The data table component allows for the flexible display and sorting of
  information.
tabs: ['Usage', 'Style', 'Code', 'Accessibility']
---


> Preview the data table component with the React live demo. For detailed code
> usage documentation, see the Storybooks for each framework below.


## Documentation


  
- 📄 [**React**](https://react.carbondesignsystem.com/?path=/story/components-datatable-basic--default)

  </ResourceCard>


  
- 📄 [**Web Components**](https://web-components.carbondesignsystem.com/?path=/story/components-datatable-basic--default)

  </ResourceCard>


  
- 📄 [**Angular (Community)**](https://angular.carbondesignsystem.com/?path=/story/components-data-table--basic)

  </ResourceCard>


  
- 📄 [**Vue (Community)**](http://vue.carbondesignsystem.com/?path=/story/components-cvdatatable--minimal)

  </ResourceCard>


## Live demo


> 🔗 **Interactive Live Demo:** [Carbon React Storybook](https://react.carbondesignsystem.com)


## Sample data

```javascript
const headerData = [
  {
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Protocol',
    key: 'protocol',
  },
  {
    header: 'Port',
    key: 'port',
  },
  {
    header: 'Rule',
    key: 'rule',
  },
  {
    header: 'Attached Groups',
    key: 'attached_groups',
  },
  {
    header: 'Status',
    key: 'status',
  },
];

const rowData = [
  {
    attached_groups: 'Kevins VM Groups',
    id: 'a',
    name: 'Load Balancer 3',
    port: 3000,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Disabled',
  },
  {
    attached_groups: 'Maureens VM Groups',
    id: 'b',
    name: 'Load Balancer 1',
    port: 443,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Starting',
  },
  {
    attached_groups: 'Andrews VM Groups',
    id: 'c',
    name: 'Load Balancer 2',
    port: 80,
    protocol: 'HTTP',
    rule: 'DNS delegation',
    status: 'Active',
  },
  {
    attached_groups: 'Marcs VM Groups',
    id: 'd',
    name: 'Load Balancer 6',
    port: 3000,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Disabled',
  },
  {
    attached_groups: 'Mels VM Groups',
    id: 'e',
    name: 'Load Balancer 4',
    port: 443,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Starting',
  },
  {
    attached_groups: 'Ronjas VM Groups',
    id: 'f',
    name: 'Load Balancer 5',
    port: 80,
    protocol: 'HTTP',
    rule: 'DNS delegation',
    status: 'Active',
  },
];
```
