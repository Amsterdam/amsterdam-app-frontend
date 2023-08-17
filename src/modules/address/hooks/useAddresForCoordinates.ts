import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useMemo} from 'react'
import {useCurrentCoordinates} from '@/modules/address/hooks/useCurrentCoordinates'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

/**
 * Get the address for a set of coordinates from the back end. Returns the request metadata too, so loading and error states can be handled.
 */
export const useAddresForCoordinates = (lastKnown: boolean) => {
  const currentCoordinates = useCurrentCoordinates()
  const lastKnownCoordinates = useLastKnownCoordinates()
  const {currentData, ...rest} = useGetAddressForCoordinatesQuery(
    (lastKnown ? lastKnownCoordinates : currentCoordinates) ?? skipToken,
  )

  const transformedData = useMemo(() => {
    if (!currentData?.response?.docs?.[0]) {
      return
    }

    return transformAddressApiResponse(currentData.response.docs[0])
  }, [currentData?.response.docs])

  return {
    ...rest,
    data: transformedData,
  }
}
