import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Warning} from '@/components/ui/feedback'

export default {
  component: Warning,
} as ComponentMeta<typeof Warning>

export const Default: ComponentStoryObj<typeof Warning> = {
  args: {
    title: 'Sorry …',
    text: 'Er is iets misgegaan',
  },
}
