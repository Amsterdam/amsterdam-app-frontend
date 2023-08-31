import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {LocationType} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

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

export const useShouldRequestLocation = (slug: ModuleSlug) => {
  const {address, locationType} = useSelectedAddress(slug)
  const coordinates = useLastKnownCoordinates()

  return getShouldRequestLocation(!!address, !!coordinates, locationType)
}
