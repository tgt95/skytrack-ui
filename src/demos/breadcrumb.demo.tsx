import { CircleIcon } from '@phosphor-icons/react'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'breadcrumb',
  title: 'Breadcrumb',
  description: 'Shows the current page location within a navigation hierarchy.',
  group: 'Menus & Navigation',
  variants: [
    {
      name: 'Basic',
      render: () => (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#home' />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#missions' />}>Missions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#north-coast' />}>North Coast Survey</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Flight plan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    },
    {
      name: 'Custom separator',
      render: () => (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#workspace' />}>Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <CircleIcon className='size-1.5 fill-current' />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#aircraft' />}>Aircraft</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <CircleIcon className='size-1.5 fill-current' />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>MiniPro A8</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    },
    {
      name: 'Collapsed path',
      render: () => (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#missions' />}>Missions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#north-coast' />}>North Coast</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Flight plan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    }
  ]
}
