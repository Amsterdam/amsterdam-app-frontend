import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {IconWithTitleButton} from './IconWithTitleButton'

export default {
  component: IconWithTitleButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof IconWithTitleButton>

export const Default: ComponentStoryObj<typeof IconWithTitleButton> = {
  args: {
    iconName: 'email',
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
}
