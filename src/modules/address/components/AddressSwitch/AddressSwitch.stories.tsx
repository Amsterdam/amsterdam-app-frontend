import {AddressSwitchBase} from './AddressSwitchBase'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Column} from '@/components/ui/layout/Column'

export default {
  component: AddressSwitchBase,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof AddressSwitchBase>

export const AllStates = {
  render: () => (
    <Column gutter="md">
      <AddressSwitchBase
        iconName="location"
        testID="NoAddressOrLocationAddressSwitch"
        title="Adres invullen"
      />
      <AddressSwitchBase
        iconName="spinner"
        testID="GettingLocationAddressSwitch"
        title="Uw huidige locatie"
      />
      <AddressSwitchBase
        iconName="housing"
        testID="AddressAddressSwitch"
        title="Oudezijds Voorburgwal 300"
      />
      <AddressSwitchBase
        iconName="mapLocationIosFilled"
        testID="LocationAddressSwitch"
        title="Cruquiusweg 5"
      />
    </Column>
  ),
}
export const NoAddressOrLocation: StoryObj<typeof AddressSwitchBase> = {
  args: {
    iconName: 'location',
    title: 'Adres invullen',
  },
}

export const GettingLocation: StoryObj<typeof AddressSwitchBase> = {
  args: {
    iconName: 'spinner',
    title: 'Uw huidige locatie',
  },
}

export const WithAddress: StoryObj<typeof AddressSwitchBase> = {
  args: {
    iconName: 'housing',
    title: 'Oudezijds Voorburgwal 300',
  },
}

export const WithLocation: StoryObj<typeof AddressSwitchBase> = {
  args: {
    iconName: 'mapLocationIosFilled',
    title: 'Cruquiusweg 5',
  },
}
