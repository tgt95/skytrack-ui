import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'toggle-group',
  title: 'Toggle Group',
  description:
    'A high-quality, unstyled React toggle group component that provides shared state to a series of toggle buttons.',
  group: 'Actions',
  variants: [
    {
      name: 'Single',
      render: () => (
        <ToggleGroup aria-label='Text alignment' defaultValue={['left']}>
          <Toggle aria-label='Align left' value='left'>
            <TextAlignLeftIcon />
          </Toggle>
          <Toggle aria-label='Align center' value='center'>
            <TextAlignCenterIcon />
          </Toggle>
          <Toggle aria-label='Align right' value='right'>
            <TextAlignRightIcon />
          </Toggle>
        </ToggleGroup>
      )
    },
    {
      name: 'Multiple',
      render: () => (
        <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label='Text formatting'>
          {['bold', 'italic', 'underline'].map((v) => (
            <Toggle key={v} aria-label={v} value={v}>
              {v[0].toUpperCase() + v.slice(1)}
            </Toggle>
          ))}
        </ToggleGroup>
      )
    },
    {
      name: 'Outline',
      render: () => (
        <ToggleGroup aria-label='Text alignment' variant='outline' defaultValue={['left']}>
          <Toggle aria-label='Align left' value='left'>
            <TextAlignLeftIcon />
          </Toggle>
          <Toggle aria-label='Align center' value='center'>
            <TextAlignCenterIcon />
          </Toggle>
          <Toggle aria-label='Align right' value='right'>
            <TextAlignRightIcon />
          </Toggle>
        </ToggleGroup>
      )
    },
    {
      name: 'Segmented inset',
      render: () => (
        <ToggleGroup aria-label='Avoid zone type' variant='segmented' size='xs' defaultValue={['obstacle']}>
          <Toggle value='obstacle'>Obstacle</Toggle>
          <Toggle value='privacy'>People / Privacy</Toggle>
        </ToggleGroup>
      )
    },
    {
      name: 'Vertical',
      render: () => (
        <ToggleGroup aria-label='Text alignment' orientation='vertical' defaultValue={['center']}>
          <Toggle aria-label='Align left' value='left'>
            <TextAlignLeftIcon />
          </Toggle>
          <Toggle aria-label='Align center' value='center'>
            <TextAlignCenterIcon />
          </Toggle>
          <Toggle aria-label='Align right' value='right'>
            <TextAlignRightIcon />
          </Toggle>
        </ToggleGroup>
      )
    }
  ]
}
