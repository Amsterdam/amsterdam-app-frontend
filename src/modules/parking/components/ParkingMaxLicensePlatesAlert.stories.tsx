import {ParkingMaxLicensePlatesAlert} from './ParkingMaxLicensePlatesAlert'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingMaxLicensePlatesAlert,
} satisfies Meta<typeof ParkingMaxLicensePlatesAlert>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
