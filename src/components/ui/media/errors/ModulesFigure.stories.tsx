import {Meta, StoryObj} from '@storybook/react'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'

const meta: Meta<typeof ModulesFigure> = {
  component: ModulesFigure,
}

export default meta

type Story = StoryObj<typeof ModulesFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
