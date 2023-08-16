import {useMemo} from 'react'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useLastKnownLocationAddress} from '@/modules/address/hooks/useLastKnownLocationAddress'
import {Address, LocationType} from '@/modules/address/types'

const getSelectedAddress = (
  address?: Address,
  lastKnownLocationAddress?: Address,
  locationType?: LocationType,
) => {
  switch (locationType) {
    case 'address':
      return address
    case 'location':
      return lastKnownLocationAddress
    default:
      return
  }
}

/**
 * Return location info depending on the location type. Different modules may have different location types selected, so the location type is not part of the Address module itself.
 */
export const useLocationInfo = (locationType?: LocationType) => {
  const address = useAddress()
  const lastKnownLocationAddress = useLastKnownLocationAddress()

  return useMemo(
    () => ({
      address,
      lastKnownLocationAddress,
      selectedAddress: getSelectedAddress(
        address,
        lastKnownLocationAddress,
        locationType,
      ),
    }),
    [address, lastKnownLocationAddress, locationType],
  )
}
