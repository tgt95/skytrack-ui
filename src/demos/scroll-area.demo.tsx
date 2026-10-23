import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner
} from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanel } from '@/components/ui/tabs'
import type { DemoMeta } from '@/showcase/demo'

const LOREM_1 =
  "Vernacular architecture is building done outside any academic tradition, and without professional guidance. It is not a particular architectural movement or style, but rather a broad category, encompassing a wide range and variety of building types, with differing methods of construction, from around the world, both historical and extant and classical and modern. Vernacular architecture constitutes 95% of the world's built environment, as estimated in 1995 by Amos Rapoport, as measured against the small percentage of new buildings every year designed by architects and built by engineers."

const LOREM_2 =
  'This type of architecture usually serves immediate, local needs, is constrained by the materials available in its particular region and reflects local traditions and cultural practices. The study of vernacular architecture does not examine formally schooled architects, but instead that of the design skills and tradition of local builders, who were rarely given any attribution for the work. More recently, vernacular architecture has been examined by designers and the building industry in an effort to be more energy conscious with contemporary design and construction—part of a broader interest in sustainable design.'

const GRID_ITEMS = Array.from({ length: 100 }, (_, i) => i + 1)

export const demo: DemoMeta = {
  id: 'scroll-area',
  title: 'Scroll Area',
  description: 'A native scroll container with custom, theme-aware scrollbars.',
  group: 'Layout',
  variants: [
    {
      name: 'Demo',
      render: () => (
        <ScrollArea className='h-48 w-96 max-w-full rounded-lg border border-border'>
          <ScrollAreaViewport>
            <ScrollAreaContent className='pr-6'>
              <p className='m-0'>{LOREM_1}</p>
              <p className='m-0'>{LOREM_2}</p>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      )
    },
    {
      name: 'Both scrollbars',
      render: () => (
        <ScrollArea className='h-80 w-80 max-w-full rounded-lg border border-border'>
          <ScrollAreaViewport>
            <ScrollAreaContent>
              <ul className='m-0 grid list-none grid-cols-[repeat(10,6.25rem)] grid-rows-[repeat(10,6.25rem)] gap-3 p-0'>
                {GRID_ITEMS.map((item) => (
                  <li
                    key={item}
                    className='flex items-center justify-center bg-muted text-sm font-bold text-muted-foreground'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation='horizontal'>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollArea>
      )
    },
    {
      name: 'Gradient scroll fade',
      render: () => (
        <ScrollArea className='h-48 w-96 max-w-full rounded-lg bg-muted'>
          <ScrollAreaViewport className='mask-no-repeat [mask-image:linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%)]'>
            <ScrollAreaContent className='pr-6'>
              <p className='m-0'>{LOREM_1}</p>
              <p className='m-0'>{LOREM_2}</p>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      )
    },
    {
      name: 'Combining with Tabs',
      render: () => (
        <Tabs defaultValue='overview' className='max-w-sm'>
          <ScrollArea className='relative overflow-hidden'>
            <TabsList render={<ScrollAreaViewport />} className='flex w-full gap-1 border-b border-border'>
              <TabsTab value='overview' className='flex-none px-3'>
                Overview
              </TabsTab>
              <TabsTab value='projects' className='flex-none px-3'>
                Projects
              </TabsTab>
              <TabsTab value='account' className='flex-none px-3'>
                Account
              </TabsTab>
              <TabsIndicator className='z-20 rounded-none bg-transparent shadow-none [border-bottom:2px_solid_var(--primary)]' />
            </TabsList>
          </ScrollArea>
          <TabsPanel value='overview'>
            <p className='m-0'>Workspace stats and activity.</p>
          </TabsPanel>
          <TabsPanel value='projects'>
            <p className='m-0'>Milestones and deadlines.</p>
          </TabsPanel>
          <TabsPanel value='account'>
            <p className='m-0'>Profile and preferences.</p>
          </TabsPanel>
        </Tabs>
      )
    }
  ]
}
