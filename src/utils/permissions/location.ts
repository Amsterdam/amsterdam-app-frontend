import {
  checkIsPermissionGranted,
  requestIsPermissionGranted,
} from '@/utils/permissions/isPermissionGranted'
import {PERMISSION_LOCATION} from '@/utils/permissions/permissionsForPlatform'

export const checkLocationPermissionGranted = () =>
  checkIsPermissionGranted(PERMISSION_LOCATION)

export const requestLocationPermissionGranted = () =>
  requestIsPermissionGranted(PERMISSION_LOCATION)
