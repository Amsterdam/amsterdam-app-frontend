import {SuccessIcon} from './SuccessIcon'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

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
