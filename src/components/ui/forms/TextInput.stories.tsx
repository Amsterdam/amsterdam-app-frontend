import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {TextInput} from '@/components/ui/forms/TextInput'

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

export const Multiline: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    multiline: true,
    numberOfLines: 5,
    placeholder: 'Voer een titel in...',
    value: '',
  },
}
