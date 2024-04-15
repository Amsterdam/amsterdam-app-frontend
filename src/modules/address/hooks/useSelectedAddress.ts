import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectAddress,
  selectIsGettingLocation,
  selectLocation,
  selectLocationType,
} from '@/modules/address/slice'

/**
 * Return either the user profile address or the address for their last known location, depending on the location type that is set for the module that matches the slug.
 * The address for location is a query request response. If the locationType for the module is 'location', the isError and isFetching properties will be set to be able handle loading/error states.
 */
export const useSelectedAddress = () => {
  const locationType = useSelector(selectLocationType)
  const address = useSelector(selectAddress)
  const locationAddress = useSelector(selectLocation)
  const isGettingLocation = useSelector(selectIsGettingLocation)
  const resultAddress = locationType === 'location' ? locationAddress : address

  return {
    address: resultAddress,
    hasValidAddress: !!resultAddress,
    isFetching: locationType === 'location' && isGettingLocation,
    locationType,
  }
}
