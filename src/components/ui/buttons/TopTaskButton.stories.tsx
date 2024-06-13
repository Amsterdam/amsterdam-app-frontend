import {Meta, StoryObj} from '@storybook/react'
import {TopTaskButton} from './TopTaskButton'

export default {
  component: TopTaskButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof TopTaskButton>

export const Default: StoryObj<typeof TopTaskButton> = {
  args: {
    iconName: 'email',
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
}
