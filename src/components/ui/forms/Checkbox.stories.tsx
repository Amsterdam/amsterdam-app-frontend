import {Meta, StoryObj} from '@storybook/react'
import {Text} from 'react-native'
import {Checkbox} from './Checkbox'

export default {
  component: Checkbox,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
  },
} as Meta<typeof Checkbox>

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'end',
    value: false,
  },
}
