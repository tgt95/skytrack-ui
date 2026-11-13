import { StandaloneCalendar } from './date-picker.demo'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'calendar',
  title: 'Calendar',
  description: 'A standalone month-grid calendar for selecting dates.',
  group: 'Forms',
  variants: [{ name: 'CALENDAR', render: () => <StandaloneCalendar /> }]
}
