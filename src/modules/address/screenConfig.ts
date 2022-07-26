import {StackNavigationRoutes} from '@/app/navigation'
import {AddressStackParams, AddressRouteName} from '@/modules/address/routes'
import {
  AddressFormScreen,
  AddressPrivacyInfoScreen,
} from '@/modules/address/screens'

export const addressScreenConfig: StackNavigationRoutes<
  AddressStackParams,
  AddressRouteName
> = {
  [AddressRouteName.addressForm]: {
    component: AddressFormScreen,
    name: AddressRouteName.addressForm,
    options: {
      presentation: 'modal',
      headerTitle: 'Uw adres',
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
