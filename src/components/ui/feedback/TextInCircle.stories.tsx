import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {TextInCircle} from '@/components/ui/feedback'
import {Phrase} from '@/components/ui/text'

export default {
  component: TextInCircle,
} as ComponentMeta<typeof TextInCircle>

export const Default: ComponentStory<typeof TextInCircle> = args => (
  <TextInCircle {...args}>
    <Phrase>I’m a box.</Phrase>
  </TextInCircle>
)
Default.args = {
  label: '7',
}
