import {ParkingActiveSessionsSummary} from './ParkingActiveSessionsSummary'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingActiveSessionsSummary,
} satisfies Meta<typeof ParkingActiveSessionsSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
