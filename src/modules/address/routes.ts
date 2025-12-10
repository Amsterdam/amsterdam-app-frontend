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
  addressForm = 'AddressForm',
  privacyInfo = 'PrivacyInfo',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: undefined
  [AddressModalName.privacyInfo]: undefined
}
