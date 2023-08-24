import {Platform} from 'react-native'
import {
  AndroidPermission,
  IOSPermission,
  PERMISSIONS,
  request,
} from 'react-native-permissions'

export const getPermissionForPlatform = (
  permissionAndroid: AndroidPermission,
  permissionIOS: IOSPermission,
) => (Platform.OS === 'android' ? permissionAndroid : permissionIOS)

/**
 * Will check the permission and request it if necessary. Resolves if permission is granted, otherwise throws an error.
 */
export const requestPermissionForPlatform = async (
  permissionAndroid: AndroidPermission,
  permissionIOS: IOSPermission,
) => {
  const status = await request(
    getPermissionForPlatform(permissionAndroid, permissionIOS),
  )

  if (status !== 'granted') {
    throw new Error(status)
  }
}

const locationPermissionByPlatform = {
  permissionAndroid: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  permissionIOS: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
}

export const requestLocationPermission = () =>
  requestPermissionForPlatform(
    locationPermissionByPlatform.permissionAndroid,
    locationPermissionByPlatform.permissionIOS,
  )
