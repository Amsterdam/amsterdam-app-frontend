import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Center} from '@/components/ui/layout/Center'
import {Phrase} from '@/components/ui/text/Phrase'
import {Canvas} from '@/storybook/components'

export default {
  component: Center,
  decorators: [
    Story => (
      <Canvas
        height="256px"
        highlight
        maxWidth="512px">
        <Story />
      </Canvas>
    ),
  ],
} as ComponentMeta<typeof Center>

export const Default: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Phrase>Ik sta in het midden</Phrase>
  </Center>
)

Default.args = {
  grow: true,
}
