import {AddressSwitcherBase} from './AddressSwitcher.Base'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: AddressSwitcherBase,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof AddressSwitcherBase>

export const NoAddressOrLocation: StoryObj<typeof AddressSwitcherBase> = {
  args: {
    iconName: 'location',
    title: 'Adres invullen',
  },
}

export const GettingLocation: StoryObj<typeof AddressSwitcherBase> = {
  args: {
    iconName: 'spinner',
    title: 'Uw huidige locatie',
  },
}

export const WithAddress: StoryObj<typeof AddressSwitcherBase> = {
  args: {
    iconName: 'housing',
    title: 'Oudezijds Voorburgwal 300',
  },
}

export const WithLocation: StoryObj<typeof AddressSwitcherBase> = {
  args: {
    iconName: 'location',
    title: 'Oudezijds Voorburgwal 300',
  },
}
