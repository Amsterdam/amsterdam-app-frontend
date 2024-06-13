import {Meta, StoryObj} from '@storybook/react'
import {Pressable} from './Pressable'
import {Paragraph} from '@/components/ui/text/Paragraph'

export default {
  component: Pressable,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof Pressable>

export const Default: StoryObj<typeof Pressable> = {
  args: {
    children: <Paragraph>Press me</Paragraph>,
    insetHorizontal: 'lg',
  },
}
