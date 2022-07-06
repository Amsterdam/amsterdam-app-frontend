import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Pressable} from './Pressable'
import {Paragraph} from '@/components/ui/text'

export default {
  component: Pressable,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof Pressable>

export const Default: ComponentStoryObj<typeof Pressable> = {
  args: {
    children: <Paragraph>Press me</Paragraph>,
    insetHorizontal: 'lg',
  },
}
