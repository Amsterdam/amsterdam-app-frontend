import {StackNavigationRoutes} from '@/app/navigation'
import {
  AddressModalName,
  AddressModalParams,
  AddressStackParams,
} from '@/modules/address/routes'
import {AddressFormScreen} from '@/modules/address/screens'

export const screenConfig: StackNavigationRoutes<AddressStackParams> = {}

export const addressModals: StackNavigationRoutes<
  AddressModalParams,
  AddressModalName
> = {
  [AddressModalName.addressForm]: {
    component: AddressFormScreen,
    name: AddressModalName.addressForm,
  },
}
