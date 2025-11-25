import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ConstructionWorkDetailFigure} from '@/components/ui/media/errors/ConstructionWorkDetailFigure'

const meta: Meta<typeof ConstructionWorkDetailFigure> = {
  component: ConstructionWorkDetailFigure,
}

export default meta

type Story = StoryObj<typeof ConstructionWorkDetailFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
