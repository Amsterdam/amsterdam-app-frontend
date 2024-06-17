import {Meta, StoryFn, StoryObj} from '@storybook/react'
import {Badge} from '@/components/ui/feedback/Badge'
import {Trait} from '@/components/ui/feedback/Trait'

export default {
  component: Trait,
} as Meta<typeof Trait>

export const Default: StoryFn<typeof Trait> = args => (
  <Trait
    {...args}
    iconName="location"
  />
)
Default.args = {
  label: '123 meter',
}

export const WithBadge: StoryObj<typeof Trait> = {
  args: {
    children: (
      <Badge
        testID="Badge"
        value={7}
      />
    ),
    label: 'berichten',
  },
}
