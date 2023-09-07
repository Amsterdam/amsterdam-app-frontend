import {Platform} from 'react-native'
import {
  AndroidPermission,
  check,
  IOSPermission,
  request,
} from 'react-native-permissions'
import {permissionErrorStatuses} from '@/modules/address/hooks/useGetCurrentPosition'
import {locationPermissionByPlatform} from '@/permissions'

export const getPermissionForPlatform = (
  permissionAndroid: AndroidPermission,
  permissionIOS: IOSPermission,
) => (Platform.OS === 'android' ? permissionAndroid : permissionIOS)

/**
 * Will check the permission and request it if necessary. Resolves if permission is granted, otherwise throws an error.
 */
const permissionForPlatform =
  (permissionFn: typeof check | typeof request) =>
  async (
    permissionAndroid: AndroidPermission,
    permissionIOS: IOSPermission,
  ) => {
    const status = await permissionFn(
      getPermissionForPlatform(permissionAndroid, permissionIOS),
    )

    if (permissionErrorStatuses.includes(status)) {
      throw new Error(status)
    }

    return status
  }

const requestPermissionForPlatform = permissionForPlatform(request)
const checkPermissionForPlatform = permissionForPlatform(check)

export const checkLocationPermission = () =>
  checkPermissionForPlatform(
    locationPermissionByPlatform.permissionAndroid,
    locationPermissionByPlatform.permissionIOS,
  )

export const requestLocationPermission = () =>
  requestPermissionForPlatform(
    locationPermissionByPlatform.permissionAndroid,
    locationPermissionByPlatform.permissionIOS,
  )
