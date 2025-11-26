import {Cluster} from './Cluster'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: Cluster,
} satisfies Meta<typeof Cluster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 12,
  },
}

export const LowCount: Story = {
  args: {
    count: 2,
  },
}

export const HighCount: Story = {
  args: {
    count: 1234,
  },
}
