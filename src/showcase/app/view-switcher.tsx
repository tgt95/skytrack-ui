import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { VIEWS, type View } from './registry'

const VIEW_ITEMS = VIEWS.map(([value, label]) => ({ value, label }))

/**
 * Switches the showcase view. The four labels plus the search field and audience tabs do not fit
 * a 390 px header, so below `sm` the same four options collapse into a select that always shows
 * the current view instead of a 72 px window onto the toggle row.
 */
export function ViewSwitcher({ view, onSelect }: { view: View; onSelect: (view: View) => void }) {
  return (
    <>
      <ToggleGroup
        className='hidden shrink-0 gap-1 border-none sm:flex sm:w-full sm:min-w-0 sm:flex-1'
        variant='default'
        aria-label='Showcase views'
        value={[view]}
      >
        {VIEWS.map(([id, label]) => (
          <Toggle key={id} onClick={() => onSelect(id)} value={id}>
            {label}
          </Toggle>
        ))}
      </ToggleGroup>
      <Select items={VIEW_ITEMS} value={view} onValueChange={(next) => onSelect(next as View)}>
        <SelectTrigger size='sm' className='w-auto shrink-0 sm:hidden' aria-label='Showcase view'>
          <SelectValue>
            {(value: View | null) => <span>{VIEW_ITEMS.find((item) => item.value === value)?.label}</span>}
          </SelectValue>
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
            <SelectPopup>
              <SelectList>
                {VIEW_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <SelectItemIndicator />
                    <SelectItemText>{item.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    </>
  )
}
