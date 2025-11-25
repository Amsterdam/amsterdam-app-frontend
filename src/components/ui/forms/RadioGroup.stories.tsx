import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'

export default {
  component: RadioGroup,
} as Meta<typeof RadioGroup>

const options = [
  {
    label: 'Heldhaftig',
    value: 'valiant',
  },
  {
    label: 'Vastberaden',
    value: 'steadfast',
  },
  {
    label: 'Barmhartig',
    value: 'compassionate',
  },
]

export const Default: StoryObj<typeof RadioGroup> = {
  args: {
    options,
    value: 'valiant',
  },
}
