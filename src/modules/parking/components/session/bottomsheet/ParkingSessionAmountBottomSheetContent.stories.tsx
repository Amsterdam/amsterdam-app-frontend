import {ParkingSessionAmountBottomSheetContent} from './ParkingSessionAmountBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'


const meta = {
  component: ParkingSessionAmountBottomSheetContent,
} satisfies Meta<typeof ParkingSessionAmountBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
