import {ParkingPermitSessions} from './ParkingPermitSessions'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingPermitSessions,
} satisfies Meta<typeof ParkingPermitSessions>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
