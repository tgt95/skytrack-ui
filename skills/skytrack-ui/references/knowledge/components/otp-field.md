# OTP Field

> A one-time-passcode input split into individual character slots.

- Package version: `0.1.5`
- Public export: `skytrack-ui/otp-field`
- Implementation: [`src/components/ui/otp-field.tsx`](../../../../../src/components/ui/otp-field.tsx)
- Public type declaration: [`dist-lib/components/ui/otp-field.d.ts`](../../../../../dist-lib/components/ui/otp-field.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `otp-field`
- Closest demo: [`src/demos/otp-field.demo.tsx`](../../../../../src/demos/otp-field.demo.tsx)

## Overview

The OTP Field component renders a segmented one-time password or verification code input divided into individual character slots. Built on Base UI OTPField, it manages automated focus advancement, backspace clearing, clipboard paste distribution, and optional slot grouping.

**Live demo variant:** `Demo`

```tsx
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '@/components/ui/otp-field'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'

export function OTPFieldDemo() {
  return (
    <FieldRoot className='w-fit gap-2'>
      <FieldLabel>Security authentication code</FieldLabel>
      <OTPField maxLength={6}>
        <OTPFieldInput index={0} />
        <OTPFieldInput index={1} />
        <OTPFieldInput index={2} />
        <OTPFieldSeparator />
        <OTPFieldInput index={3} />
        <OTPFieldInput index={4} />
        <OTPFieldInput index={5} />
      </OTPField>
      <FieldDescription>Enter the 6-digit code sent to your device</FieldDescription>
    </FieldRoot>
  )
}
```

## Usage

Use OTP Field for multi-factor authentication (MFA) codes, SMS confirmation pins, or hardware security token inputs. Do not use OTP Field for standard passwords, credit card numbers, or variable-length license keys; use standard `Input` with adornments instead.

**Live demo variant:** `Labeling an OTP field`

## Anatomy

### Composition Tree

```text
<OTPField length={6} value={otp} onValueChange={setOtp}>
├─ <OTPFieldInput index={0} />
├─ <OTPFieldInput index={1} />
├─ <OTPFieldInput index={2} />
├─ <OTPFieldSeparator />
├─ <OTPFieldInput index={3} />
├─ <OTPFieldInput index={4} />
└─ <OTPFieldInput index={5} />
</OTPField>
```

OTP Field is composed of:

1. `OTPField` (Root provider managing concatenated code value, active slot focus, and paste handling)
2. `OTPFieldInput` (Individual slot input box; configured with `index={n}`)
3. `OTPFieldSeparator` (Divider line separating slot clusters, such as 3-3 groups)

The minimal valid composition requires `OTPField` with `maxLength={n}` and `n` instances of `OTPFieldInput`.

**Live demo variant:** `Grouped layouts`

## Variants & states

Supported capabilities and states:

- Length: defined via `maxLength` (e.g. 4, 6, or 8 characters).
- Slot filling: slots automatically highlight with `data-filled` when containing a character.
- Masked entry: supports masked display characters for sensitive security PINs.
- `disabled` & `readOnly`: disables all slots simultaneously.

**Live demo variant:** `Masked entry`

## Accessibility

`OTPField` handles keyboard navigation transparently. Users can type characters continuously, press `Backspace` to delete and move back, or paste an entire multi-character code directly from the clipboard. Screen readers receive the consolidated value while focus transitions smoothly across slots.

**Live demo variant:** `Disabled`

## API & examples

Import `OTPField`, `OTPFieldInput`, and `OTPFieldSeparator` from `skytrack-ui/otp-field` or `@/components/ui/otp-field`. Key root props: `value`, `defaultValue`, `onValueChange`, `onComplete`, `maxLength`, `disabled`, and `readOnly`.

**Live demo variant:** `Controlled and complete`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./otp-field`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Each `OTPFieldInput` must provide an accurate sequential `index` matching its position up to `maxLength - 1`.
