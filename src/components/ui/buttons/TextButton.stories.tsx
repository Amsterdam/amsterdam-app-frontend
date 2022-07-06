import {Story} from '@storybook/react'
import React from 'react'
import {TextButton, TextButtonProps} from './TextButton'

export default {
  component: TextButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

const Template: Story<TextButtonProps> = args => <TextButton {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'Label',
}
