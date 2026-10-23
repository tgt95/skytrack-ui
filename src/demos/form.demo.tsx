import { useActionState, useRef, useState } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { FieldRoot, FieldLabel, FieldControl, FieldDescription, FieldError, FieldItem } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { RadioRoot, RadioGroup } from '@/components/ui/radio'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'

/** Mimics a server response for the homepage field. */
async function submitHomepage(value: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  try {
    const url = new URL(value)
    if (url.hostname.endsWith('example.com')) {
      return { error: 'The example domain is not allowed' }
    }
  } catch {
    return { error: 'This is not a valid URL' }
  }

  return { error: undefined }
}

function BasicForm() {
  const [errors, setErrors] = useState<Record<string, string | string[]>>({})
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className='w-64'
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const value = formData.get('url') as string

        setLoading(true)
        const response = await submitHomepage(value)
        setErrors(response.error ? { url: response.error } : {})
        setLoading(false)
      }}
    >
      <FieldRoot name='url'>
        <FieldLabel>Homepage</FieldLabel>
        <FieldControl
          type='url'
          required
          defaultValue='https://example.com'
          placeholder='https://example.com'
          pattern='https?://.*'
        />
        <FieldError />
      </FieldRoot>
      <Button type='submit' disabled={loading} focusableWhenDisabled>
        {loading && <CircleNotch className='animate-spin' />}
        {loading ? 'Submitting' : 'Submit'}
      </Button>
    </Form>
  )
}

interface ActionState {
  serverErrors?: Record<string, string | string[]>
}

/** Stand-in for a Server Function; mark with `'use server'` in a real framework. */
async function submitUsernameAction(_previousState: ActionState, formData: FormData) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  const username = formData.get('username') as string | null

  if (username === 'admin') {
    return { serverErrors: { username: "'admin' is reserved for system use" } }
  }

  const serverErrors: Record<string, string | string[]> = {}
  return { serverErrors }
}

function ActionStateForm() {
  const [state, formAction, loading] = useActionState<ActionState, FormData>(submitUsernameAction, {})

  return (
    <Form action={formAction} errors={state.serverErrors} className='w-64'>
      <FieldRoot name='username'>
        <FieldLabel>Username</FieldLabel>
        <FieldControl type='text' autoComplete='username' required defaultValue='admin' placeholder='e.g. alice132' />
        <FieldError />
      </FieldRoot>
      <Button type='submit' disabled={loading} focusableWhenDisabled>
        {loading && <CircleNotch className='animate-spin' />}
        {loading ? 'Submitting' : 'Submit'}
      </Button>
    </Form>
  )
}

