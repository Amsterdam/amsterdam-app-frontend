import {ParkingRequestPinCodeForm} from './ParkingRequestPinCodeForm'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingRequestPinCodeForm,
} satisfies Meta<typeof ParkingRequestPinCodeForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
