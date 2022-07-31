import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Box} from '@/components/ui'
import {Phrase} from '@/components/ui/text'

export default {
  component: Box,
} as ComponentMeta<typeof Box>

export const Default: ComponentStory<typeof Box> = args => (
  <Box {...args}>
    <Phrase>I’m a box.</Phrase>
  </Box>
)
Default.args = {
  background: 'grey',
}
