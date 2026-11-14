import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

/**
 * Search entry for a phone header, where the inline filter field cannot hold a usable width.
 * It opens the same component search dialog as the keyboard shortcut.
 */
export function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <Button size='icon' variant='ghost' aria-label='Search components' className='sm:hidden' onClick={onOpen}>
      <MagnifyingGlassIcon className='size-4' />
    </Button>
  )
}
