import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type AddressStackParams = {
  AddressForm: undefined
  AddressInfo: undefined
}

export const addressRoutes: StackNavigationRoutes<
  AddressStackParams,
  'addressForm' | 'addressInfo'
> = {
  addressForm: {
    name: 'AddressForm',
    options: {
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Uw adres" />,
    },
  },
  addressInfo: {
    name: 'AddressInfo',
    options: {
      headerShown: false,
      presentation: 'modal',
    },
  },
}
