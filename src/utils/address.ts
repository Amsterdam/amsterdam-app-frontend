import {Address, AddressQueryArg} from '@/modules/address'

export const getAddressParam = (
  address?: Address,
): AddressQueryArg | undefined => {
  if (!address?.coordinates) {
    return {address: address?.addressText}
  }
  return {
    address: undefined,
    ...address.coordinates,
  }
}
