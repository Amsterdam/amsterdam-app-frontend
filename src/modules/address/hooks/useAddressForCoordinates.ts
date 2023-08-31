import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useCallback, useMemo} from 'react'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {Coordinates} from '@/modules/address/types'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

/**
 * Get the address for a set of coordinates from the back end. Returns the request metadata too, so loading and error states can be handled.
 */
export const useAddressForCoordinates = (
  coordinates?: Coordinates,
  useLastKnown = true,
  rows = 1,
) => {
  const lastKnownCoordinates = useLastKnownCoordinates()
  const coordinatesToUse =
    coordinates ?? (useLastKnown ? lastKnownCoordinates : undefined)
  const {currentData, ...rest} = useGetAddressForCoordinatesQuery(
    coordinatesToUse ? {...coordinatesToUse, rows} : skipToken,
  )
  const getPdokAddresses = useCallback(() => {
    if (!currentData?.response?.docs?.length) {
      return
    }

    return currentData.response.docs
  }, [currentData?.response.docs])

  const addresses = useMemo(
    () => getPdokAddresses()?.map(transformAddressApiResponse),
    [getPdokAddresses],
  )

  const pdokAddresses = useMemo(() => getPdokAddresses(), [getPdokAddresses])

  return {
    ...rest,
    firstAddress: addresses?.[0],
    addresses,
    pdokAddresses,
  }
}
