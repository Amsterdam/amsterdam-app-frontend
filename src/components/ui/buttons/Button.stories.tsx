import {Meta, Story} from '@storybook/react'
import React from 'react'
import {Button, ButtonProps} from './Button'

export default {
  component: Button,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button text="Label" {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'Label',
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Label',
  variant: 'secondary',
}

export const Inverse = Template.bind({})
Inverse.args = {
  text: 'Label',
  variant: 'inverse',
}

export const Text = Template.bind({})
Text.args = {
  text: 'Label',
  variant: 'text',
}
