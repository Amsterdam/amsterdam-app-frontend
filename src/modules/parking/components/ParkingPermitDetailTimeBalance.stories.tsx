import {permitMock} from '../mocks/permit.mock'
import {ParkingPermitDetailTimeBalance} from './ParkingPermitDetailTimeBalance'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingPermitDetailTimeBalance,
} satisfies Meta<typeof ParkingPermitDetailTimeBalance>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    permit: permitMock,
  },
}
