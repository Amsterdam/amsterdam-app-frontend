import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useMemo} from 'react'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {Coordinates} from '@/modules/address/types'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

type AddresForCoordinatesParams = {
  coordinates?: Coordinates
  rows?: number
  shouldFetch?: boolean
}

/**
 * Get the address for a set of coordinates from the back end.
 * Returns the request metadata too, so loading and error states can be handled.
 */
export const useAddressForCoordinates = ({
  coordinates,
  rows = 1,
}: AddresForCoordinatesParams = {}) => {
  const {currentData, isFetching} = useGetAddressForCoordinatesQuery(
    coordinates ? {...coordinates, rows} : skipToken,
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
    isFetching,
    ...memoizedAddresses,
  }
}
