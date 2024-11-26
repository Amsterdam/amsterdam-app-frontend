import {NotificationHistoryEmpty} from './NotificationHistoryEmpty'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: NotificationHistoryEmpty,
} satisfies Meta<typeof NotificationHistoryEmpty>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
