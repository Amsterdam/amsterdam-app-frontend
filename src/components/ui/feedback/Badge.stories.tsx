import {Meta} from '@storybook/react'
import {Badge} from './Badge'

export default {
  component: Badge,
  args: {
    value: 3,
  },
} as Meta<typeof Badge>

export const Default = {}

export const Small = {
  args: {
    variant: 'small',
  },
}

export const Info = {
  args: {
    color: 'info',
  },
}
