import {Meta, StoryObj} from '@storybook/react'
import {FauxButton} from './FauxButton'

export default {
  component: FauxButton,
  args: {children: 'Hi!'},
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof FauxButton>

export const Default: StoryObj<typeof FauxButton> = {}
