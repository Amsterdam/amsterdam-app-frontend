import {Meta, StoryObj} from '@storybook/react'
import {AddButton} from './AddButton'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta: Meta<typeof AddButton> = {
  component: AddButton,
  argTypes: pressableArgTypes,
}

export default meta

type Story = StoryObj<typeof AddButton>

export const Default: Story = {
  render: () => <AddButton />,
}
