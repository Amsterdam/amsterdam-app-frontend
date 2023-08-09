import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useCallback, useEffect, useState} from 'react'
import GetLocation, {Location} from 'react-native-get-location'
import {useSentry} from '@/hooks/useSentry'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {addLocation, removeLocation} from '@/modules/address/slice'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'
import {useAppDispatch} from '@/store/hooks'
import {getPropertyFromMaybeError} from '@/utils/object'

enum GetLocationErrorCode {
  CANCELLED = 'CANCELLED', // Location cancelled by user or by another request
  TIMEOUT = 'TIMEOUT', // Location request timed out
  UNAUTHORIZED = 'UNAUTHORIZED', // Authorization denied
  UNAVAILABLE = 'UNAVAILABLE', // Location service is disabled or unavailable
}

export const useRequestLocation = () => {
  const dispatch = useAppDispatch()
  const {sendSentryErrorLog} = useSentry()
  const [location, setLocation] = useState<Location>()
  const {data} = useGetAddressForCoordinatesQuery(
    location ? {lat: location.latitude, lon: location.longitude} : skipToken,
  )

  useEffect(() => {
    if (data) {
      dispatch(addLocation(transformAddressApiResponse(data.response.docs[0])))
    }
  }, [data, dispatch])

  return useCallback(() => {
    setLocation(undefined)
    dispatch(removeLocation())
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true, // should match android.permission.ACCESS_FINE_LOCATION or android.permission.ACCESS_COARSE_LOCATION
      timeout: 30000,
      rationale: {
        title: 'Toestaan dat de app je locatie gebruikt?',
        message: 'Dit is nodig om locatiegebonden informatie te kunnen tonen.',
        buttonPositive: 'Sta toe',
        buttonNegative: 'Sta niet toe',
        buttonNeutral: 'Sta één sessie toe',
      },
    })
      .then(setLocation)
      .catch(error => {
        const code = getPropertyFromMaybeError<GetLocationErrorCode>(
          error,
          'code',
        )

        if (
          code === GetLocationErrorCode.TIMEOUT ||
          code === GetLocationErrorCode.UNAVAILABLE
        ) {
          sendSentryErrorLog('GetLocation failed', 'useRequestLocation.ts', {
            code,
          })
        }
      })
  }, [dispatch, sendSentryErrorLog])
}
