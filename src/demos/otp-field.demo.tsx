import { useId, useRef, useState } from 'react'
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '@/components/ui/otp-field'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'

const OTP_LENGTH = 6

function BasicOTPField() {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Verification code
      </label>
      <OTPField id={id} length={OTP_LENGTH} aria-describedby={descriptionId}>
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput key={index} aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <p id={descriptionId} className='m-0 text-sm text-muted-foreground'>
        Enter the {OTP_LENGTH}-character code we sent to your device.
      </p>
    </div>
  )
}

/**
 * The first slot uses the field's <label>; every other slot carries its own
 * `aria-label` so assistive technology announces which slot is focused.
 */
function LabeledOTPField() {
  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor='verification-code' className='text-sm font-medium'>
        Verification code
      </label>
      <OTPField id='verification-code' length={OTP_LENGTH} aria-describedby='verification-code-description'>
        <OTPFieldInput />
        <OTPFieldInput aria-label='Character 2 of 6' />
        <OTPFieldInput aria-label='Character 3 of 6' />
        <OTPFieldInput aria-label='Character 4 of 6' />
        <OTPFieldInput aria-label='Character 5 of 6' />
        <OTPFieldInput aria-label='Character 6 of 6' />
      </OTPField>
      <p id='verification-code-description' className='m-0 text-sm text-muted-foreground'>
        Enter the 6-character code we sent to your device.
      </p>
    </div>
  )
}

function AlphanumericOTPField() {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Recovery code
      </label>
      <OTPField id={id} length={OTP_LENGTH} validationType='alphanumeric' aria-describedby={descriptionId}>
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput key={index} aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <p id={descriptionId} className='m-0 text-sm text-muted-foreground'>
        Accept letters and numbers for backup codes such as <code className='font-mono'>A7C9XZ</code>.
      </p>
    </div>
  )
}

function GroupedOTPField() {
  const id = useId()

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Verification code
      </label>
      <OTPField id={id} length={OTP_LENGTH}>
        <div className='flex gap-2'>
          {Array.from({ length: 3 }, (_, index) => (
            <OTPFieldInput
              key={index}
              aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`}
            />
          ))}
        </div>
        <OTPFieldSeparator />
        <div className='flex gap-2'>
          {Array.from({ length: 3 }, (_, index) => (
            <OTPFieldInput key={index + 3} aria-label={`Character ${index + 4} of ${OTP_LENGTH}`} />
          ))}
        </div>
      </OTPField>
    </div>
  )
}

function PlaceholderOTPField() {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Verification code
      </label>
      <OTPField id={id} length={OTP_LENGTH} aria-describedby={descriptionId}>
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput
            key={index}
            placeholder='•'
            className='placeholder:text-muted-foreground focus:placeholder:text-transparent'
            aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`}
          />
        ))}
      </OTPField>
      <p id={descriptionId} className='m-0 text-sm text-muted-foreground'>
        Placeholder hints stay visible until the active slot is focused.
      </p>
    </div>
  )
}

const normalizeRecoveryCode = (value: string) => value.toUpperCase()

function CustomNormalizationOTPField() {
  const id = useId()
  const descriptionId = `${id}-description`
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [invalidIndex, setInvalidIndex] = useState(-1)
  const [statusMessage, setStatusMessage] = useState('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleValueInvalid(value: string) {
    setInvalidIndex(focusedIndex)
    setStatusMessage(`Unsupported characters were ignored from ${value}.`)
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      setInvalidIndex(-1)
    }, 400)
  }

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Recovery code
      </label>
      <OTPField
        id={id}
        length={OTP_LENGTH}
        inputMode='text'
        validationType='alphanumeric'
        normalizeValue={normalizeRecoveryCode}
        onValueInvalid={handleValueInvalid}
        aria-describedby={descriptionId}
      >
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput
            key={index}
            className={invalidIndex === index ? 'border-destructive ring-[3px] ring-destructive/30' : undefined}
            aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`}
            onFocus={() => {
              setFocusedIndex(index)
            }}
          />
        ))}
      </OTPField>
      <p id={descriptionId} className='m-0 text-sm text-muted-foreground'>
        Letters and digits only. Letters are converted to uppercase.
      </p>
      <span aria-live='polite' className='sr-only'>
        {statusMessage}
      </span>
    </div>
  )
}

function MaskedOTPField() {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Access code
      </label>
      <OTPField id={id} length={OTP_LENGTH} mask aria-describedby={descriptionId}>
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput key={index} aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <p id={descriptionId} className='m-0 text-sm text-muted-foreground'>
        Use <code className='font-mono'>mask</code> to obscure the code on shared screens.
      </p>
    </div>
  )
}

function FormOTPField() {
  const id = useId()

  return (
    <form
      className='flex w-full max-w-sm flex-col items-start gap-2'
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <label htmlFor={id} className='text-sm font-medium'>
        Verification code
      </label>
      <OTPField id={id} name='verificationCode' length={OTP_LENGTH} autoSubmit>
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput key={index} aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <Button type='submit' variant='outline'>
        Verify
      </Button>
    </form>
  )
}

function CompleteOTPField() {
  const [value, setValue] = useState('')
  const id = useId()

  return (
    <div className='flex w-full max-w-sm flex-col items-start gap-1'>
      <label htmlFor={id} className='text-sm font-medium'>
        Verification code
      </label>
      <OTPField
        id={id}
        length={OTP_LENGTH}
        value={value}
        onValueChange={setValue}
        onValueComplete={(complete) => setValue(complete)}
      >
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <OTPFieldInput key={index} aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <p className='m-0 text-sm text-muted-foreground'>
        {value.length === OTP_LENGTH ? `Submitted: ${value}` : 'Enter the code.'}
      </p>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'otp-field',
  title: 'OTP Field',
  description: 'A one-time-passcode input split into individual character slots.',
  group: 'Forms',
  variants: [
    { name: 'Demo', render: () => <BasicOTPField /> },
    { name: 'Labeling an OTP field', render: () => <LabeledOTPField /> },
    { name: 'Alphanumeric verification codes', render: () => <AlphanumericOTPField /> },
    { name: 'Grouped layouts', render: () => <GroupedOTPField /> },
    { name: 'Placeholder hints', render: () => <PlaceholderOTPField /> },
    { name: 'Custom normalization', render: () => <CustomNormalizationOTPField /> },
    { name: 'Masked entry', render: () => <MaskedOTPField /> },
    { name: 'Form integration', render: () => <FormOTPField /> },
    { name: 'Controlled and complete', render: () => <CompleteOTPField /> },
    {
      name: 'Disabled',
      render: () => (
        <div className='flex w-full max-w-sm flex-col items-start gap-1'>
          <span className='text-sm font-medium'>Verification code</span>
          <OTPField length={OTP_LENGTH} disabled defaultValue='1234'>
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <OTPFieldInput
                key={index}
                aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`}
              />
            ))}
          </OTPField>
        </div>
      )
    }
  ]
}
