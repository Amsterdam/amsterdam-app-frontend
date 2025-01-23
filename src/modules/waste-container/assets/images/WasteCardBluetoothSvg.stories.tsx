import {Meta, StoryObj} from '@storybook/react'
import {WasteCardBluetoothSvg} from './WasteCardBluetoothSvg'

const meta: Meta<typeof WasteCardBluetoothSvg> = {
  component: WasteCardBluetoothSvg,
}

export default meta

type Story = StoryObj<typeof WasteCardBluetoothSvg>

export const Default: Story = {
  args: {
    height: 86,
    width: 68,
  },
}
