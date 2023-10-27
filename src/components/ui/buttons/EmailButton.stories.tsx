import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {EmailButton} from './EmailButton'

export default {
  component: EmailButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof EmailButton>

export const Default: ComponentStoryObj<typeof EmailButton> = {
  args: {
    email: 'ontwikkelingzeeburgereiland@amsterdam.nl',
    subject: 'Vraag over zeeburg.',
  },
}
