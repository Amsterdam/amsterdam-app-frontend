import {ComponentStoryObj} from '@storybook/react'
import {AddButton} from './AddButton'

export default {
  component: AddButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

export const Default: ComponentStoryObj<typeof AddButton> = {
  args: {},
}
