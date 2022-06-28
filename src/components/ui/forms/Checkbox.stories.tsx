import React from 'react'
import {Text} from 'react-native'
import {Checkbox} from './Checkbox'

export default {
  component: Checkbox,
  argTypes: {onValueChange: {action: 'onValueChange'}},
}

export const Default = {
  args: {
    value: false,
    label: <Text>Een label</Text>,
    labelPosition: 'end',
  },
}
