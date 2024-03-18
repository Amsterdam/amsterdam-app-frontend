import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'

/**
 * Determines whether features dependent on address/location can display results
 */
export const useHasValidLocation = () => {
  const {address, locationType} = useSelectedAddress()
  const coordinates = useLastKnownCoordinates()

  if (locationType === 'location') {
    return !!coordinates
  }

  return !!address
}
