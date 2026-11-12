import { buttonVariantConfig } from '@/lib/button-variants'
import { toggleVariantConfig } from '@/lib/toggle-variants'

/**
 * Sheet spec data — every component's variant axes, states and physical sizes.
 * The shared button and toggle axes are derived from the real cva definitions,
 * so the reference sheet cannot drift from the components it documents.
 */

export type ComponentGroup = 'Actions' | 'Forms' | 'Overlays' | 'Menus & Navigation' | 'Data Display' | 'Layout'

export type Axis = {
  /** Prop name as written in code, e.g. `variant`, `size`, `side`. */
  name: string
  values: string[]
  /** The cva default; shaded in the list. */
  default?: string
}

export type ComponentSpec = {
  id: string
  title: string
  group: ComponentGroup
  axes?: Axis[]
  /** Non-exclusive interaction or validation cases the styles cover. */
  states?: string[]
  /** Physical sizing, in px, when the component has real size tokens. */
  sizes?: string
  note?: string
}

/** Variant axes derived from the component cva definitions, never hand-copied. */
const BUTTON_VARIANTS = Object.keys(buttonVariantConfig.variants.variant)
const BUTTON_SIZES = Object.keys(buttonVariantConfig.variants.size)
const TOGGLE_VARIANTS = Object.keys(toggleVariantConfig.variants.variant)
const TOGGLE_SIZES = Object.keys(toggleVariantConfig.variants.size)

