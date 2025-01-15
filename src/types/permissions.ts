import {Platform} from 'react-native'
import {PERMISSIONS} from 'react-native-permissions'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const Permissions = {
  biometrics: PERMISSIONS.IOS.FACE_ID, // On Android, biometrics is not a "dangerous level" permission
  bluetooth:
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.BLUETOOTH_SCAN
      : PERMISSIONS.IOS.BLUETOOTH,
  bluetoothConnect: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  camera:
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA,
  location:
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  photos:
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.IOS.PHOTO_LIBRARY,
  notifications: 'PERMISSION_NOTIFICATIONS',
} as const

/**
 * Only to be used by the useCheckPermissions hook
 * @private
 */
export const ALL_PERMISSIONS_WITH_LOG_DIMENSION: Array<{
  logDimension: PiwikSessionDimension
  permission: Permissions
}> = [
  {
    permission: Permissions.biometrics,
    logDimension: PiwikSessionDimension.hasBiometricsPermission,
  },
  {
    permission: Permissions.location,
    logDimension: PiwikSessionDimension.hasLocationPermission,
  },
  {
    permission: Permissions.camera,
    logDimension: PiwikSessionDimension.hasCameraPermission,
  },
  {
    permission: Permissions.photos,
    logDimension: PiwikSessionDimension.hasPhotosPermission,
  },
  {
    permission: Permissions.notifications,
    logDimension: PiwikSessionDimension.hasNotificationPermission,
  },
]

export type Permissions = (typeof Permissions)[keyof typeof Permissions]
