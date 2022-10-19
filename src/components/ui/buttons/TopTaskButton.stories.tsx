import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {TopTaskButton} from './TopTaskButton'

export default {
  component: TopTaskButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof TopTaskButton>

export const Default: ComponentStoryObj<typeof TopTaskButton> = {
  args: {
    iconName: 'email',
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
}
