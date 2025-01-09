import {Meta, StoryObj} from '@storybook/react'
import {ErrorFigure} from '@/components/ui/media/errors/ErrorFigure'

const meta: Meta<typeof ErrorFigure> = {
  component: ErrorFigure,
}

export default meta

type Story = StoryObj<typeof ErrorFigure>

export const Default: Story = {}
