import {Meta, StoryObj} from '@storybook/react'
import {Warning} from '@/components/ui/feedback/Warning'

export default {
  component: Warning,
} as Meta<typeof Warning>

export const Default: StoryObj<typeof Warning> = {
  args: {
    title: 'Sorry …',
    text: 'Er is iets misgegaan',
  },
}
