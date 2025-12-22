import type {HighAccuracyPurposeKey} from '@/modules/address/types'

export enum AddressRouteName {
  address = 'Address',
  chooseAddress = 'ChooseAddress',
}

export type AddressStackParams = {
  [AddressRouteName.address]: undefined
  [AddressRouteName.chooseAddress]: {
    highAccuracyPurposeKey?: HighAccuracyPurposeKey
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
