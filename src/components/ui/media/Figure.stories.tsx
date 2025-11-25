import {Figure} from './Figure'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
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
