import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {alerts} from './alerts'

export default {
  component: AlertBase,
  parameters: {
    controls: {disable: true},
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof AlertBase>

export const Default: StoryObj<typeof AlertBase> = {
  render: () => (
    <Column gutter="sm">
      {Object.entries(alerts).map(([key, alert]) => (
        <AlertBase
          hasCloseIcon
          hasIcon
          {...alert}
          key={key}
        />
      ))}
    </Column>
  ),
}
