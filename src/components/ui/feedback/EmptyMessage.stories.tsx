import {Meta, StoryObj} from '@storybook/react'
import {EmptyMessage} from './EmptyMessage'

export default {
  component: EmptyMessage,
} as Meta<typeof EmptyMessage>

export const Default: StoryObj<typeof EmptyMessage> = {
  args: {
    text: 'We hebben geen werkzaamheden gevonden voor dit adres.',
  },
}
