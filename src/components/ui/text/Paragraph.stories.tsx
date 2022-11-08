import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Paragraph} from './Paragraph'

export default {
  component: Paragraph,
} as ComponentMeta<typeof Paragraph>

export const Default: ComponentStory<typeof Paragraph> = args => (
  <Paragraph {...args}>
    Jouw typograaf biedt mij zulke exquise schreven!
  </Paragraph>
)
Default.args = {
  color: 'default',
  variant: 'body',
}
