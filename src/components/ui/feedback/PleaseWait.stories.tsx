import {Meta, StoryObj} from '@storybook/react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Canvas} from '@/storybook/components'

export default {
  component: PleaseWait,
  decorators: [
    Story => (
      <Canvas
        height="256px"
        highlight
        maxWidth="512px">
        {Story()}
      </Canvas>
    ),
  ],
} as Meta<typeof PleaseWait>

export const Default: StoryObj<typeof PleaseWait> = {
  args: {
    grow: true,
  },
}
