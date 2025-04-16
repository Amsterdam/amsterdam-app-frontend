import {ParkingSessionFormProvider} from '../ParkingSessionFormProvider'
import {ParkingSessionStartTimeBottomSheetContent} from './ParkingSessionStartTimeBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingSessionStartTimeBottomSheetContent,
  decorators: Story => (
    <ParkingSessionFormProvider>
      <Story />
    </ParkingSessionFormProvider>
  ),
} satisfies Meta<typeof ParkingSessionStartTimeBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
