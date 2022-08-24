import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Image} from './Image'

export default {
  component: Image,
} as ComponentMeta<typeof Image>

const mockImageUrl =
  'https://www.amsterdam.nl/publish/pages/987083/60994-spiegelgracht-02-21apr2021-e-v-eis940.jpg'

export const Default: ComponentStory<typeof Image> = args => (
  <Image {...args} source={{uri: mockImageUrl}} />
)
Default.args = {
  aspectRatio: 'wide',
}
