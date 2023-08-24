import {Platform} from 'react-native'
import {
  AndroidPermission,
  IOSPermission,
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
