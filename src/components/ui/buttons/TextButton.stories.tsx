import {Story} from '@storybook/react'
import React from 'react'
import {TextButton, TextButtonProps} from './TextButton'
import {Row} from '@/components/ui/layout'

export default {
  component: TextButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

const Template: Story<TextButtonProps> = args => (
  <Row align="start">
    <TextButton {...args} />
  </Row>
)

export const Default = Template.bind({})
Default.args = {
  text: 'Label',
}
