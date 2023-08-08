import {Address, AddressQueryArg} from '@/modules/address/types'

export const getAddressParam = (
  address?: Address,
): AddressQueryArg | undefined => {
  if (!address?.coordinates) {
    return {address: address?.addressLine1}
  }

  return {
    address: undefined,
    ...address.coordinates,
  }
}
