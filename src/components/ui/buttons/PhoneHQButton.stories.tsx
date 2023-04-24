import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {PhoneHQButton} from './PhoneHQButton'

export default {
  component: PhoneHQButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof PhoneHQButton>

export const Default: ComponentStoryObj<typeof PhoneHQButton> = {}
