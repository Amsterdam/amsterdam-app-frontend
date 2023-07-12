import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {FauxButton} from './FauxButton'

export default {
  component: FauxButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof FauxButton>

export const Default: ComponentStoryObj<typeof FauxButton> = {}
