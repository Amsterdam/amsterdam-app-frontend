import {Meta, StoryObj} from '@storybook/react'
import {WasteCardSvg} from './WasteCardSvg'

const meta: Meta<typeof WasteCardSvg> = {
  component: WasteCardSvg,
}

export default meta

type Story = StoryObj<typeof WasteCardSvg>

export const Default: Story = {
  args: {
    height: 245,
    width: 359,
  },
}
