import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {LocationTopTaskButton} from './LocationTopTaskButton'

export default {
  component: LocationTopTaskButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof LocationTopTaskButton>

export const Default: ComponentStoryObj<typeof LocationTopTaskButton> = {
  args: {},
}
