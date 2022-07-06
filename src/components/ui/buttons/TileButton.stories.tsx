import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {TileButton} from './TileButton'

export default {
  component: TileButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof TileButton>

export const Default: ComponentStoryObj<typeof TileButton> = {
  args: {
    label: 'Label',
  },
}
