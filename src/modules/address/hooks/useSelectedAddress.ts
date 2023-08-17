import {useAddresForCoordinates} from '@/modules/address/hooks/useAddresForCoordinates'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {Address, LocationType} from '@/modules/address/types'

const getSelectedAddress = (
  address?: Address,
  locationAddress?: Address,
  locationType?: LocationType,
) => {
  switch (locationType) {
    case 'address':
      return address
    case 'location':
      return locationAddress
    default:
      return
  }
}

/**
 * Return the current or the last known location info, depending on the location type. Different modules may have different location types selected, so the location type is not part of the Address module itself.
 */
export const useSelectedAddress = (
  locationType?: LocationType,
  lastKnown = false,
) => {
  const address = useAddress()
  const {data, isError, isLoading} = useAddresForCoordinates(lastKnown)

  return {
    address: getSelectedAddress(address, data, locationType),
    isError: locationType === 'location' && isError,
    isLoading: locationType === 'location' && isLoading,
  }
}
