import {ParkingSessionAmountBottomSheetContent} from './ParkingSessionAmountBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'
import {ParkingSessionProvider} from '@/modules/parking/providers/ParkingSessionProvider'

const meta = {
  component: ParkingSessionAmountBottomSheetContent,
  decorators: Story => (
    <ParkingSessionProvider>
      <Story />
    </ParkingSessionProvider>
  ),
} satisfies Meta<typeof ParkingSessionAmountBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
