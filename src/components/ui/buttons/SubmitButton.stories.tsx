import {ComponentStoryObj} from '@storybook/react'
import {SubmitButton} from './SubmitButton'

export default {
  component: SubmitButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

export const Default: ComponentStoryObj<typeof SubmitButton> = {
  args: {
    text: 'Label',
  },
}
