import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SelectionButtons} from '@/components/ui/forms/SelectionButtons'

export default {
  component: SelectionButtons,
  argTypes: {
    selected: {control: 'text'},
    selectionButtons: {control: 'object'},
    errorMessage: {control: 'text'},
    label: {control: 'text'},
  },
} as Meta<typeof SelectionButtons>

export const Default: StoryObj<typeof SelectionButtons> = {
  args: {
    selectionButtons: [{label: 'Ja'}, {label: 'Nee'}],
    label: 'Heeft u gevonden wat u zocht? ',
    selected: 'Ja',
  },
}

export const ErrorOption: StoryObj<typeof SelectionButtons> = {
  args: {
    selectionButtons: [{label: 'Ja'}, {label: 'Nee'}],
    label: 'Heeft u gevonden wat u zocht? ',
    selected: undefined,
    errorMessage: 'Maak een keuze uit bovenstaande opties',
  },
}

export const ManyOptions: StoryObj<typeof SelectionButtons> = {
  args: {
    selectionButtons: [
      {label: '0 - 3'},
      {label: '4 - 6'},
      {label: '7 - 10'},
      {label: '11 - 14'},
      {label: '15 - 18'},
    ],
    label: 'Hoeveel parkeersessies heeft u in de afgelopen week gedaan?',
    selected: '4 - 6',
  },
}
