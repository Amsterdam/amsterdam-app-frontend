import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useMemo} from 'react'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {Coordinates} from '@/modules/address/types'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

type AddresForCoordinatesParams = {
  coordinates?: Coordinates
  rows?: number
  shouldFetch?: boolean
}

/**
 * Get the address for a set of coordinates from the back end. Requests the address for the last known coordinates if the coordinates parameter is omitted.
 * Returns the request metadata too, so loading and error states can be handled.
 */
export const useAddressForCoordinates = ({
  coordinates,
  rows = 1,
  shouldFetch = true,
}: AddresForCoordinatesParams = {}) => {
  const lastKnownCoordinates = useLastKnownCoordinates()
  const coordinatesToUse = coordinates ?? lastKnownCoordinates
  const {currentData, ...rest} = useGetAddressForCoordinatesQuery(
    coordinatesToUse && shouldFetch ? {...coordinatesToUse, rows} : skipToken,
  )

  const memoizedAddresses = useMemo(() => {
    if (!currentData?.response?.docs?.length) {
      return
    }

    const addressForCoordinates = currentData?.response.docs

    const addresses = addressForCoordinates.map(transformAddressApiResponse)
    const pdokAddresses = addressForCoordinates

    return {addresses, firstAddress: addresses?.[0], pdokAddresses}
  }, [currentData?.response.docs])

  return {
    ...rest,
    ...memoizedAddresses,
  }
}
