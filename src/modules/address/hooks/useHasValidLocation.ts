import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {LocationType} from '@/modules/address/types'

const getHasValidLocation = (
  hasAddress: boolean,
  hasCoordinates: boolean,
  locationType: LocationType,
) => {
  if (locationType === 'location') {
    return hasCoordinates
  }

  return hasAddress
}

/** Determines whether features dependent on address/location can display results */
export const useHasValidLocation = () => {
  const {address, locationType} = useSelectedAddress()
  const coordinates = useLastKnownCoordinates()

  return getHasValidLocation(!!address, !!coordinates, locationType)
}
