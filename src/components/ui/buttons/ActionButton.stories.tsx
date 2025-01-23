import {Meta, StoryObj} from '@storybook/react'
import {ActionButton} from './ActionButton'

export default {
  component: ActionButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof ActionButton>

export const Default: StoryObj<typeof ActionButton> = {
  args: {
    label: 'Afvalpas',
    iconName: 'wasteCard',
  },
}
