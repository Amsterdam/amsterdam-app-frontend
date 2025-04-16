import {ParkingSessionFormProvider} from '../ParkingSessionFormProvider'
import {ParkingSessionAmountBottomSheetContent} from './ParkingSessionAmountBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingSessionAmountBottomSheetContent,
  decorators: Story => (
    <ParkingSessionFormProvider>
      <Story />
    </ParkingSessionFormProvider>
  ),
} satisfies Meta<typeof ParkingSessionAmountBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
