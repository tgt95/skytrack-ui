import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { FieldDescription, FieldError, FieldItem, FieldLabel, FieldRoot } from '@/components/ui/field'
import { FieldsetLegend, FieldsetRoot } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
import { DemoFrame, UseCaseSection } from './shared'

export function FormsDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [nameTouched, setNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [validationEmail, setValidationEmail] = useState('')
  const [validationTouched, setValidationTouched] = useState(false)
  const [validationSubmitted, setValidationSubmitted] = useState(false)
  const [serverRejected, setServerRejected] = useState(false)
  const [longFormStep, setLongFormStep] = useState(1)
  const [longFormValues, setLongFormValues] = useState({
    purpose: '',
    requestedDate: '',
    aircraft: '',
    checklistOwner: ''
  })
  const [checks, setChecks] = useState(['weather', 'airspace'])
  const invalidName = (submitted || nameTouched) && !name.trim()
  const invalidEmail = (submitted || emailTouched) && !email.includes('@')
  const invalidValidationEmail = (validationSubmitted || validationTouched) && !validationEmail.includes('@')

  return (
    <DemoFrame>
      <UseCaseSection
        title='Collect mission contact details'
        scenario='Ask for required contact information first, distinguish optional notes, and explain field expectations.'
      >
        <form
          className='grid min-w-0 gap-4 md:max-w-2xl'
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <FieldsetRoot>
            <FieldsetLegend>Mission contact</FieldsetLegend>
            <div className='grid gap-4'>
              <FieldRoot invalid={invalidName}>
                <FieldLabel>Contact name</FieldLabel>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => setNameTouched(true)}
                  aria-invalid={invalidName}
                  placeholder='Name'
                />
                <FieldError match={invalidName}>Enter a contact name.</FieldError>
              </FieldRoot>
              <FieldRoot invalid={invalidEmail}>
                <FieldLabel>Email address</FieldLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={invalidEmail}
                  placeholder='name@example.com'
                />
                <FieldDescription>Use an address that can receive mission updates.</FieldDescription>
                <FieldError match={invalidEmail}>Enter a valid email address.</FieldError>
              </FieldRoot>
            </div>
            <FieldRoot>
              <FieldLabel>Access notes (optional)</FieldLabel>
              <Input
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder='Add relevant access details'
              />
              <FieldDescription>Only include information needed for this mission.</FieldDescription>
            </FieldRoot>
          </FieldsetRoot>
          <div className='flex flex-wrap items-center gap-3'>
            <Button type='submit'>Save contact details</Button>
            {submitted && !invalidName && !invalidEmail && (
              <p role='status'>Contact details are valid. Nothing was submitted.</p>
            )}
          </div>
        </form>
      </UseCaseSection>
      <UseCaseSection
        title='Validate and recover from missing information'
        scenario='Enter an invalid email and leave the field to see its inline error; correct it or clear it, then compare a simulated server rejection.'
      >
        <div className='grid min-w-0 gap-4 md:max-w-xl'>
          <FieldRoot invalid={invalidValidationEmail}>
            <FieldLabel>Notification email</FieldLabel>
            <Input
              type='email'
              value={validationEmail}
              onChange={(event) => {
                setValidationEmail(event.target.value)
                setServerRejected(false)
              }}
              onBlur={() => setValidationTouched(true)}
              aria-invalid={invalidValidationEmail}
              placeholder='pilot@example.com'
            />
            <FieldDescription>Used only to illustrate client-side email validation.</FieldDescription>
            <FieldError match={invalidValidationEmail}>Enter an email address that includes @.</FieldError>
          </FieldRoot>
          <div className='flex flex-wrap items-center gap-3'>
            <Button type='button' onClick={() => setValidationSubmitted(true)}>
              Validate email
            </Button>
            <Button
              type='button'
              variant='outline'
              disabled={!validationEmail && !validationSubmitted && !validationTouched && !serverRejected}
              onClick={() => {
                setValidationEmail('')
                setValidationSubmitted(false)
                setValidationTouched(false)
                setServerRejected(false)
              }}
            >
              Clear email
            </Button>
            <Button type='button' variant='outline' onClick={() => setServerRejected(true)}>
              Simulate server rejection
            </Button>
          </div>
          {validationSubmitted && !invalidValidationEmail && (
            <p role='status'>Email format is valid. No request was sent.</p>
          )}
          {serverRejected && (
            <Alert variant='destructive'>
              <AlertTitle>Service could not save this sample</AlertTitle>
              <AlertDescription>Check mission access or try again later. No request was sent.</AlertDescription>
            </Alert>
          )}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Break a long mission request into steps'
        scenario='Keep a detailed request manageable by grouping mission details and safety checks into separate steps.'
      >
        <Progress value={longFormStep * 50}>
          <ProgressLabel>Mission request</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        {longFormStep === 1 ? (
          <FieldsetRoot>
            <FieldsetLegend>Mission details</FieldsetLegend>
            <FieldRoot>
              <FieldLabel>Purpose</FieldLabel>
              <Input
                value={longFormValues.purpose}
                onChange={(event) => setLongFormValues((values) => ({ ...values, purpose: event.target.value }))}
                placeholder='Coastal mapping'
              />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Requested date</FieldLabel>
              <Input
                type='date'
                value={longFormValues.requestedDate}
                onChange={(event) => setLongFormValues((values) => ({ ...values, requestedDate: event.target.value }))}
              />
            </FieldRoot>
          </FieldsetRoot>
        ) : (
          <FieldsetRoot>
            <FieldsetLegend>Safety review</FieldsetLegend>
            <FieldRoot>
              <FieldLabel>Aircraft</FieldLabel>
              <Input
                value={longFormValues.aircraft}
                onChange={(event) => setLongFormValues((values) => ({ ...values, aircraft: event.target.value }))}
                placeholder='Choose an aircraft'
              />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Launch checklist</FieldLabel>
              <Input
                value={longFormValues.checklistOwner}
                onChange={(event) => setLongFormValues((values) => ({ ...values, checklistOwner: event.target.value }))}
                placeholder='Confirm checklist owner'
              />
            </FieldRoot>
          </FieldsetRoot>
        )}
        <div className='flex flex-wrap justify-end gap-2'>
          <Button type='button' variant='outline' disabled={longFormStep === 1} onClick={() => setLongFormStep(1)}>
            Previous stage
          </Button>
          <Button type='button' onClick={() => setLongFormStep(longFormStep === 1 ? 2 : 1)}>
            {longFormStep === 1 ? 'Continue to safety' : 'Review request'}
          </Button>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Select optional checks for a mission request'
        scenario='Let the planner choose any applicable review steps, while clear labels and helper text explain what each option changes.'
      >
        <FieldRoot>
          <FieldLabel nativeLabel={false} render={<span>Additional reviews</span>} />
          <CheckboxGroup aria-label='Additional mission reviews' value={checks} onValueChange={setChecks}>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='weather' /> Weather window review
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='airspace' /> Airspace coordination
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='observer' /> Observer assignment
              </FieldLabel>
            </FieldItem>
          </CheckboxGroup>
          <FieldDescription>
            These example options demonstrate multi-select behavior; they do not define which reviews a mission
            requires.
          </FieldDescription>
        </FieldRoot>
      </UseCaseSection>
    </DemoFrame>
  )
}
