import {MenuHeaderButton} from './MenuHeaderButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: MenuHeaderButton,
} satisfies Meta<typeof MenuHeaderButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'MenuHeaderButton',
  },
}
