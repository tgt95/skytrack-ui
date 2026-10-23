import * as React from 'react'
import { CaretRight } from '@phosphor-icons/react'
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu'
import { ScrollArea, ScrollAreaContent, ScrollAreaThumb, ScrollAreaViewport } from '@/components/ui/scroll-area'
import type { DemoMeta } from '@/showcase/demo'

type LinkEntry = { title: string; href: string; description: string }

const OVERVIEW_LINKS: LinkEntry[] = [
  {
    title: 'Flight search',
    href: '#navigation-menu-search',
    description: 'Query active flights by route, callsign or registration.'
  },
  {
    title: 'Live map',
    href: '#navigation-menu-map',
    description: 'Watch aircraft positions update in real time.'
  },
  {
    title: 'Tracked aircraft',
    href: '#navigation-menu-tracked',
    description: 'Manage the aircraft you follow across sessions.'
  },
  {
    title: 'Alerts',
    href: '#navigation-menu-alerts',
    description: 'Configure notifications for squawks and handoff events.'
  }
]

const HANDBOOK_LINKS: LinkEntry[] = [
  {
    title: 'Getting started',
    href: '#navigation-menu-started',
    description: 'Install the design system and render your first component.'
  },
  {
    title: 'Theming',
    href: '#navigation-menu-theming',
    description: 'Swap theme tokens without touching component markup.'
  },
  {
    title: 'Accessibility',
    href: '#navigation-menu-a11y',
    description: 'Keyboard, focus ring and screen reader conventions.'
  }
]

const LARGE_LINKS: LinkEntry[] = Array.from({ length: 18 }, (_, index) => ({
  title: `Airport ${index + 1}`,
  href: `#navigation-menu-airport-${index + 1}`,
  description: `Operational details and recent movements for airport ${index + 1}.`
}))

function LinkCards({ links, heading }: { links: LinkEntry[]; heading?: string }) {
  return (
    <ul className='m-0 grid list-none grid-cols-1 gap-1 p-0 sm:grid-cols-2'>
      {heading && (
        <li className='col-span-full px-2 pt-1 pb-0.5 text-xs font-medium tracking-wide text-muted-foreground'>
          {heading}
        </li>
      )}
      {links.map((link) => (
        <li key={link.href}>
          <NavigationMenuLink href={link.href}>
            <h3 className='m-0 mb-1 text-sm leading-4 font-medium'>{link.title}</h3>
            <p className='m-0 text-sm text-muted-foreground'>{link.description}</p>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ Default */

function DefaultNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Overview
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <LinkCards links={OVERVIEW_LINKS} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Handbook
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <LinkCards links={HANDBOOK_LINKS} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href='https://base-ui.com' target='_blank' rel='noreferrer'>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: 'none' }}
        >
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/* ---------------------------------------------------------- Nested submenus */

function NestedNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Product
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='m-0 grid list-none grid-cols-1 gap-1 p-0 sm:grid-cols-2'>
              {OVERVIEW_LINKS.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink href={link.href}>
                    <h3 className='m-0 mb-1 text-sm leading-4 font-medium'>{link.title}</h3>
                    <p className='m-0 text-sm text-muted-foreground'>{link.description}</p>
                  </NavigationMenuLink>
                </li>
              ))}
              <li>
                <NavigationMenu orientation='vertical'>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className='justify-between'>
                        Handbook
                        <NavigationMenuIcon>
                          <CaretRight className='transition-transform duration-200' />
                        </NavigationMenuIcon>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='w-[min(20rem,80vw)]'>
                        <ul className='m-0 flex list-none flex-col gap-1 p-0'>
                          {HANDBOOK_LINKS.map((link) => (
                            <li key={link.href}>
                              <NavigationMenuLink href={link.href}>
                                <h3 className='m-0 mb-1 text-sm leading-4 font-medium'>{link.title}</h3>
                                <p className='m-0 text-sm text-muted-foreground'>{link.description}</p>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>

                  <NavigationMenuPortal>
                    <NavigationMenuPositioner side='right' align='start' sideOffset={8} alignOffset={-8}>
                      <NavigationMenuPopup>
                        <NavigationMenuViewport />
                      </NavigationMenuPopup>
                    </NavigationMenuPositioner>
                  </NavigationMenuPortal>
                </NavigationMenu>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={10} align='start'>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/* ---------------------------------------------------- Nested inline submenus */

function NestedInlineNavigationMenu() {
  return (
    <NavigationMenu defaultValue='overview' orientation='vertical'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='overview'>
            Overview
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <LinkCards links={OVERVIEW_LINKS} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger value='handbook'>
            Handbook
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <LinkCards links={HANDBOOK_LINKS} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* No second Portal: the second level renders inline in the same panel. */}
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}

/* ------------------------------------------------------------- Custom links */

function CustomLink({ children, ...props }: React.ComponentProps<typeof NavigationMenuLink>) {
  return (
    <NavigationMenuLink
      render={
        // Swap this for your framework's link component for client-side routing,
        // e.g. `render={<NextLink href={props.href} />}`.
        <a />
      }
      {...props}
    >
      {children}
    </NavigationMenuLink>
  )
}

function CustomLinksNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Product
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='m-0 grid list-none grid-cols-1 gap-1 p-0 sm:grid-cols-2'>
              {OVERVIEW_LINKS.map((link) => (
                <li key={link.href}>
                  <CustomLink href={link.href}>
                    <h3 className='m-0 mb-1 text-sm leading-4 font-medium'>{link.title}</h3>
                    <p className='m-0 text-sm text-muted-foreground'>{link.description}</p>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={10} align='start'>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/* --------------------------------------------------------------- Large menus */

function LargeNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Airports
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='w-[min(32rem,90vw)] max-h-[var(--available-height)] p-0'>
            <ScrollArea className='h-[var(--available-height)] max-h-80'>
              <ScrollAreaViewport>
                <ScrollAreaContent className='p-2'>
                  <LinkCards links={LARGE_LINKS} heading='All airports' />
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaThumb />
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner
          sideOffset={10}
          align='start'
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
        >
          <NavigationMenuPopup className='max-h-[var(--available-height)]'>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

export const demo: DemoMeta = {
  id: 'navigation-menu',
  title: 'Navigation Menu',
  description:
    'A high-quality, unstyled React navigation menu component that displays a collection of links and menus for website navigation.',
  group: 'Menus & Navigation',
  variants: [
    { name: 'Default', render: () => <DefaultNavigationMenu /> },
    { name: 'Nested submenus', render: () => <NestedNavigationMenu /> },
    { name: 'Nested inline submenus', render: () => <NestedInlineNavigationMenu /> },
    { name: 'Custom links', render: () => <CustomLinksNavigationMenu /> },
    { name: 'Large menus', render: () => <LargeNavigationMenu /> }
  ]
}
