import {Meta, StoryObj} from '@storybook/react'
import {Text} from 'react-native'
import {Switch} from './Switch'

export default {
  component: Switch,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
  },
} as Meta<typeof Switch>

export const Default: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'end',
    value: true,
  },
}
