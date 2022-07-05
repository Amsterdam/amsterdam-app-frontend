import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Button} from './Button'

export default {
  component: Button,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof Button>

export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    text: 'Label',
  },
}

export const Secondary: ComponentStoryObj<typeof Button> = {
  args: {
    text: 'Label',
    variant: 'secondary',
  },
}

export const Text: ComponentStoryObj<typeof Button> = {
  args: {
    text: 'Label',
    variant: 'text',
  },
}
