import {ParkingPermitBalanceTime} from './ParkingPermitBalanceTime'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingPermitBalanceTime,
} satisfies Meta<typeof ParkingPermitBalanceTime>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
