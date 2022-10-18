export enum AddressRouteName {}

export type AddressStackParams = Record<string, never>

export enum AddressModalName {
  addressForm = 'AddressForm',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: undefined
}
