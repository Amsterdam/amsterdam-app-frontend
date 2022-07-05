import {Story} from '@storybook/react'
import React from 'react'
import {SubmitButton, SubmitButtonProps} from './SubmitButton'
import {Row} from '@/components/ui/layout'

export default {
  component: SubmitButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

const Template: Story<SubmitButtonProps> = args => (
  <Row align="start">
    <SubmitButton {...args} />
  </Row>
)

export const Default = Template.bind({})
Default.args = {
  text: 'Label',
}
