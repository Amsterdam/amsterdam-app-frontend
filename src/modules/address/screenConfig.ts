import {AddressStackParams, AddressRouteName} from './routes'
import {AddressFormScreen, AddressPrivacyInfoScreen} from './screens'
import {StackNavigationRoutes} from '@/app/navigation'

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
