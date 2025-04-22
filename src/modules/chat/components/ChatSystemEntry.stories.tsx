import {ChatSystemEntry} from './ChatSystemEntry'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ChatSystemEntry,
} satisfies Meta<typeof ChatSystemEntry>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'chat',
    text: 'Chat gestopt',
    testID: 'chatEntryRoutingWorkResultEntry',
    timestamp: 1630510440,
  },
}
