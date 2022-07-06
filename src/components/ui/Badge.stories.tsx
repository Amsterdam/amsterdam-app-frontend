import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Badge} from './Badge'

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>

export const Default: ComponentStoryObj<typeof Badge> = {
  args: {
    value: 7,
  },
}
