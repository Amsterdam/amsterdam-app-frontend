import {Meta, StoryObj} from '@storybook/react'
import {WasteGuideFigure} from '@/components/ui/media/errors/WasteGuideFigure'

const meta: Meta<typeof WasteGuideFigure> = {
  component: WasteGuideFigure,
}

export default meta

type Story = StoryObj<typeof WasteGuideFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
