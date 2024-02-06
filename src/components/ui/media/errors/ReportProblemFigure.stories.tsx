import {Meta, StoryObj} from '@storybook/react'
import {ReportProblemFigure} from '@/components/ui/media/errors/ReportProblemFigure'

const meta: Meta<typeof ReportProblemFigure> = {
  component: ReportProblemFigure,
}

export default meta

type Story = StoryObj<typeof ReportProblemFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
