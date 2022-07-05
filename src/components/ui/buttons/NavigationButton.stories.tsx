import {NavigationButton} from './NavigationButton'

export default {
  component: NavigationButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

export const Default = {
  args: {
    label: 'Label',
  },
}
