import {LicensePlateListItem} from './LicensePlateListItem'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: LicensePlateListItem,
  argTypes: {
    onPressDelete: {
      action: 'onPressDelete',
    },
  },
} satisfies Meta<typeof LicensePlateListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-expect-error as onPressDelete is missing
  args: {
    licensePlate: {
      id: '3',
      vehicle_id: 'ABC123',
      visitor_name: 'John Doe',
    },
    isRemovable: true,
  },
}
