import {SelectButton} from './SelectButton'
import type {Meta, StoryObj} from '@storybook/react'

const meta = {
  component: SelectButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} satisfies Meta<typeof SelectButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    iconName: 'alert',
    testID: 'testID',
    text: 'Text',
    title: 'Title',
    onPress: () => null,
  },
}
