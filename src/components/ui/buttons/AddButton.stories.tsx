import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {AddButton} from './AddButton'

export default {
  component: AddButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof AddButton>

export const Default: ComponentStoryObj<typeof AddButton> = {
  args: {},
}
