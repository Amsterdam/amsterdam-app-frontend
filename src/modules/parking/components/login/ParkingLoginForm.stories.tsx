import {ParkingLoginForm} from './ParkingLoginForm'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingLoginForm,
} satisfies Meta<typeof ParkingLoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
