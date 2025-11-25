import {ImageFallback} from './ImageFallback'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof ImageFallback> = {
  component: ImageFallback,
}

export default meta

export const Default: StoryObj<typeof ImageFallback> = {
  args: {
    aspectRatio: 'wide',
  },
}
