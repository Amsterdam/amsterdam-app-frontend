import {Platform} from 'react-native'
import {PERMISSIONS} from 'react-native-permissions'

export const Permissions = {
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

export type Permissions = (typeof Permissions)[keyof typeof Permissions]
