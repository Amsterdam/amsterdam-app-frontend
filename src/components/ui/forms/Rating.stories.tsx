import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Rating} from '@/components/ui/forms/Rating'

export default {
  component: Rating,
  argTypes: {
    max: {control: 'number'},
  },
} as Meta<typeof Rating>

export const Default: StoryObj<typeof Rating> = {
  args: {
    label: 'Hoe makkelijk is het starten van een parkeersessie?',
    rating: 3,
    options: [
      {
        value: '1',
        label: 'Heel moeilijk',
      },
      {value: '2', label: 'Enigszins moeilijk'},
      {value: '3', label: 'Neutraal'},
      {value: '4', label: 'Enigszins makkelijk'},
      {value: '5', label: 'Heel makkelijk'},
    ],
  },
}
