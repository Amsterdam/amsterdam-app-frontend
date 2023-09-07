import {useCallback} from 'react'
import Geolocation, {
  GeoOptions,
  GeoPosition,
} from 'react-native-geolocation-service'
import {PermissionStatus, RESULTS} from 'react-native-permissions'
import {useSentry} from '@/hooks/sentry/useSentry'
import {getPropertyFromMaybeError} from '@/utils/object'
import {requestLocationPermissionGranted} from '@/utils/permissions/location'

const defaultOptions: GeoOptions = {
  forceLocationManager: false,
  forceRequestLocation: false,
  enableHighAccuracy: true,
  maximumAge: 10000,
  showLocationDialog: true,
  timeout: 60000,
}

export const permissionErrorStatuses: PermissionStatus[] = [
  RESULTS.BLOCKED,
  RESULTS.DENIED,
  RESULTS.LIMITED,
  RESULTS.UNAVAILABLE,
]

export const getStatusFromError = (error: unknown) => {
  const message = getPropertyFromMaybeError<PermissionStatus>(error, 'message')

  if (!message || !permissionErrorStatuses.includes(message)) {
    return
  }

  return message
}

export type GetCurrentPositionError = {
  error: unknown
  loggedToSentry: boolean
  status?: PermissionStatus
}

/**
 * Returns a promise of the current position (location) of the user. Will request the permission if necessary and will handle error logging if requesting the position fails.
 * Will throw a `GetCurrentPositionError` if the permission is not granted or if the location request fails.
 */
export const useGetCurrentPosition = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(
    (options?: Partial<GeoOptions>) =>
      new Promise<GeoPosition>((resolve, reject) => {
        requestLocationPermissionGranted()
          .then(() =>
            Geolocation.getCurrentPosition(
              resolve,
              error => {
                const {code, message} = error

                sendSentryErrorLog(
                  'Geolocation.getCurrentPosition failed',
                  'useGetCurrentPosition.ts',
                  {code, message},
                )

                const currentPositionError: GetCurrentPositionError = {
                  error,
                  loggedToSentry: true,
                }

                reject(currentPositionError)
              },
              {
                ...defaultOptions,
                ...options,
              },
            ),
          )
          .catch((error: unknown) => {
            const currentPositionError: GetCurrentPositionError = {
              error,
              loggedToSentry: false,
              status: getStatusFromError(error),
            }

            reject(currentPositionError)
          })
      }),
    [sendSentryErrorLog],
  )
}
