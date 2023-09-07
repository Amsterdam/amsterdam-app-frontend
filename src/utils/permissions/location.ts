import {Platform} from 'react-native'
import {PERMISSIONS} from 'react-native-permissions'
import {
  checkIsPermissionGranted,
  requestIsPermissionGranted,
} from '@/utils/permissions/isPermissionGranted'

export const locationPermission =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

export const checkLocationPermissionGranted = () =>
  checkIsPermissionGranted(locationPermission)

export const requestLocationPermissionGranted = () =>
  requestIsPermissionGranted(locationPermission)
