import {Meta, StoryObj} from '@storybook/react'
import {Icon} from './Icon'

const meta: Meta<typeof Icon> = {
  component: Icon,
}

export default meta

export const Default: StoryObj<typeof Icon> = {
  args: {
    color: 'default',
    name: 'announcement',
    size: 'lg',
  },
}
