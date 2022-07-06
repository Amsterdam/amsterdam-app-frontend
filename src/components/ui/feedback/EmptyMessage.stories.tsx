import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {EmptyMessage} from './EmptyMessage'

export default {
  component: EmptyMessage,
} as ComponentMeta<typeof EmptyMessage>

export const Default: ComponentStoryObj<typeof EmptyMessage> = {
  args: {
    text: 'We hebben geen werkzaamheden gevonden voor dit adres.',
  },
}
