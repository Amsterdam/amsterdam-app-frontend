import {ComponentMeta, ComponentStory} from '@storybook/react'
import {IconButton} from './IconButton'
import {Icon} from '@/components/ui/media/Icon'

export default {
  component: IconButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof IconButton>

export const Default: ComponentStory<typeof Icon> = args => (
  <IconButton
    badgeValue={7}
    icon={<Icon {...args} />}
  />
)

Default.args = {
  name: 'person',
  size: 'lg',
}
