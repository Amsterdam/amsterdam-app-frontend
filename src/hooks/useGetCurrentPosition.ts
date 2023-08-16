import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation'
import {useCallback} from 'react'
import {Platform} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
})

const geolocationErrorCodeMap: Record<number, string> = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
  4: 'ACTIVITY_NULL',
}

/**
 * Get the current position (location) of the user. Will request the permission if necessary and will handle error logging.
 */
export const useGetCurrentPosition = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(
    (
      onSuccess: (response: GeolocationResponse) => void,
      onError?: (error: GeolocationError) => void,
      options?: Partial<GeolocationOptions>,
    ) =>
      Geolocation.getCurrentPosition(
        onSuccess,
        error => {
          const {code, message} = error

          onError?.(error)
          sendSentryErrorLog(
            'Geolocation.getCurrentPosition failed',
            'useRequestLocation.ts',
            {code, error: geolocationErrorCodeMap[code], message},
          )
        },
        /**
         * Do not set options for Android: Android location permissions requests will time out if these options are set
         */
        Platform.OS !== 'android'
          ? {
              enableHighAccuracy: true,
              maximumAge: 30000,
              timeout: 60000,
              ...options,
            }
          : undefined,
      ),
    [sendSentryErrorLog],
  )
}
