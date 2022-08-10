import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {NavigationButton} from './NavigationButton'
import {Canvas} from '@/../.storybook/components'

export default {
  component: NavigationButton,
  decorators: [
    Story => (
      <Canvas maxWidth="300px">
        <Story />
      </Canvas>
    ),
  ],
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof NavigationButton>

export const Default: ComponentStoryObj<typeof NavigationButton> = {
  args: {
    label: 'Label',
  },
}
export const Previous: ComponentStoryObj<typeof NavigationButton> = {
  args: {
    direction: 'backward',
    label: 'Vorige',
  },
}
