import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Text} from 'react-native'
import {Checkbox} from './Checkbox'

export default {
  component: Checkbox,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
  },
} as ComponentMeta<typeof Checkbox>

export const Default: ComponentStoryObj<typeof Checkbox> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'end',
    value: false,
  },
}
