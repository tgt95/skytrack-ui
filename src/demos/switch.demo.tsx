import { Switch, SwitchThumb } from '@/components/ui/switch'
import { FieldRoot, FieldLabel } from '@/components/ui/field'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'switch',
  title: 'Switch',
  description: 'A high-quality, unstyled React switch component that indicates whether a setting is on or off.',
  group: 'Forms',
  variants: [
    {
      name: 'Labeling a switch',
      render: () => (
        <FieldRoot className='flex-row items-center gap-2'>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <Switch defaultChecked>
              <SwitchThumb />
            </Switch>
            Notifications
          </FieldLabel>
        </FieldRoot>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <div className='flex flex-col gap-4 text-sm'>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel nativeLabel={false} render={<span />}>
              Notifications
            </FieldLabel>
            <Switch id='notifications-switch' nativeButton render={<button />}>
              <SwitchThumb />
            </Switch>
          </FieldRoot>
          <FieldRoot className='flex-row items-center gap-2'>
            <Switch nativeButton render={(buttonProps) => <button {...buttonProps} />}>
              <SwitchThumb />
            </Switch>
            <FieldLabel nativeLabel={false} render={<span />}>
              Notifications
            </FieldLabel>
          </FieldRoot>
        </div>
      )
    },
    {
      name: 'Form integration',
      render: () => (
        <form
          className='flex items-center gap-2 text-sm'
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            console.log('notifications:', data.get('notifications'))
          }}
        >
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <Switch name='notifications' defaultChecked>
                <SwitchThumb />
              </Switch>
              Notifications
            </FieldLabel>
          </FieldRoot>
          <button type='submit' className='rounded-(--radius) border border-border px-2 py-1'>
            Submit
          </button>
        </form>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <div className='flex flex-col gap-3 text-sm'>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <Switch disabled>
                <SwitchThumb />
              </Switch>
              Disabled off
            </FieldLabel>
          </FieldRoot>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <Switch disabled defaultChecked>
                <SwitchThumb />
              </Switch>
              Disabled on
            </FieldLabel>
          </FieldRoot>
        </div>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='flex flex-col gap-3 text-sm'>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <Switch size='sm' defaultChecked>
                <SwitchThumb />
              </Switch>
              Small
            </FieldLabel>
          </FieldRoot>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <Switch defaultChecked>
                <SwitchThumb />
              </Switch>
              Default
            </FieldLabel>
          </FieldRoot>
        </div>
      )
    }
  ]
}
