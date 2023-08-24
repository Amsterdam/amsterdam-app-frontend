import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useMemo} from 'react'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {Coordinates} from '@/modules/address/types'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

/**
 * Get the address for a set of coordinates from the back end. Returns the request metadata too, so loading and error states can be handled.
 */
export const useAddresForCoordinates = (coordinates?: Coordinates) => {
  const lastKnownCoordinates = useLastKnownCoordinates()
  const {currentData, ...rest} = useGetAddressForCoordinatesQuery(
    coordinates ?? lastKnownCoordinates ?? skipToken,
  )

  return {
    ...rest,
    data: useMemo(() => {
      if (!currentData?.response?.docs?.[0]) {
        return
      }

      return transformAddressApiResponse(currentData.response.docs[0])
    }, [currentData?.response.docs]),
  }
}
