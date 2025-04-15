import {ParkingSessionStartTimeBottomSheetContent} from './ParkingSessionStartTimeBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'


const meta = {
  component: ParkingSessionStartTimeBottomSheetContent,
} satisfies Meta<typeof ParkingSessionStartTimeBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
