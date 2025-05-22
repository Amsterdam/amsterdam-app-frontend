import {ParkingPermitTariff} from './ParkingPermitTariff'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingPermitTariff,
} satisfies Meta<typeof ParkingPermitTariff>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
