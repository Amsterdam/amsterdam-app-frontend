import {Meta, StoryObj} from '@storybook/react'
import {BluetoothIcon} from './BluetoothIcon'

const meta: Meta<typeof BluetoothIcon> = {
  component: BluetoothIcon,
}

export default meta

type Story = StoryObj<typeof BluetoothIcon>

export const Default: Story = {
  args: {
    height: 60,
    width: 60,
  },
}
