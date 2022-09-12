import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {IconWithTitleButton} from './IconWithTitleButton'
import {Icon} from '@/components/ui/media'

export default {
  component: IconWithTitleButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof IconWithTitleButton>

export const Default: ComponentStoryObj<typeof IconWithTitleButton> = {
  args: {
    icon: (
      <Icon size={24}>
        <Email fill="#004699" />
      </Icon>
    ),
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
}
