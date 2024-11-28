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

export const Icon: StoryObj<typeof NavigationButton> = {
  args: {
    icon: 'alert',
    label: 'Met icoon',
  },
}
export const LessEmphasis: StoryObj<typeof NavigationButton> = {
  args: {
    emphasis: 'default',
    label: 'Minder nadruk',
  },
}

export const Previous: StoryObj<typeof NavigationButton> = {
  args: {
    direction: 'backward',
    label: 'Vorige',
  },
}
