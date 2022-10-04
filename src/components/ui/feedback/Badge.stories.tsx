import {ComponentMeta} from '@storybook/react'
import {Badge} from './Badge'

export default {
  component: Badge,
  args: {
    value: 3,
  },
} as ComponentMeta<typeof Badge>

export const Small = {}

export const Large = {
  args: {
    variant: 'default',
  },
}
