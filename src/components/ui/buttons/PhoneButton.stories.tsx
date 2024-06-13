import {Meta, StoryObj} from '@storybook/react'
import {PhoneButton} from './PhoneButton'

export default {
  component: PhoneButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof PhoneButton>

export const Default: StoryObj<typeof PhoneButton> = {
  args: {
    phoneNumber: '0610000000',
  },
}
