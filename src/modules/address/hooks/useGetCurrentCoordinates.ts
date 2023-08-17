import {GeolocationError} from '@react-native-community/geolocation'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCurrentPosition} from '@/hooks/useGetCurrentPosition'
import {requestLocationFailedAlertConfig} from '@/modules/address/constants'
import {addCurrentCoordinates} from '@/modules/address/slice'
import {setAlert} from '@/store/slices/alert'

export const useGetCurrentCoordinates = (
  onError?: (error: GeolocationError) => void,
) => {
  const getCurrentPosition = useGetCurrentPosition()
  const dispatch = useDispatch()

  return useCallback(() => {
    getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        dispatch(addCurrentCoordinates({lat: latitude, lon: longitude}))
      },
      error => {
        onError?.(error)
        dispatch(setAlert(requestLocationFailedAlertConfig))
      },
    )
  }, [dispatch, getCurrentPosition, onError])
}
