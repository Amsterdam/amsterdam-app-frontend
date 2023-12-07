import {Address} from '@/modules/address/types'
import {AddressQueryArgs} from '@/types/api'

export const getAddressParam = (
  address?: Address,
): AddressQueryArgs | undefined => {
  if (!address?.coordinates) {
    return {address: address?.addressLine1}
  }

  return {
    address: undefined,
    ...address.coordinates,
  }
}
