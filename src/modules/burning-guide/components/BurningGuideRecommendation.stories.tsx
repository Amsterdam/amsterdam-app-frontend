import {BurningGuideCodeVariant} from '../types'
import {BurningGuideRecommendation} from './BurningGuideRecommendation'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: BurningGuideRecommendation,
} satisfies Meta<typeof BurningGuideRecommendation>

export default meta

type Story = StoryObj<typeof meta>

export const CodeRed: Story = {
  args: {
    variant: BurningGuideCodeVariant.red,
  },
}

export const CodeOrange: Story = {
  args: {
    variant: BurningGuideCodeVariant.orange,
  },
}

export const CodeYellow: Story = {
  args: {
    variant: BurningGuideCodeVariant.yellow,
  },
}
