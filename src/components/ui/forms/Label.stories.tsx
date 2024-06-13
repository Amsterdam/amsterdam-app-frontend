import {Meta, StoryObj} from '@storybook/react'
import {Label} from '@/components/ui/forms/Label'

export default {
  component: Label,
} as Meta<typeof Label>

export const Default: StoryObj<typeof Label> = {
  args: {
    text: 'Wat is de titel van je bericht?',
  },
}
