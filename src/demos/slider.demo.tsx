import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Slider,
  SliderLabel,
  SliderValue,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb
} from '@/components/ui/slider'
import type { DemoMeta } from '@/showcase/demo'

const MIN = 0
const MAX = 100
const MARKS = [0, 25, 50, 75, 100]

function valueToPercent(value: number) {
  return ((value - MIN) / (MAX - MIN)) * 100
}

function ControlledSlider() {
  const [value, setValue] = useState<number | number[]>(30)
  return (
    <Slider
      value={value}
      onValueChange={(next: number | readonly number[]) => setValue(next as number | number[])}
      className='w-64'
    >
      <div className='flex items-center justify-between'>
        <SliderLabel>Controlled</SliderLabel>
        <SliderValue />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label='Controlled value' />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}

function RangeSlider({ collision }: { collision: 'push' | 'swap' | 'none' }) {
  return (
    <Slider defaultValue={[25, 45]} thumbCollisionBehavior={collision} className='w-64'>
      <div className='flex items-center justify-between'>
        <SliderLabel>Price range</SliderLabel>
        <SliderValue>{([min, max]) => `${min} – ${max}`}</SliderValue>
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb index={0} aria-label='Minimum price' />
          <SliderThumb index={1} aria-label='Maximum price' />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}

function MarksSlider() {
  return (
    <Slider defaultValue={40} min={MIN} max={MAX} className='w-64'>
      <div className='flex items-center justify-between'>
        <SliderLabel>Volume</SliderLabel>
        <SliderValue />
      </div>
      <SliderControl>
        <SliderTrack className='relative'>
          <SliderIndicator />
          {MARKS.map((mark) => (
            <div
              key={mark}
              aria-hidden
              className='absolute top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-foreground/40'
              style={{ left: `${valueToPercent(mark)}%` }}
            />
          ))}
          <SliderThumb aria-label='Volume' />
        </SliderTrack>
      </SliderControl>
      <div className='relative h-4 select-none' aria-hidden>
        {MARKS.map((mark) => (
          <span
            key={mark}
            className='absolute -translate-x-1/2 text-xs whitespace-nowrap text-muted-foreground'
            style={{ left: `${valueToPercent(mark)}%` }}
          >
            {mark}
          </span>
        ))}
      </div>
    </Slider>
  )
}

export const demo: DemoMeta = {
  id: 'slider',
  title: 'Slider',
  description: 'An input for selecting a value (or a range) from a bounded set.',
  group: 'Forms',
  variants: [
    {
      name: 'Demo',
      render: () => (
        <Slider defaultValue={25}>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label='Volume' />
            </SliderTrack>
          </SliderControl>
        </Slider>
      )
    },
    {
      name: 'Labeling a slider',
      render: () => (
        <div className='flex flex-col gap-6'>
          <Slider defaultValue={40}>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                {/* No visible label: aria-label on the thumb names the control. */}
                <SliderThumb aria-label='Volume' />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <Slider defaultValue={[25, 75]}>
            <SliderLabel>Price range</SliderLabel>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb index={0} aria-label='Minimum price' />
                <SliderThumb index={1} aria-label='Maximum price' />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      )
    },
    {
      name: 'Controlled',
      render: () => <ControlledSlider />
    },
    {
      name: 'Range slider',
      render: () => (
        <div className='flex flex-col gap-6'>
          <RangeSlider collision='push' />
          <RangeSlider collision='swap' />
          <RangeSlider collision='none' />
        </div>
      )
    },
    {
      name: 'Steps',
      render: () => (
        <Slider defaultValue={400} min={100} max={900} step={100} largeStep={200}>
          <div className='flex items-center justify-between'>
            <SliderLabel>Playback speed</SliderLabel>
            <SliderValue />
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label='Playback speed' />
            </SliderTrack>
          </SliderControl>
        </Slider>
      )
    },
    {
      name: 'Marks',
      render: () => <MarksSlider />
    },
    {
      name: 'Thumb alignment',
      render: () => (
        <div className='flex flex-col gap-6'>
          <Slider defaultValue={25} thumbAlignment='edge'>
            <div className='flex items-center justify-between'>
              <SliderLabel>Edge aligned</SliderLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Edge aligned value' />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <Slider defaultValue={25} thumbAlignment='edge-client-only'>
            <div className='flex items-center justify-between'>
              <SliderLabel>Edge aligned (client only)</SliderLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Edge aligned client-only value' />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <Slider defaultValue={25} thumbAlignment='center'>
            <div className='flex items-center justify-between'>
              <SliderLabel>Center aligned</SliderLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Center aligned value' />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      )
    },
    {
      name: 'Vertical',
      render: () => (
        <Slider orientation='vertical' defaultValue={35}>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label='Vertical value' />
            </SliderTrack>
          </SliderControl>
        </Slider>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <div className='flex flex-col gap-6'>
          <Slider defaultValue={60} disabled>
            <div className='flex items-center justify-between'>
              <SliderLabel>Disabled</SliderLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Disabled value' />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      )
    },
    {
      name: 'Form integration',
      render: () => (
        <form
          className='flex flex-col gap-3'
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <Slider defaultValue={30} name='volume'>
            <SliderLabel>Volume</SliderLabel>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Volume' />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <Slider defaultValue={[25, 75]} name='priceRange'>
            <div className='flex items-center justify-between'>
              <SliderLabel>Price range</SliderLabel>
              <SliderValue>{([min, max]) => `${min} – ${max}`}</SliderValue>
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb index={0} aria-label='Minimum price' />
                <SliderThumb index={1} aria-label='Maximum price' />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <Button type='submit'>Submit</Button>
        </form>
      )
    }
  ]
}
