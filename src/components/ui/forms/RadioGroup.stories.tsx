import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {RadioGroup} from '@/components/ui/forms'

export default {
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>

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

export const Default: ComponentStoryObj<typeof RadioGroup> = {
  args: {
    options,
    value: 'valiant',
  },
}
