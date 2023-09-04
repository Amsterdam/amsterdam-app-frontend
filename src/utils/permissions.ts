import {Platform} from 'react-native'
import {
  AndroidPermission,
  check,
  IOSPermission,
  PERMISSIONS,
  request as RNPRequest,
} from 'react-native-permissions'

export const getPermissionForPlatform = (
  permissionAndroid: AndroidPermission,
  permissionIOS: IOSPermission,
) => (Platform.OS === 'android' ? permissionAndroid : permissionIOS)

/**
 * Will check the permission and request it if necessary. Resolves if permission is granted, otherwise throws an error.
 */
const requestPermissionForPlatform = async (
  permissionAndroid: AndroidPermission,
  permissionIOS: IOSPermission,
  request = true,
) => {
  const permissionFn = request ? RNPRequest : check
  const status = await permissionFn(
    getPermissionForPlatform(permissionAndroid, permissionIOS),
  )

  if (status !== 'granted') {
    throw new Error(status)
  }

  return status
}

const locationPermissionByPlatform = {
  permissionAndroid: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  permissionIOS: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
}

export const checkOrRequestLocationPermission = (request = true) =>
  requestPermissionForPlatform(
    locationPermissionByPlatform.permissionAndroid,
    locationPermissionByPlatform.permissionIOS,
    request,
  )
