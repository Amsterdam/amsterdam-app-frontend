import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {PhoneButton} from './PhoneButton'

export default {
  component: PhoneButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof PhoneButton>

export const Default: ComponentStoryObj<typeof PhoneButton> = {
  args: {
    phoneNumber: '0610000000',
  },
}
