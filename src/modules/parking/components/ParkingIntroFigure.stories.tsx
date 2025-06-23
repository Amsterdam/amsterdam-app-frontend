import {Meta, StoryObj} from '@storybook/react'
import {ParkingIntroFigure} from './ParkingIntroFigure'

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
