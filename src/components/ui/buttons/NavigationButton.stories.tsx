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
    title: 'Label',
  },
}

export const Icon: StoryObj<typeof NavigationButton> = {
  args: {
    iconName: 'alert',
    title: 'Met icoon',
  },
}
export const LessEmphasis: StoryObj<typeof NavigationButton> = {
  args: {
    emphasis: 'default',
    title: 'Minder nadruk',
  },
}

export const Previous: StoryObj<typeof NavigationButton> = {
  args: {
    direction: 'backward',
    title: 'Vorige',
  },
}

export const WithDescription: StoryObj<typeof NavigationButton> = {
  args: {
    direction: 'forward',
    title: '43DNT8 - Sander',
    description: '10.15 uur - 2 uur 15 min',
    iconName: 'parkingCar',
  },
}
