import {Meta, StoryObj} from '@storybook/react'
import {CityPassCard} from './CityPassCard'

export default {
  component: CityPassCard,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof CityPassCard>

export const Default: StoryObj<typeof CityPassCard> = {
  args: {
    text: 'Saldo Kindtegoed € 86,34',
    title: 'Stadspas details van Ryan',
  },
}
