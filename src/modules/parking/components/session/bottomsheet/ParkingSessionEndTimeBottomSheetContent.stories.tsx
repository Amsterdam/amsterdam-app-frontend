import {ParkingSessionEndTimeBottomSheetContent} from './ParkingSessionEndTimeBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'


const meta = {
  component: ParkingSessionEndTimeBottomSheetContent,
} satisfies Meta<typeof ParkingSessionEndTimeBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
