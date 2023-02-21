import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Figure} from './Figure'
import {HouseholdWasteToContainerImage} from '@/modules/waste-guide/assets/images'

export default {
  component: Figure,
} as ComponentMeta<typeof Figure>

export const Default: ComponentStory<typeof Figure> = args => (
  <Figure {...args}>
    <HouseholdWasteToContainerImage />
  </Figure>
)
Default.args = {
  aspectRatio: 'wide',
  height: 256,
}
