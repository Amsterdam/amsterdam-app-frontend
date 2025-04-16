import {ParkingSessionFormProvider} from '../ParkingSessionFormProvider'
import {ParkingSessionEndTimeBottomSheetContent} from './ParkingSessionEndTimeBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingSessionEndTimeBottomSheetContent,
  decorators: Story => (
    <ParkingSessionFormProvider>
      <Story />
    </ParkingSessionFormProvider>
  ),
} satisfies Meta<typeof ParkingSessionEndTimeBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
