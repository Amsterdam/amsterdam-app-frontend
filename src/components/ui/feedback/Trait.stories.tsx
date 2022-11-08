import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import React from 'react'
import {Badge, Trait} from '@/components/ui/feedback'

export default {
  component: Trait,
} as ComponentMeta<typeof Trait>

export const Default: ComponentStory<typeof Trait> = args => (
  <Trait {...args} iconName="strides" />
)
Default.args = {
  label: '123 meter',
}

export const WithBadge: ComponentStoryObj<typeof Trait> = {
  args: {
    children: <Badge value={7} />,
    label: 'berichten',
  },
}
