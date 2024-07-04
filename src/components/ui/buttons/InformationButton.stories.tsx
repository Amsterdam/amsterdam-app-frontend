import {Meta, StoryObj} from '@storybook/react'
import {InformationButton} from './InformationButton'

export default {
  component: InformationButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof InformationButton>

export const Default: StoryObj<typeof InformationButton> = {
  args: {
    iconName: 'email',
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
}
