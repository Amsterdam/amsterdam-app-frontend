import {ChatInlineMessage} from './ChatInlineMessage'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ChatInlineMessage,
} satisfies Meta<typeof ChatInlineMessage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'chat',
    text: 'Chat gestopt om 12:34',
    testID: 'chatEntryRoutingWorkResult',
  },
}
