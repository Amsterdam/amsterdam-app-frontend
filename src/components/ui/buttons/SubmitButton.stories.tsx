import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {SubmitButton} from './SubmitButton'

export default {
  component: SubmitButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof SubmitButton>

export const Default: ComponentStoryObj<typeof SubmitButton> = {
  args: {
    text: 'Label',
  },
}
