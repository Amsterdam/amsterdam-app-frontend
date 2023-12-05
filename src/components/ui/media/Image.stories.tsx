import {Meta, StoryObj} from '@storybook/react'
import {Image} from './Image'
import source from '@/modules/onboarding/assets/images/screenshot-afvalwijzer.png'

const meta: Meta<typeof Image> = {
  component: Image,
}

export default meta

export const Default: StoryObj<typeof Image> = {
  args: {
    aspectRatio: 'wide',
    source,
  },
}
