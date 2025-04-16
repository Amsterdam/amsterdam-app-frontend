import {permitMock} from '../../mocks/permit.mock'
import {ParkingPermitDetailTimeFrame} from './ParkingPermitDetailTimeFrame'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingPermitDetailTimeFrame,
} satisfies Meta<typeof ParkingPermitDetailTimeFrame>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    permit: permitMock,
  },
}
