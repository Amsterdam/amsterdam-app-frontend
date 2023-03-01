import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Block, Canvas} from '.storybook/components'
import {Column} from '@/components/ui/layout'

export default {
  component: Column,
} as ComponentMeta<typeof Column>

export const Default: ComponentStory<typeof Column> = args => (
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
  grow: false,
  gutter: 'md',
  halign: 'stretch',
  reverse: false,
}
