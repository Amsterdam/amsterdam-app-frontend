import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {AddressFormScreen, AddressPrivacyInfoScreen} from './screens'

export enum AddressRouteName {
  addressForm = 'AddressForm',
  addressInfo = 'AddressInfo',
}

export type AddressStackParams = {
  [AddressRouteName.addressForm]: {addressIsTemporary?: boolean}
  [AddressRouteName.addressInfo]: undefined
}

export const addressRoutes: StackNavigationRoutes<
  AddressStackParams,
  AddressRouteName
> = {
  [AddressRouteName.addressForm]: {
    component: AddressFormScreen,
    name: AddressRouteName.addressForm,
    options: {
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Uw adres" />,
    },
  },
  [AddressRouteName.addressInfo]: {
    component: AddressPrivacyInfoScreen,
    name: AddressRouteName.addressInfo,
    options: {
      headerShown: false,
      presentation: 'modal',
    },
  },
}
