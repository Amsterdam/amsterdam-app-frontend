import {ParkingStartSessionButton} from './ParkingStartSessionButton'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingStartSessionButton,
} satisfies Meta<typeof ParkingStartSessionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
