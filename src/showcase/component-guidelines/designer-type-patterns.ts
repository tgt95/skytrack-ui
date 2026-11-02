import type { ComponentType } from 'react'
import {
  ChartAreaTypePreview,
  ChartBarTypePreview,
  ChartHorizontalBarTypePreview,
  ChartLineTypePreview,
  ChartPieTypePreview,
  ChartScatterTypePreview,
  ChartStackedAreaTypePreview,
  ChartStackedBarTypePreview
} from './designer-chart-type-examples'

export interface DesignerTypeExample {
  id?: string
  variantName?: string
  label: string
  preview?: ComponentType
}

export interface DesignerTypePattern {
  title: string
  description: string
  examples: DesignerTypeExample[]
  /** Defaults to auto-fitting as many columns as the available width allows. */
  layout?: 'auto-fit' | 'single-column'
  /** Minimum width for auto-fit columns; defaults to 32rem. */
  minColumnWidth?: string
}

const pattern = (
  title: string,
  description: string,
  ...examples: [variantName: string, label: string][]
): DesignerTypePattern => ({
  title,
  description,
  examples: examples.map(([variantName, label]) => ({ variantName, label }))
})

/** Designer-facing groupings of existing demos. Keep variant names source-exact. */
export const designerTypePatternsByDemoId: Record<string, DesignerTypePattern[]> = {
  accordion: [
    pattern(
      'Disclosure scope',
      'Choose whether people should open one section at a time or compare several sections together.',
      ['Demo', 'Single section'],
      ['Open multiple panels', 'Multiple sections']
    )
  ],
  'alert-dialog': [
    pattern(
      'High-impact decision',
      'Use an alert dialog when an action is difficult to reverse and the person must choose before continuing.',
      ['Default', 'Confirm a destructive action']
    ),
    pattern('Decision from context', 'Keep the confirmation connected to the object or action that prompted it.', [
      'Open from a menu',
      'Start from an action menu'
    ]),
    pattern('Unsaved changes', 'When closing would lose edits, make the consequence clear and offer a safe way back.', [
      'Close confirmation',
      'Choose whether to discard edits'
    ]),
    pattern(
      'Multiple entry points',
      'Use one consistent confirmation when the same consequential decision is available from related places.',
      ['Detached triggers', 'Separate the decision from its trigger'],
      ['Multiple triggers', 'Open the same decision from several places']
    )
  ],
  alert: [
    pattern(
      'Message severity and action',
      'Choose the treatment that matches the message meaning; add an action only when it helps resolve or continue the task.',
      ['Semantic variants', 'Informative, success, warning, or error'],
      ['With action', 'Message with a relevant action'],
      ['Action below description', 'Action placed after supporting text']
    )
  ],
  attachment: [
    pattern(
      'File presentation',
      'Scale file detail to its context: compact for dense lists, larger when a preview or file identity needs room.',
      ['Default', 'Single file'],
      ['Sizes', 'Compact and expanded sizes'],
      ['Group', 'Related files together']
    )
  ],
  autocomplete: [
    pattern(
      'Suggestion presentation',
      'Use a suggestion list for choice, inline completion for a likely text continuation, and groups when categories improve scanning.',
      ['Default', 'Suggestions in a list'],
      ['Inline autocomplete', 'Inline text completion'],
      ['Grouped', 'Suggestions grouped by category']
    )
  ],
  avatar: [
    pattern(
      'Identity and scale',
      'Use an image when available, a clear fallback when it is not, and a size that fits the surrounding content.',
      ['Image and fallback', 'Image or fallback initials'],
      ['Sizes', 'Small, standard, and large']
    )
  ],
  badge: [
    pattern(
      'Status and count',
      'Use a short status label for state, a count for quantity, and a dot only when the exact value is unnecessary.',
      ['Status', 'Labeled status'],
      ['Overflow', 'Capped count'],
      ['Dot', 'Minimal indicator'],
      ['Standalone', 'Unanchored label']
    )
  ],
  breadcrumb: [
    pattern(
      'Path visibility',
      'Show the route hierarchy when it helps people locate themselves; collapse middle levels only when the path exceeds the available space.',
      ['Basic', 'Full path'],
      ['Collapsed path', 'Long path with middle levels collapsed']
    )
  ],
  button: [
    pattern(
      'Action emphasis',
      'Choose visual weight by action priority: distinguish the main action from supporting or destructive actions.',
      ['Variants', 'Primary and supporting actions'],
      ['With icon', 'Action with a leading or trailing icon']
    )
  ],
  calendar: [
    pattern('Calendar presentation', 'Use the standalone month grid when calendar navigation is the main task.', [
      'CALENDAR',
      'Standalone month grid'
    ])
  ],
  chart: [
    {
      title: 'Chart types',
      description:
        'Choose a chart by the relationship people need to read: rank or compare categories, follow change over time, show parts of a whole, or explore how two measures relate.',
      examples: [
        { id: 'chart-bar', variantName: 'BAR CHART', label: 'Category comparison · Bar', preview: ChartBarTypePreview },
        {
          id: 'chart-horizontal-bar',
          label: 'Category ranking · Horizontal bar',
          preview: ChartHorizontalBarTypePreview
        },
        {
          id: 'chart-stacked-bar',
          label: 'Composition by category · Stacked bar',
          preview: ChartStackedBarTypePreview
        },
        { id: 'chart-line', label: 'Trend over time · Line', preview: ChartLineTypePreview },
        { id: 'chart-area', label: 'Magnitude over time · Area', preview: ChartAreaTypePreview },
        {
          id: 'chart-stacked-area',
          label: 'Composition over time · Stacked area',
          preview: ChartStackedAreaTypePreview
        },
        { id: 'chart-pie', label: 'Part of a whole · Pie', preview: ChartPieTypePreview },
        { id: 'chart-scatter', label: 'Relationship between measures · Scatter', preview: ChartScatterTypePreview }
      ]
    }
  ],
  'checkbox-group': [
    pattern(
      'Related selection',
      'Group choices under one clear label; use a parent option only when it represents selecting or clearing its child options.',
      ['Labeling a checkbox group', 'Labeled group'],
      ['Parent checkbox', 'Group-level select all'],
      ['Nested parent checkbox', 'Nested selection groups']
    )
  ],
  checkbox: [
    pattern(
      'Selection state',
      'Use a standard checkbox for a direct choice and an indeterminate state when a parent represents a partially selected set.',
      ['Default', 'Unselected and selected'],
      ['Indeterminate', 'Partially selected group']
    )
  ],
  collapsible: [
    pattern(
      'Progressive disclosure',
      'Reveal related secondary content in place and label the trigger so people know what it contains.',
      ['Default', 'Expand content in place'],
      ['Hidden until found', 'Reveal matching content']
    )
  ],
  combobox: [
    pattern(
      'Selection pattern',
      'Use single selection for one value, multiple selection when choices can be combined, and grouped or creatable options only when the task needs them.',
      ['Default', 'Single selection'],
      ['Multiple select', 'Multiple removable selections'],
      ['Grouped', 'Options grouped by category'],
      ['Creatable', 'Add a value that is not in the list']
    )
  ],
  command: [
    pattern(
      'Command location',
      'Use a dialog for a temporary, searchable command entry point and an inline list when commands belong in the page flow.',
      ['COMMAND PALETTE', 'Search commands in a dialog'],
      ['INLINE', 'Commands embedded in the page']
    )
  ],
  'context-menu': [
    pattern(
      'Contextual options',
      'Keep actions tied to the selected item; use checkable, single-choice, or nested options only when that relationship is clear.',
      ['Default', 'Direct actions'],
      ['Checkbox and radio items', 'Independent and single-choice options'],
      ['Nested menu', 'A short related submenu']
    )
  ],
  'data-table': [
    pattern(
      'Dense record review',
      'Use a table when people need to compare multiple attributes across records and act on rows or selections.',
      ['CUSTOMER RECORDS', 'Sortable, selectable records']
    )
  ],
  'date-picker': [
    pattern(
      'Date selection surface',
      'Use an input-triggered calendar when a date belongs in a form; use an inline calendar when date navigation is the main task.',
      ['DEFAULT', 'Date picker in a form'],
      ['CALENDAR', 'Calendar displayed inline']
    )
  ],
  dialog: [
    pattern(
      'Focused task',
      'Use a modal dialog for a short task that people should finish or dismiss before returning to the page.',
      ['Default', 'Open a focused task'],
      ['Open from a menu', 'Start from a contextual action']
    ),
    pattern(
      'Long content',
      'Choose the scroll area according to what people need to keep in view while reading or editing.',
      ['Inside scroll dialog', 'Keep the dialog within the viewport'],
      ['Outside scroll dialog', 'Let the full dialog scroll in the viewport']
    ),
    pattern('Protect unsaved work', 'When closing would discard meaningful edits, ask before the work is lost.', [
      'Close confirmation',
      'Confirm before discarding edits'
    ])
  ],
  drawer: [
    pattern(
      'Panel placement and access',
      'Choose the opening edge and modal behavior according to whether people must focus on the panel or keep using the page behind it.',
      ['Position', 'Choose a panel edge'],
      ['Non-modal', 'Inspect while keeping the page available'],
      ['Mobile navigation', 'Navigation on a narrow screen']
    ),
    pattern(
      'Action sheet',
      'Use a bottom-aligned sheet for a small set of actions that should be easy to reach on a touch screen.',
      ['Action sheet with separate destructive action', 'Separate routine and destructive actions']
    ),
    pattern(
      'Partial expansion',
      'Use snap points when people need to move between a quick preview and a larger working area.',
      ['Snap points', 'Collapsed and expanded positions']
    )
  ],
  dropzone: [
    pattern(
      'File selection',
      'Choose single-file or multi-file intake based on the task, and make selected files visible before upload.',
      ['Default', 'Single file'],
      ['Multiple files', 'Multiple files with a list'],
      ['Selected files', 'Review selected files']
    )
  ],
  field: [
    pattern(
      'Field composition',
      'Keep each control, its label, and relevant supporting or error text together so people can understand and correct a value.',
      ['Default', 'Label and control'],
      ['With Input', 'Field composed with an input'],
      ['Validity', 'Field validity feedback']
    )
  ],
  fieldset: [
    pattern(
      'Group heading treatment',
      'Use a visible divider when the group boundary needs emphasis; omit it when nearby form structure already makes the grouping clear.',
      ['Default', 'Legend with divider'],
      ['Legend without divider', 'Legend without divider']
    )
  ],
  form: [
    pattern(
      'Form feedback',
      'Choose a validation presentation that identifies which values need attention and what people should do next.',
      ['Default', 'Basic form submission'],
      ['Schema validation', 'Field-level validation feedback']
    )
  ],
  input: [
    pattern(
      'Input size and value type',
      'Choose a control size that fits the surrounding form and select an input type that matches the expected value.',
      ['Sizes', 'Compact, standard, and large'],
      ['Types', 'Common value types'],
      ['Adornment', 'Value with a helpful icon or unit']
    )
  ],
  menu: [
    pattern(
      'Menu item roles',
      'Use direct actions for commands, checkboxes for independent options, radio items for a single choice, and submenus for a small related set.',
      ['Default', 'Direct actions'],
      ['Checkbox items', 'Independent options'],
      ['Radio items', 'Single-choice options'],
      ['Nested menu', 'Related secondary actions']
    )
  ],
  menubar: [
    pattern(
      'Menu-bar orientation',
      'Use a horizontal bar for familiar top-level application menus; use a vertical arrangement only when the surrounding workspace calls for it.',
      ['Default', 'Horizontal menus'],
      ['Vertical', 'Vertical menus'],
      ['Submenus and shortcuts', 'Nested commands and shortcuts']
    )
  ],
  'navigation-menu': [
    pattern(
      'Navigation depth',
      'Use direct links for a short hierarchy, nested menus for deeper paths, and a larger menu when several related destinations need description.',
      ['Default', 'Direct navigation links'],
      ['Nested submenus', 'Nested navigation choices'],
      ['Nested inline submenus', 'Inline nested choices'],
      ['Large menus', 'Expanded destination overview']
    )
  ],
  'number-field': [
    pattern(
      'Numeric entry density',
      'Use inline sizing for compact repeated values and align control heights when number fields sit beside other form controls.',
      ['Demo', 'Standard numeric value'],
      ['XS inline', 'Compact inline value'],
      ['Button-aligned sizes', 'Sizes aligned with adjacent controls']
    )
  ],
  'otp-field': [
    pattern(
      'Verification-code format',
      'Match the number of entry slots and grouping to the code format; mask values only when hiding them helps protect the code.',
      ['Demo', 'Numeric code'],
      ['Alphanumeric verification codes', 'Alphanumeric code'],
      ['Grouped layouts', 'Code split into readable groups'],
      ['Masked entry', 'Masked code entry']
    )
  ],
  'page-header': [
    {
      ...pattern(
        'Page context and controls',
        'Choose the header composition that establishes the page location and keeps related page-level controls together.',
        ['With Tabs and Toolbar', 'Page tabs and actions'],
        ['With Sidebar', 'Header beside navigation'],
        ['Sidebar · Home without Breadcrumb', 'Top-level page without breadcrumb']
      ),
      layout: 'single-column'
    }
  ],
  progress: [
    pattern(
      'Progress certainty',
      'Show a measured amount only when the total is known; use indeterminate progress when completion cannot be estimated.',
      ['Live value', 'Known progress amount'],
      ['Complete and indeterminate', 'Complete and unknown progress']
    )
  ],
  'scroll-area': [
    pattern(
      'Scroll affordance',
      'Show scrollbars when people need explicit control; use a fade only as a cue that more content continues beyond the visible area.',
      ['Demo', 'Single scroll direction'],
      ['Both scrollbars', 'Horizontal and vertical scrolling'],
      ['Gradient scroll fade', 'Fade cue for continuing content']
    )
  ],
  select: [
    pattern(
      'Option selection',
      'Use a single-value control for one choice, a multi-select only when choices can be combined, and groups when categories help scanning.',
      ['Default', 'Single selection'],
      ['Multiple selection', 'Combined selections'],
      ['Grouped', 'Options grouped by category'],
      ['Sizes', 'Compact, standard, and large']
    )
  ],
  separator: [
    pattern(
      'Separation direction',
      'Match the divider direction to the layout: horizontal between stacked groups and vertical between side-by-side groups.',
      ['Horizontal', 'Separate stacked groups'],
      ['Vertical', 'Separate adjacent groups']
    )
  ],
  sidebar: [
    pattern(
      'Navigation layout',
      'Use an expanded sidebar when labels and sections should remain visible; collapse or inset it when the surrounding content needs more space.',
      ['Icon collapse', 'Collapsed navigation'],
      ['Right side', 'Navigation on the right'],
      ['Inset layout', 'Sidebar within the page surface']
    )
  ],
  slider: [
    pattern(
      'Value selection',
      'Use one thumb for a single value, two thumbs for a bounded range, and steps when only defined values are valid.',
      ['Demo', 'Single value'],
      ['Range slider', 'Minimum and maximum values'],
      ['Steps', 'Defined increments'],
      ['Vertical', 'Vertical value scale']
    )
  ],
  switch: [
    pattern(
      'Setting control size',
      'Use a compact switch in dense settings and a standard switch when the surrounding row has more room.',
      ['Sizes', 'Compact and standard'],
      ['Labeling a switch', 'Switch with a clear label']
    )
  ],
  tabs: [
    pattern(
      'View and mode navigation',
      'Use tabs for related peer views; choose the visual treatment and orientation that preserve their shared context.',
      ['Variants', 'Line and filled treatments'],
      ['Vertical', 'Vertical tab list'],
      ['Links', 'Tabs that navigate to routes'],
      ['Closable tabs', 'Tabs people can close']
    )
  ],
  toast: [
    pattern(
      'Notification role',
      'Use a short status message for feedback; include an action only when it provides a useful recovery or undo path.',
      ['Default', 'Brief status message'],
      ['Undo action', 'Recoverable action'],
      ['Anchored toasts', 'Feedback near its point of origin']
    )
  ],
  'toggle-group': [
    pattern(
      'Single or combined choices',
      'Use single selection for one active view and multiple selection when options can be combined; choose a treatment that separates the group from nearby actions.',
      ['Single', 'One active choice'],
      ['Multiple', 'Combined choices'],
      ['Outline', 'Outlined group'],
      ['Segmented inset', 'Contained segmented group']
    )
  ],
  toggle: [
    pattern(
      'Toggle presentation',
      'Use the quieter style for repeated low-emphasis controls and an outline when the toggle needs a clear boundary.',
      ['Default', 'Quiet toggle'],
      ['Outline', 'Outlined toggle'],
      ['With text', 'Toggle with a text label']
    )
  ],
  toolbar: [
    pattern(
      'Tool arrangement',
      'Group related, frequent actions together and choose a horizontal or vertical arrangement that fits the work area.',
      ['Default', 'Horizontal tool group'],
      ['Vertical', 'Vertical tool group'],
      ['Using with Menu', 'Grouped secondary actions']
    )
  ]
}

export const designerTypeOmissions: Record<string, string> = {
  'inline-edit': 'Trigger-rendering examples change composition mechanics, not a distinct design-facing type.',
  meter: 'The existing examples change the measured value while retaining the same visual role.',
  pagination: 'The demo changes page state; it does not show distinct pagination presentations.',
  popover: 'The examples vary trigger, position, and state behavior; the page has one contextual popover role.',
  'preview-card': 'Trigger and position differences do not create distinct types.',
  radio: 'The examples vary labeling, state, and implementation; the design role remains a single-choice group.',
  tooltip: 'The examples vary trigger, placement, and content; they retain one supplemental-hint role.'
}
