import {Meta, StoryObj} from '@storybook/react'
import {SuccessIcon} from './SuccessIcon'

const meta: Meta<typeof SuccessIcon> = {
  component: SuccessIcon,
}

export default meta

type Story = StoryObj<typeof SuccessIcon>

export const Default: Story = {
  args: {
    height: 60,
    width: 60,
  },
}
