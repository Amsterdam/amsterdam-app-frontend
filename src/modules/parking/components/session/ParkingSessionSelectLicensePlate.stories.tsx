import {ParkingSessionSelectLicensePlate} from './ParkingSessionSelectLicensePlate'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingSessionSelectLicensePlate,
} satisfies Meta<typeof ParkingSessionSelectLicensePlate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
