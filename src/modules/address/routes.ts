export enum AddressRouteName {}

// eslint-disable-next-line @typescript-eslint/ban-types
export type AddressStackParams = {}

export enum AddressModalName {
  addressForm = 'AddressForm',
  addressInfo = 'AddressInfo',
}

export type AddressModalParams = {
  [AddressModalName.addressForm]: {addressIsTemporary?: boolean} | undefined
  [AddressModalName.addressInfo]: undefined
}
