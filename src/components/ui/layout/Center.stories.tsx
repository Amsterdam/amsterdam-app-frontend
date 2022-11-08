import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Canvas} from '.storybook/components'
import {Center} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'

export default {
  component: Center,
  decorators: [
    Story => (
      <Canvas height="256px" highlight maxWidth="512px">
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
