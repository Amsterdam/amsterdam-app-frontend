import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Center} from './Center'
import {Canvas} from '@/../.storybook/components'
import {Phrase} from '@/components/ui/text'

export default {
  component: Center,
  decorators: [
    Story => (
      <Canvas highlight width="50vw" height="50vh">
        {Story()}
      </Canvas>
    ),
  ],
} as ComponentMeta<typeof Center>

export const Default: ComponentStory<typeof Center> = () => (
  <Center>
    <Phrase>Ik sta in het midden</Phrase>
  </Center>
)
