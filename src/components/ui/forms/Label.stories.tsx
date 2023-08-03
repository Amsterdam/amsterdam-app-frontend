import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Label} from '@/components/ui/forms/Label'

export default {
  component: Label,
} as ComponentMeta<typeof Label>

export const Default: ComponentStoryObj<typeof Label> = {
  args: {
    text: 'Wat is de titel van je bericht?',
  },
}
