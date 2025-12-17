import {NotificationToggleBox} from './NotificationToggleBox'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof NotificationToggleBox> = {
  argTypes: {
    onChange: {action: 'onChange'},
  },
  component: NotificationToggleBox,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=4799-2156&t=3FbaNkEPQHO2MWPe-4',
    },
  },
}
