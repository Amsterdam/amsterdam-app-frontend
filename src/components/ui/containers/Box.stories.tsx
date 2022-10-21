import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Box} from '@/components/ui/containers'
import {Phrase} from '@/components/ui/text'
import {baseColor} from '@/themes/tokens/base-color'

export default {
  component: Box,
  args: {
    distinct: false,
    grow: false,
    inset: 'md',
  },
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'Default screen',
          value: baseColor.primary.white,
        },
        {
          name: 'Settings screen',
          value: baseColor.neutral.grey1,
        },
      ],
    },
  },
} as ComponentMeta<typeof Box>

export const Default: ComponentStory<typeof Box> = args => (
  <Box {...args}>
    <Phrase>I’m a box.</Phrase>
  </Box>
)
