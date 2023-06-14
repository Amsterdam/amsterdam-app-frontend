import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ImageURISource} from 'react-native'
import {Image} from './Image'

export default {
  component: Image,
} as ComponentMeta<typeof Image>

const mockImage =
  require('@/modules/welcome/assets/images/62225.wees-jezelf.4x5.md.jpg') as ImageURISource

export const Default: ComponentStory<typeof Image> = args => (
  <Image
    {...args}
    source={mockImage}
  />
)
Default.args = {
  aspectRatio: 'wide',
}
