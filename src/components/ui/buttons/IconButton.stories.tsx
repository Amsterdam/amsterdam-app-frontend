import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {IconButton} from './IconButton'
import {Icon} from '@/components/ui/media'

export default {
  component: IconButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof IconButton>

export const Default: ComponentStory<typeof Icon> = args => (
  <IconButton badgeValue={7} icon={<Icon {...args} />} />
)

Default.args = {
  name: 'person',
  size: 24,
}
