import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Text} from 'react-native'
import {Switch} from './Switch'

export default {
  component: Switch,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
  },
} as ComponentMeta<typeof Switch>

export const Default: ComponentStoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'end',
    value: true,
  },
}
