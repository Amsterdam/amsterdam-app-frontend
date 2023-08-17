import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {requestLocationFailedAlertConfig} from '@/modules/address/constants'
import {useCurrentCoordinates} from '@/modules/address/hooks/useCurrentCoordinates'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'
import {setAlert} from '@/store/slices/alert'

export const useAddresForCoordinates = (lastKnown: boolean) => {
  const currentCoordinates = useCurrentCoordinates()
  const lastKnownCoordinates = useLastKnownCoordinates()
  const dispatch = useDispatch()
  const {data, ...rest} = useGetAddressForCoordinatesQuery(
    (lastKnown ? lastKnownCoordinates : currentCoordinates) ?? skipToken,
  )

  useEffect(() => {
    if (rest.isError) {
      dispatch(setAlert(requestLocationFailedAlertConfig))
    }
  }, [rest.isError, dispatch])

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
