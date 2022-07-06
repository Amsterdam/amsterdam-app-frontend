import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {ComponentStoryObj, Meta} from '@storybook/react'
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
} as Meta

export const Default: ComponentStoryObj<typeof IconButton> = {
  args: {
    badgeValue: 7,
    icon: (
      <Icon size={24}>
        <PersonalLogin fill="white" />
      </Icon>
    ),
  },
}
