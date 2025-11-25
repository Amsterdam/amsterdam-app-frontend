import {CopyButton} from './CopyButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: CopyButton,
} satisfies Meta<typeof CopyButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Inloggegevens kopiëren',
    textToCopy: 'Text to copy',
    testID: 'copyButton',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/OGvWl5mUfQToo80AvlBfI4/Parkeren-module?node-id=3037-2992&t=TQZv09GgjAmOAMjh-4',
    },
  },
}
