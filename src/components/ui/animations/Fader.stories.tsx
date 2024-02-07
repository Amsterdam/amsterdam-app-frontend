import {Meta, StoryObj} from '@storybook/react'
import {Fader} from './Fader'
import {Block} from '@/storybook/components/Block'

const meta: Meta<typeof Fader> = {
  component: Fader,
  args: {
    children: <Block label="Darth Fader" />,
  },
}

export default meta

type Story = StoryObj<typeof Fader>

export const Default: Story = {}
