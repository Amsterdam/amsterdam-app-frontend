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

const geolocationErrorCodeToErrorMap: Record<number, string> = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
  4: 'ACTIVITY_NULL',
}

const defaultOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 60000,
}

/**
 * Coalesce the default and custom options and filter out the options that will cause issues with Android.
 * The Android implementation is buggy and will only accept maximumAge. When enableHighAccuracy is set, it's very slow; with timeout set, it always fails.
 * Note that maximumAge however, *is* important for Android, since the default caching time may be unsensibly long.
 */
const getOptions = (options?: GeolocationOptions) => {
  if (Platform.OS === 'android') {
    return {
      maximumAge: options?.maximumAge ?? defaultOptions.maximumAge,
    }
  }

  return {...defaultOptions, ...options}
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
      options?: GeolocationOptions,
    ) => {
      Geolocation.getCurrentPosition(
        onSuccess,
        error => {
          const {code, message} = error

          onError?.(error)
          sendSentryErrorLog(
            'Geolocation.getCurrentPosition failed',
            'useGetCurrentPosition.ts',
            {code, error: geolocationErrorCodeToErrorMap[code], message},
          )
        },
        getOptions(options),
      )
    },
    [sendSentryErrorLog],
  )
}
