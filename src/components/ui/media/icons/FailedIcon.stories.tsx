import {FailedIcon} from './FailedIcon'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

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
