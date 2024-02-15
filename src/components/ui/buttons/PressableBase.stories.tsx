import {Meta, StoryObj} from '@storybook/react'
import {PressableBase} from './PressableBase'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta: Meta<typeof PressableBase> = {
  component: PressableBase,
  argTypes: pressableArgTypes,
}

export default meta

type Story = StoryObj<typeof PressableBase>

export const Default: Story = {}
