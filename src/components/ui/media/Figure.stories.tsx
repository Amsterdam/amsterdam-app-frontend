import {Meta, StoryObj} from '@storybook/react'
import {Figure} from './Figure'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'

const meta: Meta<typeof Figure> = {
  component: Figure,
}

export default meta

export const Default: StoryObj<typeof Figure> = {
  args: {
    aspectRatio: 'wide',
    children: <HouseholdWasteToContainerImage />,
    height: 256,
  },
}