function ObjectValuesForm() {
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null)

  return (
    <Form
      className='w-64'
      onFormSubmit={(formValues) => {
        // Transform the raw values before sending them to a 3rd party API.
        setSubmitted({
          product_id: formValues.id,
          order_quantity: formValues.quantity
        })
      }}
    >
      <FieldRoot name='id'>
        <FieldLabel>Product ID</FieldLabel>
        <Input placeholder='SKU-1024' />
      </FieldRoot>
      <FieldRoot name='quantity'>
        <FieldLabel>Quantity</FieldLabel>
        <Input type='number' placeholder='1' />
      </FieldRoot>
      <Button type='submit'>Place order</Button>
      {submitted && (
        <pre className='w-full overflow-auto border border-border p-2 text-xs'>
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </Form>
  )
}

/** Hand-written schema validation; the separate ZodForm demonstrates Zod integration. */
const schema = {
  name: (value: unknown) => (typeof value === 'string' && value.length > 0 ? undefined : ['Name is required']),
  age: (value: unknown) => {
    const age = typeof value === 'number' ? value : Number(value)
    if (Number.isNaN(age)) return ['Age must be a number']
    if (age <= 0) return ['Age must be a positive number']
    return undefined
  }
}

function SchemaForm() {
  const [errors, setErrors] = useState<Record<string, string | string[]>>({})

  return (
    <Form
      className='w-64'
      errors={errors}
      onFormSubmit={(formValues) => {
        const next: Record<string, string | string[]> = {}
        for (const [key, validate] of Object.entries(schema)) {
          const result = validate(formValues[key])
          if (result) next[key] = result
        }
        setErrors(next)
      }}
    >
      <FieldRoot name='name'>
        <FieldLabel>Name</FieldLabel>
        <FieldControl placeholder='Enter name' />
        <FieldError />
      </FieldRoot>
      <FieldRoot name='age'>
        <FieldLabel>Age</FieldLabel>
        <FieldControl placeholder='Enter age' />
        <FieldError />
      </FieldRoot>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

/** Real Zod schema — Base UI form docs, "Using with Zod". */
const zodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.coerce.number('Age must be a number').positive('Age must be a positive number')
})

type FormErrors = Record<string, string | string[]>
type ZodFormValues = z.infer<typeof zodSchema>

function ZodForm() {
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<ZodFormValues | null>(null)

  return (
    <Form
      className='w-64'
      errors={errors}
      onFormSubmit={(formValues) => {
        const result = zodSchema.safeParse(formValues)

        if (!result.success) {
          // Map z.flattenError(...).fieldErrors onto each field's `name`.
          const fieldErrors = z.flattenError(result.error).fieldErrors
          const nextErrors: FormErrors = {}
          for (const [name, messages] of Object.entries(fieldErrors)) {
            if (messages && messages.length > 0) {
              nextErrors[name] = messages
            }
          }
          setErrors(nextErrors)
          setSubmitted(null)
          return
        }

        setErrors({})
        setSubmitted(result.data)
      }}
    >
      <FieldRoot name='name'>
        <FieldLabel>Name</FieldLabel>
        <FieldControl placeholder='Enter name' />
        <FieldError />
      </FieldRoot>
      <FieldRoot name='age'>
        <FieldLabel>Age</FieldLabel>
        <FieldControl placeholder='Enter age' />
        <FieldError />
      </FieldRoot>
      <Button type='submit'>Submit</Button>
      {submitted && (
        <p className='text-sm text-muted-foreground'>
          Valid: {submitted.name} is {submitted.age}
        </p>
      )}
    </Form>
  )
}

function ImperativeValidationForm() {
  const actionsRef = useRef<{ validate: (fieldName?: string) => void } | null>(null)
  const [checked, setChecked] = useState(false)
  const [plan, setPlan] = useState('team')

  return (
    <Form
      className='w-72'
      actionsRef={actionsRef}
      onFormSubmit={() => {
        setChecked(true)
      }}
    >
      <FieldRoot name='workspace'>
        <FieldLabel>Workspace name</FieldLabel>
        <Input placeholder='SkyTrack' />
        <FieldDescription>Lowercase letters, numbers and dashes.</FieldDescription>
        <FieldError />
      </FieldRoot>

      <FieldRoot name='plan'>
        <FieldLabel>Plan</FieldLabel>
        <RadioGroup value={plan} onValueChange={(next) => setPlan(next as string)}>
          <label className='flex items-center gap-2 text-sm'>
            <RadioRoot value='team' />
            Team
          </label>
          <label className='flex items-center gap-2 text-sm'>
            <RadioRoot value='enterprise' />
            Enterprise
          </label>
        </RadioGroup>
      </FieldRoot>

      <FieldRoot name='notifications'>
        <FieldItem>
          <label className='flex items-center gap-2 text-sm'>
            <CheckboxRoot />
            Email me product updates
          </label>
        </FieldItem>
      </FieldRoot>

      <div className='flex gap-2'>
        <Button
          type='button'
          variant='outline'
          onClick={() => {
            actionsRef.current?.validate('workspace')
          }}
        >
          Validate workspace
        </Button>
        <Button type='submit'>Save</Button>
      </div>

      {checked && <p className='text-sm text-muted-foreground'>Form submitted.</p>}
    </Form>
  )
}

export const demo: DemoMeta = {
  id: 'form',
  title: 'Form',
  description: 'A native form element with consolidated error handling.',
  group: 'Forms',
  variants: [
    { name: 'Default', render: () => <BasicForm /> },
    { name: 'Submit with a Server Function', render: () => <ActionStateForm /> },
    {
      name: 'Submit form values as a JavaScript object',
      render: () => <ObjectValuesForm />
    },
    { name: 'Schema validation', render: () => <SchemaForm /> },
    { name: 'Using with Zod', render: () => <ZodForm /> },
    {
      name: 'Imperative validation (actionsRef)',
      render: () => <ImperativeValidationForm />
    }
  ]
}
