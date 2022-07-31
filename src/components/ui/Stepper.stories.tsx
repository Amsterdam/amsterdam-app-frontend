import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Stepper} from '@/components/ui'

export default {
  component: Stepper,
} as ComponentMeta<typeof Stepper>

export const Default: ComponentStoryObj<typeof Stepper> = {
  args: {
    current: 1,
    length: 3,
  },
}
