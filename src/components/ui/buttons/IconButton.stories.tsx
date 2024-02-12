import {Meta, StoryObj} from '@storybook/react'
import {IconButton} from './IconButton'
import {Icon} from '@/components/ui/media/Icon'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  argTypes: pressableArgTypes,
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    icon: (
      <Icon
        name="person"
        size="lg"
      />
    ),
    badgeValue: 7,
  },
}
