import {Platform} from 'react-native'
import {PERMISSIONS} from 'react-native-permissions'

export const PERMISSION_CAMERA =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA

export const PERMISSION_LOCATION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

export const PERMISSION_PHOTOS =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    : PERMISSIONS.IOS.PHOTO_LIBRARY