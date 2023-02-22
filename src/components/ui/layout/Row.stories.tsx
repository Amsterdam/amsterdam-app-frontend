import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Block, Canvas} from '.storybook/components'
import {Row} from '@/components/ui/layout'

export default {
  component: Row,
} as ComponentMeta<typeof Row>

export const Default: ComponentStory<typeof Row> = args => (
  <Canvas highlight>
    <Row {...args}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Row>
  </Canvas>
)

Default.args = {
  align: 'between',
  gutter: 'md',
  reverse: false,
  valign: 'stretch',
  wrap: false,
}
