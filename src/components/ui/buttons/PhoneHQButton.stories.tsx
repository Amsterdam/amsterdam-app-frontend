import {Meta, StoryObj} from '@storybook/react'
import {PhoneHQButton} from './PhoneHQButton'

export default {
  component: PhoneHQButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof PhoneHQButton>

export const Default: StoryObj<typeof PhoneHQButton> = {}
