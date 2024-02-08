import {Meta, StoryObj} from '@storybook/react'
import {UpdateFigure} from '@/components/ui/media/errors/UpdateFigure'

const meta: Meta<typeof UpdateFigure> = {
  component: UpdateFigure,
}

export default meta

type Story = StoryObj<typeof UpdateFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
