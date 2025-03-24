import {permitMock} from '../mocks/permit.mock'
import {ParkingPermitDetailPermitZone} from './ParkingPermitDetailPermitZone'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingPermitDetailPermitZone,
} satisfies Meta<typeof ParkingPermitDetailPermitZone>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    permit: permitMock,
  },
}
