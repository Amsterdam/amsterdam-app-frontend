import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {FollowButton} from './FollowButton'

export default {
  component: FollowButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof FollowButton>

export const Default: ComponentStoryObj<typeof FollowButton> = {
  args: {
    followed: false,
  },
}
