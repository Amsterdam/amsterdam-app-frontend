import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Triangle} from '@/components/ui/feedback'
import {Direction} from '@/components/ui/types'

export default {
  component: Triangle,
} as ComponentMeta<typeof Triangle>

export const Default: ComponentStoryObj<typeof Triangle> = {
  args: {
    direction: Direction.right,
  },
}
