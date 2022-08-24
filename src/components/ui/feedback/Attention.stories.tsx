import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Attention} from '@/components/ui/feedback'
import {Paragraph} from '@/components/ui/text'

export default {
  component: Attention,
} as ComponentMeta<typeof Attention>

export const Default: ComponentStoryObj<typeof Attention> = {
  args: {
    children: (
      <Paragraph>
        Er is iets misgegaan met de app. Sorry voor het ongemak!
      </Paragraph>
    ),
    warning: false,
  },
}
