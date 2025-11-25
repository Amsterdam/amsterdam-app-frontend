import {ParkingIntroFigure} from './ParkingIntroFigure'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof ParkingIntroFigure> = {
  component: ParkingIntroFigure,
}

export default meta

type Story = StoryObj<typeof ParkingIntroFigure>

export const Default: Story = {
  args: {
    height: 240,
    width: 375,
  },
}
