import {Meta, StoryObj} from '@storybook/react'
import {FailedIcon} from './FailedIcon'

const meta: Meta<typeof FailedIcon> = {
  component: FailedIcon,
}

export default meta

type Story = StoryObj<typeof FailedIcon>

export const Default: Story = {
  args: {
    height: 60,
    width: 60,
  },
}
