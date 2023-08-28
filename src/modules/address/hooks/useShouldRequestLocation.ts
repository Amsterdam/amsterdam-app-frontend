import {useCallback} from 'react'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {LocationType} from '@/modules/address/types'
import {useSelectedAddressForWasteGuide} from '@/modules/waste-guide/hooks/useSelectedAddressForWasteGuide'

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
}

export const useShouldRequestLocation = () => {
  const {address, locationType} = useSelectedAddressForWasteGuide()
  const coordinates = useLastKnownCoordinates()

  const shouldRequestLocation = useCallback(
    () => getShouldRequestLocation(!!address, !!coordinates, locationType),
    [address, coordinates, locationType],
  )

  return {shouldRequestLocation: shouldRequestLocation()}
}
