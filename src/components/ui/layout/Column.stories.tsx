import {Meta, StoryFn} from '@storybook/react'
import {Column} from '@/components/ui/layout/Column'
import {Block, Canvas} from '@/storybook/components'

export default {
  component: Column,
} as Meta<typeof Column>

export const Default: StoryFn<typeof Column> = args => (
  <Canvas highlight>
    <Column {...args}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Column>
  </Canvas>
)

Default.args = {
  align: 'start',
  gutter: 'md',
  halign: 'stretch',
  reverse: false,
}
