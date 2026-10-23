import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  createHandle,
  PreviewCard,
  PreviewCardArrow,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardTrigger,
  PreviewCardViewport,
  type PreviewCardChangeEventDetails
} from '@/components/ui/preview-card'
import type { DemoMeta } from '@/showcase/demo'

/* "Detached triggers" */
const detachedCard = createHandle()

/* "Multiple triggers", "Controlled mode…" and "Animating the Preview Card" */
const payloadCard = createHandle<React.ReactElement>()

const typographyCard = (
  <div className='flex flex-col gap-2 p-2'>
    <img
      width={224}
      height={150}
      className='aspect-[224/150] w-full object-cover'
      src='https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300'
      alt='Station Hofplein signage in Rotterdam, Netherlands'
    />
    <p className='text-sm text-muted-foreground'>
      <strong className='text-popover-foreground'>Typography</strong> is the art and science of arranging type to make
      written language clear, visually appealing, and effective in communication.
    </p>
  </div>
)

const designCard = (
  <div className='flex flex-col gap-2 p-2'>
    <img
      width={241}
      height={240}
      className='aspect-square w-full object-cover'
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Braun_ABW30_%28schwarz%29.jpg/250px-Braun_ABW30_%28schwarz%29.jpg'
      alt='Braun ABW30'
    />
    <p className='text-sm text-muted-foreground'>
      A <strong className='text-popover-foreground'>design</strong> is the concept or proposal for an object, process,
      or system.
    </p>
  </div>
)

const artCard = (
  <div className='flex flex-col gap-2 p-2'>
    <img
      width={206}
      height={240}
      className='aspect-[206/240] w-full object-cover'
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/MonaLisa_sfumato.jpeg/250px-MonaLisa_sfumato.jpeg'
      alt='Mona Lisa'
    />
    <p className='text-sm text-muted-foreground'>
      <strong className='text-popover-foreground'>Art</strong> is a diverse range of cultural activity centered around
      works utilizing creative or imaginative talents.
    </p>
  </div>
)

/* "Controlled mode with multiple triggers" */
function ControlledTriggers() {
  const [open, setOpen] = React.useState(false)
  const [triggerId, setTriggerId] = React.useState<string | null>(null)

  const handleOpenChange = (isOpen: boolean, eventDetails: PreviewCardChangeEventDetails) => {
    setOpen(isOpen)
    setTriggerId(eventDetails.trigger?.id ?? null)
  }

  return (
    <div className='flex flex-col gap-3'>
      <p className='max-w-prose text-sm'>
        Discover{' '}
        <PreviewCardTrigger
          handle={payloadCard}
          href='https://en.wikipedia.org/wiki/Typography'
          id='trigger-1'
          payload={typographyCard}
        >
          typography
        </PreviewCardTrigger>
        ,{' '}
        <PreviewCardTrigger
          handle={payloadCard}
          href='https://en.wikipedia.org/wiki/Industrial_design'
          id='trigger-2'
          payload={designCard}
        >
          design
        </PreviewCardTrigger>
        , or{' '}
        <PreviewCardTrigger
          handle={payloadCard}
          href='https://en.wikipedia.org/wiki/Art'
          id='trigger-3'
          payload={artCard}
        >
          art
        </PreviewCardTrigger>
        .
      </p>
      <div>
        <Button
          variant='outline'
          onClick={() => {
            setTriggerId('trigger-2')
            setOpen(true)
          }}
        >
          Open programmatically
        </Button>
      </div>

      <PreviewCard handle={payloadCard} open={open} onOpenChange={handleOpenChange} triggerId={triggerId}>
        {({ payload }) => (
          <PreviewCardPortal>
            <PreviewCardPositioner sideOffset={8}>
              <PreviewCardPopup>
                <PreviewCardArrow />
                {payload}
              </PreviewCardPopup>
            </PreviewCardPositioner>
          </PreviewCardPortal>
        )}
      </PreviewCard>
    </div>
  )
}

