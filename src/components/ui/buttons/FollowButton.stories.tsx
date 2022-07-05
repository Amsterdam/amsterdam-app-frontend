import {FollowButton} from './FollowButton'

export default {
  component: FollowButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

export const Default = {
  args: {
    following: false,
  },
}
