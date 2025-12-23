import type {HighAccuracyPurposeKey} from '@/modules/address/types'
import type {ReduxKey} from '@/store/types/reduxKey'

export enum AddressRouteName {
  address = 'Address',
  chooseAddress = 'ChooseAddress',
}

export type AddressStackParams = {
  [AddressRouteName.address]: undefined
  [AddressRouteName.chooseAddress]: {
    highAccuracyPurposeKey?: HighAccuracyPurposeKey
    reduxKey?: ReduxKey
  }
}

export enum AddressModalName {
  myAddressForm = 'MyAddressForm',
  privacyInfo = 'PrivacyInfo',
}

export type AddressModalParams = {
  [AddressModalName.myAddressForm]: undefined
  [AddressModalName.privacyInfo]: undefined
}
