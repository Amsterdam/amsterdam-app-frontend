import {Meta, StoryObj} from '@storybook/react'
import {ImageFallback} from './ImageFallback'

const meta: Meta<typeof ImageFallback> = {
  component: ImageFallback,
}

export default meta

export const Default: StoryObj<typeof ImageFallback> = {
  args: {
    aspectRatio: 'wide',
  },
}
