import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useMemo} from 'react'
import {useCurrentCoordinates} from '@/modules/address/hooks/useCurrentCoordinates'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

export const useAddresForCoordinates = (lastKnown: boolean) => {
  const currentCoordinates = useCurrentCoordinates()
  const lastKnownCoordinates = useLastKnownCoordinates()
  const {data, ...rest} = useGetAddressForCoordinatesQuery(
    (lastKnown ? lastKnownCoordinates : currentCoordinates) ?? skipToken,
  )

  const transformedData = useMemo(() => {
    if (!data?.response?.docs?.[0]) {
      return
    }

    return transformAddressApiResponse(data.response.docs[0])
  }, [data?.response.docs])

  return {
    data: transformedData,
    ...rest,
  }
}
