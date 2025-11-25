import {permitMock} from '../../mocks/permit.mock'
import {ParkingPaymentTimes} from './ParkingPaymentTimes'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingPaymentTimes,
} satisfies Meta<typeof ParkingPaymentTimes>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    paymentZone: permitMock.payment_zones[0],
  },
}
