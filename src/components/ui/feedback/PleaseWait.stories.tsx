import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Canvas} from '../../../../.storybook/components'
import {PleaseWait} from './PleaseWait'

export default {
  component: PleaseWait,
  decorators: [
    Story => (
      <Canvas height="256px" highlight maxWidth="512px">
        {Story()}
      </Canvas>
    ),
  ],
} as ComponentMeta<typeof PleaseWait>

export const Default: ComponentStoryObj<typeof PleaseWait> = {
  args: {
    grow: true,
  },
}
