import { useMemo, useState, type ReactNode } from 'react'
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import themeCss from '../index.css?raw'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { renderConfiguredSpecimen, renderStateSpecimen } from './sheet-specimens'

/**
 * Sheet — a single reference page for the library: design tokens plus every
 * variant axis and size each component exposes. Values are read from the real
 * sources (index.css for tokens, the cva definitions for component props), so
 * the sheet stays honest when those sources change.
 */

/* ------------------------------------------------------------------ Tokens */

type Declarations = Record<string, string>

/** Reads `--name: value` declarations out of one selector block in index.css. */
function readBlock(source: string, selector: string): Declarations {
  const at = source.indexOf(`${selector} {`)
  if (at === -1) return {}
  const open = source.indexOf('{', at)
  const close = source.indexOf('}', open)
  const body = source.slice(open + 1, close).replace(/\/\*[\s\S]*?\*\//g, '')
  const out: Declarations = {}
  for (const chunk of body.split(';')) {
    const colon = chunk.indexOf(':')
    if (colon === -1) continue
    const name = chunk.slice(0, colon).trim()
    if (!name.startsWith('--')) continue
    out[name] = chunk
      .slice(colon + 1)
      .replace(/\s+/g, ' ')
      .trim()
  }
  return out
}

const LIGHT = readBlock(themeCss, ':root')
const DARK = readBlock(themeCss, '.dark')
const THEME = readBlock(themeCss, '@theme inline')
const DARK_SURFACE = DARK['--background'] ?? 'oklch(0.145 0 0)'

const TOKEN_GROUPS: { id: string; title: string; description: string; tokens: string[] }[] = [
  {
    id: 'surfaces',
    title: 'Surfaces & structure',
    description: 'Page, card and overlay fills, plus the lines and focus ring that hold them together.',
    tokens: [
      '--background',
      '--card',
      '--popover',
      '--muted',
      '--secondary',
      '--accent',
      '--border',
      '--input',
      '--ring'
    ]
  },
  {
    id: 'text',
    title: 'Text',
    description: 'Foreground pairs. Use the pair that matches the surface behind the text.',
    tokens: [
      '--foreground',
      '--card-foreground',
      '--popover-foreground',
      '--muted-foreground',
      '--secondary-foreground',
      '--accent-foreground',
      '--primary-foreground'
    ]
  },
  {
    id: 'status',
    title: 'Brand & status',
    description:
      'Primary is the brand accent. Destructive, success, warning and info carry status meaning; favourite is for starred state only.',
    tokens: ['--primary', '--destructive', '--success', '--warning', '--info', '--favorite']
  },
  {
    id: 'chart',
    title: 'Data viz',
    description: 'Sequential ramp for charts. chart-1 is the lightest step, chart-5 the darkest.',
    tokens: ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5']
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    description: 'Separate surface set for navigation rails so app chrome does not borrow page colours.',
    tokens: [
      '--sidebar',
      '--sidebar-foreground',
      '--sidebar-primary',
      '--sidebar-primary-foreground',
      '--sidebar-accent',
      '--sidebar-accent-foreground',
      '--sidebar-border',
      '--sidebar-ring'
    ]
  }
]

const COLOR_TOKEN_COUNT = TOKEN_GROUPS.reduce((n, g) => n + g.tokens.length, 0)

const RADIUS_PREVIEW_PX = [2] as const

const TYPE_SCALE: { className: string; size: string; line: string }[] = [
  { className: 'text-xs', size: '12', line: '16' },
  { className: 'text-sm', size: '14', line: '20' },
  { className: 'text-base', size: '16', line: '24' },
  { className: 'text-lg', size: '18', line: '28' },
  { className: 'text-xl', size: '20', line: '28' },
  { className: 'text-2xl', size: '24', line: '32' },
  { className: 'text-3xl', size: '30', line: '36' }
]

function round(value: number) {
  return Number(value.toFixed(3)).toString()
}

function CopyValue({
  value,
  className,
  tooltipPlacement = 'above'
}: {
  value: string
  className?: string
  tooltipPlacement?: 'above' | 'below'
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <span className='relative inline-flex'>
      <button
        type='button'
        aria-label={`Copy ${value}`}
        onClick={copy}
        className={cn(
          'inline cursor-copy rounded-(--radius) text-left font-mono text-[11px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring',
          className
        )}
      >
        {value}
      </button>
      {copied && (
        <span
          role='status'
          className={cn(
            'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-(--radius) bg-foreground px-3 py-1.5 font-sans text-xs text-background shadow-md',
            tooltipPlacement === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'
          )}
        >
          Copied
        </span>
      )}
    </span>
  )
}

function ColorSwatch({ value, surface }: { value: string; surface: 'light' | 'dark' }) {
  return (
    <span
      aria-hidden='true'
      className='inline-block size-5 shrink-0 border border-border'
      style={{ backgroundColor: surface === 'light' ? LIGHT['--background'] : DARK_SURFACE }}
    >
      <span className='block size-full' style={{ backgroundColor: value }} />
    </span>
  )
}

function TokenTable({ tokens }: { tokens: string[] }) {
  return (
    <div className='overflow-x-auto border border-border'>
      <table className='w-full table-fixed text-left'>
        <thead>
          <tr className='bg-muted/40 text-xs sub-heading'>
            <th className='w-[30%] px-2 py-2 font-medium sm:px-3'>Token</th>
            <th className='px-2 py-2 font-medium sm:px-3'>Light</th>
            <th className='px-2 py-2 font-medium sm:px-3'>Dark</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => {
            const light = LIGHT[token] ?? '—'
            const dark = DARK[token] ?? light
            return (
              <tr key={token} className='border-t border-border align-middle'>
                <td className='px-2 py-2 sm:px-3'>
                  <code className='text-[11px]'>{token}</code>
                </td>
                <td className='px-2 py-2 sm:px-3'>
                  <span className='flex items-center gap-2'>
                    <ColorSwatch value={light} surface='light' />
                    <CopyValue value={light} className='break-words' />
                  </span>
                </td>
                <td className='px-2 py-2 sm:px-3'>
                  <span className='flex items-center gap-2'>
                    <ColorSwatch value={dark} surface='dark' />
                    <CopyValue value={dark} className='break-words' />
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function RadiusScale() {
  return (
    <div className='flex flex-wrap items-end gap-6'>
      {RADIUS_PREVIEW_PX.map((radiusPx) => {
        const size = 48 + radiusPx * 4
        return (
          <div key={radiusPx} className='flex flex-col gap-1.5'>
            <div
              className='border border-foreground/30 bg-muted'
              style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${radiusPx}px` }}
            />
            <CopyValue value={`${round(radiusPx)}px`} className='w-fit' tooltipPlacement='below' />
          </div>
        )
      })}
    </div>
  )
}

function TypographyTable() {
  return (
    <div className='overflow-x-auto border border-border'>
      <table className='w-full text-left'>
        <thead>
          <tr className='bg-muted/40 text-xs sub-heading'>
            <th className='px-2 py-2 font-medium sm:px-3'>Utility</th>
            <th className='px-2 py-2 font-medium sm:px-3'>Size / line-height</th>
            <th className='px-2 py-2 font-medium sm:px-3'>Sample</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_SCALE.map((row) => (
            <tr key={row.className} className='border-t border-border'>
              <td className='whitespace-nowrap px-2 py-2 sm:px-3'>
                <code className='text-[11px]'>{row.className}</code>
              </td>
              <td className='whitespace-nowrap px-2 py-2 text-[11px] text-muted-foreground sm:px-3'>
                {row.size}px / {row.line}px
              </td>
              <td className='px-2 py-2 sm:px-3'>
                <span className={row.className}>The quick brown fox</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function firstFamily(stack: string | undefined, fallback: string) {
  const family = stack
    ?.split(',')[0]
    ?.trim()
    .replace(/^['"]|['"]$/g, '')
  return family || fallback
}

function SheetSection({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <div className='border-b border-foreground pb-3'>
      <div className='flex items-baseline gap-3'>
        <span className='text-base tabular-nums sub-heading'>{index}</span>
        <h5 className='h5 heading'>{title}</h5>
      </div>
      <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

/* -------------------------------------------------------------- Components */

type ComponentGroup = 'Actions' | 'Forms' | 'Overlays' | 'Menus & Navigation' | 'Data Display' | 'Layout'

type Axis = {
  /** Prop name as written in code, e.g. `variant`, `size`, `side`. */
  name: string
  values: string[]
  /** The cva default; shaded in the list. */
  default?: string
}

type ComponentSpec = {
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

const BUTTON_VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
const BUTTON_SIZES = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg']

/** cva axes copied from the component sources (button.tsx, toggle.tsx, ...). */
const SPECS: ComponentSpec[] = [
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
      { name: 'variant', values: ['default', 'outline', 'segmented', 'brand'], default: 'default' },
      { name: 'size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' }
    ],
    states: ['pressed', 'unpressed', 'disabled', 'focus-visible'],
    sizes: 'Heights: default 36 · xs 24 · sm 32 · lg 40 px.',
    note: 'segmented and brand only read differently while pressed; pair them with Toggle Group.'
  },
  {
    id: 'toggle-group',
    title: 'Toggle Group',
    group: 'Actions',
    axes: [
      { name: 'variant', values: ['default', 'outline', 'segmented', 'brand'], default: 'default' },
      { name: 'size', values: ['default', 'xs', 'sm', 'lg'], default: 'default' },
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
      { name: 'input size', values: ['default', 'sm'], default: 'default' },
      { name: 'input group size', values: ['default', 'sm'], default: 'default' }
    ],
    states: ['placeholder', 'filled', 'disabled', 'invalid', 'empty', 'highlighted'],
    sizes: 'Input group heights: default 36 · sm 32 px.',
    note: 'Use context=group when the input sits inside AutocompleteInputGroup; standalone draws its own border.'
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
      { name: 'size (input group)', values: ['default', 'sm'], default: 'default' },
      { name: 'shape', values: ['input', 'chips'], default: 'input' },
      { name: 'size (standalone trigger)', values: ['default', 'sm'], default: 'default' }
    ],
    states: ['placeholder', 'filled', 'focused', 'disabled', 'invalid', 'selected', 'empty'],
    sizes: 'Input group heights: default 36 · sm 32 px.',
    note: 'shape=chips wraps selected values as chips inside the field.'
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
    id: 'input',
    title: 'Input',
    group: 'Forms',
    axes: [{ name: 'adornment', values: ['none', 'start', 'end', 'both'], default: 'none' }],
    states: ['default', 'filled', 'disabled', 'invalid'],
    sizes: 'Height 36 px, including start and end adornments.',
    note: 'Native type passes through: text, email, password, number, date and the rest.'
  },
  {
    id: 'number-field',
    title: 'Number Field',
    group: 'Forms',
    axes: [{ name: 'size', values: ['default', 'compact', 'xs'], default: 'default' }],
    states: ['disabled', 'readonly', 'invalid', 'scrubbing'],
    sizes: 'Input heights: default 36 · compact 26 · xs 24 px. Group is 36 px with 36 px steppers.',
    note: 'compact and xs are the dense inspector variants; xs matches the 24 px Button range.'
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
    id: 'select',
    title: 'Select',
    group: 'Forms',
    axes: [{ name: 'size (trigger)', values: ['default', 'sm'], default: 'default' }],
    states: ['placeholder', 'filled', 'disabled', 'invalid', 'pressed', 'highlighted'],
    sizes: 'Trigger min-heights: default 36 · sm 32 px.',
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
    id: 'avatar',
    title: 'Avatar',
    group: 'Data Display',
    states: ['image', 'fallback'],
    sizes: 'Default 32 px square (size-8); resize through className.',
    note: 'Rounded-full mask. Fallback text is 14 px medium.'
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
    id: 'breadcrumb',
    title: 'Breadcrumb',
    group: 'Menus & Navigation',
    states: ['link', 'current page', 'separator', 'ellipsis'],
    note: 'Breadcrumb has no built-in style variants; compose the exported list, item, link, page, separator and ellipsis parts.'
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
    axes: [{ name: 'trigger variant', values: ['default', 'compact'], default: 'default' }],
    states: ['closed', 'open', 'disabled'],
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
  }
]

const AXIS_COUNT = SPECS.reduce((n, spec) => n + (spec.axes?.length ?? 0), 0)
const OPTION_COUNT = SPECS.reduce((n, spec) => n + (spec.axes?.reduce((m, axis) => m + axis.values.length, 0) ?? 0), 0)

function combinationCount(spec: ComponentSpec) {
  if (!spec.axes?.length) return 1
  return spec.axes.reduce((n, axis) => n * axis.values.length, 1)
}

function Chip({ children, shaded }: { children: ReactNode; shaded?: boolean }) {
  return (
    <code
      className={cn(
        'inline-flex items-center border px-1.5 py-0.5 text-[11px] leading-4',
        shaded ? 'border-foreground/60 bg-muted font-medium text-foreground' : 'border-border text-muted-foreground'
      )}
    >
      {children}
    </code>
  )
}

function ComponentLevelRow({ spec }: { spec: ComponentSpec }) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries((spec.axes ?? []).map((axis) => [axis.name, axis.default ?? axis.values[0]]))
  )
  const combinations = combinationCount(spec)
  const meta = spec.axes?.length
    ? `${spec.axes.length} props · ${combinations.toLocaleString()} combinations`
    : 'no visual props'

  return (
    <div id={spec.id} className='grid scroll-mt-20 gap-3 py-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8'>
      <div className='flex flex-col gap-1'>
        <h4 className='h6 heading'>{spec.title}</h4>
        <p className='text-xs text-muted-foreground'>{meta}</p>
      </div>
      <div className='flex min-w-0 flex-col gap-2.5'>
        {spec.axes?.map((axis) => (
          <div key={axis.name} className='grid gap-1.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-start sm:gap-3'>
            <span className='pt-0.5 text-[11px] text-muted-foreground'>{axis.name}</span>
            <div role='group' aria-label={`${spec.title} ${axis.name}`} className='flex flex-wrap gap-1.5'>
              {axis.values.map((value) => {
                const active = selected[axis.name] === value
                return (
                  <button
                    key={value}
                    type='button'
                    aria-pressed={active}
                    title={axis.default === value ? 'Component default' : undefined}
                    onClick={() => setSelected((current) => ({ ...current, [axis.name]: value }))}
                    className={cn(
                      'inline-flex min-h-7 items-center border px-2 py-1 text-[11px] leading-4 transition-colors focus-visible:outline-2 focus-visible:outline-ring',
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {value}
                    {axis.default === value && <span className='ml-1 opacity-75'>· default</span>}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        {spec.axes?.length ? (
          <div className='mt-1 flex min-w-0 flex-col gap-2 border border-border p-3'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <span className='text-[11px] font-medium text-muted-foreground'>Live preview · selected combination</span>
              <button
                type='button'
                className='text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring'
                onClick={() =>
                  setSelected(
                    Object.fromEntries((spec.axes ?? []).map((axis) => [axis.name, axis.default ?? axis.values[0]]))
                  )
                }
              >
                Reset defaults
              </button>
            </div>
            <div className='flex min-h-12 min-w-0 items-center overflow-x-auto py-1'>
              {renderConfiguredSpecimen(spec.id, selected)}
            </div>
          </div>
        ) : null}
        {spec.states && (
          <div className='grid gap-1.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-3'>
            <span className='pt-0.5 text-[11px] text-muted-foreground'>states &amp; modes</span>
            <span className='text-[11px] leading-5 text-muted-foreground'>{spec.states.join(' · ')}</span>
          </div>
        )}
        {renderStateSpecimen(spec.id) && (
          <div className='flex flex-wrap items-center gap-3 border border-border p-3 mt-2'>
            {renderStateSpecimen(spec.id)}
          </div>
        )}
        {spec.sizes && !spec.axes?.some((axis) => axis.name.toLowerCase().includes('size')) && (
          <p className='text-[11px] leading-5 text-muted-foreground'>{spec.sizes}</p>
        )}
        {spec.note && <p className='text-xs leading-5 text-muted-foreground'>{spec.note}</p>}
      </div>
    </div>
  )
}

function SheetLegend() {
  return (
    <p className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
      <Chip shaded>default</Chip>
      <span>= component default. Select prop values to update the combined live preview.</span>
      <span className='hidden sm:inline'>·</span>
      <span>Counts show the Cartesian product of the listed props.</span>
    </p>
  )
}

export function Sheet() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SPECS
    return SPECS.filter((spec) => {
      const haystack = [
        spec.title,
        spec.group,
        ...(spec.axes?.flatMap((axis) => [axis.name, ...axis.values]) ?? []),
        ...(spec.states ?? [])
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  const specs = useMemo(() => filtered.sort((a, b) => a.title.localeCompare(b.title)), [filtered])

  const headingFamily = firstFamily(THEME['--font-heading'], 'Host Grotesk Variable')
  const sansFamily = firstFamily(THEME['--font-sans'], 'IBM Plex Sans')
  const monoFamily = firstFamily(THEME['--font-mono'], 'IBM Plex Mono')

  return (
    <div className='flex flex-col gap-14'>
      <header className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs tracking-widest sub-heading'>Reference sheet</span>
          <h1 className='h1 heading'>Tokens and component props</h1>
          <p className='max-w-2xl text-sm text-muted-foreground'>
            See each component&apos;s configurable variants, prop values and combination count. Change a value to
            inspect the combined preview before adding a one-off style.
          </p>
        </div>
        <dl className='grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4'>
          {[
            [String(SPECS.length), 'components'],
            [String(AXIS_COUNT), 'configurable props'],
            [String(OPTION_COUNT), 'prop values'],
            [String(COLOR_TOKEN_COUNT), 'colour tokens']
          ].map(([value, label]) => (
            <div key={label} className='flex flex-col gap-1 bg-background px-4 py-3'>
              <dt className='text-xs sub-heading'>{label}</dt>
              <dd className='text-2xl font-semibold tabular-nums'>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className='flex flex-col gap-8'>
        <SheetSection
          index='01'
          title='Tokens'
          description='Semantic CSS variables. Use the matching Tailwind utility (bg-primary, text-muted-foreground, border-border, ring-ring) instead of a raw colour. Dark values apply when .dark sits on an ancestor.'
        />

        {TOKEN_GROUPS.map((group) => (
          <div key={group.id} className='flex flex-col gap-3'>
            <div>
              <h3 className='h6 heading'>{group.title}</h3>
              <p className='text-xs text-muted-foreground'>{group.description}</p>
            </div>
            <TokenTable tokens={group.tokens} />
          </div>
        ))}

        <div className='grid gap-8 lg:grid-cols-2'>
          <div className='flex flex-col gap-3'>
            <div>
              <h3 className='h6 heading'>Radius</h3>
              <p className='text-xs text-muted-foreground'>Component corner radius: 2px (`var(--radius)`).</p>
            </div>
            <RadiusScale />
          </div>

          <div className='flex flex-col gap-3'>
            <div>
              <h3 className='h6 heading'>Type</h3>
              <p className='text-xs text-muted-foreground'>
                Families come from the theme; the size ramp is Tailwind&apos;s default. Code, kbd, samp and pre switch
                to mono automatically.
              </p>
            </div>
            <div className='grid grid-cols-3 gap-3 border border-border p-4'>
              <p className='text-base'>
                <span className='text-xs sub-heading'>Heading</span>
                <br />
                {headingFamily}
              </p>
              <p className='text-base'>
                <span className='text-xs sub-heading'>Sans</span>
                <br />
                {sansFamily}
              </p>
              <p className='text-base'>
                <span className='text-xs sub-heading'>Mono</span>
                <br />
                <code>{monoFamily}</code>
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='h6 heading'>Type scale</h3>
            <p className='text-xs text-muted-foreground'>
              Sizes in px at the default 16 px root. Showcase headings pair a ramp size with semibold and
              tracking-tight.
            </p>
          </div>
          <TypographyTable />
        </div>
      </section>

      <section className='flex flex-col gap-6'>
        <SheetSection
          index='02'
          title='Component levels'
          description='Each component lists its library-defined design axes (variant, size, orientation, structure, placement, adornment and activation) plus selected states. Base UI pass-through props are not exhaustively listed. Values are copied from component definitions; shaded values are defaults.'
        />

        <div className='flex flex-col gap-4'>
          <div className='w-full sm:max-w-64'>
            <Input
              startAdornment={<MagnifyingGlassIcon />}
              endAdornment={
                query !== '' && (
                  <Button size='icon-xs' variant='ghost' aria-label='Clear filter' onClick={() => setQuery('')}>
                    <XIcon />
                  </Button>
                )
              }
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Filter components or values'
            />
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <nav aria-label='Components' className='flex flex-wrap gap-1.5'>
              {specs.map((spec) => (
                <a
                  key={spec.id}
                  href={`#${spec.id}`}
                  className='border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                >
                  {spec.title}
                </a>
              ))}
            </nav>
          </div>
          <SheetLegend />
        </div>

        {specs.length === 0 && <p className='text-sm text-muted-foreground'>No component matches “{query}”.</p>}

        <div className='flex flex-col gap-10'>
          {specs.map((spec) => (
            <ComponentLevelRow key={spec.id} spec={spec} />
          ))}
        </div>
      </section>
    </div>
  )
}
