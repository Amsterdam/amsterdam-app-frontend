import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Accordion} from './Accordion'
import {Paragraph} from './text'

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>

export const Default: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>Lorem ipsum...</Paragraph>
  </Accordion>
)

Default.args = {
  title: 'Default',
}
