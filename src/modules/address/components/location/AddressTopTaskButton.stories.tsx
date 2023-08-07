import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {AddressTopTaskButton} from './AddressTopTaskButton'

export default {
  component: AddressTopTaskButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof AddressTopTaskButton>

export const Default: ComponentStoryObj<typeof AddressTopTaskButton> = {
  args: {},
}
