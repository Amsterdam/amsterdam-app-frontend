import {Meta, StoryObj} from '@storybook/react'
import {EmailButton} from './EmailButton'

export default {
  component: EmailButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof EmailButton>

export const Default: StoryObj<typeof EmailButton> = {
  args: {
    email: 'ontwikkelingzeeburgereiland@amsterdam.nl',
    subject: 'Vraag over zeeburg.',
  },
}
