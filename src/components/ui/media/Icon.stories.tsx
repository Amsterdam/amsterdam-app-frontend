import {ComponentStoryObj} from '@storybook/react'
import {Icon} from './Icon'

export default {
  component: Icon,
}

export const Default: ComponentStoryObj<typeof Icon> = {
  args: {
    color: 'default',
    name: 'announcement',
    scalesWithFont: true,
    size: 32,
  },
}
