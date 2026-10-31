# OTP Field

> A short, segmented field for entering a one-time verification code.

- Package version: `0.1.5`
- Public export: `skytrack-ui/otp-field`
- Implementation: [`src/components/ui/otp-field.tsx`](../../src/components/ui/otp-field.tsx)
- Public type declaration: [`dist-lib/components/ui/otp-field.d.ts`](../../dist-lib/components/ui/otp-field.d.ts)
- Showcase demo id: `otp-field`
- Closest demo: [`src/demos/otp-field.demo.tsx`](../../src/demos/otp-field.demo.tsx)
- Official guidance: [W3C WebOTP / SMS OTP Form Guidelines](https://web.dev/articles/sms-otp-form)

## Usage

Use OTP Field for a short verification code made of a fixed number of characters, such as a sign-in or account recovery code.

Avoid OTP Field for arbitrary-length passwords, standard usernames, or general alphanumeric strings.

The best alternative for standard password entry or alphanumeric tokens with variable length is Input.

**Live demo variant:** `Demo`

## Behavior

Move people through the code as they type, and let Backspace return to the previous character.

Allow people to paste the full code at once and continue as soon as all characters are entered.

**Live demo variant:** `Controlled and complete`

## Layout

Center the OTP Field prominently within dedicated authentication cards, pairing dialogs, or verification screens.

Group a longer code into readable chunks. Leave clear space around the field, and show the numeric keypad on touch devices when the code contains only digits.

| Do                                             | Don't                                                    | Why                                                          |
| ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| Let people paste the full code into the field. | Require them to type each character into a separate box. | Pasting is faster and reduces errors with short-lived codes. |

**Live demo variant:** `Grouped layouts`

## Accessibility

Give the verification field a clear name and announce completion. Users can move between slots with arrow keys and correct the previous character with Backspace.

**Live demo variant:** `Labeling an OTP field`

## Content

Explain where the code came from and how many characters to enter (e.g., “Enter the 6-digit code sent to your email”).

Include a "Resend code" secondary action link below the input to support recovery when codes expire.

**Live demo variant:** `Placeholder hints`
