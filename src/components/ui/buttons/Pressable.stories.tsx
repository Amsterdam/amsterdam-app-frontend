import {Meta, Story} from '@storybook/react'
import React from 'react'
import {Pressable, PressableProps} from './Pressable'
import {Paragraph} from '@/components/ui/text'

export default {
  component: Pressable,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta

const Template: Story<PressableProps> = args => <Pressable {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Paragraph>Press me</Paragraph>,
  insetHorizontal: 'lg',
}
