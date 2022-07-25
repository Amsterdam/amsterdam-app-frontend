import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {TextInput} from '@/components/ui/forms'

export default {
  component: TextInput,
} as ComponentMeta<typeof TextInput>

export const Default: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    placeholder: 'Voer een titel in...',
    value: '',
  },
}
