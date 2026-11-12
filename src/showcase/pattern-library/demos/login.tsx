import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldControl, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function LoginDemo() {
  const [step, setStep] = useState<'email' | 'password' | 'verification'>('email')
  const [layout, setLayout] = useState<'centered' | 'split'>('centered')
  const [loginError, setLoginError] = useState(false)
  const [workEmail, setWorkEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('This form does not authenticate or send credentials.')
  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose a sign-in layout'
        scenario='Use a centered form for a focused entry point or a split layout when a short product introduction supports the task.'
      >
        <div className='flex flex-wrap gap-2'>
          {(['centered', 'split'] as const).map((value) => (
            <Button
              key={value}
              size='sm'
              variant={layout === value ? 'secondary' : 'outline'}
              aria-pressed={layout === value}
              onClick={() => setLayout(value)}
            >
              {value === 'centered' ? 'Centered form' : 'Split welcome'}
            </Button>
          ))}
        </div>
        <div
          role='region'
          aria-label='Sign-in layout preview'
          className={`grid w-full gap-3 rounded-(--radius) border border-border p-4 ${layout === 'centered' ? 'mx-auto max-w-sm justify-items-center text-center' : 'sm:grid-cols-2 sm:items-start'}`}
        >
          {layout === 'split' && (
            <div className='space-y-2'>
              <p className='text-muted-foreground'>SkyTrack workspace</p>
              <p>Plan and review missions with your team.</p>
            </div>
          )}
          <div className='w-full space-y-2'>
            <p className='font-medium'>Log in</p>
            <Input aria-label='Preview work email' placeholder='Work email' readOnly />
            <Button disabled className='w-full'>
              Continue
            </Button>
          </div>
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {layout === 'centered'
            ? 'Centered form preview: focused entry without extra introduction.'
            : 'Split welcome preview: a short product introduction sits beside the sign-in form.'}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Authenticate progressively and recover from an error'
        scenario='Request work email first, then show the password or organization SSO path, an optional verification step, and clear recovery actions.'
      >
        <div className='mx-auto grid w-full max-w-md gap-4 rounded-(--radius) border border-border p-5'>
          <div>
            <p className='text-muted-foreground'>SkyTrack workspace</p>
            <h4 className='font-medium'>Log in</h4>
            <p className='text-muted-foreground'>
              {step === 'email'
                ? 'Enter your work email to continue.'
                : step === 'password'
                  ? 'Enter the password for this sample account.'
                  : 'Enter the one-time verification code.'}
            </p>
          </div>
          <form
            className='grid gap-4 md:max-w-md'
            onSubmit={(event) => {
              event.preventDefault()
              if (step === 'email') {
                setStep('password')
                setLoginError(false)
                setMessage('The preview moved to the password step without checking whether this account exists.')
              } else if (step === 'password') {
                setStep('verification')
                setPassword('')
                setMessage('Illustrative verification step shown. No credentials were checked and no sign-in occurred.')
              } else {
                setStep('email')
                setPassword('')
                setMessage('The sample flow ended. No sign-in was attempted.')
              }
            }}
          >
            {loginError && (
              <Alert variant='destructive'>
                <AlertDescription>Incorrect ID or password. Try again.</AlertDescription>
              </Alert>
            )}
            {step === 'email' ? (
              <FieldRoot>
                <FieldLabel>Work email</FieldLabel>
                <FieldControl
                  render={
                    <Input
                      type='email'
                      autoComplete='username'
                      placeholder='name@example.com'
                      aria-label='Work email'
                      value={workEmail}
                      onChange={(event) => {
                        setWorkEmail(event.target.value)
                        setLoginError(false)
                      }}
                    />
                  }
                />
              </FieldRoot>
            ) : (
              <div className='space-y-1 rounded-(--radius) border border-border p-3'>
                <p className='text-xs text-muted-foreground'>Work email</p>
                <p className='break-all'>{workEmail || 'pilot@example.com'}</p>
              </div>
            )}
            {step === 'password' && (
              <>
                <FieldRoot>
                  <FieldLabel>Password</FieldLabel>
                  <FieldControl
                    render={
                      <Input
                        type='password'
                        autoComplete='current-password'
                        placeholder='Enter a password'
                        aria-label='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    }
                  />
                </FieldRoot>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => setMessage('Password recovery link selected; no email was sent.')}
                >
                  Forgot password?
                </Button>
              </>
            )}
            {step === 'verification' && (
              <div className='space-y-3'>
                <Badge count='Illustrative · MFA guidance not standardized' status='outline' />
                <FieldRoot>
                  <FieldLabel>Verification code</FieldLabel>
                  <FieldControl
                    render={
                      <Input
                        inputMode='numeric'
                        autoComplete='one-time-code'
                        placeholder='123 456'
                        aria-label='Verification code'
                      />
                    }
                  />
                </FieldRoot>
              </div>
            )}
            <Button type='submit'>
              {step === 'email' ? 'Continue' : step === 'password' ? 'Continue to verification' : 'Finish preview'}
            </Button>
          </form>
          {step !== 'email' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setStep('email')
                setPassword('')
                setLoginError(false)
                setMessage('Returned to the work email step.')
              }}
            >
              Change email
            </Button>
          )}
          {step === 'password' && (
            <Button
              size='sm'
              variant='ghost'
              onClick={() => {
                setPassword('')
                setStep('email')
                setLoginError(true)
                setMessage('The sample returned to work email entry after a credential error; password was cleared.')
              }}
            >
              Preview credential error
            </Button>
          )}
          {step === 'email' && (
            <div className='border-t border-border pt-3'>
              <p className='mb-2 text-muted-foreground'>Alternative method</p>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setMessage('Organization SSO selected. No authentication occurred.')}
              >
                Continue with organization SSO
              </Button>
            </div>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {message}
        </p>
      </UseCaseSection>
    </DemoFrame>
  )
}
