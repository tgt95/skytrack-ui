import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function DisabledStatesDemo() {
  return (
    <DemoFrame>
      <UseCaseSection
        title='Default disabled · missing prerequisite'
        scenario='Launch is unavailable until an aircraft is connected; keep the reason beside the action.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Flight plan</FieldLabel>
          <Input value='North coast survey' readOnly />
          <Button disabled>Launch mission</Button>
          <FieldDescription>Connect an aircraft before launch is available.</FieldDescription>
        </FieldRoot>
      </UseCaseSection>

      <UseCaseSection
        title='Disabled with a warning · unsaved prerequisite'
        scenario='Unsaved route edits block the primary scheduling action; explain what needs to happen before the user can continue.'
      >
        <div className='w-full max-w-xl space-y-3'>
          <Alert variant='warning'>
            <AlertTitle>Save the route before continuing</AlertTitle>
            <AlertDescription>The current route has unsaved changes. Save them before scheduling.</AlertDescription>
          </Alert>
          <Button disabled className='w-full sm:w-auto'>
            Continue to scheduling
          </Button>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Read-only · value is available for review'
        scenario='Keep the value selectable and understandable when the user cannot edit it.'
      >
        <div className='grid gap-3 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel>Workspace role</FieldLabel>
            <Input value='Viewer' readOnly />
            <FieldDescription>You can review this value but cannot change it.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Aircraft registration</FieldLabel>
            <Input value='N204ST' readOnly />
            <FieldDescription>Assigned by the fleet administrator.</FieldDescription>
          </FieldRoot>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Hidden · action is outside this role’s permissions'
        scenario='Do not show an action the user cannot access; explain the role boundary in context.'
      >
        <div className='space-y-2 rounded-(--radius) border border-border p-3'>
          <p className='font-medium'>Sharing controls</p>
          <p className='text-muted-foreground'>
            This Viewer account does not have access to team sharing actions. Ask a workspace administrator for access.
          </p>
          <p className='text-xs text-muted-foreground'>The Share action is omitted for this role.</p>
        </div>
      </UseCaseSection>

      <p className='text-muted-foreground'>
        Disabled explains a temporary blocker; read-only keeps information available; hidden removes an unavailable
        action from this view.
      </p>
    </DemoFrame>
  )
}
