import {ParkingSessionStatus} from '../../types'
import {ParkingActiveSessionNavigationButton} from './ParkingActiveSessionNavigationButton'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: ParkingActiveSessionNavigationButton,
} satisfies Meta<typeof ParkingActiveSessionNavigationButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    parkingSession: {
      created_date_time: '',
      end_date_time: '2025-12-31 16:00:00 UTC',
      is_cancelled: false,
      is_paid: false,
      money_balance_applicable: false,
      no_endtime: false,
      parking_cost: {
        currency: '',
        value: 0,
      },
      ps_right_id: 0,
      remaining_time: 0,
      report_code: '',
      start_date_time: '',
      status: ParkingSessionStatus.active,
      time_balance_applicable: false,
      vehicle_id: 'Auto',
    },
  },
}
