import {useCallback} from 'react'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Geolocation, {GeoOptions} from 'react-native-geolocation-service'
import {
  PermissionStatus,
  requestLocationAccuracy,
} from 'react-native-permissions'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {getStatusFromError} from '@/utils/permissions/errorStatuses'
import {requestLocationPermissionGranted} from '@/utils/permissions/location'
import {isVersionHigherOrEqual} from '@/utils/versionCompare'

const defaultOptions: GeoOptions = {
  forceLocationManager: false,
  forceRequestLocation: false,
  enableHighAccuracy: true,
  maximumAge: 10000,
  showLocationDialog: true,
  timeout: 60000,
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
export const useGetCurrentCoordinates = (
  purposeKey?: HighAccuracyPurposeKey,
) => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(
    (options?: Partial<GeoOptions>) =>
      new Promise<Coordinates>((resolve, reject) => {
        requestLocationPermissionGranted()
          .then(async () => {
            if (
              purposeKey &&
              Platform.OS === 'ios' &&
              isVersionHigherOrEqual(DeviceInfo.getSystemVersion(), '14')
            ) {
              await requestLocationAccuracy({
                purposeKey,
              })
            }

            Geolocation.getCurrentPosition(
              ({coords: {latitude, longitude}}) => {
                const coordinates: Coordinates = {
                  lat: latitude,
                  lon: longitude,
                }

                resolve(coordinates)
              },
              error => {
                const {code, message} = error

                sendSentryErrorLog(
                  SentryErrorLogKey.currentCoordinates,
                  'useGetCurrentCoordinates.ts',
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
            )
          })
          .catch((error: unknown) => {
            const currentPositionError: GetCurrentPositionError = {
              error,
              loggedToSentry: false,
              status: getStatusFromError(error),
            }

            reject(currentPositionError)
          })
      }),
    [purposeKey, sendSentryErrorLog],
  )
}