/* "Animating the Preview Card" and "Content" — the payload animates inside the Viewport. */
function AnimatedCards() {
  return (
    <div className='flex flex-col gap-3'>
      <p className='max-w-prose text-sm'>
        Discover{' '}
        <PreviewCardTrigger
          handle={payloadCard}
          href='https://en.wikipedia.org/wiki/Typography'
          payload={typographyCard}
        >
          typography
        </PreviewCardTrigger>
        ,{' '}
        <PreviewCardTrigger handle={payloadCard} href='https://en.wikipedia.org/wiki/Design' payload={designCard}>
          design
        </PreviewCardTrigger>
        , or{' '}
        <PreviewCardTrigger handle={payloadCard} href='https://en.wikipedia.org/wiki/Art' payload={artCard}>
          art
        </PreviewCardTrigger>
        .
      </p>

      <PreviewCard handle={payloadCard}>
        {({ payload }) => (
          <PreviewCardPortal>
            <PreviewCardPositioner sideOffset={8}>
              <PreviewCardPopup>
                <PreviewCardArrow />
                <PreviewCardViewport className='transition-opacity duration-150'>{payload}</PreviewCardViewport>
              </PreviewCardPopup>
            </PreviewCardPositioner>
          </PreviewCardPortal>
        )}
      </PreviewCard>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'preview-card',
  title: 'Preview Card',
  description:
    'A high-quality, unstyled React preview card component for a link that shows a destination preview without interrupting keyboard or screen reader navigation.',
  group: 'Overlays',
  variants: [
    {
      name: 'Default',
      render: () => (
        <PreviewCard>
          <p className='max-w-prose text-sm'>
            The principles of good{' '}
            <PreviewCardTrigger href='https://en.wikipedia.org/wiki/Typography'>typography</PreviewCardTrigger> remain
            in the digital age.
          </p>

          <PreviewCardPortal>
            <PreviewCardPositioner sideOffset={8}>
              <PreviewCardPopup>
                <PreviewCardArrow />
                {typographyCard}
              </PreviewCardPopup>
            </PreviewCardPositioner>
          </PreviewCardPortal>
        </PreviewCard>
      )
    },
    {
      name: 'Detached triggers',
      render: () => (
        <div>
          <p className='max-w-prose text-sm'>
            The principles of good{' '}
            <PreviewCardTrigger handle={detachedCard} href='https://en.wikipedia.org/wiki/Typography'>
              typography
            </PreviewCardTrigger>{' '}
            remain in the digital age.
          </p>

          <PreviewCard handle={detachedCard}>
            <PreviewCardPortal>
              <PreviewCardPositioner sideOffset={8}>
                <PreviewCardPopup>{typographyCard}</PreviewCardPopup>
              </PreviewCardPositioner>
            </PreviewCardPortal>
          </PreviewCard>
        </div>
      )
    },
    {
      name: 'Multiple triggers',
      render: () => (
        <div>
          <p className='max-w-prose text-sm'>
            Discover{' '}
            <PreviewCardTrigger
              handle={payloadCard}
              href='https://en.wikipedia.org/wiki/Typography'
              payload={typographyCard}
            >
              typography
            </PreviewCardTrigger>
            ,{' '}
            <PreviewCardTrigger handle={payloadCard} href='https://en.wikipedia.org/wiki/Design' payload={designCard}>
              design
            </PreviewCardTrigger>
            , or{' '}
            <PreviewCardTrigger handle={payloadCard} href='https://en.wikipedia.org/wiki/Art' payload={artCard}>
              art
            </PreviewCardTrigger>
            .
          </p>

          <PreviewCard handle={payloadCard}>
            {({ payload }) => (
              <PreviewCardPortal>
                <PreviewCardPositioner sideOffset={8}>
                  <PreviewCardPopup>
                    <PreviewCardArrow />
                    {payload}
                  </PreviewCardPopup>
                </PreviewCardPositioner>
              </PreviewCardPortal>
            )}
          </PreviewCard>
        </div>
      )
    },
    {
      name: 'Controlled mode with multiple triggers',
      render: () => <ControlledTriggers />
    },
    {
      name: 'Animating the Preview Card',
      render: () => <AnimatedCards />
    },
    {
      name: 'Position and Size',
      render: () => <AnimatedCards />
    },
    {
      name: 'Content',
      render: () => <AnimatedCards />
    }
  ]
}
