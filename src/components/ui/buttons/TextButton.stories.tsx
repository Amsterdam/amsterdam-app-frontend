import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {TextButton} from './TextButton'

export default {
  component: TextButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof TextButton>

export const Default: ComponentStoryObj<typeof TextButton> = {
  args: {
    label: 'Label',
  },
}
