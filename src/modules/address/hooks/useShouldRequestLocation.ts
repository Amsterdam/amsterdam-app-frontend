import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {LocationType} from '@/modules/address/types'

const getShouldRequestLocation = (
  hasAddress: boolean,
  hasCoordinates: boolean,
  locationType?: LocationType,
) => {
  if (!locationType) {
    return true
  }

  if (locationType === 'address') {
    return !hasAddress
  }

  if (locationType === 'location') {
    return !hasCoordinates
  }

  return true
}

export const useShouldRequestLocation = () => {
  const {address, locationType} = useSelectedAddress()
  const coordinates = useLastKnownCoordinates()

  return getShouldRequestLocation(!!address, !!coordinates, locationType)
}
