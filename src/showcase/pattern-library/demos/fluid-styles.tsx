import { Button } from '@/components/ui/button'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function FluidStylesDemo() {
  return (
    <DemoFrame>
      <UseCaseSection
        title='Match action width to the task'
        scenario='Compare a content-sized secondary action with a full-width primary action in a mission setup.'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2 border border-border p-3'>
            <p className='font-medium'>Productive form</p>
            <Input placeholder='Workspace name' aria-label='Workspace name' readOnly />
            <Button variant='outline' disabled>
              Continue
            </Button>
          </div>
          <div className='flex flex-col justify-between gap-3 border border-border p-3'>
            <div>
              <p className='font-medium'>Expressive call to action</p>
              <p className='text-muted-foreground'>Use in a spacious, high-emphasis moment.</p>
            </div>
            <Button className='w-full' disabled>
              Explore missions
            </Button>
          </div>
        </div>
        <p className='text-sm text-muted-foreground'>
          Compare the content-sized action with the button that fills its container.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Align related actions in a compact panel'
        scenario='Attach related actions to a panel footer so they share its full width instead of floating in the content area.'
      >
        <div className='w-full max-w-md overflow-hidden border border-border'>
          <div className='space-y-1 p-4'>
            <p className='font-medium'>Route review</p>
            <p className='text-sm text-muted-foreground'>Two related next steps for this mission.</p>
          </div>
          <div className='grid grid-cols-2 border-t border-border'>
            <Button variant='outline' className='w-full rounded-none border-0' disabled>
              Save draft
            </Button>
            <Button variant='outline' className='w-full rounded-none border-0 border-s-2 border-foreground' disabled>
              Preview
            </Button>
          </div>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Let a fluid form follow its available width'
        scenario='A workspace setup form should fill its parent column instead of relying on a fixed control width.'
      >
        <FieldRoot className='w-full max-w-none'>
          <FieldLabel>Workspace name</FieldLabel>
          <Input className='w-full' placeholder='e.g. Coastal operations' readOnly />
          <FieldDescription>
            The component has no special fluid prop; apply the supported width utility in context.
          </FieldDescription>
        </FieldRoot>
      </UseCaseSection>
      <UseCaseSection
        title='Attach a simple form to its container edges'
        scenario='A quick workspace invite uses a compact, stacked group inside one border; keep each field label visible and reserve flush fluid inputs for implementations that support them.'
      >
        <div className='w-full max-w-md overflow-hidden border border-border'>
          <label className='block space-y-1 border-b border-border p-2 text-sm'>
            <span>Teammate email</span>
            <Input
              className='rounded-none border-0 px-0'
              aria-label='Teammate email'
              value='dispatcher@example.com'
              readOnly
            />
          </label>
          <label className='block space-y-1 border-b border-border p-2 text-sm'>
            <span>Mission role</span>
            <Input className='rounded-none border-0 px-0' aria-label='Mission role' value='Pilot' readOnly />
          </label>
          <Button className='w-full rounded-none' disabled>
            Send invitation
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>
          This card keeps external labels visible. Exact zero-gap fluid inputs with internal labels need a dedicated
          field implementation.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Choose a fluid container or fixed side panel'
        scenario='Use a responsive modal-like region for short tasks, while a side panel keeps a stable width alongside the workspace.'
      >
        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='w-full border border-border p-3'>
            <p className='font-medium'>Fluid task area</p>
            <p className='text-muted-foreground'>Follows the available column width.</p>
          </div>
          <div className='w-full max-w-xs border border-border p-3'>
            <p className='font-medium'>Fixed-width panel</p>
            <p className='text-muted-foreground'>Keeps a bounded reading and form width.</p>
          </div>
        </div>
      </UseCaseSection>
    </DemoFrame>
  )
}
