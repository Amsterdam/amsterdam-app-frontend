import {useAddress} from '@/modules/address/hooks/useAddress'
import {useLocation} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useLocationType} from '@/modules/address/slice'
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
 * Return either the user profile address or the address for their last known location, depending on the location type that is set for the module that matches the slug.
 * The address for location is a query request response. If the locationType for the module is 'location', the isError and isFetching properties will be set to be able handle loading/error states.
 */
export const useSelectedAddress = (): {
  address: Address | undefined
  isError: boolean
  isFetching: boolean
  locationType: LocationType | undefined
} => {
  const address = useAddress()
  const locationType = useLocationType()
  const location = useLocation()

  return {
    address: getSelectedAddress(address, location, locationType),
    isError: false,
    isFetching: locationType === 'location' && !location,
    locationType,
  }
}
