import {Meta, StoryObj} from '@storybook/react'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'

const meta: Meta<typeof ConstructionWorkFigure> = {
  component: ConstructionWorkFigure,
}

export default meta

type Story = StoryObj<typeof ConstructionWorkFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
