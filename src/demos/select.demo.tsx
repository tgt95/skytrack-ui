import * as React from 'react'
import { CheckIcon } from '@phosphor-icons/react'
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectRootProps
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'

interface Apple {
  label: string
  value: string
}

const apples: Apple[] = [
  { label: 'Gala', value: 'gala' },
  { label: 'Fuji', value: 'fuji' },
  { label: 'Honeycrisp', value: 'honeycrisp' },
  { label: 'Granny Smith', value: 'granny-smith' },
  { label: 'Pink Lady', value: 'pink-lady' }
]

function AppleSelect({ size, disabled }: { size?: 'sm' | 'default'; disabled?: boolean }) {
  return (
    <Select items={apples} disabled={disabled}>
      <SelectLabel>Apple</SelectLabel>
      <SelectTrigger size={size} className='w-48'>
        <SelectValue placeholder='Select apple' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectScrollUpArrow />
            <SelectList>
              {apples.map((apple) => (
                <SelectItem key={apple.value} value={apple.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{apple.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
            <SelectScrollDownArrow />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

/** Docs: Typed wrapper component — generic `Value` / `Multiple` inference. */
function MySelect<Value, Multiple extends boolean | undefined = false>(props: SelectRootProps<Value, Multiple>) {
  return <Select {...props} />
}

const themeItems = [
  { value: 'system', label: 'System default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
]

const fontLabels = {
  monospace: 'Monospace',
  serif: 'Serif',
  'sans-serif': 'Sans-serif'
} as const

type Font = keyof typeof fontLabels

const fontStacks: Record<Font, string> = {
  monospace: 'ui-monospace, monospace',
  serif: 'ui-serif, serif',
  'sans-serif': 'IBM Plex Sans, sans-serif'
}

function TypedWrapperSelect() {
  return (
    <MySelect<string> items={themeItems} defaultValue='light'>
      <SelectTrigger className='w-48' aria-label='Theme'>
        <SelectValue>{(value: string | null) => <span>{String(value)}</span>}</SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {themeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </MySelect>
  )
}

function ItemsPropSelect() {
  return (
    <Select items={themeItems} defaultValue='system'>
      <SelectTrigger className='w-48' aria-label='Theme'>
        <SelectValue />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {themeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

function LookupMapSelect() {
  return (
    <Select<Font> items={fontLabels} defaultValue='serif'>
      <SelectTrigger className='w-48' aria-label='Font'>
        <SelectValue>
          {(value: Font) => (
            <span style={{ fontFamily: fontStacks[value ?? 'sans-serif'] }}>{fontLabels[value ?? 'sans-serif']}</span>
          )}
        </SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {(Object.keys(fontLabels) as Font[]).map((value) => (
                <SelectItem key={value} value={value}>
                  <SelectItemIndicator />
                  <SelectItemText>
                    <span style={{ fontFamily: fontStacks[value] }}>{fontLabels[value]}</span>
                  </SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

function LabeledSelect() {
  return (
    <Select items={themeItems}>
      <SelectLabel>Theme</SelectLabel>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Select theme' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {themeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

function AriaLabelSelect() {
  return (
    <Select items={themeItems}>
      <SelectTrigger className='w-48' aria-label='Theme'>
        <SelectValue placeholder='Select theme' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {themeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

const placeholderItems = [
  { value: 'system', label: 'System default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
]

const clearableItems = [
  { value: null, label: 'Select theme' },
  { value: 'system', label: 'System default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
]

function PlaceholderSelect() {
  return (
    <Select items={placeholderItems}>
      <SelectLabel>Theme</SelectLabel>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Select theme' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {placeholderItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

function ClearableSelect() {
  return (
    <Select items={clearableItems} defaultValue={null}>
      <SelectLabel>Theme</SelectLabel>
      <SelectTrigger className='w-48'>
        <SelectValue />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {clearableItems.map((item) => (
                <SelectItem key={String(item.value)} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

const languages = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  csharp: 'C#',
  php: 'PHP',
  cpp: 'C++',
  rust: 'Rust',
  go: 'Go',
  swift: 'Swift'
} as const

type Language = keyof typeof languages

const languageValues = Object.keys(languages) as Language[]

function renderLanguages(value: Language[]) {
  if (value.length === 0) {
    return 'Select languages'
  }
  const first = languages[value[0]]
  const additional = value.length > 1 ? ` (+${value.length - 1} more)` : ''
  return first + additional
}

function MultipleSelect() {
  return (
    <Select<string, true> multiple items={languages} defaultValue={['javascript', 'typescript']}>
      <SelectLabel>Languages</SelectLabel>
      <SelectTrigger className='w-56'>
        <SelectValue>{(value: Language[]) => renderLanguages(value ?? [])}</SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {languageValues.map((value) => (
                <SelectItem key={value} value={value}>
                  <SelectItemIndicator>
                    <CheckIcon className='size-4' />
                  </SelectItemIndicator>
                  <SelectItemText>{languages[value]}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

interface ShippingMethod {
  id: string
  name: string
  duration: string
  price: string
}

const shippingMethods: ShippingMethod[] = [
  { id: 'standard', name: 'Standard', duration: 'Delivers in 4-6 business days', price: '$4.99' },
  { id: 'express', name: 'Express', duration: 'Delivers in 2-3 business days', price: '$9.99' },
  {
    id: 'overnight',
    name: 'Overnight',
    duration: 'Delivers next business day',
    price: '$19.99'
  }
]

function ObjectValueSelect() {
  return (
    <Select<ShippingMethod> defaultValue={shippingMethods[0]} itemToStringValue={(method) => method.id}>
      <SelectLabel>Shipping method</SelectLabel>
      <SelectTrigger className='w-64'>
        <SelectValue>
          {(method: ShippingMethod) => (
            <span className='flex flex-col items-start gap-0.5'>
              <span className='text-sm'>{method.name}</span>
              <span className='text-xs text-muted-foreground'>
                {method.duration} ({method.price})
              </span>
            </span>
          )}
        </SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectScrollUpArrow />
            <SelectList>
              {shippingMethods.map((method) => (
                <SelectItem key={method.id} value={method} className='items-start'>
                  <SelectItemIndicator className='relative top-[0.4em]' />
                  <SelectItemText className='flex flex-col gap-0.5'>
                    <span className='text-sm'>{method.name}</span>
                    <span className='text-xs text-muted-foreground'>
                      {method.duration} ({method.price})
                    </span>
                  </SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
            <SelectScrollDownArrow />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

interface Produce {
  value: string
  label: string
}

interface ProduceGroup {
  [key: string]: unknown
  value: string
  items: Produce[]
}

const groupedProduce: ProduceGroup[] = [
  {
    value: 'Fruits',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'mango', label: 'Mango' },
      { value: 'kiwi', label: 'Kiwi' },
      { value: 'grape', label: 'Grape' },
      { value: 'orange', label: 'Orange' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'watermelon', label: 'Watermelon' }
    ]
  },
  {
    value: 'Vegetables',
    items: [
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'carrot', label: 'Carrot' },
      { value: 'cauliflower', label: 'Cauliflower' },
      { value: 'cucumber', label: 'Cucumber' },
      { value: 'kale', label: 'Kale' },
      { value: 'pepper', label: 'Bell pepper' },
      { value: 'spinach', label: 'Spinach' },
      { value: 'zucchini', label: 'Zucchini' }
    ]
  }
]

function GroupedSelect() {
  return (
    <Select items={groupedProduce}>
      <SelectLabel>Produce</SelectLabel>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Select produce' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectScrollUpArrow />
            <SelectList>
              {groupedProduce.map((group, index) => (
                <React.Fragment key={group.value}>
                  <SelectGroup>
                    <SelectGroupLabel>{group.value}</SelectGroupLabel>
                    {group.items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <SelectItemIndicator />
                        <SelectItemText>{item.label}</SelectItemText>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  {index < groupedProduce.length - 1 ? <SelectSeparator /> : null}
                </React.Fragment>
              ))}
            </SelectList>
            <SelectScrollDownArrow />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

function DisabledSelect() {
  return <AppleSelect disabled />
}

export const demo: DemoMeta = {
  id: 'select',
  title: 'Select',
  description: 'A common form component for choosing a predefined value in a dropdown menu.',
  group: 'Forms',
  variants: [
    { name: 'Default', render: () => <AppleSelect /> },
    {
      name: 'Sizes',
      render: () => (
        <>
          <AppleSelect size='sm' />
          <AppleSelect />
        </>
      )
    },
    { name: 'Typed wrapper component', render: () => <TypedWrapperSelect /> },
    {
      name: 'Formatting the value',
      render: () => (
        <>
          <ItemsPropSelect />
          <LookupMapSelect />
        </>
      )
    },
    {
      name: 'Labeling a select',
      render: () => (
        <>
          <LabeledSelect />
          <AriaLabelSelect />
        </>
      )
    },
    {
      name: 'Placeholder values',
      render: () => (
        <>
          <PlaceholderSelect />
          <ClearableSelect />
        </>
      )
    },
    { name: 'Multiple selection', render: () => <MultipleSelect /> },
    { name: 'Object values', render: () => <ObjectValueSelect /> },
    { name: 'Grouped', render: () => <GroupedSelect /> },
    {
      name: 'Disabled',
      render: () => (
        <>
          <DisabledSelect />
          <Button disabled>Disabled</Button>
        </>
      )
    }
  ]
}
