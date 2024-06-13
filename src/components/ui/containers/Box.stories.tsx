import {Meta, StoryFn} from '@storybook/react'
import {Box} from '@/components/ui/containers/Box'
import {Phrase} from '@/components/ui/text/Phrase'
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
} as Meta<typeof Box>

export const Default: StoryFn<typeof Box> = args => (
  <Box {...args}>
    <Phrase testID="Phrase">I’m a box.</Phrase>
  </Box>
)
