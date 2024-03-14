import {useCallback} from 'react'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Geolocation, {GeoOptions} from 'react-native-geolocation-service'
import {requestLocationAccuracy} from 'react-native-permissions'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {Permissions} from '@/types/permissions'
import {isVersionHigherOrEqual} from '@/utils/versionCompare'

const defaultOptions: GeoOptions = {
  forceLocationManager: false,
  forceRequestLocation: false,
  enableHighAccuracy: true,
  maximumAge: 10000,
  showLocationDialog: true,
  timeout: 60000,
}

/**
 * Returns a promise of the current position (location) of the user. Will request the permission if necessary and will handle error logging if requesting the position fails.
 */
export const useGetCurrentCoordinates = (
  purposeKey?: HighAccuracyPurposeKey,
) => {
  const {sendSentryErrorLog} = useSentry()
  const {hasPermission} = usePermission(Permissions.location)

  return useCallback(
    (options?: Partial<GeoOptions>) =>
      new Promise<Coordinates>(async (resolve, reject) => {
        try {
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
              throw error
            },
            {
              ...defaultOptions,
              ...options,
            },
          )
        } catch (error: unknown) {
          if (hasPermission) {
            sendSentryErrorLog(
              SentryErrorLogKey.currentCoordinates,
              'useGetCurrentCoordinates.ts',
              {error},
            )
          }

          reject({isTechnicalError: hasPermission})
        }
      }),
    [hasPermission, purposeKey, sendSentryErrorLog],
  )
}
