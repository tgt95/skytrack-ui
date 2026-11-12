import * as React from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import type { ControlSize } from '@/lib/control-sizes'
import { Input } from '@/components/ui/input'
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteTrigger
} from '@/components/ui/autocomplete'
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  ComboboxTriggerButton,
  ComboboxValue
} from '@/components/ui/combobox'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '@/components/ui/otp-field'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from '@/components/ui/slider'
import { Switch, SwitchThumb } from '@/components/ui/switch'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { FieldRoot, FieldLabel, FieldControl, FieldDescription } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import { Dropzone } from '@/components/ui/dropzone'
import { RadioRoot, RadioGroup } from '@/components/ui/radio'

export const FRUITS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' }
]

export const COMMANDS = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'bravo', label: 'Bravo' },
  { value: 'charlie', label: 'Charlie' }
]

/* ------------------------------------------------------------ Autocomplete */

export function AutocompleteSpecimen({
  context,
  inputSize,
  groupSize
}: {
  context?: string
  inputSize?: string
  groupSize?: string
}) {
  const input = (
    <AutocompleteInput
      context={context as React.ComponentProps<typeof AutocompleteInput>['context']}
      size={inputSize as React.ComponentProps<typeof AutocompleteInput>['size']}
      placeholder='Search'
      aria-label={`autocomplete ${inputSize ?? context ?? ''}`}
    />
  )

  return (
    <Autocomplete items={COMMANDS}>
      {context === 'group' ? (
        <AutocompleteInputGroup
          size={groupSize as React.ComponentProps<typeof AutocompleteInputGroup>['size']}
          className='w-40'
        >
          {input}
          <AutocompleteTrigger aria-label='Open suggestions' />
        </AutocompleteInputGroup>
      ) : (
        <div className='w-40'>{input}</div>
      )}
      <AutocompletePortal>
        <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
          <AutocompletePopup>
            <AutocompleteEmpty>No results.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: (typeof COMMANDS)[number]) => (
                <AutocompleteItem key={item.value} value={item}>
                  {item.label}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </Autocomplete>
  )
}

/* --------------------------------------------------------------- Combobox */

