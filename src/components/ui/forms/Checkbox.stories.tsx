import React from 'react'
import {Text} from 'react-native'
import {Checkbox} from './Checkbox'

export default {
  component: Checkbox,
  title: 'forms/Checkbox',
  args: {
    value: false,
    label: <Text>Een label</Text>,
    labelPosition: 'start',
  },
  argTypes: {onValueChange: {action: 'onValueChange'}},
}

export const Default = Checkbox
