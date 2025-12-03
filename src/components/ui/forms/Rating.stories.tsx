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
    ratingLabels: [
      'Heel moeilijk',
      'Enigszins moeilijk',
      'Neutraal',
      'Enigszins makkelijk',
      'Heel makkelijk',
    ],
    max: 5,
  },
}

export const WithoutLabels: StoryObj<typeof Rating> = {
  args: {
    max: 5,
    rating: 1,
  },
}

export const From1To8: StoryObj<typeof Rating> = {
  args: {
    max: 8,
    rating: 4,
  },
}
