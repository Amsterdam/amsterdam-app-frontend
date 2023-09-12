import {
  AndroidPermission,
  check,
  IOSPermission,
  request,
} from 'react-native-permissions'
import {isPermissionErrorStatus} from '@/utils/permissions/errorStatuses'

/**
 * Will check the permission and request it if necessary. Resolves if permission is granted, otherwise throws an error.
 */
const isPermissionGranted =
  (permissionFn: typeof check | typeof request) =>
  async (permission: AndroidPermission | IOSPermission) => {
    const status = await permissionFn(permission)

    if (isPermissionErrorStatus(status)) {
      throw new Error(status)
    }

    return true
  }

export const requestIsPermissionGranted = isPermissionGranted(request)
export const checkIsPermissionGranted = isPermissionGranted(check)
