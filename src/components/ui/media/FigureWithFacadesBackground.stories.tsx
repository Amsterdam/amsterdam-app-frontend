import {FigureWithFacadesBackground} from './FigureWithFacadesBackground'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'

const meta: Meta<typeof FigureWithFacadesBackground> = {
  component: FigureWithFacadesBackground,
}

export default meta

export const Default: StoryObj<typeof FigureWithFacadesBackground> = {
  args: {
    children: <HouseholdWasteToContainerImage />,
  },
}
