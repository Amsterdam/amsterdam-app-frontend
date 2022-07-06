import {ComponentStoryObj, Meta} from '@storybook/react'
import {Button} from './Button'

export default {
  component: Button,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta

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

export const Inverse: ComponentStoryObj<typeof Button> = {
  args: {
    text: 'Label',
    variant: 'inverse',
  },
}

export const Text: ComponentStoryObj<typeof Button> = {
  args: {
    text: 'Label',
    variant: 'text',
  },
}
