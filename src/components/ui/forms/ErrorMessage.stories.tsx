import {ErrorMessage} from './ErrorMessage'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'testID',
    text: 'Vul een waarde in',
  },
}
