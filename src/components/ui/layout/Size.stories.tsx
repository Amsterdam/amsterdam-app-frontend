import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Canvas} from '.storybook/components'
import {Size} from '@/components/ui/layout/'
import {Phrase} from '@/components/ui/text'

export default {
  component: Size,
} as ComponentMeta<typeof Size>

export const Default: ComponentStory<typeof Size> = args => (
  <Size {...args}>
    <Canvas highlight>
      <Phrase>Ik accepteer afmetingen</Phrase>
    </Canvas>
  </Size>
)

Default.args = {
  maxWidth: 128,
  minHeight: 128,
}
