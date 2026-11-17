import { DownloadIcon, PlusIcon, ShareNetworkIcon } from '@phosphor-icons/react'
import { SplitButton, SplitButtonAction, SplitButtonTrigger } from '@/components/ui/split-button'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import type { DemoMeta } from '@/showcase/demo'

const SIZES = [
  { size: 'xs', label: 'Extra small' },
  { size: 'sm', label: 'Small' },
  { size: 'default', label: 'Default' },
  { size: 'lg', label: 'Large' }
] as const

function RelatedActionsMenu() {
  return (
    <Menu>
      <MenuTrigger render={<SplitButtonTrigger aria-label='More actions' />} />
      <MenuPortal>
        <MenuPositioner side='bottom' align='end' sideOffset={4}>
          <MenuPopup>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Rename</MenuItem>
            <MenuSeparator />
            <MenuItem variant='destructive'>Archive</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

export const demo: DemoMeta = {
  id: 'split-button',
  title: 'Split Button',
  description: 'A primary action paired with a menu of related actions that share one control.',
  group: 'Actions',
  variants: [
    {
      name: 'Default',
      render: () => (
        <SplitButton variant='outline'>
          <SplitButtonAction>Save mission</SplitButtonAction>
          <RelatedActionsMenu />
        </SplitButton>
      )
    },
    {
      name: 'Leading icon',
      render: () => (
        <SplitButton variant='secondary'>
          <SplitButtonAction>
            <DownloadIcon aria-hidden='true' />
            Export
          </SplitButtonAction>
          <RelatedActionsMenu />
        </SplitButton>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='flex flex-col items-start gap-3'>
          {SIZES.map(({ size, label }) => (
            <div key={size} className='flex items-center gap-3'>
              <span className='w-24 text-xs sub-heading'>{label}</span>
              <SplitButton size={size}>
                <SplitButtonAction>
                  <PlusIcon aria-hidden='true' />
                  New
                </SplitButtonAction>
                <RelatedActionsMenu />
              </SplitButton>
            </div>
          ))}
        </div>
      )
    },
    {
      name: 'Variants',
      render: () => (
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <SplitButton variant='default'>
            <SplitButtonAction>Publish</SplitButtonAction>
            <RelatedActionsMenu />
          </SplitButton>
          <SplitButton variant='outline'>
            <SplitButtonAction>Share</SplitButtonAction>
            <RelatedActionsMenu />
          </SplitButton>
          <SplitButton variant='destructive'>
            <SplitButtonAction>Delete</SplitButtonAction>
            <RelatedActionsMenu />
          </SplitButton>
        </div>
      )
    },
    {
      name: 'Disabled action',
      render: () => (
        <SplitButton variant='outline'>
          <SplitButtonAction disabled>
            <ShareNetworkIcon aria-hidden='true' />
            Publish
          </SplitButtonAction>
          <RelatedActionsMenu />
        </SplitButton>
      )
    }
  ]
}
