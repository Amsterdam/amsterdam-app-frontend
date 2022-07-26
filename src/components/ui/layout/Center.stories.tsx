import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Center} from './Center'
import {Canvas} from '@/../.storybook/components'
import {Phrase} from '@/components/ui/text'

export default {
  component: Center,
  decorators: [
    Story => (
      <Canvas height="256px" highlight maxWidth="512px">
        {Story()}
      </Canvas>
    ),
  ],
} as ComponentMeta<typeof Center>

export const Default: ComponentStoryObj<typeof Center> = {
  args: {
    grow: true,
    children: <Phrase>Ik sta in het midden</Phrase>,
  },
}
