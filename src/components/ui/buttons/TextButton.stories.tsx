import {ComponentStoryObj} from '@storybook/react'
import {TextButton} from './TextButton'

export default {
  component: TextButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

export const Default: ComponentStoryObj<typeof TextButton> = {
  args: {
    text: 'Label',
  },
}
