export enum AddressRouteName {}

export type AddressStackParams = Record<string, never>

export enum AddressModalName {
  addressForm = 'AddressForm',
  addressInfo = 'AddressInfo',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: {addressIsTemporary?: boolean} | undefined
  [AddressModalName.addressInfo]: undefined
}
