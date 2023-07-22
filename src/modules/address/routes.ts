export enum AddressRouteName {}

export type AddressStackParams = Record<string, never>

export enum AddressModalName {
  addressForm = 'AddressForm',
  privacyInfo = 'PrivacyInfo',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: undefined
  [AddressModalName.privacyInfo]: undefined
}
