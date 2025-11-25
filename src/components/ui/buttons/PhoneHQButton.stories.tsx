import {PhoneHQButton} from './PhoneHQButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: PhoneHQButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof PhoneHQButton>

export const Default: StoryObj<typeof PhoneHQButton> = {}
