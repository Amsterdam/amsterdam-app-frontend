import {Meta, StoryObj} from '@storybook/react'
import {FollowButton} from './FollowButton'

export default {
  component: FollowButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof FollowButton>

export const Default: StoryObj<typeof FollowButton> = {
  args: {
    followed: false,
  },
}
