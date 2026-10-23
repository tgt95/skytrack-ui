import { useId, useState } from 'react'
import { ArrowRight, CircleNotch, Plus, Trash } from '@phosphor-icons/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DemoMeta } from '@/showcase/demo'

function LoadingButton() {
  const [loading, setLoading] = useState(false)
  // Some browser/screen-reader combinations do not reliably announce changes to a
  // focused button's descendant text, so the changing label is the button's explicit
  // accessible name via aria-labelledby. See Base UI button docs, "Loading states".
  const labelId = useId()

  return (
    <Button
      focusableWhenDisabled
      disabled={loading}
      aria-labelledby={labelId}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
      }}
    >
      {loading && <CircleNotch className='animate-spin' />}
      <span id={labelId}>{loading ? 'Submitting' : 'Submit'}</span>
    </Button>
  )
}

/**
 * Links keep their own semantics: the Base UI docs advise styling an `<a>` directly
 * with CSS rather than rendering one through Button's `render` prop.
 */
function ButtonLikeLink() {
  return (
    <a href='#button' className={cn(buttonVariants({ variant: 'outline' }), 'no-underline hover:no-underline')}>
      Anchor styled as a button
    </a>
  )
}

/** Base UI docs, "Rendering as another tag": stays keyboard accessible as a `<div>`. */
function DivRenderedButton() {
  return (
    <Button nativeButton={false} render={<div />}>
      Button that can contain complex children
    </Button>
  )
}

export const demo: DemoMeta = {
  id: 'button',
  title: 'Button',
  description: 'A button that can be rendered as another tag or focusable when disabled.',
  group: 'Actions',
  variants: [
    {
      name: 'Variants',
      render: () => (
        <>
          <Button>Default</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='link'>Link</Button>
        </>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          <Button size='xs'>XS · 24px</Button>
          <Button size='sm'>SM · 32px</Button>
          <Button>Default · 36px</Button>
          <Button size='lg'>LG · 40px</Button>
          <Button size='icon-xs' variant='outline' aria-label='Icon XS · 24px'>
            <Plus />
          </Button>
          <Button size='icon-sm' variant='outline' aria-label='Icon SM · 32px'>
            <Plus />
          </Button>
          <Button size='icon' variant='outline' aria-label='Icon · 36px'>
            <Plus />
          </Button>
          <Button size='icon-lg' variant='outline' aria-label='Icon LG · 40px'>
            <Plus />
          </Button>
        </>
      )
    },
    {
      name: 'With icon',
      render: () => (
        <>
          <Button>
            Continue <ArrowRight />
          </Button>
          <Button variant='destructive'>
            <Trash /> Delete
          </Button>
        </>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <>
          <Button disabled>Disabled</Button>
          <Button variant='outline' disabled>
            Disabled
          </Button>
        </>
      )
    },
    { name: 'Loading (focusableWhenDisabled)', render: () => <LoadingButton /> },
    {
      name: 'Link styled with buttonVariants',
      render: () => <ButtonLikeLink />
    },
    {
      name: 'Rendering as another tag (nativeButton={false})',
      render: () => <DivRenderedButton />
    }
  ]
}