export function ComboboxSpecimen({
  size,
  shape,
  standaloneTriggerSize
}: {
  size?: string
  shape?: string
  standaloneTriggerSize?: string
}) {
  if (standaloneTriggerSize) {
    return (
      <Combobox items={FRUITS}>
        <ComboboxTriggerButton
          size={standaloneTriggerSize as React.ComponentProps<typeof ComboboxTriggerButton>['size']}
          className='w-40'
        >
          <ComboboxValue placeholder='Pick fruit' />
        </ComboboxTriggerButton>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxList>
                {(item: (typeof FRUITS)[number]) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{item.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    )
  }

  if (shape === 'chips') {
    return (
      <Combobox items={FRUITS} multiple defaultValue={[FRUITS[0], FRUITS[1]]}>
        <ComboboxInputGroup
          size={size as React.ComponentProps<typeof ComboboxInputGroup>['size']}
          shape='chips'
          className='w-52'
        >
          <ComboboxValue>
            {(value: (typeof FRUITS)[number][]) => (
              <ComboboxChips aria-label='Selected fruits'>
                {value.map((fruit) => (
                  <ComboboxChip key={fruit.value} aria-label={fruit.label}>
                    {fruit.label}
                    <ComboboxChipRemove aria-label={`Remove ${fruit.label}`} />
                  </ComboboxChip>
                ))}
                <ComboboxInput placeholder='Add fruit' aria-label='Add fruit' />
              </ComboboxChips>
            )}
          </ComboboxValue>
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: (typeof FRUITS)[number]) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{item.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    )
  }

  return (
    <Combobox items={FRUITS}>
      <ComboboxInputGroup size={size as React.ComponentProps<typeof ComboboxInputGroup>['size']} className='w-40'>
        <ComboboxInput placeholder='Pick fruit' aria-label={`combobox ${size ?? ''}`} />
        <ComboboxTrigger aria-label='Open list' />
      </ComboboxInputGroup>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(item: (typeof FRUITS)[number]) => (
                <ComboboxItem key={item.value} value={item}>
                  <ComboboxItemIndicator />
                  <span className='col-start-2'>{item.label}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

export function ConfiguredComboboxSpecimen({
  size,
  shape,
  standaloneTriggerSize
}: {
  size: string
  shape: string
  standaloneTriggerSize: string
}) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='w-28 text-xs text-muted-foreground'>Input group</span>
        <ComboboxSpecimen size={size} shape={shape} />
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='w-28 text-xs text-muted-foreground'>Standalone trigger</span>
        <ComboboxSpecimen standaloneTriggerSize={standaloneTriggerSize} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- Input */

export function InputSpecimen({ adornment = 'none', size = 'default' }: { adornment?: string; size?: ControlSize }) {
  const start = adornment === 'start' || adornment === 'both'
  const end = adornment === 'end' || adornment === 'both'
  return (
    <Input
      size={size}
      className='w-40'
      placeholder='Value'
      aria-label={`input ${adornment} ${size}`}
      startAdornment={start ? <MagnifyingGlassIcon aria-hidden /> : undefined}
      endAdornment={end ? <span className='text-xs'>kg</span> : undefined}
    />
  )
}

/* ------------------------------------------------------------ Number field */

export function NumberFieldSpecimen({ size = 'default' }: { size?: string }) {
  const controlSize = size as ControlSize
  return (
    <NumberField defaultValue={100}>
      <NumberFieldGroup size={controlSize}>
        <NumberFieldDecrement aria-label='Decrease' />
        <NumberFieldInput size={controlSize} aria-label='Amount' />
        <NumberFieldIncrement aria-label='Increase' />
      </NumberFieldGroup>
    </NumberField>
  )
}

/* --------------------------------------------------------------- OTP field */

export function OtpFieldSpecimen({ orientation }: { orientation: string }) {
  return (
    <OTPField length={6}>
      {[0, 1, 2].map((index) => (
        <OTPFieldInput key={index} aria-label={`Character ${index + 1} of 6`} />
      ))}
      <OTPFieldSeparator orientation={orientation as 'horizontal' | 'vertical'} aria-hidden />
      {[3, 4, 5].map((index) => (
        <OTPFieldInput key={index} aria-label={`Character ${index + 1} of 6`} />
      ))}
    </OTPField>
  )
}

/* ------------------------------------------------------------------ Select */

export function SelectSpecimen({ size }: { size: string }) {
  return (
    <Select items={FRUITS}>
      <SelectTrigger
        size={size as React.ComponentProps<typeof SelectTrigger>['size']}
        className='w-36'
        aria-label={`select ${size}`}
      >
        <SelectValue placeholder='Pick fruit' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {FRUITS.map((fruit) => (
                <SelectItem key={fruit.value} value={fruit.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{fruit.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

/* ------------------------------------------------------------------ Slider */

export function SliderSpecimen({ orientation = 'horizontal', state }: { orientation?: string; state?: string }) {
  const isDragging = state === 'dragging'
  const isDisabled = state === 'disabled'
  const defaultValue = isDragging ? 75 : isDisabled ? 30 : 40

  return (
    <Slider
      orientation={orientation as React.ComponentProps<typeof Slider>['orientation']}
      defaultValue={defaultValue}
      disabled={isDisabled}
      className={orientation === 'vertical' ? 'h-28 w-8' : 'w-48'}
    >
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb
            aria-label={`slider ${orientation}`}
            className={isDragging ? 'shadow-md ring-2 ring-primary' : undefined}
          />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}

/* ------------------------------------------------------------------ Switch */

export function SwitchSpecimen({ size = 'default', state }: { size?: string; state?: string }) {
  const isChecked = state ? state === 'checked' : true
  const isDisabled = state === 'disabled'
  const isFocusVisible = state === 'focus-visible'
  return (
    <Switch
      size={size as React.ComponentProps<typeof Switch>['size']}
      defaultChecked={isChecked}
      disabled={isDisabled}
      autoFocus={isFocusVisible}
      aria-label={`switch ${size}`}
    >
      <SwitchThumb />
    </Switch>
  )
}

/* ---------------------------------------------------------- Dropzone */

export function DropzoneSpecimen({ state = 'idle' }: { state?: string }) {
  if (state === 'disabled') {
    return <Dropzone disabled className='w-full max-w-sm' />
  }
  if (state === 'dragging') {
    return (
      <Dropzone
        data-dragging=''
        className='w-full max-w-sm border-primary bg-primary/5'
        hint='Drop file here to upload'
      />
    )
  }
  return <Dropzone className='w-full max-w-sm' />
}

/* ---------------------------------------------------------- Checkbox */

export function CheckboxSpecimen({ state = 'checked' }: { state?: string }) {
  if (state === 'unchecked') {
    return <CheckboxRoot aria-label='Unchecked checkbox' />
  }
  if (state === 'indeterminate') {
    return <CheckboxRoot indeterminate aria-label='Indeterminate checkbox' />
  }
  if (state === 'disabled') {
    return <CheckboxRoot disabled defaultChecked aria-label='Disabled checkbox' />
  }
  if (state === 'invalid') {
    return <CheckboxRoot aria-invalid defaultChecked aria-label='Invalid checkbox' />
  }
  return <CheckboxRoot defaultChecked aria-label='Checked checkbox' />
}

export function CheckboxGroupSpecimen({ state = 'multiple values' }: { state?: string }) {
  const disabled = state === 'disabled'
  return (
    <CheckboxGroup disabled={disabled} defaultValue={['a', 'b']} aria-label='Checkbox group' className='flex gap-3'>
      <CheckboxRoot value='a' aria-label='Option A' />
      <CheckboxRoot value='b' aria-label='Option B' />
      <CheckboxRoot value='c' aria-label='Option C' />
    </CheckboxGroup>
  )
}

/* ----------------------------------------------------------- Field */

export function FieldSpecimen({ state = 'filled' }: { state?: string }) {
  if (state === 'invalid') {
    return (
      <FieldRoot invalid className='w-64'>
        <FieldLabel className='text-destructive'>Email address</FieldLabel>
        <FieldControl value='invalid-email' aria-label='Email input' />
        <span data-slot='field-error' className='text-sm leading-normal font-medium text-destructive'>
          Please enter a valid email address.
        </span>
      </FieldRoot>
    )
  }
  if (state === 'disabled') {
    return (
      <FieldRoot disabled className='w-64'>
        <FieldLabel>Email address</FieldLabel>
        <FieldControl placeholder='name@example.com' aria-label='Email input' />
        <FieldDescription>Editing is not available.</FieldDescription>
      </FieldRoot>
    )
  }
  return (
    <FieldRoot className='w-64'>
      <FieldLabel>Email address</FieldLabel>
      <FieldControl defaultValue='name@example.com' aria-label='Email input' />
      <FieldDescription>We never share your email.</FieldDescription>
    </FieldRoot>
  )
}

/* ---------------------------------------------------------- Fieldset */

export function FieldsetSpecimen({ state = 'enabled' }: { state?: string }) {
  const disabled = state === 'disabled'
  return (
    <FieldsetRoot disabled={disabled} className='w-64'>
      <FieldsetLegend>Delivery details</FieldsetLegend>
      <FieldRoot>
        <FieldLabel>Address</FieldLabel>
        <FieldControl placeholder='12 Computing Way' aria-label='Address input' />
      </FieldRoot>
    </FieldsetRoot>
  )
}

/* ---------------------------------------------------------------- Form */

export function FormSpecimen({ state = 'valid' }: { state?: string }) {
  const isInvalid = state === 'invalid'
  return (
    <Form className='flex w-64 flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
      <FieldRoot invalid={isInvalid}>
        <FieldLabel className={isInvalid ? 'text-destructive' : undefined}>Username</FieldLabel>
        <FieldControl defaultValue={isInvalid ? 'a' : 'pilot'} aria-label='Username input' />
        {isInvalid ? (
          <span data-slot='field-error' className='text-sm leading-normal font-medium text-destructive'>
            Username must be at least 3 characters.
          </span>
        ) : (
          <FieldDescription>Ready to submit.</FieldDescription>
        )}
      </FieldRoot>
      <Button size='sm' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

/* --------------------------------------------------------------- Radio */

export function RadioSpecimen({ state = 'checked' }: { state?: string }) {
  const isUnchecked = state === 'unchecked'
  const isDisabled = state === 'disabled'
  const isReadOnly = state === 'readonly'
  const isInvalid = state === 'invalid'

  return (
    <RadioGroup
      key={state}
      defaultValue={isUnchecked ? undefined : 'a'}
      disabled={isDisabled}
      readOnly={isReadOnly}
      aria-invalid={isInvalid}
      aria-label='Radio group'
      className='flex gap-3'
    >
      <RadioRoot value='a' aria-label='Option A' />
      <RadioRoot value='b' aria-label='Option B' />
    </RadioGroup>
  )
}
