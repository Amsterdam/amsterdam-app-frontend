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
    label: 'Label',
  },
}

export const Secondary: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Label',
    variant: 'secondary',
  },
}

export const Text: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Label',
    variant: 'text',
  },
}
