import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from '@/components/ui/meter'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'meter',
  title: 'Meter',
  description: 'A high-quality, unstyled React meter component that provides a graphical display of a numeric value.',
  group: 'Data Display',
  variants: [
    {
      name: 'Storage used',
      render: () => (
        <Meter value={24}>
          <MeterLabel>Storage Used</MeterLabel>
          <MeterValue />
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      )
    },
    {
      name: 'Battery level',
      render: () => (
        <Meter value={0.68} max={1} format={{ style: 'percent' }}>
          <MeterLabel>Battery</MeterLabel>
          <MeterValue />
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      )
    }
  ]
}
