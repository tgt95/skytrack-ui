import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import {
  Popover,
  PopoverDescription,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger
} from '@/components/ui/popover'
import { FILTER_ITEMS, DemoFrame, UseCaseSection } from './shared'
import { CaretDownIcon } from '@phosphor-icons/react'

export function DisclosuresDemo() {
  const [profileNotice, setProfileNotice] = useState('Choose a profile action to preview its result.')
  const [creationNotice, setCreationNotice] = useState('Choose a create action to preview its result.')
  const [pendingCategories, setPendingCategories] = useState<string[]>(['Planning'])
  const [appliedCategories, setAppliedCategories] = useState<string[]>(['Planning'])
  const [routeNotesOpen, setRouteNotesOpen] = useState(false)
  const filteredMissions =
    appliedCategories.length === 0
      ? FILTER_ITEMS
      : FILTER_ITEMS.filter((mission) => appliedCategories.includes(mission.category))

  return (
    <DemoFrame>
      <UseCaseSection
        title='Profile menu · account actions'
        scenario='Keep profile-level actions close to the person and their current workspace.'
      >
        <Menu>
          <MenuTrigger render={<Button variant='outline'>Tuan Trinh · Account</Button>} />
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={4}>
              <MenuPopup>
                <MenuItem onClick={() => setProfileNotice('Profile settings opened in the local example.')}>
                  Profile settings
                </MenuItem>
                <MenuItem onClick={() => setProfileNotice('Account security opened in the local example.')}>
                  Account security
                </MenuItem>
                <MenuItem onClick={() => setProfileNotice('Signed out of this local sample.')}>Sign out</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {profileNotice}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Settings and filter menu · change a view'
        scenario='Stage related display filters in a compact popover, apply them together, and inspect the updated mission list.'
      >
        <div className='space-y-3'>
          <Popover>
            <PopoverTrigger
              render={<Button variant='outline'>Mission filters · {appliedCategories.length} applied</Button>}
            />
            <PopoverPortal>
              <PopoverPositioner side='bottom' align='start' sideOffset={4}>
                <PopoverPopup className='w-72 gap-3'>
                  <div className='space-y-1'>
                    <PopoverTitle>Filter missions</PopoverTitle>
                    <PopoverDescription>Choose categories, then apply them together.</PopoverDescription>
                  </div>
                  <CheckboxGroup
                    aria-label='Mission categories'
                    value={pendingCategories}
                    onValueChange={(value) => setPendingCategories(value as string[])}
                  >
                    {['Planning', 'Review', 'Complete'].map((category) => (
                      <label key={category} className='flex cursor-pointer items-center gap-2'>
                        <CheckboxRoot value={category} aria-label={category} />
                        {category}
                      </label>
                    ))}
                  </CheckboxGroup>
                  <div className='flex justify-between gap-2 border-t border-border pt-3'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => {
                        setPendingCategories([])
                        setAppliedCategories([])
                      }}
                    >
                      Reset
                    </Button>
                    <Button size='sm' onClick={() => setAppliedCategories(pendingCategories)}>
                      Apply filters
                    </Button>
                  </div>
                </PopoverPopup>
              </PopoverPositioner>
            </PopoverPortal>
          </Popover>
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {appliedCategories.length
              ? `${filteredMissions.length} missions match: ${appliedCategories.join(', ')}.`
              : `Showing all ${FILTER_ITEMS.length} sample missions.`}
          </p>
          <ul aria-label='Filtered sample missions' className='divide-y divide-border border-y border-border'>
            {filteredMissions.map((mission) => (
              <li key={mission.name} className='flex flex-wrap items-center justify-between gap-2 py-2'>
                <span>{mission.name}</span>
                <Badge count={mission.category} status='outline' />
              </li>
            ))}
          </ul>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Combo button · primary action plus alternatives'
        scenario='Keep the most common creation action visible and place related alternatives in its adjacent menu.'
      >
        <div className='inline-flex items-stretch'>
          <Button className='rounded-e-none' onClick={() => setCreationNotice('Created a blank local flight plan.')}>
            Create flight plan
          </Button>
          <Menu>
            <MenuTrigger
              render={
                <Button variant='outline' aria-label='More create options' className='rounded-s-none border-s-0'>
                  <CaretDownIcon />
                </Button>
              }
            />
            <MenuPortal>
              <MenuPositioner side='bottom' align='end' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setCreationNotice('Created a flight plan from the local template.')}>
                    From template
                  </MenuItem>
                  <MenuItem onClick={() => setCreationNotice('Started importing a sample route.')}>
                    Import route
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {creationNotice}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Inline disclosure · supporting details'
        scenario='Reveal secondary route-note metadata beside the mission while keeping the primary record easy to scan.'
      >
        <Collapsible open={routeNotesOpen} onOpenChange={setRouteNotesOpen}>
          <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 border border-border px-4 py-3 text-left'>
            Route notes <span aria-hidden='true'>{routeNotesOpen ? '−' : '+'}</span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className='space-y-2 border border-t-0 border-border px-4 py-3'>
              <p>Survey area: North coast · route revision: 3</p>
              <p className='text-muted-foreground'>Last updated 10:42 · sample metadata only.</p>
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </UseCaseSection>
    </DemoFrame>
  )
}
