import { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import { DemoFrame, UseCaseSection } from './shared'

export function OverflowDemo() {
  const [expanded, setExpanded] = useState(false)
  const description =
    'North coast survey covers the shoreline from the east access road to the protected wetland boundary. Review the complete route notes before assigning the flight plan.'
  return (
    <DemoFrame>
      <UseCaseSection
        title='Expand a long route note'
        scenario='Keep an overview readable, then let the pilot reveal the full description on demand.'
      >
        <p className={expanded ? '' : 'line-clamp-2'}>{description}</p>
        <Button size='sm' variant='ghost' aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      </UseCaseSection>
      <UseCaseSection
        title='Fit identifiers and links in compact layouts'
        scenario='Mission IDs and long URLs must fit a record row while their full values remain discoverable.'
      >
        <dl className='grid min-w-0 gap-3 sm:grid-cols-3'>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>End-line</dt>
            <dd className='truncate' title='mission-north-coast-survey-2026-0048'>
              mission-north-coast-survey-2026-0048
            </dd>
          </div>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>Mid-line</dt>
            <dd className='truncate' title='flight-plan-4829017356-revision-a'>
              flight-plan-4829017356-revision-a
            </dd>
          </div>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>Front-line</dt>
            <dd className='truncate text-right' dir='rtl'>
              <bdi dir='ltr' title='https://skytrack.example.com/missions/north-coast-survey'>
                https://skytrack.example.com/missions/north-coast-survey
              </bdi>
            </dd>
          </div>
        </dl>
      </UseCaseSection>
      <UseCaseSection
        title='Collapse long breadcrumb paths'
        scenario='Keep the current mission location visible while moving earlier workspace levels into an overflow menu.'
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Menu>
                <MenuTrigger
                  render={
                    <Button size='sm' variant='ghost' aria-label='Show earlier locations'>
                      …
                    </Button>
                  }
                />
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>Organization</MenuItem>
                      <MenuItem>Workspace</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#missions' />}>Missions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>North coast survey</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </UseCaseSection>
    </DemoFrame>
  )
}
