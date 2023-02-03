import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Canvas} from '.storybook/components'
import {AspectRatio} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'

export default {
  component: AspectRatio,
} as ComponentMeta<typeof AspectRatio>

export const Default: ComponentStory<typeof AspectRatio> = args => (
  <AspectRatio {...args}>
    <Canvas highlight>
      <Phrase>Ik heb een bepaalde beeldverhouding.</Phrase>
    </Canvas>
  </AspectRatio>
)

Default.args = {
  aspectRatio: 'wide',
  orientation: 'landscape',
}
