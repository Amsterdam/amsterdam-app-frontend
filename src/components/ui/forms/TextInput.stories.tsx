import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {TextInput} from '@/components/ui/forms/TextInput'

export default {
  component: TextInput,
} as Meta<typeof TextInput>

export const Default: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    placeholder: 'Voer een titel in...',
    value: '',
  },
}

export const Multiline: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    multiline: true,
    numberOfLines: 5,
    placeholder: 'Voer een titel in...',
    value: '',
  },
}
