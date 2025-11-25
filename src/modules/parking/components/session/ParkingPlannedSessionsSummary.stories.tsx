import {ParkingPlannedSessionsSummary} from './ParkingPlannedSessionsSummary'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingPlannedSessionsSummary,
} satisfies Meta<typeof ParkingPlannedSessionsSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
