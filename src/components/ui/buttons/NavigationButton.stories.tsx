import {Meta, StoryObj} from '@storybook/react'
import {NavigationButton} from './NavigationButton'

export default {
  component: NavigationButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof NavigationButton>

export const Default: StoryObj<typeof NavigationButton> = {
  args: {
    label: 'Label',
  },
}

export const Previous: StoryObj<typeof NavigationButton> = {
  args: {
    direction: 'backward',
    label: 'Vorige',
  },
}
