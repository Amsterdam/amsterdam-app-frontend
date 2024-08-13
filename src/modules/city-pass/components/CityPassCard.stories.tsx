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
    cityPass: {
      id: '1',
      dateEnd: '2022-12-31T00:00:00.000Z',
      dateEndFormatted: '2022-12-31',
      budgets: [],
      balanceFormatted: '€20,00',
      owner: {
        firstname: 'Ryan',
        initials: 'R.',
        lastname: 'Huisman',
      },
      passNumber: 6064366011012605,
      passNumberComplete: '6064366011012605999',
    },
  },
}
