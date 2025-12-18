import {Checkbox} from './Checkbox'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

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
    label: 'Ik ga akkoord met de voorwaarden',
    labelPosition: 'end',
    isSelected: false,
  },
}
