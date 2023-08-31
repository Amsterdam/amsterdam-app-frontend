import {useAddress} from '@/modules/address/hooks/useAddress'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {useLocationTypeForModule} from '@/modules/address/hooks/useLocationTypeForModule'
import {Address, LocationType} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

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
 * Return either the user profile address or the addres for their last known location, depending on the location type that is set for the module that matches the slug.
 * The address for location is a query request response. If the locationType for the module is 'location', the isError and isFetching properties will be set to be able handle loading/error states.
 */
export const useSelectedAddress = (slug: ModuleSlug) => {
  const address = useAddress()
  const locationType = useLocationTypeForModule(slug)
  const {data, isError, isFetching} = useAddressForCoordinates()

  return {
    address: getSelectedAddress(address, data, locationType),
    isError: locationType === 'location' && isError,
    isFetching: locationType === 'location' && isFetching,
    locationType,
  }
}
