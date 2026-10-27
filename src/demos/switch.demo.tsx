import { Switch, SwitchThumb } from '@/components/ui/switch'
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
        <label className='flex items-center gap-2 text-sm'>
          <Switch defaultChecked>
            <SwitchThumb />
          </Switch>
          Notifications
        </label>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <div className='flex flex-col gap-4 text-sm'>
          <div className='flex items-center gap-2'>
            <label htmlFor='notifications-switch'>Notifications</label>
            <Switch id='notifications-switch' nativeButton render={<button />}>
              <SwitchThumb />
            </Switch>
          </div>
          <Switch
            nativeButton
            render={(buttonProps) => (
              <label className='flex items-center gap-2'>
                <button {...buttonProps} />
                Notifications
              </label>
            )}
          >
            <SwitchThumb />
          </Switch>
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
          <label className='flex items-center gap-2'>
            <Switch name='notifications' defaultChecked>
              <SwitchThumb />
            </Switch>
            Notifications
          </label>
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
          <label className='flex items-center gap-2'>
            <Switch disabled>
              <SwitchThumb />
            </Switch>
            Disabled off
          </label>
          <label className='flex items-center gap-2'>
            <Switch disabled defaultChecked>
              <SwitchThumb />
            </Switch>
            Disabled on
          </label>
        </div>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='flex flex-col gap-3 text-sm'>
          <label className='flex items-center gap-2'>
            <Switch size='sm' defaultChecked>
              <SwitchThumb />
            </Switch>
            Small
          </label>
          <label className='flex items-center gap-2'>
            <Switch defaultChecked>
              <SwitchThumb />
            </Switch>
            Default
          </label>
        </div>
      )
    }
  ]
}
