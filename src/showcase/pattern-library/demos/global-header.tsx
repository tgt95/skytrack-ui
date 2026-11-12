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
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import { GLOBAL_NAVIGATION_SCHEMES, DemoFrame, UseCaseSection } from './shared'

export function GlobalHeaderDemo() {
  const [configuration, setConfiguration] = useState<'header' | 'panel'>('header')
  const [organization, setOrganization] = useState<(typeof GLOBAL_NAVIGATION_SCHEMES)[number]['id']>('recent')
  const [headerMessage, setHeaderMessage] = useState('Current location: Missions / North coast survey')
  const [schemeMessage, setSchemeMessage] = useState('Choose a destination to preview this navigation scheme.')
  const activeScheme = GLOBAL_NAVIGATION_SCHEMES.find((scheme) => scheme.id === organization)!
  return (
    <DemoFrame>
      <UseCaseSection
        title='Global header with local mission navigation'
        scenario='Compare a workspace-wide header alone with the same header beside mission-specific destinations; keep utilities and product switching separate.'
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={configuration === 'header' ? 'secondary' : 'outline'}
            aria-pressed={configuration === 'header'}
            onClick={() => setConfiguration('header')}
          >
            Header only
          </Button>
          <Button
            size='sm'
            variant={configuration === 'panel' ? 'secondary' : 'outline'}
            aria-pressed={configuration === 'panel'}
            onClick={() => setConfiguration('panel')}
          >
            Header + left panel
          </Button>
        </div>
        <div className='overflow-hidden rounded-(--radius) border border-border'>
          <a
            href='#global-header-main-content'
            className='sr-only focus:not-sr-only focus:inline-flex focus:px-3 focus:py-2'
          >
            Skip to main content
          </a>
          <header className='flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-3'>
            <strong>SkyTrack Mission workspace</strong>
            <nav aria-label='Global navigation' className='flex flex-wrap gap-1'>
              <Button size='sm' variant='ghost' onClick={() => setHeaderMessage('Opened global Home.')}>
                Home
              </Button>
              <Button size='sm' variant='ghost' onClick={() => setHeaderMessage('Opened global Missions.')}>
                Missions
              </Button>
              <Menu>
                <MenuTrigger
                  render={
                    <Button size='sm' variant='outline'>
                      Utilities
                    </Button>
                  }
                />
                <MenuPortal>
                  <MenuPositioner side='bottom' align='end' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem onClick={() => setHeaderMessage('Notifications panel opened.')}>
                        Notifications · 2
                      </MenuItem>
                      <MenuItem onClick={() => setHeaderMessage('System settings opened.')}>System settings</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
              <Button size='sm' variant='ghost' onClick={() => setHeaderMessage('Product switcher opened.')}>
                Switch product
              </Button>
            </nav>
          </header>
          <div className='flex min-h-40'>
            {configuration === 'panel' && (
              <nav
                aria-label='Mission navigation'
                className='w-44 shrink-0 space-y-1 border-e border-border bg-muted/30 p-3'
              >
                <p className='sub-heading mb-2'>Missions</p>
                <Button
                  size='sm'
                  variant='secondary'
                  className='w-full justify-start'
                  onClick={() => setHeaderMessage('Viewing mission overview.')}
                >
                  Overview
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => setHeaderMessage('Viewing flight plans.')}
                >
                  Flight plans
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => setHeaderMessage('Viewing aircraft.')}
                >
                  Aircraft
                </Button>
              </nav>
            )}
            <main id='global-header-main-content' className='min-w-0 flex-1 space-y-3 p-4'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      render={
                        <a
                          href='#workspace'
                          onClick={(event) => {
                            event.preventDefault()
                            setHeaderMessage('Opened the local workspace overview preview.')
                          }}
                        />
                      }
                    >
                      Workspace
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      render={
                        <a
                          href='#missions'
                          onClick={(event) => {
                            event.preventDefault()
                            setHeaderMessage('Opened the local mission-list preview.')
                          }}
                        />
                      }
                    >
                      Missions
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>North coast survey</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Toolbar className='w-full justify-between'>
                <ToolbarButton onClick={() => setHeaderMessage('Opened the local mission overview.')}>
                  Overview
                </ToolbarButton>
                <ToolbarSeparator />
                <ToolbarButton onClick={() => setHeaderMessage('Opened the local mission settings.')}>
                  Settings
                </ToolbarButton>
              </Toolbar>
            </main>
          </div>
        </div>
        <p aria-live='polite' className='text-muted-foreground'>
          {headerMessage} · Global utilities stay consistent; local navigation changes with the product context.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Organize destinations around workspace or current mission'
        scenario='Compare five ways to group product destinations, and keep user-created mission records in a drill-down list instead of the global shell.'
      >
        <div className='flex flex-wrap gap-2'>
          {GLOBAL_NAVIGATION_SCHEMES.map((scheme) => (
            <Button
              key={scheme.id}
              size='sm'
              variant={organization === scheme.id ? 'secondary' : 'outline'}
              aria-pressed={organization === scheme.id}
              onClick={() => {
                setOrganization(scheme.id)
                setSchemeMessage(`Showing the ${scheme.label.toLowerCase()} navigation scheme.`)
              }}
            >
              {scheme.label}
            </Button>
          ))}
        </div>
        <nav
          aria-label={`${activeScheme.label} navigation preview`}
          className='flex flex-wrap gap-1 border border-border p-2'
        >
          {activeScheme.items.map((item, index) => (
            <Button
              key={item}
              size='sm'
              variant={index === 0 ? 'secondary' : 'ghost'}
              onClick={() => setSchemeMessage(`Opened ${item} in the ${activeScheme.label.toLowerCase()} preview.`)}
            >
              {item}
            </Button>
          ))}
        </nav>
        <p className='text-sm text-muted-foreground'>
          Keep the global shell bounded. Put growing user-created mission lists in a drill-down view with breadcrumbs.
        </p>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {schemeMessage}
        </p>
      </UseCaseSection>
    </DemoFrame>
  )
}
