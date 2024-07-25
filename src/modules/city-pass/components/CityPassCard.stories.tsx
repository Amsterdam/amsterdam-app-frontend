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
    passOwner: {
      voornaam: 'Ryan',
      initialen: 'R.',
      achternaam: 'Huisman',
      passen: [
        {
          id: 201174,
          pasnummer: 6011012856477,
          pasnummer_volledig: '6064366011012856477',
          categorie: 'Minima stadspas',
          categorie_code: 'M',
          expiry_date: '2023-07-31T21:59:59.000Z',
          passoort: {
            id: 11,
            naam: 'Digitale Stadspas',
          },
          actief: true,
          budgetten: [
            {
              code: '2023_AMSTEG_ENERGIE',
              naam: 'Energiezuinig tegoed',
            },
            {
              code: '2023_AMSTEG_KIND',
              naam: 'Kindtegoed',
            },
          ],
        },
        {
          id: 201053,
          pasnummer: 6011012781063,
          pasnummer_volledig: '6064366011012781063',
          categorie: 'Minima stadspas',
          categorie_code: 'M',
          expiry_date: '2023-07-31T21:59:59.000Z',
          passoort: {
            id: 11,
            naam: 'Digitale Stadspas',
          },
          actief: false,
          budgetten: [],
        },
      ],
    },
  },
}
