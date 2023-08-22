export enum AddressRouteName {}

export type AddressStackParams = Record<string, never>

export enum AddressModalName {
  addressForm = 'AddressForm',
  locationPermissionInstructions = 'LocationPermissionInstructions',
  privacyInfo = 'PrivacyInfo',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: undefined
  [AddressModalName.locationPermissionInstructions]: undefined
  [AddressModalName.privacyInfo]: undefined
}
