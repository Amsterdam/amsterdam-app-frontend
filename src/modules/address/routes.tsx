import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum AddressRouteName {
  addressForm = 'AddressForm',
  addressInfo = 'AddressInfo',
}

export type AddressStackParams = {
  [AddressRouteName.addressForm]: undefined
  [AddressRouteName.addressInfo]: undefined
}

export const addressRoutes: StackNavigationRoutes<
  AddressStackParams,
  AddressRouteName
> = {
  [AddressRouteName.addressForm]: {
    name: AddressRouteName.addressForm,
    options: {
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Uw adres" />,
    },
  },
  [AddressRouteName.addressInfo]: {
    name: AddressRouteName.addressInfo,
    options: {
      headerShown: false,
      presentation: 'modal',
    },
  },
}
