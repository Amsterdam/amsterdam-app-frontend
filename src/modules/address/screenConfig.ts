import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AddressModalName,
  AddressModalParams,
  AddressRouteName,
  AddressStackParams,
} from '@/modules/address/routes'
import {AddressScreen} from '@/modules/address/screens/Address.screen'
import {AddressFormScreen} from '@/modules/address/screens/AddressForm.screen'
import {PrivacyInfoScreen} from '@/modules/address/screens/PrivacyInfo.screen'

export const screenConfig: StackNavigationRoutes<AddressStackParams> = {
  [AddressRouteName.address]: {
    component: AddressScreen,
    name: AddressRouteName.address,
    options: {
      headerTitle: 'Mijn adres',
    },
  },
}

export const addressModals: StackNavigationRoutes<
  AddressModalParams,
  AddressModalName
> = {
  [AddressModalName.addressForm]: {
    component: AddressFormScreen,
    name: AddressModalName.addressForm,
  },
  [AddressModalName.privacyInfo]: {
    component: PrivacyInfoScreen,
    name: AddressModalName.privacyInfo,
  },
}
