import {Meta, StoryObj} from '@storybook/react'
import {Image} from './Image'
import source from '@/modules/welcome/assets/images/62225.wees-jezelf.4x5.md.jpg'

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
