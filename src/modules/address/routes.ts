export enum AddressRouteName {
  address = 'Address',
}

export type AddressStackParams = {[AddressRouteName.address]: undefined}

export enum AddressModalName {
  addressForm = 'AddressForm',
  privacyInfo = 'PrivacyInfo',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: undefined
  [AddressModalName.privacyInfo]: undefined
}
