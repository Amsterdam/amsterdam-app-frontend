import {ErrorMessage} from './ErrorMessage'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'testIDMessage',
    text: 'Vul een waarde in',
  },
}