/** cva axes copied from the component sources (button.tsx, toggle.tsx, ...). */
export const SPECS: ComponentSpec[] = [
  {
    id: 'button',
    title: 'Button',
    group: 'Actions',
    axes: [
      {
        name: 'variant',
        values: BUTTON_VARIANTS,
        default: 'default'
      },
      {
        name: 'size',
        values: BUTTON_SIZES,
        default: 'default'
      }
    ],
    states: ['hover', 'focus-visible', 'disabled', 'focusableWhenDisabled', 'loading (composed)'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px. Icon sizes match: 36 · 24 · 32 · 40 px.',
    note: 'Dialog, Alert Dialog, Drawer and Toast triggers and closes reuse these six variants and eight sizes.'
  },
  {
    id: 'toggle',
    title: 'Toggle',
    group: 'Actions',
    axes: [
      { name: 'variant', values: TOGGLE_VARIANTS, default: 'default' },
      {
        name: 'size',
        values: TOGGLE_SIZES,
        default: 'default'
      }
    ],
    states: ['pressed', 'unpressed', 'disabled', 'focus-visible'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px. Icon sizes match: 36 · 24 · 32 · 40 px.',
    note: 'segmented and brand only read differently while pressed; pair them with Toggle Group.'
  },
  {
    id: 'toggle-group',
    title: 'Toggle Group',
    group: 'Actions',
    axes: [
      { name: 'variant', values: TOGGLE_VARIANTS, default: 'default' },
      {
        name: 'size',
        values: TOGGLE_SIZES,
        default: 'default'
      },
      { name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' }
    ],
    states: ['single selection (default)', 'multiple selection', 'pressed', 'disabled'],
    sizes: 'The group cascades variant and size to every Toggle child.',
    note: 'segmented adds the inset background and gap around the group.'
  },
  {
    id: 'toolbar',
    title: 'Toolbar',
    group: 'Actions',
    axes: [
      { name: 'size (button)', values: ['default', 'sm', 'lg', 'icon'], default: 'default' },
      { name: 'isActivated', values: ['false', 'true'], default: 'false' },
      { name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' }
    ],
    states: ['default', 'activated', 'disabled', 'focus-visible'],
    sizes: 'Button heights: default 32 · sm 28 · lg 36 · icon 32 px.',
    note: 'Also ships Link, Group, Separator and Input parts for inspector-style toolbars.'
  },
  {
    id: 'autocomplete',
    title: 'Autocomplete',
    group: 'Forms',
    axes: [
      { name: 'input context', values: ['standalone', 'group'], default: 'standalone' },
      { name: 'input size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' },
      { name: 'input group size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }
    ],
    states: ['placeholder', 'filled', 'disabled', 'invalid', 'empty', 'highlighted'],
    sizes: 'Input group heights: default 36 · xs 24 · sm 32 · lg 40 px.',
    note: 'Use context=group when the input sits inside AutocompleteInputGroup; standalone draws its own border.'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    group: 'Forms',
    states: ['single selection', 'range', 'disabled days'],
    note: 'Day picker supporting single or range selection, with month and year selectors.'
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    group: 'Forms',
    states: ['unchecked', 'checked', 'indeterminate', 'disabled', 'invalid'],
    sizes: 'Box is 16 px (size-4); change it through className.',
    note: 'Checked and indeterminate share the primary fill; the indicator swaps check and minus.'
  },
  {
    id: 'checkbox-group',
    title: 'Checkbox Group',
    group: 'Forms',
    states: ['multiple values', 'disabled'],
    note: 'No built-in size or orientation. Layout comes from className on the group.'
  },
  {
    id: 'combobox',
    title: 'Combobox',
    group: 'Forms',
    axes: [
      { name: 'size (input group)', values: ['default', 'xs', 'sm', 'lg'], default: 'default' },
      { name: 'shape', values: ['input', 'chips'], default: 'input' },
      { name: 'size (standalone trigger)', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }
    ],
    states: ['placeholder', 'filled', 'focused', 'disabled', 'invalid', 'selected', 'empty'],
    sizes: 'Input group heights: default 36 · xs 24 · sm 32 · lg 40 px.',
    note: 'shape=chips wraps selected values as chips inside the field.'
  },
  {
    id: 'date-picker',
    title: 'Date Picker',
    group: 'Forms',
    axes: [{ name: 'mode', values: ['single', 'range', 'week'], default: 'single' }],
    states: ['open', 'preset selection', 'disabled'],
    note: 'Single date, date range, or ISO week selection via popover calendar.'
  },
  {
    id: 'field',
    title: 'Field',
    group: 'Forms',
    states: ['filled', 'invalid', 'disabled'],
    note: 'Composes Label, Control, Description, Error, Validity and Group/Row helpers. Disabled and invalid cascade to the parts.'
  },
  {
    id: 'fieldset',
    title: 'Fieldset',
    group: 'Forms',
    states: ['enabled', 'disabled'],
    note: 'Legend is 16 px semibold; rows sit 16 px apart. Add fields inside it.'
  },
  {
    id: 'form',
    title: 'Form',
    group: 'Forms',
    states: ['valid', 'invalid'],
    note: 'Zod-backed form wrapper. Error copy comes from the Field parts you place inside it.'
  },
  {
    id: 'dropzone',
    title: 'Dropzone',
    group: 'Forms',
    states: ['idle', 'dragging', 'disabled'],
    note: 'Accepts accept, multiple, disabled, hint and buttonLabel props; onFilesSelected receives the selected File array.'
  },
  {
    id: 'inline-edit',
    title: 'Inline Edit',
    group: 'Forms',
    states: ['viewing', 'editing', 'submitting', 'disabled'],
    note: 'Switches between static text and an editable input in place.'
  },
  {
    id: 'input',
    title: 'Input',
    group: 'Forms',
    axes: [
      { name: 'size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' },
      { name: 'adornment', values: ['none', 'start', 'end', 'both'], default: 'none' }
    ],
    states: ['default', 'filled', 'disabled', 'invalid'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px, including start and end adornments.',
    note: 'Native type passes through: text, email, password, number, date and the rest.'
  },
  {
    id: 'number-field',
    title: 'Number Field',
    group: 'Forms',
    axes: [{ name: 'size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }],
    states: ['disabled', 'readonly', 'invalid', 'scrubbing'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px.',
    note: 'Increment and decrement buttons attach inside the border; scrubbing is built-in.'
  },
  {
    id: 'otp-field',
    title: 'OTP Field',
    group: 'Forms',
    axes: [{ name: 'separator orientation', values: ['horizontal', 'vertical'], default: 'horizontal' }],
    states: ['empty', 'filled', 'disabled', 'readonly'],
    sizes: 'Each slot is 40 × 40 px.',
    note: 'Slot count comes from the OTPField root; the separator is optional.'
  },
  {
    id: 'radio',
    title: 'Radio Group',
    group: 'Forms',
    states: ['unchecked', 'checked', 'disabled', 'readonly', 'invalid'],
    sizes: 'Dot is 16 px (size-4).',
    note: 'RadioGroup controls layout; RadioRoot is the control. Both are required for a working group.'
  },
  {
    id: 'search',
    title: 'Search',
    group: 'Forms',
    axes: [
      { name: 'appearance', values: ['default', 'fluid'], default: 'default' },
      { name: 'size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }
    ],
    states: ['placeholder', 'filled with clear button', 'disabled'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px.',
    note: 'Input with search icon and optional clear button.'
  },
  {
    id: 'select',
    title: 'Select',
    group: 'Forms',
    axes: [{ name: 'size (trigger)', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }],
    states: ['placeholder', 'filled', 'disabled', 'invalid', 'pressed', 'highlighted'],
    sizes: 'Trigger min-heights: default 36 · xs 24 · sm 32 · lg 40 px.',
    note: 'Trigger, value, list, item, item indicator, group label and separator parts ship together.'
  },
  {
    id: 'slider',
    title: 'Slider',
    group: 'Forms',
    axes: [{ name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' }],
    states: ['idle', 'dragging', 'disabled'],
    sizes: 'Track is 6 px thick; thumb is 16 px.',
    note: 'One thumb by default. Pass an array value for a range.'
  },
  {
    id: 'switch',
    title: 'Switch',
    group: 'Forms',
    axes: [{ name: 'size', values: ['default', 'sm'], default: 'default' }],
    states: ['unchecked', 'checked', 'disabled', 'focus-visible'],
    sizes: 'default 36 × 20 px · sm 28 × 16 px.',
    note: 'The thumb inherits size from the root, so do not set it twice.'
  },
  {
    id: 'alert',
    title: 'Alert',
    group: 'Overlays',
    axes: [{ name: 'variant', values: ['default', 'info', 'success', 'warning', 'destructive'], default: 'default' }],
    states: ['alert role', 'informative role'],
    note: 'Semantic variants use the matching info, success, warning, and destructive tokens.'
  },
  {
    id: 'alert-dialog',
    title: 'Alert Dialog',
    group: 'Overlays',
    axes: [
      { name: 'trigger/close variant', values: BUTTON_VARIANTS, default: 'outline' },
      { name: 'trigger/close size', values: BUTTON_SIZES, default: 'default' }
    ],
    states: ['open', 'closing', 'destructive confirm (composed)'],
    note: 'Trigger and Close share the Button variant and size axes; the trigger opens the alert.'
  },
  {
    id: 'dialog',
    title: 'Dialog',
    group: 'Overlays',
    axes: [
      { name: 'trigger/close variant', values: BUTTON_VARIANTS, default: 'outline' },
      { name: 'trigger/close size', values: BUTTON_SIZES, default: 'default' }
    ],
    states: ['open', 'closing', 'nested dialog open'],
    note: 'Trigger and Close share the Button variant and size axes. Composes Header, Title, Description, Footer, Backdrop and Portal.'
  },
  {
    id: 'drawer',
    title: 'Drawer',
    group: 'Overlays',
    axes: [
      { name: 'side', values: ['bottom', 'top', 'left', 'right'], default: 'bottom' },
      { name: 'trigger/close variant', values: BUTTON_VARIANTS, default: 'outline' },
      { name: 'trigger/close size', values: BUTTON_SIZES, default: 'default' }
    ],
    states: ['open', 'swiping', 'disabled trigger'],
    sizes: 'Left and right panels are 20rem (320 px) wide; top and bottom cap at 80vh.',
    note: 'Trigger and Close share the Button variant and size axes.'
  },
  {
    id: 'popover',
    title: 'Popover',
    group: 'Overlays',
    axes: [
      { name: 'trigger variant', values: BUTTON_VARIANTS },
      { name: 'trigger size', values: BUTTON_SIZES }
    ],
    states: ['open', 'instant', 'disabled trigger'],
    note: 'Trigger variant and size style the trigger when no custom render element is supplied.'
  },
  {
    id: 'preview-card',
    title: 'Preview Card',
    group: 'Overlays',
    axes: [
      { name: 'trigger variant', values: BUTTON_VARIANTS, default: 'link' },
      { name: 'trigger size', values: BUTTON_SIZES, default: 'default' }
    ],
    states: ['open (hover or focus)', 'instant', 'closing'],
    note: 'Hover preview with a delay. Trigger exposes Button variants and sizes.'
  },
  {
    id: 'toast',
    title: 'Toast',
    group: 'Overlays',
    axes: [
      { name: 'layout', values: ['stacked', 'flat'], default: 'stacked' },
      { name: 'type', values: ['success', 'error', 'warning', 'loading'] },
      { name: 'close size', values: ['default', 'sm', 'icon'], default: 'default' },
      { name: 'close variant', values: ['outline', 'ghost'], default: 'outline' },
      { name: 'action size', values: ['default', 'sm', 'icon'], default: 'default' },
      { name: 'action variant', values: ['outline', 'ghost'], default: 'outline' }
    ],
    states: ['stacked behind', 'expanded', 'limited', 'swiping', 'closing'],
    sizes: 'Close heights: default 36 · sm 32 · icon 32 px.',
    note: 'type changes the border colour only. Action and Close each expose size and outline/ghost variants.'
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    group: 'Overlays',
    axes: [
      { name: 'trigger variant', values: BUTTON_VARIANTS },
      { name: 'trigger size', values: BUTTON_SIZES }
    ],
    states: ['open', 'instant', 'popup-open trigger'],
    note: 'Trigger remains unstyled when these props are omitted; explicit variant and size props apply Button styling.'
  },
  {
    id: 'context-menu',
    title: 'Context Menu',
    group: 'Menus & Navigation',
    axes: [
      { name: 'item variant', values: ['default', 'destructive'], default: 'default' },
      { name: 'item inset', values: ['false', 'true'], default: 'false' }
    ],
    states: ['highlighted', 'disabled', 'popup-open', 'instant'],
    note: 'Item styling is shared with Menu. inset adds a 32 px left indent for icon alignment.'
  },
  {
    id: 'command',
    title: 'Command',
    group: 'Menus & Navigation',
    states: ['dialog', 'inline list', 'empty state', 'grouping'],
    note: 'Fast filterable command palette and menu with keyboard shortcuts.'
  },
  {
    id: 'menu',
    title: 'Menu',
    group: 'Menus & Navigation',
    axes: [
      { name: 'item variant', values: ['default', 'destructive'], default: 'default' },
      { name: 'item inset', values: ['false', 'true'], default: 'false' }
    ],
    states: ['highlighted', 'disabled', 'popup-open', 'instant'],
    note: 'Checkbox and radio items, submenus and separators reuse the same item padding.'
  },
  {
    id: 'menubar',
    title: 'Menubar',
    group: 'Menus & Navigation',
    states: ['enabled', 'disabled'],
    note: 'A bare bar only. Item variants live in Menu; Menubar itself declares no item axes.'
  },
  {
    id: 'navigation-menu',
    title: 'Navigation Menu',
    group: 'Menus & Navigation',
    states: ['active', 'disabled', 'popup-open', 'instant'],
    note: 'Trigger, icon, content, viewport, positioner and arrow parts are included. No visual variants.'
  },
  {
    id: 'pagination',
    title: 'Pagination',
    group: 'Menus & Navigation',
    axes: [
      { name: 'link size', values: ['default', 'sm', 'lg', 'icon'], default: 'icon' },
      { name: 'link variant', values: ['ghost', 'outline'], default: 'ghost' }
    ],
    states: ['active page', 'disabled previous/next', 'ellipsis'],
    note: 'Accessible multi-page navigation links with previous and next buttons.'
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    group: 'Menus & Navigation',
    states: ['link', 'current page', 'separator', 'ellipsis'],
    note: 'Breadcrumb has no built-in style variants; compose the exported list, item, link, page, separator and ellipsis parts.'
  },
  {
    id: 'avatar',
    title: 'Avatar',
    group: 'Data Display',
    axes: [{ name: 'size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }],
    states: ['image', 'fallback'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px square.',
    note: 'Rounded-full mask. Fallback text adjusts with size.'
  },
  {
    id: 'attachment',
    title: 'Attachment',
    group: 'Data Display',
    axes: [
      { name: 'state', values: ['idle', 'uploading', 'processing', 'error', 'done'], default: 'done' },
      { name: 'size', values: ['default', 'sm', 'xs'], default: 'default' },
      { name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'media variant', values: ['icon', 'image'], default: 'icon' }
    ],
    states: ['idle', 'uploading', 'processing', 'error', 'done'],
    note: 'Root state, size and orientation configure the row; media variant selects the icon or image slot.'
  },
  {
    id: 'badge',
    title: 'Badge',
    group: 'Data Display',
    axes: [
      {
        name: 'status',
        values: ['default', 'success', 'warning', 'error', 'processing', 'secondary', 'outline'],
        default: 'default'
      },
      { name: 'size', values: ['default', 'sm'], default: 'default' }
    ],
    states: ['count', 'dot', 'label pill', 'anchored to a child', 'standalone'],
    sizes: 'Heights: default 20 · sm 16 px.',
    note: 'maxCount is 99 by default; showZero is off. dot ignores count and size.'
  },
  {
    id: 'chart',
    title: 'Chart',
    group: 'Data Display',
    states: ['categorical series', 'custom tooltip', 'legend'],
    note: 'Composable recharts wrapper with design tokens, tooltip and legend styling.'
  },
  {
    id: 'code-block',
    title: 'Code Block',
    group: 'Data Display',
    axes: [
      { name: 'variant', values: ['default', 'destructive'], default: 'default' },
      { name: 'size', values: ['default', 'sm', 'xs'], default: 'default' }
    ],
    states: ['header', 'footer', 'copy action', 'line numbers'],
    note: 'Syntax-highlighted code container with header title, copy button and line numbers.'
  },
  {
    id: 'code-block-tree',
    title: 'Code Block Tree',
    group: 'Data Display',
    states: ['expanded', 'collapsed', 'line numbers', 'copy action', 'invalid JSON'],
    note: 'JSON tree with expandable nodes, line numbers and copy action.'
  },
  {
    id: 'data-table',
    title: 'Data Table',
    group: 'Data Display',
    axes: [
      { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
      { name: 'selection', values: ['none', 'single', 'multiple'], default: 'none' }
    ],
    states: ['sorting', 'filtering', 'column visibility', 'expanded row', 'pagination'],
    note: 'TanStack Table composition with built-in search, column toggles, row selection and pagination.'
  },
  {
    id: 'meter',
    title: 'Meter',
    group: 'Data Display',
    sizes: 'Track is 12 px high.',
    note: 'Composes Label, Value, Track and Indicator. Use Badge or text for thresholds, not colour alone.'
  },
  {
    id: 'progress',
    title: 'Progress',
    group: 'Data Display',
    states: ['determinate', 'indeterminate'],
    sizes: 'Track is 4 px high.',
    note: 'Composes Label, Value, Track and Indicator; indeterminate fills the track.'
  },
  {
    id: 'progress-indicator',
    title: 'Progress Indicator',
    group: 'Data Display',
    axes: [
      { name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'alignment', values: ['start', 'center'], default: 'start' }
    ],
    states: ['complete', 'current', 'upcoming', 'error', 'disabled'],
    note: 'Step-by-step progress tracking with numbered or checked step badges and connector lines.'
  },
  {
    id: 'page-header',
    title: 'Page Header',
    group: 'Layout',
    states: ['with breadcrumbs', 'with toolbar', 'with tabs'],
    note: 'Page heading composition with breadcrumbs, title and toolbar action slots.'
  },
  {
    id: 'resizable',
    title: 'Resizable',
    group: 'Layout',
    axes: [
      { name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'withHandle', values: ['false', 'true'], default: 'false' }
    ],
    states: ['dragging', 'min size limit', 'max size limit'],
    note: 'Resizable panel group with drag handles and collapse bounds.'
  },
  {
    id: 'separator',
    title: 'Separator',
    group: 'Layout',
    axes: [{ name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' }],
    sizes: 'Rule is 1 px.',
    note: 'Horizontal fills the parent width; vertical fills the parent height.'
  },
  {
    id: 'accordion',
    title: 'Accordion',
    group: 'Layout',
    states: ['single expansion', 'multiple expansion', 'compact', 'disabled'],
    note: 'Single vs multiple open items comes from the Base UI openMultiple prop. Header and Trigger are separate parts.'
  },
  {
    id: 'collapsible',
    title: 'Collapsible',
    group: 'Layout',
    states: ['closed', 'open', 'disabled'],
    note: 'One panel with a trigger; no built-in chrome. Use Accordion for a list of panels.'
  },
  {
    id: 'scroll-area',
    title: 'Scroll Area',
    group: 'Layout',
    axes: [{ name: 'orientation', values: ['vertical', 'horizontal'], default: 'vertical' }],
    states: ['hovering', 'scrolling'],
    sizes: 'Scrollbar is 8 px thick.',
    note: 'Thumb border matches the surrounding background, so place it on the same surface.'
  },
  {
    id: 'tabs',
    title: 'Tabs',
    group: 'Layout',
    axes: [
      { name: 'default value', values: ['one', 'two', 'three', 'none'], default: 'one' },
      { name: 'list variant', values: ['line', 'filled', 'pill'], default: 'line' },
      { name: 'list width', values: ['hug', 'full'], default: 'hug' },
      { name: 'tab size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' },
      { name: 'indicator side', values: ['left', 'right'], default: 'left' },
      { name: 'orientation', values: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'disabled tab', values: ['none', 'one', 'two', 'three'], default: 'none' },
      { name: 'activation', values: ['manual', 'automatic'], default: 'manual' },
      { name: 'focus loop', values: ['loop', 'stop'], default: 'loop' }
    ],
    states: ['active', 'inactive', 'disabled', 'focus-visible'],
    sizes: 'Tab size is padding-based: xs px-2 py-0.5 · sm px-2.5 py-1 · default px-3 py-1.5 · lg px-4 py-2.',
    note: 'Line is the default. Set list width to full or hug. Vertical line tabs use the left edge by default; set indicatorSide to right to move it. Activation and focus loop control keyboard behavior.'
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    group: 'Layout',
    axes: [
      { name: 'side', values: ['left', 'right'], default: 'left' },
      { name: 'variant', values: ['sidebar', 'floating', 'inset'], default: 'sidebar' },
      { name: 'collapsible', values: ['offcanvas', 'icon', 'none'], default: 'offcanvas' }
    ],
    states: ['expanded', 'collapsed', 'mobile drawer', 'active menu item', 'focus-visible'],
    sizes: 'Widths: sidebar 16rem · mobile 18rem · icon rail 3rem.',
    note: 'SidebarProvider owns controlled/uncontrolled desktop state and mobile drawer state. ⌘/Ctrl+B toggles the sidebar.'
  }
]
