import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Icon} from './Icon'
import {Announcement} from '@/assets/icons'

export default {
  component: Icon,
} as ComponentMeta<typeof Icon>

export const Default: ComponentStory<typeof Icon> = args => (
  <Icon {...args}>
    <Announcement fill="black" />
  </Icon>
)
Default.args = {
  scalesWithFont: true,
  size: 32,
}
