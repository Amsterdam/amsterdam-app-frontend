import {ParkingPermitDetail} from './ParkingPermitDetail'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingPermitDetail,
} satisfies Meta<typeof ParkingPermitDetail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
