import {Meta, StoryObj} from '@storybook/react'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {Direction} from '@/components/ui/types'

export default {
  component: Triangle,
} as Meta<typeof Triangle>

export const Default: StoryObj<typeof Triangle> = {
  args: {
    direction: Direction.right,
  },
}
