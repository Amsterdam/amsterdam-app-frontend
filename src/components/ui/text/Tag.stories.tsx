import {Tag} from './Tag'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof Tag> = {
  component: Tag,
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {}
