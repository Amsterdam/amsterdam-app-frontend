import {GeolocationError} from '@react-native-community/geolocation'
import {useCallback, useState} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCurrentPosition} from '@/hooks/useGetCurrentPosition'
import {addCurrentCoordinates} from '@/modules/address/slice'

export const useGetCurrentCoordinates = (
  onError?: (error: GeolocationError) => void,
) => {
  const getCurrentPosition = useGetCurrentPosition()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)

  return {
    getCurrentCoordinates: useCallback(() => {
      setPending(true)
      getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          dispatch(addCurrentCoordinates({lat: latitude, lon: longitude}))
          setPending(false)
        },
        error => {
          onError?.(error)
          // handle error
          setPending(false)
        },
      )
    }, [dispatch, getCurrentPosition, onError]),
    pending,
  }
}
