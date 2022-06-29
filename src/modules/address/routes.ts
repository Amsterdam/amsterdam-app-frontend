export enum AddressRouteName {
  addressForm = 'AddressForm',
  addressInfo = 'AddressInfo',
}

export type AddressStackParams = {
  [AddressRouteName.addressForm]: {addressIsTemporary?: boolean}
  [AddressRouteName.addressInfo]: undefined
}
