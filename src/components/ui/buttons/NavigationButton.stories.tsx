import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {NavigationButton} from './NavigationButton'

export default {
  component: NavigationButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof NavigationButton>

export const Default: ComponentStoryObj<typeof NavigationButton> = {
  args: {
    label: 'Label',
  },
}
